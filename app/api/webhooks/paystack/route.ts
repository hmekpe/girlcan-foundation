import { NextRequest, NextResponse } from "next/server";
import { DonationStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { verifyPaystackSignature } from "@/lib/paystack";
import { sendDonationReceipt } from "@/lib/email";

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const signature = req.headers.get("x-paystack-signature");

  if (!verifyPaystackSignature(rawBody, signature)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const payload = JSON.parse(rawBody) as {
    event: string;
    data: {
      reference: string;
      status: string;
      metadata?: { donationId?: string };
      customer?: { email?: string };
    };
  };

  if (payload.event !== "charge.success" || payload.data.status !== "success") {
    return NextResponse.json({ received: true });
  }

  const donation =
    (payload.data.metadata?.donationId
      ? await prisma.donation.findUnique({
          where: { id: payload.data.metadata.donationId },
        })
      : null) ||
    (await prisma.donation.findFirst({
      where: { providerRef: payload.data.reference },
    }));

  if (!donation || donation.status === DonationStatus.PAID) {
    return NextResponse.json({ received: true });
  }

  await prisma.donation.update({
    where: { id: donation.id },
    data: { status: DonationStatus.PAID, providerRef: payload.data.reference },
  });

  await sendDonationReceipt({
    name: donation.donorName,
    email: donation.donorEmail,
    amount: Number(donation.amount),
    currency: donation.currency,
    frequency: donation.frequency,
  });

  return NextResponse.json({ received: true });
}
