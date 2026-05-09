import { getHomeFaqItems } from "@/lib/faq-home";
import { getPublicSiteUrl } from "@/lib/site-contact";

/** FAQPage JSON-LD for the dedicated /faq route. */
export function buildFaqRouteJsonLd(): Record<string, unknown> {
  const base = getPublicSiteUrl();
  const url = `${base}/faq`;
  const faqItems = getHomeFaqItems();

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${url}#faqpage`,
    url,
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
