/** Canonical in-app routes (replace hash anchors for multipage IA). */

export const ROUTES = {
  home: "/",
  listings: "/listings",
  insights: "/insights",
  market: "/market",
  reviews: "/reviews",
  about: "/about",
  faq: "/faq",
  contact: "/contact",
  trust: "/trust",
  communities: "/communities",
  buyers: "/buyers",
  sellers: "/sellers",
  activeAdult: "/active-adult",
} as const;

export type RouteKey = keyof typeof ROUTES;

/** Static paths included in sitemap beyond ROUTES values. */
export const SITEMAP_COMMUNITY_PREFIX = `${ROUTES.communities}/` as const;
