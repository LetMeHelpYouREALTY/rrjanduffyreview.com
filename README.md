# rrjanduffyreview.com — Client reviews (Dr. Jan Duffy)

Single-page marketing site for **Dr. Jan Duffy, REALTOR** (Las Vegas Valley): client testimonials, office locations, neighborhood context, **RealScout** search, and optional **AI-generated review summaries** via the Vercel AI SDK.

This repo replaced the original Vercel “e-commerce review summary” template; product demo routes and sample catalog data were removed in favor of real-estate-focused content.

## Stack

- Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS
- RealScout web components (loaded in `app/layout.tsx`)
- AI summaries: `lib/ai-summary.ts` (Vercel AI SDK; connect your chosen model / provider)

## Getting started

Install and run the dev server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Environment variable templates for **GBP-aligned NAP**, **Calendly**, **RealScout**, and **Maps** live in **`.env.example`**. Copy to `.env.local` and set values in Vercel for production.

For builds that match Vercel’s environment, use **`vercel build`** once the Vercel CLI is linked to the project.

## AI / environment

To enable AI summaries, configure the inference provider and keys expected by your `lib/ai-summary.ts` setup (for example via [Vercel AI integrations](https://vercel.com/docs/integrations/ai) or your provider’s dashboard). Do not commit live API keys; use Vercel project env vars locally after `vercel pull` if applicable.

## Project layout

- `app/layout.tsx` — global metadata (update title/description per GBP/SEO), nav, RealScout embed
- `app/page.tsx` — home route
- `components/ReviewSite.tsx` — main page content (reviews, offices, schema)

## Legacy template

The original template this project forked from: [Customer reviews AI summary (Next.js)](https://vercel.com/templates/next.js/customer-reviews-ai-summary-nextjs-vercel).
