"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Instagram } from "lucide-react"
import { INSTAGRAM_URL } from "@/lib/business-info"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const MOBILE_MENU_ID = "mobile-navigation"

// Every interactive element in the header sits on either the charcoal bar or a
// photo, so the default cream ring offset is invisible. Pin it to charcoal.
const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-morocco-amber focus-visible:ring-offset-2 focus-visible:ring-offset-morocco-charcoal rounded-sm"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const toggleRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Escape must dismiss the mobile menu and hand focus back to the control that
  // opened it, otherwise keyboard users are stranded behind an overlay panel.
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return
      setIsOpen(false)
      toggleRef.current?.focus()
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isOpen])

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

    // If on homepage, scroll to the section. CSS cannot suppress a JS-driven
    // smooth scroll, so the reduced-motion preference is checked here.
    const section = document.getElementById(sectionId)
    if (section) {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      section.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" })
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
        <Link href="/" className={cn("flex items-center", FOCUS_RING)}>
          <span className="text-2xl font-display font-bold text-morocco-amber">Marrakesh LA</span>
        </Link>

        <nav aria-label="Primary" className="hidden md:flex items-center space-x-6">
          <Link
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={cn("text-morocco-amber hover:text-morocco-amber-light transition-colors", FOCUS_RING)}
            aria-label="Marrakesh LA on Instagram (opens in a new tab)"
          >
            <Instagram className="h-5 w-5" aria-hidden="true" />
          </Link>
          <Link
            href="/about"
            aria-current={isActive("/about") ? "page" : undefined}
            className={cn(
              "transition-colors text-white",
              isActive("/about") ? "text-morocco-amber font-medium" : "hover:text-morocco-amber",
              FOCUS_RING,
            )}
          >
            About
          </Link>
          <Link
            href="/menu"
            aria-current={isActive("/menu") ? "page" : undefined}
            className={cn(
              "transition-colors text-white",
              isActive("/menu") ? "text-morocco-amber font-medium" : "hover:text-morocco-amber",
              FOCUS_RING,
            )}
          >
            Menus
          </Link>
          <button
            onClick={() => scrollToSection("services")}
            className={cn("text-white hover:text-morocco-amber transition-colors", FOCUS_RING)}
          >
            Services
          </button>
          <Link
            href="/reserve"
            aria-current={isActive("/reserve") ? "page" : undefined}
            className={cn(
              "transition-colors text-white",
              isActive("/reserve") ? "text-morocco-amber font-medium" : "hover:text-morocco-amber",
              FOCUS_RING,
            )}
          >
            Reserve
          </Link>
          <button
            onClick={() => scrollToSection("gallery")}
            className={cn("text-white hover:text-morocco-amber transition-colors", FOCUS_RING)}
          >
            Gallery
          </button>
          <Button asChild variant="default" className="bg-morocco-prairie hover:bg-morocco-prairie/90 text-white transition-[transform,background-color] duration-150 ease-out active:scale-[0.98] motion-reduce:transform-none motion-reduce:transition-none">
            <Link href="/contact">Contact Us</Link>
          </Button>
        </nav>

        <button
          ref={toggleRef}
          type="button"
          className={cn("md:hidden text-white", FOCUS_RING)}
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
          aria-controls={MOBILE_MENU_ID}
        >
          {isOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <nav
          id={MOBILE_MENU_ID}
          aria-label="Mobile"
          className="mobile-nav-panel md:hidden absolute top-full left-0 right-0 bg-morocco-charcoal shadow-lg"
        >
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <div className="flex items-center space-x-4">
              <Link
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "flex items-center text-morocco-amber hover:text-morocco-amber-light transition-colors",
                  FOCUS_RING,
                )}
                onClick={() => setIsOpen(false)}
              >
                <Instagram className="h-5 w-5" aria-hidden="true" />
                <span className="ml-2">Instagram</span>
              </Link>
            </div>
            <Link
              href="/about"
              aria-current={isActive("/about") ? "page" : undefined}
              className={cn(
                "py-2 transition-colors text-white",
                isActive("/about") ? "text-morocco-amber font-medium" : "hover:text-morocco-amber",
                FOCUS_RING,
              )}
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link
              href="/menu"
              aria-current={isActive("/menu") ? "page" : undefined}
              className={cn(
                "py-2 transition-colors text-white",
                isActive("/menu") ? "text-morocco-amber font-medium" : "hover:text-morocco-amber",
                FOCUS_RING,
              )}
              onClick={() => setIsOpen(false)}
            >
              Menus
            </Link>
            <button
              onClick={() => scrollToSection("services")}
              className={cn("text-white hover:text-morocco-amber transition-colors py-2 text-left", FOCUS_RING)}
            >
              Services
            </button>
            <Link
              href="/reserve"
              aria-current={isActive("/reserve") ? "page" : undefined}
              className={cn(
                "py-2 transition-colors text-white",
                isActive("/reserve") ? "text-morocco-amber font-medium" : "hover:text-morocco-amber",
                FOCUS_RING,
              )}
              onClick={() => setIsOpen(false)}
            >
              Reserve
            </Link>
            <button
              onClick={() => scrollToSection("gallery")}
              className={cn("text-white hover:text-morocco-amber transition-colors py-2 text-left", FOCUS_RING)}
            >
              Gallery
            </button>
            <Button
              asChild
              variant="default"
              className="bg-morocco-prairie hover:bg-morocco-prairie/90 text-white w-full transition-[transform,background-color] duration-150 ease-out active:scale-[0.98] motion-reduce:transform-none motion-reduce:transition-none"
              onClick={() => setIsOpen(false)}
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </nav>
      )}
    </header>
  )
}
