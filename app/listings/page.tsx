import type { Metadata } from "next";
import ListingsSections from "@/components/sections/ListingsSections";
import { buildSubpageMetadata } from "@/lib/seo-pages";
import { ROUTES } from "@/lib/site-routes";

export const metadata: Metadata = buildSubpageMetadata({
  title: "MLS search & Summerlin listings",
  description:
    "RealScout MLS search and exclusive office listings for Sun City, Del Webb, Heritage at Stonebridge, Summerlin West, and the Las Vegas Valley—with Dr. Jan Duffy, Berkshire Hathaway HomeServices Nevada Properties.",
  path: ROUTES.listings,
});

export default function ListingsPage() {
  return <ListingsSections />;
}
