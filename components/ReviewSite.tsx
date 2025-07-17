import React, { useState } from 'react';
import Head from 'next/head';
import { Star, MapPin, Phone, Mail, Award, Users, Home, Calendar } from 'lucide-react';

const officeLocations = [
  {
    name: "Centennial Hills",
    address: "9406 Del Webb Boulevard, Las Vegas, NV 89134",
    phone: "(702) 718-0043",
    maps: "https://www.google.com/maps/search/?api=1&query=9406+Del+Webb+Boulevard,+Las+Vegas,+NV+89134"
  },
  {
    name: "Henderson",
    address: "3185 St Rose Pkwy, Suite 101, Henderson, NV 89052",
    phone: "(702) 500-1955",
    maps: "https://www.google.com/maps/search/?api=1&query=3185+St+Rose+Pkwy,+Suite+101,+Henderson,+NV+89052"
  },
  {
    name: "Sunset",
    address: "8850 W Sunset Rd UNIT 200, Las Vegas, NV 89148",
    phone: "(702) 500-1942",
    maps: "https://www.google.com/maps/search/?api=1&query=8850+W+Sunset+Rd+UNIT+200,+Las+Vegas,+NV+89148"
  },
  {
    name: "Summerlin",
    address: "1490 Center Crossing Rd, Las Vegas, NV 89144",
    phone: "(702) 903-1952",
    maps: "https://www.google.com/maps/search/?api=1&query=1490+Center+Crossing+Rd,+Las+Vegas,+NV+89144"
  },
  {
    name: "Sahara",
    address: "7475 W Sahara Ave #100, Las Vegas, NV 89117",
    phone: "(702) 299-6607",
    maps: "https://www.google.com/maps/search/?api=1&query=7475+W+Sahara+Ave+%23100,+Las+Vegas,+NV+89117"
  },
  {
    name: "Lone Mountain",
    address: "10777 W Twain Ave #333, Las Vegas, NV 89129",
    phone: "(702) 678-9012",
    maps: "https://www.google.com/maps/search/?api=1&query=10777+W+Twain+Ave+%23333,+Las+Vegas,+NV+89129"
  },
  {
    name: "North Las Vegas",
    address: "921 South Main Street, Las Vegas, NV 89101",
    phone: "(702) 500-1980",
    maps: "https://www.google.com/maps/search/?api=1&query=921+South+Main+Street,+Las+Vegas,+NV+89101"
  }
];

const reviewsSchema = [
  {
    "@context": "https://schema.org",
    "@type": "Review",
    "itemReviewed": {
      "@type": "RealEstateAgent",
      "name": "Dr. Jan Duffy REALTOR"
    },
    "author": { "@type": "Person", "name": "Sarah M." },
    "reviewRating": { "@type": "Rating", "ratingValue": "5" },
    "reviewBody": "Dr. Duffy's knowledge of Summerlin West is incredible! She helped us find the perfect family home with mountain views. Her expertise in the master-planned community amenities and HOA regulations was invaluable.",
    "datePublished": "2024-03-15"
  },
  {
    "@context": "https://schema.org",
    "@type": "Review",
    "itemReviewed": { "@type": "RealEstateAgent", "name": "Dr. Jan Duffy REALTOR" },
    "author": { "@type": "Person", "name": "Michael R." },
    "reviewRating": { "@type": "Rating", "ratingValue": "5" },
    "reviewBody": "Working with Dr. Jan Duffy in Lone Mountain was the best decision we made. She sold our house in just 10 days and knew exactly which neighborhoods would fit our lifestyle. Her knowledge of the area's growth potential was spot-on.",
    "datePublished": "2024-02-28"
  },
  {
    "@context": "https://schema.org",
    "@type": "Review",
    "itemReviewed": { "@type": "RealEstateAgent", "name": "Dr. Jan Duffy REALTOR" },
    "author": { "@type": "Person", "name": "Jennifer L." },
    "reviewRating": { "@type": "Rating", "ratingValue": "5" },
    "reviewBody": "Dr. Duffy helped us navigate the Sky Canyon market with confidence. Her understanding of the newer developments and builder relationships made our new construction purchase smooth and stress-free.",
    "datePublished": "2024-01-20"
  },
  {
    "@context": "https://schema.org",
    "@type": "Review",
    "itemReviewed": { "@type": "RealEstateAgent", "name": "Dr. Jan Duffy REALTOR" },
    "author": { "@type": "Person", "name": "David K." },
    "reviewRating": { "@type": "Rating", "ratingValue": "5" },
    "reviewBody": "As first-time buyers in North Las Vegas, Dr. Duffy educated us about the different neighborhoods and helped us find incredible value. Her knowledge of the area's revitalization and future development plans was impressive.",
    "datePublished": "2024-01-05"
  },
  {
    "@context": "https://schema.org",
    "@type": "Review",
    "itemReviewed": { "@type": "RealEstateAgent", "name": "Dr. Jan Duffy REALTOR" },
    "author": { "@type": "Person", "name": "Lisa H." },
    "reviewRating": { "@type": "Rating", "ratingValue": "5" },
    "reviewBody": "Dr. Duffy's expertise in Summerlin West's luxury market is unmatched. She understood our needs for a custom home and guided us through the entire process with professionalism and market insight.",
    "datePublished": "2023-12-18"
  },
  {
    "@context": "https://schema.org",
    "@type": "Review",
    "itemReviewed": { "@type": "RealEstateAgent", "name": "Dr. Jan Duffy REALTOR" },
    "author": { "@type": "Person", "name": "Robert T." },
    "reviewRating": { "@type": "Rating", "ratingValue": "5" },
    "reviewBody": "Moving from out of state, Dr. Duffy's knowledge of Lone Mountain's family-friendly communities was exactly what we needed. She helped us understand schools, amenities, and neighborhood dynamics perfectly.",
    "datePublished": "2023-12-01"
  },
  {
    "@context": "https://schema.org",
    "@type": "Review",
    "itemReviewed": { "@type": "RealEstateAgent", "name": "Dr. Jan Duffy REALTOR" },
    "author": { "@type": "Person", "name": "Maria S." },
    "reviewRating": { "@type": "Rating", "ratingValue": "5" },
    "reviewBody": "Dr. Duffy's insight into Sky Canyon's investment potential was remarkable. She helped us secure a property that has already appreciated significantly. Her market analysis was thorough and accurate.",
    "datePublished": "2023-11-15"
  },
  {
    "@context": "https://schema.org",
    "@type": "Review",
    "itemReviewed": { "@type": "RealEstateAgent", "name": "Dr. Jan Duffy REALTOR" },
    "author": { "@type": "Person", "name": "James P." },
    "reviewRating": { "@type": "Rating", "ratingValue": "5" },
    "reviewBody": "Working with Dr. Duffy in North Las Vegas was exceptional. She showed us properties that perfectly matched our budget and lifestyle, and her negotiation skills saved us thousands.",
    "datePublished": "2023-10-28"
  }
];

const businessSchema = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  "name": "Dr. Jan Duffy REALTOR",
  "image": "",
  "url": "https://rrjanduffyreview.com",
  "email": "jan.duffy@email.com",
  "areaServed": ["Summerlin West", "Lone Mountain", "Sky Canyon", "North Las Vegas"],
  "location": officeLocations.map(loc => ({
    "@type": "PostalAddress",
    "streetAddress": loc.address,
    "addressLocality": "Las Vegas",
    "addressRegion": "NV",
    "addressCountry": "US",
    "telephone": loc.phone
  })),
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5",
    "reviewCount": "8"
  }
};

const ReviewSite = () => {
  // Sample reviews - replace with actual reviews
  const [reviews] = useState([
    {
      id: 1,
      review: "Dr. Duffy's knowledge of Summerlin West is incredible! She helped us find the perfect family home with mountain views. Her expertise in the master-planned community amenities and HOA regulations was invaluable.",
      authorName: "Sarah M.",
      date: "2024-03-15",
      stars: 5,
      location: "Summerlin West"
    },
    {
      id: 2,
      review: "Working with Dr. Jan Duffy in Lone Mountain was the best decision we made. She sold our house in just 10 days and knew exactly which neighborhoods would fit our lifestyle. Her knowledge of the area's growth potential was spot-on.",
      authorName: "Michael R.",
      date: "2024-02-28",
      stars: 5,
      location: "Lone Mountain"
    },
    {
      id: 3,
      review: "Dr. Duffy helped us navigate the Sky Canyon market with confidence. Her understanding of the newer developments and builder relationships made our new construction purchase smooth and stress-free.",
      authorName: "Jennifer L.",
      date: "2024-01-20",
      stars: 5,
      location: "Sky Canyon"
    },
    {
      id: 4,
      review: "As first-time buyers in North Las Vegas, Dr. Duffy educated us about the different neighborhoods and helped us find incredible value. Her knowledge of the area's revitalization and future development plans was impressive.",
      authorName: "David K.",
      date: "2024-01-05",
      stars: 5,
      location: "North Las Vegas"
    },
    {
      id: 5,
      review: "Dr. Duffy's expertise in Summerlin West's luxury market is unmatched. She understood our needs for a custom home and guided us through the entire process with professionalism and market insight.",
      authorName: "Lisa H.",
      date: "2023-12-18",
      stars: 5,
      location: "Summerlin West"
    },
    {
      id: 6,
      review: "Moving from out of state, Dr. Duffy's knowledge of Lone Mountain's family-friendly communities was exactly what we needed. She helped us understand schools, amenities, and neighborhood dynamics perfectly.",
      authorName: "Robert T.",
      date: "2023-12-01",
      stars: 5,
      location: "Lone Mountain"
    },
    {
      id: 7,
      review: "Dr. Duffy's insight into Sky Canyon's investment potential was remarkable. She helped us secure a property that has already appreciated significantly. Her market analysis was thorough and accurate.",
      authorName: "Maria S.",
      date: "2023-11-15",
      stars: 5,
      location: "Sky Canyon"
    },
    {
      id: 8,
      review: "Working with Dr. Duffy in North Las Vegas was exceptional. She showed us properties that perfectly matched our budget and lifestyle, and her negotiation skills saved us thousands.",
      authorName: "James P.",
      date: "2023-10-28",
      stars: 5,
      location: "North Las Vegas"
    }
  ]);

  const [selectedFilter, setSelectedFilter] = useState('all');

  const StarRating = ({ rating }) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={20}
            className={`${star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
          />
        ))}
      </div>
    );
  };

  const averageRating = reviews.reduce((sum, review) => sum + review.stars, 0) / reviews.length;
  const totalReviews = reviews.length;

  const filteredReviews = selectedFilter === 'all' 
    ? reviews 
    : reviews.filter(review => review.stars === parseInt(selectedFilter));

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(businessSchema)
          }}
        />
        {reviewsSchema.map((review, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(review)
            }}
          />
        ))}
      </Head>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-6xl mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Dr. Jan Duffy</h1>
                <p className="text-xl text-blue-600 font-medium">REALTOR</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="flex items-center gap-2">
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

        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-4">Las Vegas Area Real Estate Expert</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Specializing in Summerlin West, Lone Mountain, Sky Canyon, and North Las Vegas. 
              Dr. Jan Duffy provides exceptional local market expertise to help you find the perfect home 
              in Las Vegas's most desirable neighborhoods.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="bg-white/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Home className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Local Market Expertise</h3>
                <p className="text-blue-100">Deep knowledge of Summerlin West, Lone Mountain, Sky Canyon, and North Las Vegas markets</p>
              </div>
              <div className="text-center">
                <div className="bg-white/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Neighborhood Specialist</h3>
                <p className="text-blue-100">Expert guidance on community amenities, schools, and lifestyle fit</p>
              </div>
              <div className="text-center">
                <div className="bg-white/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Award className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Proven Results</h3>
                <p className="text-blue-100">Track record of successful transactions and satisfied clients</p>
              </div>
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Client Reviews</h2>
              <p className="text-lg text-gray-600">See what our clients say about their experience in Las Vegas neighborhoods</p>
            </div>

            {/* Service Areas */}
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-8 mb-8">
              <h3 className="text-2xl font-bold text-center text-gray-900 mb-6">Specialized Service Areas</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <h4 className="font-semibold text-gray-900 mb-2">Summerlin West</h4>
                    <p className="text-sm text-gray-600">Master-planned luxury living with world-class amenities</p>
                  </div>
                </div>
                <div className="text-center">
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <h4 className="font-semibold text-gray-900 mb-2">Lone Mountain</h4>
                    <p className="text-sm text-gray-600">Family-friendly communities with mountain views</p>
                  </div>
                </div>
                <div className="text-center">
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <h4 className="font-semibold text-gray-900 mb-2">Sky Canyon</h4>
                    <p className="text-sm text-gray-600">Newer developments with modern amenities</p>
                  </div>
                </div>
                <div className="text-center">
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <h4 className="font-semibold text-gray-900 mb-2">North Las Vegas</h4>
                    <p className="text-sm text-gray-600">Affordable options with growth potential</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Rating Summary */}
            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
              <div className="flex items-center justify-center gap-8 mb-6">
                <div className="text-center">
                  <div className="text-5xl font-bold text-gray-900 mb-2">
                    {averageRating.toFixed(1)}
                  </div>
                  <StarRating rating={Math.round(averageRating)} />
                  <p className="text-gray-600 mt-2">Based on {totalReviews} reviews</p>
                </div>
              </div>

              {/* Rating Distribution */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {[5, 4, 3, 2, 1].map((rating) => {
                  const count = reviews.filter(r => r.stars === rating).length;
                  const percentage = (count / totalReviews) * 100;
                  
                  return (
                    <div key={rating} className="text-center">
                      <div className="flex items-center justify-center gap-1 mb-2">
                        <span className="text-sm font-medium">{rating}</span>
                        <Star size={16} className="fill-yellow-400 text-yellow-400" />
                      </div>
                      <div className="bg-gray-200 rounded-full h-2 mb-1">
                        <div 
                          className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-600">{count} reviews</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2 mb-8 justify-center">
              <button
                onClick={() => setSelectedFilter('all')}
                className={`px-4 py-2 rounded-full transition-colors ${
                  selectedFilter === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                All Reviews
              </button>
              {[5, 4, 3, 2, 1].map((rating) => (
                <button
                  key={rating}
                  onClick={() => setSelectedFilter(rating.toString())}
                  className={`px-4 py-2 rounded-full transition-colors ${
                    selectedFilter === rating.toString()
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {rating} Stars
                </button>
              ))}
            </div>

            {/* Reviews Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredReviews.map((review) => (
                <div key={review.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <StarRating rating={review.stars} />
                    <span className="text-sm text-gray-500">
                      {new Date(review.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </span>
                  </div>
                  <p className="text-gray-700 mb-4 leading-relaxed">"{review.review}"</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">
                          {review.authorName.charAt(0)}
                        </span>
                      </div>
                      <span className="font-medium text-gray-900">{review.authorName}</span>
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

        {/* Contact Section */}
        <section className="bg-gray-900 text-white py-16">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Our Offices</h2>
            <p className="text-xl text-gray-300 mb-8">
              Contact Dr. Jan Duffy at any of these convenient Las Vegas area locations.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {officeLocations.map((office, idx) => (
                <div key={idx} className="flex flex-col items-center bg-gray-800 rounded-lg p-6 mb-4">
                  <div className="bg-blue-600 rounded-full p-4 mb-4">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{office.name}</h3>
                  <p className="text-gray-300 mb-2">{office.address}</p>
                  <p className="text-gray-300 mb-2">{office.phone}</p>
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

        {/* Footer */}
        <footer className="bg-gray-800 text-white py-8">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <p className="text-gray-400">
              © 2024 Dr. Jan Duffy REALTOR. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default ReviewSite; 