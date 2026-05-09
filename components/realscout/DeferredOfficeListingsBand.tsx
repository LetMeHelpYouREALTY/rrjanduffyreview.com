"use client";

import Link from "next/link";
import { useRef } from "react";
import { useDeferRealScoutMount } from "@/hooks/useDeferRealScoutMount";
import { homeMarketingCopy } from "@/lib/home-marketing-copy";
import { getRealScoutAgentEncodedId } from "@/lib/realscout-config";
import { ROUTES } from "@/lib/site-routes";

const realscoutAgentId = getRealScoutAgentEncodedId();

/** Later idle deadline than MLS search + post-idle pause so widgets rarely hydrate in the same frame. */
const DEFAULT_OFFICE_IDLE_TIMEOUT_MS = 2800;
const DEFAULT_OFFICE_AFTER_IDLE_DELAY_MS = 480;

type DeferredOfficeListingsBandProps = {
  /** When true, skips outer section/header and renders only deferred widget styling (used on `/listings` hub). */
  embedded?: boolean;
  /** Omit “Full listings hub” link (e.g. on listings page). */
  hideListingsHubLink?: boolean;
  /** `requestIdleCallback` timeout cap (ms); higher than search band so search mounts first. */
  idleTimeoutMs?: number;
  /** Extra delay (ms) after an idle slice before mounting the web component. */
  afterIdleDelayMs?: number;
  sectionId?: string;
  className?: string;
  /** Observe visibility before scheduling (recommended; listing hub keeps true for embedded office). */
  deferUntilNearViewport?: boolean;
};

export function DeferredOfficeListingsBand({
  embedded = false,
  hideListingsHubLink = false,
  idleTimeoutMs = DEFAULT_OFFICE_IDLE_TIMEOUT_MS,
  afterIdleDelayMs = DEFAULT_OFFICE_AFTER_IDLE_DELAY_MS,
  sectionId = "office-listings-embed",
  className = "",
  deferUntilNearViewport = true,
}: DeferredOfficeListingsBandProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  const ready = useDeferRealScoutMount({
    observeRef: rootRef,
    respectViewport: deferUntilNearViewport,
    idleTimeoutMs,
    afterIdleDelayMs,
    fallbackDelayMs: 1200,
    maxWaitBeforeMountMs: 14_000,
  });

  const widget = ready ? (
    <realscout-office-listings
      agent-encoded-id={realscoutAgentId}
      sort-order="NEWEST"
      listing-status="For Sale,For Rent,Sold"
      property-types=""
    />
  ) : (
    <div
      className="flex min-h-[280px] items-center justify-center border border-dashed border-outline/25 bg-surface-container-low px-4 text-center text-sm text-on-surface-variant"
      aria-busy="true"
    >
      Loading office listings…
    </div>
  );

  if (embedded) {
    return (
      <div
        ref={rootRef}
        className={`widget-wrapper border border-outline/15 bg-surface-container-low p-2 md:p-4 ${className}`.trim()}
      >
        {widget}
      </div>
    );
  }

  return (
    <div
      ref={rootRef}
      role="region"
      id={sectionId}
      className={`border-y border-outline/10 bg-surface-container-low py-12 md:py-14 scroll-mt-32 ${className}`.trim()}
      aria-labelledby={`${sectionId}-heading`}
    >
      <div className="max-w-content mx-auto px-4 md:px-8">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <h2
            id={`${sectionId}-heading`}
            className="font-display text-2xl font-medium tracking-tight text-on-surface md:text-[28px]"
          >
            Featured office listings
          </h2>
          {!hideListingsHubLink ? (
            <Link
              href={ROUTES.listings}
              className="shrink-0 text-[11px] font-bold uppercase tracking-[0.12em] text-primary hover:underline"
            >
              Full listings hub
            </Link>
          ) : null}
        </div>
        <p className="mb-6 max-w-2xl leading-relaxed text-on-surface-variant">
          {homeMarketingCopy.listingsBlurb}
        </p>
        <div className="widget-wrapper border border-outline/15 bg-surface p-2 md:p-4">
          {widget}
        </div>
      </div>
    </div>
  );
}
