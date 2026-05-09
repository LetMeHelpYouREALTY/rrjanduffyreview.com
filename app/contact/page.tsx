import type { Metadata } from "next";
import {
  ContactScheduleSection,
  OfficesBandSection,
} from "@/components/sections/ContactOfficesSections";
import { buildSubpageMetadata } from "@/lib/seo-pages";
import { ROUTES } from "@/lib/site-routes";

export const metadata: Metadata = buildSubpageMetadata({
  title: "Contact & Berkshire Hathaway office locations",
  description:
    "Schedule a valuation briefing or tour through Calendly, call verified NAP lines, directions to Berkshire Hathaway HomeServices Nevada Properties offices, Summerlin consultations.",
  path: ROUTES.contact,
});

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-surface text-on-surface">
      <ContactScheduleSection />
      <OfficesBandSection />
    </div>
  );
}
