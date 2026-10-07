"use client"

import Script from "next/script"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { META_PIXEL_ENABLED, META_PIXEL_ID, hasOptedOutOfAdTracking, trackMetaEvent } from "@/lib/meta-pixel"

/**
 * Meta Pixel base code, added once in the root layout so it runs on every page.
 *
 * - Not loaded at all for visitors who opted out on /privacy or whose browser
 *   sends Global Privacy Control. The check runs after mount because both live
 *   in the browser, so the pixel never starts before we know.
 * - PageView fires on the first load (inside the base code) and again on every
 *   client-side navigation, since Next.js changes pages without a full reload.
 * - Contact fires when someone taps the phone number or email address anywhere.
 * - Schedule fires when someone clicks through to OpenTable to book a table.
 * - Lead fires from the catering form when an inquiry is sent (inquiry-form.tsx).
 */
export function MetaPixel() {
  const pathname = usePathname()
  const firstLoad = useRef(true)
  const [allowed, setAllowed] = useState(false)

  useEffect(() => {
    if (META_PIXEL_ENABLED && !hasOptedOutOfAdTracking()) setAllowed(true)
  }, [])

  useEffect(() => {
    if (!allowed) return
    if (firstLoad.current) {
      firstLoad.current = false
      return
    }
    trackMetaEvent("PageView")
  }, [pathname, allowed])

  useEffect(() => {
    if (!allowed) return
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.("a[href]")
      if (!link) return
      const href = link.getAttribute("href") || ""
      if (href.startsWith("tel:")) trackMetaEvent("Contact", { content_name: "Phone" })
      else if (href.startsWith("mailto:")) trackMetaEvent("Contact", { content_name: "Email" })
      else if (href.includes("opentable.com")) trackMetaEvent("Schedule", { content_name: "OpenTable reservation" })
    }
    document.addEventListener("click", onClick, { capture: true })
    return () => document.removeEventListener("click", onClick, { capture: true })
  }, [allowed])

  // No <noscript> fallback image: without JavaScript we cannot check the visitor's
  // opt-out, so we do not track them at all.
  if (!allowed) return null

  return (
    <Script id="meta-pixel" strategy="afterInteractive">
      {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init','${META_PIXEL_ID}');
fbq('track','PageView');`}
    </Script>
  )
}
