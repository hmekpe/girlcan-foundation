import type { Metadata } from "next";
import Link from "next/link";
import { Heart, Handshake, Megaphone } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/motion";
import { IconBadge } from "@/components/icon-badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { VolunteerForm } from "@/components/forms/volunteer-form";
import { PartnerForm } from "@/components/forms/partner-form";
import { ContactForm } from "@/components/forms/contact-form";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Get Involved",
  description:
    "Volunteer, partner, or fundraise with The Girl Can Foundation and help girls lead boldly.",
};

export default function GetInvolvedPage() {
  return (
    <>
      <PageHero
        eyebrow="Join the movement"
        title="There is a place for you here"
        description="Whether you give your time, your platform, or your creativity — your contribution helps girls discover their strength and reach their full potential."
      />

      <section className="section-padding">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="volunteer" className="w-full">
            <TabsList className="mb-8 w-full flex-wrap">
              <TabsTrigger value="volunteer" className="flex-1 sm:flex-none">
                Volunteer
              </TabsTrigger>
              <TabsTrigger value="partner" id="partner" className="flex-1 sm:flex-none">
                Partner
              </TabsTrigger>
              <TabsTrigger value="fundraise" className="flex-1 sm:flex-none">
                Fundraise
              </TabsTrigger>
            </TabsList>

            <TabsContent value="volunteer">
              <Reveal>
                <Card>
                  <CardContent className="p-8">
                    <div className="mb-6 flex items-start gap-4">
                      <IconBadge icon={Heart} tone="rose" />
                      <div>
                        <h2 className="font-display text-2xl font-semibold text-ink-900">
                          Volunteer with us
                        </h2>
                        <p className="mt-2 text-ink-600">
                          Mentors, workshop facilitators, event helpers, and
                          behind-the-scenes supporters — we welcome hearts ready
                          to serve.
                        </p>
                      </div>
                    </div>
                    <VolunteerForm />
                  </CardContent>
                </Card>
              </Reveal>
            </TabsContent>

            <TabsContent value="partner">
              <Reveal>
                <Card>
                  <CardContent className="p-8">
                    <div className="mb-6 flex items-start gap-4">
                      <IconBadge icon={Handshake} tone="gold" />
                      <div>
                        <h2 className="font-display text-2xl font-semibold text-ink-900">
                          Partner with us
                        </h2>
                        <p className="mt-2 text-ink-600">
                          Schools, organisations, and businesses — let us explore
                          how we can amplify impact together.
                        </p>
                      </div>
                    </div>
                    <PartnerForm />
                  </CardContent>
                </Card>
              </Reveal>
            </TabsContent>

            <TabsContent value="fundraise">
              <Reveal>
                <Card>
                  <CardContent className="p-8">
                    <div className="mb-6 flex items-start gap-4">
                      <IconBadge icon={Megaphone} tone="rose" />
                      <div>
                        <h2 className="font-display text-2xl font-semibold text-ink-900">
                          Fundraise for girls
                        </h2>
                        <p className="mt-2 text-ink-600">
                          Host a birthday fundraiser, run a community event, or
                          rally your network — every gift helps a girl believe she
                          can.
                        </p>
                      </div>
                    </div>
                    <div className="mb-8 rounded-2xl border border-gold-200 bg-gold-50 p-5 text-sm text-ink-700">
                      <p className="font-medium">Ready to start giving?</p>
                      <p className="mt-2">
                        You can donate directly or tell us about your fundraising
                        idea and we will support you with materials and guidance.
                      </p>
                      <Button asChild className="mt-4">
                        <Link href="/donate">Donate now</Link>
                      </Button>
                    </div>
                    <h3 className="mb-4 font-medium text-ink-900">
                      Tell us about your fundraiser
                    </h3>
                    <ContactForm defaultSubject="Fundraising inquiry" />
                  </CardContent>
                </Card>
              </Reveal>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </>
  );
}
