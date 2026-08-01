import { Reveal, CountUp } from "@/components/motion";
import { Users, BookOpen, Heart, Globe2 } from "lucide-react";

export type ImpactStatsProps = {
  girlsReached?: number;
  workshops?: number;
  mentors?: number;
  communities?: number;
};

const STATS = [
  { key: "girlsReached" as const, label: "Girls Reached", suffix: "+", icon: Users },
  { key: "workshops" as const, label: "Workshops Held", suffix: "+", icon: BookOpen },
  { key: "mentors" as const, label: "Active Mentors", suffix: "+", icon: Heart },
  { key: "communities" as const, label: "Communities Served", suffix: "+", icon: Globe2 },
];

export function ImpactStats({
  girlsReached = 1200,
  workshops = 48,
  mentors = 85,
  communities = 22,
}: ImpactStatsProps) {
  const values = { girlsReached, workshops, mentors, communities };

  return (
    <section className="section-padding bg-cream">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">Our Impact</p>
          <h2 className="mt-3 font-display text-text">Numbers That Tell a Story</h2>
          <p className="prose-brand mx-auto mt-4">
            Every number represents a girl who discovered her strength, found her
            voice, and stepped into her power.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-8 lg:grid-cols-4">
          {STATS.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <Reveal key={stat.key} delay={i * 0.08} className="text-center group">
                <div className="relative mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-pale to-cream shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:shadow-rose-glow">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-rose/20 to-gold/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <Icon className="relative z-10 h-8 w-8 text-rose" strokeWidth={1.5} />
                </div>
                <div className="font-display text-4xl font-bold text-gold-deep transition-colors duration-300 group-hover:text-rose sm:text-5xl">
                  <CountUp value={values[stat.key]} suffix={stat.suffix} />
                </div>
                <p className="mt-2 text-sm font-medium text-muted sm:text-base">
                  {stat.label}
                </p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
