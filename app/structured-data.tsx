import {
  BUSINESS_NAME,
  EMAIL,
  GEO,
  GOOGLE_MAPS_URL,
  INSTAGRAM_URL,
  LEGAL_NAME,
  OG_IMAGE,
  OPENING_HOURS_SPECIFICATION,
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
    /*
     * Restaurant, not the parent FoodEstablishment type. Google's rich-result
     * handling for restaurants (menu link, reservation affordance, hours) keys
     * off the specific subtype; the generic parent gets none of it.
     */
    "@type": "Restaurant",
    "@id": `${SITE_URL}/#business`,
    name: BUSINESS_NAME,
    legalName: LEGAL_NAME,
    description: "Authentic Moroccan catering services in Los Angeles",
    url: SITE_URL,
    telephone: PHONE_E164,
    email: EMAIL,
    /** The Instagram account is the only profile that belongs to this entity. */
    sameAs: [INSTAGRAM_URL],
    address: POSTAL_ADDRESS_SCHEMA,
    geo: {
      "@type": "GeoCoordinates",
      latitude: GEO.latitude,
      longitude: GEO.longitude,
    },
    hasMap: GOOGLE_MAPS_URL,
    hasMenu: `${SITE_URL}/menu`,
    /*
     * acceptsReservations is deliberately OMITTED, not set to true.
     *
     * There is no table-booking mechanism on this site — /reserve takes catering
     * enquiries — and the dining room does not open until OPENING_DATE. Declaring
     * the capability would let Google surface a "reserve a table" affordance that
     * lands diners on the wrong form, which is the same defect as the fabricated
     * review markup this site already had to remove: structured data asserting
     * something untrue. Add it, pointing at a real booking URL, when one exists.
     */
    servesCuisine: ["Moroccan", "Mediterranean", "Middle Eastern"],
    priceRange: "$$",
    openingHoursSpecification: OPENING_HOURS_SPECIFICATION,
    image: OG_IMAGE.url,
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
