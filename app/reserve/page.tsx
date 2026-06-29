import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ReservationForm } from "@/components/reservation-form"

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
            Complete the form below to reserve Dar Dmana's catering services for your upcoming event. We'll contact you
            within 24 hours to discuss details.
          </p>

          <ReservationForm />
        </div>
      </section>

      <Footer />
    </main>
  )
}
