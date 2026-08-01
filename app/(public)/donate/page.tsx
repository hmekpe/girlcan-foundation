import type { Metadata } from "next";
import { Shield, Heart, Globe, Mail, Phone } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Reveal, CountUp } from "@/components/motion";
import { IconBadge } from "@/components/icon-badge";
import { FinancialBreakdown } from "@/components/financial-breakdown";
import { getSiteSettings } from "@/lib/site";
import { DEFAULT_DONATION_TIERS } from "@/lib/constants";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Support Us",
  description:
    "Support The Girl Can Foundation — reach us via email or phone for donation guidance. We accept local and international contributions.",
};

export default async function DonatePage() {
  const settings = await getSiteSettings([
    "stats_girls_reached",
    "stats_workshops",
    "stats_mentors",
    "stats_communities",
    "contact_email",
    "contact_phone",
  ]);

  const stats = [
    { label: "Girls reached", value: Number(settings.stats_girls_reached || 0), suffix: "+" },
    { label: "Workshops delivered", value: Number(settings.stats_workshops || 0), suffix: "+" },
    { label: "Active mentors", value: Number(settings.stats_mentors || 0), suffix: "+" },
    { label: "Communities served", value: Number(settings.stats_communities || 0), suffix: "+" },
  ];

  const email = settings.contact_email || "hello@girlcanfoundation.org";
  const phone = settings.contact_phone;

  return (
    <>
      <PageHero
        eyebrow="Give with purpose"
        title="Your support changes her story"
        description="Every contribution — whether local or international — opens doors to education, mentorship, and leadership for girls who need it most."
      />

      {/* SECTION 1: Impact Strip */}
      <section className="bg-rose-pale py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.05} className="text-center">
                <p className="font-display text-4xl font-bold text-rose">
                  <CountUp value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-2 text-sm font-medium text-text">{stat.label}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2: Contact for Giving */}
      <section className="section-padding bg-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <Reveal>
              <div className="relative overflow-hidden rounded-[28px] bg-plum p-8 sm:p-12 h-full flex flex-col justify-center">
                {/* Soft radial glow decorations */}
                <div className="absolute -right-32 -top-32 h-64 w-64 rounded-full bg-rose/40 blur-[80px] mix-blend-screen" />
                <div className="absolute -bottom-32 -left-32 h-64 w-64 rounded-full bg-gold/40 blur-[80px] mix-blend-screen" />
                
                <div className="relative z-10">
                  <p className="eyebrow text-gold-light">Let&apos;s talk</p>
                  <h2 className="mt-4 font-display text-3xl font-bold text-white sm:text-4xl">
                    Ready to give? Let&apos;s talk.
                  </h2>
                  <p className="mt-6 text-white/70 leading-relaxed">
                    We appreciate your interest in supporting our mission. To ensure your 
                    gift is processed securely and efficiently, we handle all contributions 
                    personally. 
                    <br /><br />
                    Whether you are giving locally (GHS) via bank transfer or mobile money, 
                    or internationally (USD), our team is ready to guide you.
                  </p>
                  
                  <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <a
                      href={`mailto:${email}`}
                      className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3.5 text-sm font-bold text-plum transition-colors hover:text-gold-light focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-plum"
                    >
                      <Mail className="mr-2 h-4 w-4" />
                      Email Us to Donate
                    </a>
                  </div>

                  <div className="mt-8 space-y-4">
                    <div className="flex items-center text-white/80">
                      <Phone className="mr-3 h-5 w-5 text-gold-light" />
                      <span className="text-sm">
                        {phone ? phone : "Phone details available on request"}
                      </span>
                    </div>
                  </div>

                  <div className="mt-12 border-t border-white/10 pt-6">
                    <p className="text-xs text-white/50">
                      All donations are used responsibly. We never store card details on our servers.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1} className="flex flex-col gap-8">
              <div className="rounded-2xl border border-rose-pale bg-white p-6 shadow-sm">
                <h3 className="font-display text-xl font-semibold text-text">What your gift makes possible</h3>
                <div className="mt-6 space-y-4">
                  {DEFAULT_DONATION_TIERS.map((tier) => (
                    <div key={tier.order} className="flex flex-col sm:flex-row sm:items-center gap-2 border-b border-rose-pale/50 pb-4 last:border-0 last:pb-0">
                      <div className="flex-none rounded-lg bg-rose-pale px-3 py-1.5 text-sm font-bold text-rose sm:w-28 text-center">
                        {tier.currency} {tier.amount}
                      </div>
                      <div className="text-sm text-muted">
                        {tier.outcomeText}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* SECTION 3: Why Give */}
      <section className="section-padding bg-cream border-t border-rose-pale/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mx-auto max-w-2xl">
            <h2 className="font-display text-3xl font-bold text-text">Why your support matters</h2>
            <p className="mt-4 text-muted">When you give to The Girl Can Foundation, you are making a direct investment in the future of young women.</p>
          </Reveal>
          
          <div className="mt-16 grid gap-8 sm:grid-cols-3">
            <Reveal delay={0.05} className="text-center">
              <IconBadge icon={Shield} tone="gold" size="lg" className="mx-auto" />
              <h3 className="mt-6 font-display text-xl font-bold text-text">100% Transparent</h3>
              <p className="mt-3 text-sm text-muted">
                We pride ourselves on full financial transparency. See exactly how your money is used to support our programs and operations.
              </p>
            </Reveal>
            
            <Reveal delay={0.1} className="text-center">
              <IconBadge icon={Heart} tone="rose" size="lg" className="mx-auto" />
              <h3 className="mt-6 font-display text-xl font-bold text-text">Direct Program Impact</h3>
              <p className="mt-3 text-sm text-muted">
                The vast majority of every gift reaches a girl directly—funding her workshops, materials, and long-term mentorship.
              </p>
            </Reveal>
            
            <Reveal delay={0.15} className="text-center">
              <IconBadge icon={Globe} tone="gold" size="lg" className="mx-auto" />
              <h3 className="mt-6 font-display text-xl font-bold text-text">Local & International</h3>
              <p className="mt-3 text-sm text-muted">
                Both GHS and USD giving supported. We accept local bank transfers, mobile money, and international wire donations.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* SECTION 4: FinancialBreakdown */}
      <section className="section-padding bg-rose-pale">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center">
            <h2 className="font-display text-2xl font-bold text-text">Where your money goes</h2>
            <p className="mt-4 text-muted mb-10">
              We are committed to maximizing the impact of every contribution. Here is how our funds are allocated:
            </p>
            <FinancialBreakdown className="text-left" />
          </Reveal>
        </div>
      </section>

      {/* SECTION 5: CTA */}
      <section className="section-padding bg-cream">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="rounded-3xl bg-plum px-6 py-16 text-center sm:px-16">
              <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
                Start a conversation
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-lg text-white/80">
                Ready to make an impact? Send us an email and our team will get back to you with the easiest way to give.
              </p>
              <div className="mt-10">
                <a
                  href={`mailto:${email}`}
                  className="inline-flex items-center justify-center rounded-full bg-gold px-8 py-4 text-base font-bold text-white transition-colors hover:bg-gold-light"
                >
                  <Mail className="mr-2 h-5 w-5" />
                  {email}
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
