import type { Metadata } from "next";
import ReviewsInteractiveSection from "@/components/sections/ReviewsInteractiveSection";
import { buildSubpageMetadata } from "@/lib/seo-pages";
import { ROUTES } from "@/lib/site-routes";

export const metadata: Metadata = buildSubpageMetadata({
  title: "Client reviews — 89134 Sun City & 89138 Summerlin West",
  description:
    "Client feedback on Sun City Summerlin, Heritage at Stonebridge, Kestrel, Redpoint, Summerlin West villages, Sky Canyon, and North Las Vegas transactions with Dr. Jan Duffy, REALTOR®.",
  path: ROUTES.reviews,
});

export default function ReviewsPage() {
  return (
    <div className="min-h-screen bg-surface text-on-surface">
      <ReviewsInteractiveSection />
    </div>
  );
}
