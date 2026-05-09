import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { DeferredOfficeListingsBand } from "@/components/realscout/DeferredOfficeListingsBand";
import { DeferredSimpleSearchBand } from "@/components/realscout/DeferredSimpleSearchBand";
import {
  AGENT_DISPLAY_NAME,
  AGENT_TITLE,
  BUSINESS_NAME,
  CONTACT_EMAIL,
  formatTelHref,
  NEVADA_LICENSE,
  OFFICE_HOURS_LINES,
  PRIMARY_LOCALITY,
  PRIMARY_PHONE_DISPLAY,
  PRIMARY_POSTAL,
  PRIMARY_REGION,
  PRIMARY_STREET,
  SUPERVISING_BROKERAGE,
} from "@/lib/site-contact";
import {
  buildMapsSearchUrl,
  buildViewReviewsUrl,
  buildWriteReviewUrl,
  isReviewsCtaDisabled,
  primaryMapEmbedSrc,
} from "@/lib/reviews";
import { ROUTES } from "@/lib/site-routes";

const ABOUT_PORTRAIT =
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80";

export default function AboutNapSection({
  headingLevel = "h2",
}: {
  headingLevel?: "h1" | "h2";
}) {
  const nameCls =
    "font-display text-3xl md:text-[2.75rem] font-medium text-on-surface tracking-tight leading-tight";

  return (
    <section
      id="about"
      className="py-16 md:py-section bg-surface border-b border-outline/10 scroll-mt-32"
    >
      <div className="max-w-content mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-14">
          <div>
            <p className="text-[11px] font-bold tracking-[0.14em] uppercase text-secondary mb-3">
              Meticulous representation
            </p>
            {headingLevel === "h1" ? (
              <h1 className={nameCls}>{AGENT_DISPLAY_NAME}</h1>
            ) : (
              <h2 className={nameCls}>{AGENT_DISPLAY_NAME}</h2>
            )}
            <p className="font-display text-lg md:text-xl text-on-surface mt-3 tracking-tight">
              Representation tuned to nuanced communities
            </p>
            <p className="text-on-surface-variant mt-5 leading-relaxed text-[15px] md:text-base">
              Nevada {AGENT_TITLE}, license {NEVADA_LICENSE}, supervised by{" "}
              {SUPERVISING_BROKERAGE}—guided counsel for HOA-led lifestyle products such as Sun City
              and Del Webb, Heritage at Stonebridge resale, investor-friendly corridors,
              and hybrid relocation timelines across the Las Vegas Valley.
            </p>
            <div className="grid grid-cols-2 gap-6 mt-10 pt-8 border-t border-outline/15">
              <div>
                <p className="font-display text-xl text-on-surface mb-1">Client-first advocacy</p>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  Transparent milestones, plain-language options, and disciplined follow-through.
                </p>
              </div>
              <div>
                <p className="font-display text-xl text-on-surface mb-1">Hyper-local depth</p>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  Micro-neighborhood context beyond generic market reports.
                </p>
              </div>
            </div>
            <Link
              href={ROUTES.reviews}
              className="inline-flex items-center gap-2 mt-8 text-xs font-bold tracking-[0.12em] uppercase text-primary hover:underline"
            >
              Read client stories
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
          <div className="relative border border-outline/15 bg-surface-container aspect-[3/4] max-w-md mx-auto lg:max-w-none lg:mx-0 overflow-hidden">
            <Image
              src={ABOUT_PORTRAIT}
              alt="Professional real estate advisor portrait — Summerlin Realtor Dr. Jan Duffy (replace with brokerage-approved headshot)"
              fill
              className="object-cover object-top"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          </div>
        </div>

        <DeferredSimpleSearchBand />
        <DeferredOfficeListingsBand />

        <div
          className="mb-10 max-w-3xl mx-auto border border-secondary/25 bg-insight-bg px-6 py-5"
          role="note"
        >
          <div className="flex gap-3 items-start">
            <BookOpen className="h-6 w-6 shrink-0 text-on-secondary-container mt-0.5" aria-hidden />
            <div>
              <p className="text-xs font-bold tracking-[0.1em] uppercase text-on-secondary-container mb-2">
                Research note
              </p>
              <p className="text-on-secondary-container leading-relaxed text-[15px]">
                Pair testimonials with live MLS evidence from RealScout, HOA packets, and Google
                Business Profile hours—especially when weighing Sun City, Del Webb, or Stonebridge
                inventory against resale-only Summerlin streets.
              </p>
            </div>
          </div>
        </div>

        <h3 className="font-display text-xl font-medium text-on-surface mb-6 text-center">
          Office &amp; Google Business Profile
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <div className="lg:col-span-5">
            <p className="text-lg font-semibold text-on-surface">{BUSINESS_NAME}</p>
            <p className="text-on-surface mt-2 leading-relaxed">{PRIMARY_STREET}</p>
            <p className="text-on-surface leading-relaxed">
              {PRIMARY_LOCALITY}, {PRIMARY_REGION} {PRIMARY_POSTAL}
            </p>
            <p className="mt-4">
              <a
                href={formatTelHref(PRIMARY_PHONE_DISPLAY)}
                className="text-primary font-semibold underline-offset-4 hover:underline"
              >
                Call {PRIMARY_PHONE_DISPLAY}
              </a>
            </p>
            {CONTACT_EMAIL ? (
              <p className="mt-2">
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-primary underline-offset-4 hover:underline"
                >
                  {CONTACT_EMAIL}
                </a>
              </p>
            ) : null}
            <div className="mt-6 text-on-surface-variant">
              <p className="text-xs font-bold tracking-[0.08em] uppercase text-on-surface mb-1">
                Office hours
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-[15px] leading-relaxed">
                {OFFICE_HOURS_LINES.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
            <div className="flex flex-wrap gap-3 mt-8">
              <a
                href={formatTelHref(PRIMARY_PHONE_DISPLAY)}
                className="inline-flex items-center justify-center rounded-md bg-charcoal text-white px-5 py-2.5 text-sm font-semibold hover:bg-inverse-surface transition-colors"
              >
                Call
              </a>
              <a
                href={buildMapsSearchUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-md border border-primary text-primary bg-transparent px-5 py-2.5 text-sm font-semibold hover:bg-secondary-container transition-colors"
              >
                Directions
              </a>
              {!isReviewsCtaDisabled() ? (
                <>
                  <a
                    href={buildViewReviewsUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-md border border-outline/20 bg-surface-container-low text-on-surface px-5 py-2.5 text-sm font-semibold hover:bg-secondary-container/50 transition-colors"
                  >
                    View Google reviews
                  </a>
                  <a
                    href={buildWriteReviewUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-md border border-outline/20 bg-surface-container-low text-on-surface px-5 py-2.5 text-sm font-semibold hover:bg-secondary-container/50 transition-colors"
                  >
                    Write a review
                  </a>
                </>
              ) : null}
            </div>
          </div>
          <div className="lg:col-span-7 w-full border border-outline/15 bg-surface-container-low aspect-video overflow-hidden">
            <iframe
              title={`Google Map — ${BUSINESS_NAME}, ${PRIMARY_LOCALITY}`}
              src={primaryMapEmbedSrc()}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "280px" }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
}
