import type { MetadataRoute } from "next"
import { SITE_URL } from "@/lib/business-info"

/**
 * Every indexable route, and only routes that exist.
 *
 * /menu was missing here, so the one page a diner searches for by name was left
 * out of the sitemap entirely. Keep this list in step with app/ — a sitemap that
 * omits a real page and a sitemap that lists a dead one are equally misleading.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  return [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/menu`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/reserve`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ]
}
