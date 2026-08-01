import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin, Users } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import { PLACEHOLDER } from "@/lib/constants";
import { format } from "date-fns";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Events",
  description:
    "Join The Girl Can Foundation at upcoming workshops, summits, and community gatherings.",
};

export default async function EventsPage() {
  const now = new Date();
  const events = await prisma.event.findMany({
    where: { published: true },
    orderBy: { startAt: "asc" },
    include: { _count: { select: { registrations: true } } },
  });

  const upcoming = events.filter((e) => e.startAt >= now);
  const past = events.filter((e) => e.startAt < now);

  return (
    <>
      <PageHero
        eyebrow="Gather with us"
        title="Events that bring girls together"
        description="Workshops, summits, and community moments where courage, creativity, and sisterhood come alive."
      />

      <section className="section-padding">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="mb-10">
            <h2 className="text-2xl font-semibold text-text">Upcoming events</h2>
          </Reveal>

          {upcoming.length === 0 ? (
            <p className="text-muted">
              No upcoming events at the moment. Check back soon or subscribe to our
              newsletter for updates.
            </p>
          ) : (
            <div className="grid gap-8 lg:grid-cols-2">
              {upcoming.map((event, i) => (
                <Reveal key={event.id} delay={i * 0.08}>
                  <Link href={`/events/${event.slug}`} className="group block h-full">
                    <Card className="h-full overflow-hidden">
                      <div className="relative aspect-[16/9]">
                        <Image
                          src={event.coverImage || PLACEHOLDER.event}
                          alt={event.title}
                          fill
                          className="object-cover transition-transform group-hover:scale-105"
                          sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                        {event.registrationOpen && (
                          <Badge className="absolute left-4 top-4">Open for registration</Badge>
                        )}
                      </div>
                      <CardContent className="p-6">
                        <h3 className="font-display text-xl font-semibold text-text group-hover:text-rose">
                          {event.title}
                        </h3>
                        <div className="mt-4 space-y-2 text-sm text-muted">
                          <p className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-rose" aria-hidden />
                            {format(event.startAt, "EEEE, MMMM d, yyyy · h:mm a")}
                          </p>
                          <p className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-rose" aria-hidden />
                            {event.location}
                          </p>
                          {event.capacity && (
                            <p className="flex items-center gap-2">
                              <Users className="h-4 w-4 text-rose" aria-hidden />
                              {event._count.registrations} / {event.capacity} registered
                            </p>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}

          {past.length > 0 && (
            <div className="mt-20">
              <Reveal className="mb-8">
                <h2 className="text-2xl font-semibold text-text">Past events</h2>
              </Reveal>
              <div className="space-y-4">
                {past.map((event) => (
                  <Reveal key={event.id}>
                    <Link
                      href={`/events/${event.slug}`}
                      className="flex flex-col gap-2 rounded-2xl border border-rose-pale bg-cream p-5 transition-colors hover:border-rose sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div>
                        <h3 className="font-medium text-text">{event.title}</h3>
                        <p className="text-sm text-muted">
                          {format(event.startAt, "MMMM d, yyyy")} · {event.location}
                        </p>
                      </div>
                      <Badge variant="outline">Past event</Badge>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
