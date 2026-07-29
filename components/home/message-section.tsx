import { Reveal } from "@/components/motion";
import { SITE } from "@/lib/constants";

export function MessageSection() {
  return (
    <section className="relative overflow-hidden bg-rose section-padding">
      <span
        className="pointer-events-none absolute -left-4 -top-8 font-display text-[clamp(8rem,20vw,16rem)] font-bold leading-none text-white/[0.07]"
        aria-hidden
      >
        &ldquo;
      </span>

      <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <Reveal>
          <p className="eyebrow-dark">Our Message</p>
          <p className="mx-auto mt-6 max-w-4xl font-display text-[clamp(2rem,4vw,3.5rem)] font-bold italic leading-snug text-white">
            She is <strong className="text-gold-light">strong.</strong> She is{" "}
            <strong className="text-gold-light">capable.</strong> She is{" "}
            <strong className="text-gold-light">enough.</strong> She{" "}
            <strong className="text-gold-light">can.</strong>
          </p>
          <p className="mt-6 text-sm italic text-white/80 sm:text-base">
            — {SITE.name}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
