import Link from "next/link";
import type { ReactNode } from "react";
import type { FaqItem } from "@/lib/faq-home";
import {
  BUSINESS_NAME,
  formatTelHref,
  OFFICE_HOURS_LINES,
  PRIMARY_ADDRESS_SINGLE_LINE,
  PRIMARY_PHONE_DISPLAY,
} from "@/lib/site-contact";
import { geoPageLicenseLine } from "@/lib/structured-data-page";
import { ROUTES } from "@/lib/site-routes";

type GeoPageShellProps = {
  eyebrow: string;
  h1: string;
  intro: string;
  children: ReactNode;
  faqItems?: FaqItem[];
  relatedLinks?: { href: string; label: string }[];
};

export function GeoPageShell({
  eyebrow,
  h1,
  intro,
  children,
  faqItems,
  relatedLinks,
}: GeoPageShellProps) {
  return (
    <div className="min-h-screen bg-surface text-on-surface">
      <section className="py-14 md:py-20 border-b border-outline/10 bg-surface-container-low">
        <div className="max-w-content mx-auto px-4 md:px-8">
          <p className="font-label text-[11px] font-bold tracking-[0.14em] uppercase text-secondary mb-3">
            {eyebrow}
          </p>
          <h1 className="font-display text-3xl md:text-[2.5rem] font-medium tracking-tight text-balance max-w-3xl">
            {h1}
          </h1>
          <p className="mt-5 text-on-surface-variant leading-relaxed text-[15px] md:text-base max-w-3xl">
            {intro}
          </p>
          <p className="mt-4 text-sm text-on-surface-variant">{geoPageLicenseLine()}</p>
        </div>
      </section>

      <section className="py-14 md:py-16">
        <div className="max-w-content mx-auto px-4 md:px-8">{children}</div>
      </section>

      {faqItems && faqItems.length > 0 ? (
        <section
          className="py-14 md:py-16 bg-surface-low border-y border-outline/10"
          aria-labelledby="geo-faq-heading"
        >
          <div className="max-w-content mx-auto px-4 md:px-8 max-w-3xl">
            <h2
              id="geo-faq-heading"
              className="font-display text-2xl md:text-3xl font-medium tracking-tight mb-8"
            >
              Common questions
            </h2>
            <dl className="space-y-8">
              {faqItems.map((item) => (
                <div key={item.id}>
                  <dt className="font-display text-lg text-on-surface mb-2">
                    {item.question}
                  </dt>
                  <dd className="text-on-surface-variant leading-relaxed text-[15px]">
                    {item.answer}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      ) : null}

      {relatedLinks && relatedLinks.length > 0 ? (
        <section className="py-12 border-t border-outline/10">
          <div className="max-w-content mx-auto px-4 md:px-8">
            <h2 className="font-label text-[11px] font-bold tracking-[0.12em] uppercase text-on-surface-variant mb-4">
              Related pages
            </h2>
            <ul className="flex flex-wrap gap-3">
              {relatedLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex rounded-md border border-outline/20 px-4 py-2 text-sm text-primary hover:border-primary/40 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <section className="py-12 bg-primary text-on-primary">
        <div className="max-w-content mx-auto px-4 md:px-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <p className="font-display text-xl font-medium">{BUSINESS_NAME}</p>
            <p className="text-sm text-on-primary/90 mt-1">{PRIMARY_ADDRESS_SINGLE_LINE}</p>
            <p className="text-sm text-on-primary/90">{OFFICE_HOURS_LINES[0]}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href={formatTelHref(PRIMARY_PHONE_DISPLAY)}
              className="inline-flex min-h-12 items-center rounded-md bg-secondary text-on-secondary px-5 font-label text-[13px] font-semibold tracking-[0.05em] uppercase"
            >
              Call {PRIMARY_PHONE_DISPLAY}
            </a>
            <Link
              href={ROUTES.contact}
              className="inline-flex min-h-12 items-center rounded-md border-2 border-on-primary px-5 font-label text-[13px] font-semibold tracking-[0.05em] uppercase"
            >
              Contact
            </Link>
            <Link
              href={ROUTES.listings}
              className="inline-flex min-h-12 items-center rounded-md border-2 border-on-primary/60 px-5 font-label text-[13px] font-semibold tracking-[0.05em] uppercase"
            >
              MLS search
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export function HighlightGrid({
  items,
}: {
  items: { title: string; body: string }[];
}) {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {items.map((item) => (
        <li
          key={item.title}
          className="border border-outline/15 bg-surface-container-low p-6 rounded-clinical-lg"
        >
          <h2 className="font-display text-xl text-on-surface mb-3">{item.title}</h2>
          <p className="text-on-surface-variant leading-relaxed text-[15px]">{item.body}</p>
        </li>
      ))}
    </ul>
  );
}
