import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import * as LucideIcons from "lucide-react";
import { prisma } from "@/lib/prisma";
import { PLACEHOLDER, SITE } from "@/lib/constants";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { IconBadge } from "@/components/icon-badge";
import { Metadata } from "next";

export const revalidate = 60;

const CARD_GRADIENTS = [
  "from-plum to-plum-deep",
  "from-rose to-rose-deep",
  "from-gold to-gold-deep",
  "from-navy to-navy-deep",
  "from-plum-alt to-plum",
] as const;

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const program = await prisma.program.findUnique({
    where: { slug: params.slug },
  });
  if (!program) return { title: "Program Not Found" };
  return {
    title: `${program.title} - ${SITE.shortName}`,
    description: program.summary,
    openGraph: {
      images: [program.coverImage || PLACEHOLDER.hero],
    },
  };
}

export default async function ProgramPage({ params }: { params: { slug: string } }) {
  const program = await prisma.program.findUnique({
    where: { slug: params.slug },
    include: {
      testimonials: { where: { featured: true }, take: 3 },
      events: { where: { published: true, startAt: { gte: new Date() } }, take: 3 },
    }
  });

  if (!program) notFound();

  const IconComponent = (LucideIcons as Record<string, React.ElementType>)[program.icon || "School"] || LucideIcons.School;
  const gradient = CARD_GRADIENTS[program.order % CARD_GRADIENTS.length];

  return (
    <article className="min-h-screen bg-cream">
      <div className="section-padding">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${gradient} p-8 sm:p-12 lg:p-16`}>
            {program.coverImage && (
              <Image
                src={program.coverImage}
                alt={program.title}
                fill
                className="object-cover opacity-20 mix-blend-overlay"
                priority
              />
            )}
            <div className="relative z-10">
              <IconBadge icon={IconComponent} tone="cream" className="mb-6 h-16 w-16 bg-cream/10 text-cream backdrop-blur-sm" />
              <h1 className="font-display text-4xl font-bold text-cream sm:text-5xl lg:text-6xl">
                {program.title}
              </h1>
              <p className="mt-4 max-w-2xl text-lg text-cream/90 sm:text-xl">
                {program.summary}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        <div className="prose prose-lg prose-rose mx-auto max-w-none text-text">
          <p>{program.description}</p>
        </div>
      </div>

      {program.testimonials.length > 0 && (
        <section className="section-padding bg-rose-pale">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-10 text-center font-display text-3xl font-semibold text-text">
              Voices from the Program
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {program.testimonials.map((t) => (
                <Card key={t.id} className="h-full border-none bg-cream">
                  <CardContent className="p-6">
                    {t.photo && (
                      <div className="relative mb-4 h-12 w-12 overflow-hidden rounded-full">
                        <Image src={t.photo} alt={t.name} fill className="object-cover" />
                      </div>
                    )}
                    <p className="text-sm italic text-text">&ldquo;{t.quote}&rdquo;</p>
                    <p className="mt-4 text-sm font-medium text-rose">{t.name}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {program.events.length > 0 && (
        <section className="section-padding bg-cream">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-10 font-display text-3xl font-semibold text-text">
              Upcoming Related Events
            </h2>
            <div className="grid gap-8 lg:grid-cols-3">
              {program.events.map((event) => (
                <Link key={event.id} href={`/events/${event.slug}`} className="group block h-full">
                  <Card className="h-full overflow-hidden border border-rose-pale transition-colors hover:border-rose bg-cream">
                    <div className="relative aspect-[16/9]">
                      <Image
                        src={event.coverImage || PLACEHOLDER.event}
                        alt={event.title}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                      />
                    </div>
                    <CardContent className="p-6">
                      <h3 className="font-display text-xl font-semibold text-text group-hover:text-rose">
                        {event.title}
                      </h3>
                      <div className="mt-4 space-y-2 text-sm text-muted">
                        <p className="flex items-center gap-2">
                          <LucideIcons.Calendar className="h-4 w-4 text-rose" />
                          {format(event.startAt, "MMM d, yyyy")}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section-padding bg-plum text-cream text-center">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-semibold">Join Our Mission</h2>
          <p className="mt-4 text-cream/90 text-lg">
            Whether you want to participate, volunteer, or support this program, we welcome you.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button asChild variant="gold" size="lg">
              <Link href="/donate">Support This Program</Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href="/get-involved">Get Involved</Link>
            </Button>
          </div>
        </div>
      </section>
    </article>
  );
}
