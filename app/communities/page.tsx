import type { Metadata } from "next";
import Link from "next/link";
import { DeferredSimpleSearchBand } from "@/components/realscout/DeferredSimpleSearchBand";
import { GeoPageShell } from "@/components/pages/GeoPageShell";
import {
  communityPath,
  getAllCommunities,
} from "@/lib/community-pages";
import { buildSubpageMetadata } from "@/lib/seo-pages";
import { buildGeoPageStructuredData } from "@/lib/structured-data-page";
import { ROUTES } from "@/lib/site-routes";

export const metadata: Metadata = buildSubpageMetadata({
  title: "Summerlin & Las Vegas Valley communities — local guides",
  description:
    "Hyperlocal guides for Sun City Summerlin (89134), Heritage at Stonebridge (89138), Stonebridge Village, Kestrel, Redpoint, and Summerlin West—with FAQ schema and MLS search.",
  path: ROUTES.communities,
});

export default function CommunitiesIndexPage() {
  const communities = getAllCommunities();
  const ld = buildGeoPageStructuredData({
    path: ROUTES.communities,
    pageTitle: "Summerlin & Las Vegas Valley community guides",
    pageDescription:
      "Local guides for Sun City, Heritage at Stonebridge, and Summerlin West villages with Dr. Jan Duffy.",
    breadcrumbs: [
      { name: "Home", path: ROUTES.home },
      { name: "Communities" },
    ],
    place: {
      name: "Summerlin, Las Vegas, Nevada",
      description:
        "Master-planned communities west of the Las Vegas Strip including Summerlin West and active-adult neighborhoods.",
      postalCode: "89138",
    },
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
      />
      <GeoPageShell
        eyebrow="GEO · AEO hub"
        h1="Summerlin & valley community guides"
        intro="Village-level pages for buyers comparing Sun City Summerlin, Heritage at Stonebridge, and Summerlin West new construction—each with localized FAQ schema, NAP, and RealScout MLS links."
        relatedLinks={[
          { href: ROUTES.buyers, label: "Buyers" },
          { href: ROUTES.sellers, label: "Sellers" },
          { href: ROUTES.activeAdult, label: "55+ hub" },
          { href: ROUTES.listings, label: "MLS search" },
        ]}
      >
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {communities.map((c) => (
            <li key={c.slug}>
              <Link
                href={communityPath(c.slug)}
                className="block h-full border border-outline/15 bg-surface-container-low p-6 rounded-clinical-lg hover:border-primary/40 transition-colors"
              >
                <p className="text-[10px] font-bold tracking-[0.12em] uppercase text-secondary mb-2">
                  {c.zip}
                  {c.village ? ` · ${c.village}` : ""}
                </p>
                <h2 className="font-display text-xl text-on-surface mb-2">{c.name}</h2>
                <p className="text-sm text-on-surface-variant leading-relaxed line-clamp-3">
                  {c.intro}
                </p>
                <span className="inline-block mt-4 text-xs font-bold tracking-[0.08em] uppercase text-primary">
                  Read guide →
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-14">
          <DeferredSimpleSearchBand />
        </div>
      </GeoPageShell>
    </>
  );
}
