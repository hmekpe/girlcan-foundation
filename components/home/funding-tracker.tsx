import Link from "next/link";
import { Reveal } from "@/components/motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export type FundingTrackerProps = {
  eventTitle?: string;
  eventSlug?: string;
  raised?: number;
  goal?: number;
  currency?: string;
};

export function FundingTracker({
  eventTitle = "Spring Leadership Workshop",
  eventSlug = "spring-leadership-workshop-2026",
  raised = 4200,
  goal = 8000,
  currency = "GHS",
}: FundingTrackerProps) {
  const pct = goal > 0 ? Math.min(100, Math.round((raised / goal) * 100)) : 0;

  return (
    <section className="section-padding bg-cream">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="rounded-2xl border border-rose-pale bg-white p-6 shadow-brand sm:p-8">
            <p className="eyebrow">Upcoming Workshop</p>
            <h2 className="mt-2 font-display text-xl text-text sm:text-2xl">
              Funding progress: {eventTitle}
            </h2>
            <p className="mt-2 text-sm text-muted">
              Live tracker — updates as designated gifts come in.
            </p>

            <div className="mt-6">
              <div className="mb-2 flex justify-between text-sm font-semibold">
                <span className="text-rose">
                  {currency} {raised.toLocaleString()} raised
                </span>
                <span className="text-muted">
                  Goal: {currency} {goal.toLocaleString()}
                </span>
              </div>
              <Progress value={pct} className="h-3 bg-rose-pale" />
              <p className="mt-2 text-xs text-muted">{pct}% funded</p>
            </div>

            <Button asChild className="mt-6">
              <Link href={`/events/${eventSlug}`}>View workshop details</Link>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
