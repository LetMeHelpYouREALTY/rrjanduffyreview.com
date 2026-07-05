import type { Metadata } from "next";
import Link from "next/link";
import ReviewsInteractiveSection from "@/components/sections/ReviewsInteractiveSection";
import { communityPath } from "@/lib/community-pages";
import { buildSubpageMetadata } from "@/lib/seo-pages";
import {
  AGENT_DISPLAY_NAME,
  BUSINESS_NAME,
  SUPERVISING_BROKERAGE,
} from "@/lib/site-contact";
import { ROUTES } from "@/lib/site-routes";
import { buildReviewsRouteJsonLd } from "@/lib/structured-data-reviews-page";

const REVIEWS_TITLE =
  "Client reviews — Sun City, Stonebridge & Summerlin West | Dr. Jan Duffy";

const REVIEWS_DESCRIPTION =
  "Read client testimonials for Dr. Jan Duffy, REALTOR®—Sun City Summerlin, Heritage at Stonebridge, Summerlin West, Sky Canyon, and North Las Vegas transactions. Berkshire Hathaway HomeServices Nevada Properties.";

export const metadata: Metadata = {
  ...buildSubpageMetadata({
    title: REVIEWS_TITLE,
    description: REVIEWS_DESCRIPTION,
    path: ROUTES.reviews,
  }),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
    },
  },
};

export default function ReviewsPage() {
  const ld = buildReviewsRouteJsonLd();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
      />
      <div className="min-h-screen bg-surface text-on-surface">
        <section className="border-b border-outline/10 bg-surface-container-low py-10 md:py-12">
          <div className="max-w-content mx-auto px-4 md:px-8">
            <p className="text-[11px] font-bold tracking-[0.14em] uppercase text-secondary mb-3 max-w-3xl">
              Testimonials · Las Vegas Valley
            </p>
            <p className="text-on-surface-variant leading-relaxed text-[15px] md:text-base max-w-3xl">
              {BUSINESS_NAME} collects buyer and seller feedback from{" "}
              {AGENT_DISPLAY_NAME}, Nevada REALTOR®, supervised by{" "}
              {SUPERVISING_BROKERAGE}. Quotes reference real community comparisons—
              including{" "}
              <Link
                href={communityPath("sun-city-summerlin")}
                className="text-primary font-semibold underline-offset-4 hover:underline"
              >
                Sun City Summerlin
              </Link>
              ,{" "}
              <Link
                href={communityPath("heritage-at-stonebridge")}
                className="text-primary font-semibold underline-offset-4 hover:underline"
              >
                Heritage at Stonebridge
              </Link>
              , and{" "}
              <Link
                href={communityPath("summerlin-west")}
                className="text-primary font-semibold underline-offset-4 hover:underline"
              >
                Summerlin West
              </Link>
              —alongside Sky Canyon and North Las Vegas corridors.
            </p>
          </div>
        </section>
        <ReviewsInteractiveSection />
      </div>
    </>
  );
}
