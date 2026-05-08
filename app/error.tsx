"use client";

import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div
      className="min-h-[50vh] max-w-content mx-auto px-4 md:px-8 py-16 md:py-24 text-center"
      role="alert"
      aria-live="assertive"
    >
      <h1 className="font-display text-3xl md:text-4xl font-bold text-on-surface mb-4">
        Something went wrong
      </h1>
      <p className="text-on-surface-variant max-w-md mx-auto leading-relaxed mb-2">
        An unexpected error occurred. You can try again, or return home.
      </p>
      {error.digest ? (
        <p className="mb-8 font-mono text-xs text-outline" suppressHydrationWarning>
          Reference: {error.digest}
        </p>
      ) : (
        <div className="mb-8" />
      )}
      <div className="flex flex-col sm:flex-row justify-center gap-3">
        <button
          type="button"
          onClick={() => reset()}
          className="inline-flex min-h-12 items-center justify-center rounded-md bg-secondary px-6 py-3 text-sm font-semibold text-on-secondary hover:bg-secondary-container transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          Try again
        </button>
        <Link
          href="/"
          className="inline-flex min-h-12 items-center justify-center rounded-md border-2 border-primary px-6 py-3 text-sm font-semibold text-primary hover:bg-surface-container transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          Home
        </Link>
      </div>
    </div>
  );
}
