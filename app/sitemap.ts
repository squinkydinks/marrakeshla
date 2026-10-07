import type { MetadataRoute } from "next"
import { SITE_URL } from "@/lib/business-info"

/**
 * Every indexable route, and only routes that exist.
 *
 * /reserve and /contact are gone: they now 301 to /catering (see the redirects
 * in next.config.mjs), so listing them would point crawlers at redirects rather
 * than pages. Keep this list in step with app/ — a sitemap that omits a real
 * page and a sitemap that lists a dead one are equally misleading.
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
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/catering`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ]
}
