import crypto from "crypto";
import { prisma } from "@/lib/prisma";
import { DonationFrequency, DonationProvider, DonationStatus } from "@prisma/client";

export async function initializePaystackPayment(opts: {
  email: string;
  amount: number;
  name: string;
  frequency: DonationFrequency;
  callbackUrl: string;
}) {
  const secret = process.env.PAYSTACK_SECRET_KEY;
  if (!secret) {
    throw new Error("PAYSTACK_SECRET_KEY is not configured");
  }

  // Paystack expects amount in kobo/pesewas (smallest currency unit)
  const amountInPesewas = Math.round(opts.amount * 100);

  const donation = await prisma.donation.create({
    data: {
      donorName: opts.name,
      donorEmail: opts.email,
      amount: opts.amount,
      currency: "GHS",
      frequency: opts.frequency,
      provider: DonationProvider.PAYSTACK,
      status: DonationStatus.PENDING,
    },
  });

  const res = await fetch("https://api.paystack.co/transaction/initialize", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${secret}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: opts.email,
      amount: amountInPesewas,
      currency: "GHS",
      callback_url: opts.callbackUrl,
      metadata: {
        donationId: donation.id,
        donorName: opts.name,
        frequency: opts.frequency,
      },
    }),
  });

  const data = await res.json();
  if (!data.status) {
    await prisma.donation.update({
      where: { id: donation.id },
      data: { status: DonationStatus.FAILED },
    });
    throw new Error(data.message || "Paystack initialization failed");
  }

  await prisma.donation.update({
    where: { id: donation.id },
    data: { providerRef: data.data.reference },
  });

  return {
    donationId: donation.id,
    authorizationUrl: data.data.authorization_url as string,
    reference: data.data.reference as string,
  };
}

export function verifyPaystackSignature(
  rawBody: string,
  signature: string | null
): boolean {
  const secret = process.env.PAYSTACK_SECRET_KEY;
  if (!secret || !signature) return false;

  const hash = crypto.createHmac("sha512", secret).update(rawBody).digest("hex");
  return hash === signature;
}
