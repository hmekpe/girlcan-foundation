export const SITE = {
  name: "The Girl Can Foundation",
  shortName: "Girl Can",
  tagline:
    "Empowering girls and young women to discover their strength, build confidence, and reach their full potential.",
  email: "hello@girlcanfoundation.org",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
};

export const NAV_LINKS = [
  { href: "/about", label: "About" },
  { href: "/programs", label: "Programs" },
  { href: "/stories", label: "Stories" },
  { href: "/events", label: "Events" },
  { href: "/impact", label: "Impact" },
  { href: "/get-involved", label: "Get Involved" },
];

/** Segmented visitor routing — Girl Scouts / GirlTrek pattern */
export const VISITOR_ROUTES = [
  { href: "/programs", label: "A girl or parent" },
  { href: "/donate", label: "A donor" },
  { href: "/get-involved#volunteer", label: "A volunteer" },
  { href: "/get-involved#partner", label: "A partner organization" },
];

export const FOOTER_LINKS = {
  foundation: [
    { href: "/about", label: "About Us" },
    { href: "/programs", label: "Programs" },
    { href: "/impact", label: "Impact" },
    { href: "/gallery", label: "Gallery" },
    { href: "/faq", label: "FAQ" },
  ],
  connect: [
    { href: "/contact", label: "Contact" },
    { href: "/get-involved", label: "Volunteer" },
    { href: "/donate", label: "Donate" },
    { href: "/get-involved#partner", label: "Partner" },
  ],
  legal: [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Use" },
  ],
};

/** PLACEHOLDER_IMAGE — Unsplash seed photography for launch swap */
export const PLACEHOLDER = {
  hero: "https://images.unsplash.com/photo-1529390079861-591de354faf5?w=1600&h=1200&fit=crop",
  classroom: "https://images.unsplash.com/photo-1613490900233-141c5560d75e?w=800&h=600&fit=crop",
  mentorship: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&h=600&fit=crop",
  workshop: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=800&h=600&fit=crop",
  confidence: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=800&h=600&fit=crop",
  community: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&h=600&fit=crop",
  story: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=1200&h=630&fit=crop",
  story2: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=1200&h=630&fit=crop",
  event: "https://images.unsplash.com/photo-1529390079861-591de354faf5?w=1200&h=800&fit=crop",
  team1: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=500&h=500&fit=crop&crop=faces",
  team2: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&h=500&fit=crop&crop=faces",
  team3: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&h=500&fit=crop&crop=faces",
  gallery1: "https://images.unsplash.com/photo-1529390079861-591de354faf5?w=900&h=700&fit=crop",
  gallery2: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=700&h=900&fit=crop",
  gallery3: "https://images.unsplash.com/photo-1613490900233-141c5560d75e?w=900&h=600&fit=crop",
  gallery4: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&h=800&fit=crop",
  gallery5: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=1000&h=700&fit=crop",
  gallery6: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&h=1000&fit=crop",
  og: "https://images.unsplash.com/photo-1529390079861-591de354faf5?w=1200&h=630&fit=crop",
};

export const MANIFESTO_ITEMS = [
  "She is Strong",
  "She is Capable",
  "She is Enough",
  "She Can",
  "Dream Big",
  "Lead Boldly",
  "Create Change",
];

export const VALUES = [
  "Empowerment",
  "Education",
  "Leadership",
  "Mentorship",
  "Confidence",
  "Advocacy",
  "Community Impact",
  "Equality",
  "Hope",
];

/** CMS-editable via SiteSetting `donation_tiers` JSON; defaults include smallest concrete outcome */
export const DONATION_IMPACT: Record<number, string> = {
  20: "GHS 20 provides a workbook and pen set for one girl in our program",
  50: "GHS 50 provides learning materials for one girl for a month",
  100: "GHS 100 provides school supplies for one girl for a term",
  250: "GHS 250 sponsors a girl through a leadership workshop",
  500: "GHS 500/month funds full mentorship program sponsorship for one girl",
  1000: "GHS 1,000 supports educational assistance for a school year",
};

export type DonationTier = {
  amount: number;
  currency: string;
  outcomeText: string;
  order: number;
};

export const DEFAULT_DONATION_TIERS: DonationTier[] = Object.entries(DONATION_IMPACT).map(
  ([amount, outcomeText], order) => ({
    amount: Number(amount),
    currency: "GHS",
    outcomeText,
    order,
  })
);
