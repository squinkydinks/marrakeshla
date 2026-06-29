"use client"

import { useEffect, useState } from "react"
import { Instagram, Play } from "lucide-react"
import Link from "next/link"

// Instagram data with real food images
const instagramPosts = [
  {
    id: "1",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_5519.jpg-suiSDVCenpZBT6q1iKSjwR9dXzAv9w.jpeg",
    caption:
      "Our signature vegetable couscous with saffron-infused cauliflower, sweet carrots, and chickpeas. A colorful celebration of Moroccan flavors! #MoroccanCuisine #DarDmana",
    likes: 142,
    url: "https://www.instagram.com/dardmana_la/",
    isVideo: false,
  },
  {
    id: "2",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-IWVdpNBwNErFsudvfrkOyZJHRCtu9x.png",
    caption:
      "The art of Moroccan hospitality: our traditional mint tea service with fresh mint leaves and handcrafted gold teaware. The perfect sweet ending to any authentic Moroccan meal. #MoroccanTea #Hospitality #DarDmana",
    likes: 178,
    url: "https://www.instagram.com/dardmana_la/",
    isVideo: false,
  },
  {
    id: "3",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/FullSizeRender%20%282%29.JPG-HEQEcFOpZKK4OoP2SQDaPTbxilprbz.jpeg",
    caption:
      "Traditional chicken tagine with preserved lemon, green olives, and purple olives served on authentic Moroccan pottery. A taste of Fez in Los Angeles! #MoroccanTagine #AuthenticFlavors",
    likes: 156,
    url: "https://www.instagram.com/dardmana_la/",
    isVideo: false,
  },
  {
    id: "4",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_3378.jpg-FV5mtw4Xt5oQEjm7Gc5a5NKIDpGTgW.jpeg",
    caption:
      "Our slow-cooked onion tagine with sweet dried fruits and aromatic spices. The caramelized onions create a rich, sweet sauce that's perfect with couscous. #MoroccanDelicacy #SlowFood",
    likes: 128,
    url: "https://www.instagram.com/dardmana_la/",
    isVideo: false,
  },
  {
    id: "5",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-DdGfHG8yVVkji77ZzJk9ft865XK8tq.png",
    caption:
      "Our classic seven-vegetable tagine with tender lamb, served in a traditional Moroccan clay dish. Each vegetable is carefully arranged to create a feast for both the eyes and palate. #TagineAuxSeptLegumes #MoroccanComfortFood",
    likes: 165,
    url: "https://www.instagram.com/dardmana_la/",
    isVideo: false,
  },
  {
    id: "6",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-9EQQviUhOmFDqwhgaG9fq4F7msa7EK.png",
    caption:
      "Elegant cucumber canapés with herb-infused cream and smoked salmon for a corporate event. Our catering services blend Moroccan flavors with international cuisine to create memorable experiences for any occasion. #CateringLosAngeles #GourmetAppetizers",
    likes: 193,
    url: "https://www.instagram.com/dardmana_la/",
    isVideo: false,
  },
]

export function InstagramGallery() {
  const [posts, setPosts] = useState(instagramPosts)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading Instagram posts
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

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
            Explore our latest creations and catering events on Instagram. Tag us with #DarDmana to be featured!
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 instagram-gallery">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="aspect-square bg-gray-200 animate-pulse rounded-md"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 instagram-gallery">
            {posts.map((post) => (
              <Link
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                key={post.id}
                className="group relative overflow-hidden rounded-md aspect-square"
              >
                <img
                  src={post.image || "/placeholder.svg"}
                  alt={post.caption.split(".")[0]}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500"
                />
                {post.isVideo && (
                  <div className="absolute top-2 right-2 bg-black/60 p-1.5 rounded-full">
                    <Play className="h-4 w-4 text-white" fill="white" />
                  </div>
                )}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <p className="text-white text-sm line-clamp-3">{post.caption}</p>
                  <div className="flex items-center mt-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-white mr-1"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                    <span className="text-white text-xs">{post.likes}</span>
                    {post.isVideo && (
                      <span className="ml-2 text-white text-xs flex items-center">
                        <Play className="h-3 w-3 mr-1" fill="white" /> Watch Reel
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="text-center mt-10">
          <Link
            href="https://www.instagram.com/dardmana_la/"
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
