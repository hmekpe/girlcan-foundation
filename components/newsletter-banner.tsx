import { Reveal } from "@/components/motion";
import { NewsletterForm } from "@/components/forms/newsletter-form";

export function NewsletterBanner() {
  return (
    <section className="border-t border-cream-300 bg-rose-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow mb-2">Stay connected</p>
          <h2 className="text-2xl font-semibold text-ink-900 md:text-3xl">
            Stories, events, and ways to support
          </h2>
          <p className="mt-3 text-ink-600">
            Join our community and hear how girls are dreaming big, leading boldly,
            and creating change.
          </p>
          <div className="mt-6">
            <NewsletterForm compact />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
