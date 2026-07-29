import Link from "next/link";
import { Reveal } from "@/components/motion";
import { Button } from "@/components/ui/button";

export function CtaSection() {
  return (
    <section className="section-padding bg-cream">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-[28px] bg-plum p-8 sm:p-12 lg:p-16">
            <div
              className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-rose/20 blur-3xl"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -bottom-10 -left-10 h-48 w-48 rounded-full bg-gold/20 blur-3xl"
              aria-hidden
            />

            <div className="relative grid gap-10 min-[900px]:grid-cols-2 min-[900px]:items-center">
              <div>
                <p className="eyebrow-dark">Get Involved</p>
                <h2 className="mt-3 font-display text-white">
                  Be Part of the
                  <br />
                  Movement
                </h2>
                <p className="mt-4 max-w-lg text-white/75 leading-relaxed">
                  Your voices matter. Your dreams are valid. Your future is full of
                  possibilities. Together, we can build a generation of empowered,
                  resilient, purpose-driven women.
                </p>
              </div>

              <div className="flex flex-col gap-3 max-[600px]:w-full sm:flex-row sm:flex-wrap min-[900px]:flex-col lg:flex-row">
                <Button asChild variant="white" size="lg" className="max-[600px]:w-full">
                  <Link href="/get-involved#partner">Partner With Us</Link>
                </Button>
                <Button asChild variant="outlineWhite" size="lg" className="max-[600px]:w-full">
                  <Link href="/get-involved#volunteer">Volunteer</Link>
                </Button>
                <Button asChild variant="outlineWhite" size="lg" className="max-[600px]:w-full">
                  <Link href="/donate">Donate</Link>
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
