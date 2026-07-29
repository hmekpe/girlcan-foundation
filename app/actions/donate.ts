"use server";

import { headers } from "next/headers";
import { DonationFrequency } from "@prisma/client";
import { initializePaystackPayment } from "@/lib/paystack";
import { createStripeCheckoutSession } from "@/lib/stripe";
import { rateLimit } from "@/lib/rate-limit";
import { donationSchema, type DonationInput } from "@/lib/validations";
import { SITE } from "@/lib/constants";

type DonateResult =
  | { success: true; url: string }
  | { success: false; error: string };

async function getRateLimitKey(email: string) {
  const h = await headers();
  const ip =
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    h.get("x-real-ip") ??
    "unknown";
  return `${ip}:${email.toLowerCase()}`;
}

export async function startDonation(data: DonationInput): Promise<DonateResult> {
  const parsed = donationSchema.safeParse(data);
  if (!parsed.success) {
    const msg = parsed.error.issues[0]?.message ?? "Please check your donation details.";
    return { success: false, error: msg };
  }

  const { name, email, amount, frequency, provider } = parsed.data;

  const key = await getRateLimitKey(email);
  const limited = rateLimit(`donate:${key}`, 10, 60_000);
  if (!limited.success) {
    return { success: false, error: "Too many requests. Please wait a moment and try again." };
  }

  const freq =
    frequency === "MONTHLY"
      ? DonationFrequency.MONTHLY
      : DonationFrequency.ONE_TIME;

  const baseUrl = SITE.url.replace(/\/$/, "");

  try {
    if (provider === "PAYSTACK") {
      if (!process.env.PAYSTACK_SECRET_KEY) {
        return {
          success: false,
          error:
            "Online donations in GHS are not yet configured. Please contact us to give offline.",
        };
      }

      const result = await initializePaystackPayment({
        email,
        amount,
        name,
        frequency: freq,
        callbackUrl: `${baseUrl}/donate/success`,
      });

      return { success: true, url: result.authorizationUrl };
    }

    if (!process.env.STRIPE_SECRET_KEY) {
      return {
        success: false,
        error:
          "Online donations in USD are not yet configured. Please contact us to give offline.",
      };
    }

    const result = await createStripeCheckoutSession({
      email,
      amount,
      name,
      frequency: freq,
      successUrl: `${baseUrl}/donate/success?session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: `${baseUrl}/donate`,
    });

    return { success: true, url: result.url };
  } catch (err) {
    console.error("[donate]", err);
    return {
      success: false,
      error: "We couldn't start your donation. Please try again or contact us.",
    };
  }
}
