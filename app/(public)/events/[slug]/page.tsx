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


export const revalidate = 30;

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
  
  let fillPercentage = 0;
  if (event.capacity && event.capacity > 0) {
    fillPercentage = Math.min(100, Math.round((event._count.registrations / event.capacity) * 100));
  }
  const isHighFill = fillPercentage > 80;

  return (
    <>
      <PageHero eyebrow="Event" title={event.title} />

      <section className="section-padding bg-cream">
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
              <div className="mt-6 space-y-4 text-muted">
                <p className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-rose" aria-hidden />
                  {format(event.startAt, "EEEE, MMMM d, yyyy · h:mm a")}
                  {event.endAt && ` – ${format(event.endAt, "h:mm a")}`}
                </p>
                <p className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-rose" aria-hidden />
                  {event.location}
                </p>
                
                {event.capacity && (
                  <div className="mt-4 rounded-xl border border-rose-pale bg-cream p-4">
                    <p className="mb-2 flex items-center justify-between text-sm font-medium text-text">
                      <span className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-rose" aria-hidden />
                        {event._count.registrations} of {event.capacity} spots filled
                      </span>
                      <span>{fillPercentage}%</span>
                    </p>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-rose-pale">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${isHighFill ? 'bg-gold' : 'bg-rose'}`} 
                        style={{ width: `${fillPercentage}%` }} 
                      />
                    </div>
                    {isHighFill && !isPast && (
                      <p className="mt-2 text-xs text-gold-light">
                        Hurry, spots are almost gone!
                      </p>
                    )}
                  </div>
                )}
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="prose-brand whitespace-pre-line text-text">{event.description}</div>

              {!isPast && (
                <Card className="mt-8 border-rose-pale bg-rose-pale">
                  <CardContent className="p-6">
                    <h2 className="font-display text-xl font-semibold text-text">
                      Register for this event
                    </h2>
                    <p className="mt-2 text-sm text-muted">
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
                <p className="mt-8 rounded-2xl border border-rose-pale bg-cream px-4 py-3 text-sm text-muted">
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
