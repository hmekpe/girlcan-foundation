import { Reveal, CountUp } from "@/components/motion";

export type ImpactStatsProps = {
  girlsReached?: number;
  workshops?: number;
  mentors?: number;
  communities?: number;
};

const STATS = [
  { key: "girlsReached" as const, label: "Girls Reached", suffix: "+" },
  { key: "workshops" as const, label: "Workshops Held", suffix: "+" },
  { key: "mentors" as const, label: "Active Mentors", suffix: "+" },
  { key: "communities" as const, label: "Communities Served", suffix: "+" },
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
          {STATS.map((stat, i) => (
            <Reveal key={stat.key} delay={i * 0.08} className="text-center">
              <div className="font-display text-4xl font-bold text-gold-light sm:text-5xl">
                <CountUp value={values[stat.key]} suffix={stat.suffix} />
              </div>
              <p className="mt-2 text-sm font-medium text-muted sm:text-base">
                {stat.label}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
