"use client"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"

export function PrefetchManager() {
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Only run prefetching on the home page
    if (pathname !== "/") return

    // Prefetch all main routes
    const routesToPrefetch = ["/about", "/menu", "/contact", "/reserve"]

    // Prefetch each route
    routesToPrefetch.forEach((route) => {
      router.prefetch(route)
    })

    console.log("Prefetched all main routes")

    // Prefetch any API routes that provide data
    const prefetchData = async () => {
      try {
        // Example of prefetching data from an API route
        // This could be expanded to prefetch any data needed across the site
        const menuDataPromise = fetch("/api/menu-data", { next: { revalidate: 3600 } })
        const testimonialsPromise = fetch("/api/testimonials", { next: { revalidate: 3600 } })

        // Wait for all prefetch requests to complete
        await Promise.all([menuDataPromise, testimonialsPromise])

        console.log("Prefetched all API data")
      } catch (error) {
        console.error("Error prefetching data:", error)
      }
    }

    prefetchData()
  }, [pathname, router])

  // This component doesn't render anything
  return null
}
