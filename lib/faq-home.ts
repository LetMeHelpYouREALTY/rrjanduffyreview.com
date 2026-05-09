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
  return [
    {
      id: "what-is-this-site",
      question: `What is this Las Vegas Valley client reviews page for ${AGENT_DISPLAY_NAME}?`,
      answer: `This page collects testimonials for ${BUSINESS_NAME}, maps how Summerlin’s active-adult neighborhoods (Sun City, Del Webb, Heritage at Stonebridge) differ from broader Summerlin-West inventory, links RealScout MLS search, GBP-matching NAP, maps, disclosures, and Calendly—so buyers can separate lifestyle fit from hype.`,
    },
    {
      id: "service-areas",
      question: "Which areas do client reviews on this page mention?",
      answer:
        "Testimonials reference Sun City Summerlin / Del Webb villages, Heritage at Stonebridge in Summerlin’s Stonebridge area, Summerlin West, Lone Mountain, Sky Canyon, and North Las Vegas—these align with neighborhoods where shoppers compare HOA governance, clubhouse amenities, and floorplans. Confirm current listings and timelines with Dr. Jan Duffy on a call.",
    },
    {
      id: "contact-office",
      question: `How do I call or visit ${BUSINESS_NAME}?`,
      answer: `Use the About section NAP: ${PRIMARY_ADDRESS_SINGLE_LINE}, phone ${PRIMARY_PHONE_DISPLAY}. Those details are kept in sync with this site's Google Business Profile. You can also book through Calendly or open directions via the same block.`,
    },
    {
      id: "broker-license",
      question: `What brokerage and license are listed for ${AGENT_DISPLAY_NAME}?`,
      answer: `${AGENT_DISPLAY_NAME} is a Nevada ${AGENT_TITLE} with license ${NEVADA_LICENSE}, supervised by ${SUPERVISING_BROKERAGE}. Nevada’s public license lookup is maintained by the Real Estate Division at ${NEVADA_RED_PORTAL_URL}—use it to confirm active licensure and public record details.`,
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
        "Property search and office listing widgets on this site are powered by RealScout and reflect MLS-sourced data made available through that platform. Listing status, price, and details can change without notice and may contain errors—always confirm active listing data with your agent and the official MLS or listing office before relying on it.",
    },
    {
      id: "google-reviews",
      question: "How do I read or leave Google reviews for this office?",
      answer:
        "Use the View reviews and Write a review links in the About section when they are enabled. They follow this site's Google Business Profile configuration (sometimes limited during GBP verification).",
    },
  ];
}
