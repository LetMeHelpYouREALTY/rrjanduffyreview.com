import type { Metadata } from "next";
import FaqMainSection from "@/components/sections/FaqMainSection";
import { buildFaqRouteJsonLd } from "@/lib/structured-data-faq-page";
import { buildSubpageMetadata } from "@/lib/seo-pages";
import { ROUTES } from "@/lib/site-routes";

export const metadata: Metadata = buildSubpageMetadata({
  title: "FAQ — MLS, license verification & fair housing",
  description:
    "Common Nevada brokerage questions: RealScout MLS widgets, supervising brokerage disclosure, verifying license S.0197614.LLC, fair housing guidance, GBP reviews.",
  path: ROUTES.faq,
});

export default function FaqPage() {
  const ld = buildFaqRouteJsonLd();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
      />
      <div className="min-h-screen bg-surface text-on-surface">
        <FaqMainSection headingLevel="h1" />
      </div>
    </>
  );
}
