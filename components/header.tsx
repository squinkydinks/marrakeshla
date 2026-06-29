"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Instagram } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true
    if (path !== "/" && pathname.startsWith(path)) return true
    return false
  }

  // Function to handle smooth scrolling to sections
  const scrollToSection = (sectionId: string) => {
    setIsOpen(false)

    // If not on homepage, navigate to homepage with section hash
    if (pathname !== "/") {
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
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-morocco-charcoal/95 backdrop-blur-sm shadow-md py-2" : "bg-transparent py-4",
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <span className="text-2xl font-display font-bold text-morocco-amber">Dar Dmana</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Link
            href="https://www.instagram.com/dardmana_la/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-morocco-amber hover:text-morocco-amber-light transition-colors"
            aria-label="Instagram"
          >
            <Instagram className="h-5 w-5" />
          </Link>
          <Link
            href="/about"
            className={cn(
              "transition-colors text-white",
              isActive("/about") ? "text-morocco-amber font-medium" : "hover:text-morocco-amber",
            )}
          >
            About
          </Link>
          <Link
            href="/menu"
            className={cn(
              "transition-colors text-white",
              isActive("/menu") ? "text-morocco-amber font-medium" : "hover:text-morocco-amber",
            )}
          >
            Menus
          </Link>
          <button
            onClick={() => scrollToSection("services")}
            className="text-white hover:text-morocco-amber transition-colors"
          >
            Services
          </button>
          <Link
            href="/reserve"
            className={cn(
              "transition-colors text-white",
              isActive("/reserve") ? "text-morocco-amber font-medium" : "hover:text-morocco-amber",
            )}
          >
            Reserve
          </Link>
          <button
            onClick={() => scrollToSection("gallery")}
            className="text-white hover:text-morocco-amber transition-colors"
          >
            Gallery
          </button>
          <button
            onClick={() => scrollToSection("testimonials")}
            className="text-white hover:text-morocco-amber transition-colors"
          >
            Testimonials
          </button>
          <Button asChild variant="default" className="bg-morocco-prairie hover:bg-morocco-prairie/90 text-white">
            <Link href="/contact">Contact Us</Link>
          </Button>
        </nav>

        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-morocco-charcoal shadow-lg">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <div className="flex items-center space-x-4">
              <Link
                href="https://www.instagram.com/dardmana_la/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-morocco-amber hover:text-morocco-amber-light transition-colors"
                aria-label="Instagram"
                onClick={() => setIsOpen(false)}
              >
                <Instagram className="h-5 w-5" />
                <span className="ml-2">Instagram</span>
              </Link>
            </div>
            <Link
              href="/about"
              className={cn(
                "py-2 transition-colors text-white",
                isActive("/about") ? "text-morocco-amber font-medium" : "hover:text-morocco-amber",
              )}
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link
              href="/menu"
              className={cn(
                "py-2 transition-colors text-white",
                isActive("/menu") ? "text-morocco-amber font-medium" : "hover:text-morocco-amber",
              )}
              onClick={() => setIsOpen(false)}
            >
              Menus
            </Link>
            <button
              onClick={() => scrollToSection("services")}
              className="text-white hover:text-morocco-amber transition-colors py-2 text-left"
            >
              Services
            </button>
            <Link
              href="/reserve"
              className={cn(
                "py-2 transition-colors text-white",
                isActive("/reserve") ? "text-morocco-amber font-medium" : "hover:text-morocco-amber",
              )}
              onClick={() => setIsOpen(false)}
            >
              Reserve
            </Link>
            <button
              onClick={() => scrollToSection("gallery")}
              className="text-white hover:text-morocco-amber transition-colors py-2 text-left"
            >
              Gallery
            </button>
            <button
              onClick={() => scrollToSection("testimonials")}
              className="text-white hover:text-morocco-amber transition-colors py-2 text-left"
            >
              Testimonials
            </button>
            <Button
              asChild
              variant="default"
              className="bg-morocco-prairie hover:bg-morocco-prairie/90 text-white w-full"
              onClick={() => setIsOpen(false)}
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
