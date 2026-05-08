import { unstable_cache } from "next/cache";
import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { Product } from "./types";

const FALLBACK =
  "An AI-generated summary is not available right now. Please read the full reviews below for client feedback.";

function getPerplexityClient(): OpenAI | null {
  const key = process.env.PERPLEXITY_API_KEY?.trim();
  if (!key) return null;
  return new OpenAI({
    apiKey: key,
    baseURL: "https://api.perplexity.ai",
  });
}

export async function summarizeReviews(product: Product) {
  const averageRating =
    product.reviews.reduce((acc, review) => acc + review.stars, 0) /
    product.reviews.length;

  const prompt = `Write a summary of the reviews for the ${
    product.name
  } product. The product's average rating is ${averageRating} out of 5 stars. 
Your goal is to highlight the most common themes and sentiments expressed by customers.
If multiple themes are present, try to capture the most important ones.
If no patterns emerge but there is a shared sentiment, capture that instead.
Try to use natural language and keep the summary concise.
Use a maximum of 4 sentences and 30 words.
Don't include any word count or character count.
No need to reference which reviews you're summarizing.
Do not reference the star rating in the summary.

Start the summary with "Customers like…" or "Customers mention…"

Here are 3 examples of a good summarie:
Example 1: Customers like the quality, space, fit and value of the sport equipment bag case. They mention it's heavy duty, has lots of space and pockets, and can fit all their gear. They also appreciate the portability and appearance. That said, some disagree on the zipper.
Example 2: Customers like the quality, ease of installation, and value of the transport rack. They mention that it holds on to everything really well, and is reliable. Some complain about the wind noise, saying it makes a whistling noise at high speeds. Opinions are mixed on fit, and performance.
Example 3: Customers like the quality and value of the body deodorant. They say it works great and provides freshness for a long time after application. Some customers have different opinions on smell and durability.

Hit the following tone based on rating:
- 1-2 stars: negative
- 3 stars: neutral
- 4-5 stars: positive

The customer reviews to summarize are as follows:
${product.reviews
  .map((review, i) => `Review ${i + 1}:\n${review.review}`)
  .join("\n\n")}`;

  const query = {
    model: "sonar-pro",
    stream: true,
    messages: buildPrompt(prompt),
    max_tokens: 1000,
    temperature: 0.75,
    top_p: 1,
    frequency_penalty: 1,
  } as const;

  const clientForBuild = getPerplexityClient();
  if (!clientForBuild) {
    return FALLBACK;
  }

  return unstable_cache(
    async () => {
      const client = getPerplexityClient();
      if (!client) return FALLBACK;
      try {
        const response = await client.chat.completions.create(query);
        const stream = OpenAIStream(
          response as Parameters<typeof OpenAIStream>[0],
        );
        const streamingResponse = new StreamingTextResponse(stream);
        let text = await streamingResponse.text();
        text = text
          .trim()
          .replace(/^"/, "")
          .replace(/"$/, "")
          .replace(/[\[\(]\d+ words[\]\)]/g, "");
        return text;
      } catch {
        return FALLBACK;
      }
    },
    [
      JSON.stringify(query),
      "2.0",
      process.env.VERCEL_BRANCH_URL || "",
      process.env.NODE_ENV || "",
    ],
  )();
}

function buildPrompt(prompt: string): [{ role: "user"; content: string }] {
  return [
    {
      role: "user",
      content: prompt,
    },
  ];
}
