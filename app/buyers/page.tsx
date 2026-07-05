import type { Metadata } from "next";
import { DeferredSimpleSearchBand } from "@/components/realscout/DeferredSimpleSearchBand";
import { GeoPageShell, HighlightGrid } from "@/components/pages/GeoPageShell";
import { BUYERS_PAGE } from "@/lib/service-pages";
import { buildSubpageMetadata } from "@/lib/seo-pages";
import { buildGeoPageStructuredData } from "@/lib/structured-data-page";
import { ROUTES } from "@/lib/site-routes";
import { communityPath } from "@/lib/community-pages";

export const metadata: Metadata = buildSubpageMetadata({
  title: BUYERS_PAGE.seoTitle,
  description: BUYERS_PAGE.seoDescription,
  path: BUYERS_PAGE.path,
});

export default function BuyersPage() {
  const ld = buildGeoPageStructuredData({
    path: BUYERS_PAGE.path,
    pageTitle: BUYERS_PAGE.seoTitle,
    pageDescription: BUYERS_PAGE.seoDescription,
    breadcrumbs: [
      { name: "Home", path: ROUTES.home },
      { name: "Buyers" },
    ],
    faqItems: BUYERS_PAGE.faqItems,
    service: {
      name: BUYERS_PAGE.serviceName,
      description: BUYERS_PAGE.serviceDescription,
      serviceType: BUYERS_PAGE.serviceType,
    },
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
      />
      <GeoPageShell
        eyebrow={BUYERS_PAGE.eyebrow}
        h1={BUYERS_PAGE.h1}
        intro={BUYERS_PAGE.intro}
        faqItems={BUYERS_PAGE.faqItems}
        relatedLinks={[
          { href: ROUTES.communities, label: "Community guides" },
          { href: ROUTES.activeAdult, label: "55+ communities" },
          { href: communityPath("sun-city-summerlin"), label: "Sun City Summerlin" },
          { href: ROUTES.listings, label: "MLS search" },
        ]}
      >
        <HighlightGrid items={BUYERS_PAGE.bullets} />
        <div className="mt-14">
          <DeferredSimpleSearchBand />
        </div>
      </GeoPageShell>
    </>
  );
}
