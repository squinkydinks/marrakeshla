import localFont from "next/font/local"

/**
 * Self-hosted brand fonts (downloaded from Google Fonts, latin + arabic subsets).
 * Local files instead of next/font/google so builds never depend on reaching
 * fonts.googleapis.com, and nothing is requested from Google at runtime.
 *
 * Roles (Kufic Modern system + hero accents):
 *   --font-display  Reem Kufi       headings, dish names, labels, buttons, nav
 *   --font-sans     Tajawal         body copy, notes, hours, form text
 *   --font-serif    Cormorant       the hero headline only ("A Night in Morocco.")
 *   --font-label    DM Sans         the hero kicker line
 *   --font-ar       Aref Ruqaa Ink  Arabic accents (a color font: red ink)
 */
export const reemKufi = localFont({
  src: [
    { path: "../app/fonts/ReemKufi-normal-400-700-latin.woff2", weight: "400 700", style: "normal" },
    { path: "../app/fonts/ReemKufi-normal-400-700-arabic.woff2", weight: "400 700", style: "normal" },
  ],
  variable: "--font-display",
  display: "swap",
  fallback: ["Avenir Next", "system-ui", "sans-serif"],
})

export const tajawal = localFont({
  src: [
    { path: "../app/fonts/Tajawal-normal-400-latin.woff2", weight: "400", style: "normal" },
    { path: "../app/fonts/Tajawal-normal-500-latin.woff2", weight: "500", style: "normal" },
    { path: "../app/fonts/Tajawal-normal-700-latin.woff2", weight: "700", style: "normal" },
    { path: "../app/fonts/Tajawal-normal-400-arabic.woff2", weight: "400", style: "normal" },
    { path: "../app/fonts/Tajawal-normal-500-arabic.woff2", weight: "500", style: "normal" },
    { path: "../app/fonts/Tajawal-normal-700-arabic.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-sans",
  display: "swap",
  fallback: ["Avenir Next", "Avenir", "Segoe UI", "system-ui", "sans-serif"],
})

export const cormorant = localFont({
  src: [
    { path: "../app/fonts/CormorantGaramond-normal-500-latin.woff2", weight: "500", style: "normal" },
    { path: "../app/fonts/CormorantGaramond-italic-500-latin.woff2", weight: "500", style: "italic" },
  ],
  variable: "--font-serif",
  display: "swap",
  fallback: ["Georgia", "serif"],
})

export const dmSans = localFont({
  src: [{ path: "../app/fonts/DMSans-normal-500-latin.woff2", weight: "400 700", style: "normal" }],
  variable: "--font-label",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
})

export const arefRuqaaInk = localFont({
  src: [
    { path: "../app/fonts/ArefRuqaaInk-normal-700-arabic.woff2", weight: "700", style: "normal" },
    { path: "../app/fonts/ArefRuqaaInk-normal-700-latin.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-ar",
  display: "swap",
  fallback: ["serif"],
})

export const fontVariables = [reemKufi, tajawal, cormorant, dmSans, arefRuqaaInk].map((f) => f.variable).join(" ")
