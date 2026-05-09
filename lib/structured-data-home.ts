import { OFFICE_LOCATIONS } from "@/lib/office-locations";
import {
  BUSINESS_NAME,
  CONTACT_EMAIL,
  PRIMARY_LOCALITY,
  PRIMARY_PHONE_DISPLAY,
  PRIMARY_POSTAL,
  PRIMARY_REGION,
  PRIMARY_STREET,
  SUPERVISING_BROKERAGE,
  getPublicSiteUrl,
} from "@/lib/site-contact";
import { BHHS_NEVADA_PUBLIC_URL } from "@/lib/public-resources";

type ReviewSeed = {
  id: number;
  review: string;
  authorName: string;
  date: string;
  stars: number;
  location?: string;
};

const BROKERAGE_ID_SUFFIX = "#brokerage";
const BUSINESS_ID_SUFFIX = "#business";
const WEBSITE_ID_SUFFIX = "#website";
const WEBPAGE_ID_SUFFIX = "#webpage";

function sameAsList(): string[] | undefined {
  const raw = process.env.NEXT_PUBLIC_SAME_AS?.trim();
  if (!raw) return undefined;
  const urls = raw
    .split(/[\s,]+/)
    .map((s) => s.trim())
    .filter(Boolean);
  return urls.length ? urls : undefined;
}

function ogImageUrl(): string | undefined {
  const u = process.env.NEXT_PUBLIC_OG_IMAGE_URL?.trim();
  if (!u) return undefined;
  if (u.startsWith("http")) return u;
  const base = getPublicSiteUrl();
  return `${base}${u.startsWith("/") ? "" : "/"}${u}`;
}

export function buildHomeStructuredDataGraph(params: {
  reviews: ReviewSeed[];
  pageTitle: string;
  pageDescription: string;
}): Record<string, unknown> {
  const base = getPublicSiteUrl();
  const businessId = `${base}${BUSINESS_ID_SUFFIX}`;
  const websiteId = `${base}${WEBSITE_ID_SUFFIX}`;
  const webpageId = `${base}${WEBPAGE_ID_SUFFIX}`;
  const brokerageId = `${base}${BROKERAGE_ID_SUFFIX}`;
  const avg =
    params.reviews.reduce((s, r) => s + r.stars, 0) / params.reviews.length;
  const og = ogImageUrl();

  const agent: Record<string, unknown> = {
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
    knowsAbout: [
      "Nevada residential real estate brokerage",
      "Las Vegas Valley buyer and seller representation",
      "Summerlin master-planned neighborhoods and HOA governance",
      "Active adult neighborhoods including Sun City Summerlin & Del Webb",
      "Heritage at Stonebridge age-qualified offerings in Village of Stonebridge",
    ],
    areaServed: [
      {
        "@type": "Place",
        name: "Sun City Summerlin & Del Webb Summerlin villages, Las Vegas, NV",
      },
      {
        "@type": "Place",
        name: "Heritage at Stonebridge — Village of Stonebridge, Summerlin, NV",
      },
      { "@type": "Place", name: "Summerlin West, Las Vegas, NV" },
      { "@type": "Place", name: "Lone Mountain, Las Vegas, NV" },
      { "@type": "Place", name: "Sky Canyon, Las Vegas, NV" },
      { "@type": "Place", name: "North Las Vegas, NV" },
    ],
    location: OFFICE_LOCATIONS.map((loc) => ({
      "@type": "PostalAddress",
      streetAddress: loc.address,
      addressCountry: "US",
      telephone: loc.phone,
    })),
    worksFor: { "@id": brokerageId },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: Number(avg.toFixed(1)),
      reviewCount: params.reviews.length,
      bestRating: 5,
      worstRating: 1,
    },
  };

  if (CONTACT_EMAIL) agent.email = CONTACT_EMAIL;
  const sameAs = sameAsList();
  if (sameAs) agent.sameAs = sameAs;

  const webPage: Record<string, unknown> = {
    "@type": "WebPage",
    "@id": webpageId,
    url: base,
    name: params.pageTitle,
    description: params.pageDescription,
    isPartOf: { "@id": websiteId },
    about: { "@id": businessId },
    breadcrumb: { "@id": `${base}/#breadcrumb` },
  };
  if (og) {
    webPage.primaryImageOfPage = {
      "@type": "ImageObject",
      url: og,
    };
  }

  const graph: Record<string, unknown>[] = [
    {
      "@type": "Organization",
      "@id": brokerageId,
      name: SUPERVISING_BROKERAGE,
      url: BHHS_NEVADA_PUBLIC_URL,
    },
    agent,
    {
      "@type": "WebSite",
      "@id": websiteId,
      url: base,
      name: BUSINESS_NAME,
      description: params.pageDescription,
      publisher: { "@id": businessId },
      inLanguage: "en-US",
    },
    webPage,
    {
      "@type": "BreadcrumbList",
      "@id": `${base}/#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: base,
        },
      ],
    },
    ...params.reviews.map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.authorName },
      reviewRating: {
        "@type": "Rating",
        ratingValue: r.stars,
        bestRating: 5,
        worstRating: 1,
      },
      reviewBody: r.review,
      datePublished: r.date,
      itemReviewed: { "@id": businessId },
    })),
  ];

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}
