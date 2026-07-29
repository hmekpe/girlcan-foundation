import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { ManifestoTicker } from "@/components/home/manifesto-ticker";
import { MissionVision } from "@/components/home/mission-vision";
import { Pillars } from "@/components/home/pillars";
import { ValuesStrip } from "@/components/home/values-strip";
import { ProgramsBento } from "@/components/home/programs-preview";
import { ImpactStats } from "@/components/home/impact-stats";
import { FeaturedStory } from "@/components/home/featured-story";
import { FundingTracker } from "@/components/home/funding-tracker";
import { MessageSection } from "@/components/home/message-section";
import { CtaSection } from "@/components/home/cta-section";
import { SITE } from "@/lib/constants";
import { prisma } from "@/lib/prisma";
import { DonationStatus } from "@prisma/client";

export const metadata: Metadata = {
  title: `${SITE.name} — She Believes. She Leads. She Can.`,
  description: SITE.tagline,
};

export default async function HomePage() {
  let pillars: { slug: string; title: string; summary: string; icon: string }[] =
    [];
  let programs: { slug: string; title: string; summary: string; icon: string }[] =
    [];
  let featuredStory: {
    slug: string;
    title: string;
    excerpt: string;
    coverImage: string | null;
    category: string;
    subjectName: string | null;
    subjectPhoto: string | null;
    pullQuote: string | null;
  } | null = null;
  let settings: Record<string, string> = {};
  let stats = {
    girlsReached: 1200,
    workshops: 48,
    mentors: 85,
    communities: 22,
  };
  let fundingTracker = {
    eventTitle: "Spring Leadership Workshop",
    eventSlug: "spring-leadership-workshop-2026",
    raised: 4200,
    goal: 8000,
    currency: "GHS",
  };

  try {
    const [pillarRows, programRows, story, settingRows, nextEvent, workshopDonations] =
      await Promise.all([
        prisma.program.findMany({
          where: { published: true, order: { lt: 10 } },
          orderBy: { order: "asc" },
          select: { slug: true, title: true, summary: true, icon: true },
        }),
        prisma.program.findMany({
          where: { published: true, order: { gte: 10 } },
          orderBy: { order: "asc" },
          select: { slug: true, title: true, summary: true, icon: true },
        }),
        prisma.story.findFirst({
          where: { published: true, featured: true },
          orderBy: { publishedAt: "desc" },
          select: {
            slug: true,
            title: true,
            excerpt: true,
            coverImage: true,
            category: true,
            subjectName: true,
            subjectPhoto: true,
            pullQuote: true,
          },
        }),
        prisma.siteSetting.findMany({
          where: {
            key: {
              in: [
                "mission_intro",
                "mission_body",
                "mission_title",
                "mission_text",
                "vision_text",
                "stats_girls_reached",
                "stats_workshops",
                "stats_mentors",
                "stats_communities",
                "workshop_funding_goal",
              ],
            },
          },
        }),
        prisma.event.findFirst({
          where: { published: true, startAt: { gt: new Date() } },
          orderBy: { startAt: "asc" },
          select: {
            slug: true,
            title: true,
            fundingGoal: true,
            programId: true,
          },
        }),
        prisma.donation.aggregate({
          where: { status: DonationStatus.PAID },
          _sum: { amount: true },
        }),
      ]);

    if (pillarRows.length > 0) pillars = pillarRows;
    if (programRows.length > 0) programs = programRows;
    if (story) featuredStory = story;

    settings = Object.fromEntries(
      settingRows.map((s: { key: string; value: string }) => [s.key, s.value])
    );

    stats = {
      girlsReached: parseInt(settings.stats_girls_reached ?? "1200", 10) || 1200,
      workshops: parseInt(settings.stats_workshops ?? "48", 10) || 48,
      mentors: parseInt(settings.stats_mentors ?? "85", 10) || 85,
      communities: parseInt(settings.stats_communities ?? "22", 10) || 22,
    };

    if (nextEvent) {
      const goal =
        nextEvent.fundingGoal ??
        parseInt(settings.workshop_funding_goal ?? "8000", 10) ||
        8000;

      let raised = 0;
      if (nextEvent.programId) {
        const designated = await prisma.donation.aggregate({
          where: {
            status: DonationStatus.PAID,
            programId: nextEvent.programId,
          },
          _sum: { amount: true },
        });
        raised = Number(designated._sum.amount ?? 0);
      } else {
        raised = Number(workshopDonations._sum.amount ?? 0) * 0.15;
      }

      fundingTracker = {
        eventTitle: nextEvent.title,
        eventSlug: nextEvent.slug,
        raised: Math.round(raised),
        goal,
        currency: "GHS",
      };
    }
  } catch {
    // Database unavailable — components use built-in fallbacks
  }

  return (
    <>
      <Hero />
      <FeaturedStory story={featuredStory} />
      <ImpactStats {...stats} />
      <ManifestoTicker />
      <MissionVision
        missionIntro={settings.mission_intro}
        missionBody={settings.mission_body}
        missionTitle={settings.mission_title}
        missionText={settings.mission_text}
        visionText={settings.vision_text}
      />
      <Pillars pillars={pillars.length > 0 ? pillars : undefined} />
      <ValuesStrip />
      <ProgramsBento programs={programs.length > 0 ? programs : undefined} />
      <FundingTracker {...fundingTracker} />
      <MessageSection />
      <CtaSection />
    </>
  );
}
