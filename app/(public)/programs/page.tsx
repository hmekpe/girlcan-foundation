import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/motion";
import { IconBadge } from "@/components/icon-badge";
import { Card, CardContent } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import { getProgramIcon } from "@/lib/icons";
import { PLACEHOLDER } from "@/lib/constants";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Programs",
  description:
    "Explore The Girl Can Foundation programs — education, leadership, mentorship, confidence, advocacy, and community impact.",
};

export default async function ProgramsPage() {
  const programs = await prisma.program.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
  });

  const pillars = programs.filter((p) => p.order < 10);
  const initiatives = programs.filter((p) => p.order >= 10);

  return (
    <>
      <PageHero
        eyebrow="What we do"
        title="Programs that unlock potential"
        description="From classrooms to community halls, our programs create safe spaces where girls learn, lead, and lift one another up."
      />

      <section className="section-padding">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="mb-12 max-w-2xl">
            <p className="eyebrow mb-3">Our pillars</p>
            <h2 className="text-ink-900">Six foundations of empowerment</h2>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {pillars.map((program, i) => {
              const Icon = getProgramIcon(program.icon);
              return (
                <Reveal key={program.id} delay={i * 0.06}>
                  <Link href={`/programs/${program.slug}`} className="group block h-full">
                    <Card className="h-full overflow-hidden transition-shadow hover:shadow-brand">
                      <div className="relative aspect-[16/10]">
                        <Image
                          src={program.coverImage || PLACEHOLDER.classroom}
                          alt={program.title}
                          fill
                          className="object-cover transition-transform group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      </div>
                      <CardContent className="p-6">
                        <IconBadge icon={Icon} size="sm" className="mb-3" />
                        <h3 className="font-display text-xl font-semibold text-ink-900 group-hover:text-rose-600">
                          {program.title}
                        </h3>
                        <p className="mt-2 text-sm text-ink-600">{program.summary}</p>
                      </CardContent>
                    </Card>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {initiatives.length > 0 && (
        <section className="section-padding bg-cream-100">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal className="mb-12 max-w-2xl">
              <p className="eyebrow mb-3">Initiatives</p>
              <h2 className="text-ink-900">Hands-on experiences that transform</h2>
            </Reveal>
            <div className="grid gap-6 md:grid-cols-2">
              {initiatives.map((program, i) => {
                const Icon = getProgramIcon(program.icon);
                return (
                  <Reveal key={program.id} delay={i * 0.06}>
                    <Link href={`/programs/${program.slug}`} className="group block">
                      <Card className="flex h-full flex-col overflow-hidden sm:flex-row">
                        <div className="relative aspect-[16/10] sm:aspect-auto sm:w-2/5">
                          <Image
                            src={program.coverImage || PLACEHOLDER.workshop}
                            alt={program.title}
                            fill
                            className="object-cover"
                            sizes="200px"
                          />
                        </div>
                        <CardContent className="flex flex-1 flex-col justify-center p-6">
                          <IconBadge icon={Icon} size="sm" className="mb-3" />
                          <h3 className="font-display text-lg font-semibold text-ink-900 group-hover:text-rose-600">
                            {program.title}
                          </h3>
                          <p className="mt-2 text-sm text-ink-600">{program.summary}</p>
                        </CardContent>
                      </Card>
                    </Link>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
