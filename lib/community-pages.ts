import type { FaqItem } from "@/lib/faq-home";
import {
  AGENT_DISPLAY_NAME,
  PRIMARY_PHONE_DISPLAY,
  SUPERVISING_BROKERAGE,
} from "@/lib/site-contact";
import { ROUTES } from "@/lib/site-routes";

export type CommunityHighlight = {
  title: string;
  body: string;
};

export type CommunityPage = {
  slug: string;
  name: string;
  zip: string;
  village?: string;
  seoTitle: string;
  seoDescription: string;
  h1: string;
  eyebrow: string;
  intro: string;
  highlights: CommunityHighlight[];
  faqItems: FaqItem[];
  relatedSlugs: string[];
  placeDescription: string;
  containedInPlace: string;
};

function mlsDisclaimer(): string {
  return "MLS data is deemed reliable but not guaranteed—confirm active status with your agent.";
}

const COMMUNITIES: CommunityPage[] = [
  {
    slug: "sun-city-summerlin",
    name: "Sun City Summerlin",
    zip: "89134",
    seoTitle: "Sun City Summerlin 89134 — Del Webb 55+ homes & reviews",
    seoDescription:
      "Sun City Summerlin (89134) buyer guide: Del Webb 55+ resale, four recreation centers, 54 holes of golf, HOA context, and RealScout MLS search with Dr. Jan Duffy, Berkshire Hathaway HomeServices Nevada Properties.",
    h1: "Sun City Summerlin — Del Webb 55+ in zip 89134",
    eyebrow: "89134 · Del Webb active adult",
    intro:
      "Sun City Summerlin is the Las Vegas Valley's largest Del Webb 55+ community—about 7,700 resale homes built from 1989 through 1999, four recreation centers, and 54 holes of golf west of Downtown Summerlin. Buyers compare clubhouse programming, HOA lines, and resale velocity against newer guard-gated options such as Heritage at Stonebridge.",
    highlights: [
      {
        title: "Scale & amenities",
        body: "Mountain Shadows, Desert Vista, Sun Shadows, and Pinnacle recreation centers anchor social life—pools, fitness, pickleball, theaters, and 100+ chartered clubs.",
      },
      {
        title: "Resale inventory",
        body: "Attached and single-story detached homes span a wide price band. RealScout MLS search filters by beds, baths, and golf-lot premiums before you tour.",
      },
      {
        title: "Location",
        body: "Minutes to Downtown Summerlin retail, Summerlin Hospital Medical Center, and Red Rock Canyon trail access along the community's western edge.",
      },
    ],
    faqItems: [
      {
        id: "sun-city-age",
        question: "What is the age requirement in Sun City Summerlin?",
        answer:
          "Sun City Summerlin is a 55+ age-qualified community. At least one resident must meet the age requirement per HOA governing documents—verify current rules on a consult before you write an offer.",
      },
      {
        id: "sun-city-guard",
        question: "Is Sun City Summerlin guard-gated?",
        answer:
          "Sun City Summerlin is not guard-gated. Buyers who want staffed entry often cross-shop Heritage at Stonebridge in Summerlin West (89138).",
      },
      {
        id: "sun-city-mls",
        question: "Where do Sun City listings on this site come from?",
        answer: `Property search widgets are powered by RealScout and reflect MLS-sourced data. ${mlsDisclaimer()}`,
      },
    ],
    relatedSlugs: [
      "heritage-at-stonebridge",
      "summerlin-west",
      "stonebridge-village",
    ],
    placeDescription:
      "Del Webb 55+ master-planned active adult community in northwest Las Vegas, zip 89134, within the Summerlin area.",
    containedInPlace: "Summerlin, Las Vegas, Nevada",
  },
  {
    slug: "heritage-at-stonebridge",
    name: "Heritage at Stonebridge",
    zip: "89138",
    village: "Stonebridge",
    seoTitle: "Heritage at Stonebridge 89138 — Lennar 55+ guard-gated Summerlin",
    seoDescription:
      "Heritage at Stonebridge (89138): Lennar guard-gated 55+ homes, 421 residences, clubhouse amenities, vs Sun City comparisons, and MLS search with Dr. Jan Duffy.",
    h1: "Heritage at Stonebridge — guard-gated 55+ in 89138",
    eyebrow: "89138 · Lennar · Stonebridge Village",
    intro:
      "Heritage at Stonebridge is Lennar's staff guard-gated 55+ enclave inside Stonebridge Village, Summerlin West (89138). About 421 single-family homes built 2021–2025 pair modern floor plans (roughly 1,232–2,873 sq. ft.) with an 8,000 sq. ft. clubhouse, pools, and pickleball—minutes from Downtown Summerlin and Red Rock Canyon.",
    highlights: [
      {
        title: "Guard-gated entry",
        body: "Staff-verified visitor entry—not a shared gate code—appeals to buyers prioritizing privacy over Del Webb resale scale.",
      },
      {
        title: "Newer construction",
        body: "Nine Lennar floor plans across three collections; smart-home and quartz finishes are standard in many elevations.",
      },
      {
        title: "Summerlin West context",
        body: "Stonebridge Park, Doral Academy Red Rock, and trail links toward Red Rock Canyon sit within the broader Stonebridge Village footprint.",
      },
    ],
    faqItems: [
      {
        id: "heritage-builder",
        question: "Who built Heritage at Stonebridge?",
        answer:
          "Heritage at Stonebridge is a Lennar Homes 55+ community inside Stonebridge Village, Summerlin West, Las Vegas NV 89138.",
      },
      {
        id: "heritage-vs-sun-city",
        question: "How does Heritage at Stonebridge compare to Sun City Summerlin?",
        answer: `Sun City (89134) offers larger Del Webb resale scale and four recreation centers without guard gates. Heritage at Stonebridge (89138) is newer, guard-gated, and smaller—about 421 homes. ${AGENT_DISPLAY_NAME} models HOA fees, resale rules, and lifestyle fit side by side.`,
      },
      {
        id: "heritage-mls",
        question: "How do I search Heritage at Stonebridge listings?",
        answer: `Use the RealScout MLS module on ${PRIMARY_PHONE_DISPLAY} listings hub or the site search—filter by zip 89138 and community name. ${mlsDisclaimer()}`,
      },
    ],
    relatedSlugs: ["stonebridge-village", "sun-city-summerlin", "kestrel-summerlin"],
    placeDescription:
      "Lennar-built guard-gated 55+ active adult neighborhood in Stonebridge Village, Summerlin West, zip 89138.",
    containedInPlace: "Stonebridge Village, Summerlin West, Las Vegas, Nevada",
  },
  {
    slug: "stonebridge-village",
    name: "Stonebridge Village",
    zip: "89138",
    village: "Stonebridge",
    seoTitle: "Stonebridge Village Summerlin 89138 — new & resale homes",
    seoDescription:
      "Stonebridge Village (89138) guide: Pulte, Lennar, Toll Brothers, and Tri Pointe new construction, Stonebridge Park, Red Rock views, Heritage at Stonebridge 55+, and MLS search.",
    h1: "Stonebridge Village — Summerlin West 89138",
    eyebrow: "89138 · Red Rock backdrop",
    intro:
      "Stonebridge Village sits on elevated Summerlin West topography along the Red Rock Canyon conservation boundary. The village mixes new construction from national builders with Heritage at Stonebridge 55+ and resale product—Stonebridge Park anchors outdoor amenities with soccer fields, pickleball, and playgrounds.",
    highlights: [
      {
        title: "Builder diversity",
        body: "Starling (Pulte), Graycliff (Lennar), Shadow Point (Toll Brothers), and Sandalwood (Tri Pointe) have offered single- and two-story plans from the mid-$500Ks upward—premiums apply.",
      },
      {
        title: "Trails & parks",
        body: "Summerlin trail segments connect toward Red Rock Legacy Trails. Nearby village parks include The Vistas, The Paseos, and Fox Hill.",
      },
      {
        title: "Schools nearby",
        body: "Doral Academy Red Rock (K–11 charter), Givens and Vassiliadis elementary schools, Rogich Middle School, and Palo Verde High School serve the corridor—verify boundaries with CCSD.",
      },
    ],
    faqItems: [
      {
        id: "stonebridge-55",
        question: "Is all of Stonebridge Village 55+?",
        answer:
          "No. Stonebridge Village includes all-ages new construction neighborhoods plus the Heritage at Stonebridge 55+ guard-gated enclave. Confirm age restrictions on each listing.",
      },
      {
        id: "stonebridge-zip",
        question: "What zip code is Stonebridge Village?",
        answer: "Stonebridge Village in Summerlin West is primarily served by Las Vegas zip code 89138.",
      },
      {
        id: "stonebridge-search",
        question: "How do I search Stonebridge Village MLS inventory?",
        answer: `Filter RealScout by village name, zip 89138, and price on this site's listings page. ${mlsDisclaimer()}`,
      },
    ],
    relatedSlugs: [
      "heritage-at-stonebridge",
      "kestrel-summerlin",
      "redpoint-summerlin",
    ],
    placeDescription:
      "Summerlin West village with new construction, Stonebridge Park, and Red Rock Canyon views, zip 89138.",
    containedInPlace: "Summerlin West, Las Vegas, Nevada",
  },
  {
    slug: "summerlin-west",
    name: "Summerlin West",
    zip: "89138",
    seoTitle: "Summerlin West 89138 — villages, MLS search & market framing",
    seoDescription:
      "Summerlin West (89138) villages—Stonebridge, Kestrel, Redpoint, Grand Park, The Vistas, The Paseos—and buyer guidance with Dr. Jan Duffy, Berkshire Hathaway HomeServices Nevada Properties.",
    h1: "Summerlin West — villages in zip 89138",
    eyebrow: "89138 · west of the 215 Beltway",
    intro:
      "Summerlin West spans about ten villages west of the 215 Beltway—The Vistas, The Paseos, Reverence, Stonebridge, Redpoint, Redpoint Square, Kestrel, Kestrel Commons, Grand Park, and La Madre Peaks. New construction concentrates in Stonebridge, Kestrel, Redpoint, and Grand Park; resale mixes range from 2000s villages to 2020s townhomes.",
    highlights: [
      {
        title: "New-build epicenter",
        body: "Summerlin West is where most active Summerlin new construction sells today—compare builder incentives against resale concessions.",
      },
      {
        title: "Red Rock access",
        body: "Elevation and desert-contemporary architecture emphasize indoor-outdoor living with conservation-area views.",
      },
      {
        title: "Downtown Summerlin",
        body: "Retail, dining, and medical services at Downtown Summerlin are a short drive east for most west villages.",
      },
    ],
    faqItems: [
      {
        id: "west-villages",
        question: "Which villages are in Summerlin West?",
        answer:
          "Summerlin West includes The Vistas, The Paseos, Reverence, Stonebridge, Redpoint, Redpoint Square, Kestrel, Kestrel Commons, Grand Park, and La Madre Peaks—primarily zip 89138.",
      },
      {
        id: "west-vs-south",
        question: "How does Summerlin West differ from Summerlin South?",
        answer:
          "Summerlin West is newer construction and west-side elevation near Red Rock. Summerlin South includes established luxury pockets such as The Ridges and Red Rock Country Club with different price points and HOA structures.",
      },
      {
        id: "west-mls",
        question: "Can I search all Summerlin West villages at once?",
        answer: `Yes—use RealScout on this site and widen filters across zip 89138, then narrow by village with ${AGENT_DISPLAY_NAME}. ${mlsDisclaimer()}`,
      },
    ],
    relatedSlugs: ["stonebridge-village", "kestrel-summerlin", "redpoint-summerlin"],
    placeDescription:
      "Western district of the Summerlin master-planned community, Las Vegas, Nevada, zip 89138.",
    containedInPlace: "Summerlin, Las Vegas, Nevada",
  },
  {
    slug: "kestrel-summerlin",
    name: "Kestrel",
    zip: "89138",
    village: "Kestrel",
    seoTitle: "Kestrel Summerlin 89138 — new homes & townhomes",
    seoDescription:
      "Kestrel and Kestrel Commons (89138) new construction guide—single-family and townhome product, Summerlin West amenities, and MLS search with Dr. Jan Duffy.",
    h1: "Kestrel — new construction in Summerlin West 89138",
    eyebrow: "89138 · Kestrel & Kestrel Commons",
    intro:
      "Kestrel and Kestrel Commons are among the most active new-construction villages in Summerlin West (89138). Detached homes and luxury townhomes in neighborhoods such as Nighthawk and Vireo appeal to buyers who want a lower-maintenance footprint without leaving the Summerlin address.",
    highlights: [
      {
        title: "Product mix",
        body: "Detached single-family and townhome lines share village amenities—compare HOA fees and exterior maintenance before you choose.",
      },
      {
        title: "Builder incentives",
        body: "National builders may offer rate buydowns—model total cost against resale homes with similar square footage in The Paseos or Redpoint.",
      },
      {
        title: "Walkability plans",
        body: "Kestrel Commons emphasizes connected streetscapes; verify trail and park completion timelines on newer phases.",
      },
    ],
    faqItems: [
      {
        id: "kestrel-type",
        question: "What housing types are in Kestrel?",
        answer:
          "Kestrel offers detached single-family homes and townhome product. Kestrel Commons adds denser, connected layouts for buyers prioritizing lock-and-leave convenience.",
      },
      {
        id: "kestrel-price",
        question: "What price range should I expect in Kestrel?",
        answer:
          "Pricing shifts weekly with phase releases and lot premiums—use live MLS and builder sheets on a consult. Advertised base prices often exclude design-studio upgrades.",
      },
      {
        id: "kestrel-agent",
        question: `Who represents buyers in Kestrel?`,
        answer: `${AGENT_DISPLAY_NAME} is a Nevada REALTOR® supervised by ${SUPERVISING_BROKERAGE}, with Summerlin West village-level guidance and RealScout MLS access on this site.`,
      },
    ],
    relatedSlugs: ["summerlin-west", "redpoint-summerlin", "stonebridge-village"],
    placeDescription:
      "Active new-construction village in Summerlin West with single-family and townhome product, zip 89138.",
    containedInPlace: "Summerlin West, Las Vegas, Nevada",
  },
  {
    slug: "redpoint-summerlin",
    name: "Redpoint",
    zip: "89138",
    village: "Redpoint",
    seoTitle: "Redpoint & Redpoint Square Summerlin 89138",
    seoDescription:
      "Redpoint and Redpoint Square (89138)—newer Summerlin West villages, townhomes and single-family, buyer comparisons, and RealScout MLS with Dr. Jan Duffy.",
    h1: "Redpoint & Redpoint Square — 89138 Summerlin West",
    eyebrow: "89138 · Redpoint villages",
    intro:
      "Redpoint and Redpoint Square debuted around 2020 as newer Summerlin West villages (89138). Buyers compare desert-contemporary elevations, townhome lock-and-leave options, and proximity to west-side retail against Kestrel and Stonebridge inventory.",
    highlights: [
      {
        title: "Modern elevations",
        body: "Flat and shed rooflines with indoor-outdoor great rooms match current Summerlin West design themes.",
      },
      {
        title: "Redpoint Square",
        body: "Attached and townhome product can trade at different HOA and insurance lines than detached Redpoint streets—review disclosures.",
      },
      {
        title: "Resale velocity",
        body: `Newer villages have shorter resale history—stress-test comps with ${AGENT_DISPLAY_NAME} before you assume appreciation curves.`,
      },
    ],
    faqItems: [
      {
        id: "redpoint-diff",
        question: "What is the difference between Redpoint and Redpoint Square?",
        answer:
          "Redpoint includes detached single-family product. Redpoint Square adds townhome and attached layouts with different density and HOA structures—tour both if you want Summerlin West without yard maintenance.",
      },
      {
        id: "redpoint-zip",
        question: "What zip code is Redpoint?",
        answer: "Redpoint and Redpoint Square are in Summerlin West, Las Vegas NV 89138.",
      },
      {
        id: "redpoint-listings",
        question: "How do I see Redpoint MLS listings?",
        answer: `Search RealScout on ${ROUTES.listings} and filter by community or zip 89138. ${mlsDisclaimer()}`,
      },
    ],
    relatedSlugs: ["kestrel-summerlin", "summerlin-west", "stonebridge-village"],
    placeDescription:
      "Newer Summerlin West village with single-family and townhome product, zip 89138.",
    containedInPlace: "Summerlin West, Las Vegas, Nevada",
  },
];

export function getAllCommunities(): CommunityPage[] {
  return COMMUNITIES;
}

export function getCommunityBySlug(slug: string): CommunityPage | undefined {
  return COMMUNITIES.find((c) => c.slug === slug);
}

export function getAllCommunitySlugs(): string[] {
  return COMMUNITIES.map((c) => c.slug);
}

export function communityPath(slug: string): string {
  return `${ROUTES.communities}/${slug}`;
}
