import type { Metadata } from "next";
import ReviewSite from "@/components/ReviewSite";
import { getPublicSiteUrl } from "@/lib/site-contact";
import { HOME_DESCRIPTION, HOME_TITLE } from "@/lib/seo-home";

const siteUrl = getPublicSiteUrl();

function absoluteOgImage(): string | undefined {
  const u = process.env.NEXT_PUBLIC_OG_IMAGE_URL?.trim();
  if (!u) return undefined;
  if (u.startsWith("http")) return u;
  return `${siteUrl}${u.startsWith("/") ? "" : "/"}${u}`;
}

const ogImage = absoluteOgImage();

export const metadata: Metadata = {
  title: HOME_TITLE,
  description: HOME_DESCRIPTION,
  alternates: {
    canonical: siteUrl,
  },
  category: "real estate",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Dr. Jan Duffy — Client reviews",
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    ...(ogImage
      ? {
          images: [
            {
              url: ogImage,
              width: 1200,
              height: 630,
              alt: "Las Vegas area real estate — Dr. Jan Duffy, REALTOR",
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
  return <ReviewSite />;
}
