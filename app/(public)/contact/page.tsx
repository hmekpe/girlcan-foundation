import type { Metadata } from "next";
import { Mail, MapPin, Clock } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/motion";
import { IconBadge } from "@/components/icon-badge";
import { Card, CardContent } from "@/components/ui/card";
import { ContactForm } from "@/components/forms/contact-form";
import { NewsletterForm } from "@/components/forms/newsletter-form";
import { SITE } from "@/lib/constants";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with The Girl Can Foundation — we'd love to hear from you.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="We would love to hear from you"
        description="Questions, partnerships, media enquiries, or simply a hello — our team is here and ready to connect."
      />

      <section className="section-padding">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-3">
            <Reveal className="space-y-6">
              <Card>
                <CardContent className="flex items-start gap-4 p-6">
                  <IconBadge icon={Mail} tone="rose" size="sm" />
                  <div>
                    <h3 className="font-medium text-ink-900">Email</h3>
                    <a
                      href={`mailto:${SITE.email}`}
                      className="mt-1 text-sm text-rose-600 hover:underline"
                    >
                      {SITE.email}
                    </a>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex items-start gap-4 p-6">
                  <IconBadge icon={MapPin} tone="gold" size="sm" />
                  <div>
                    <h3 className="font-medium text-ink-900">Location</h3>
                    <p className="mt-1 text-sm text-ink-600">Accra, Ghana</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex items-start gap-4 p-6">
                  <IconBadge icon={Clock} tone="rose" size="sm" />
                  <div>
                    <h3 className="font-medium text-ink-900">Response time</h3>
                    <p className="mt-1 text-sm text-ink-600">
                      We aim to respond within 2–3 business days.
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-rose-200 bg-rose-50">
                <CardContent className="p-6">
                  <h3 className="font-medium text-ink-900">Newsletter</h3>
                  <p className="mt-2 text-sm text-ink-600">
                    Stay updated on stories, events, and ways to support.
                  </p>
                  <div className="mt-4">
                    <NewsletterForm />
                  </div>
                </CardContent>
              </Card>
            </Reveal>

            <Reveal delay={0.1} className="lg:col-span-2">
              <Card>
                <CardContent className="p-8">
                  <h2 className="font-display text-2xl font-semibold text-ink-900">
                    Send us a message
                  </h2>
                  <p className="mt-2 text-sm text-ink-600">
                    Fill in the form below and we will get back to you as soon as we can.
                  </p>
                  <div className="mt-8">
                    <ContactForm />
                  </div>
                </CardContent>
              </Card>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
