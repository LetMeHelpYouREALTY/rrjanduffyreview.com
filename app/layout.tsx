import type { Metadata } from "next";
import {
  Atkinson_Hyperlegible,
  Source_Sans_3,
  Inter,
} from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { CalendlySiteWidgets } from "@/components/CalendlySiteWidgets";
import { SiteHeader } from "@/components/SiteHeader";
import { buildCalendlyUrl } from "@/lib/calendly";
import { getPublicSiteUrl } from "@/lib/site-contact";

const atkinson = Atkinson_Hyperlegible({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-display",
  display: "swap",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-label",
  display: "swap",
});

const siteUrl = getPublicSiteUrl();

const consultationHref = buildCalendlyUrl(
  process.env.NEXT_PUBLIC_CALENDLY_TOUR_URL?.trim() ?? "",
  {
    utm_source: "rrjanduffyreview.com",
    utm_medium: "website",
    utm_campaign: "site_header",
  },
);

/** Layout-level defaults; homepage overrides via app/page.tsx. */
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    template: "%s | Dr. Jan Duffy, REALTOR",
    default: "Dr. Jan Duffy, REALTOR — Las Vegas reviews",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${atkinson.variable} ${sourceSans.variable} ${inter.variable}`}
    >
      <body className={`${sourceSans.className} font-sans antialiased`}>
        <a
          href="#main-content"
          className="fixed left-4 top-0 z-[100] -translate-y-[120%] opacity-0 transition focus:translate-y-4 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 bg-secondary text-on-secondary px-4 py-2 rounded-md text-sm font-semibold shadow-lg"
        >
          Skip to main content
        </a>
        <Script
          src="https://em.realscout.com/widgets/realscout-web-components.umd.js"
          strategy="afterInteractive"
          type="module"
        />
        <SiteHeader consultationHref={consultationHref} />
        <main id="main-content">{children}</main>
        <CalendlySiteWidgets />
      </body>
    </html>
  );
}
