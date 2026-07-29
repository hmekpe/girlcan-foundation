import {
  GraduationCap,
  Crown,
  Handshake,
  Sparkles,
  Megaphone,
  Globe2,
  type LucideIcon,
} from "lucide-react";
import { IconBadge } from "@/components/icon-badge";
import { Reveal } from "@/components/motion";

export type PillarItem = {
  slug: string;
  title: string;
  summary: string;
  icon?: string;
};

const DEFAULT_PILLARS: PillarItem[] = [
  {
    slug: "education",
    title: "Education",
    summary:
      "Providing access to knowledge, resources, and learning opportunities that open doors and expand horizons for girls everywhere.",
    icon: "GraduationCap",
  },
  {
    slug: "leadership",
    title: "Leadership",
    summary:
      "Equipping girls with the skills, mindset, and opportunities to step into leadership roles in their schools, communities, and beyond.",
    icon: "Crown",
  },
  {
    slug: "mentorship",
    title: "Mentorship",
    summary:
      "Connecting young women with inspiring role models and mentors who guide, encourage, and champion their growth and ambitions.",
    icon: "Handshake",
  },
  {
    slug: "confidence",
    title: "Confidence",
    summary:
      "Building the self-belief and inner strength girls need to embrace their potential, use their voice, and show up fully in every space.",
    icon: "Sparkles",
  },
  {
    slug: "advocacy",
    title: "Advocacy",
    summary:
      "Speaking up for girls' rights, amplifying their voices, and driving systemic change for equality and opportunity at every level.",
    icon: "Megaphone",
  },
  {
    slug: "community-impact",
    title: "Community Impact",
    summary:
      "Empowering girls to become active contributors to their communities, creating lasting change from the ground up.",
    icon: "Globe2",
  },
];

const ICON_MAP: Record<string, LucideIcon> = {
  GraduationCap,
  Crown,
  Handshake,
  Sparkles,
  Megaphone,
  Globe2,
};

type PillarsProps = {
  pillars?: PillarItem[];
};

export function Pillars({ pillars = DEFAULT_PILLARS }: PillarsProps) {
  return (
    <section className="relative overflow-hidden bg-plum section-padding">
      <div
        className="pointer-events-none absolute -right-20 top-0 h-72 w-72 rounded-full bg-rose/15 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-[600px] text-center">
          <p className="eyebrow-dark">What We Do</p>
          <h2 className="mt-3 font-display text-white">Our Pillars of Impact</h2>
          <p className="mx-auto mt-4 max-w-[600px] text-center text-white/75 leading-relaxed">
            Through mentorship, advocacy, community outreach, workshops, and
            inspirational content, we nurture confidence, courage, creativity, and
            ambition in every girl we reach.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 [grid-template-columns:repeat(auto-fit,minmax(240px,1fr))]">
          {pillars.map((pillar, i) => {
            const Icon = ICON_MAP[pillar.icon ?? ""] ?? GraduationCap;
            return (
              <Reveal key={pillar.slug} delay={i * 0.05}>
                <article className="group h-full rounded-2xl border border-white/10 bg-white/[0.06] p-6 transition-all duration-200 hover:-translate-y-1 hover:border-rose/50 hover:bg-rose/10 sm:p-8">
                  <IconBadge icon={Icon} tone="rose" size="sm" />
                  <h3 className="mt-4 font-display text-xl font-bold text-white">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 text-sm text-white/70 leading-relaxed sm:text-base">
                    {pillar.summary}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
