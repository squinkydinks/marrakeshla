/**
 * inKind reward popup.
 *
 * inKind is the restaurant's financing partner. Diners who pay through the inKind
 * app earn credit toward their next visit; the popup tells first-time visitors
 * about it and sends them to the offer page inKind builds for us.
 *
 * The offer URL arrives from inKind's onboarding specialist ON launch day, so it
 * is not hardcoded. Set NEXT_PUBLIC_INKIND_OFFER_URL in Vercel (Production) and
 * redeploy; until then the popup renders nothing. NEXT_PUBLIC_* values are inlined
 * at build time, which is why a redeploy — not just saving the variable — is needed.
 *
 * Copy follows inKind's partner template verbatim so the offer wording matches
 * what diners see inside the app.
 */
export const INKIND_OFFER_URL = (process.env.NEXT_PUBLIC_INKIND_OFFER_URL || "").trim()

/** True only when a real https URL has been configured. Guards against typos like "TBD". */
export const INKIND_ENABLED = /^https:\/\/\S+$/i.test(INKIND_OFFER_URL)

export const INKIND_COPY = {
  eyebrow: "A gift from the house",
  title: "Unlock a Special Reward Toward your Next Visit",
  description: "Click the button below to unlock a special reward at Marrakesh LA when you pay using the inKind app.",
  cta: "Claim Your Reward",
  dismiss: "Maybe later",
} as const

/** sessionStorage key: the popup shows once per browser session, then stays closed. */
export const INKIND_SEEN_KEY = "mla-inkind-seen"

/** Delay before the popup opens, in milliseconds. Long enough to read the hero first. */
export const INKIND_OPEN_DELAY_MS = 6000

/** Routes where an offer popup would be out of place. */
export const INKIND_EXCLUDED_PATHS = ["/privacy"]
