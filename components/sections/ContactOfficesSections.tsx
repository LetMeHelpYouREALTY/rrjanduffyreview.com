"use client";

import Link from "next/link";
import { MapPin } from "lucide-react";
import { OFFICE_LOCATIONS } from "@/lib/office-locations";
import { buildCalendlyUrl } from "@/lib/calendly";
import {
  AGENT_DISPLAY_NAME,
  formatTelHref,
  PRIMARY_PHONE_DISPLAY,
} from "@/lib/site-contact";
import { buildMapsSearchUrl } from "@/lib/reviews";
import { homeMarketingCopy } from "@/lib/home-marketing-copy";
import { ROUTES } from "@/lib/site-routes";

export function ContactScheduleSection() {
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

  return (
    <section
      id="contact"
      className="bg-primary text-on-primary py-16 md:py-20 scroll-mt-32"
    >
      <div className="max-w-content mx-auto px-4 md:px-8 text-center">
        <h1 className="font-display text-2xl md:text-[2.25rem] font-medium mb-4 tracking-tight text-balance">
          {homeMarketingCopy.contactHeading}
        </h1>
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
            <Link
              href={ROUTES.listings}
              className="inline-flex rounded-md border-2 border-white text-white px-6 py-3 text-[11px] font-bold tracking-[0.1em] uppercase hover:bg-white/10 transition-colors"
            >
              Search listings
            </Link>
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
  );
}

export function OfficesBandSection() {
  return (
    <section
      id="offices"
      className="bg-inverse-surface text-inverse-on-surface py-16 md:py-section scroll-mt-28"
    >
      <div className="max-w-content mx-auto px-4 md:px-8 text-center">
        <h2 className="font-display text-3xl font-medium mb-4 tracking-tight">Our offices</h2>
        <p className="text-lg text-inverse-on-surface/85 mb-10 max-w-2xl mx-auto leading-relaxed">
          {AGENT_DISPLAY_NAME} meets clients at BHHS Nevada Properties storefronts or virtually while
          they compare Sun City, Stonebridge, and wider Valley opportunities.
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
              <h3 className="text-lg font-semibold mb-2 text-inverse-on-surface">{office.name}</h3>
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
  );
}
