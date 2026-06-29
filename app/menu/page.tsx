import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CuisineMenu } from "@/components/cuisine-menu"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "International Cuisine Menus | Dar Dmana",
  description:
    "Explore our exquisite Moroccan, Italian, French, and Spanish cuisine menus. Dar Dmana offers authentic international dishes for catering and private events in Los Angeles.",
  openGraph: {
    title: "International Cuisine Menus | Dar Dmana",
    description: "Explore our exquisite Moroccan, Italian, French, and Spanish cuisine menus.",
    url: "https://www.dardmana.com/menu",
  },
}

export default function MenuPage() {
  return (
    <main className="min-h-screen dark-menu-pattern-2 text-white overflow-hidden">
      <Header />

      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-display font-bold text-morocco-amber mb-6 leading-tight">
              International Cuisine
            </h1>
            <p className="text-xl max-w-3xl mx-auto text-morocco-givry">
              Chef Hisham brings his expertise in global cuisines to create memorable dining experiences. Each dish is
              crafted with authentic techniques and the finest ingredients.
            </p>
          </div>

          <CuisineMenu />

          <div className="mt-16 text-center">
            <div className="max-w-2xl mx-auto bg-morocco-charcoal/80 backdrop-blur-sm rounded-lg p-8 border border-morocco-amber/30 shadow-lg">
              <h2 className="text-3xl font-display font-bold text-morocco-amber mb-4">
                Experience Our Culinary Excellence
              </h2>
              <p className="text-morocco-givry mb-8">
                Let Chef Hisham and the Dar Dmana team create a custom menu for your next event, featuring these
                signature dishes and more.
              </p>
              <Button
                asChild
                size="lg"
                className="bg-morocco-amber hover:bg-morocco-amber-light text-white font-medium px-8 py-6 text-lg"
              >
                <Link href="/reserve">Make a Reservation</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
