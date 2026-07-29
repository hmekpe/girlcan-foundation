import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const FROM =
  process.env.EMAIL_FROM ||
  "The Girl Can Foundation <hello@girlcanfoundation.org>";
const INBOX = process.env.CONTACT_INBOX || "hello@girlcanfoundation.org";

type EmailPayload = {
  to: string | string[];
  subject: string;
  html: string;
};

export async function sendEmail({ to, subject, html }: EmailPayload) {
  if (!resend) {
    console.info("[email:dev]", { to, subject });
    return { id: "dev-mode", skipped: true };
  }

  const result = await resend.emails.send({
    from: FROM,
    to: Array.isArray(to) ? to : [to],
    subject,
    html,
  });

  return result;
}

export async function notifyAdmin(subject: string, html: string) {
  return sendEmail({ to: INBOX, subject, html });
}

export async function sendContactConfirmation(name: string, email: string) {
  return sendEmail({
    to: email,
    subject: "We received your message — The Girl Can Foundation",
    html: `<p>Hi ${name},</p><p>Thank you for reaching out to The Girl Can Foundation. We've received your message and will get back to you soon.</p><p>She is strong. She is capable. She can.</p>`,
  });
}

export async function sendDonationReceipt(opts: {
  name: string;
  email: string;
  amount: number;
  currency: string;
  frequency: string;
}) {
  return sendEmail({
    to: opts.email,
    subject: "Thank you for your donation — The Girl Can Foundation",
    html: `<p>Dear ${opts.name},</p><p>Thank you for your generous ${opts.frequency.toLowerCase().replace("_", "-")} gift of <strong>${opts.currency} ${opts.amount}</strong>.</p><p>Your support helps girls discover their strength, build confidence, and reach their full potential.</p><p>With gratitude,<br/>The Girl Can Foundation</p>`,
  });
}
