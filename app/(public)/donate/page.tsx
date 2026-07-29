import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/motion";
import { DonateForm } from "@/components/forms/donate-form";
import { FinancialBreakdown } from "@/components/financial-breakdown";
import { Card, CardContent } from "@/components/ui/card";
import { DEFAULT_DONATION_TIERS, PLACEHOLDER } from "@/lib/constants";
import { getSiteSettings } from "@/lib/site";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Donate",
  description:
    "Support The Girl Can Foundation with a one-time or monthly gift. Your donation helps girls discover their strength and lead boldly.",
};

export default async function DonatePage() {
  const settings = await getSiteSettings(["donation_tiers"]);
  let tiers = DEFAULT_DONATION_TIERS;
  if (settings.donation_tiers) {
    try {
      tiers = JSON.parse(settings.donation_tiers);
    } catch {
      // use defaults
    }
  }

  return (
    <>
      <PageHero
        eyebrow="Give with purpose"
        title="Invest in her future"
        description="Your generosity opens doors — to education, mentorship, leadership, and a future where she knows she is enough."
      />

      <section className="section-padding bg-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <Reveal>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl lg:sticky lg:top-28">
                <Image
                  src={PLACEHOLDER.confidence}
                  alt="Young woman smiling with confidence after a foundation program"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <blockquote className="mt-6 border-l-4 border-rose pl-4 text-muted italic">
                &ldquo;Every girl has the power to dream big, lead boldly, and create
                meaningful change.&rdquo;
              </blockquote>
              <FinancialBreakdown
                variant="condensed"
                className="mt-4 text-sm text-muted"
              />
            </Reveal>

            <Reveal delay={0.1}>
              <Card className="border-rose-pale bg-white">
                <CardContent className="p-6 sm:p-8">
                  <h2 className="font-display text-2xl font-bold text-text">
                    Make a donation
                  </h2>
                  <p className="mt-2 text-sm text-muted">
                    Single-page giving — choose an amount, then complete payment securely.
                  </p>
                  <div className="mt-8">
                    <DonateForm tiers={tiers} />
                  </div>
                </CardContent>
              </Card>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
