import type { Metadata } from "next";
import { HomeLanding } from "@/components/pages/HomeLanding";
import { getPublicSiteUrl } from "@/lib/site-contact";
import { HOME_DESCRIPTION, HOME_TITLE } from "@/lib/seo-home";
import { buildHomeStructuredDataGraph } from "@/lib/structured-data-home";
import { HOME_REVIEW_SEED } from "@/lib/home-review-seed";

const siteUrl = getPublicSiteUrl();

function absoluteOgImage(): string | undefined {
  const u = process.env.NEXT_PUBLIC_OG_IMAGE_URL?.trim();
  if (!u) return undefined;
  if (u.startsWith("http")) return u;
  return `${siteUrl}${u.startsWith("/") ? "" : "/"}${u}`;
}

const ogImage = absoluteOgImage();

export const metadata: Metadata = {
  title: {
    absolute: HOME_TITLE,
  },
  description: HOME_DESCRIPTION,
  alternates: {
    canonical: siteUrl,
  },
  category: "real estate",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Dr. Jan Duffy — Summerlin community reviews",
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    ...(ogImage
      ? {
          images: [
            {
              url: ogImage,
              width: 1200,
              height: 630,
              alt: "Luxury Las Vegas area home — Summerlin & Dr. Jan Duffy REALTOR context",
            },
          ],
        }
      : {}),
  },
  twitter: {
    card: ogImage ? "summary_large_image" : "summary",
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    ...(ogImage ? { images: [ogImage] } : {}),
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? {
        verification: {
          google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
        },
      }
    : {}),
};

export default function Home() {
  const structuredDataGraph = buildHomeStructuredDataGraph({
    reviews: [...HOME_REVIEW_SEED],
    pageTitle: HOME_TITLE,
    pageDescription: HOME_DESCRIPTION,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredDataGraph),
        }}
      />
      <HomeLanding />
    </>
  );
}
