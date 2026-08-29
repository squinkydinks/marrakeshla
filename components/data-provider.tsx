import type { ReactNode } from "react"

/*
  This provider is now a pass-through and should be deleted.

  It existed to fetch /api/testimonials and /api/menu-data on the client and cache
  both in sessionStorage. /api/testimonials served fabricated reviews and has been
  removed; /api/menu-data is an unfinished v0 placeholder that nothing consumes
  (components/cuisine-menu.tsx carries its own menu data inline). Its only consumer
  was the testimonials carousel, so the context, the useSiteData hook and the fetch
  waterfall are gone.

  Remove the import and the <DataProvider> wrapper from app/layout.tsx, then delete
  this file.
*/
export function DataProvider({ children }: { children: ReactNode }) {
  return <>{children}</>
}
