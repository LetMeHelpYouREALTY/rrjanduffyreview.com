import {
  Activity,
  BarChart3,
  Gauge,
  LineChart,
} from "lucide-react";
import { homeMarketingCopy } from "@/lib/home-marketing-copy";
import { AGENT_DISPLAY_NAME } from "@/lib/site-contact";

export default function MarketMetricsSection({
  headingLevel = "h2",
}: {
  headingLevel?: "h1" | "h2";
}) {
  const mhCls =
    "font-display text-3xl md:text-[2.25rem] font-medium text-on-surface tracking-tight text-center mb-3";

  return (
    <section id="market-metrics" className="py-16 md:py-section bg-surface scroll-mt-32">
      <div className="max-w-content mx-auto px-4 md:px-8">
        {headingLevel === "h1" ? (
          <h1 className={mhCls}>{homeMarketingCopy.marketMetricsHeading}</h1>
        ) : (
          <h2 className={mhCls}>{homeMarketingCopy.marketMetricsHeading}</h2>
        )}
        <p className="text-center text-on-surface-variant max-w-2xl mx-auto mb-10 leading-relaxed">
          {homeMarketingCopy.marketMetricsBlurb}{" "}
          <span className="font-semibold text-on-surface">
            Illustrations only; not live MLS statistics.
          </span>
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="border border-outline/15 bg-surface-container-low p-6 flex flex-col">
            <div className="flex items-center gap-2 mb-4 text-on-surface">
              <BarChart3 className="h-5 w-5 text-primary" aria-hidden />
              <span className="text-sm font-bold tracking-[0.08em] uppercase">
                Inventory rhythm
              </span>
            </div>
            <div className="flex items-end justify-center gap-1.5 h-28 mt-auto">
              {[40, 65, 35, 80, 50, 90, 45].map((h, i) => (
                <div
                  key={i}
                  className={`w-3 ${i === 5 ? "bg-primary" : "bg-secondary/40"}`}
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>
          <div className="border border-outline/15 bg-surface-container-low p-6 flex flex-col">
            <div className="flex items-center gap-2 mb-4 text-on-surface">
              <Gauge className="h-5 w-5 text-primary" aria-hidden />
              <span className="text-sm font-bold tracking-[0.08em] uppercase">
                Buyer interest
              </span>
            </div>
            <div className="relative w-28 h-28 mx-auto mt-4 rounded-full border-4 border-secondary/30 flex items-center justify-center">
              <div
                className="absolute inset-1 rounded-full border-4 border-transparent border-t-primary border-r-primary/50"
                aria-hidden
              />
              <Activity className="h-8 w-8 text-primary" aria-hidden />
            </div>
          </div>
          <div className="border border-outline/15 bg-surface-container-low p-6 flex flex-col">
            <div className="flex items-center gap-2 mb-4 text-on-surface">
              <LineChart className="h-5 w-5 text-primary" aria-hidden />
              <span className="text-sm font-bold tracking-[0.08em] uppercase">
                Value per square foot
              </span>
            </div>
            <svg
              className="w-full h-24 mt-auto text-primary"
              viewBox="0 0 120 40"
              fill="none"
              aria-hidden
            >
              <path
                d="M0 32 L20 28 L40 30 L60 18 L80 20 L100 8 L120 12"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M0 32 L20 28 L40 30 L60 18 L80 20 L100 8 L120 12 L120 40 L0 40 Z"
                fill="currentColor"
                opacity="0.08"
              />
            </svg>
          </div>
        </div>
        <div
          className="border border-secondary/25 bg-insight-bg px-6 py-6 max-w-3xl mx-auto"
          role="note"
        >
          <p className="text-xs font-bold tracking-[0.1em] uppercase text-on-secondary-container mb-2">
            {AGENT_DISPLAY_NAME}&apos;s perspective
          </p>
          <p className="text-on-secondary-container leading-relaxed text-[15px]">
            Summerlin payoff comes from marrying HOA culture, clubhouse programming,
            ingress/egress timing, elevation, schools (where applicable), and resale
            velocity—not just list price averages. Book a consult to reconcile these
            inputs with inventory that matches <em>your</em> calendar and cash-flow
            comfort.
          </p>
        </div>
      </div>
    </section>
  );
}
