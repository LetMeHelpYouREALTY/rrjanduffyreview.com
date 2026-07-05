import type { Metadata } from "next";
import CommunityResearchSection from "@/components/sections/CommunityResearchSection";
import { buildSubpageMetadata } from "@/lib/seo-pages";
import { ROUTES } from "@/lib/site-routes";

export const metadata: Metadata = buildSubpageMetadata({
  title: "Community research — 89134 Sun City & 89138 Stonebridge",
  description:
    "Side-by-side Summerlin West diligence—Sun City Summerlin (7,700+ Del Webb homes), Heritage at Stonebridge guard-gated 55+, Kestrel and Redpoint new-build—plus HOA nuance, comps, and negotiation framing with Dr. Jan Duffy.",
  path: ROUTES.insights,
});

export default function InsightsPage() {
  return (
    <div className="min-h-screen bg-surface text-on-surface">
      <CommunityResearchSection headingLevel="h1" />
    </div>
  );
}
