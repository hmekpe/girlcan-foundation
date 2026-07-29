import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { DonationStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { constructStripeEvent } from "@/lib/stripe";
import { sendDonationReceipt } from "@/lib/email";

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = constructStripeEvent(rawBody, signature);
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const donationId = session.metadata?.donationId;

    const donation =
      (donationId
        ? await prisma.donation.findUnique({ where: { id: donationId } })
        : null) ||
      (session.id
        ? await prisma.donation.findFirst({ where: { providerRef: session.id } })
        : null);

    if (donation && donation.status !== DonationStatus.PAID) {
      await prisma.donation.update({
        where: { id: donation.id },
        data: { status: DonationStatus.PAID, providerRef: session.id },
      });

      await sendDonationReceipt({
        name: donation.donorName,
        email: donation.donorEmail,
        amount: Number(donation.amount),
        currency: donation.currency,
        frequency: donation.frequency,
      });
    }
  }

  return NextResponse.json({ received: true });
}
