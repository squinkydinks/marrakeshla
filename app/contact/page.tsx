import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ContactForm } from "@/components/contact-form"
import { ADDRESS_ONE_LINE, BUSINESS_NAME, OG_IMAGE, PHONE_DISPLAY } from "@/lib/business-info"

const CONTACT_DESCRIPTION = `Send a catering enquiry to Chef Hisham and the Marrakesh LA team, or reach us by phone at ${PHONE_DISPLAY}. Find us at ${ADDRESS_ONE_LINE}.`

export const metadata: Metadata = {
  title: "Contact | Marrakesh LA Moroccan Catering in Los Angeles",
  description: CONTACT_DESCRIPTION,
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact | Marrakesh LA Moroccan Catering in Los Angeles",
    description: CONTACT_DESCRIPTION,
    url: "/contact",
    siteName: BUSINESS_NAME,
    locale: "en_US",
    type: "website",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact | Marrakesh LA",
    description: CONTACT_DESCRIPTION,
    images: [OG_IMAGE.url],
  },
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-morocco-charcoal text-white">
      <Header />

      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-morocco-amber mb-6 text-center">
            Contact Us
          </h1>
          <p className="text-xl text-center max-w-3xl mx-auto mb-16 text-morocco-givry">
            Get in touch with Chef Hisham and the Marrakesh LA team to discuss your catering needs and bring the authentic
            flavors of Morocco to your next event.
          </p>

          <ContactForm />
        </div>
      </section>

      <Footer />
    </main>
  )
}
