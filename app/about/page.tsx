import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Chef Hisham | Dar Dmana Moroccan Catering",
  description:
    "Learn about Chef Hisham Foual's culinary journey from Casablanca to Los Angeles and his passion for authentic Moroccan cuisine.",
  openGraph: {
    title: "About Chef Hisham | Dar Dmana Moroccan Catering",
    description: "Learn about Chef Hisham Foual's culinary journey from Casablanca to Los Angeles.",
    url: "https://www.dardmana.com/about",
    images: [
      {
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/hicham-headshot.jpg-EWWdtURoVDljPHBDTjgVsuLsKBpmKZ.jpeg",
        width: 800,
        height: 600,
        alt: "Chef Hisham Foual",
      },
    ],
  },
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-morocco-charcoal text-white">
      <Header />

      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-morocco-amber mb-12 text-center">
            About Our Chef
          </h1>

          <div className="flex flex-col md:flex-row gap-12 items-center md:items-start">
            {/* Chef's Image */}
            <div className="md:w-1/2 lg:w-2/5">
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-full h-full border-2 border-morocco-salmon rounded-lg"></div>
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/hicham-headshot.jpg-EWWdtURoVDljPHBDTjgVsuLsKBpmKZ.jpeg"
                  alt="Chef Hisham Foual preparing appetizers with Moroccan tagines in the background"
                  className="w-full rounded-lg shadow-lg relative z-10"
                />
              </div>
              <div className="mt-6 bg-morocco-charcoal-light p-6 rounded-lg border border-morocco-amber/20">
                <h3 className="text-xl font-display font-bold text-morocco-amber mb-3">Chef Hisham Foual</h3>
                <p className="text-sm italic mb-4 text-white">Founder & Head Chef</p>

                <div className="space-y-4">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-white mb-2">Moroccan Specialties:</span>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs px-3 py-1 bg-morocco-amber/20 text-white rounded-full">Tagines</span>
                      <span className="text-xs px-3 py-1 bg-morocco-amber/20 text-white rounded-full">Pastilla</span>
                      <span className="text-xs px-3 py-1 bg-morocco-amber/20 text-white rounded-full">Couscous</span>
                      <span className="text-xs px-3 py-1 bg-morocco-amber/20 text-white rounded-full">
                        Lemon Chicken
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-white mb-2">French Specialties:</span>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs px-3 py-1 bg-morocco-amber/20 text-white rounded-full">
                        Filet Au Poivre
                      </span>
                      <span className="text-xs px-3 py-1 bg-morocco-amber/20 text-white rounded-full">Baked Goods</span>
                      <span className="text-xs px-3 py-1 bg-morocco-amber/20 text-white rounded-full">Soups</span>
                      <span className="text-xs px-3 py-1 bg-morocco-amber/20 text-white rounded-full">
                        En Papillote
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-white mb-2">Italian Specialties:</span>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs px-3 py-1 bg-morocco-amber/20 text-white rounded-full">Bolognese</span>
                      <span className="text-xs px-3 py-1 bg-morocco-amber/20 text-white rounded-full">Pizza</span>
                      <span className="text-xs px-3 py-1 bg-morocco-amber/20 text-white rounded-full">Tiramisu</span>
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-white mb-2">Spanish Specialties:</span>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs px-3 py-1 bg-morocco-amber/20 text-white rounded-full">Paella</span>
                      <span className="text-xs px-3 py-1 bg-morocco-amber/20 text-white rounded-full">Tapas</span>
                      <span className="text-xs px-3 py-1 bg-morocco-amber/20 text-white rounded-full">Tortillas</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Chef's Story */}
            <div className="md:w-1/2 lg:w-3/5">
              <h2 className="text-3xl font-display font-bold text-morocco-amber mb-6">
                A Culinary Journey From Casablanca to Los Angeles
              </h2>

              <div className="space-y-4 text-lg">
                <p>
                  Chef Hisham Foual's culinary journey began in the ancient city of Casablanca, Morocco, where he spent
                  countless hours in his family's kitchen, absorbing the rich traditions of Moroccan cooking that had
                  been passed down through generations.
                </p>

                <p>
                  After completing his formal culinary education in Casablanca, Hisham worked in several royal houses as
                  a private chef, trained and led chefs in some of the finest hotels in Caseblanca and Tunisia honing
                  his technical skills while maintaining his passion for innovating the flavors of his homeland. Hisham
                  started his own school in 2004 where he trained thousands of chefs over a decade, his students have
                  gone on to serve in kitchens across the world.
                </p>

                <p>
                  In 2011, Hisham moved to Los Angeles with a dream of bringing authentic Moroccan cuisine to America,
                  but with a contemporary approach that respects tradition while embracing innovation. This vision led
                  to the founding of Dar Dmana Catering.
                </p>

                <p>
                  "Moroccan cuisine is a beautiful tapestry of flavors influenced by Berber, Arabic, Andalusian, and
                  Mediterranean cultures," says Hisham "Each dish tells a story of Morocco's rich history and diverse
                  landscapes, from the coastal regions to the Atlas Mountains."
                </p>

                <p>
                  Today, Hisham leads a team of talented culinary professionals who share his commitment to
                  authenticity, quality, and exceptional service. He personally oversees every catering event, ensuring
                  that each dish not only tastes extraordinary but also reflects the warmth and hospitality that are
                  hallmarks of Moroccan culture.
                </p>
              </div>

              {/* Call to Action */}
              <div className="mt-8 p-6 bg-morocco-charcoal-light rounded-lg border border-morocco-amber/20">
                <h3 className="text-2xl font-display font-bold text-morocco-amber mb-4">
                  Bring Chef Hisham's Cuisine to Your Event
                </h3>
                <p className="mb-6 text-white">
                  Whether you're planning an intimate dinner party, a corporate event, or a wedding celebration, Chef
                  Hisham would be delighted to create a custom Moroccan culinary experience for you and your guests.
                </p>
                <Button asChild size="lg" className="bg-morocco-prairie hover:bg-morocco-prairie/90 text-white">
                  <Link href="/contact">Contact Chef Hisham</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chef's Philosophy Section */}
      <section className="py-16 bg-morocco-charcoal-light">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-display font-bold text-morocco-amber mb-6">
              Chef Hicham's Culinary Philosophy
            </h2>
            <div className="text-xl italic font-light text-white">
              "Moroccan cuisine is not just about feeding the body, but nourishing the soul. Every spice, every
              technique, every presentation element has a purpose and a story. My mission is to share these stories
              through food that honors tradition while embracing the present moment."
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
