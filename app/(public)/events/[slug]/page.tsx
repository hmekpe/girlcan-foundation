import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, MapPin, Users } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { EventRsvpForm } from "@/components/forms/event-rsvp-form";
import { prisma } from "@/lib/prisma";
import { PLACEHOLDER } from "@/lib/constants";
import { format } from "date-fns";

export const revalidate = 60;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const events = await prisma.event.findMany({
    where: { published: true },
    select: { slug: true },
  });
  return events.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event = await prisma.event.findUnique({ where: { slug } });
  if (!event) return { title: "Event not found" };
  return {
    title: event.title,
    description: event.description.slice(0, 160),
  };
}

export default async function EventDetailPage({ params }: Props) {
  const { slug } = await params;
  const event = await prisma.event.findUnique({
    where: { slug, published: true },
    include: { _count: { select: { registrations: true } } },
  });

  if (!event) notFound();

  const isPast = event.startAt < new Date();
  const spotsLeft =
    event.capacity != null
      ? Math.max(0, event.capacity - event._count.registrations)
      : null;

  return (
    <>
      <PageHero eyebrow="Event" title={event.title} />

      <section className="section-padding">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <Reveal>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image
                  src={event.coverImage || PLACEHOLDER.event}
                  alt={event.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
              <div className="mt-6 space-y-3 text-ink-600">
                <p className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-rose-500" aria-hidden />
                  {format(event.startAt, "EEEE, MMMM d, yyyy · h:mm a")}
                  {event.endAt && ` – ${format(event.endAt, "h:mm a")}`}
                </p>
                <p className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-rose-500" aria-hidden />
                  {event.location}
                </p>
                {event.capacity && (
                  <p className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-rose" aria-hidden />
                    {event._count.registrations} of {event.capacity} spots filled
                  </p>
                )}
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="prose-brand whitespace-pre-line">{event.description}</div>

              {!isPast && (
                <Card className="mt-8 border-rose-200 bg-rose-50">
                  <CardContent className="p-6">
                    <h2 className="font-display text-xl font-semibold text-ink-900">
                      Register for this event
                    </h2>
                    <p className="mt-2 text-sm text-ink-600">
                      Reserve your place and we will send you a confirmation email.
                    </p>
                    <div className="mt-6">
                      <EventRsvpForm
                        eventId={event.id}
                        registrationOpen={event.registrationOpen}
                      />
                    </div>
                  </CardContent>
                </Card>
              )}

              {isPast && (
                <p className="mt-8 rounded-2xl border border-cream-300 bg-cream-100 px-4 py-3 text-sm text-ink-600">
                  This event has already taken place. Explore our other upcoming
                  gatherings on the events page.
                </p>
              )}
            </Reveal>
          </div>

          <div className="mt-12">
            <Button asChild variant="ghost">
              <Link href="/events">
                <ArrowLeft className="h-4 w-4" aria-hidden />
                All events
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
