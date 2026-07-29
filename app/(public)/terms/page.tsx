import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/motion";
import { SITE } from "@/lib/constants";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms of use for The Girl Can Foundation website.",
};

export default function TermsPage() {
  const updated = "July 28, 2026";

  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms of Use"
        description={`Last updated: ${updated}`}
      />

      <section className="section-padding">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Reveal className="prose-brand space-y-8">
            <div>
              <h2 className="text-xl font-semibold text-ink-900">Acceptance</h2>
              <p className="mt-3">
                By accessing and using the {SITE.name} website, you agree to these
                Terms of Use. If you do not agree, please do not use this site.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-ink-900">Use of the website</h2>
              <p className="mt-3">
                You may use this website for lawful purposes only. You agree not to
                misuse the site, attempt unauthorised access, or submit false or
                harmful information through our forms.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-ink-900">Donations</h2>
              <p className="mt-3">
                Donations made through this website are processed by third-party
                payment providers. Card and payment data are handled entirely by{" "}
                <strong>Paystack</strong> (GHS) or <strong>Stripe</strong> (USD) — not
                by {SITE.name}. We do not store card numbers, CVV codes, or other
                sensitive payment credentials on our servers. Donations are generally
                non-refundable except where required by law or at our discretion.
                Receipts are sent to the email address you provide.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-ink-900">Content</h2>
              <p className="mt-3">
                All content on this site — including text, images, and branding — is
                owned by or licensed to {SITE.name} unless otherwise stated. You may
                not reproduce, distribute, or modify content without our written
                permission.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-ink-900">Privacy & analytics</h2>
              <p className="mt-3">
                Your use of this site is also governed by our{" "}
                <a href="/privacy" className="text-rose-600 hover:underline">
                  Privacy Policy
                </a>
                , which describes how we handle personal data, payment processing,
                data retention, and our use of Plausible Analytics. For data access or
                deletion requests, contact{" "}
                <a href={`mailto:${SITE.email}`} className="text-rose-600 hover:underline">
                  {SITE.email}
                </a>
                .
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-ink-900">Disclaimer</h2>
              <p className="mt-3">
                This website is provided &ldquo;as is&rdquo; without warranties of any
                kind. We strive for accuracy but do not guarantee that all information
                is complete or current at all times.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-ink-900">Limitation of liability</h2>
              <p className="mt-3">
                To the fullest extent permitted by law, {SITE.name} shall not be liable
                for any indirect, incidental, or consequential damages arising from your
                use of this website.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-ink-900">Governing law</h2>
              <p className="mt-3">
                These terms are governed by the laws of Ghana. Any disputes shall be
                subject to the exclusive jurisdiction of the courts of Ghana.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-ink-900">Contact</h2>
              <p className="mt-3">
                Questions about these terms? Email us at{" "}
                <a href={`mailto:${SITE.email}`} className="text-rose-600 hover:underline">
                  {SITE.email}
                </a>
                .
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
