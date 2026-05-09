import {
  BUSINESS_NAME,
  PRIMARY_PHONE_DISPLAY,
} from "@/lib/site-contact";
import { DeferredOfficeListingsBand } from "@/components/realscout/DeferredOfficeListingsBand";
import { DeferredSimpleSearchBand } from "@/components/realscout/DeferredSimpleSearchBand";
import { getHomeFaqItems } from "@/lib/faq-home";

export default function FaqMainSection({
  headingLevel = "h2",
}: {
  headingLevel?: "h1" | "h2";
}) {
  const faqItems = getHomeFaqItems();
  const titleCls =
    "font-display text-3xl md:text-[2.25rem] font-bold text-on-surface tracking-tight text-center mb-3";

  return (
    <section
      id="faq"
      className="py-16 md:py-20 bg-surface-low border-y border-outline/10 scroll-mt-32"
      aria-labelledby="faq-heading"
    >
      <div className="max-w-content mx-auto px-4 md:px-8">
        {headingLevel === "h1" ? (
          <h1 id="faq-heading" className={titleCls}>
            Common questions
          </h1>
        ) : (
          <h2 id="faq-heading" className={titleCls}>
            Common questions
          </h2>
        )}
        <p className="text-center text-on-surface-variant max-w-2xl mx-auto mb-12 leading-relaxed">
          Answers curated for GBP parity, HOA-led Summerlin lifestyles, MLS widgets, Nevada
          compliance, Google reviews etiquette, {BUSINESS_NAME} contact pathways, plus next steps
          tied to verified NAP ({PRIMARY_PHONE_DISPLAY}).
        </p>
      </div>
      <DeferredSimpleSearchBand />
      <DeferredOfficeListingsBand />
      <div className="max-w-content mx-auto px-4 md:px-8 mt-12">
        <dl className="max-w-3xl mx-auto space-y-8">
          {faqItems.map((item) => (
            <div
              key={item.id}
              className="border-l-4 border-primary bg-surface pl-5 pr-4 py-5 rounded-r-lg shadow-sm"
            >
              <dt className="font-display text-lg font-bold text-on-surface">{item.question}</dt>
              <dd className="mt-3 text-on-surface-variant leading-relaxed text-[15px] md:text-base">
                {item.answer}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
