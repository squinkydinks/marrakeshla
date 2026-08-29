import type { MetadataRoute } from "next"
import { SITE_URL } from "@/lib/business-info"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // JSON feeds behind app/api — content for the pages, not pages themselves.
      disallow: "/api/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
