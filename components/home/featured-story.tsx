import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion";
import { Button } from "@/components/ui/button";
import { PLACEHOLDER } from "@/lib/constants";

export type FeaturedStoryProps = {
  story?: {
    slug: string;
    title: string;
    excerpt: string;
    coverImage?: string | null;
    category?: string;
    subjectName?: string | null;
    subjectPhoto?: string | null;
    pullQuote?: string | null;
  } | null;
};

const FALLBACK_STORY = {
  slug: "ama-found-her-voice",
  title: "Ama Found Her Voice",
  excerpt:
    "From quiet classrooms to leading her school debate club — how mentorship helped Ama believe she belongs at the front of the room.",
  coverImage: PLACEHOLDER.story,
  category: "Impact Stories",
  subjectName: "Ama, 16",
  subjectPhoto: PLACEHOLDER.story,
  pullQuote:
    "I used to think leadership wasn't for girls like me. Now I know I belong at the front of the room.",
};

export function FeaturedStory({ story }: FeaturedStoryProps) {
  const featured = story ?? FALLBACK_STORY;
  const imageSrc = featured.subjectPhoto || featured.coverImage || PLACEHOLDER.story;
  const quote = featured.pullQuote || featured.excerpt;
  const name = featured.subjectName || featured.title;

  return (
    <section className="section-padding bg-cream">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">Featured Story</p>
          <h2 className="mt-3 font-display text-text">Voices of Change</h2>
        </Reveal>

        <Reveal delay={0.1} className="mt-12">
          <article className="grid overflow-hidden rounded-2xl bg-white shadow-brand min-[900px]:grid-cols-2">
            <div className="relative aspect-[4/5] min-[900px]:aspect-auto min-[900px]:min-h-[380px]">
              <Image
                src={imageSrc}
                alt={`${name} — featured story`}
                fill
                className="object-cover"
                sizes="(max-width: 900px) 100vw, 50vw"
                priority
              />
            </div>

            <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-12">
              {featured.category && (
                <p className="eyebrow">{featured.category}</p>
              )}
              <h3 className="mt-3 font-display text-2xl font-bold text-text sm:text-3xl">
                {featured.title}
              </h3>
              <blockquote className="mt-4 font-display text-lg italic text-plum leading-relaxed">
                &ldquo;{quote}&rdquo;
              </blockquote>
              <p className="mt-4 text-sm font-semibold text-rose">{name}</p>
              <div className="mt-8">
                <Button asChild variant="secondary">
                  <Link href={`/stories/${featured.slug}`}>
                    Read her story
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                </Button>
              </div>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
