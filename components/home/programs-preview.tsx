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
                  className={`group relative flex h-full min-h-[260px] flex-col justify-end overflow-hidden rounded-[28px] bg-gradient-to-br ${gradient} p-6 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] hover:shadow-brand sm:p-8`}
                >
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] opacity-50 mix-blend-overlay"></div>
                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500 group-hover:opacity-70"
                    aria-hidden
                  />
                  <div className="relative z-10 transition-transform duration-500 group-hover:translate-y-[-4px]">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 text-gold-light backdrop-blur-sm transition-transform duration-500 group-hover:scale-110 group-hover:bg-white/30">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-5 font-display text-xl font-bold text-white sm:text-2xl transition-colors duration-300 group-hover:text-gold-light">
                      {program.title}
                    </h3>
                    <p className="mt-2 text-sm text-white/75 leading-relaxed sm:text-base group-hover:text-white/90">
                      {program.summary}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-gold-light opacity-0 transition-all duration-500 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0">
                      Learn more
                      <ArrowRight className="h-4 w-4" />
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
