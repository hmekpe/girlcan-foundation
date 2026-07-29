import Stripe from "stripe";
import { prisma } from "@/lib/prisma";
import { DonationFrequency, DonationProvider, DonationStatus } from "@prisma/client";

export function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY is not configured");
  return new Stripe(key, { apiVersion: "2026-06-24.dahlia" });
}

export async function createStripeCheckoutSession(opts: {
  email: string;
  amount: number;
  name: string;
  frequency: DonationFrequency;
  successUrl: string;
  cancelUrl: string;
}) {
  const stripe = getStripe();

  const donation = await prisma.donation.create({
    data: {
      donorName: opts.name,
      donorEmail: opts.email,
      amount: opts.amount,
      currency: "USD",
      frequency: opts.frequency,
      provider: DonationProvider.STRIPE,
      status: DonationStatus.PENDING,
    },
  });

  const isRecurring = opts.frequency === DonationFrequency.MONTHLY;

  const session = await stripe.checkout.sessions.create({
    mode: isRecurring ? "subscription" : "payment",
    customer_email: opts.email,
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "usd",
          unit_amount: Math.round(opts.amount * 100),
          product_data: {
            name: "Donation — The Girl Can Foundation",
            description: isRecurring
              ? "Monthly donation supporting girls' empowerment"
              : "One-time donation supporting girls' empowerment",
          },
          ...(isRecurring ? { recurring: { interval: "month" as const } } : {}),
        },
      },
    ],
    success_url: opts.successUrl,
    cancel_url: opts.cancelUrl,
    metadata: {
      donationId: donation.id,
      donorName: opts.name,
      frequency: opts.frequency,
    },
  });

  await prisma.donation.update({
    where: { id: donation.id },
    data: { providerRef: session.id },
  });

  return { donationId: donation.id, url: session.url! };
}

export function constructStripeEvent(rawBody: string, signature: string) {
  const stripe = getStripe();
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) throw new Error("STRIPE_WEBHOOK_SECRET is not configured");
  return stripe.webhooks.constructEvent(rawBody, signature, secret);
}
