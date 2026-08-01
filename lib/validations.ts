import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Please enter a valid email"),
  subject: z.string().min(3, "Please enter a subject"),
  message: z.string().min(10, "Please share a bit more detail"),
});

export const volunteerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().min(10),
});

export const partnerSchema = z.object({
  orgName: z.string().min(2),
  contactName: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
});

export const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email"),
});

export const eventRegistrationSchema = z.object({
  eventId: z.string().min(1),
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
});

export const offlineDonationSchema = z.object({
  donorName: z.string().min(2),
  donorEmail: z.string().email(),
  amount: z.number().positive("Enter a valid amount"),
  currency: z.enum(["GHS", "USD"]),
  frequency: z.enum(["ONE_TIME", "MONTHLY"]),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type VolunteerInput = z.infer<typeof volunteerSchema>;
export type PartnerInput = z.infer<typeof partnerSchema>;
export type NewsletterInput = z.infer<typeof newsletterSchema>;
export type EventRegistrationInput = z.infer<typeof eventRegistrationSchema>;
export type OfflineDonationInput = z.infer<typeof offlineDonationSchema>;
