import type React from "react"
import type { Metadata } from "next"
import { Montserrat, Playfair_Display } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { DataProvider } from "@/components/data-provider"

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
  creator: "Marrakesh LA",
  publisher: "Marrakesh LA",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "https://www.marrakeshla.com",
  },
  openGraph: {
    title: "Marrakesh LA | Authentic Moroccan Catering in Los Angeles",
    description:
      "Premium Moroccan catering services for weddings, corporate events, and private dining in Los Angeles.",
    url: "https://www.marrakeshla.com",
    siteName: "Marrakesh LA",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/AdobeStock_481579543-jQc5dAuzFD18FroU7ZW2OuFgMbBWzM.jpeg",
        width: 1200,
        height: 630,
        alt: "Authentic Moroccan cuisine by Marrakesh LA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Marrakesh LA | Authentic Moroccan Catering",
    description: "Premium Moroccan catering services in Los Angeles",
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/AdobeStock_481579543-jQc5dAuzFD18FroU7ZW2OuFgMbBWzM.jpeg",
    ],
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
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="canonical" href="https://www.marrakeshla.com" />
      </head>
      <body className={`${montserrat.variable} ${playfair.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <DataProvider>{children}</DataProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
