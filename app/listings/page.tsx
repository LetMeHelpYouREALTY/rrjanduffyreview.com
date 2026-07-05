import type { Metadata } from "next";
import ListingsSections from "@/components/sections/ListingsSections";
import { buildSubpageMetadata } from "@/lib/seo-pages";
import { ROUTES } from "@/lib/site-routes";

export const metadata: Metadata = buildSubpageMetadata({
  title: "MLS search — 89138 Summerlin West & 89134 Sun City",
  description:
    "RealScout MLS search and office listings for Sun City Summerlin, Heritage at Stonebridge, Kestrel, Redpoint, Stonebridge Village, and the Las Vegas Valley—with Dr. Jan Duffy, Berkshire Hathaway HomeServices Nevada Properties.",
  path: ROUTES.listings,
});

export default function ListingsPage() {
  return <ListingsSections />;
}
