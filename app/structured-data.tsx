export default function generateStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "FoodEstablishment",
    name: "Marrakesh LA",
    description: "Authentic Moroccan catering services in Los Angeles",
    url: "https://www.marrakeshla.com",
    telephone: "(310) 993-7440",
    email: "info@marrakeshla.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Los Angeles",
      addressRegion: "CA",
      postalCode: "90036",
      addressCountry: "US",
    },
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
