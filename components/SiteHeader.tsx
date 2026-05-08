import Link from "next/link";
import { Search } from "lucide-react";

type SiteHeaderProps = {
  consultationHref: string;
};

export function SiteHeader({ consultationHref }: SiteHeaderProps) {
  const navClassName =
    "font-label text-[13px] font-semibold tracking-[0.06em] text-on-surface-variant hover:text-secondary transition-colors rounded-clinical px-1 py-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2";

  return (
    <header className="sticky top-0 z-50 border-b border-outline-variant/70 bg-surface/95 backdrop-blur-sm">
      <div className="max-w-content mx-auto px-5 md:px-10 flex flex-wrap items-center justify-between gap-y-3 py-3 md:py-4">
        <Link
          href="/"
          className="font-display text-base md:text-lg font-bold tracking-tight text-on-surface shrink-0 order-1"
        >
          Dr. Jan Duffy
        </Link>

        <nav
          className="order-3 lg:order-2 flex flex-wrap justify-center gap-x-4 gap-y-2 md:gap-x-7 w-full lg:w-auto lg:justify-center"
          aria-label="Primary"
        >
          <a className={navClassName} href="#market-metrics">
            Market analysis
          </a>
          <a className={navClassName} href="#listings">
            Exclusive listings
          </a>
          <a className={navClassName} href="#research-advantage">
            The analytical edge
          </a>
          <a className={navClassName} href="#faq">
            FAQ
          </a>
          <a className={navClassName} href="#contact">
            Contact
          </a>
        </nav>

        <div className="flex items-center gap-2 md:gap-3 shrink-0 order-2 lg:order-3 ml-auto lg:ml-0">
          <a
            href="#property-search"
            className="p-2.5 text-on-surface-variant hover:text-secondary transition-colors rounded-clinical focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
            aria-label="Jump to property search"
          >
            <Search className="w-5 h-5" strokeWidth={2} aria-hidden />
          </a>
          {consultationHref ? (
            <a
              href={consultationHref}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center justify-center min-h-12 rounded-clinical bg-secondary text-on-secondary px-5 py-3 font-label text-[13px] font-semibold tracking-[0.05em] hover:bg-secondary-container transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Book consultation
            </a>
          ) : null}
        </div>
      </div>
    </header>
  );
}
