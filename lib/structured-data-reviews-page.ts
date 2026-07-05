import { HOME_REVIEW_SEED } from "@/lib/home-review-seed";
import {
  BUSINESS_NAME,
  getPublicSiteUrl,
} from "@/lib/site-contact";
import { ROUTES } from "@/lib/site-routes";

/** Reviews route JSON-LD — WebPage, BreadcrumbList, individual Review nodes. */
export function buildReviewsRouteJsonLd(): Record<string, unknown> {
  const base = getPublicSiteUrl().replace(/\/$/, "");
  const url = `${base}${ROUTES.reviews}`;
  const businessId = `${base}#business`;
  const avg =
    HOME_REVIEW_SEED.reduce((s, r) => s + r.stars, 0) / HOME_REVIEW_SEED.length;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: "Client reviews — Summerlin & Las Vegas Valley",
        description:
          "Client testimonials for Dr. Jan Duffy, REALTOR® across Sun City Summerlin, Heritage at Stonebridge, Summerlin West, and the Las Vegas Valley.",
        isPartOf: { "@id": `${base}#website` },
        about: { "@id": businessId },
        breadcrumb: { "@id": `${url}#breadcrumb` },
        inLanguage: "en-US",
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: `${base}/`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Client reviews",
          },
        ],
      },
      {
        "@type": "RealEstateAgent",
        "@id": businessId,
        name: BUSINESS_NAME,
        url: base,
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: Number(avg.toFixed(1)),
          reviewCount: HOME_REVIEW_SEED.length,
          bestRating: 5,
          worstRating: 1,
        },
      },
      ...HOME_REVIEW_SEED.map((r) => ({
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
        ...(r.location
          ? {
              contentLocation: {
                "@type": "Place",
                name: r.location,
              },
            }
          : {}),
      })),
    ],
  };
}
