import type React from "react"
import type { Metadata } from "next"
import { Montserrat, Playfair_Display } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { DataProvider } from "@/components/data-provider"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { BUSINESS_NAME, OG_IMAGE, SITE_URL } from "@/lib/business-info"

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

export const metadata: Metadata = {
  title: "Marrakesh LA | Authentic Moroccan Catering in Los Angeles",
  description:
    "Experience exceptional, authentic Moroccan cuisine with Marrakesh LA's premium catering services for weddings, corporate events, and private dining in Los Angeles.",
  keywords: [
    "Moroccan catering",
    "Los Angeles catering",
    "authentic Moroccan food",
    "wedding catering",
    "corporate event food",
    "private chef",
    "Moroccan cuisine",
    "Chef Hisham",
    "tagine catering",
    "Mediterranean food",
  ],
  authors: [{ name: "Chef Hisham Foual" }],
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
    title: "Marrakesh LA | Authentic Moroccan Catering in Los Angeles",
    description:
      "Premium Moroccan catering services for weddings, corporate events, and private dining in Los Angeles.",
    url: "/",
    siteName: BUSINESS_NAME,
    locale: "en_US",
    type: "website",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Marrakesh LA | Authentic Moroccan Catering",
    description: "Premium Moroccan catering services in Los Angeles",
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
    generator: 'v0.dev'
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
    <html lang="en" suppressHydrationWarning>
      <body className={`${montserrat.variable} ${playfair.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <DataProvider>{children}</DataProvider>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
