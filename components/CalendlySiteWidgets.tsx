"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef, useState } from "react";
import { buildCalendlyUrl } from "@/lib/calendly";

declare global {
  interface Window {
    Calendly?: {
      initBadgeWidget: (opts: {
        url: string;
        text: string;
        color: string;
        textColor: string;
        branding: boolean;
      }) => void;
      initInlineWidget: (opts: {
        url: string;
        parentElement: HTMLElement;
      }) => void;
    };
  }
}

let badgeInitialized = false;

/**
 * One Calendly script (`id="calendly-widget-js"`) and three surfaces (portfolio pattern):
 * floating badge, inline embed (tour), inline embed (consultation — falls back to tour URL + UTM if unset).
 */
export function CalendlySiteWidgets() {
  const [scriptReady, setScriptReady] = useState(false);
  const tourInlineRef = useRef<HTMLDivElement>(null);
  const consultInlineRef = useRef<HTMLDivElement>(null);

  const rawTour = process.env.NEXT_PUBLIC_CALENDLY_TOUR_URL?.trim() ?? "";
  const rawConsult =
    process.env.NEXT_PUBLIC_CALENDLY_CONSULTATION_URL?.trim() ?? "";

  const tourUrl = buildCalendlyUrl(rawTour, {
    utm_source: "rrjanduffyreview.com",
    utm_medium: "website",
    utm_campaign: "inline_tour",
  });

  const consultUrl = buildCalendlyUrl(rawConsult || rawTour, {
    utm_source: "rrjanduffyreview.com",
    utm_medium: "website",
    utm_campaign: "inline_consultation",
  });

  const onScriptLoad = useCallback(() => {
    setScriptReady(true);
  }, []);

  useEffect(() => {
    if (!scriptReady || !window.Calendly) return;

    const tourEl = tourInlineRef.current;
    const consultEl = consultInlineRef.current;

    if (tourUrl && !badgeInitialized) {
      window.Calendly.initBadgeWidget({
        url: tourUrl,
        text: "Schedule a call",
        color: "#1d4ed8",
        textColor: "#ffffff",
        branding: false,
      });
      badgeInitialized = true;
    }

    const mountInline = (el: HTMLElement | null, url: string) => {
      if (!el || !url) return;
      el.innerHTML = "";
      window.Calendly?.initInlineWidget({ url, parentElement: el });
    };

    mountInline(tourEl, tourUrl);
    mountInline(consultEl, consultUrl);

    return () => {
      tourEl?.replaceChildren();
      consultEl?.replaceChildren();
    };
  }, [scriptReady, tourUrl, consultUrl]);

  if (!rawTour) {
    return null;
  }

  return (
    <>
      <Script
        id="calendly-widget-js"
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="afterInteractive"
        onLoad={onScriptLoad}
      />
      <section
        aria-label="Scheduling"
        className="border-t bg-slate-50 py-10 px-4"
      >
        <div className="max-w-6xl mx-auto space-y-10">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              1 · Floating schedule button
            </h2>
            <p className="text-sm text-gray-600 mb-2">
              A Calendly badge stays available while you scroll (loads once per
              page via <code className="text-xs">calendly-widget-js</code>).
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              2 · Private tour — inline calendar
            </h2>
            <p className="text-sm text-gray-600 mb-3">
              Primary scheduling embed ({" "}
              <code className="text-xs">NEXT_PUBLIC_CALENDLY_TOUR_URL</code>).
            </p>
            <div
              ref={tourInlineRef}
              className="calendly-inline-widget min-w-[320px] min-h-[630px] w-full rounded-lg overflow-hidden bg-white border border-gray-200"
            />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              3 · Conversation — inline calendar
            </h2>
            <p className="text-sm text-gray-600 mb-3">
              {rawConsult ? (
                <>
                  Second event type from{" "}
                  <code className="text-xs">
                    NEXT_PUBLIC_CALENDLY_CONSULTATION_URL
                  </code>
                  .
                </>
              ) : (
                <>
                  Set{" "}
                  <code className="text-xs">
                    NEXT_PUBLIC_CALENDLY_CONSULTATION_URL
                  </code>{" "}
                  for a 15-minute event; until then this embed reuses the tour
                  link with separate UTM attribution.
                </>
              )}
            </p>
            <div
              ref={consultInlineRef}
              className="calendly-inline-widget min-w-[320px] min-h-[630px] w-full rounded-lg overflow-hidden bg-white border border-gray-200"
            />
          </div>
        </div>
      </section>
    </>
  );
}
