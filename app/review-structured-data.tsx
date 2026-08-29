import { BUSINESS_NAME, GEO, POSTAL_ADDRESS_SCHEMA, PRIMARY_PHONE, SITE_URL } from "@/lib/business-info"

export default function generateReviewStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: BUSINESS_NAME,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/AdobeStock_481579543-jQc5dAuzFD18FroU7ZW2OuFgMbBWzM.jpeg",
    url: SITE_URL,
    telephone: PRIMARY_PHONE,
    address: POSTAL_ADDRESS_SCHEMA,
    geo: {
      "@type": "GeoCoordinates",
      latitude: GEO.latitude,
      longitude: GEO.longitude,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: "15", // Update with actual review count
    },
    review: [
      {
        "@type": "Review",
        author: {
          "@type": "Person",
          name: "Sarah Johnson",
        },
        datePublished: "2023-09-15",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
        },
        reviewBody:
          "Marrakesh LA transformed our wedding reception into an unforgettable Moroccan feast. The flavors were authentic and the presentation was stunning. Our guests are still talking about it months later!",
      },
      {
        "@type": "Review",
        author: {
          "@type": "Person",
          name: "Michael Chen",
        },
        datePublished: "2023-10-22",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
        },
        reviewBody:
          "Working with Marrakesh LA for our annual client appreciation dinner was a fantastic decision. Their attention to detail and ability to accommodate our dietary restrictions while maintaining authentic Moroccan flavors impressed everyone.",
      },
    ],
  }
}
