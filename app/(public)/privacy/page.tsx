import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/motion";
import { SITE } from "@/lib/constants";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for The Girl Can Foundation website.",
};

export default function PrivacyPage() {
  const updated = "July 28, 2026";

  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        description={`Last updated: ${updated}`}
      />

      <section className="section-padding">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Reveal className="prose-brand space-y-8">
            <div>
              <h2 className="text-xl font-semibold text-ink-900">Introduction</h2>
              <p className="mt-3">
                The Girl Can Foundation (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;)
                respects your privacy. This policy explains what personal data we collect,
                how we use it, and your rights regarding that data.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-ink-900">Data we collect</h2>
              <p className="mt-3">We may collect the following when you interact with our site:</p>
              <ul className="mt-3 list-disc space-y-2 pl-5">
                <li>Name, email address, phone number, and message content when you submit forms</li>
                <li>Event registration details</li>
                <li>Donor name and email when initiating a donation (payment details are not collected by us)</li>
                <li>Newsletter subscription email addresses</li>
                <li>Basic usage data via privacy-friendly analytics (see Analytics below)</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-ink-900">Payment processing</h2>
              <p className="mt-3">
                When you make a donation, card and payment data are processed directly by
                our payment partners — <strong>Paystack</strong> (for GHS donations) and{" "}
                <strong>Stripe</strong> (for USD donations). We never receive, store, or
                process your full card number, CVV, or other sensitive payment credentials
                on our servers. We only retain donation records such as donor name, email,
                amount, currency, and payment status for receipt and reporting purposes.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-ink-900">How we use your data</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5">
                <li>To respond to enquiries and process applications</li>
                <li>To manage event registrations and send confirmations</li>
                <li>To process donations and send receipts</li>
                <li>To send newsletters (with your consent)</li>
                <li>To improve our website and measure reach</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-ink-900">Analytics</h2>
              <p className="mt-3">
                We use <strong>Plausible Analytics</strong>, a privacy-focused analytics
                tool that does not use cookies and does not collect personal identifiers.
                Plausible aggregates anonymous page-view statistics to help us understand
                how our site is used.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-ink-900">Data retention</h2>
              <p className="mt-3">
                We retain contact messages, applications, and event registrations for up
                to <strong>three (3) years</strong> unless a longer period is required by
                law or you request earlier deletion. Donation records are retained for{" "}
                <strong>seven (7) years</strong> for accounting and tax compliance.
                Newsletter subscriptions are kept until you unsubscribe. Analytics data
                is aggregated and not tied to individuals.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-ink-900">Your rights</h2>
              <p className="mt-3">
                You may request access to, correction of, or deletion of your personal
                data at any time. To exercise these rights, contact us at{" "}
                <a href={`mailto:${SITE.email}`} className="text-rose-600 hover:underline">
                  {SITE.email}
                </a>
                . We will respond within 30 days.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-ink-900">Third-party services</h2>
              <p className="mt-3">
                We use trusted third-party providers including Paystack, Stripe, Resend
                (email delivery), and Plausible Analytics. Each provider has its own
                privacy policy governing how they handle data.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-ink-900">Changes</h2>
              <p className="mt-3">
                We may update this policy from time to time. Material changes will be
                reflected on this page with an updated date.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
