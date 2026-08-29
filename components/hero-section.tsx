import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center">
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40 z-10"
          style={{ mixBlendMode: "multiply" }}
        />
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/AdobeStock_481579543-jQc5dAuzFD18FroU7ZW2OuFgMbBWzM.jpeg"
          alt="Traditional Moroccan tagine with chicken and caramelized onions - Marrakesh LA's signature dish"
          className="w-full h-full object-cover"
          fill
          priority
          sizes="100vw"
        />
      </div>

      <div className="container mx-auto px-4 relative z-20 pt-20">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 leading-tight">
            Experience Authentic <span className="text-morocco-amber">Moroccan</span> Cuisine
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
            Marrakesh LA brings the rich flavors and traditions of Morocco to your special events with exceptional,
            authentic catering services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="bg-morocco-amber hover:bg-morocco-amber-light text-white">
              <Link href="/reserve">Book Your Event</Link>
            </Button>
            {/*
              The outline variant keeps its cream `bg-background`, so the resting state
              is copper-on-cream at 4.57:1. The old hover dropped the surface to
              `bg-morocco-copper/10`, letting the hero photo show through, and lightened
              the label to copper-light (3.14:1 on cream) — contrast got worse on hover.
              Filling with solid copper under white text holds 4.73:1 instead.
            */}
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-morocco-copper text-morocco-copper hover:bg-morocco-copper hover:text-white"
            >
              <Link href="/about">Meet Our Chef</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-0 right-0 flex justify-center animate-bounce">
        <Link
          href="#about"
          className="text-white rounded-full p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-morocco-amber focus-visible:ring-offset-2 focus-visible:ring-offset-morocco-charcoal"
          aria-label="Scroll to About section"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </Link>
      </div>
    </section>
  )
}
