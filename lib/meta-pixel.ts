/**
 * Meta (Facebook) Pixel.
 *
 * The pixel ID is public: it ships in every page's HTML. It can be overridden with
 * NEXT_PUBLIC_META_PIXEL_ID without a code change.
 *
 * The pixel only loads on the production deployment (marrakeshla.com). Preview
 * deployments and local dev would otherwise fill Meta's reports with test traffic.
 * NEXT_PUBLIC_VERCEL_ENV is set by Vercel because the project exposes system env vars.
 */
export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || "1583578176150813"

export const META_PIXEL_ENABLED = process.env.NEXT_PUBLIC_VERCEL_ENV === "production" && META_PIXEL_ID !== ""

/** localStorage key set by the "opt out" button on /privacy. */
export const META_OPT_OUT_KEY = "mla-ad-tracking-opt-out"

/**
 * True when this visitor has said no to ad tracking: either through the button on
 * /privacy, or with Global Privacy Control (a browser setting California law says
 * we must treat as an opt-out of sharing).
 */
export function hasOptedOutOfAdTracking(): boolean {
  if (typeof window === "undefined") return true
  if ((navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl === true) return true
  try {
    return window.localStorage.getItem(META_OPT_OUT_KEY) === "1"
  } catch {
    return false
  }
}

type Fbq = (command: "track" | "trackCustom" | "init", event: string, params?: Record<string, unknown>) => void

/**
 * Send a standard Meta event (PageView, Lead, Contact, Schedule...). Safe to call
 * anywhere: does nothing when the pixel is disabled, blocked by an ad blocker or
 * not loaded yet. Never pass personal details (names, emails, phone numbers).
 */
export function trackMetaEvent(event: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return
  const fbq = (window as unknown as { fbq?: Fbq }).fbq
  if (typeof fbq === "function") fbq("track", event, params)
}
