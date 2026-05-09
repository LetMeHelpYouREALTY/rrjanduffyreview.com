/**
 * Applies validated `content/parallel-draft.json` into source files (seo + homepage copy).
 *
 * FAQs use env-driven interpolators in `lib/faq-home.ts` — merge `draft.faqItems`
 * manually (or refactor FAQ module) after legal/NAP review.
 *
 * Dry run (default): print summary only.
 * Write: npm run content:apply-draft -- --write
 * Custom draft path: npm run content:apply-draft -- --draft ../other.json --write
 */

import { config as loadEnv } from "dotenv";
import { readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { ParallelContentDraftSchema } from "@/lib/content-draft-schema";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const DEFAULT_DRAFT_PATH = resolve(ROOT, "content", "parallel-draft.json");
const FALLBACK_MARKETRICS_HEADING = "Summerlin & 55+ market indicators";
const FALLBACK_MLS_SEARCH_HEADING =
  "Live MLS search — Summerlin & the Valley";
const FALLBACK_MLS_SEARCH_BLURB =
  "Run the same RealScout MLS module as {{agent}}'s listings hub—refine price, beds, baths, and community lines before you scan office-sponsored inventory below.";

loadEnv({ path: resolve(ROOT, ".env.local") });
loadEnv({ path: resolve(ROOT, ".env") });

function parseArgs() {
  const argv = process.argv.slice(2);
  const out: { write: boolean; draftPath: string; showFaqJson: boolean } = {
    write: false,
    draftPath: DEFAULT_DRAFT_PATH,
    showFaqJson: false,
  };

  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--write" || a === "-w") out.write = true;
    else if (a === "--show-faq") out.showFaqJson = true;
    else if ((a === "--draft" || a === "-d") && argv[i + 1]) {
      out.draftPath = resolve(process.cwd(), argv[++i]!);
    }
  }
  return out;
}

async function loadDraft(rawPath: string) {
  const raw = JSON.parse(await readFile(rawPath, "utf8")) as Record<
    string,
    unknown
  >;
  if (!raw.ok) {
    throw new Error(
      "Draft payload has ok:false — fix parallel draft first or regenerate.",
    );
  }
  const inner = raw.draft;
  if (!inner || typeof inner !== "object") {
    throw new Error(
      `Missing nested "draft" object in ${rawPath}; expected output from npm run content:parallel-draft.`,
    );
  }
  const parsed = ParallelContentDraftSchema.safeParse(inner);
  if (!parsed.success) {
    throw new Error(JSON.stringify(parsed.error.flatten(), null, 2));
  }
  return { wrapper: raw, draft: parsed.data };
}

function emitSeoHome(title: string, description: string): string {
  return `/** Homepage SEO strings — shared by Metadata and JSON-LD. */

export const HOME_TITLE =
  ${JSON.stringify(title)};

export const HOME_DESCRIPTION =
  ${JSON.stringify(description)};
`;
}

function emitMarketingModule(draftHomepage: {
  heroEyebrow: string;
  heroSupportingParagraph: string;
  listingsHeading: string;
  listingsBlurb: string;
  marketMetricsBlurb: string;
  marketMetricsHeading?: string | undefined;
  mlsSearchHeading?: string | undefined;
  mlsSearchBlurb?: string | undefined;
  contactHeading: string;
  contactBlurb: string;
}): string {
  const mh =
    draftHomepage.marketMetricsHeading?.trim() || FALLBACK_MARKETRICS_HEADING;
  const mlsH =
    draftHomepage.mlsSearchHeading?.trim() || FALLBACK_MLS_SEARCH_HEADING;
  const mlsB =
    draftHomepage.mlsSearchBlurb?.trim() || FALLBACK_MLS_SEARCH_BLURB;

  const rawStrings = {
    heroEyebrow: draftHomepage.heroEyebrow,
    heroSupportingParagraph: draftHomepage.heroSupportingParagraph,
    listingsHeading: draftHomepage.listingsHeading,
    listingsBlurb: draftHomepage.listingsBlurb,
    marketMetricsHeading: mh,
    marketMetricsBlurb: draftHomepage.marketMetricsBlurb,
    mlsSearchHeading: mlsH,
    mlsSearchBlurb: mlsB,
    contactHeading: draftHomepage.contactHeading,
    contactBlurb: draftHomepage.contactBlurb,
  };

  const body = Object.entries(rawStrings)
    .map(([k, v]) => `  ${k}: ${JSON.stringify(v)},`)
    .join("\n");

  return `/**
 * Homepage hero/listings/contact marketing strings — rewritten by \`npm run content:apply-draft\`.
 * Tokens \`{{agent}}\` and \`{{brokerage}}\` expand from \`site-contact\` at module load time.
 */

import {
  AGENT_DISPLAY_NAME,
  SUPERVISING_BROKERAGE,
} from "@/lib/site-contact";

export function expandMarketingTokens(s: string): string {
  return s.replaceAll("{{agent}}", AGENT_DISPLAY_NAME).replaceAll(
    "{{brokerage}}",
    SUPERVISING_BROKERAGE,
  );
}

export const HOME_MARKETING_COPY_RAW = {
${body}
} as const;

export type HomeMarketingCopy = {
  [K in keyof typeof HOME_MARKETING_COPY_RAW]: string;
};

function buildMarketingCopy(): HomeMarketingCopy {
  const r = HOME_MARKETING_COPY_RAW;
  return {
    heroEyebrow: expandMarketingTokens(r.heroEyebrow),
    heroSupportingParagraph: expandMarketingTokens(r.heroSupportingParagraph),
    listingsHeading: expandMarketingTokens(r.listingsHeading),
    listingsBlurb: expandMarketingTokens(r.listingsBlurb),
    marketMetricsHeading: expandMarketingTokens(r.marketMetricsHeading),
    marketMetricsBlurb: expandMarketingTokens(r.marketMetricsBlurb),
    mlsSearchHeading: expandMarketingTokens(r.mlsSearchHeading),
    mlsSearchBlurb: expandMarketingTokens(r.mlsSearchBlurb),
    contactHeading: expandMarketingTokens(r.contactHeading),
    contactBlurb: expandMarketingTokens(r.contactBlurb),
  };
}

export const homeMarketingCopy = buildMarketingCopy();
`;
}

async function main() {
  const args = parseArgs();

  let loaded;
  try {
    loaded = await loadDraft(args.draftPath);
  } catch (e) {
    const err = String(e);
    if (err.includes("ENOENT")) {
      console.error(
        `No draft file found at:\n  ${resolve(args.draftPath)}\n\nRun:\n  npm run content:parallel-draft\n(with AI_GATEWAY_API_KEY in .env.local), then rerun this script.`,
      );
    } else {
      console.error(err);
    }
    process.exit(1);
  }

  const { draft, wrapper } = loaded;
  const seoPath = resolve(ROOT, "lib", "seo-home.ts");
  const marketingPath = resolve(ROOT, "lib", "home-marketing-copy.ts");

  const seoOut = emitSeoHome(draft.seoHome.title, draft.seoHome.description);
  const mkOut = emitMarketingModule(draft.homepage);

  console.info(`Draft loaded: ${args.draftPath}`);
  console.info(`Generated AT: ${String(wrapper.generatedAt ?? "(missing)")}`);
  console.info("— SEO title length:", draft.seoHome.title.length);
  console.info("— Meta description length:", draft.seoHome.description.length);

  console.info("");
  console.info(
    "FAQ reminder: paste draft.faqItems into lib/faq-home.ts manually if your answers must keep template literals tied to GBP env overrides.",
  );
  console.info("(Use --show-faq to emit full FAQ JSON)");

  if (args.showFaqJson) {
    console.info(JSON.stringify(draft.faqItems, null, 2));
  }

  if (!args.write) {
    console.info("");
    console.info("Dry run only. Re-run with --write to patch lib/*.ts sources.");
    return;
  }

  await writeFile(seoPath, seoOut, "utf8");
  await writeFile(marketingPath, mkOut, "utf8");
  console.info("");
  console.info(`Updated ${seoPath}`);
  console.info(`Updated ${marketingPath}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
