import { gateway, streamText } from "ai";

export const maxDuration = 60;

/** Default gateway model slug — override with AI_GATEWAY_MODEL in Vercel. */
const DEFAULT_GATEWAY_MODEL = "openai/gpt-4o-mini";

export async function POST(request: Request) {
  if (!process.env.AI_GATEWAY_API_KEY?.trim()) {
    return Response.json(
      {
        error:
          "AI Gateway is not configured. Create an API key under Vercel → AI Gateway and set AI_GATEWAY_API_KEY on this project.",
      },
      { status: 503 },
    );
  }

  const webhookSecret = process.env.AI_CHAT_WEBHOOK_SECRET?.trim();
  if (webhookSecret && request.headers.get("x-ai-chat-secret") !== webhookSecret) {
    return Response.json(
      { error: "Missing or invalid x-ai-chat-secret header." },
      { status: 401 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const prompt =
    body &&
    typeof body === "object" &&
    "prompt" in body &&
    typeof (body as { prompt: unknown }).prompt === "string"
      ? (body as { prompt: string }).prompt.trim()
      : "";

  if (!prompt || prompt.length > 12_000) {
    return Response.json(
      {
        error: "Field `prompt` is required (non-empty string, max 12000 characters).",
      },
      { status: 400 },
    );
  }

  const model = process.env.AI_GATEWAY_MODEL?.trim() || DEFAULT_GATEWAY_MODEL;

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

  const result = streamText({
    model,
    prompt,
    tools: {
      parallel_search: gateway.tools.parallelSearch(parallelSearchConfig),
    },
  });

  return result.toTextStreamResponse();
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

/** Comma-separated domains for Parallel sourcePolicy (exclude wins if both set). */
function parseCommaSeparatedList(raw: string | undefined): string[] | undefined {
  if (raw == null || raw.trim() === "") return undefined;
  const parts = raw
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
  return parts.length > 0 ? parts : undefined;
}
