import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Download, FileText } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Reveal, CountUp } from "@/components/motion";
import { IconBadge } from "@/components/icon-badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { getSiteSettings } from "@/lib/site";
import { PLACEHOLDER } from "@/lib/constants";
import { FinancialBreakdown } from "@/components/financial-breakdown";
export const revalidate = 60;

export const metadata: Metadata = {
  title: "Impact",
  description:
    "See the impact of The Girl Can Foundation — girls reached, workshops delivered, and stories of transformation.",
};

export default async function ImpactPage() {
  const settings = await getSiteSettings([
    "stats_girls_reached",
    "stats_workshops",
    "stats_mentors",
    "stats_communities",
  ]);

  const testimonials = await prisma.testimonial.findMany({
    where: { featured: true },
    take: 6,
    include: { program: { select: { title: true } } },
  });

  const stats = [
    { label: "Girls reached", value: Number(settings.stats_girls_reached || 0), suffix: "+" },
    { label: "Workshops delivered", value: Number(settings.stats_workshops || 0), suffix: "+" },
    { label: "Active mentors", value: Number(settings.stats_mentors || 0), suffix: "+" },
    { label: "Communities served", value: Number(settings.stats_communities || 0), suffix: "+" },
  ];

  return (
    <>
      <PageHero
        eyebrow="Our impact"
        title="Numbers with names behind them"
        description="Every statistic represents a girl who found her voice, a mentor who showed up, and a community that chose to believe in her."
      />

      <section className="section-padding bg-rose-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.08}>
                <Card className="border-none bg-cream-50 text-center">
                  <CardContent className="p-8">
                    <p className="font-display text-4xl font-bold text-rose-600">
                      <CountUp value={stat.value} suffix={stat.suffix} />
                    </p>
                    <p className="mt-2 text-sm font-medium text-ink-600">{stat.label}</p>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="eyebrow mb-3">Testimonials</p>
            <h2 className="text-ink-900">In their own words</h2>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal key={t.id} delay={i * 0.06}>
                <Card className="h-full border-none bg-cream-100">
                  <CardContent className="p-6">
                    {t.photo && (
                      <div className="relative mb-4 h-12 w-12 overflow-hidden rounded-full">
                        <Image
                          src={t.photo}
                          alt={t.name}
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                      </div>
                    )}
                    <p className="text-sm italic text-ink-700">&ldquo;{t.quote}&rdquo;</p>
                    <p className="mt-4 text-sm font-medium text-rose-600">{t.name}</p>
                    {t.program && (
                      <p className="text-xs text-ink-500">{t.program.title}</p>
                    )}
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <Reveal>
              <IconBadge icon={FileText} tone="gold" className="mb-4" />
              <h2 className="font-display text-text">Financial transparency</h2>
              <p className="mt-4 text-muted">
                We are committed to using every donation responsibly. Percentages below
                are updated from our admin dashboard — no code deploy required.
              </p>
              <FinancialBreakdown className="mt-8" />
            </Reveal>
            <Reveal delay={0.1}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image
                  src={PLACEHOLDER.community}
                  alt="Community gathering celebrating girls' achievements"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <Card className="mt-6 border-gold-200 bg-gold-50">
                <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="font-display text-lg font-semibold text-ink-900">
                      Download our impact report
                    </h3>
                    <p className="mt-1 text-sm text-ink-600">
                      Full annual report coming soon. Contact us for interim summaries.
                    </p>
                  </div>
                  <Button asChild variant="gold">
                    <Link href="/contact">
                      <Download className="h-4 w-4" aria-hidden />
                      Request report
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
