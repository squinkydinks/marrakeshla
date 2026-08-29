"use client"

import { useEffect } from "react"

/**
 * Smooth-scrolls to the element named by the URL hash on first load.
 *
 * This exists as a standalone client component so that app/page.tsx can stay a
 * server component. That matters: the homepage renders the schema.org JSON-LD,
 * and it has to be present in the server-rendered HTML for search crawlers.
 */
export function HashScroll() {
  useEffect(() => {
    if (!window.location.hash) return

    const id = window.location.hash.substring(1)
    const element = document.getElementById(id)
    if (!element) return

    // Defer past hydration so the target section has settled at its final offset.
    const timer = setTimeout(() => {
      element.scrollIntoView({ behavior: "smooth" })
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  return null
}
