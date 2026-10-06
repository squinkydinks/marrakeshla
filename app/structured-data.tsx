import {
  BUSINESS_NAME,
  CHEF_NAME,
  EMAIL,
  GEO,
  GOOGLE_MAPS_URL,
  INSTAGRAM_URL,
  LEGAL_NAME,
  OG_IMAGE,
  OPENING_HOURS_SPECIFICATION,
  OPENTABLE_URL,
  PHONE_E164,
  POSTAL_ADDRESS_SCHEMA,
  SITE_URL,
} from "@/lib/business-info"

/** schema.org wants absolute URLs; OG_IMAGE.url is a site-relative path. */
const absoluteUrl = (url: string) => (/^https?:\/\//.test(url) ? url : `${SITE_URL}${url.startsWith("/") ? "" : "/"}${url}`)

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
    description: "Moroccan restaurant on Melrose Avenue in Los Angeles, serving lunch and dinner daily, with private dining and catering.",
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
     * The dining room is open (since OPENING_DATE) and tables are booked through
     * OpenTable, so the reservation capability now points at a real booking URL.
     * Catering enquiries are a separate flow on /catering.
     */
    acceptsReservations: OPENTABLE_URL,
    servesCuisine: "Moroccan",
    // No priceRange: the site publishes no prices, by owner rule. Add it back only if the owner approves.
    openingHoursSpecification: OPENING_HOURS_SPECIFICATION,
    image: absoluteUrl(OG_IMAGE.url),
    founder: {
      "@type": "Person",
      name: CHEF_NAME,
    },
    /*
     * No aggregateRating / review here, deliberately: Google does not show
     * review rich results for a LocalBusiness's reviews of itself, and treats
     * self-serving review markup as a spam signal.
     */
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
