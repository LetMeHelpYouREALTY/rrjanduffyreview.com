/**
 * Builds a citation-aware content draft using Vercel AI Gateway + Parallel Search.
 *
 * Prereqs:
 * - `AI_GATEWAY_API_KEY` set (e.g. in `.env.local`)
 * - Optional: `AI_GATEWAY_MODEL`, `PARALLEL_SEARCH_*`, same as `/api/ai/parallel`
 *
 * Run: `npm run content:parallel-draft`
 *
 * Output: `content/parallel-draft.json` (gitignored) plus validation diagnostics in stdout.
 */

import { config as loadEnv } from "dotenv";
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { generateText, stepCountIs } from "ai";
import { ParallelContentDraftSchema } from "@/lib/content-draft-schema";
import {
  buildParallelSearchTools,
  getAiGatewayModel,
} from "@/lib/parallel-search-config";
import { HOME_DESCRIPTION, HOME_TITLE } from "@/lib/seo-home";
import {
  AGENT_DISPLAY_NAME,
  AGENT_TITLE,
  BUSINESS_NAME,
  NEVADA_LICENSE,
  PRIMARY_LOCALITY,
  SUPERVISING_BROKERAGE,
} from "@/lib/site-contact";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const OUT_DIR = resolve(ROOT, "content");
const OUT_FILE = resolve(OUT_DIR, "parallel-draft.json");

loadEnv({ path: resolve(ROOT, ".env.local") });
loadEnv({ path: resolve(ROOT, ".env") });

function extractJsonObject(text: string): string {
  const t = text.trim();
  const fenced = /^```(?:json)?\s*\n?([\s\S]*?)\n?```\s*$/i.exec(t);
  if (fenced?.[1]) return fenced[1].trim();
  const start = t.indexOf("{");
  const end = t.lastIndexOf("}");
  if (start !== -1 && end > start) return t.slice(start, end + 1);
  return t;
}

function buildPrompt(): string {
  return `You are rewriting marketing copy for a Nevada real estate agent site. Use the parallel_search tool at least twice to corroborate:
- Summerlin village names (Sun City, Del Webb, Stonebridge / Heritage at Stonebridge),
- Berkshire Hathaway HomeServices Nevada supervising brokerage context,
- Nevada REALTOR brokerage advertising expectations (truthful, not guaranteeing investment returns).

Facts you MUST preserve exactly in prose where referenced:
- Agent display name: ${AGENT_DISPLAY_NAME}
- Nevada ${AGENT_TITLE}, license ${NEVADA_LICENSE}
- Supervising brokerage: ${SUPERVISING_BROKERAGE}
- Business / GBP-visible name baseline: ${BUSINESS_NAME}
- Primary city for NAP baseline: ${PRIMARY_LOCALITY}, NV market area

Currently published strings (you may improve for SEO clarity but cannot remove disclosures):
TITLE: ${HOME_TITLE}
META DESCRIPTION: ${HOME_DESCRIPTION}

After searching, reply with ONLY a single JSON object (no markdown fences, no commentary). Include keys:
- notesForEditor (string)
- seoHome: { title, description }
- homepage: heroEyebrow, heroSupportingParagraph, listingsHeading, listingsBlurb, marketMetricsBlurb, contactHeading, contactBlurb; optionally marketMetricsHeading, mlsSearchHeading, mlsSearchBlurb (omit if unsure)
- faqItems: array of { id, question, answer }

Rules:
1. Mention MLS/RealScout data reliability in at least one FAQ answer verbatim-style ("deemed reliable but not guaranteed").
2. Include supervising brokerage + Nevada license verification (NRED) concepts in FAQ items.
3. Fair housing referenced in FAQ.
4. "faqItems": 9–11 entries; ids lowercase kebab-case, stable (e.g. "what-is-this-site", "service-areas").
5. No fabricated client statistics; testimonials are separate page content — do NOT invent star counts.
6. Keep "Dr. Jan" not "Janet"; maintain professional fiduciary tone suitable for Berkshire Hathaway HomeServices Nevada Properties.
7. In homepage.heroSupportingParagraph, listingsBlurb, marketMetricsBlurb, mlsSearchBlurb (when present) use literal tokens {{agent}} and {{brokerage}} instead of repeating the names (apply script substitutes from site-contact).`;
}

async function main() {
  if (!process.env.AI_GATEWAY_API_KEY?.trim()) {
    console.error(
      "Missing AI_GATEWAY_API_KEY. Add it to .env.local (Vercel AI Gateway).",
    );
    process.exit(1);
  }

  await mkdir(OUT_DIR, { recursive: true });

  const model = getAiGatewayModel();
  console.info(`Using model: ${model}`);

  const result = await generateText({
    model,
    prompt: buildPrompt(),
    tools: buildParallelSearchTools(),
    stopWhen: stepCountIs(12),
  });

  const rawText = result.text?.trim() ?? "";
  let jsonPayload: unknown;
  try {
    jsonPayload = JSON.parse(extractJsonObject(rawText));
  } catch (e) {
    const err = `${e}`;
    const payload = {
      ok: false,
      error: "JSON parse failure",
      details: err,
      rawModelText: rawText,
      usage: result.usage,
    };
    await writeFile(OUT_FILE, JSON.stringify(payload, null, 2), "utf8");
    console.error(`Wrote unparsed output to ${OUT_FILE}`);
    process.exit(1);
  }

  const parsed = ParallelContentDraftSchema.safeParse(jsonPayload);
  if (!parsed.success) {
    await writeFile(
      OUT_FILE,
      JSON.stringify(
        {
          ok: false,
          zodIssues: parsed.error.flatten(),
          json: jsonPayload,
          rawModelText: rawText,
          usage: result.usage,
        },
        null,
        2,
      ),
      "utf8",
    );
    console.error(`Schema validation failed. See ${OUT_FILE}`);
    console.error(parsed.error.flatten());
    process.exit(1);
  }

  await writeFile(
    OUT_FILE,
    JSON.stringify(
      {
        ok: true,
        generatedAt: new Date().toISOString(),
        draft: parsed.data,
        usage: result.usage,
      },
      null,
      2,
    ),
    "utf8",
  );

  console.info(`Wrote validated draft → ${OUT_FILE}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
