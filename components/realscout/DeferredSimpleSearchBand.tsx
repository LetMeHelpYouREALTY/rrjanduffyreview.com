"use client";

import Link from "next/link";
import { useRef } from "react";
import { useDeferRealScoutMount } from "@/hooks/useDeferRealScoutMount";
import { homeMarketingCopy } from "@/lib/home-marketing-copy";
import { getRealScoutAgentEncodedId } from "@/lib/realscout-config";
import { ROUTES } from "@/lib/site-routes";

const realscoutAgentId = getRealScoutAgentEncodedId();

const DEFAULT_SEARCH_IDLE_TIMEOUT_MS = 2000;

type DeferredSimpleSearchBandProps = {
  /** Listings hub: only mounts the web component (parent supplies layout / #property-search). */
  embedded?: boolean;
  /** Skip link to consolidated listings/search page when redundant. */
  hideListingsHubLink?: boolean;
  /** `requestIdleCallback` timeout cap (ms); keep below office band so search hydrates first. */
  idleTimeoutMs?: number;
  sectionId?: string;
  className?: string;
  /** Observe visibility before scheduling (off for embedded listings hero). */
  deferUntilNearViewport?: boolean;
};

export function DeferredSimpleSearchBand({
  embedded = false,
  hideListingsHubLink = false,
  idleTimeoutMs = DEFAULT_SEARCH_IDLE_TIMEOUT_MS,
  sectionId = "mls-search-embed",
  className = "",
  deferUntilNearViewport = true,
}: DeferredSimpleSearchBandProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const respectViewport = deferUntilNearViewport && !embedded;

  const ready = useDeferRealScoutMount({
    observeRef: rootRef,
    respectViewport,
    idleTimeoutMs,
    afterIdleDelayMs: 0,
    fallbackDelayMs: 1000,
    maxWaitBeforeMountMs: 14_000,
  });

  const widget = ready ? (
    <realscout-simple-search agent-encoded-id={realscoutAgentId} />
  ) : (
    <div
      className="flex min-h-[120px] w-full max-w-[500px] items-center justify-center border border-dashed border-outline/25 bg-surface-container-low px-4 text-center text-sm text-on-surface-variant mx-auto"
      aria-busy="true"
    >
      Loading MLS search…
    </div>
  );

  if (embedded) {
    return (
      <div ref={rootRef} className={className.trim()}>
        {widget}
      </div>
    );
  }

  return (
    <div
      ref={rootRef}
      role="region"
      id={sectionId}
      className={`border-y border-outline/10 bg-surface py-10 md:py-12 scroll-mt-32 ${className}`.trim()}
      aria-labelledby={`${sectionId}-heading`}
    >
      <div className="max-w-content mx-auto px-4 md:px-8">
        <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <h2
            id={`${sectionId}-heading`}
            className="font-display text-xl font-medium tracking-tight text-on-surface md:text-2xl"
          >
            {homeMarketingCopy.mlsSearchHeading}
          </h2>
          {!hideListingsHubLink ? (
            <Link
              href={`${ROUTES.listings}#property-search`}
              className="shrink-0 text-[11px] font-bold uppercase tracking-[0.12em] text-primary hover:underline"
            >
              Listings hub layout
            </Link>
          ) : null}
        </div>
        <p className="mb-6 max-w-2xl text-[15px] leading-relaxed text-on-surface-variant">
          {homeMarketingCopy.mlsSearchBlurb}
        </p>
        <div className="flex justify-center">{widget}</div>
      </div>
    </div>
  );
}
