"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import {
  Star,
  MapPin,
  BookOpen,
  LineChart,
  BarChart3,
  Gauge,
  Activity,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { OFFICE_LOCATIONS } from "@/lib/office-locations";
import { buildCalendlyUrl } from "@/lib/calendly";
import { getRealScoutAgentEncodedId } from "@/lib/realscout-config";
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
import { buildHomeStructuredDataGraph } from "@/lib/structured-data-home";
import { getHomeFaqItems } from "@/lib/faq-home";
import { homeMarketingCopy } from "@/lib/home-marketing-copy";
import { HOME_DESCRIPTION, HOME_TITLE } from "@/lib/seo-home";
import {
  BHHS_NEVADA_PUBLIC_URL,
  HUD_FAIR_HOUSING_URL,
  NAR_CODE_OF_ETHICS_URL,
  NEVADA_RED_PORTAL_URL,
} from "@/lib/public-resources";

const realscoutAgentId = getRealScoutAgentEncodedId();

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=2400&q=80";
const RESEARCH_IMAGE =
  "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1600&q=80";
const ABOUT_PORTRAIT =
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80";

const ReviewSite = () => {
  const [reviews] = useState([
    {
      id: 1,
      review:
        "Sun City versus Del Webb was confusing until Dr. Duffy walked us through HOA fee structures, club access, resale velocity, and which streets actually match quiet living. Having data plus neighborhood anecdotes made the difference.",
      authorName: "Sarah M.",
      date: "2024-03-15",
      stars: 5,
      location: "Sun City Summerlin",
    },
    {
      id: 2,
      review:
        "We compared Heritage at Stonebridge with resale inventory across Summerlin West. Dr. Jan Duffy pressure-tested seller concessions, HOA posture, and how Stonebridge connects to trails—finally a plan that matched our downsizing checklist.",
      authorName: "Michael R.",
      date: "2024-02-28",
      stars: 5,
      location: "Heritage at Stonebridge",
    },
    {
      id: 3,
      review:
        "Buying new construction near Sky Canyon felt risky until Jan mapped absorption in nearby villages, escrow timelines with the builder office, and what inspection items repeatedly appear in that product type.",
      authorName: "Jennifer L.",
      date: "2024-01-20",
      stars: 5,
      location: "Sky Canyon",
    },
    {
      id: 4,
      review:
        "As first-time buyers in North Las Vegas, we needed education on corridors that are revitalizing versus those still speculative. Transparent pros/cons and lender-ready talking points saved us weeks of wandering open houses.",
      authorName: "David K.",
      date: "2024-01-05",
      stars: 5,
      location: "North Las Vegas",
    },
    {
      id: 5,
      review:
        "Dr. Duffy dissected competing offers on an elevated Summerlin West listing—beyond price—including appraisal gap language, leaseback risk, and how quickly similar floorplans traded. Sellers accepted ours over two higher-but-sloppy bids.",
      authorName: "Lisa H.",
      date: "2023-12-18",
      stars: 5,
      location: "Summerlin West",
    },
    {
      id: 6,
      review:
        "Relocation from California meant deciphering Nevada transfer taxes, HOA documents, and how Del Webb resale differs from resale inside older Summerlin pockets. She's the strategist we needed—not a scripted tour.",
      authorName: "Robert T.",
      date: "2023-12-01",
      stars: 5,
      location: "Del Webb Summerlin",
    },
    {
      id: 7,
      review:
        "Investment underwriting for Sky Canyon / southwest pockets required realistic rent comps and HOA rental caps. The spreadsheets were helpful, but the honest 'pass' on two addresses is what earns her future referrals.",
      authorName: "Maria S.",
      date: "2023-11-15",
      stars: 5,
      location: "Sky Canyon",
    },
    {
      id: 8,
      review:
        "Selling in Lone Mountain while buying closer to Strip employment centers meant juggling timelines. Offers were structured cleanly, timelines respected, and we always knew why she recommended each clause tweak.",
      authorName: "James P.",
      date: "2023-10-28",
      stars: 5,
      location: "Lone Mountain",
    },
  ]);

  const [selectedFilter, setSelectedFilter] = useState("all");

  const scheduleTourUrl = buildCalendlyUrl(
    process.env.NEXT_PUBLIC_CALENDLY_TOUR_URL?.trim() ?? "",
    {
      utm_source: "www.drjanduffyreviews.com",
      utm_medium: "website",
      utm_campaign: "contact_section",
    },
  );

  const consultation15Url = buildCalendlyUrl(
    process.env.NEXT_PUBLIC_CALENDLY_CONSULTATION_URL?.trim() ?? "",
    {
      utm_source: "www.drjanduffyreviews.com",
      utm_medium: "website",
      utm_campaign: "cta_terracotta_band",
    },
  );
  const structuredDataGraph = useMemo(
    () =>
      buildHomeStructuredDataGraph({
        reviews,
        pageTitle: HOME_TITLE,
        pageDescription: HOME_DESCRIPTION,
      }),
    [reviews],
  );

  const faqItems = useMemo(() => getHomeFaqItems(), []);

  const StarRating = ({ rating }: { rating: number }) => {
    return (
      <div
        className="flex items-center gap-1"
        role="img"
        aria-label={`${rating} out of 5 stars`}
      >
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={20}
            aria-hidden
            className={`${
              star <= rating
                ? "fill-amber-400 text-amber-500"
                : "text-outline-variant"
            }`}
          />
        ))}
      </div>
    );
  };

  const averageRating =
    reviews.reduce((sum, review) => sum + review.stars, 0) / reviews.length;
  const totalReviews = reviews.length;

  const filteredReviews =
    selectedFilter === "all"
      ? reviews
      : reviews.filter((review) => review.stars === parseInt(selectedFilter, 10));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredDataGraph),
        }}
      />
      <div className="min-h-screen bg-surface text-on-surface">
        {/* Hero — luxury mockup alignment */}
        <section
          className="relative min-h-[78vh] md:min-h-[85vh] flex items-stretch"
          aria-label="Introduction"
        >
          <Image
            src={HERO_IMAGE}
            alt="Modern luxury home at dusk with warm interior lighting, Las Vegas area"
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
                  Sun City. Del Webb. Heritage at Stonebridge.
                </span>
                <span className="block mt-4 text-[clamp(1.125rem,2.75vw,1.625rem)] font-semibold leading-snug">
                  The Summerlin agent who knows every community — and which
                  one fits your life.
                </span>
              </h1>
              <p className="mt-5 text-on-surface-variant leading-relaxed text-[15px] md:text-base">
                {homeMarketingCopy.heroSupportingParagraph}
              </p>
              <div className="flex flex-wrap gap-3 mt-8">
                <a
                  href="#listings"
                  className="inline-flex items-center justify-center min-h-12 rounded-md bg-secondary text-on-secondary px-5 py-3 font-label text-[13px] font-semibold tracking-[0.05em] uppercase hover:bg-secondary-container transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  Explore listings
                </a>
                <a
                  href="#market-metrics"
                  className="inline-flex items-center justify-center min-h-12 rounded-md border-2 border-primary text-primary bg-transparent px-5 py-3 font-label text-[13px] font-semibold tracking-[0.05em] uppercase hover:bg-surface-container transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  View market framing
                </a>
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
              <p className="font-display text-lg text-on-surface mt-1">
                {BUSINESS_NAME}
              </p>
              <p className="text-sm text-on-surface-variant mt-0.5">
                {AGENT_DISPLAY_NAME}, {AGENT_TITLE} · Nev.{" "}
                {NEVADA_LICENSE}
              </p>
            </div>
            <div className="flex items-center gap-3 border border-outline/15 bg-surface px-4 py-2">
              <StarRating rating={Math.round(averageRating)} />
              <div>
                <span className="text-lg font-semibold tabular-nums">
                  {averageRating.toFixed(1)}
                </span>
                <span className="text-xs text-on-surface-variant ml-2">
                  {totalReviews} reviews
                </span>
              </div>
              <a
                href="#reviews"
                className="text-xs font-bold tracking-[0.08em] uppercase text-primary hover:underline ml-2"
              >
                Read
              </a>
            </div>
          </div>
        </div>

        <div
          id="property-search"
          className="flex justify-center py-10 px-4 scroll-mt-32 bg-surface"
        >
          <realscout-simple-search
            agent-encoded-id={realscoutAgentId}
          ></realscout-simple-search>
        </div>

        <section
          id="listings"
          aria-label="Office listings"
          className="max-w-content mx-auto px-4 md:px-8 pb-12 md:pb-section scroll-mt-32"
        >
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
            <h2 className="font-display text-2xl md:text-[32px] font-medium text-on-surface tracking-tight">
              {homeMarketingCopy.listingsHeading}
            </h2>
            <a
              href="#property-search"
              className="text-[11px] font-bold tracking-[0.12em] uppercase text-primary hover:underline shrink-0"
            >
              Widen your search
            </a>
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

        <section
          id="research-advantage"
          className="py-16 md:py-section bg-surface-low border-y border-outline/10 scroll-mt-32"
        >
          <div className="max-w-content mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <h2 className="font-display text-3xl md:text-[2.25rem] font-medium text-on-surface tracking-tight mb-8">
                Community-fit research, grounded in comps
              </h2>
              <ul className="space-y-8">
                <li>
                  <h3 className="font-display text-xl text-on-surface mb-2">
                    Comparative neighborhood dossiers
                  </h3>
                  <p className="text-on-surface-variant leading-relaxed text-[15px]">
                    Sun City versus Del Webb, Heritage at Stonebridge versus
                    resale-only pockets—paired with pacing, HOA posture, guest
                    policies, and what actually trades at your budget.
                  </p>
                </li>
                <li>
                  <h3 className="font-display text-xl text-on-surface mb-2">
                    Negotiations with scenario planning
                  </h3>
                  <p className="text-on-surface-variant leading-relaxed text-[15px]">
                    Offer structure, inspection leverage, appraisal gap
                    realities, leasebacks—modeled plainly so sellers and buyers see
                    risk before initials hit the contract.
                  </p>
                </li>
                <li>
                  <h3 className="font-display text-xl text-on-surface mb-2">
                    Diligence on HOAs &amp; new construction nuance
                  </h3>
                  <p className="text-on-surface-variant leading-relaxed text-[15px]">
                    Disclosure packets, resale certificates, clubhouse capital
                    schedules, builder deadlines—organized so diligence supports
                    the lifestyle narrative, not spreadsheets for their own sake.
                  </p>
                </li>
              </ul>
            </div>
            <div className="relative">
              <div className="relative aspect-[4/3] border border-outline/15 overflow-hidden bg-surface-container">
                <Image
                  src={RESEARCH_IMAGE}
                  alt="Market notes, tablet, and workspace suggesting research-driven analysis"
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

        <section
          id="market-metrics"
          className="py-16 md:py-section bg-surface scroll-mt-32"
        >
          <div className="max-w-content mx-auto px-4 md:px-8">
            <h2 className="font-display text-3xl md:text-[2.25rem] font-medium text-on-surface tracking-tight text-center mb-3">
              {homeMarketingCopy.marketMetricsHeading}
            </h2>
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
                Summerlin payoff comes from marrying HOA culture, clubhouse
                programming, ingress/egress timing, elevation, schools (where
                applicable), and resale velocity—not just list price averages. Book
                a consult to reconcile these inputs with inventory that matches{" "}
                <em>your</em> calendar and cash-flow comfort.
              </p>
            </div>
          </div>
        </section>

        <section id="about" className="py-16 md:py-section bg-surface border-b border-outline/10 scroll-mt-32">
          <div className="max-w-content mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-14">
              <div>
                <p className="text-[11px] font-bold tracking-[0.14em] uppercase text-secondary mb-3">
                  Meticulous representation
                </p>
                <h2 className="font-display text-3xl md:text-[2.75rem] font-medium text-on-surface tracking-tight leading-tight">
                  {AGENT_DISPLAY_NAME}
                </h2>
                <p className="font-display text-lg md:text-xl text-on-surface mt-3 tracking-tight">
                  Representation tuned to nuanced communities
                </p>
                <p className="text-on-surface-variant mt-5 leading-relaxed text-[15px] md:text-base">
                  Nevada {AGENT_TITLE}, license {NEVADA_LICENSE}, supervised by{" "}
                  {SUPERVISING_BROKERAGE}—guided counsel for HOA-led lifestyle
                  products such as Sun City and Del Webb, Heritage at Stonebridge
                  resale, investor-friendly corridors, and hybrid relocation
                  timelines across the Las Vegas Valley.
                </p>
                <div className="grid grid-cols-2 gap-6 mt-10 pt-8 border-t border-outline/15">
                  <div>
                    <p className="font-display text-xl text-on-surface mb-1">
                      Client-first advocacy
                    </p>
                    <p className="text-sm text-on-surface-variant leading-relaxed">
                      Transparent milestones, plain-language options, and
                      disciplined follow-through.
                    </p>
                  </div>
                  <div>
                    <p className="font-display text-xl text-on-surface mb-1">
                      Hyper-local depth
                    </p>
                    <p className="text-sm text-on-surface-variant leading-relaxed">
                      Micro-neighborhood context beyond generic market reports.
                    </p>
                  </div>
                </div>
                <a
                  href="#reviews"
                  className="inline-flex items-center gap-2 mt-8 text-xs font-bold tracking-[0.12em] uppercase text-primary hover:underline"
                >
                  Read client stories
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </a>
              </div>
              <div className="relative border border-outline/15 bg-surface-container aspect-[3/4] max-w-md mx-auto lg:max-w-none lg:mx-0 overflow-hidden">
                <Image
                  src={ABOUT_PORTRAIT}
                  alt="Professional real estate advisor portrait — stock placeholder; replace with photo of Dr. Jan Duffy"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
            </div>

            <div
              className="mb-10 max-w-3xl mx-auto border border-secondary/25 bg-insight-bg px-6 py-5"
              role="note"
            >
              <div className="flex gap-3 items-start">
                <BookOpen
                  className="h-6 w-6 shrink-0 text-on-secondary-container mt-0.5"
                  aria-hidden
                />
                <div>
                  <p className="text-xs font-bold tracking-[0.1em] uppercase text-on-secondary-container mb-2">
                    Research note
                  </p>
                  <p className="text-on-secondary-container leading-relaxed text-[15px]">
                    Pair these quotes with live MLS evidence from RealScout,
                    HOA packets, and Google Business Profile hours—especially when
                    weighing Sun City, Del Webb, or Stonebridge inventory against
                    resale-only Summerlin streets.
                  </p>
                </div>
              </div>
            </div>

            <h3 className="font-display text-xl font-medium text-on-surface mb-6 text-center">
              Office &amp; Google Business Profile
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
              <div className="lg:col-span-5">
                <p className="text-lg font-semibold text-on-surface">
                  {BUSINESS_NAME}
                </p>
                <p className="text-on-surface mt-2 leading-relaxed">
                  {PRIMARY_STREET}
                </p>
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
                        View reviews
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
                  title={`Google Map — ${BUSINESS_NAME}`}
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

        <section id="reviews" className="py-16 md:py-section bg-surface-low scroll-mt-28">
          <div className="max-w-content mx-auto px-4 md:px-8">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="font-display text-3xl md:text-[2.5rem] font-medium text-on-surface mb-4 tracking-tight">
                Client reviews &amp; community outcomes
              </h2>
              <p className="text-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
                What buyers and sellers report after working through Summerlin
                lifestyle comparisons, Valley relocations, and contract strategy
                with Dr. Jan Duffy
              </p>
              <p className="text-sm text-on-surface-variant/90 max-w-2xl mx-auto mt-4 leading-relaxed">
                Quotes below highlight recurring themes from client work. Your
                experience may vary—confirm fit on a call, check the{" "}
                <a
                  className="text-primary font-semibold underline-offset-4 hover:underline"
                  href="#trust-disclosures"
                >
                  verification &amp; listing-data disclosures
                </a>
                , and use Google reviews when enabled in About.
              </p>
            </div>

            <div
              id="neighborhoods"
              className="bg-research-grid border border-outline/10 p-8 md:p-10 mb-10 scroll-mt-28"
            >
              <h3 className="font-display text-2xl font-medium text-center text-on-surface mb-8 tracking-tight">
                Communities we compare &amp; sell
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                <div className="text-center border border-outline/15 bg-surface p-5">
                  <h4 className="text-sm font-bold tracking-[0.06em] uppercase text-on-surface mb-2">
                    Sun City Summerlin
                  </h4>
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    Active-adult lifestyle, robust clubs, deep resale history
                  </p>
                </div>
                <div className="text-center border border-outline/15 bg-surface p-5">
                  <h4 className="text-sm font-bold tracking-[0.06em] uppercase text-on-surface mb-2">
                    Del Webb Summerlin
                  </h4>
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    Single-story–leaning product with curated amenity packages
                  </p>
                </div>
                <div className="text-center border border-outline/15 bg-surface p-5">
                  <h4 className="text-sm font-bold tracking-[0.06em] uppercase text-on-surface mb-2">
                    Heritage at Stonebridge
                  </h4>
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    Age-qualified Summerlin village living near Stonebridge Park
                  </p>
                </div>
                <div className="text-center border border-outline/15 bg-surface p-5">
                  <h4 className="text-sm font-bold tracking-[0.06em] uppercase text-on-surface mb-2">
                    Summerlin West
                  </h4>
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    Classic master plan streets, schools, and mixed product types
                  </p>
                </div>
                <div className="text-center border border-outline/15 bg-surface p-5">
                  <h4 className="text-sm font-bold tracking-[0.06em] uppercase text-on-surface mb-2">
                    Lone Mountain
                  </h4>
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    Family-friendly pockets with mountain sightlines
                  </p>
                </div>
                <div className="text-center border border-outline/15 bg-surface p-5">
                  <h4 className="text-sm font-bold tracking-[0.06em] uppercase text-on-surface mb-2">
                    Sky Canyon &amp; North Las Vegas
                  </h4>
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    Newer construction momentum and value-forward corridors
                  </p>
                </div>
              </div>
            </div>

            <div className="border border-outline/15 bg-surface p-8 md:p-10 mb-10">
              <div className="flex items-center justify-center gap-8 mb-8">
                <div className="text-center">
                  <div className="font-display text-5xl font-normal text-on-surface mb-2 tabular-nums">
                    {averageRating.toFixed(1)}
                  </div>
                  <StarRating rating={Math.round(averageRating)} />
                  <p className="text-on-surface-variant mt-2 text-sm">
                    Based on {totalReviews} reviews
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {[5, 4, 3, 2, 1].map((rating) => {
                  const count = reviews.filter((r) => r.stars === rating).length;
                  const percentage = (count / totalReviews) * 100;

                  return (
                    <div key={rating} className="text-center">
                      <div className="flex items-center justify-center gap-1 mb-2">
                        <span className="text-sm font-semibold text-on-surface">
                          {rating}
                        </span>
                        <Star
                          size={16}
                          aria-hidden
                          className="fill-amber-400 text-amber-500"
                        />
                      </div>
                      <div className="bg-surface-container h-1 border border-outline/10 mb-1 overflow-hidden">
                        <div
                          className="bg-secondary h-full transition-all duration-300"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <p className="text-xs text-on-surface-variant">{count}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-10 justify-center">
              <button
                type="button"
                onClick={() => setSelectedFilter("all")}
                className={`px-4 py-2 rounded-md text-xs font-bold tracking-[0.08em] uppercase transition-colors border ${
                  selectedFilter === "all"
                    ? "bg-charcoal text-white border-charcoal"
                    : "bg-chip-bg text-on-surface border-outline/15 hover:bg-secondary-container"
                }`}
              >
                All reviews
              </button>
              {[5, 4, 3, 2, 1].map((rating) => (
                <button
                  type="button"
                  key={rating}
                  onClick={() => setSelectedFilter(rating.toString())}
                  className={`px-4 py-2 rounded-md text-xs font-bold tracking-[0.08em] uppercase transition-colors border ${
                    selectedFilter === rating.toString()
                      ? "bg-charcoal text-white border-charcoal"
                      : "bg-chip-bg text-on-surface border-outline/15 hover:bg-secondary-container"
                  }`}
                >
                  {rating} stars
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredReviews.map((review) => (
                <article
                  key={review.id}
                  className="bg-surface border border-outline/15 p-6 hover:border-primary/35 transition-colors"
                >
                  <div className="flex items-center justify-between mb-4">
                    <StarRating rating={review.stars} />
                    <span className="text-xs text-on-surface-variant">
                      {new Date(review.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <p className="text-on-surface mb-5 leading-relaxed text-[15px]">
                    &ldquo;{review.review}&rdquo;
                  </p>
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-9 h-9 bg-inverse-surface shrink-0 flex items-center justify-center">
                        <span className="text-inverse-on-surface font-semibold text-sm">
                          {review.authorName.charAt(0)}
                        </span>
                      </div>
                      <span className="font-semibold text-on-surface truncate">
                        {review.authorName}
                      </span>
                    </div>
                    <span className="text-[10px] font-bold tracking-[0.08em] uppercase shrink-0 bg-chip-bg text-on-surface px-2 py-1 border border-outline/10">
                      {review.location}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="faq"
          className="py-16 md:py-20 bg-surface-low border-y border-outline/10 scroll-mt-32"
          aria-labelledby="faq-heading"
        >
          <div className="max-w-content mx-auto px-4 md:px-8">
            <h2
              id="faq-heading"
              className="font-display text-3xl md:text-[2.25rem] font-bold text-on-surface tracking-tight text-center mb-3"
            >
              Common questions
            </h2>
            <p className="text-center text-on-surface-variant max-w-2xl mx-auto mb-12 leading-relaxed">
              Answers curated for GBP parity, HOA-led Summerlin lifestyles, MLS
              widgets, Nevada compliance, Google reviews etiquette,{" "}
              {BUSINESS_NAME} contact pathways, plus next steps tied to verified
              NAP ({PRIMARY_PHONE_DISPLAY}).
            </p>
            <dl className="max-w-3xl mx-auto space-y-8">
              {faqItems.map((item) => (
                <div
                  key={item.id}
                  className="border-l-4 border-primary bg-surface pl-5 pr-4 py-5 rounded-r-lg shadow-sm"
                >
                  <dt className="font-display text-lg font-bold text-on-surface">
                    {item.question}
                  </dt>
                  <dd className="mt-3 text-on-surface-variant leading-relaxed text-[15px] md:text-base">
                    {item.answer}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section
          id="contact"
          className="bg-primary text-on-primary py-16 md:py-20 scroll-mt-32"
        >
          <div className="max-w-content mx-auto px-4 md:px-8 text-center">
            <h2 className="font-display text-2xl md:text-[2.25rem] font-medium mb-4 tracking-tight text-balance">
              {homeMarketingCopy.contactHeading}
            </h2>
            <p className="text-on-primary/90 mb-10 max-w-2xl mx-auto leading-relaxed text-[15px] md:text-base">
              {homeMarketingCopy.contactBlurb}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {consultation15Url ? (
                <a
                  href={consultation15Url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex rounded-md bg-white text-primary px-6 py-3 text-[11px] font-bold tracking-[0.1em] uppercase hover:bg-inverse-on-surface/5 transition-colors"
                >
                  Request valuation briefing
                </a>
              ) : scheduleTourUrl ? (
                <a
                  href={scheduleTourUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex rounded-md bg-white text-primary px-6 py-3 text-[11px] font-bold tracking-[0.1em] uppercase hover:bg-inverse-on-surface/5 transition-colors"
                >
                  Schedule consultation
                </a>
              ) : null}
              {scheduleTourUrl && consultation15Url ? (
                <a
                  href={scheduleTourUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex rounded-md border-2 border-white text-white px-6 py-3 text-[11px] font-bold tracking-[0.1em] uppercase hover:bg-white/10 transition-colors"
                >
                  Schedule private tour
                </a>
              ) : null}
              {scheduleTourUrl && !consultation15Url ? (
                <a
                  href="#property-search"
                  className="inline-flex rounded-md border-2 border-white text-white px-6 py-3 text-[11px] font-bold tracking-[0.1em] uppercase hover:bg-white/10 transition-colors"
                >
                  Search listings
                </a>
              ) : null}
            </div>
            <p className="mt-8 text-sm text-on-primary/80">
              <a
                href={formatTelHref(PRIMARY_PHONE_DISPLAY)}
                className="font-semibold underline-offset-4 hover:underline"
              >
                Call {PRIMARY_PHONE_DISPLAY}
              </a>
              <span className="mx-2 opacity-50" aria-hidden>
                ·
              </span>
              <a
                href={buildMapsSearchUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold underline-offset-4 hover:underline"
              >
                Directions
              </a>
            </p>
          </div>
        </section>

        <section
          id="offices"
          className="bg-inverse-surface text-inverse-on-surface py-16 md:py-section scroll-mt-28"
        >
          <div className="max-w-content mx-auto px-4 md:px-8 text-center">
            <h2 className="font-display text-3xl font-medium mb-4 tracking-tight">
              Our offices
            </h2>
            <p className="text-lg text-inverse-on-surface/85 mb-10 max-w-2xl mx-auto leading-relaxed">
              {AGENT_DISPLAY_NAME} meets clients at BHHS Nevada Properties
              storefronts or virtually while they compare Sun City, Stonebridge,
              and wider Valley opportunities.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
              {OFFICE_LOCATIONS.map((office, idx) => (
                <div
                  key={idx}
                  className="flex flex-col border border-inverse-on-surface/15 bg-inverse-surface p-6"
                >
                  <div className="border border-inverse-on-surface/25 w-12 h-12 flex items-center justify-center mb-4">
                    <MapPin className="h-5 w-5 text-inverse-on-surface" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-inverse-on-surface">
                    {office.name}
                  </h3>
                  <p className="text-inverse-on-surface/80 mb-2 text-sm leading-relaxed">
                    {office.address}
                  </p>
                  <p className="text-inverse-on-surface/80 mb-4 text-sm">
                    <a
                      href={formatTelHref(office.phone)}
                      className="underline-offset-4 hover:underline font-semibold text-inverse-on-surface"
                    >
                      {office.phone}
                    </a>
                  </p>
                  <a
                    href={office.maps}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#ffb59e] mt-auto text-sm font-semibold underline-offset-4 hover:underline"
                  >
                    Get directions
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="trust-disclosures"
          className="bg-surface-container-low border-t border-outline/10 py-14 md:py-16 scroll-mt-28"
          aria-labelledby="trust-disclosures-heading"
        >
          <div className="max-w-content mx-auto px-4 md:px-8">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-clinical border border-primary/25 bg-surface">
                <ShieldCheck
                  className="h-6 w-6 text-primary"
                  aria-hidden
                />
              </div>
              <div>
                <h2
                  id="trust-disclosures-heading"
                  className="font-display text-2xl md:text-[1.75rem] font-bold text-on-surface tracking-tight"
                >
                  Verification, supervision &amp; data reliability
                </h2>
                <p className="text-on-surface-variant mt-1 text-[15px] leading-relaxed max-w-3xl">
                  Credibility comes from regulators, supervising brokerage
                  disclosures, and transparent sourcing—not hype. Use the links
                  below to confirm credentials and understand how listing data
                  is shown on this site.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              <div className="border border-outline/15 bg-surface p-6 rounded-r-lg">
                <h3 className="font-display text-lg font-semibold text-on-surface mb-2">
                  License &amp; brokerage (Nevada)
                </h3>
                <p className="text-sm text-on-surface-variant leading-relaxed mb-4">
                  {AGENT_DISPLAY_NAME} is licensed in Nevada ({NEVADA_LICENSE}) and
                  affiliated with {SUPERVISING_BROKERAGE}, named on this site as
                  the supervising brokerage for consumer transparency (including{" "}
                  <abbr title="Nevada Administrative Code">NAC</abbr>{" "}
                  645.610-style visibility).
                </p>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a
                      href={NEVADA_RED_PORTAL_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary font-semibold underline-offset-4 hover:underline"
                    >
                      Nevada Real Estate Division — verify a license
                    </a>
                  </li>
                  <li>
                    <a
                      href={BHHS_NEVADA_PUBLIC_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary font-semibold underline-offset-4 hover:underline"
                    >
                      Berkshire Hathaway HomeServices Nevada Properties
                    </a>
                  </li>
                </ul>
              </div>
              <div className="border border-outline/15 bg-surface p-6 rounded-r-lg">
                <h3 className="font-display text-lg font-semibold text-on-surface mb-2">
                  Fair housing &amp; professional standards
                </h3>
                <p className="text-sm text-on-surface-variant leading-relaxed mb-4">
                  Federal and Nevada fair housing laws apply to real estate
                  advertising and services. {AGENT_DISPLAY_NAME} follows those
                  requirements and the professional obligations that come with
                  the REALTOR® designation.
                </p>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a
                      href={HUD_FAIR_HOUSING_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary font-semibold underline-offset-4 hover:underline"
                    >
                      HUD — Fair Housing &amp; Equal Opportunity
                    </a>
                  </li>
                  <li>
                    <a
                      href={NAR_CODE_OF_ETHICS_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary font-semibold underline-offset-4 hover:underline"
                    >
                      NAR — Code of Ethics overview
                    </a>
                  </li>
                </ul>
              </div>
              <div className="md:col-span-2 border border-outline/15 bg-surface p-6 rounded-r-lg">
                <h3 className="font-display text-lg font-semibold text-on-surface mb-2">
                  MLS / RealScout listing data
                </h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  Search and office-listing modules are served by{" "}
                  <strong className="text-on-surface">RealScout</strong> using
                  MLS-sourced data provided through that platform. Information is
                  deemed reliable but not guaranteed accurate, complete, or
                  current. Listing status, price, taxes, school boundaries, and
                  other fields can change—confirm material facts with your agent,
                  the listing office, and official records before making
                  decisions.
                </p>
              </div>
            </div>
          </div>
        </section>

        <footer className="bg-surface-container text-on-surface py-14 border-t border-outline/15">
          <div className="max-w-content mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
              <div>
                <p className="font-display text-lg tracking-[0.14em] uppercase text-on-surface mb-3">
                  Dr. Jan Duffy
                </p>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  Summerlin-focused reviews, Sun City &amp; Heritage at
                  Stonebridge context, RealScout-backed search.{" "}
                  {SUPERVISING_BROKERAGE}.
                </p>
              </div>
              <div>
                <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-on-surface mb-4">
                  Services
                </p>
                <ul className="space-y-2 text-sm text-on-surface-variant">
                  <li>
                    <a className="hover:text-primary transition-colors" href="#market-metrics">
                      Market analysis
                    </a>
                  </li>
                  <li>
                    <a className="hover:text-primary transition-colors" href="#listings">
                      Exclusive listings
                    </a>
                  </li>
                  <li>
                    <a className="hover:text-primary transition-colors" href="#research-advantage">
                      Community research
                    </a>
                  </li>
                  <li>
                    <a className="hover:text-primary transition-colors" href="#faq">
                      FAQ
                    </a>
                  </li>
                  <li>
                    <a className="hover:text-primary transition-colors" href="#reviews">
                      Client reviews
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-on-surface mb-4">
                  Company
                </p>
                <ul className="space-y-2 text-sm text-on-surface-variant">
                  <li>
                    <a className="hover:text-primary transition-colors" href="#about">
                      About &amp; NAP
                    </a>
                  </li>
                  <li>
                    <a className="hover:text-primary transition-colors" href="#contact">
                      Contact
                    </a>
                  </li>
                  <li>
                    <a className="hover:text-primary transition-colors" href="#offices">
                      Offices
                    </a>
                  </li>
                  <li>
                    <a className="hover:text-primary transition-colors" href="#property-search">
                      MLS search
                    </a>
                  </li>
                  <li>
                    <a className="hover:text-primary transition-colors" href="#trust-disclosures">
                      Trust &amp; disclosures
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-on-surface mb-4">
                  Next step
                </p>
                <p className="text-sm text-on-surface-variant leading-relaxed mb-4">
                  Prefer email or phone? Use the NAP in{" "}
                  <a className="text-primary font-semibold underline-offset-4 hover:underline" href="#about">
                    About
                  </a>{" "}
                  — or book time with Calendly.
                </p>
                {consultation15Url ? (
                  <a
                    href={consultation15Url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex rounded-md border border-primary text-primary px-4 py-2 text-[11px] font-bold tracking-[0.1em] uppercase hover:bg-secondary-container/50 transition-colors"
                  >
                    Book 15 minutes
                  </a>
                ) : scheduleTourUrl ? (
                  <a
                    href={scheduleTourUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex rounded-md border border-primary text-primary px-4 py-2 text-[11px] font-bold tracking-[0.1em] uppercase hover:bg-secondary-container/50 transition-colors"
                  >
                    Book consultation
                  </a>
                ) : null}
              </div>
            </div>
            <div className="mt-12 pt-8 border-t border-outline/15 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-xs text-on-surface-variant">
              <p>
                © {new Date().getFullYear()} {AGENT_DISPLAY_NAME}.{" "}
                {BUSINESS_NAME} · Nev. license {NEVADA_LICENSE}. Equal housing
                opportunity.
              </p>
              <p className="text-on-surface-variant/80">{SUPERVISING_BROKERAGE}</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default ReviewSite;
