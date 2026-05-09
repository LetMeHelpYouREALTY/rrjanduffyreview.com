import type { Metadata } from "next";
import AboutNapSection from "@/components/sections/AboutNapSection";
import { buildSubpageMetadata } from "@/lib/seo-pages";
import { ROUTES } from "@/lib/site-routes";

export const metadata: Metadata = buildSubpageMetadata({
  title: "About Dr. Jan Duffy — office, NAP & Google Maps",
  description:
    "Nevada REALTOR®, Berkshire Hathaway HomeServices Nevada Properties, verified phone and address synced with Google Business Profile, Stonebridge-focused Summerlin advisory.",
  path: ROUTES.about,
});

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-surface text-on-surface">
      <AboutNapSection headingLevel="h1" />
    </div>
  );
}
