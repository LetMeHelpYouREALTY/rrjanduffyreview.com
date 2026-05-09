import type { Metadata } from "next";
import TrustDisclosuresSection from "@/components/sections/TrustDisclosuresSection";
import { buildSubpageMetadata } from "@/lib/seo-pages";
import { ROUTES } from "@/lib/site-routes";

export const metadata: Metadata = buildSubpageMetadata({
  title: "Trust — license, MLS disclaimers & fair housing",
  description:
    "Nevada Division license verification links, supervising brokerage disclosures, HUD fair housing anchor, MLS/RealScout data reliability notices for Summerlin IDX tools.",
  path: ROUTES.trust,
});

export default function TrustPage() {
  return (
    <div className="min-h-screen bg-surface text-on-surface">
      <TrustDisclosuresSection headingLevel="h1" />
    </div>
  );
}
