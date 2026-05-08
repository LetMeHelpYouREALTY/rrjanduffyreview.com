import {
  BUSINESS_NAME,
  PRIMARY_ADDRESS_SINGLE_LINE,
  PRIMARY_PHONE_DISPLAY,
} from "@/lib/site-contact";

/** NAP used for Google Maps search fallback until Place ID is configured. */
export const CANONICAL_NAP = {
  name: BUSINESS_NAME,
  address: PRIMARY_ADDRESS_SINGLE_LINE,
  phone: PRIMARY_PHONE_DISPLAY,
} as const;

export function buildMapsSearchUrl(): string {
  const q = encodeURIComponent(
    `${CANONICAL_NAP.name} ${CANONICAL_NAP.address} ${CANONICAL_NAP.phone}`,
  );
  return `https://www.google.com/maps/search/?api=1&query=${q}`;
}

export function isReviewsCtaDisabled(): boolean {
  return process.env.NEXT_PUBLIC_GBP_REVIEWS_DISABLED === "true";
}

/** Reviews / listing tab on Maps when Place ID is known. */
export function buildViewReviewsUrl(): string {
  const placeId = process.env.NEXT_PUBLIC_GBP_PLACE_ID?.trim();
  if (placeId) {
    return `https://www.google.com/maps/search/?api=1&query=Google&query_place_id=${encodeURIComponent(placeId)}`;
  }
  return buildMapsSearchUrl();
}

export function buildWriteReviewUrl(): string {
  const direct = process.env.NEXT_PUBLIC_GBP_WRITEREVIEW_URL?.trim();
  if (direct) return direct;
  const placeId = process.env.NEXT_PUBLIC_GBP_PLACE_ID?.trim();
  if (placeId) {
    return `https://search.google.com/local/writereview?placeid=${encodeURIComponent(placeId)}`;
  }
  return buildMapsSearchUrl();
}

export function primaryMapEmbedSrc(): string {
  const placeId = process.env.NEXT_PUBLIC_GBP_PLACE_ID?.trim();
  const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY?.trim();
  if (placeId && key) {
    return `https://www.google.com/maps/embed/v1/place?key=${encodeURIComponent(key)}&q=place_id:${encodeURIComponent(placeId)}`;
  }
  const q = encodeURIComponent(PRIMARY_ADDRESS_SINGLE_LINE);
  return `https://www.google.com/maps?q=${q}&output=embed`;
}
