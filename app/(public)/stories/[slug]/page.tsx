import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { sanitizeHtml } from "@/lib/sanitize";
import { format } from "date-fns";

export const revalidate = 60;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const stories = await prisma.story.findMany({
    where: { published: true },
    select: { slug: true },
  });
  return stories.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const story = await prisma.story.findUnique({ where: { slug } });
  if (!story) return { title: "Story not found" };
  return {
    title: story.title,
    description: story.excerpt,
  };
}

export default async function StoryDetailPage({ params }: Props) {
  const { slug } = await params;
  const story = await prisma.story.findUnique({
    where: { slug, published: true },
    include: { author: { select: { name: true } } },
  });

  if (!story) notFound();

  const content = sanitizeHtml(story.contentRich);

  return (
    <>
      <PageHero eyebrow={story.category} title={story.title} description={story.excerpt} />

      <article className="section-padding">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {story.coverImage && (
            <Reveal>
              <div className="relative mb-10 aspect-[16/9] overflow-hidden rounded-2xl">
                <Image
                  src={story.coverImage}
                  alt={story.title}
                  fill
                  className="object-cover"
                  sizes="768px"
                  priority
                />
              </div>
            </Reveal>
          )}

          <Reveal delay={0.1}>
            <div className="mb-8 flex flex-wrap items-center gap-3 text-sm text-ink-500">
              <Badge variant="cream">{story.category}</Badge>
              {story.publishedAt && (
                <time dateTime={story.publishedAt.toISOString()}>
                  {format(story.publishedAt, "MMMM d, yyyy")}
                </time>
              )}
              {story.author && <span>By {story.author.name}</span>}
            </div>

            <div
              className="prose-brand [&_p]:mb-4 [&_p:last-child]:mb-0"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </Reveal>

          <div className="mt-12 border-t border-cream-300 pt-8">
            <Button asChild variant="ghost">
              <Link href="/stories">
                <ArrowLeft className="h-4 w-4" aria-hidden />
                All stories
              </Link>
            </Button>
          </div>
        </div>
      </article>
    </>
  );
}
