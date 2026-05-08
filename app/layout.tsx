import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import Link from "next/link";
import "./globals.css";
import { getRealScoutAgentEncodedId } from "@/lib/realscout-config";
import { CalendlySiteWidgets } from "@/components/CalendlySiteWidgets";

const inter = Inter({ subsets: ["latin"] });

const siteUrl =
  process.env.NEXT_PUBLIC_BASE_URL ?? "https://rrjanduffyreview.com";

const realscoutAgentId = getRealScoutAgentEncodedId();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      "Client Reviews | Dr. Jan Duffy, REALTOR | Las Vegas & Henderson",
    template: "%s | Dr. Jan Duffy, REALTOR",
  },
  description:
    "Client reviews and Las Vegas Valley real estate expertise from Dr. Jan Duffy, REALTOR. Berkshire Hathaway HomeServices Nevada Properties. Testimonials, offices, neighborhoods, and MLS search via RealScout.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Dr. Jan Duffy — Client reviews",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Script
          src="https://em.realscout.com/widgets/realscout-web-components.umd.js"
          strategy="afterInteractive"
          type="module"
        />
        <nav className="flex flex-wrap justify-center gap-4 md:gap-8 py-4 border-b mb-8 bg-white shadow-sm px-2">
          <Link
            className="text-base font-semibold hover:text-blue-700 transition"
            href="/"
          >
            Home
          </Link>
          <a
            className="text-base font-semibold hover:text-blue-700 transition"
            href="#about"
          >
            Meet Dr. Jan Duffy
          </a>
          <a
            className="text-base font-semibold hover:text-blue-700 transition"
            href="#reviews"
          >
            Client Reviews
          </a>
          <a
            className="text-base font-semibold hover:text-blue-700 transition"
            href="#neighborhoods"
          >
            Neighborhoods
          </a>
          <a
            className="text-base font-semibold hover:text-blue-700 transition"
            href="#contact"
          >
            Contact
          </a>
          <a
            className="text-base font-semibold hover:text-blue-700 transition"
            href="#offices"
          >
            Offices
          </a>
        </nav>
        <div className="flex justify-center mb-8 px-4">
          <realscout-simple-search
            agent-encoded-id={realscoutAgentId}
          ></realscout-simple-search>
        </div>
        <section
          aria-label="Office listings"
          className="max-w-6xl mx-auto px-4 mb-10"
        >
          <h2 className="text-xl font-semibold text-gray-900 text-center mb-4">
            Office listings
          </h2>
          <p className="text-center text-sm text-gray-600 mb-4 max-w-2xl mx-auto">
            Current inventory from Dr. Jan Duffy&apos;s office feed via RealScout.
            For broader search, use the bar above.
          </p>
          <div className="widget-wrapper rounded-lg border border-gray-200 bg-white p-2 md:p-4 shadow-sm">
            <realscout-office-listings
              agent-encoded-id={realscoutAgentId}
              sort-order="NEWEST"
              listing-status="For Sale,For Rent,Sold"
              property-types=""
            />
          </div>
        </section>
        <main className="pt-6">{children}</main>
        <CalendlySiteWidgets />
      </body>
    </html>
  );
}
