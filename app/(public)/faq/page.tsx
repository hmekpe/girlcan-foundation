import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions about The Girl Can Foundation, our programs, donations, and how to get involved.",
};

const FAQ_ITEMS = [
  {
    q: "What is The Girl Can Foundation?",
    a: "We are a nonprofit committed to empowering girls and young women through education, leadership, mentorship, confidence-building, and advocacy. We create safe spaces where every girl can discover her strength and reach her full potential.",
  },
  {
    q: "Who can participate in your programs?",
    a: "Our programs primarily serve girls and young women aged 13–19, though specific events and initiatives may vary. We welcome participants from all backgrounds and work to remove barriers to access wherever we can.",
  },
  {
    q: "How can I volunteer?",
    a: "Visit our Get Involved page and complete the volunteer application form. We will review your submission and reach out to discuss opportunities that match your skills and availability.",
  },
  {
    q: "How are donations used?",
    a: "Donations support program delivery — workshops, mentorship, educational materials, and community outreach. We are committed to financial transparency and publish impact summaries on our Impact page.",
  },
  {
    q: "Is my payment information secure?",
    a: "Yes. Card payments are processed entirely by Paystack (for GHS) or Stripe (for USD). We never store card numbers or CVV codes on our servers.",
  },
  {
    q: "Can my organisation partner with you?",
    a: "Absolutely. Schools, businesses, and community organisations can partner with us for workshops, sponsorships, and joint advocacy. Submit a partnership inquiry on our Get Involved page.",
  },
  {
    q: "How do I register for an event?",
    a: "Browse upcoming events on our Events page, select the event you are interested in, and complete the registration form. You will receive a confirmation email once registered.",
  },
  {
    q: "How can I stay updated?",
    a: "Subscribe to our newsletter on the Contact page or footer. We share stories, event announcements, and ways to support — without overwhelming your inbox.",
  },
];

export default function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title="Questions we hear often"
        description="If you do not find what you are looking for, we are always happy to help — reach out anytime."
      />

      <section className="section-padding">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            {FAQ_ITEMS.map((item, i) => (
              <Reveal key={item.q} delay={i * 0.04}>
                <Card>
                  <CardContent className="p-6">
                    <h2 className="font-display text-lg font-semibold text-ink-900">
                      {item.q}
                    </h2>
                    <p className="mt-3 text-sm text-ink-600">{item.a}</p>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-12 text-center">
            <p className="text-ink-600">Still have questions?</p>
            <Button asChild className="mt-4">
              <Link href="/contact">Contact us</Link>
            </Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}
