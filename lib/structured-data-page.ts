import type { FaqItem } from "@/lib/faq-home";
import {
  AGENT_DISPLAY_NAME,
  BUSINESS_NAME,
  CONTACT_EMAIL,
  NEVADA_LICENSE,
  PRIMARY_LOCALITY,
  PRIMARY_PHONE_DISPLAY,
  PRIMARY_POSTAL,
  PRIMARY_REGION,
  PRIMARY_STREET,
  SUPERVISING_BROKERAGE,
  getPublicSiteUrl,
} from "@/lib/site-contact";
import { BHHS_NEVADA_PUBLIC_URL } from "@/lib/public-resources";

export type BreadcrumbItem = {
  name: string;
  /** Omit on the current (last) crumb */
  path?: string;
};

const BUSINESS_ID_SUFFIX = "#business";
const BROKERAGE_ID_SUFFIX = "#brokerage";

function businessNode(base: string): Record<string, unknown> {
  const businessId = `${base}${BUSINESS_ID_SUFFIX}`;
  const node: Record<string, unknown> = {
    "@type": "RealEstateAgent",
    "@id": businessId,
    name: BUSINESS_NAME,
    url: base,
    telephone: PRIMARY_PHONE_DISPLAY,
    address: {
      "@type": "PostalAddress",
      streetAddress: PRIMARY_STREET,
      addressLocality: PRIMARY_LOCALITY,
      addressRegion: PRIMARY_REGION,
      postalCode: PRIMARY_POSTAL,
      addressCountry: "US",
    },
    worksFor: { "@id": `${base}${BROKERAGE_ID_SUFFIX}` },
  };
  if (CONTACT_EMAIL) node.email = CONTACT_EMAIL;
  return node;
}

function brokerageNode(base: string): Record<string, unknown> {
  return {
    "@type": "Organization",
    "@id": `${base}${BROKERAGE_ID_SUFFIX}`,
    name: SUPERVISING_BROKERAGE,
    url: BHHS_NEVADA_PUBLIC_URL,
  };
}

/**
 * JSON-LD @graph for geo/service subpages: WebPage, BreadcrumbList, optional FAQPage & Place.
 */
export function buildGeoPageStructuredData(params: {
  path: string;
  pageTitle: string;
  pageDescription: string;
  breadcrumbs: BreadcrumbItem[];
  faqItems?: FaqItem[];
  place?: {
    name: string;
    description: string;
    postalCode?: string;
    containedInPlace?: string;
  };
  service?: {
    name: string;
    description: string;
    serviceType: string;
  };
}): Record<string, unknown> {
  const base = getPublicSiteUrl().replace(/\/$/, "");
  const pageUrl = `${base}${params.path}`;
  const webpageId = `${pageUrl}#webpage`;
  const breadcrumbId = `${pageUrl}#breadcrumb`;

  const graph: Record<string, unknown>[] = [
    brokerageNode(base),
    businessNode(base),
    {
      "@type": "WebPage",
      "@id": webpageId,
      url: pageUrl,
      name: params.pageTitle,
      description: params.pageDescription,
      isPartOf: { "@id": `${base}#website` },
      about: { "@id": `${base}${BUSINESS_ID_SUFFIX}` },
      breadcrumb: { "@id": breadcrumbId },
      inLanguage: "en-US",
    },
    {
      "@type": "BreadcrumbList",
      "@id": breadcrumbId,
      itemListElement: params.breadcrumbs.map((crumb, i) => {
        const item: Record<string, unknown> = {
          "@type": "ListItem",
          position: i + 1,
          name: crumb.name,
        };
        if (crumb.path) {
          item.item = `${base}${crumb.path}`;
        }
        return item;
      }),
    },
  ];

  if (params.place) {
    graph.push({
      "@type": "Place",
      "@id": `${pageUrl}#place`,
      name: params.place.name,
      description: params.place.description,
      ...(params.place.postalCode
        ? {
            address: {
              "@type": "PostalAddress",
              addressLocality: PRIMARY_LOCALITY,
              addressRegion: PRIMARY_REGION,
              postalCode: params.place.postalCode,
              addressCountry: "US",
            },
          }
        : {}),
      ...(params.place.containedInPlace
        ? { containedInPlace: { "@type": "Place", name: params.place.containedInPlace } }
        : {}),
    });
  }

  if (params.service) {
    graph.push({
      "@type": "Service",
      "@id": `${pageUrl}#service`,
      name: params.service.name,
      description: params.service.description,
      serviceType: params.service.serviceType,
      provider: { "@id": `${base}${BUSINESS_ID_SUFFIX}` },
      areaServed: {
        "@type": "Place",
        name: `${PRIMARY_LOCALITY}, ${PRIMARY_REGION}`,
      },
    });
  }

  if (params.faqItems && params.faqItems.length > 0) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${pageUrl}#faqpage`,
      url: pageUrl,
      mainEntity: params.faqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}

/** Visible license line for geo pages — matches structured data. */
export function geoPageLicenseLine(): string {
  return `${AGENT_DISPLAY_NAME}, Nevada REALTOR® · License ${NEVADA_LICENSE} · ${SUPERVISING_BROKERAGE}`;
}
