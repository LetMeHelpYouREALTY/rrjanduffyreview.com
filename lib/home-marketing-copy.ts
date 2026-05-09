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
  heroEyebrow: "Sun City · Del Webb · Heritage at Stonebridge",

  heroSupportingParagraph:
    "Buyers lean on {{agent}} for side-by-side reads of HOA governance, club amenities, floorplan practicality, resale momentum, and commute reality across Summerlin—including Sun City, Del Webb, Heritage at Stonebridge—and the wider Las Vegas Valley. {{brokerage}}.",

  listingsHeading: "Active listings across Summerlin & the Valley",

  listingsBlurb:
    "Live inventory synced through {{agent}}'s RealScout MLS feed—from Sun City and Del Webb resale to newer Stonebridge-era product and classic Summerlin West streets. Dial in criteria with the search module above whenever you want to widen filters.",

  mlsSearchHeading: "Live MLS search — Summerlin & the Valley",

  mlsSearchBlurb:
    "Run the same RealScout MLS module as {{agent}}'s listings hub—refine price, beds, baths, and community lines before you scan office-sponsored inventory below.",

  marketMetricsHeading: "Summerlin & 55+ market indicators",

  marketMetricsBlurb:
    "Directional pacing charts buyers review with {{agent}}—then stress-tested against comp-level resale in Sun City, Del Webb, Heritage at Stonebridge, and broader Summerlin villages.",

  contactHeading: "Book a cross-community consult",

  contactBlurb:
    "Share your short list—Sun City, Del Webb, Heritage at Stonebridge, or resale Summerlin blocks—and we translate live comps, HOA disclosures, and timelines into a written action plan before you tour.",
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
