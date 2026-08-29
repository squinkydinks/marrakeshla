import { AboutSection } from "@/components/about-section"
import { ContactForm } from "@/components/contact-form"
import { Footer } from "@/components/footer"
import { HashScroll } from "@/components/hash-scroll"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { InstagramGallery } from "@/components/instagram-gallery"
import { ServicesSection } from "@/components/services-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { PrefetchManager } from "@/components/prefetch-manager"
import generateStructuredData from "./structured-data"

export default function Home() {
  return (
    <main className="min-h-screen">
      {/*
        Rendered server-side, on purpose. This block used to be appended to
        document.head from a useEffect, which meant the served HTML contained no
        JSON-LD at all — the markup only existed after client-side hydration.
        For a single-location restaurant, local search is the acquisition
        channel, so this has to be in the initial response.
      */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateStructuredData()) }}
      />
      <HashScroll />
      <PrefetchManager />
      <Header />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <InstagramGallery />
      <TestimonialsSection />
      <ContactForm />
      <Footer />
    </main>
  )
}
