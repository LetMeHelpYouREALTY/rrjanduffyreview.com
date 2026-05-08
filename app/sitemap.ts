import type { MetadataRoute } from "next";
import { getPublicSiteUrl } from "@/lib/site-contact";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getPublicSiteUrl();
  return [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
