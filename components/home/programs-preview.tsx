import Link from "next/link";
import {
  School,
  Sparkles,
  BookOpen,
  Globe,
  Lightbulb,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { IconBadge } from "@/components/icon-badge";
import { Reveal } from "@/components/motion";

export type ProgramPreviewItem = {
  slug: string;
  title: string;
  summary: string;
  icon?: string;
};

const DEFAULT_PROGRAMS: ProgramPreviewItem[] = [
  {
    slug: "leadership-workshops",
    title: "Leadership Workshops",
    summary:
      "Hands-on, transformative workshops that build leadership skills, public speaking, and decision-making confidence.",
    icon: "School",
  },
  {
    slug: "mentorship-programme",
    title: "Mentorship Programme",
    summary: "Pairing girls with inspiring mentors for guidance, support, and growth.",
    icon: "Sparkles",
  },
  {
    slug: "educational-support",
    title: "Educational Support",
    summary:
      "Resources, scholarships, and programs to keep girls in school and thriving academically.",
    icon: "BookOpen",
  },
  {
    slug: "outreach-advocacy",
    title: "Outreach & Advocacy",
    summary:
      "Community events and campaigns that raise awareness and champion girls' rights.",
    icon: "Globe",
  },
  {
    slug: "inspirational-content",
    title: "Inspirational Content & Safe Spaces",
    summary:
      "Creating platforms and environments where girls can express themselves freely, share stories, and find community with peers who believe in their potential.",
    icon: "Lightbulb",
  },
];

const ICON_MAP: Record<string, LucideIcon> = {
  School,
  Sparkles,
  Sparkle: Sparkles,
  BookOpen,
  Globe,
  Lightbulb,
};

/** Distinct gradient per card position — signature bento layout */
const CARD_GRADIENTS = [
  "from-plum to-plum-deep",
  "from-rose to-rose-deep",
  "from-gold to-gold-deep",
  "from-navy to-navy-deep",
  "from-plum-alt to-plum",
] as const;

type ProgramsBentoProps = {
  programs?: ProgramPreviewItem[];
};

export function ProgramsBento({ programs = DEFAULT_PROGRAMS }: ProgramsBentoProps) {
  return (
    <section className="section-padding bg-cream">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">How We Reach You</p>
          <h2 className="mt-3 font-display text-text">Programs &amp; Initiatives</h2>
          <p className="prose-brand mx-auto mt-4">
            Our initiatives are designed to meet girls where they are and take them
            further than they imagined.
          </p>
        </Reveal>

        <div className="mt-12 grid auto-rows-[minmax(220px,auto)] gap-4 max-[600px]:grid-cols-1 min-[600px]:max-[900px]:grid-cols-2 min-[900px]:grid-cols-3">
          {programs.map((program, i) => {
            const Icon = ICON_MAP[program.icon ?? ""] ?? School;
            const gradient = CARD_GRADIENTS[i % CARD_GRADIENTS.length];
            const spansTwo =
              i === 0 || i === 4
                ? "min-[900px]:col-span-2"
                : "";

            return (
              <Reveal key={program.slug} delay={i * 0.05} className={spansTwo}>
                <Link
                  href={`/programs/${program.slug}`}
                  className={`group relative flex h-full min-h-[260px] flex-col justify-end overflow-hidden rounded-2xl bg-gradient-to-br ${gradient} p-6 transition-transform duration-200 hover:-translate-y-1 sm:p-8`}
                >
                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent"
                    aria-hidden
                  />
                  <div className="relative">
                    <IconBadge icon={Icon} tone="gold" size="sm" />
                    <h3 className="mt-4 font-display text-xl font-bold text-white sm:text-2xl">
                      {program.title}
                    </h3>
                    <p className="mt-2 text-sm text-white/75 leading-relaxed sm:text-base">
                      {program.summary}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-gold-light">
                      Learn more
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/** @deprecated Use ProgramsBento — kept for import compatibility */
export const ProgramsPreview = ProgramsBento;
