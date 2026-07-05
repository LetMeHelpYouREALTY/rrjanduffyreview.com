/**
 * Hyperlocal Summerlin / Las Vegas Valley facts — sourced via Parallel Search (Jul 2026).
 * Use for on-page copy and schema; re-verify market figures monthly (SEARCH FIRST).
 *
 * Sources:
 * - https://neighborhoodsinlasvegas.com/summerlin-west/
 * - https://www.55places.com/nevada/communities/sun-city-summerlin
 * - https://www.heritagestonebridge.com/
 * - https://summerlin.com/summerlins-stonebridge-village-offers-range-of-new-homes-in-stunning-location/
 * - https://www.redfin.com/city/25923/NV/Summerlin-South/housing-market
 * - https://www.nevadarealestategroup.com/las-vegas/sun-city-summerlin
 */

/** Summerlin West villages (89138) — per neighborhood guides, Jul 2026. */
export const SUMMERLIN_WEST_VILLAGES = [
  "The Vistas",
  "The Paseos",
  "Reverence",
  "Stonebridge",
  "Redpoint",
  "Redpoint Square",
  "Kestrel",
  "Kestrel Commons",
  "Grand Park",
  "La Madre Peaks",
] as const;

export const SUMMERLIN_WEST_ZIP = "89138";
export const SUN_CITY_ZIP = "89134";
export const HERITAGE_STONEBRIDGE_ZIP = "89138";

/** Directional market framing — not live MLS; confirm on consult. */
export const MARKET_SNAPSHOT = {
  /** Las Vegas city median, Redfin May 2026 trailing 3 months */
  lasVegasMedianDisplay: "$450K",
  /** Summerlin South median, Redfin May 2026 */
  summerlinSouthMedianDisplay: "$847K",
  /** Sun City Summerlin median, GLVAR/LVR June 2026 (third-party roundup) */
  sunCityMedianDisplay: "$480K",
  /** Heritage at Stonebridge median list, third-party MLS rollup Jul 2026 */
  heritageStonebridgeMedianDisplay: "$515K",
  lasVegasMedianDom: 52,
  summerlinSouthMedianDom: 55,
  sunCityMedianDom: 30,
} as const;

export const SUN_CITY_FACTS = {
  totalHomes: 7_779,
  builder: "Del Webb",
  yearsBuilt: "1989–1999",
  recreationCenters: 4,
  golfHoles: 54,
  guardGated: false,
} as const;

export const HERITAGE_STONEBRIDGE_FACTS = {
  totalHomes: 421,
  builder: "Lennar",
  yearsBuilt: "2021–2025",
  clubhouseSqFt: 8_000,
  sqFtRange: "1,232–2,873",
  guardGated: true,
} as const;

export function formatVillageList(
  villages: readonly string[],
  max = 4,
): string {
  const slice = villages.slice(0, max);
  if (slice.length === 0) return "";
  if (slice.length === 1) return slice[0]!;
  const last = slice[slice.length - 1]!;
  const rest = slice.slice(0, -1).join(", ");
  return `${rest}, and ${last}`;
}
