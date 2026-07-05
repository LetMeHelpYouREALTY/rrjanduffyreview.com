import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { ROUTES } from "@/lib/site-routes";
import { homeMarketingCopy } from "@/lib/home-marketing-copy";
import {
  AGENT_DISPLAY_NAME,
  AGENT_TITLE,
  BUSINESS_NAME,
  NEVADA_LICENSE,
  SUPERVISING_BROKERAGE,
} from "@/lib/site-contact";
import { DeferredOfficeListingsBand } from "@/components/realscout/DeferredOfficeListingsBand";
import { DeferredSimpleSearchBand } from "@/components/realscout/DeferredSimpleSearchBand";
import { HOME_REVIEW_SEED } from "@/lib/home-review-seed";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=2400&q=80";

export function HomeLanding() {
  const avg =
    HOME_REVIEW_SEED.reduce((s, r) => s + r.stars, 0) / HOME_REVIEW_SEED.length;
  const rounded = Math.round(avg);

  return (
    <div className="min-h-screen bg-surface text-on-surface">
      <section
        className="relative min-h-[78vh] md:min-h-[85vh] flex items-stretch"
        aria-label="Introduction"
      >
        <Image
          src={HERO_IMAGE}
          alt="Modern luxury home at dusk with warm interior lighting, Summerlin Las Vegas area"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/65 to-primary/25"
          aria-hidden
        />
        <div className="relative z-10 max-w-content mx-auto px-4 md:px-8 w-full flex items-center py-16 md:py-24">
          <div className="w-full max-w-xl bg-surface border border-outline-variant/80 p-8 md:p-10 shadow-none rounded-clinical-lg">
            <p className="font-label text-[13px] font-semibold tracking-[0.06em] uppercase text-secondary mb-4">
              {homeMarketingCopy.heroEyebrow}
            </p>
            <h1 className="font-display font-bold text-on-surface tracking-tight text-balance leading-[1.15]">
              <span className="block text-[clamp(2rem,4.5vw,3.25rem)]">
                89134 Sun City. 89138 Stonebridge. Heritage at Stonebridge 55+.
              </span>
              <span className="block mt-4 text-[clamp(1.125rem,2.75vw,1.625rem)] font-semibold leading-snug">
                Village-by-village Summerlin West guidance—from Kestrel new-build
                to Del Webb resale.
              </span>
            </h1>
            <p className="mt-5 text-on-surface-variant leading-relaxed text-[15px] md:text-base">
              {homeMarketingCopy.heroSupportingParagraph}
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              <Link
                href={ROUTES.listings}
                className="inline-flex items-center justify-center min-h-12 rounded-md bg-secondary text-on-secondary px-5 py-3 font-label text-[13px] font-semibold tracking-[0.05em] uppercase hover:bg-secondary-container transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Explore listings
              </Link>
              <Link
                href={ROUTES.market}
                className="inline-flex items-center justify-center min-h-12 rounded-md border-2 border-primary text-primary bg-transparent px-5 py-3 font-label text-[13px] font-semibold tracking-[0.05em] uppercase hover:bg-surface-container transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                View market framing
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="border-b border-outline/10 bg-surface-container-low">
        <div className="max-w-content mx-auto px-4 md:px-8 py-4 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-[10px] font-bold tracking-[0.12em] uppercase text-on-surface-variant">
              {SUPERVISING_BROKERAGE}
            </p>
            <p className="font-display text-lg text-on-surface mt-1">{BUSINESS_NAME}</p>
            <p className="text-sm text-on-surface-variant mt-0.5">
              {AGENT_DISPLAY_NAME}, {AGENT_TITLE} · Nev. {NEVADA_LICENSE}
            </p>
          </div>
          <div className="flex items-center gap-3 border border-outline/15 bg-surface px-4 py-2">
            <div
              className="flex items-center gap-1"
              role="img"
              aria-label={`${rounded} out of 5 stars`}
            >
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={20}
                  aria-hidden
                  className={
                    star <= rounded
                      ? "fill-amber-400 text-amber-500"
                      : "text-outline-variant"
                  }
                />
              ))}
            </div>
            <div>
              <span className="text-lg font-semibold tabular-nums">
                {avg.toFixed(1)}
              </span>
              <span className="text-xs text-on-surface-variant ml-2">
                {HOME_REVIEW_SEED.length} reviews
              </span>
            </div>
            <Link
              href={ROUTES.reviews}
              className="text-xs font-bold tracking-[0.08em] uppercase text-primary hover:underline ml-2"
            >
              Read
            </Link>
          </div>
        </div>
      </div>

      <DeferredSimpleSearchBand />
      <DeferredOfficeListingsBand />

      <nav
        aria-label="Key pages"
        className="border-b border-outline/10 bg-surface py-14 md:py-16 scroll-mt-32"
      >
        <div className="max-w-content mx-auto px-4 md:px-8">
          <p className="font-label text-[11px] font-bold tracking-[0.14em] uppercase text-secondary text-center mb-3">
            Where to go next
          </p>
          <h2 className="font-display text-2xl md:text-3xl font-medium text-center text-on-surface tracking-tight mb-10">
            Search, research, verify—then schedule a confidential consult
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <NavCard href={ROUTES.listings} title="MLS search & listings">
              RealScout search by zip—89134 Sun City, 89138 Summerlin West,
              Heritage at Stonebridge, Kestrel, and Redpoint inventory.
            </NavCard>
            <NavCard href={ROUTES.insights} title="Community research">
              Sun City vs Heritage at Stonebridge vs Kestrel new-build—HOA
              posture, clubhouse access, guard-gate tradeoffs, comp velocity.
            </NavCard>
            <NavCard href={ROUTES.market} title="Market framing">
              Directional medians—valley ~$450K, Summerlin South ~$847K, Sun
              City ~$480K—validated on consults against live MLS comps.
            </NavCard>
            <NavCard href={ROUTES.reviews} title="Client reviews">
              Ratings summary, corridor tags, and client outcomes across Summerlin and
              the Las Vegas Valley.
            </NavCard>
            <NavCard href={ROUTES.about} title="About & GBP NAP">
              Supervised brokerage, Nevada license disclosures, verifying phone and
              address with Google Maps.
            </NavCard>
            <NavCard href={ROUTES.faq} title="Common questions">
              MLS disclaimers, license verification shortcuts, Fair Housing anchors,
              and RealScout sourcing.
            </NavCard>
            <NavCard href={ROUTES.contact} title="Contact">
              Briefing requests, tours, Berkshire Hathaway HomeServices storefronts,
              and direct dial MAP links.
            </NavCard>
            <NavCard href={ROUTES.trust} title="Trust & disclosures">
              NRED links, MLS reliability language, and brokerage supervision
              context.
            </NavCard>
          </ul>
        </div>
      </nav>
    </div>
  );
}

function NavCard({
  href,
  title,
  children,
}: {
  href: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        className="block h-full border border-outline/15 bg-surface-container-low p-5 rounded-clinical-lg hover:border-primary/40 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        <p className="font-display text-lg text-on-surface mb-2">{title}</p>
        <p className="text-sm text-on-surface-variant leading-relaxed">{children}</p>
      </Link>
    </li>
  );
}
