import type { FaqItem } from "@/lib/faq-home";
import {
  AGENT_DISPLAY_NAME,
  PRIMARY_PHONE_DISPLAY,
  SUPERVISING_BROKERAGE,
} from "@/lib/site-contact";
import { ROUTES } from "@/lib/site-routes";

export type ServicePage = {
  slug: string;
  path: string;
  seoTitle: string;
  seoDescription: string;
  h1: string;
  eyebrow: string;
  intro: string;
  bullets: { title: string; body: string }[];
  faqItems: FaqItem[];
  serviceType: string;
  serviceName: string;
  serviceDescription: string;
};

function mlsNote(): string {
  return "MLS data is deemed reliable but not guaranteed.";
}

export const BUYERS_PAGE: ServicePage = {
  slug: "buyers",
  path: ROUTES.buyers,
  seoTitle: "Buy a home in Summerlin & Las Vegas Valley — buyer representation",
  seoDescription:
    "Buyer representation for Summerlin West, Sun City Summerlin, Heritage at Stonebridge, and Las Vegas Valley MLS search—Dr. Jan Duffy, Berkshire Hathaway HomeServices Nevada Properties, Nevada license S.0197614.LLC.",
  h1: "Buy in Summerlin, Sun City, or the Las Vegas Valley",
  eyebrow: "Buyer representation",
  intro:
    "Whether you are comparing Del Webb Sun City resale, Lennar Heritage at Stonebridge guard-gated 55+, or new construction in Kestrel and Redpoint, buyer representation starts with village-level comps—not generic valley averages.",
  bullets: [
    {
      title: "Village-level search",
      body: "RealScout MLS filters by zip, beds, baths, and community lines before you spend weekends on mismatched tours.",
    },
    {
      title: "HOA & disclosure review",
      body: "Resale certificates, capital schedules, and age-restriction rules are translated into plain language before you remove contingencies.",
    },
    {
      title: "Offer strategy",
      body: "Appraisal gaps, inspection leverage, and builder incentives are modeled against your timeline—not a one-size template.",
    },
  ],
  faqItems: [
    {
      id: "buyers-cost",
      question: "Does buyer representation cost me extra?",
      answer:
        "In most Nevada residential transactions, buyer broker compensation is negotiated in the purchase contract and may be paid from listing-side proceeds—confirm terms in writing before you tour.",
    },
    {
      id: "buyers-55",
      question: "Do you specialize in 55+ communities?",
      answer: `Yes—${AGENT_DISPLAY_NAME} compares Sun City Summerlin, Heritage at Stonebridge, and other age-qualified product with HOA and resale context.`,
    },
    {
      id: "buyers-mls",
      question: "Where do listings on this site come from?",
      answer: `RealScout widgets reflect MLS-sourced data. ${mlsNote()}`,
    },
  ],
  serviceType: "Residential buyer representation",
  serviceName: "Summerlin & Las Vegas Valley home buying",
  serviceDescription:
    "Buyer broker services for Summerlin master-planned villages, 55+ communities, and Las Vegas Valley resale and new construction.",
};

export const SELLERS_PAGE: ServicePage = {
  slug: "sellers",
  path: ROUTES.sellers,
  seoTitle: "Sell a Summerlin or Las Vegas Valley home — listing strategy",
  seoDescription:
    "Listing strategy for Summerlin West, Sun City, Heritage at Stonebridge, and Las Vegas Valley sellers—pricing, prep, MLS exposure, and Dr. Jan Duffy, Berkshire Hathaway HomeServices Nevada Properties.",
  h1: "Sell in Summerlin or the Las Vegas Valley",
  eyebrow: "Seller representation",
  intro:
    "Selling in Sun City, Stonebridge, or broader Summerlin West means pricing against village-specific comps—not valley medians alone. Listing strategy covers prep, MLS exposure through Berkshire Hathaway HomeServices Nevada Properties, and negotiation framing.",
  bullets: [
    {
      title: "Comp-level pricing",
      body: "Micro-neighborhood comps, DOM pacing, and concession trends are documented before your list price is set.",
    },
    {
      title: "MLS & syndication",
      body: "Professional photography, MLS input, and RealScout office exposure align with supervising brokerage standards.",
    },
    {
      title: "Contract navigation",
      body: "Inspection responses, appraisal gaps, and rent-back requests are handled with written milestones.",
    },
  ],
  faqItems: [
    {
      id: "sellers-valuation",
      question: "How do I get a listing price opinion?",
      answer: `Call ${PRIMARY_PHONE_DISPLAY} or book Calendly from the contact page for a valuation briefing grounded in recent MLS comps.`,
    },
    {
      id: "sellers-55",
      question: "Can you list 55+ restricted homes?",
      answer:
        "Yes—age-qualified communities require accurate marketing and HOA resale certificate coordination; experience includes Sun City Summerlin and Heritage at Stonebridge.",
    },
    {
      id: "sellers-brokerage",
      question: "What brokerage will appear on my listing?",
      answer: `Listings are marketed through ${SUPERVISING_BROKERAGE} with ${AGENT_DISPLAY_NAME}, Nevada REALTOR®.`,
    },
  ],
  serviceType: "Residential seller representation",
  serviceName: "Summerlin & Las Vegas Valley home selling",
  serviceDescription:
    "Listing and marketing services for Summerlin villages, 55+ resale, and Las Vegas Valley residential property.",
};

export const ACTIVE_ADULT_PAGE: ServicePage = {
  slug: "active-adult",
  path: ROUTES.activeAdult,
  seoTitle: "Las Vegas 55+ communities — Sun City, Heritage at Stonebridge",
  seoDescription:
    "Compare Las Vegas 55+ communities: Sun City Summerlin (89134), Heritage at Stonebridge (89138), HOA fees, guard gates, amenities, and MLS search with Dr. Jan Duffy.",
  h1: "Las Vegas 55+ & active-adult communities",
  eyebrow: "55+ buyer hub",
  intro:
    "Active-adult buyers weigh Del Webb scale against guard-gated new construction. Sun City Summerlin (89134) delivers four recreation centers and 54 golf holes on resale product. Heritage at Stonebridge (89138) offers Lennar's 421-home guard-gated 55+ enclave inside Stonebridge Village.",
  bullets: [
    {
      title: "Sun City Summerlin",
      body: "7,700+ Del Webb homes, not guard-gated, zip 89134—clubhouse scale and resale depth.",
    },
    {
      title: "Heritage at Stonebridge",
      body: "Staff guard-gated Lennar 55+, zip 89138—newer floor plans and smaller social scale.",
    },
    {
      title: "Side-by-side consults",
      body: "HOA all-in costs, guest policies, and resale restrictions are compared before you tour.",
    },
  ],
  faqItems: [
    {
      id: "55-compare",
      question: "Sun City vs Heritage at Stonebridge—which fits me?",
      answer:
        "Sun City offers maximum amenity scale and resale inventory without guard gates. Heritage offers newer construction and staffed entry in 89138. Schedule a consult to match lifestyle, budget, and HOA tolerance.",
    },
    {
      id: "55-fees",
      question: "What HOA range should I budget?",
      answer:
        "HOA lines vary by sub-association and amenity bundle—request current fee sheets and capital schedules; do not rely on outdated blog averages.",
    },
    {
      id: "55-search",
      question: "How do I search 55+ MLS inventory?",
      answer: `Use RealScout on the listings page or call ${PRIMARY_PHONE_DISPLAY}. ${mlsNote()}`,
    },
  ],
  serviceType: "Active adult real estate advisory",
  serviceName: "Las Vegas 55+ community home search",
  serviceDescription:
    "Advisory and representation for buyers and sellers in age-qualified Las Vegas and Summerlin communities.",
};

export const SERVICE_PAGES = [BUYERS_PAGE, SELLERS_PAGE, ACTIVE_ADULT_PAGE] as const;

export function getServicePageByPath(path: string): ServicePage | undefined {
  return SERVICE_PAGES.find((p) => p.path === path);
}
