import type { Metadata } from "next";
import CommunityResearchSection from "@/components/sections/CommunityResearchSection";
import { buildSubpageMetadata } from "@/lib/seo-pages";
import { ROUTES } from "@/lib/site-routes";

export const metadata: Metadata = buildSubpageMetadata({
  title: "Community research & neighborhood diligence",
  description:
    "Side-by-side Summerlin community analysis—Sun City, Del Webb, Heritage at Stonebridge—plus HOA nuance, comps, and negotiation framing with Dr. Jan Duffy.",
  path: ROUTES.insights,
});

export default function InsightsPage() {
  return (
    <div className="min-h-screen bg-surface text-on-surface">
      <CommunityResearchSection headingLevel="h1" />
    </div>
  );
}
