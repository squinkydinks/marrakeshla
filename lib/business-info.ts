/**
 * Single source of truth for Marrakesh LA's NAP (Name / Address / Phone) data.
 *
 * Local SEO depends on this information being byte-identical everywhere it
 * appears — the site footer, the contact page, and the schema.org JSON-LD must
 * agree with the Google Business Profile listing exactly. Historically these
 * strings were copy-pasted into four separate files and drifted during the
 * Dar Dmana -> Marrakesh LA rebrand. Import from here instead of retyping.
 */

export const BUSINESS_NAME = "Marrakesh LA"
export const LEGAL_NAME = "Marrakesh-LA, LLC"

export const ADDRESS = {
  street: "7469 Melrose Avenue",
  locality: "Los Angeles",
  region: "CA",
  postalCode: "90046",
  country: "US",
} as const

/** "7469 Melrose Avenue, Los Angeles, CA 90046" — for meta tags and map links. */
export const ADDRESS_ONE_LINE = `${ADDRESS.street}, ${ADDRESS.locality}, ${ADDRESS.region} ${ADDRESS.postalCode}`

/** "Los Angeles, CA 90046" — the second line of a two-line postal display. */
export const ADDRESS_CITY_LINE = `${ADDRESS.locality}, ${ADDRESS.region} ${ADDRESS.postalCode}`

/**
 * Approximate coordinates for the 7400 block of Melrose Avenue.
 *
 * TODO(pre-launch): replace with the exact latitude/longitude from the Google
 * Business Profile listing once the storefront is verified. Mismatched geo data
 * suppresses the map pin in local search results.
 */
export const GEO = {
  latitude: 34.0838,
  longitude: -118.3513,
} as const

export const GOOGLE_MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${BUSINESS_NAME}, ${ADDRESS_ONE_LINE}`,
)}`

/**
 * The single published number for the restaurant. This must match the Google
 * Business Profile listing exactly — a second number competing with it in the
 * wild splits local-search signal, which is why there is only one here.
 */
export const PHONE_DISPLAY = "(323) 653-2874"

/** E.164 form. Required by schema.org and by tel: links so mobile dialers work. */
export const PHONE_E164 = "+13236532874"

export const PHONE_HREF = `tel:${PHONE_E164}`

export const EMAIL = "info@marrakeshla.com"
export const SITE_URL = "https://www.marrakeshla.com"

/** Shape expected by schema.org PostalAddress. */
export const POSTAL_ADDRESS_SCHEMA = {
  "@type": "PostalAddress",
  streetAddress: ADDRESS.street,
  addressLocality: ADDRESS.locality,
  addressRegion: ADDRESS.region,
  postalCode: ADDRESS.postalCode,
  addressCountry: ADDRESS.country,
} as const
