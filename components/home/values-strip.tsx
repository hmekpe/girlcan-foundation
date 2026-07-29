import { VALUES } from "@/lib/constants";
import { Reveal } from "@/components/motion";

export function ValuesStrip() {
  return (
    <section className="section-padding bg-rose-pale">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <Reveal>
          <h3 className="font-display text-2xl font-bold italic text-rose sm:text-3xl">
            What We Stand For
          </h3>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {VALUES.map((value) => (
              <span
                key={value}
                className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-plum shadow-brand transition-all duration-200 hover:bg-rose hover:text-white hover:shadow-rose-glow"
              >
                {value}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
