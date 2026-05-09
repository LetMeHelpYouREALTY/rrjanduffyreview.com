import Link from "next/link";
import { DeferredOfficeListingsBand } from "@/components/realscout/DeferredOfficeListingsBand";
import { DeferredSimpleSearchBand } from "@/components/realscout/DeferredSimpleSearchBand";
import { homeMarketingCopy } from "@/lib/home-marketing-copy";

export default function ListingsSections() {
  return (
    <div className="min-h-screen bg-surface text-on-surface py-10 md:py-14 scroll-mt-32">
      <div className="flex justify-center py-10 px-4 bg-surface" id="property-search">
        <DeferredSimpleSearchBand embedded />
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
        <DeferredOfficeListingsBand embedded />
      </section>
    </div>
  );
}
