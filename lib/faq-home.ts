/**
 * Homepage FAQ — must stay in sync with visible Q&A in ReviewSite (AEO + FAQPage JSON-LD).
 */
import {
  AGENT_DISPLAY_NAME,
  AGENT_TITLE,
  BUSINESS_NAME,
  NEVADA_LICENSE,
  PRIMARY_PHONE_DISPLAY,
  SUPERVISING_BROKERAGE,
} from "@/lib/site-contact";

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
      answer: `This page collects client testimonials for ${BUSINESS_NAME}, highlights neighborhoods ${AGENT_DISPLAY_NAME} serves in the Las Vegas Valley, and links to MLS search (RealScout), maps, and appointment scheduling (Calendly).`,
    },
    {
      id: "service-areas",
      question: "Which areas do client reviews on this page mention?",
      answer:
        "Testimonials reference Summerlin West, Lone Mountain, Sky Canyon, and North Las Vegas. Confirm current focus and inventory with Dr. Jan Duffy on a call or consultation.",
    },
    {
      id: "contact-office",
      question: `How do I call ${BUSINESS_NAME}?`,
      answer: `The primary phone number shown in the About section—${PRIMARY_PHONE_DISPLAY}—matches this site's Google Business Profile. You can also use Calendly links on this page or request directions via Google Maps from the About block.`,
    },
    {
      id: "broker-license",
      question: `What brokerage and license are listed for ${AGENT_DISPLAY_NAME}?`,
      answer: `${AGENT_DISPLAY_NAME} is a Nevada ${AGENT_TITLE} with license ${NEVADA_LICENSE}, supervised by ${SUPERVISING_BROKERAGE}.`,
    },
    {
      id: "mls-search",
      question: "Where do the property search and listings come from?",
      answer:
        "This site uses RealScout web components for MLS-powered search and office listings. Availability and status change frequently; verify details on active listings with your agent.",
    },
    {
      id: "google-reviews",
      question: "How do I read or leave Google reviews for this office?",
      answer:
        "Use the View reviews and Write a review links in the About section when they are enabled. They follow this site's Google Business Profile configuration (sometimes limited during GBP verification).",
    },
  ];
}
