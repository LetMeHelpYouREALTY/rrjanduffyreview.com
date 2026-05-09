import { ShieldCheck } from "lucide-react";
import {
  AGENT_DISPLAY_NAME,
  NEVADA_LICENSE,
  SUPERVISING_BROKERAGE,
} from "@/lib/site-contact";
import {
  BHHS_NEVADA_PUBLIC_URL,
  HUD_FAIR_HOUSING_URL,
  NAR_CODE_OF_ETHICS_URL,
  NEVADA_RED_PORTAL_URL,
} from "@/lib/public-resources";

export default function TrustDisclosuresSection({
  headingLevel = "h2",
}: {
  headingLevel?: "h1" | "h2";
}) {
  const hdrCls =
    "font-display text-2xl md:text-[1.75rem] font-bold text-on-surface tracking-tight";

  return (
    <section
      id="trust-disclosures"
      className="bg-surface-container-low border-t border-outline/10 py-14 md:py-16 scroll-mt-28"
      aria-labelledby="trust-disclosures-heading"
    >
      <div className="max-w-content mx-auto px-4 md:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-clinical border border-primary/25 bg-surface">
            <ShieldCheck className="h-6 w-6 text-primary" aria-hidden />
          </div>
          <div>
            {headingLevel === "h1" ? (
              <h1 id="trust-disclosures-heading" className={hdrCls}>
                Verification, supervision &amp; data reliability
              </h1>
            ) : (
              <h2 id="trust-disclosures-heading" className={hdrCls}>
                Verification, supervision &amp; data reliability
              </h2>
            )}
            <p className="text-on-surface-variant mt-1 text-[15px] leading-relaxed max-w-3xl">
              Credibility comes from regulators, supervising brokerage disclosures, and transparent
              sourcing—not hype. Use the links below to confirm credentials and understand how
              listing data is shown on this site.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          <div className="border border-outline/15 bg-surface p-6 rounded-r-lg">
            <h3 className="font-display text-lg font-semibold text-on-surface mb-2">
              License &amp; brokerage (Nevada)
            </h3>
            <p className="text-sm text-on-surface-variant leading-relaxed mb-4">
              {AGENT_DISPLAY_NAME} is licensed in Nevada ({NEVADA_LICENSE}) and affiliated with{" "}
              {SUPERVISING_BROKERAGE}, named on this site as the supervising brokerage for consumer
              transparency (including{" "}
              <abbr title="Nevada Administrative Code">NAC</abbr> 645.610-style visibility).
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
              Federal and Nevada fair housing laws apply to real estate advertising and services.{" "}
              {AGENT_DISPLAY_NAME} follows those requirements and the professional obligations that
              come with the REALTOR® designation.
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
              <strong className="text-on-surface">RealScout</strong> using MLS-sourced data provided
              through that platform. Information is deemed reliable but not guaranteed accurate,
              complete, or current. Listing status, price, taxes, school boundaries, and other
              fields can change—confirm material facts with your agent, the listing office, and
              official records before making decisions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
