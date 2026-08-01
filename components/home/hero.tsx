"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { PLACEHOLDER } from "@/lib/constants";

const TAGS = ["Mentorship", "Leadership", "Advocacy", "Community"] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

export function Hero({ imageHero }: { imageHero?: string }) {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-rose-pale/20 via-cream to-cream pt-28 pb-16 lg:pt-36 lg:pb-24">
      <div
        className="pointer-events-none absolute -right-20 top-10 h-[600px] w-[600px] rounded-full bg-rose/15 blur-3xl animate-pulse"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-24 bottom-0 h-[500px] w-[500px] rounded-full bg-gold/15 blur-3xl animate-pulse delay-700"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-40 top-1/3 h-[600px] w-[600px] rounded-full border border-rose/10 bg-rose/5"
        aria-hidden
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 max-[900px]:grid-cols-1 min-[900px]:grid-cols-2 min-[900px]:gap-16 lg:px-8">
        <div>
          <motion.div
            custom={0}
            initial={reduce ? false : "hidden"}
            animate="visible"
            variants={fadeUp}
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-rose-pale px-4 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-rose">
              <span className="h-1.5 w-1.5 rounded-full bg-rose" aria-hidden />
              Empowering Girls &amp; Young Women
            </div>
          </motion.div>

          <motion.h1
            custom={1}
            initial={reduce ? false : "hidden"}
            animate="visible"
            variants={fadeUp}
            className="mt-6 font-display text-text"
          >
            She Believes.
            <br />
            She Leads.
            <br />
            <em className="hero-underline font-bold italic text-rose">She Can.</em>
          </motion.h1>

          <motion.p
            custom={2}
            initial={reduce ? false : "hidden"}
            animate="visible"
            variants={fadeUp}
            className="mt-6 max-w-[500px] text-muted"
          >
            The Girl Can Foundation is committed to helping every girl discover her
            strength, build unshakeable confidence, and reach her full potential —
            regardless of her background or circumstances.
          </motion.p>

          <motion.div
            custom={3}
            initial={reduce ? false : "hidden"}
            animate="visible"
            variants={fadeUp}
            className="mt-8 flex flex-wrap gap-4"
          >
            <Button asChild size="lg">
              <Link href="/get-involved">
                Join the Movement
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href="/about">Our Story</Link>
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative mx-auto hidden w-full max-w-lg min-[900px]:block lg:max-w-none"
        >
          <div className="hero-card-stack relative mx-auto w-full max-w-md lg:max-w-lg">
            <div
              className="absolute inset-0 translate-x-6 translate-y-6 rounded-2xl bg-rose-pale"
              aria-hidden
            />
            <div
              className="absolute inset-0 translate-x-3 translate-y-3 rounded-2xl bg-gold-light/40"
              aria-hidden
            />
            <div className="absolute inset-0 -m-1 rounded-3xl bg-gradient-to-r from-rose via-gold to-rose opacity-50 blur shimmer" aria-hidden />

            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-plum via-plum-deep to-deep p-6 sm:p-8">
              {/* Background Image Layer */}
              <div 
                className="absolute inset-0 opacity-20 bg-cover bg-center transition-all duration-500" 
                style={{ backgroundImage: `url(${imageHero || PLACEHOLDER.hero})` }}
              />
              <blockquote className="font-display text-lg font-bold italic leading-snug text-white sm:text-xl">
                &ldquo;Every girl has the power to dream big, lead boldly, and create
                meaningful change.&rdquo;
              </blockquote>
              <p className="mt-4 text-sm text-white/70 leading-relaxed sm:text-base">
                Creating safe spaces where girls are encouraged to express
                themselves, grow in knowledge, and embrace their unique potential.
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {TAGS.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white/90"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <motion.div 
                className="mt-6 grid grid-cols-3 gap-4 border-t border-white/20 pt-4"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: {
                    transition: { staggerChildren: 0.1, delayChildren: 0.8 }
                  }
                }}
              >
                <motion.div variants={fadeUp} className="text-center">
                  <div className="font-display text-2xl font-bold text-gold-light">
                    1,200+
                  </div>
                  <div className="text-xs text-white/60">Girls Reached</div>
                </motion.div>
                <motion.div variants={fadeUp} className="text-center">
                  <div className="font-display text-2xl font-bold text-gold-light">
                    48+
                  </div>
                  <div className="text-xs text-white/60">Workshops</div>
                </motion.div>
                <motion.div variants={fadeUp} className="text-center">
                  <div className="font-display text-2xl font-bold text-gold-light">
                    85+
                  </div>
                  <div className="text-xs text-white/60">Mentors</div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
