import type { MetadataRoute } from "next";
import { getPublicSiteUrl } from "@/lib/site-contact";

/**
 * Crawl policy — keep JS/CSS chunks reachable for rendering; block font/media
 * assets and internal Next.js endpoints from indexing (GSC redirect noise).
 */
export default function robots(): MetadataRoute.Robots {
  const siteUrl = getPublicSiteUrl().replace(/\/$/, "");
  const host = new URL(siteUrl).host;

  return {
    rules: {
      userAgent: "*",
      allow: [
        "/",
        "/_next/static/chunks/",
        "/_next/static/css/",
      ],
      disallow: [
        "/api/",
        "/_next/data/",
        "/_next/image",
        "/_next/static/media/",
      ],
    },
    host,
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
