import { gateway } from "ai";

/**
 * Shared Vercel AI Gateway `parallelSearch` tool wiring for route handlers
 * and local content scripts (`scripts/parallel-content-draft.ts`).
 */
export function getAiGatewayModel(): string {
  return process.env.AI_GATEWAY_MODEL?.trim() || "openai/gpt-4o-mini";
}

export function buildParallelSearchTools(): {
  parallel_search: ReturnType<typeof gateway.tools.parallelSearch>;
} {
  const maxResults = clampInt(
    parseOptionalInt(process.env.PARALLEL_SEARCH_MAX_RESULTS),
    1,
    20,
    8,
  );

  const mode =
    process.env.PARALLEL_SEARCH_MODE?.trim().toLowerCase() === "agentic"
      ? "agentic"
      : "one-shot";

  const excludeDomains = parseCommaSeparatedList(
    process.env.PARALLEL_SEARCH_EXCLUDE_DOMAINS,
  );
  const includeDomains = parseCommaSeparatedList(
    process.env.PARALLEL_SEARCH_INCLUDE_DOMAINS,
  );

  const parallelSearchConfig: Parameters<
    typeof gateway.tools.parallelSearch
  >[0] = {
    mode,
    maxResults,
    ...(excludeDomains?.length
      ? { sourcePolicy: { excludeDomains } }
      : includeDomains?.length
        ? { sourcePolicy: { includeDomains } }
        : {}),
  };

  return {
    parallel_search: gateway.tools.parallelSearch(parallelSearchConfig),
  };
}

function parseOptionalInt(raw: string | undefined): number | undefined {
  if (raw == null || raw.trim() === "") return undefined;
  const n = Number.parseInt(raw, 10);
  return Number.isFinite(n) ? n : undefined;
}

function clampInt(
  value: number | undefined,
  min: number,
  max: number,
  fallback: number,
): number {
  if (value == null) return fallback;
  return Math.min(max, Math.max(min, value));
}

function parseCommaSeparatedList(raw: string | undefined): string[] | undefined {
  if (raw == null || raw.trim() === "") return undefined;
  const parts = raw
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
  return parts.length > 0 ? parts : undefined;
}
