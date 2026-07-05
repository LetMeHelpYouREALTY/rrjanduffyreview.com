/**
 * Homepage FAQ — must stay in sync with visible Q&A on `/faq` (AEO + FAQPage JSON-LD).
 */
import {
  AGENT_DISPLAY_NAME,
  AGENT_TITLE,
  BUSINESS_NAME,
  NEVADA_LICENSE,
  PRIMARY_ADDRESS_SINGLE_LINE,
  PRIMARY_PHONE_DISPLAY,
  SUPERVISING_BROKERAGE,
} from "@/lib/site-contact";
import {
  formatVillageList,
  HERITAGE_STONEBRIDGE_FACTS,
  HERITAGE_STONEBRIDGE_ZIP,
  MARKET_SNAPSHOT,
  SUMMERLIN_WEST_VILLAGES,
  SUMMERLIN_WEST_ZIP,
  SUN_CITY_FACTS,
  SUN_CITY_ZIP,
} from "@/lib/hyperlocal-summerlin";
import {
  BHHS_NEVADA_PUBLIC_URL,
  HUD_FAIR_HOUSING_URL,
  NAR_CODE_OF_ETHICS_URL,
  NEVADA_RED_PORTAL_URL,
} from "@/lib/public-resources";

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export function getHomeFaqItems(): FaqItem[] {
  const westVillages = formatVillageList(SUMMERLIN_WEST_VILLAGES, 5);

  return [
    {
      id: "what-is-this-site",
      question: `What is this Las Vegas Valley client reviews page for ${AGENT_DISPLAY_NAME}?`,
      answer: `This page collects testimonials for ${BUSINESS_NAME}, maps how Summerlin West villages (${westVillages}) differ from Del Webb Sun City Summerlin (zip ${SUN_CITY_ZIP}) and Lennar Heritage at Stonebridge guard-gated 55+ (zip ${HERITAGE_STONEBRIDGE_ZIP}), links RealScout MLS search, GBP-matching NAP, maps, disclosures, and Calendly—so buyers can separate lifestyle fit from hype.`,
    },
    {
      id: "service-areas",
      question: "Which Summerlin villages and zips do reviews on this page reference?",
      answer: `Testimonials reference Sun City Summerlin / Del Webb (${SUN_CITY_ZIP}), Heritage at Stonebridge in Stonebridge Village (${HERITAGE_STONEBRIDGE_ZIP}), and Summerlin West inventory across ${westVillages}, plus Lone Mountain, Sky Canyon, and North Las Vegas. Confirm current listings and timelines with ${AGENT_DISPLAY_NAME} on a call.`,
    },
    {
      id: "sun-city-vs-heritage",
      question:
        "How does Del Webb Sun City Summerlin compare to Heritage at Stonebridge?",
      answer: `Sun City Summerlin is Del Webb's established 55+ resale community—about ${SUN_CITY_FACTS.totalHomes.toLocaleString()} homes built ${SUN_CITY_FACTS.yearsBuilt}, ${SUN_CITY_FACTS.recreationCenters} recreation centers, ${SUN_CITY_FACTS.golfHoles} holes of golf, not guard-gated. Heritage at Stonebridge is Lennar's newer guard-gated 55+ enclave inside Stonebridge Village—${HERITAGE_STONEBRIDGE_FACTS.totalHomes} homes built ${HERITAGE_STONEBRIDGE_FACTS.yearsBuilt}, ${HERITAGE_STONEBRIDGE_FACTS.clubhouseSqFt.toLocaleString()} sq. ft. clubhouse, staff-verified entry. ${AGENT_DISPLAY_NAME} compares HOA fees, resale velocity, and floorplan fit side by side.`,
    },
    {
      id: "summerlin-west-villages",
      question: `What villages make up Summerlin West (${SUMMERLIN_WEST_ZIP})?`,
      answer: `Summerlin West spans ${SUMMERLIN_WEST_VILLAGES.length} villages including ${westVillages}, west of the 215 Beltway near Red Rock Canyon. New construction concentrates in Stonebridge, Kestrel, Redpoint, and Grand Park; resale mixes range from The Vistas and The Paseos to newer Redpoint Square townhomes. Inventory and HOA structures differ by village—verify live MLS data before relying on averages.`,
    },
    {
      id: "market-snapshot",
      question: "What market pacing should I expect in Summerlin and 55+ corridors?",
      answer: `Directional third-party rollups (May–Jun 2026) cite a Las Vegas city median near ${MARKET_SNAPSHOT.lasVegasMedianDisplay}, Summerlin South near ${MARKET_SNAPSHOT.summerlinSouthMedianDisplay}, and Sun City Summerlin near ${MARKET_SNAPSHOT.sunCityMedianDisplay} with roughly ${MARKET_SNAPSHOT.sunCityMedianDom} median days on market. Figures change weekly—${AGENT_DISPLAY_NAME} reconciles pacing charts on consults against live MLS comps. Data is deemed reliable but not guaranteed.`,
    },
    {
      id: "contact-office",
      question: `How do I call or visit ${BUSINESS_NAME}?`,
      answer: `Use the About section NAP: ${PRIMARY_ADDRESS_SINGLE_LINE}, phone ${PRIMARY_PHONE_DISPLAY}. Those details are kept in sync with this site's Google Business Profile. You can also book through Calendly or open directions via the same block.`,
    },
    {
      id: "broker-license",
      question: `What brokerage and license are listed for ${AGENT_DISPLAY_NAME}?`,
      answer: `${AGENT_DISPLAY_NAME} is a Nevada ${AGENT_TITLE} with license ${NEVADA_LICENSE}, supervised by ${SUPERVISING_BROKERAGE}. Nevada's public license lookup is maintained by the Real Estate Division at ${NEVADA_RED_PORTAL_URL}—use it to confirm active licensure and public record details.`,
    },
    {
      id: "verify-license",
      question:
        "How can I independently verify a Nevada real estate license number?",
      answer: `Visit ${NEVADA_RED_PORTAL_URL} (Nevada Real Estate Division). Search by name or license number. This page lists ${NEVADA_LICENSE} for ${AGENT_DISPLAY_NAME} to match what appears on required consumer disclosures.`,
    },
    {
      id: "supervising-brokerage",
      question: `Who is the supervising real estate brokerage for ${AGENT_DISPLAY_NAME}?`,
      answer: `${SUPERVISING_BROKERAGE} is named on this site as the supervising brokerage, per Nevada broker supervision and advertising rules. You can learn more about the firm at ${BHHS_NEVADA_PUBLIC_URL}.`,
    },
    {
      id: "fair-housing",
      question: "What about fair housing and equal opportunity?",
      answer: `${AGENT_DISPLAY_NAME} adheres to federal and Nevada fair housing laws. HUD publishes an overview of Fair Housing & Equal Opportunity at ${HUD_FAIR_HOUSING_URL}. The National Association of REALTORS® publishes the Code of Ethics at ${NAR_CODE_OF_ETHICS_URL} for additional professional standards context.`,
    },
    {
      id: "mls-search",
      question: "Where do the property search and listings come from?",
      answer:
        "Property search and office listing widgets on this site are powered by RealScout and reflect MLS-sourced data made available through that platform. Listing status, price, and details can change without notice and may contain errors—always confirm active listing data with your agent and the official MLS or listing office before relying on it. MLS data is deemed reliable but not guaranteed.",
    },
  ];
}
