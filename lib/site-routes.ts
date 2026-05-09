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
} as const;

export type RouteKey = keyof typeof ROUTES;
