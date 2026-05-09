import Image from "next/image";

const RESEARCH_IMAGE =
  "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1600&q=80";

export default function CommunityResearchSection({
  headingLevel = "h2",
}: {
  headingLevel?: "h1" | "h2";
}) {
  const titleCls =
    "font-display text-3xl md:text-[2.25rem] font-medium text-on-surface tracking-tight mb-8";
  const titleText = "Community-fit research, grounded in comps";

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
                Comparative neighborhood dossiers
              </h3>
              <p className="text-on-surface-variant leading-relaxed text-[15px]">
                Sun City versus Del Webb, Heritage at Stonebridge versus resale-only pockets—paired
                with pacing, HOA posture, guest policies, and what actually trades at your budget.
              </p>
            </li>
            <li>
              <h3 className="font-display text-xl text-on-surface mb-2">
                Negotiations with scenario planning
              </h3>
              <p className="text-on-surface-variant leading-relaxed text-[15px]">
                Offer structure, inspection leverage, appraisal gap realities,
                leasebacks—modeled plainly so sellers and buyers see risk before initials hit the
                contract.
              </p>
            </li>
            <li>
              <h3 className="font-display text-xl text-on-surface mb-2">
                Diligence on HOAs &amp; new construction nuance
              </h3>
              <p className="text-on-surface-variant leading-relaxed text-[15px]">
                Disclosure packets, resale certificates, clubhouse capital schedules,
                builder deadlines—organized so diligence supports the lifestyle narrative,
                not spreadsheets for their own sake.
              </p>
            </li>
          </ul>
        </div>
        <div className="relative">
          <div className="relative aspect-[4/3] border border-outline/15 overflow-hidden bg-surface-container">
            <Image
              src={RESEARCH_IMAGE}
              alt="Market notes, tablet, and workspace suggesting research-driven analysis — Summerlin real estate advisory"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="absolute -bottom-4 -right-4 md:bottom-6 md:right-6 bg-primary text-on-primary px-5 py-4 max-w-[220px] border border-on-primary/20">
            <p className="text-[10px] font-bold tracking-[0.14em] uppercase leading-snug">
              Lifestyle + market intel for decisive moves
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
