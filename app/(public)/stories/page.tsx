import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import { PLACEHOLDER } from "@/lib/constants";
import { format } from "date-fns";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Stories",
  description:
    "Read stories from The Girl Can Foundation — impact, programs, advocacy, and the girls who are leading boldly.",
};

export default async function StoriesPage() {
  const stories = await prisma.story.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
  });

  const featured = stories.find((s) => s.featured) ?? stories[0];
  const rest = stories.filter((s) => s.id !== featured?.id);

  return (
    <>
      <PageHero
        eyebrow="Stories"
        title="Her story is our story"
        description="Real moments from girls, mentors, and communities — proof that when she believes, she can."
      />

      {featured && (
        <section className="pb-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <Link href={`/stories/${featured.slug}`} className="group block">
                <Card className="overflow-hidden border-none">
                  <div className="grid lg:grid-cols-2">
                    <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[360px]">
                      <Image
                        src={featured.coverImage || PLACEHOLDER.story}
                        alt={featured.title}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        priority
                      />
                    </div>
                    <CardContent className="flex flex-col justify-center p-8 lg:p-12">
                      <Badge variant="gold" className="mb-4 w-fit">
                        Featured
                      </Badge>
                      <Badge variant="cream" className="mb-3 w-fit">
                        {featured.category}
                      </Badge>
                      <h2 className="font-display text-2xl font-semibold text-ink-900 group-hover:text-rose-600 lg:text-3xl">
                        {featured.title}
                      </h2>
                      <p className="mt-4 text-ink-600">{featured.excerpt}</p>
                      {featured.publishedAt && (
                        <p className="mt-4 text-sm text-ink-500">
                          {format(featured.publishedAt, "MMMM d, yyyy")}
                        </p>
                      )}
                    </CardContent>
                  </div>
                </Card>
              </Link>
            </Reveal>
          </div>
        </section>
      )}

      <section className="section-padding bg-cream-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((story, i) => (
              <Reveal key={story.id} delay={i * 0.06}>
                <Link href={`/stories/${story.slug}`} className="group block h-full">
                  <Card className="h-full overflow-hidden">
                    <div className="relative aspect-[16/10]">
                      <Image
                        src={story.coverImage || PLACEHOLDER.story}
                        alt={story.title}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                    <CardContent className="p-6">
                      <Badge variant="cream" className="mb-3">
                        {story.category}
                      </Badge>
                      <h3 className="font-display text-lg font-semibold text-ink-900 group-hover:text-rose-600">
                        {story.title}
                      </h3>
                      <p className="mt-2 line-clamp-3 text-sm text-ink-600">
                        {story.excerpt}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
