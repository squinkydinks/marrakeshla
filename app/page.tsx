"use client"

import { useEffect } from "react"
import { AboutSection } from "@/components/about-section"
import { ContactForm } from "@/components/contact-form"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { InstagramGallery } from "@/components/instagram-gallery"
import { ServicesSection } from "@/components/services-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { PrefetchManager } from "@/components/prefetch-manager"
import generateStructuredData from "./structured-data"
import generateReviewStructuredData from "./review-structured-data"

export default function Home() {
  // Handle hash navigation when the page loads
  useEffect(() => {
    // Check if there's a hash in the URL
    if (window.location.hash) {
      // Get the element with the ID from the hash (remove the # character)
      const id = window.location.hash.substring(1)
      const element = document.getElementById(id)

      // If the element exists, scroll to it after a short delay
      // The delay ensures the page is fully loaded
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" })
        }, 500)
      }
    }
  }, [])

  // Add structured data for SEO
  useEffect(() => {
    // Business structured data
    const businessScript = document.createElement("script")
    businessScript.type = "application/ld+json"
    businessScript.text = JSON.stringify(generateStructuredData())
    document.head.appendChild(businessScript)

    // Review structured data
    const reviewScript = document.createElement("script")
    reviewScript.type = "application/ld+json"
    reviewScript.text = JSON.stringify(generateReviewStructuredData())
    document.head.appendChild(reviewScript)

    return () => {
      document.head.removeChild(businessScript)
      document.head.removeChild(reviewScript)
    }
  }, [])

  return (
    <main className="min-h-screen">
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
