import { Reveal } from "@/components/motion";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
};

export function PageHero({ eyebrow, title, description, children }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-rose-50 to-cream-50 pt-32 pb-16 lg:pt-40 lg:pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
