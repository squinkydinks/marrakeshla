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
          alt="Traditional Moroccan tagine with chicken and caramelized onions - Dar Dmana's signature dish"
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
            Dar Dmana brings the rich flavors and traditions of Morocco to your special events with exceptional,
            authentic catering services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="bg-morocco-amber hover:bg-morocco-amber-light text-white">
              <Link href="/reserve">Book Your Event</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-morocco-copper text-morocco-copper hover:bg-morocco-copper/10 hover:text-morocco-copper-light"
            >
              <Link href="/about">Meet Our Chef</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-0 right-0 flex justify-center animate-bounce">
        <Link href="#about" className="text-white" aria-label="Scroll to About section">
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
