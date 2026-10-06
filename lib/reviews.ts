/**
 * Short excerpts quoted verbatim from public Google reviews of Marrakesh LA
 * (7469 Melrose Ave), collected October 2026. First name + last initial only.
 * Keep these real: never paraphrase into a quote or invent one. Update RATING and
 * REVIEW_COUNT from the Google Business Profile when refreshing.
 */
export const RATING = 4.9
export const REVIEW_COUNT = 60
export const GOOGLE_PLACE_ID = "ChIJb_eS3CO_woAR9HMxQVFNhuU"
export const GOOGLE_REVIEWS_URL = `https://search.google.com/local/reviews?placeid=${GOOGLE_PLACE_ID}`
export const GOOGLE_WRITE_REVIEW_URL = `https://search.google.com/local/writereview?placeid=${GOOGLE_PLACE_ID}`

export const FEATURED_REVIEW = {
  quote: "Marrakesh is one of those rare places that stays in your heart long after you leave.",
  author: "Majed M.",
}

export const REVIEWS: { quote: string; author: string; guide?: boolean }[] = [
  { quote: "The hospitality was truly legendary.", author: "Ahmad I.", guide: true },
  { quote: "As someone from Morocco, I can honestly say the food was delicious and truly authentic!", author: "Sofia C." },
  { quote: "Lamb tagine was also tender and meat fell right off the bone.", author: "Colleen Z.", guide: true },
  { quote: "Presentation was superb & the service was exceptional!", author: "Jen D.", guide: true },
  { quote: "It turned out to be the highlight of the trip!", author: "Quincy E.", guide: true },
  { quote: "…the Branzino stole our hearts!", author: "Amira M." },
  { quote: "A hidden gem on Melrose Ave!", author: "Lenore F." },
  { quote: "I am from Morocco and tend to be very picky… This place exceeded my expectations!", author: "Maggy B." },
  { quote: "It honestly felt like home.", author: "Salah E." },
]
