export type CalendlyUtm = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
};

/**
 * Normalizes Calendly URLs with shared query params for attribution (FUB / analytics).
 */
export function buildCalendlyUrl(
  baseUrl: string,
  utm?: CalendlyUtm,
): string {
  const trimmed = baseUrl.trim();
  if (!trimmed) return "";
  try {
    const url = new URL(trimmed);
    url.searchParams.set("hide_gdpr_banner", "1");
    if (utm?.utm_source) {
      url.searchParams.set("utm_source", utm.utm_source);
    }
    if (utm?.utm_medium) {
      url.searchParams.set("utm_medium", utm.utm_medium);
    }
    if (utm?.utm_campaign) {
      url.searchParams.set("utm_campaign", utm.utm_campaign);
    }
    return url.toString();
  } catch {
    return trimmed;
  }
}
