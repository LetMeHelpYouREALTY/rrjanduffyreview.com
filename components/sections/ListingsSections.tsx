import Link from "next/link";
import { getRealScoutAgentEncodedId } from "@/lib/realscout-config";
import { homeMarketingCopy } from "@/lib/home-marketing-copy";

const realscoutAgentId = getRealScoutAgentEncodedId();

export default function ListingsSections() {
  return (
    <div className="min-h-screen bg-surface text-on-surface py-10 md:py-14 scroll-mt-32">
      <div className="flex justify-center py-10 px-4 bg-surface" id="property-search">
        <realscout-simple-search agent-encoded-id={realscoutAgentId} />
      </div>
      <section
        aria-label="Office listings"
        id="office-listings"
        className="max-w-content mx-auto px-4 md:px-8 pb-12 md:pb-section scroll-mt-32"
      >
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
          <h1 className="font-display text-2xl md:text-[32px] font-medium text-on-surface tracking-tight">
            {homeMarketingCopy.listingsHeading}
          </h1>
          <Link
            href="#property-search"
            className="text-[11px] font-bold tracking-[0.12em] uppercase text-primary hover:underline shrink-0"
          >
            Widen your search
          </Link>
        </div>
        <p className="text-on-surface-variant mb-6 max-w-2xl leading-relaxed">
          {homeMarketingCopy.listingsBlurb}
        </p>
        <div className="widget-wrapper border border-outline/15 bg-surface-container-low p-2 md:p-4">
          <realscout-office-listings
            agent-encoded-id={realscoutAgentId}
            sort-order="NEWEST"
            listing-status="For Sale,For Rent,Sold"
            property-types=""
          />
        </div>
      </section>
    </div>
  );
}
