import { Reveal } from "@/components/motion";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
};

export function PageHero({ eyebrow, title, description, children }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-rose-pale/40 via-cream to-cream pt-32 pb-16 lg:pt-40 lg:pb-24">
      <div
        className="pointer-events-none absolute -right-20 top-0 h-[500px] w-[500px] rounded-full bg-rose/10 blur-[80px] animate-pulse"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-20 bottom-0 h-[400px] w-[400px] rounded-full bg-gold/10 blur-[80px] animate-pulse delay-500"
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
          <h1 className="text-ink-900">{title}</h1>
          {description && (
            <p className="mt-6 text-lg text-ink-600 md:text-xl">{description}</p>
          )}
          {children}
        </Reveal>
      </div>
    </section>
  );
}
