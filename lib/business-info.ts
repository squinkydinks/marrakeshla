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

/** ISO date the restaurant opens to the public. */
export const OPENING_DATE = "2026-09-15"

/** What the site says about hours until the doors actually open. */
export const HOURS_DISPLAY = "Coming September 15th"

/**
 * Service hours: 11am-11pm, seven days a week.
 *
 * `validFrom` is the important field. Publishing bare hours for a restaurant
 * that does not open until OPENING_DATE tells Google the room is open right
 * now, which earns "permanently closed" edits and one-star reviews from people
 * who drove to a locked door. Scoping the specification to the opening date
 * states the hours honestly without claiming they are in effect yet.
 */
export const HOURS = {
  /** 24-hour times, the format schema.org requires. */
  opens: "11:00",
  closes: "23:00",
} as const

export const OPENING_HOURS_SPECIFICATION = {
  "@type": "OpeningHoursSpecification",
  dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
  opens: HOURS.opens,
  closes: HOURS.closes,
  validFrom: OPENING_DATE,
} as const

/**
 * Instagram. Previously the handle was hardcoded in ten places across four
 * files and still pointed at the pre-rebrand Dar Dmana account long after the
 * rebrand shipped — which is precisely why it lives here now.
 */
export const INSTAGRAM_HANDLE = "marrakeshlarestaurant"
export const INSTAGRAM_URL = `https://www.instagram.com/${INSTAGRAM_HANDLE}/`

/**
 * Direct "leave a review" link for the Google Business Profile listing.
 *
 * The trailing token is the listing's place ID, which is not derivable from the
 * business name or address — GOOGLE_MAPS_URL above is only a search query and is
 * not a substitute. This URL previously existed solely inside two components that
 * were deleted for carrying fabricated testimonials, and it very nearly went with
 * them. It is real, verified business data; it is kept here so the review call to
 * action can be restored after opening, once there are genuine reviews to ask for.
 */
export const GOOGLE_REVIEW_URL = "https://g.page/r/CXNzeDJG56RRECA/review"

/**
 * The share card image used for Open Graph and Twitter previews.
 *
 * It lives here because Next.js replaces the `openGraph` / `twitter` objects
 * wholesale when a route redeclares them — it does not deep-merge them with the
 * root layout's — so every route that sets its own title must also name the
 * image or silently ship a preview with no picture. One URL, five call sites.
 */
export const OG_IMAGE = {
  url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/AdobeStock_481579543-jQc5dAuzFD18FroU7ZW2OuFgMbBWzM.jpeg",
  width: 1200,
  height: 630,
  alt: `Authentic Moroccan cuisine by ${BUSINESS_NAME}`,
} as const

/** Shape expected by schema.org PostalAddress. */
export const POSTAL_ADDRESS_SCHEMA = {
  "@type": "PostalAddress",
  streetAddress: ADDRESS.street,
  addressLocality: ADDRESS.locality,
  addressRegion: ADDRESS.region,
  postalCode: ADDRESS.postalCode,
  addressCountry: ADDRESS.country,
} as const
