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
                <article className="group h-full rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-6 transition-all duration-300 hover:-translate-y-2 hover:border-rose/50 hover:bg-gradient-to-br hover:from-white/10 hover:to-white/5 hover:shadow-[0_8px_30px_rgba(232,69,90,0.15)] sm:p-8">
                  <div className="relative inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 text-rose transition-all duration-300 group-hover:scale-110 group-hover:bg-rose group-hover:text-white">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 font-display text-xl font-bold text-white transition-colors group-hover:text-rose-pale">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 text-sm text-white/70 leading-relaxed sm:text-base group-hover:text-white/90">
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
