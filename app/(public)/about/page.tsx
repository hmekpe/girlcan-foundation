import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Heart, Target, Eye } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/motion";
import { IconBadge } from "@/components/icon-badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { getSiteSettings } from "@/lib/site";
import { PLACEHOLDER, SITE, VALUES } from "@/lib/constants";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about The Girl Can Foundation — our story, mission, vision, and the team empowering girls to lead boldly.",
};

export default async function AboutPage() {
  const settings = await getSiteSettings([
    "mission_intro",
    "mission_body",
    "mission_title",
    "mission_text",
    "vision_text",
  ]);

  const team = await prisma.teamMember.findMany({ orderBy: { order: "asc" } });

  return (
    <>
      <PageHero
        eyebrow="Our story"
        title="Every girl deserves to believe she can"
        description={settings.mission_intro || SITE.tagline}
      />

      <section className="section-padding">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Reveal>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image
                  src={PLACEHOLDER.community}
                  alt="Girls gathered in a supportive community setting"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="eyebrow mb-3">Who we are</p>
              <h2 className="text-ink-900">Creating space for girls to grow</h2>
              <p className="mt-4 prose-brand">
                {settings.mission_body ||
                  "We focus on creating safe spaces where girls are encouraged to express themselves, grow in knowledge, develop life skills, and embrace their unique potential."}
              </p>
              <p className="mt-4 prose-brand">
                At The Girl Can Foundation, we walk alongside girls as they discover
                their strength, build confidence, and step into leadership — because
                when one girl rises, her whole community benefits.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section-padding bg-cream-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2">
            <Reveal>
              <Card className="h-full border-none bg-cream-50">
                <CardContent className="p-8">
                  <IconBadge icon={Target} tone="rose" className="mb-4" />
                  <p className="eyebrow mb-2">Our mission</p>
                  <h3 className="text-2xl text-ink-900">
                    {settings.mission_title || "Inspire. Educate. Mentor. Support."}
                  </h3>
                  <p className="mt-4 text-ink-600">
                    {settings.mission_text ||
                      "To inspire, educate, mentor, and support girls through programs and opportunities that promote leadership, personal development, education, confidence-building, and social impact."}
                  </p>
                </CardContent>
              </Card>
            </Reveal>
            <Reveal delay={0.1}>
              <Card className="h-full border-none bg-cream-50">
                <CardContent className="p-8">
                  <IconBadge icon={Eye} tone="gold" className="mb-4" />
                  <p className="eyebrow mb-2">Our vision</p>
                  <h3 className="text-2xl text-ink-900">A generation of leaders</h3>
                  <p className="mt-4 text-ink-600">
                    {settings.vision_text ||
                      "To raise a generation of empowered, resilient, and purpose-driven girls equipped to break barriers and become leaders, changemakers, and role models."}
                  </p>
                </CardContent>
              </Card>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="eyebrow mb-3">Our values</p>
            <h2 className="text-ink-900">What guides everything we do</h2>
            <p className="mt-4 text-ink-600">
              These values shape our programs, partnerships, and the culture we
              build with every girl we serve.
            </p>
          </Reveal>
          <div className="mt-12 flex flex-wrap justify-center gap-3">
            {VALUES.map((value, i) => (
              <Reveal key={value} delay={i * 0.05}>
                <span className="inline-flex items-center gap-2 rounded-full border border-cream-300 bg-cream-50 px-5 py-2.5 text-sm font-medium text-ink-700">
                  <Heart className="h-3.5 w-3.5 text-rose-500" aria-hidden />
                  {value}
                </span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-rose-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="eyebrow mb-3">Our team</p>
            <h2 className="text-ink-900">The people behind the mission</h2>
            <p className="mt-4 text-ink-600">
              A dedicated team committed to creating pathways of education,
              mentorship, and advocacy for girls everywhere.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member, i) => (
              <Reveal key={member.id} delay={i * 0.08}>
                <Card className="overflow-hidden border-none text-center">
                  <div className="relative mx-auto mt-6 h-32 w-32 overflow-hidden rounded-full">
                    <Image
                      src={member.photo || PLACEHOLDER.team1}
                      alt={`Portrait of ${member.name}`}
                      fill
                      className="object-cover"
                      sizes="128px"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-display text-lg font-semibold text-ink-900">
                      {member.name}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-rose-600">
                      {member.role}
                    </p>
                    <p className="mt-3 text-sm text-ink-600">{member.bio}</p>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-ink-900">Ready to be part of her story?</h2>
            <p className="mt-4 text-ink-600">
              Whether you volunteer, partner, or give — there is a place for you
              in this movement.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button asChild>
                <Link href="/get-involved">Get involved</Link>
              </Button>
              <Button asChild variant="secondary">
                <Link href="/donate">Donate</Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
