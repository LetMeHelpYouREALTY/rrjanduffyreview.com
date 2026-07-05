/** Non-www host — always 308 to CANONICAL_HOST (GSC "page with redirect" is expected for apex). */
export const APEX_HOST = "drjanduffyreviews.com";

/** Canonical production host; must match GBP, sitemap, and metadata. */
export const CANONICAL_HOST = "www.drjanduffyreviews.com";

export const CANONICAL_SITE_ORIGIN = `https://${CANONICAL_HOST}`;

export function isApexHost(hostname: string): boolean {
  return hostname.split(":")[0]!.toLowerCase() === APEX_HOST;
}
