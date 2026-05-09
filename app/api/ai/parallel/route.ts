import { streamText } from "ai";
import {
  buildParallelSearchTools,
  getAiGatewayModel,
} from "@/lib/parallel-search-config";

/**
 * Server-side stream that exposes Vercel AI Gateway `parallelSearch` for
 * citation-backed answers. POST `{ "prompt": "…" }` from tools, or run
 * `npm run content:apply-draft` locally to merge saved `content/parallel-draft.json`.
 */

export const maxDuration = 60;

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

  const model = getAiGatewayModel();

  const result = streamText({
    model,
    prompt,
    tools: buildParallelSearchTools(),
  });

  return result.toTextStreamResponse();
}
