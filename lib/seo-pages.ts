import type { Metadata } from "next";
import {
  AGENT_DISPLAY_NAME,
  BUSINESS_NAME,
  getPublicSiteUrl,
} from "@/lib/site-contact";

const siteUrl = getPublicSiteUrl();

export function absoluteOgImageUrl(): string | undefined {
  const u = process.env.NEXT_PUBLIC_OG_IMAGE_URL?.trim();
  if (!u) return undefined;
  if (u.startsWith("http")) return u;
  return `${siteUrl}${u.startsWith("/") ? "" : "/"}${u}`;
}

type SubPageMeta = {
  title: string;
  description: string;
  path: string;
};

export function buildSubpageMetadata({
  title,
  description,
  path,
}: SubPageMeta): Metadata {
  const canonical = `${siteUrl.replace(/\/$/, "")}${path}`;
  const og = absoluteOgImageUrl();

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: canonical,
      siteName: "Dr. Jan Duffy — Summerlin community reviews",
      title,
      description,
      ...(og
        ? {
            images: [
              {
                url: og,
                width: 1200,
                height: 630,
                alt: `${AGENT_DISPLAY_NAME}, ${BUSINESS_NAME}`,
              },
            ],
          }
        : {}),
    },
    twitter: {
      card: og ? "summary_large_image" : "summary",
      title,
      description,
      ...(og ? { images: [og] } : {}),
    },
  };
}
