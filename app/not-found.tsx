import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  description:
    "That URL isn’t live. Jump back to Dr. Jan Duffy’s Summerlin-focused client reviews—including Sun City, Del Webb villages, Heritage at Stonebridge—plus MLS search, office NAP, and Calendly.",
};

export default function NotFound() {
  return (
    <div
      className="min-h-[50vh] max-w-content mx-auto px-4 md:px-8 py-16 md:py-24 text-center"
      role="status"
      aria-live="polite"
    >
      <p className="font-label text-sm font-semibold uppercase tracking-[0.08em] text-secondary mb-3">
        Error 404
      </p>
      <h1 className="font-display text-3xl md:text-4xl font-bold text-on-surface mb-4">
        Page not found
      </h1>
      <p className="text-on-surface-variant max-w-md mx-auto leading-relaxed mb-8">
        The requested URL isn&apos;t active. Continue from home for Summerlin
        community comparisons, MLS search backed by RealScout, verified office
        NAP, or contact options.
      </p>
      <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="inline-flex min-h-12 items-center justify-center rounded-md bg-secondary px-6 py-3 text-sm font-semibold text-on-secondary hover:bg-secondary-container transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          Home
        </Link>
        <Link
          href="/#property-search"
          className="inline-flex min-h-12 items-center justify-center rounded-md border-2 border-primary px-6 py-3 text-sm font-semibold text-primary hover:bg-surface-container transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          MLS search
        </Link>
        <Link
          href="/#contact"
          className="inline-flex min-h-12 items-center justify-center rounded-md border border-outline/30 px-6 py-3 text-sm font-semibold text-on-surface hover:bg-surface-container transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          Contact
        </Link>
      </div>
    </div>
  );
}
