import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/motion";
import { Button } from "@/components/ui/button";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Thank You",
  description: "Thank you for your donation to The Girl Can Foundation.",
};

export default function DonateSuccessPage() {
  return (
    <>
      <PageHero
        eyebrow="Thank you"
        title="Your gift makes a difference"
        description="We are grateful for your support. A confirmation will be sent to your email shortly."
      />

      <section className="section-padding">
        <div className="mx-auto max-w-xl px-4 text-center sm:px-6">
          <Reveal>
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-state-success/10 text-state-success">
              <CheckCircle className="h-8 w-8" aria-hidden />
            </div>
            <p className="mt-6 text-ink-600">
              Because of you, a girl somewhere is one step closer to believing
              she is strong, she is capable, and she can.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button asChild>
                <Link href="/stories">Read our stories</Link>
              </Button>
              <Button asChild variant="secondary">
                <Link href="/">Return home</Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
