import { Instagram } from "lucide-react"
import Link from "next/link"
import { INSTAGRAM_URL } from "@/lib/business-info"

/*
  Photographs of our own dishes — not a live Instagram feed.

  This list previously described itself as a feed of Instagram posts, each with an
  invented caption and a hardcoded like count. The photos are real; the engagement
  numbers were not, so only the photos remain. If a real feed is wanted later, it
  needs the Instagram Basic Display API, not a hand-written array.
*/
const galleryPhotos = [
  {
    id: "1",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_5519.jpg-suiSDVCenpZBT6q1iKSjwR9dXzAv9w.jpeg",
    caption: "Vegetable couscous with saffron-infused cauliflower, sweet carrots and chickpeas",
  },
  {
    id: "2",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-IWVdpNBwNErFsudvfrkOyZJHRCtu9x.png",
    caption: "Traditional mint tea service with fresh mint leaves and handcrafted gold teaware",
  },
  {
    id: "3",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/FullSizeRender%20%282%29.JPG-HEQEcFOpZKK4OoP2SQDaPTbxilprbz.jpeg",
    caption: "Chicken tagine with preserved lemon and olives, served on Moroccan pottery",
  },
  {
    id: "4",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_3378.jpg-FV5mtw4Xt5oQEjm7Gc5a5NKIDpGTgW.jpeg",
    caption: "Slow-cooked onion tagine with sweet dried fruits and aromatic spices",
  },
  {
    id: "5",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-DdGfHG8yVVkji77ZzJk9ft865XK8tq.png",
    caption: "Seven-vegetable tagine with tender lamb in a traditional clay dish",
  },
  {
    id: "6",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-9EQQviUhOmFDqwhgaG9fq4F7msa7EK.png",
    caption: "Cucumber canapés with herb-infused cream and smoked salmon, from a corporate event",
  },
]

export function InstagramGallery() {
  return (
    <section id="gallery" className="py-20 bg-white scroll-mt-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Instagram className="h-6 w-6 text-morocco-prairie" />
            <h2 className="text-3xl md:text-4xl font-display font-bold text-morocco-prairie">
              Follow Our Culinary Journey
            </h2>
          </div>
          <p className="text-lg max-w-2xl mx-auto">
            A look at dishes from our kitchen and catering events. Follow us on Instagram for more.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 instagram-gallery">
          {galleryPhotos.map((photo) => (
            <Link
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              key={photo.id}
              className="group relative overflow-hidden rounded-md aspect-square focus:outline-none focus-visible:ring-2 focus-visible:ring-morocco-prairie focus-visible:ring-offset-2"
            >
              <img
                src={photo.image || "/placeholder.svg"}
                alt={photo.caption}
                className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <p className="text-white text-sm line-clamp-3">{photo.caption}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-morocco-prairie hover:text-morocco-prairie/80 transition-colors"
          >
            <span className="mr-2">View more on Instagram</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
