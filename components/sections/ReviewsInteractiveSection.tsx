"use client";

import Link from "next/link";
import React, { useState } from "react";
import { Star } from "lucide-react";
import { DeferredOfficeListingsBand } from "@/components/realscout/DeferredOfficeListingsBand";
import { DeferredSimpleSearchBand } from "@/components/realscout/DeferredSimpleSearchBand";
import { HOME_REVIEW_SEED } from "@/lib/home-review-seed";
import { ROUTES } from "@/lib/site-routes";

export default function ReviewsInteractiveSection() {
  const [reviews] = useState([...HOME_REVIEW_SEED]);
  const [selectedFilter, setSelectedFilter] = useState("all");

  const StarRating = ({ rating }: { rating: number }) => (
    <div
      className="flex items-center gap-1"
      role="img"
      aria-label={`${rating} out of 5 stars`}
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={20}
          aria-hidden
          className={
            star <= rating
              ? "fill-amber-400 text-amber-500"
              : "text-outline-variant"
          }
        />
      ))}
    </div>
  );

  const averageRating =
    reviews.reduce((sum, review) => sum + review.stars, 0) / reviews.length;
  const totalReviews = reviews.length;

  const filteredReviews =
    selectedFilter === "all"
      ? reviews
      : reviews.filter((review) => review.stars === parseInt(selectedFilter, 10));

  return (
    <section className="py-16 md:py-section bg-surface-low scroll-mt-28">
      <div className="max-w-content mx-auto px-4 md:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h1 className="font-display text-3xl md:text-[2.5rem] font-medium text-on-surface mb-4 tracking-tight">
            Client reviews &amp; community outcomes
          </h1>
          <p className="text-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
            What buyers and sellers report after working through Summerlin lifestyle comparisons,
            Valley relocations, and contract strategy with Dr. Jan Duffy
          </p>
          <p className="text-sm text-on-surface-variant/90 max-w-2xl mx-auto mt-4 leading-relaxed">
            Quotes highlight recurring themes from client work. Confirm fit on a call, read the{" "}
            <Link
              className="text-primary font-semibold underline-offset-4 hover:underline"
              href={ROUTES.trust}
            >
              verification &amp; listing-data disclosures
            </Link>
            , and compare with Google reviews from the About page.
          </p>
        </div>

        <DeferredSimpleSearchBand />
        <DeferredOfficeListingsBand />

        <div
          id="neighborhoods"
          className="bg-research-grid border border-outline/10 p-8 md:p-10 mb-10 scroll-mt-28"
        >
          <h2 className="font-display text-2xl font-medium text-center text-on-surface mb-8 tracking-tight">
            Communities we compare &amp; sell
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              [
                "Sun City Summerlin",
                "Active-adult lifestyle, robust clubs, deep resale history",
              ],
              [
                "Del Webb Summerlin",
                "Single-story–leaning product with curated amenity packages",
              ],
              [
                "Heritage at Stonebridge",
                "Age-qualified Summerlin village living near Stonebridge Park",
              ],
              ["Summerlin West", "Classic master plan streets, schools, and mixed product types"],
              ["Lone Mountain", "Residential pockets with mountain sightlines and varied lot sizes"],
              [
                "Sky Canyon & North Las Vegas",
                "Newer construction momentum and value-forward corridors",
              ],
            ].map(([title, bl]) => (
              <div
                key={title}
                className="text-center border border-outline/15 bg-surface p-5"
              >
                <h3 className="text-sm font-bold tracking-[0.06em] uppercase text-on-surface mb-2">
                  {title}
                </h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">{bl}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="border border-outline/15 bg-surface p-8 md:p-10 mb-10">
          <div className="flex items-center justify-center gap-8 mb-8">
            <div className="text-center">
              <div className="font-display text-5xl font-normal text-on-surface mb-2 tabular-nums">
                {averageRating.toFixed(1)}
              </div>
              <StarRating rating={Math.round(averageRating)} />
              <p className="text-on-surface-variant mt-2 text-sm">
                Based on {totalReviews} reviews
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[5, 4, 3, 2, 1].map((rating) => {
              const count = reviews.filter((r) => r.stars === rating).length;
              const percentage = (count / totalReviews) * 100;

              return (
                <div key={rating} className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-2">
                    <span className="text-sm font-semibold text-on-surface">{rating}</span>
                    <Star
                      size={16}
                      aria-hidden
                      className="fill-amber-400 text-amber-500"
                    />
                  </div>
                  <div className="bg-surface-container h-1 border border-outline/10 mb-1 overflow-hidden">
                    <div
                      className="bg-secondary h-full transition-all duration-300"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <p className="text-xs text-on-surface-variant">{count}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-10 justify-center">
          <button
            type="button"
            onClick={() => setSelectedFilter("all")}
            className={`px-4 py-2 rounded-md text-xs font-bold tracking-[0.08em] uppercase transition-colors border ${
              selectedFilter === "all"
                ? "bg-charcoal text-white border-charcoal"
                : "bg-chip-bg text-on-surface border-outline/15 hover:bg-secondary-container"
            }`}
          >
            All reviews
          </button>
          {[5, 4, 3, 2, 1].map((rating) => (
            <button
              type="button"
              key={rating}
              onClick={() => setSelectedFilter(rating.toString())}
              className={`px-4 py-2 rounded-md text-xs font-bold tracking-[0.08em] uppercase transition-colors border ${
                selectedFilter === rating.toString()
                  ? "bg-charcoal text-white border-charcoal"
                  : "bg-chip-bg text-on-surface border-outline/15 hover:bg-secondary-container"
              }`}
            >
              {rating} stars
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((review) => (
            <article
              key={review.id}
              className="bg-surface border border-outline/15 p-6 hover:border-primary/35 transition-colors"
            >
              <div className="flex items-center justify-between mb-4">
                <StarRating rating={review.stars} />
                <span className="text-xs text-on-surface-variant">
                  {new Date(review.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <p className="text-on-surface mb-5 leading-relaxed text-[15px]">
                &ldquo;{review.review}&rdquo;
              </p>
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-9 h-9 bg-inverse-surface shrink-0 flex items-center justify-center">
                    <span className="text-inverse-on-surface font-semibold text-sm">
                      {review.authorName.charAt(0)}
                    </span>
                  </div>
                  <span className="font-semibold text-on-surface truncate">
                    {review.authorName}
                  </span>
                </div>
                <span className="text-[10px] font-bold tracking-[0.08em] uppercase shrink-0 bg-chip-bg text-on-surface px-2 py-1 border border-outline/10">
                  {review.location}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
