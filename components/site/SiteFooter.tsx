"use client";

import Link from "next/link";
import { buildCalendlyUrl } from "@/lib/calendly";
import {
  AGENT_DISPLAY_NAME,
  BUSINESS_NAME,
  NEVADA_LICENSE,
  SUPERVISING_BROKERAGE,
} from "@/lib/site-contact";
import { ROUTES } from "@/lib/site-routes";

export function SiteFooter() {
  const consultation15Url = buildCalendlyUrl(
    process.env.NEXT_PUBLIC_CALENDLY_CONSULTATION_URL?.trim() ?? "",
    {
      utm_source: "www.drjanduffyreviews.com",
      utm_medium: "website",
      utm_campaign: "site_footer",
    },
  );

  const scheduleTourUrl = buildCalendlyUrl(
    process.env.NEXT_PUBLIC_CALENDLY_TOUR_URL?.trim() ?? "",
    {
      utm_source: "www.drjanduffyreviews.com",
      utm_medium: "website",
      utm_campaign: "site_footer",
    },
  );

  return (
    <footer className="bg-surface-container text-on-surface py-14 border-t border-outline/15">
      <div className="max-w-content mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          <div>
            <p className="font-display text-lg tracking-[0.14em] uppercase text-on-surface mb-3">
              Dr. Jan Duffy
            </p>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Summerlin-focused reviews, Sun City &amp; Heritage at Stonebridge context,
              RealScout-backed search. {SUPERVISING_BROKERAGE}.
            </p>
          </div>
          <div>
            <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-on-surface mb-4">
              Services
            </p>
            <ul className="space-y-2 text-sm text-on-surface-variant">
              <li>
                <Link className="hover:text-primary transition-colors" href={ROUTES.communities}>
                  Community guides
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary transition-colors" href={ROUTES.buyers}>
                  Buyers
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary transition-colors" href={ROUTES.sellers}>
                  Sellers
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary transition-colors" href={ROUTES.activeAdult}>
                  55+ communities
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary transition-colors" href={ROUTES.market}>
                  Market analysis
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary transition-colors" href={ROUTES.listings}>
                  Exclusive listings
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary transition-colors" href={ROUTES.insights}>
                  Community research
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary transition-colors" href={ROUTES.faq}>
                  FAQ
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary transition-colors" href={ROUTES.reviews}>
                  Client reviews
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-on-surface mb-4">
              Company
            </p>
            <ul className="space-y-2 text-sm text-on-surface-variant">
              <li>
                <Link className="hover:text-primary transition-colors" href={ROUTES.about}>
                  About &amp; NAP
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary transition-colors" href={ROUTES.contact}>
                  Contact
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary transition-colors" href={ROUTES.contact}>
                  Offices
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary transition-colors" href={ROUTES.listings}>
                  MLS search
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary transition-colors" href={ROUTES.trust}>
                  Trust &amp; disclosures
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-on-surface mb-4">
              Next step
            </p>
            <p className="text-sm text-on-surface-variant leading-relaxed mb-4">
              Prefer email or phone? Use verified NAP on the{" "}
              <Link className="text-primary font-semibold underline-offset-4 hover:underline" href={ROUTES.about}>
                About page
              </Link>{" "}
              — or book Calendly.
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
            © {new Date().getFullYear()} {AGENT_DISPLAY_NAME}. {BUSINESS_NAME} · Nev. license{" "}
            {NEVADA_LICENSE}. Equal housing opportunity.
          </p>
          <p className="text-on-surface-variant/80">{SUPERVISING_BROKERAGE}</p>
        </div>
      </div>
    </footer>
  );
}
