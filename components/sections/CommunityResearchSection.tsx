import Image from "next/image";
import { DeferredOfficeListingsBand } from "@/components/realscout/DeferredOfficeListingsBand";
import { DeferredSimpleSearchBand } from "@/components/realscout/DeferredSimpleSearchBand";
import {
  HERITAGE_STONEBRIDGE_FACTS,
  SUN_CITY_FACTS,
  formatVillageList,
  SUMMERLIN_WEST_VILLAGES,
} from "@/lib/hyperlocal-summerlin";

const RESEARCH_IMAGE =
  "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1600&q=80";

export default function CommunityResearchSection({
  headingLevel = "h2",
}: {
  headingLevel?: "h1" | "h2";
}) {
  const titleCls =
    "font-display text-3xl md:text-[2.25rem] font-medium text-on-surface tracking-tight mb-8";
  const titleText = "Community-fit research across Summerlin West zips";

  const westSample = formatVillageList(SUMMERLIN_WEST_VILLAGES, 4);

  return (
    <section className="py-16 md:py-section bg-surface-low border-y border-outline/10 scroll-mt-32">
      <div className="max-w-content mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div>
          {headingLevel === "h1" ? (
            <h1 className={titleCls}>{titleText}</h1>
          ) : (
            <h2 className={titleCls}>{titleText}</h2>
          )}
          <ul className="space-y-8">
            <li>
              <h3 className="font-display text-xl text-on-surface mb-2">
                Sun City 89134 vs Heritage at Stonebridge 89138
              </h3>
              <p className="text-on-surface-variant leading-relaxed text-[15px]">
                Del Webb Sun City Summerlin—{SUN_CITY_FACTS.totalHomes.toLocaleString()}{" "}
                resale homes, {SUN_CITY_FACTS.recreationCenters} recreation centers,{" "}
                {SUN_CITY_FACTS.golfHoles} holes of golf, not guard-gated—versus
                Lennar Heritage at Stonebridge—{HERITAGE_STONEBRIDGE_FACTS.totalHomes}{" "}
                staff guard-gated homes built {HERITAGE_STONEBRIDGE_FACTS.yearsBuilt}.
                Paired with HOA fees, guest policies, and what actually trades at your
                budget.
              </p>
            </li>
            <li>
              <h3 className="font-display text-xl text-on-surface mb-2">
                Summerlin West village dossiers ({westSample})
              </h3>
              <p className="text-on-surface-variant leading-relaxed text-[15px]">
                Stonebridge, Kestrel, Redpoint, and Grand Park each carry different
                builder mixes, trail links toward Red Rock Canyon, and HOA capital
                schedules—modeled plainly so you see risk before initials hit the
                contract.
              </p>
            </li>
            <li>
              <h3 className="font-display text-xl text-on-surface mb-2">
                Diligence on HOAs &amp; new construction nuance
              </h3>
              <p className="text-on-surface-variant leading-relaxed text-[15px]">
                Disclosure packets, resale certificates, clubhouse capital schedules,
                builder rate-buydowns versus resale concessions—organized so diligence
                supports the lifestyle narrative, not spreadsheets for their own sake.
              </p>
            </li>
          </ul>
        </div>
        <div className="relative">
          <div className="relative aspect-[4/3] border border-outline/15 overflow-hidden bg-surface-container">
            <Image
              src={RESEARCH_IMAGE}
              alt="Market notes, tablet, and workspace suggesting research-driven analysis — Summerlin West real estate advisory"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="absolute -bottom-4 -right-4 md:bottom-6 md:right-6 bg-primary text-on-primary px-5 py-4 max-w-[220px] border border-on-primary/20">
            <p className="text-[10px] font-bold tracking-[0.14em] uppercase leading-snug">
              89138 · 89134 · village-level intel for decisive moves
            </p>
          </div>
        </div>
      </div>
      <DeferredSimpleSearchBand />
      <DeferredOfficeListingsBand />
    </section>
  );
}
