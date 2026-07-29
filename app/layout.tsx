import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { SITE } from "@/lib/constants";
import { PlausibleScript } from "@/components/plausible-script";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "600", "800"],
  style: ["normal", "italic"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.name,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.tagline,
  openGraph: {
    title: SITE.name,
    description: SITE.tagline,
    url: SITE.url,
    siteName: SITE.name,
    locale: "en_GH",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.name,
    description: SITE.tagline,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["NGO", "Organization"],
  name: SITE.name,
  url: SITE.url,
  email: SITE.email,
  description: SITE.tagline,
  slogan: "She Believes. She Leads. She Can.",
  nonprofitStatus: "Nonprofit501c3",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${dmSans.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#FFFCFA",
              border: "1px solid #F0E2D3",
              color: "#241E1B",
            },
          }}
        />
        <PlausibleScript />
      </body>
    </html>
  );
}
