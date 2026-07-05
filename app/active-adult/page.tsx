import type { Metadata } from "next";
import Link from "next/link";
import { DeferredSimpleSearchBand } from "@/components/realscout/DeferredSimpleSearchBand";
import { GeoPageShell, HighlightGrid } from "@/components/pages/GeoPageShell";
import { communityPath } from "@/lib/community-pages";
import { ACTIVE_ADULT_PAGE } from "@/lib/service-pages";
import { buildSubpageMetadata } from "@/lib/seo-pages";
import { buildGeoPageStructuredData } from "@/lib/structured-data-page";
import { ROUTES } from "@/lib/site-routes";

export const metadata: Metadata = buildSubpageMetadata({
  title: ACTIVE_ADULT_PAGE.seoTitle,
  description: ACTIVE_ADULT_PAGE.seoDescription,
  path: ACTIVE_ADULT_PAGE.path,
});

export default function ActiveAdultPage() {
  const ld = buildGeoPageStructuredData({
    path: ACTIVE_ADULT_PAGE.path,
    pageTitle: ACTIVE_ADULT_PAGE.seoTitle,
    pageDescription: ACTIVE_ADULT_PAGE.seoDescription,
    breadcrumbs: [
      { name: "Home", path: ROUTES.home },
      { name: "55+ communities" },
    ],
    faqItems: ACTIVE_ADULT_PAGE.faqItems,
    service: {
      name: ACTIVE_ADULT_PAGE.serviceName,
      description: ACTIVE_ADULT_PAGE.serviceDescription,
      serviceType: ACTIVE_ADULT_PAGE.serviceType,
    },
    place: {
      name: "Las Vegas Valley 55+ communities",
      description:
        "Age-qualified active adult neighborhoods including Sun City Summerlin and Heritage at Stonebridge.",
      postalCode: "89134",
    },
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
      />
      <GeoPageShell
        eyebrow={ACTIVE_ADULT_PAGE.eyebrow}
        h1={ACTIVE_ADULT_PAGE.h1}
        intro={ACTIVE_ADULT_PAGE.intro}
        faqItems={ACTIVE_ADULT_PAGE.faqItems}
        relatedLinks={[
          { href: communityPath("sun-city-summerlin"), label: "Sun City Summerlin" },
          {
            href: communityPath("heritage-at-stonebridge"),
            label: "Heritage at Stonebridge",
          },
          { href: ROUTES.buyers, label: "Buyer representation" },
        ]}
      >
        <HighlightGrid items={ACTIVE_ADULT_PAGE.bullets} />
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href={communityPath("sun-city-summerlin")}
            className="block border border-outline/15 p-5 rounded-clinical-lg hover:border-primary/40"
          >
            <p className="text-xs font-bold uppercase tracking-wider text-secondary mb-1">
              89134
            </p>
            <p className="font-display text-lg">Sun City Summerlin guide →</p>
          </Link>
          <Link
            href={communityPath("heritage-at-stonebridge")}
            className="block border border-outline/15 p-5 rounded-clinical-lg hover:border-primary/40"
          >
            <p className="text-xs font-bold uppercase tracking-wider text-secondary mb-1">
              89138
            </p>
            <p className="font-display text-lg">Heritage at Stonebridge guide →</p>
          </Link>
        </div>
        <div className="mt-14">
          <DeferredSimpleSearchBand />
        </div>
      </GeoPageShell>
    </>
  );
}
