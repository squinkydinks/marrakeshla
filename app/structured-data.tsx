import { BUSINESS_NAME, EMAIL, POSTAL_ADDRESS_SCHEMA, PRIMARY_PHONE, SITE_URL } from "@/lib/business-info"

export default function generateStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "FoodEstablishment",
    name: BUSINESS_NAME,
    description: "Authentic Moroccan catering services in Los Angeles",
    url: SITE_URL,
    telephone: PRIMARY_PHONE,
    email: EMAIL,
    address: POSTAL_ADDRESS_SCHEMA,
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
