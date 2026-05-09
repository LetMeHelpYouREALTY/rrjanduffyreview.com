import type { Metadata } from "next";
import MarketMetricsSection from "@/components/sections/MarketMetricsSection";
import { buildSubpageMetadata } from "@/lib/seo-pages";
import { ROUTES } from "@/lib/site-routes";

export const metadata: Metadata = buildSubpageMetadata({
  title: "Summerlin & 55+ market framing",
  description:
    "Directional inventory, buyer-interest, and value-per-foot illustrations for Summerlin and active-adult neighborhoods—validated on consults with live MLS comps and Dr. Jan Duffy.",
  path: ROUTES.market,
});

export default function MarketPage() {
  return (
    <div className="min-h-screen bg-surface text-on-surface">
      <MarketMetricsSection headingLevel="h1" />
    </div>
  );
}
