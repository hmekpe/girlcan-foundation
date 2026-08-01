"use server";

// Online payment integrations (Paystack/Stripe) have been removed.
// Donations are handled via direct contact (email/phone).
// Offline donations can be recorded by admins in the admin dashboard.

export { createOfflineDonation } from "@/app/actions/admin";
