import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { PLACEHOLDER, SITE } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";
import { Metadata } from "next";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const story = await prisma.story.findUnique({
    where: { slug: params.slug },
  });
  if (!story) return { title: "Story Not Found" };
  return {
    title: `${story.title} - ${SITE.shortName}`,
    description: story.excerpt,
    openGraph: {
      images: [story.coverImage || PLACEHOLDER.story],
    },
  };
}

export default async function StoryPage({ params }: { params: { slug: string } }) {
  const story = await prisma.story.findUnique({
    where: { slug: params.slug },
  });

  if (!story) notFound();

  return (
    <article className="bg-cream min-h-screen">
      <div className="relative h-[60vh] min-h-[400px] w-full bg-deep">
        <Image
          src={story.coverImage || PLACEHOLDER.story}
          alt={story.title}
          fill
          className="object-cover opacity-70"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-deep/90 via-deep/40 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto w-full max-w-4xl px-4 pb-12 sm:px-6 lg:px-8">
            <Badge variant="gold" className="mb-4">
              {story.category}
            </Badge>
            <h1 className="font-display text-4xl font-bold text-cream sm:text-5xl lg:text-6xl">
              {story.title}
            </h1>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <Link
          href="/stories"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-rose hover:text-plum transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to stories
        </Link>

        {story.subjectName && (
          <div className="mb-12 flex items-center gap-4">
            {story.subjectPhoto && (
              <div className="relative h-16 w-16 overflow-hidden rounded-full border-2 border-rose-pale">
                <Image
                  src={story.subjectPhoto}
                  alt={story.subjectName}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div>
              <p className="font-medium text-text">{story.subjectName}</p>
              {story.publishedAt && (
                <p className="text-sm text-muted">
                  {format(story.publishedAt, "MMMM d, yyyy")}
                </p>
              )}
            </div>
          </div>
        )}

        {!story.subjectName && story.publishedAt && (
          <div className="mb-12">
            <p className="text-sm text-muted">
              {format(story.publishedAt, "MMMM d, yyyy")}
            </p>
          </div>
        )}

        <div className="prose prose-lg prose-rose mx-auto max-w-none text-text">
          {story.pullQuote && (
            <blockquote className="my-10 border-l-4 border-rose pl-6 text-2xl italic text-plum font-display">
              {story.pullQuote}
            </blockquote>
          )}

          <div dangerouslySetInnerHTML={{ __html: story.contentRich }} />
        </div>
      </div>
    </article>
  );
}
