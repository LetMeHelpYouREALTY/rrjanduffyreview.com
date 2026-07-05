import type { Metadata } from "next";
import { GeoPageShell, HighlightGrid } from "@/components/pages/GeoPageShell";
import { SELLERS_PAGE } from "@/lib/service-pages";
import { buildSubpageMetadata } from "@/lib/seo-pages";
import { buildGeoPageStructuredData } from "@/lib/structured-data-page";
import { ROUTES } from "@/lib/site-routes";
import { communityPath } from "@/lib/community-pages";

export const metadata: Metadata = buildSubpageMetadata({
  title: SELLERS_PAGE.seoTitle,
  description: SELLERS_PAGE.seoDescription,
  path: SELLERS_PAGE.path,
});

export default function SellersPage() {
  const ld = buildGeoPageStructuredData({
    path: SELLERS_PAGE.path,
    pageTitle: SELLERS_PAGE.seoTitle,
    pageDescription: SELLERS_PAGE.seoDescription,
    breadcrumbs: [
      { name: "Home", path: ROUTES.home },
      { name: "Sellers" },
    ],
    faqItems: SELLERS_PAGE.faqItems,
    service: {
      name: SELLERS_PAGE.serviceName,
      description: SELLERS_PAGE.serviceDescription,
      serviceType: SELLERS_PAGE.serviceType,
    },
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
      />
      <GeoPageShell
        eyebrow={SELLERS_PAGE.eyebrow}
        h1={SELLERS_PAGE.h1}
        intro={SELLERS_PAGE.intro}
        faqItems={SELLERS_PAGE.faqItems}
        relatedLinks={[
          { href: ROUTES.contact, label: "Request valuation" },
          { href: communityPath("summerlin-west"), label: "Summerlin West" },
          { href: ROUTES.market, label: "Market framing" },
        ]}
      >
        <HighlightGrid items={SELLERS_PAGE.bullets} />
      </GeoPageShell>
    </>
  );
}
