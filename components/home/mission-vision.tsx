import { Reveal } from "@/components/motion";

type MissionVisionProps = {
  missionIntro?: string;
  missionBody?: string;
  missionTitle?: string;
  missionText?: string;
  visionText?: string;
};

export function MissionVision(props: MissionVisionProps) {
  const missionIntro =
    props.missionIntro ??
    "At The Girl Can Foundation, we believe that every girl — regardless of her background or circumstances — has the power to dream big, lead boldly, and create meaningful change in her community and beyond.";
  const missionBody =
    props.missionBody ??
    "We focus on creating safe spaces where girls are encouraged to express themselves, grow in knowledge, develop life skills, and embrace their unique potential.";
  const missionTitle = props.missionTitle ?? "Inspire. Educate. Mentor. Support.";
  const missionText =
    props.missionText ??
    "To inspire, educate, mentor, and support girls through programs and opportunities that promote leadership, personal development, education, confidence-building, and social impact.";
  const visionText =
    props.visionText ??
    "To raise a generation of empowered, resilient, and purpose-driven girls equipped to break barriers and become leaders, changemakers, and role models.";

  return (
    <section className="section-padding bg-cream">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 min-[900px]:grid-cols-2 min-[900px]:gap-16 lg:px-8">
        <Reveal>
          <p className="eyebrow">Who We Are</p>
          <h2 className="mt-3 font-display text-text">
            Driven by Purpose,
            <br />
            Fuelled by Passion
          </h2>
          <p className="prose-brand mt-6">{missionIntro}</p>
          <p className="prose-brand mt-4">{missionBody}</p>
        </Reveal>

        <div className="space-y-6">
          <Reveal delay={0.1}>
            <div className="relative overflow-hidden rounded-[28px] bg-plum p-6 sm:p-8">
              <div
                className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-rose/20 blur-2xl"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-gold/20 blur-2xl"
                aria-hidden
              />
              <p className="eyebrow-dark relative">Our Mission</p>
              <p className="relative mt-3 font-display text-[1.6rem] font-bold italic leading-snug text-white">
                {missionTitle}
              </p>
              <p className="relative mt-4 text-white/75 leading-relaxed">{missionText}</p>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="border-l-4 border-rose pl-6">
              <p className="font-display text-lg font-bold italic leading-relaxed text-plum sm:text-xl">
                &ldquo;{visionText}&rdquo;
              </p>
              <p className="eyebrow mt-6">Our Vision</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
