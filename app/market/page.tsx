import type { Metadata } from "next";
import MarketMetricsSection from "@/components/sections/MarketMetricsSection";
import { buildSubpageMetadata } from "@/lib/seo-pages";
import { ROUTES } from "@/lib/site-routes";

export const metadata: Metadata = buildSubpageMetadata({
  title: "Summerlin & 55+ market framing — May–Jun 2026 pacing",
  description:
    "Directional medians—Las Vegas ~$450K, Summerlin South ~$847K, Sun City ~$480K—and inventory illustrations for Summerlin West and active-adult corridors, validated on consults with live MLS comps and Dr. Jan Duffy.",
  path: ROUTES.market,
});

export default function MarketPage() {
  return (
    <div className="min-h-screen bg-surface text-on-surface">
      <MarketMetricsSection headingLevel="h1" />
    </div>
  );
}
