"use client";

import React, { useMemo, useState } from "react";
import { Star, MapPin, Award, Users, Home } from "lucide-react";
import { OFFICE_LOCATIONS } from "@/lib/office-locations";
import { buildCalendlyUrl } from "@/lib/calendly";
import {
  AGENT_DISPLAY_NAME,
  AGENT_TITLE,
  BUSINESS_NAME,
  CONTACT_EMAIL,
  formatTelHref,
  getPublicSiteUrl,
  NEVADA_LICENSE,
  OFFICE_HOURS_LINES,
  PRIMARY_LOCALITY,
  PRIMARY_PHONE_DISPLAY,
  PRIMARY_POSTAL,
  PRIMARY_REGION,
  PRIMARY_STREET,
  SUPERVISING_BROKERAGE,
} from "@/lib/site-contact";
import {
  buildMapsSearchUrl,
  buildViewReviewsUrl,
  buildWriteReviewUrl,
  isReviewsCtaDisabled,
  primaryMapEmbedSrc,
} from "@/lib/reviews";

const ReviewSite = () => {
  const [reviews] = useState([
    {
      id: 1,
      review:
        "Dr. Duffy's knowledge of Summerlin West is incredible! She helped us find the perfect family home with mountain views. Her expertise in the master-planned community amenities and HOA regulations was invaluable.",
      authorName: "Sarah M.",
      date: "2024-03-15",
      stars: 5,
      location: "Summerlin West",
    },
    {
      id: 2,
      review:
        "Working with Dr. Jan Duffy in Lone Mountain was the best decision we made. She sold our house in just 10 days and knew exactly which neighborhoods would fit our lifestyle. Her knowledge of the area's growth potential was spot-on.",
      authorName: "Michael R.",
      date: "2024-02-28",
      stars: 5,
      location: "Lone Mountain",
    },
    {
      id: 3,
      review:
        "Dr. Duffy helped us navigate the Sky Canyon market with confidence. Her understanding of the newer developments and builder relationships made our new construction purchase smooth and stress-free.",
      authorName: "Jennifer L.",
      date: "2024-01-20",
      stars: 5,
      location: "Sky Canyon",
    },
    {
      id: 4,
      review:
        "As first-time buyers in North Las Vegas, Dr. Duffy educated us about the different neighborhoods and helped us find incredible value. Her knowledge of the area's revitalization and future development plans was impressive.",
      authorName: "David K.",
      date: "2024-01-05",
      stars: 5,
      location: "North Las Vegas",
    },
    {
      id: 5,
      review:
        "Dr. Duffy's expertise in Summerlin West's luxury market is unmatched. She understood our needs for a custom home and guided us through the entire process with professionalism and market insight.",
      authorName: "Lisa H.",
      date: "2023-12-18",
      stars: 5,
      location: "Summerlin West",
    },
    {
      id: 6,
      review:
        "Moving from out of state, Dr. Duffy's knowledge of Lone Mountain's family-friendly communities was exactly what we needed. She helped us understand schools, amenities, and neighborhood dynamics perfectly.",
      authorName: "Robert T.",
      date: "2023-12-01",
      stars: 5,
      location: "Lone Mountain",
    },
    {
      id: 7,
      review:
        "Dr. Duffy's insight into Sky Canyon's investment potential was remarkable. She helped us secure a property that has already appreciated significantly. Her market analysis was thorough and accurate.",
      authorName: "Maria S.",
      date: "2023-11-15",
      stars: 5,
      location: "Sky Canyon",
    },
    {
      id: 8,
      review:
        "Working with Dr. Duffy in North Las Vegas was exceptional. She showed us properties that perfectly matched our budget and lifestyle, and her negotiation skills saved us thousands.",
      authorName: "James P.",
      date: "2023-10-28",
      stars: 5,
      location: "North Las Vegas",
    },
  ]);

  const [selectedFilter, setSelectedFilter] = useState("all");

  const scheduleTourUrl = buildCalendlyUrl(
    process.env.NEXT_PUBLIC_CALENDLY_TOUR_URL?.trim() ?? "",
    {
      utm_source: "rrjanduffyreview.com",
      utm_medium: "website",
      utm_campaign: "contact_section",
    },
  );

  const reviewsJsonLd = useMemo(
    () =>
      reviews.map((r) => ({
        "@context": "https://schema.org",
        "@type": "Review",
        itemReviewed: {
          "@type": "RealEstateAgent",
          name: BUSINESS_NAME,
        },
        author: { "@type": "Person", name: r.authorName },
        reviewRating: { "@type": "Rating", ratingValue: String(r.stars) },
        reviewBody: r.review,
        datePublished: r.date,
      })),
    [reviews],
  );

  const businessSchema = useMemo(() => {
    const avg =
      reviews.reduce((sum, review) => sum + review.stars, 0) / reviews.length;
    const base: Record<string, unknown> = {
      "@context": "https://schema.org",
      "@type": "RealEstateAgent",
      name: BUSINESS_NAME,
      url: getPublicSiteUrl(),
      telephone: PRIMARY_PHONE_DISPLAY,
      address: {
        "@type": "PostalAddress",
        streetAddress: PRIMARY_STREET,
        addressLocality: PRIMARY_LOCALITY,
        addressRegion: PRIMARY_REGION,
        postalCode: PRIMARY_POSTAL,
        addressCountry: "US",
      },
      areaServed: [
        "Summerlin West",
        "Lone Mountain",
        "Sky Canyon",
        "North Las Vegas",
      ],
      location: OFFICE_LOCATIONS.map((loc) => ({
        "@type": "PostalAddress",
        streetAddress: loc.address,
        addressCountry: "US",
        telephone: loc.phone,
      })),
      worksFor: {
        "@type": "Organization",
        name: SUPERVISING_BROKERAGE,
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: avg.toFixed(1),
        reviewCount: String(reviews.length),
      },
    };
    if (CONTACT_EMAIL) {
      base.email = CONTACT_EMAIL;
    }
    return base;
  }, [reviews]);

  const StarRating = ({ rating }: { rating: number }) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={20}
            className={`${star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
          />
        ))}
      </div>
    );
  };

  const averageRating =
    reviews.reduce((sum, review) => sum + review.stars, 0) / reviews.length;
  const totalReviews = reviews.length;

  const filteredReviews =
    selectedFilter === "all"
      ? reviews
      : reviews.filter((review) => review.stars === parseInt(selectedFilter, 10));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(businessSchema),
        }}
      />
      {reviewsJsonLd.map((review, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(review),
          }}
        />
      ))}
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-6xl mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-blue-700 uppercase tracking-wide">
                  {SUPERVISING_BROKERAGE}
                </p>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mt-1">
                  {BUSINESS_NAME}
                </h1>
                <p className="text-lg text-gray-700 mt-1">
                  {AGENT_DISPLAY_NAME}, {AGENT_TITLE} · Nevada license{" "}
                  {NEVADA_LICENSE}
                </p>
              </div>
              <div className="flex items-center gap-4 md:text-right">
                <div>
                  <div className="flex items-center gap-2 md:justify-end">
                    <StarRating rating={Math.round(averageRating)} />
                    <span className="text-lg font-semibold text-gray-900">
                      {averageRating.toFixed(1)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{totalReviews} reviews</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-4">
              Las Vegas Area Real Estate Expert
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Specializing in Summerlin West, Lone Mountain, Sky Canyon, and
              North Las Vegas. {AGENT_DISPLAY_NAME} provides local market
              expertise to help you find the right home in the neighborhoods that
              fit your goals — with {SUPERVISING_BROKERAGE}.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="bg-white/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Home className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  Local Market Expertise
                </h3>
                <p className="text-blue-100">
                  Deep knowledge of Summerlin West, Lone Mountain, Sky Canyon,
                  and North Las Vegas markets
                </p>
              </div>
              <div className="text-center">
                <div className="bg-white/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  Neighborhood Specialist
                </h3>
                <p className="text-blue-100">
                  Guidance on community amenities, schools, and lifestyle fit
                </p>
              </div>
              <div className="text-center">
                <div className="bg-white/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Award className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Client Reviews</h3>
                <p className="text-blue-100">
                  Read what buyers and sellers say about working with{" "}
                  {AGENT_DISPLAY_NAME}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="py-16 bg-white border-b">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">
              Meet {AGENT_DISPLAY_NAME}
            </h2>
            <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
              Licensed Nevada real estate professional with{" "}
              {SUPERVISING_BROKERAGE}. Primary office contact below mirrors this
              site&apos;s Google Business Profile — confirm hours and suite in
              GBP whenever they change.
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
              <div>
                <p className="text-lg font-semibold text-gray-900">
                  {BUSINESS_NAME}
                </p>
                <p className="text-gray-800 mt-2">{PRIMARY_STREET}</p>
                <p className="text-gray-800">
                  {PRIMARY_LOCALITY}, {PRIMARY_REGION} {PRIMARY_POSTAL}
                </p>
                <p className="mt-3">
                  <a
                    href={formatTelHref(PRIMARY_PHONE_DISPLAY)}
                    className="text-blue-700 font-semibold hover:underline"
                  >
                    Call {PRIMARY_PHONE_DISPLAY}
                  </a>
                </p>
                {CONTACT_EMAIL ? (
                  <p className="mt-2">
                    <a
                      href={`mailto:${CONTACT_EMAIL}`}
                      className="text-blue-700 hover:underline"
                    >
                      {CONTACT_EMAIL}
                    </a>
                  </p>
                ) : null}
                <div className="mt-4 text-gray-700">
                  <p className="font-medium text-gray-900">Office hours</p>
                  <ul className="list-disc pl-5 mt-1 space-y-1">
                    {OFFICE_HOURS_LINES.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-wrap gap-3 mt-6">
                  <a
                    href={formatTelHref(PRIMARY_PHONE_DISPLAY)}
                    className="inline-flex items-center justify-center rounded-md bg-blue-600 text-white px-4 py-2 text-sm font-medium hover:bg-blue-700"
                  >
                    Call
                  </a>
                  <a
                    href={buildMapsSearchUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50"
                  >
                    Directions
                  </a>
                  {!isReviewsCtaDisabled() ? (
                    <>
                      <a
                        href={buildViewReviewsUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50"
                      >
                        View reviews
                      </a>
                      <a
                        href={buildWriteReviewUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50"
                      >
                        Write a review
                      </a>
                    </>
                  ) : null}
                </div>
              </div>
              <div className="w-full rounded-lg overflow-hidden shadow-md border aspect-video">
                <iframe
                  title={`Google Map — ${BUSINESS_NAME}`}
                  src={primaryMapEmbedSrc()}
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: "280px" }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </section>

        <section id="reviews" className="py-16">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Client Reviews
              </h2>
              <p className="text-lg text-gray-600">
                What clients say about their experience in Las Vegas
                neighborhoods
              </p>
            </div>

            <div
              id="neighborhoods"
              className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-8 mb-8 scroll-mt-24"
            >
              <h3 className="text-2xl font-bold text-center text-gray-900 mb-6">
                Specialized Service Areas
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Summerlin West
                    </h4>
                    <p className="text-sm text-gray-600">
                      Master-planned living with strong amenities
                    </p>
                  </div>
                </div>
                <div className="text-center">
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Lone Mountain
                    </h4>
                    <p className="text-sm text-gray-600">
                      Family-friendly communities and views
                    </p>
                  </div>
                </div>
                <div className="text-center">
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Sky Canyon
                    </h4>
                    <p className="text-sm text-gray-600">
                      Newer developments and builder relationships
                    </p>
                  </div>
                </div>
                <div className="text-center">
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <h4 className="font-semibold text-gray-900 mb-2">
                      North Las Vegas
                    </h4>
                    <p className="text-sm text-gray-600">
                      Value and revitalization corridors
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
              <div className="flex items-center justify-center gap-8 mb-6">
                <div className="text-center">
                  <div className="text-5xl font-bold text-gray-900 mb-2">
                    {averageRating.toFixed(1)}
                  </div>
                  <StarRating rating={Math.round(averageRating)} />
                  <p className="text-gray-600 mt-2">
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
                        <span className="text-sm font-medium">{rating}</span>
                        <Star
                          size={16}
                          className="fill-yellow-400 text-yellow-400"
                        />
                      </div>
                      <div className="bg-gray-200 rounded-full h-2 mb-1">
                        <div
                          className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-600">{count} reviews</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-8 justify-center">
              <button
                type="button"
                onClick={() => setSelectedFilter("all")}
                className={`px-4 py-2 rounded-full transition-colors ${
                  selectedFilter === "all"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                All Reviews
              </button>
              {[5, 4, 3, 2, 1].map((rating) => (
                <button
                  type="button"
                  key={rating}
                  onClick={() => setSelectedFilter(rating.toString())}
                  className={`px-4 py-2 rounded-full transition-colors ${
                    selectedFilter === rating.toString()
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {rating} Stars
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredReviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center justify-between mb-4">
                    <StarRating rating={review.stars} />
                    <span className="text-sm text-gray-500">
                      {new Date(review.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    &ldquo;{review.review}&rdquo;
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">
                          {review.authorName.charAt(0)}
                        </span>
                      </div>
                      <span className="font-medium text-gray-900">
                        {review.authorName}
                      </span>
                    </div>
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600">
                      {review.location}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="contact"
          className="bg-blue-900 text-white py-12 scroll-mt-24"
        >
          <div className="max-w-6xl mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold mb-4">Contact</h2>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Call the primary office, request directions, or schedule a private
              conversation. RealScout search above covers MLS-driven listing
              discovery.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a
                href={formatTelHref(PRIMARY_PHONE_DISPLAY)}
                className="inline-flex rounded-md bg-white text-blue-900 px-5 py-2.5 font-semibold hover:bg-blue-50"
              >
                Call {PRIMARY_PHONE_DISPLAY}
              </a>
              {scheduleTourUrl ? (
                <a
                  href={scheduleTourUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex rounded-md border border-white/80 px-5 py-2.5 font-semibold hover:bg-white/10"
                >
                  Schedule with Calendly
                </a>
              ) : null}
              <a
                href={buildMapsSearchUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex rounded-md border border-white/80 px-5 py-2.5 font-semibold hover:bg-white/10"
              >
                Directions
              </a>
            </div>
          </div>
        </section>

        <section
          id="offices"
          className="bg-gray-900 text-white py-16 scroll-mt-24"
        >
          <div className="max-w-6xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Our Offices</h2>
            <p className="text-xl text-gray-300 mb-8">
              {AGENT_DISPLAY_NAME} serves clients across the Las Vegas Valley.
              Reach out to the location that is most convenient for you.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {OFFICE_LOCATIONS.map((office, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center bg-gray-800 rounded-lg p-6 mb-4"
                >
                  <div className="bg-blue-600 rounded-full p-4 mb-4">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{office.name}</h3>
                  <p className="text-gray-300 mb-2">{office.address}</p>
                  <p className="text-gray-300 mb-2">
                    <a
                      href={formatTelHref(office.phone)}
                      className="hover:text-white underline"
                    >
                      {office.phone}
                    </a>
                  </p>
                  <a
                    href={office.maps}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 underline text-sm"
                  >
                    Get Directions
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        <footer className="bg-gray-800 text-white py-8">
          <div className="max-w-6xl mx-auto px-4 text-center space-y-3">
            <p className="text-gray-200 text-sm">
              {BUSINESS_NAME} · {AGENT_DISPLAY_NAME}, {AGENT_TITLE} — Nevada
              license {NEVADA_LICENSE}
            </p>
            <p className="text-gray-300 text-sm">{SUPERVISING_BROKERAGE}</p>
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} {AGENT_DISPLAY_NAME}. All rights
              reserved.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default ReviewSite;
