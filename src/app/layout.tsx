import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import "./globals.css";
import { TopBar } from "@/components/layout/TopBar";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { SiteJsonLd } from "@/components/seo/SiteJsonLd";
import { Analytics } from "@/components/analytics/Analytics";
import { CookieBanner } from "@/components/analytics/CookieBanner";

const display = Manrope({
  variable: "--font-display-src",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

const body = Inter({
  variable: "--font-body-src",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const SITE_URL = "https://www.jdhgas.co.uk";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Gas Engineer in Burgess Hill | JDH Gas Services",
  description:
    "Jamie Hannah, your Gas Safe registered engineer in Burgess Hill. Boiler servicing, repairs & landlord gas safety certificates. Call or WhatsApp today.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "JDH Gas Services",
    title: "Gas Engineer in Burgess Hill | JDH Gas Services",
    description:
      "Gas Safe registered engineer Jamie Hannah. Boiler servicing, repairs & gas safety certificates across Burgess Hill & Mid Sussex.",
    url: SITE_URL,
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gas Engineer in Burgess Hill | JDH Gas Services",
    description:
      "Gas Safe registered engineer Jamie Hannah. Boiler servicing, repairs & gas safety certificates across Burgess Hill & Mid Sussex.",
  },
  // Google Search Console verification — set GOOGLE_SITE_VERIFICATION to the
  // token from GSC's "HTML tag" method to verify ownership (no-op until set).
  ...(process.env.GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.GOOGLE_SITE_VERIFICATION } }
    : {}),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-GB"
      className={`${display.variable} ${body.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-surface text-text">
        <Analytics />
        <SiteJsonLd />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[600] focus:rounded-md focus:bg-ink focus:px-4 focus:py-2 focus:text-inverse"
        >
          Skip to content
        </a>
        <div className="sticky top-0 z-[200]">
          <TopBar />
          <SiteHeader />
        </div>
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <MobileActionBar />
        <CookieBanner />
      </body>
    </html>
  );
}
