/**
 * Homepage / JSON-LD review samples (illustrative — same payloads as legacy single page).
 */

export type HomeReviewSeed = {
  id: number;
  review: string;
  authorName: string;
  date: string;
  stars: number;
  location: string;
};

export const HOME_REVIEW_SEED: readonly HomeReviewSeed[] = [
  {
    id: 1,
    review:
      "Sun City versus Del Webb was confusing until Dr. Duffy walked us through HOA fee structures, club access, resale velocity, and which streets actually match quiet living. Having data plus neighborhood anecdotes made the difference.",
    authorName: "Sarah M.",
    date: "2024-03-15",
    stars: 5,
    location: "Sun City Summerlin",
  },
  {
    id: 2,
    review:
      "We compared Heritage at Stonebridge with resale inventory across Summerlin West. Dr. Jan Duffy pressure-tested seller concessions, HOA posture, and how Stonebridge connects to trails—finally a plan that matched our downsizing checklist.",
    authorName: "Michael R.",
    date: "2024-02-28",
    stars: 5,
    location: "Heritage at Stonebridge",
  },
  {
    id: 3,
    review:
      "Buying new construction near Sky Canyon felt risky until Jan mapped absorption in nearby villages, escrow timelines with the builder office, and what inspection items repeatedly appear in that product type.",
    authorName: "Jennifer L.",
    date: "2024-01-20",
    stars: 5,
    location: "Sky Canyon",
  },
  {
    id: 4,
    review:
      "As first-time buyers in North Las Vegas, we needed education on corridors that are revitalizing versus those still speculative. Transparent pros/cons and lender-ready talking points saved us weeks of wandering open houses.",
    authorName: "David K.",
    date: "2024-01-05",
    stars: 5,
    location: "North Las Vegas",
  },
  {
    id: 5,
    review:
      "Dr. Duffy dissected competing offers on an elevated Summerlin West listing—beyond price—including appraisal gap language, leaseback risk, and how quickly similar floorplans traded. Sellers accepted ours over two higher-but-sloppy bids.",
    authorName: "Lisa H.",
    date: "2023-12-18",
    stars: 5,
    location: "Summerlin West",
  },
  {
    id: 6,
    review:
      "Relocation from California meant deciphering Nevada transfer taxes, HOA documents, and how Del Webb resale differs from resale inside older Summerlin pockets. She's the strategist we needed—not a scripted tour.",
    authorName: "Robert T.",
    date: "2023-12-01",
    stars: 5,
    location: "Del Webb Summerlin",
  },
  {
    id: 7,
    review:
      "Investment underwriting for Sky Canyon / southwest pockets required realistic rent comps and HOA rental caps. The spreadsheets were helpful, but the honest 'pass' on two addresses is what earns her future referrals.",
    authorName: "Maria S.",
    date: "2023-11-15",
    stars: 5,
    location: "Sky Canyon",
  },
  {
    id: 8,
    review:
      "Selling in Lone Mountain while buying closer to Strip employment centers meant juggling timelines. Offers were structured cleanly, timelines respected, and we always knew why she recommended each clause tweak.",
    authorName: "James P.",
    date: "2023-10-28",
    stars: 5,
    location: "Lone Mountain",
  },
];
