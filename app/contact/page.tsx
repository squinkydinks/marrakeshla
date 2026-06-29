import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ContactForm } from "@/components/contact-form"

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
            Get in touch with Chef Yasmine and the Dar Dmana team to discuss your catering needs and bring the authentic
            flavors of Morocco to your next event.
          </p>

          <ContactForm />
        </div>
      </section>

      <Footer />
    </main>
  )
}
