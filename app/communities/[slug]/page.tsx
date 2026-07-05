import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DeferredSimpleSearchBand } from "@/components/realscout/DeferredSimpleSearchBand";
import { GeoPageShell, HighlightGrid } from "@/components/pages/GeoPageShell";
import {
  communityPath,
  getAllCommunitySlugs,
  getCommunityBySlug,
} from "@/lib/community-pages";
import { buildSubpageMetadata } from "@/lib/seo-pages";
import { buildGeoPageStructuredData } from "@/lib/structured-data-page";
import { ROUTES } from "@/lib/site-routes";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllCommunitySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const community = getCommunityBySlug(slug);
  if (!community) return {};
  return buildSubpageMetadata({
    title: community.seoTitle,
    description: community.seoDescription,
    path: communityPath(slug),
  });
}

export default async function CommunityPage({ params }: PageProps) {
  const { slug } = await params;
  const community = getCommunityBySlug(slug);
  if (!community) notFound();

  const path = communityPath(slug);
  const relatedLinks = [
    ...community.relatedSlugs
      .map((s) => getCommunityBySlug(s))
      .filter((c): c is NonNullable<typeof c> => Boolean(c))
      .map((c) => ({ href: communityPath(c.slug), label: c.name })),
    { href: ROUTES.activeAdult, label: "55+ buyer hub" },
    { href: ROUTES.listings, label: "MLS search" },
  ];

  const ld = buildGeoPageStructuredData({
    path,
    pageTitle: community.seoTitle,
    pageDescription: community.seoDescription,
    breadcrumbs: [
      { name: "Home", path: ROUTES.home },
      { name: "Communities", path: ROUTES.communities },
      { name: community.name },
    ],
    faqItems: community.faqItems,
    place: {
      name: community.name,
      description: community.placeDescription,
      postalCode: community.zip,
      containedInPlace: community.containedInPlace,
    },
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
      />
      <GeoPageShell
        eyebrow={community.eyebrow}
        h1={community.h1}
        intro={community.intro}
        faqItems={community.faqItems}
        relatedLinks={relatedLinks}
      >
        <HighlightGrid items={community.highlights} />
        <div className="mt-14">
          <DeferredSimpleSearchBand />
        </div>
      </GeoPageShell>
    </>
  );
}
