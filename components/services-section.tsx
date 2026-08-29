import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"

// One card per row below lg, three across above it.
const CARD_SIZES = "(max-width: 1023px) 90vw, 33vw"

export function ServicesSection() {
  const services = [
    {
      title: "Wedding Celebrations",
      description:
        "Transform your special day with our authentic Moroccan feast, featuring traditional dishes served with elegance and flair.",
      features: [
        "Customized menu planning",
        "Traditional Moroccan wedding dishes",
        "Elegant presentation and service",
        "Moroccan tea ceremony option",
      ],
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DSC09775.jpg-dXw7laaQcf1P7vYg0vCtZZoojJg0J4.jpeg",
      imageAlt: "Moroccan wedding banquet table laid with tagines and traditional serving dishes",
    },
    {
      title: "Corporate Events",
      description:
        "Impress your clients and colleagues with a unique culinary experience that showcases the rich flavors of Morocco.",
      features: [
        "Tailored menus for any business occasion",
        "Buffet or seated service options",
        "Professional staff and presentation",
        "Dietary accommodations available",
      ],
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_5523.jpg-ooD7a367HYlQhFKkV3vnDEm9WTU7LS.jpeg",
      imageAlt: "Moroccan catering spread arranged for a corporate event",
    },
    {
      title: "Private Dining",
      description:
        "Enjoy an intimate Moroccan dining experience in the comfort of your home with our private chef services.",
      features: [
        "Personalized menu consultation",
        "In-home chef experience",
        "Complete setup and cleanup",
        "Cooking demonstrations available",
      ],
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_5807.jpg-zjqtN9KQBLtUyOjSa4T8P8sn1CvNBU.jpeg",
      imageAlt: "Plated Moroccan course served at an intimate private dinner",
    },
  ]

  return (
    <section id="services" className="py-20 scroll-mt-20 bg-morocco-charcoal text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-morocco-amber mb-4">Our Catering Services</h2>
          <p className="text-lg max-w-3xl mx-auto text-morocco-givry">
            From intimate gatherings to grand celebrations, we offer a range of catering services tailored to your
            specific needs and preferences.
          </p>
        </div>

        {/* Replace the existing grid div with this new structure */}
        <div className="catering-services-container mx-auto">
          <div className="catering-services-grid grid grid-cols-1 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card
                key={index}
                className="catering-service-card overflow-hidden border-morocco-prairie bg-morocco-charcoal-light hover:shadow-lg transition-shadow"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={service.image || "/placeholder.jpg"}
                    alt={service.imageAlt}
                    className="object-cover transition-transform hover:scale-105 duration-500"
                    fill
                    sizes={CARD_SIZES}
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-2xl text-morocco-amber">{service.title}</CardTitle>
                  <CardDescription className="text-base text-morocco-givry">{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-white">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        {/* Decorative: the feature text beside it already carries the meaning,
                            so the low-contrast copper tick does not need to meet 3:1. */}
                        <Check className="mr-2 h-5 w-5 text-morocco-copper flex-shrink-0" aria-hidden="true" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 bg-morocco-prairie-dark/70 rounded-lg p-8 text-center max-w-3xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-display font-bold text-morocco-amber mb-4">
            Ready to Create a Memorable Event?
          </h3>
          <p className="text-lg mb-6 text-morocco-givry">
            Let us bring the authentic flavors of Morocco to your next celebration. Our team will work with you to
            create a custom menu that delights your guests.
          </p>
          <Button asChild size="lg" className="bg-morocco-amber hover:bg-morocco-amber-light text-white font-medium">
            <Link href="/reserve">Reserve Catering Services</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
