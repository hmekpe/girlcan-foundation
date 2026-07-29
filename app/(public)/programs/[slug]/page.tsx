import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/motion";
import { IconBadge } from "@/components/icon-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import { getProgramIcon } from "@/lib/icons";
import { PLACEHOLDER } from "@/lib/constants";

export const revalidate = 60;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const programs = await prisma.program.findMany({
    where: { published: true },
    select: { slug: true },
  });
  return programs.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const program = await prisma.program.findUnique({ where: { slug } });
  if (!program) return { title: "Program not found" };
  return {
    title: program.title,
    description: program.summary,
  };
}

export default async function ProgramDetailPage({ params }: Props) {
  const { slug } = await params;
  const program = await prisma.program.findUnique({
    where: { slug, published: true },
    include: { testimonials: { take: 3 } },
  });

  if (!program) notFound();

  const Icon = getProgramIcon(program.icon);

  return (
    <>
      <PageHero eyebrow="Program" title={program.title} description={program.summary} />

      <section className="section-padding">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <Reveal>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image
                  src={program.coverImage || PLACEHOLDER.classroom}
                  alt={`${program.title} program`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <IconBadge icon={Icon} className="mb-4" />
              <div className="prose-brand whitespace-pre-line">{program.description}</div>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button asChild>
                  <Link href="/get-involved">Get involved</Link>
                </Button>
                <Button asChild variant="secondary">
                  <Link href="/donate">Support this work</Link>
                </Button>
              </div>
            </Reveal>
          </div>

          {program.testimonials.length > 0 && (
            <div className="mt-20">
              <h2 className="text-center text-2xl font-semibold text-ink-900">
                Voices from the program
              </h2>
              <div className="mt-8 grid gap-6 md:grid-cols-3">
                {program.testimonials.map((t) => (
                  <Card key={t.id} className="border-none bg-rose-50">
                    <CardContent className="p-6">
                      <p className="text-sm italic text-ink-700">&ldquo;{t.quote}&rdquo;</p>
                      <p className="mt-4 text-sm font-medium text-rose-600">{t.name}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          <div className="mt-12">
            <Button asChild variant="ghost">
              <Link href="/programs">
                <ArrowLeft className="h-4 w-4" aria-hidden />
                All programs
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
