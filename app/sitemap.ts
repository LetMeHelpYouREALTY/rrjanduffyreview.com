import type { MetadataRoute } from "next";
import { getAllCommunitySlugs, communityPath } from "@/lib/community-pages";
import { getPublicSiteUrl } from "@/lib/site-contact";
import { ROUTES } from "@/lib/site-routes";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getPublicSiteUrl().replace(/\/$/, "");
  const now = new Date();

  const urls: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
  ];

  for (const path of Object.values(ROUTES)) {
    if (path === "/") continue;
    const priority =
      path === ROUTES.reviews
        ? 0.95
        : path.startsWith(ROUTES.communities)
          ? 0.85
          : 0.8;
    urls.push({
      url: `${base}${path}`,
      lastModified: now,
      changeFrequency: path === ROUTES.reviews ? "weekly" : "monthly",
      priority,
    });
  }

  for (const slug of getAllCommunitySlugs()) {
    urls.push({
      url: `${base}${communityPath(slug)}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    });
  }

  return urls;
}
