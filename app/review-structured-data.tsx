export default function generateReviewStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Dar Dmana",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/AdobeStock_481579543-jQc5dAuzFD18FroU7ZW2OuFgMbBWzM.jpeg",
    url: "https://www.dardmana.com",
    telephone: "(310) 993-7440",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Los Angeles",
      addressRegion: "CA",
      postalCode: "90036",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 34.0736, // Replace with actual coordinates
      longitude: -118.3444, // Replace with actual coordinates
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
          "Dar Dmana transformed our wedding reception into an unforgettable Moroccan feast. The flavors were authentic and the presentation was stunning. Our guests are still talking about it months later!",
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
          "Working with Dar Dmana for our annual client appreciation dinner was a fantastic decision. Their attention to detail and ability to accommodate our dietary restrictions while maintaining authentic Moroccan flavors impressed everyone.",
      },
    ],
  }
}
