"use client"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"

/*
  Warms the router cache for the pages reachable from the home page. The data
  prefetching this used to do alongside it hit /api/testimonials (fabricated
  reviews, now deleted) and /api/menu-data (an unfinished placeholder nothing
  reads), so it fetched two responses that were then thrown away.
*/
const ROUTES_TO_PREFETCH = ["/about", "/menu", "/contact", "/reserve"]

export function PrefetchManager() {
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (pathname !== "/") return

    ROUTES_TO_PREFETCH.forEach((route) => {
      router.prefetch(route)
    })
  }, [pathname, router])

  return null
}
