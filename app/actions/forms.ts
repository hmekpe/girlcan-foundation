"use server";

import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { rateLimit } from "@/lib/rate-limit";
import {
  notifyAdmin,
  sendContactConfirmation,
  sendEmail,
} from "@/lib/email";
import {
  contactSchema,
  volunteerSchema,
  partnerSchema,
  newsletterSchema,
  eventRegistrationSchema,
  type ContactInput,
  type VolunteerInput,
  type PartnerInput,
  type NewsletterInput,
  type EventRegistrationInput,
} from "@/lib/validations";

type ActionResult = { success: true } | { success: false; error: string };

async function getRateLimitKey(email?: string) {
  const h = await headers();
  const ip =
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    h.get("x-real-ip") ??
    "unknown";
  return email ? `${ip}:${email.toLowerCase()}` : ip;
}

function validationError(result: {
  success: false;
  error: { issues: { message: string }[] };
}) {
  return (
    result.error.issues[0]?.message ?? "Please check your input and try again."
  );
}

export async function submitContact(data: ContactInput): Promise<ActionResult> {
  const parsed = contactSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: validationError(parsed) };
  }

  const key = await getRateLimitKey(parsed.data.email);
  const limited = rateLimit(`contact:${key}`, 5, 60_000);
  if (!limited.success) {
    return { success: false, error: "Too many requests. Please wait a moment and try again." };
  }

  try {
    await prisma.contactMessage.create({ data: parsed.data });

    await Promise.allSettled([
      notifyAdmin(
        `New contact message: ${parsed.data.subject}`,
        `<p><strong>${parsed.data.name}</strong> (${parsed.data.email})</p><p>${parsed.data.message}</p>`
      ),
      sendContactConfirmation(parsed.data.name, parsed.data.email),
    ]);

    return { success: true };
  } catch {
    return { success: false, error: "Something went wrong. Please try again later." };
  }
}

export async function submitVolunteer(data: VolunteerInput): Promise<ActionResult> {
  const parsed = volunteerSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: validationError(parsed) };
  }

  const key = await getRateLimitKey(parsed.data.email);
  const limited = rateLimit(`volunteer:${key}`, 3, 60_000);
  if (!limited.success) {
    return { success: false, error: "Too many requests. Please wait a moment and try again." };
  }

  try {
    await prisma.volunteerApplication.create({ data: parsed.data });

    await notifyAdmin(
      `New volunteer application: ${parsed.data.name}`,
      `<p><strong>${parsed.data.name}</strong> (${parsed.data.email})</p><p>${parsed.data.message}</p>`
    );

    return { success: true };
  } catch {
    return { success: false, error: "Something went wrong. Please try again later." };
  }
}

export async function submitPartner(data: PartnerInput): Promise<ActionResult> {
  const parsed = partnerSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: validationError(parsed) };
  }

  const key = await getRateLimitKey(parsed.data.email);
  const limited = rateLimit(`partner:${key}`, 3, 60_000);
  if (!limited.success) {
    return { success: false, error: "Too many requests. Please wait a moment and try again." };
  }

  try {
    await prisma.partnerInquiry.create({ data: parsed.data });

    await notifyAdmin(
      `New partner inquiry: ${parsed.data.orgName}`,
      `<p><strong>${parsed.data.orgName}</strong> — ${parsed.data.contactName} (${parsed.data.email})</p><p>${parsed.data.message}</p>`
    );

    return { success: true };
  } catch {
    return { success: false, error: "Something went wrong. Please try again later." };
  }
}

export async function submitNewsletter(data: NewsletterInput): Promise<ActionResult> {
  const parsed = newsletterSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: validationError(parsed) };
  }

  const key = await getRateLimitKey(parsed.data.email);
  const limited = rateLimit(`newsletter:${key}`, 5, 60_000);
  if (!limited.success) {
    return { success: false, error: "Too many requests. Please wait a moment and try again." };
  }

  try {
    await prisma.newsletterSubscriber.upsert({
      where: { email: parsed.data.email.toLowerCase() },
      create: { email: parsed.data.email.toLowerCase() },
      update: { active: true },
    });

    await sendEmail({
      to: parsed.data.email,
      subject: "Welcome to The Girl Can Foundation newsletter",
      html: `<p>Thank you for subscribing. You'll hear from us with stories, events, and ways to support girls who are dreaming big and leading boldly.</p><p>She is strong. She is capable. She can.</p>`,
    });

    return { success: true };
  } catch {
    return { success: false, error: "Something went wrong. Please try again later." };
  }
}

export async function submitEventRegistration(
  data: EventRegistrationInput
): Promise<ActionResult> {
  const parsed = eventRegistrationSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: validationError(parsed) };
  }

  const key = await getRateLimitKey(parsed.data.email);
  const limited = rateLimit(`event:${key}`, 5, 60_000);
  if (!limited.success) {
    return { success: false, error: "Too many requests. Please wait a moment and try again." };
  }

  try {
    const event = await prisma.event.findUnique({
      where: { id: parsed.data.eventId },
    });

    if (!event || !event.published || !event.registrationOpen) {
      return { success: false, error: "Registration is not available for this event." };
    }

    if (event.capacity) {
      const count = await prisma.eventRegistration.count({
        where: { eventId: event.id },
      });
      if (count >= event.capacity) {
        return { success: false, error: "This event is at full capacity." };
      }
    }

    await prisma.eventRegistration.create({ data: parsed.data });

    await Promise.allSettled([
      notifyAdmin(
        `New event registration: ${event.title}`,
        `<p><strong>${parsed.data.name}</strong> (${parsed.data.email}) registered for ${event.title}</p>`
      ),
      sendEmail({
        to: parsed.data.email,
        subject: `You're registered — ${event.title}`,
        html: `<p>Hi ${parsed.data.name},</p><p>You're registered for <strong>${event.title}</strong>. We look forward to seeing you there.</p><p>She is strong. She is capable. She can.</p>`,
      }),
    ]);

    return { success: true };
  } catch {
    return { success: false, error: "Something went wrong. Please try again later." };
  }
}
