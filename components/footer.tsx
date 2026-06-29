"use client"

import Link from "next/link"
import { Instagram } from "lucide-react"

export function Footer() {
  // Function to handle smooth scrolling to sections
  const scrollToSection = (sectionId: string) => {
    // If not on homepage, navigate to homepage with section hash
    if (window.location.pathname !== "/") {
      window.location.href = `/#${sectionId}`
      return
    }

    // If on homepage, scroll to the section
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <footer className="bg-morocco-prairie-dark text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-display font-bold mb-4 text-morocco-amber">Dar Dmana</h3>
            <p className="mb-4 text-morocco-givry">
              Bringing the authentic flavors of Morocco to your special events with passion, tradition, and exceptional
              service.
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://www.instagram.com/dardmana_la/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-morocco-amber transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 text-morocco-amber">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="hover:text-morocco-amber transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("services")}
                  className="hover:text-morocco-amber transition-colors text-white bg-transparent border-none p-0 cursor-pointer"
                >
                  Our Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("gallery")}
                  className="hover:text-morocco-amber transition-colors text-white bg-transparent border-none p-0 cursor-pointer"
                >
                  Gallery
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("testimonials")}
                  className="hover:text-morocco-amber transition-colors text-white bg-transparent border-none p-0 cursor-pointer"
                >
                  Testimonials
                </button>
              </li>
              <li>
                <Link href="/contact" className="hover:text-morocco-amber transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 text-morocco-amber">Contact Information</h3>
            <address className="not-italic space-y-2 text-morocco-givry">
              <p>Coming Soon</p>
              <p>Los Angeles, CA 90036</p>
              <p>Phone: (310) 993-7440</p>
              <p>Phone: (310) 779-5691</p>
              <p>Email: info@dardmana.com</p>
            </address>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center">
          <p>&copy; {new Date().getFullYear()} Dar Dmana. All rights reserved.</p>
          <p className="text-sm mt-2">
            <span className="text-morocco-amber font-display">"Authentic Moroccan Cuisine for Every Occasion"</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
