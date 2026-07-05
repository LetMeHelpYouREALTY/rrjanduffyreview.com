/**
 * Homepage hero/listings/contact marketing strings — rewritten by `npm run content:apply-draft`.
 * Tokens `{{agent}}` and `{{brokerage}}` expand from `site-contact` at module load time.
 */

import {
  AGENT_DISPLAY_NAME,
  SUPERVISING_BROKERAGE,
} from "@/lib/site-contact";

export function expandMarketingTokens(s: string): string {
  return s.replaceAll("{{agent}}", AGENT_DISPLAY_NAME).replaceAll(
    "{{brokerage}}",
    SUPERVISING_BROKERAGE,
  );
}

export const HOME_MARKETING_COPY_RAW = {
  heroEyebrow:
    "89138 Stonebridge · 89134 Sun City · Heritage at Stonebridge 55+",

  heroSupportingParagraph:
    "Buyers lean on {{agent}} for side-by-side reads of HOA governance, clubhouse programming, floorplan practicality, and commute timing across Summerlin West—Stonebridge, Kestrel, Redpoint, Grand Park—and Del Webb Sun City Summerlin (7,700+ resale homes, four recreation centers, 54 holes of golf) versus Lennar Heritage at Stonebridge guard-gated 55+ in zip 89138. {{brokerage}}.",

  listingsHeading: "Live MLS — Summerlin West 89138 & Sun City 89134",

  listingsBlurb:
    "RealScout inventory synced through {{agent}}'s feed—Sun City and Del Webb resale near Del Webb Boulevard, Heritage at Stonebridge and newer Stonebridge Village product off Red Rock Canyon, plus Kestrel and Redpoint Square new construction. Filter by village, price, beds, and HOA line before you tour.",

  mlsSearchHeading: "RealScout search — villages, zips, and price bands",

  mlsSearchBlurb:
    "Same MLS module as {{agent}}'s listings hub—dial in 89138 Summerlin West, 89134 Sun City, or widen to the valley before scanning office-sponsored inventory below.",

  marketMetricsHeading: "Summerlin & 55+ pacing — directional, not MLS live",

  marketMetricsBlurb:
    "Directional framing buyers review with {{agent}}—valley median near $450K, Summerlin South near $847K, Sun City Summerlin near $480K (third-party May–Jun 2026 rollups)—then stress-tested against comp-level resale in Stonebridge, Kestrel, and Del Webb corridors.",

  contactHeading: "Book a village-by-village consult",

  contactBlurb:
    "Share your short list—Sun City 89134, Heritage at Stonebridge 89138, Kestrel new-build, or resale Summerlin West blocks—and we translate live comps, HOA disclosures, and timelines into a written action plan before you tour.",
} as const;

export type HomeMarketingCopy = {
  [K in keyof typeof HOME_MARKETING_COPY_RAW]: string;
};

function buildMarketingCopy(): HomeMarketingCopy {
  const r = HOME_MARKETING_COPY_RAW;
  return {
    heroEyebrow: expandMarketingTokens(r.heroEyebrow),
    heroSupportingParagraph: expandMarketingTokens(r.heroSupportingParagraph),
    listingsHeading: expandMarketingTokens(r.listingsHeading),
    listingsBlurb: expandMarketingTokens(r.listingsBlurb),
    mlsSearchHeading: expandMarketingTokens(r.mlsSearchHeading),
    mlsSearchBlurb: expandMarketingTokens(r.mlsSearchBlurb),
    marketMetricsHeading: expandMarketingTokens(r.marketMetricsHeading),
    marketMetricsBlurb: expandMarketingTokens(r.marketMetricsBlurb),
    contactHeading: expandMarketingTokens(r.contactHeading),
    contactBlurb: expandMarketingTokens(r.contactBlurb),
  };
}

export const homeMarketingCopy = buildMarketingCopy();
