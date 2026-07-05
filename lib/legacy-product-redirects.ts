import { ROUTES } from "@/lib/site-routes";

/**
 * Slugs from the removed Vercel e-commerce demo (`app/[productId]` + sample-data).
 * 308 → /reviews so GSC clears 404 / crawled-not-indexed noise.
 */
export const LEGACY_PRODUCT_SLUGS = [
  "mower",
  "ecoBright",
  "ecoSmart",
] as const;

export type LegacyProductSlug = (typeof LEGACY_PRODUCT_SLUGS)[number];

const LEGACY_SLUG_LOOKUP = new Map<string, string>(
  LEGACY_PRODUCT_SLUGS.map((slug) => [slug.toLowerCase(), ROUTES.reviews]),
);

/** Match legacy product path segments case-insensitively (e.g. /ecoBright). */
export function resolveLegacyProductRedirect(pathname: string): string | null {
  const segment = pathname.replace(/^\/+/, "").split("/")[0];
  if (!segment || segment.includes("/")) return null;
  return LEGACY_SLUG_LOOKUP.get(segment.toLowerCase()) ?? null;
}

export function legacyProductRedirectsForConfig(): {
  source: string;
  destination: string;
  permanent: true;
}[] {
  return LEGACY_PRODUCT_SLUGS.map((slug) => ({
    source: `/${slug}`,
    destination: ROUTES.reviews,
    permanent: true as const,
  }));
}
