import { z } from "zod";

/**
 * Machine output from `scripts/parallel-content-draft.ts` after Zod validation.
 * Merge into the repo with `npm run content:apply-draft -- --write` (SEO + marketing);
 * paste `faqItems` into `faq-home.ts` manually so NAP templates stay env-accurate.
 */
export const ParallelContentDraftSchema = z.object({
  notesForEditor: z
    .string()
    .max(2500)
    .describe("Sourcing caveats, claims to verify, or MLS disclaimer reminders"),

  seoHome: z.object({
    title: z.string().min(25).max(72),
    description: z.string().min(140).max(320),
  }),

  homepage: z.object({
    heroEyebrow: z.string().max(90),
    heroSupportingParagraph: z.string().max(750),
    listingsHeading: z.string().max(120),
    listingsBlurb: z.string().max(550),
    /** Paragraph under charts; disclaimers suffix stays hard-coded in JSX. */
    marketMetricsBlurb: z.string().max(450),
    /** Optional <h2> for metrics section — apply script falls back if omitted */
    marketMetricsHeading: z.string().max(110).optional(),
    mlsSearchHeading: z.string().max(120).optional(),
    mlsSearchBlurb: z.string().max(350).optional(),
    contactHeading: z.string().max(120),
    contactBlurb: z.string().max(450),
  }),

  /** Suggested full replacement list for `getHomeFaqItems()` order and ids. */
  faqItems: z
    .array(
      z.object({
        id: z.string().min(3).max(64),
        question: z.string().max(220),
        answer: z.string().max(1400),
      }),
    )
    .min(9)
    .max(11),
});

export type ParallelContentDraft = z.infer<typeof ParallelContentDraftSchema>;
