"use client"

import Script from "next/script"
import { usePathname } from "next/navigation"
import { useEffect, useRef } from "react"
import { META_PIXEL_ENABLED, META_PIXEL_ID, trackMetaEvent } from "@/lib/meta-pixel"

/**
 * Meta Pixel base code, added once in the root layout so it runs on every page.
 *
 * - PageView fires on the first load (inside the base code) and again on every
 *   client-side navigation, since Next.js changes pages without a full reload.
 * - Contact fires when someone taps the phone number or email address anywhere.
 * - Schedule fires when someone clicks through to OpenTable to book a table.
 * - Lead fires from the catering form when an inquiry is sent (inquiry-form.tsx).
 */
export function MetaPixel() {
  const pathname = usePathname()
  const firstLoad = useRef(true)

  useEffect(() => {
    if (!META_PIXEL_ENABLED) return
    if (firstLoad.current) {
      firstLoad.current = false
      return
    }
    trackMetaEvent("PageView")
  }, [pathname])

  useEffect(() => {
    if (!META_PIXEL_ENABLED) return
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
  }, [])

  if (!META_PIXEL_ENABLED) return null

  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init','${META_PIXEL_ID}');
fbq('track','PageView');`}
      </Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          alt=""
          src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
        />
      </noscript>
    </>
  )
}
