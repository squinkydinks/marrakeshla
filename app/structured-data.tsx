import {
  BUSINESS_NAME,
  EMAIL,
  GEO,
  GOOGLE_MAPS_URL,
  PHONE_E164,
  POSTAL_ADDRESS_SCHEMA,
  SITE_URL,
} from "@/lib/business-info"

/**
 * The site's single schema.org entity.
 *
 * There used to be a second, overlapping LocalBusiness blob in
 * review-structured-data.tsx describing the same business. Two competing entity
 * declarations on one page make it ambiguous which one a crawler should treat as
 * canonical, so they are merged here. That file also carried an invented
 * aggregateRating and two fabricated reviews, which have been removed rather
 * than promoted into the server-rendered HTML — see the note in the PR.
 */
export default function generateStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "FoodEstablishment",
    "@id": `${SITE_URL}/#business`,
    name: BUSINESS_NAME,
    description: "Authentic Moroccan catering services in Los Angeles",
    url: SITE_URL,
    telephone: PHONE_E164,
    email: EMAIL,
    address: POSTAL_ADDRESS_SCHEMA,
    geo: {
      "@type": "GeoCoordinates",
      latitude: GEO.latitude,
      longitude: GEO.longitude,
    },
    hasMap: GOOGLE_MAPS_URL,
    servesCuisine: ["Moroccan", "Mediterranean", "Middle Eastern"],
    priceRange: "$$",
    openingHours: "Mo-Su 09:00-21:00",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/AdobeStock_481579543-jQc5dAuzFD18FroU7ZW2OuFgMbBWzM.jpeg",
    founder: {
      "@type": "Person",
      name: "Chef Hisham Foual",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Catering Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Wedding Catering",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Corporate Event Catering",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Private Dining",
          },
        },
      ],
    },
  }
}
