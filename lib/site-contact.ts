/**
 * Single source of truth for this site’s public identity.
 * Mirror values with the paired Google Business Profile and Vercel env overrides.
 */

export const AGENT_DISPLAY_NAME = "Dr. Jan Duffy";
export const AGENT_TITLE = "REALTOR®";
export const NEVADA_LICENSE = "S.0197614.LLC";
export const SUPERVISING_BROKERAGE =
  "Berkshire Hathaway HomeServices Nevada Properties";

/** Override in Vercel: NEXT_PUBLIC_GBP_BUSINESS_NAME — must match GBP exactly. */
export const BUSINESS_NAME =
  process.env.NEXT_PUBLIC_GBP_BUSINESS_NAME ??
  "Las Vegas Area Real Estate | Homes by Dr. Jan Duffy";

export const PRIMARY_PHONE_DISPLAY =
  process.env.NEXT_PUBLIC_PRIMARY_PHONE ?? "(702) 903-1952";

export const PRIMARY_PHONE_TEL =
  process.env.NEXT_PUBLIC_PRIMARY_PHONE_TEL ?? "+17029031952";

export const PRIMARY_STREET =
  process.env.NEXT_PUBLIC_PRIMARY_STREET ?? "1490 Center Crossing Rd";
export const PRIMARY_LOCALITY =
  process.env.NEXT_PUBLIC_PRIMARY_CITY ?? "Las Vegas";
export const PRIMARY_REGION = "NV";
export const PRIMARY_POSTAL =
  process.env.NEXT_PUBLIC_PRIMARY_ZIP ?? "89144";

export const PRIMARY_ADDRESS_SINGLE_LINE = `${PRIMARY_STREET}, ${PRIMARY_LOCALITY}, ${PRIMARY_REGION} ${PRIMARY_POSTAL}`;

export const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() ?? "";

/** Visible hours — keep in lockstep with GBP. */
export const OFFICE_HOURS_LINES = [
  "Monday–Friday: 9:00 a.m. – 5:00 p.m.",
  "Saturday–Sunday: By appointment",
] as const;

const DEFAULT_SITE_URL = "https://rrjanduffyreview.com";

/**
 * Canonical site origin for metadata, sitemap, and JSON-LD.
 * Ensures a valid absolute URL so `new URL(...)` in layout metadata never throws
 * when env sets `NEXT_PUBLIC_BASE_URL` without a scheme (e.g. `www.example.com`).
 */
export function getPublicSiteUrl(): string {
  const raw = (process.env.NEXT_PUBLIC_BASE_URL ?? DEFAULT_SITE_URL).trim();
  const noTrail = raw.replace(/\/+$/, "");
  if (!noTrail) return DEFAULT_SITE_URL;
  if (/^https?:\/\//i.test(noTrail)) return noTrail;
  const host = noTrail.replace(/^\/+/, "");
  return `https://${host}`.replace(/\/+$/, "");
}

export function formatTelHref(displayPhone: string): string {
  const digits = displayPhone.replace(/\D/g, "");
  if (digits.length === 10) return `tel:+1${digits}`;
  if (digits.length === 11 && digits.startsWith("1"))
    return `tel:+${digits}`;
  return `tel:${PRIMARY_PHONE_TEL}`;
}
