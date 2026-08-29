import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ReservationForm } from "@/components/reservation-form"
import { BUSINESS_NAME, OG_IMAGE } from "@/lib/business-info"

const RESERVE_DESCRIPTION =
  "Request Marrakesh LA's catering services for your event. Tell us your date, event type, guest count, and the services you need — we reply within 24 hours."

export const metadata: Metadata = {
  title: "Reserve Catering Services | Marrakesh LA",
  description: RESERVE_DESCRIPTION,
  alternates: {
    canonical: "/reserve",
  },
  openGraph: {
    title: "Reserve Catering Services | Marrakesh LA",
    description: RESERVE_DESCRIPTION,
    url: "/reserve",
    siteName: BUSINESS_NAME,
    locale: "en_US",
    type: "website",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Reserve Catering Services | Marrakesh LA",
    description: RESERVE_DESCRIPTION,
    images: [OG_IMAGE.url],
  },
}

export default function ReservePage() {
  return (
    <main className="min-h-screen bg-morocco-charcoal text-white">
      <Header />

      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-morocco-amber mb-6 text-center">
            Reserve Catering Services
          </h1>
          <p className="text-xl text-center max-w-3xl mx-auto mb-16 text-morocco-givry">
            Complete the form below to reserve Marrakesh LA's catering services for your upcoming event. We'll contact you
            within 24 hours to discuss details.
          </p>

          <ReservationForm />
        </div>
      </section>

      <Footer />
    </main>
  )
}
