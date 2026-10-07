import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import "./redesign.css"
import { fontVariables } from "@/lib/fonts"
import { ThemeProvider } from "@/components/theme-provider"
import { DataProvider } from "@/components/data-provider"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { MetaPixel } from "@/components/meta-pixel"
import { BUSINESS_NAME, OG_IMAGE, SITE_URL } from "@/lib/business-info"

export const metadata: Metadata = {
  title: "Marrakesh LA | Moroccan Restaurant on Melrose Avenue, Los Angeles",
  description:
    "Marrakesh LA (Riad Al Maghrib) is a Moroccan restaurant at 7469 Melrose Avenue. Chef Hicham Foual's tagines, couscous, bastilla and mint tea in a courtyard house. Open daily 11 am–11 pm. Catering and private events.",
  keywords: [
    "Moroccan restaurant Los Angeles",
    "Moroccan restaurant Melrose",
    "Moroccan catering",
    "Los Angeles catering",
    "authentic Moroccan food",
    "wedding catering",
    "corporate event food",
    "private chef",
    "Moroccan cuisine",
    "Chef Hicham Foual",
    "tagine catering",
    "Mediterranean food",
  ],
  authors: [{ name: "Chef Hicham Foual" }],
  creator: BUSINESS_NAME,
  publisher: BUSINESS_NAME,
  /** Lets every route express its canonical and og:url as a root-relative path. */
  metadataBase: new URL(SITE_URL),
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  /**
   * This canonical is INHERITED, not derived per route: any page that does not
   * declare its own `alternates.canonical` points at "/" and asks Google to drop
   * itself from the index in favour of the homepage. Every route under app/ must
   * set its own. Only the homepage may rely on this value.
   */
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Marrakesh LA | A Night in Morocco on Melrose",
    description:
      "Moroccan restaurant and courtyard at 7469 Melrose Avenue, Los Angeles. Rated 4.9 on Google. Catering and private events.",
    url: "/",
    siteName: BUSINESS_NAME,
    locale: "en_US",
    type: "website",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Marrakesh LA | A Night in Morocco on Melrose",
    description: "Moroccan restaurant and courtyard on Melrose Avenue, Los Angeles.",
    images: [OG_IMAGE.url],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // No hand-written <head> block. A hardcoded <link rel="canonical"> here used to
  // be emitted alongside the one Next.js renders from `metadata.alternates`, so
  // every page shipped two canonical tags — and both named the homepage.
  // Canonicals belong in each route's metadata export, one per route.
  return (
    // Font variables go on <html>, not <body>: redesign.css defines --display/--sans/--ar
    // on :root as var(--font-*), and custom properties resolve where they are declared,
    // so the --font-* vars must exist on the root element or every font falls back to Times.
    <html lang="en" className={fontVariables} suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem disableTransitionOnChange>
          <DataProvider>{children}</DataProvider>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
        <MetaPixel />
      </body>
    </html>
  )
}
