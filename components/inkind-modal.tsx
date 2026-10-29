"use client"

import * as Dialog from "@radix-ui/react-dialog"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { track } from "@vercel/analytics"
import { LogoMark } from "@/components/site/logo"
import { OG_IMAGE } from "@/lib/business-info"
import {
  INKIND_COPY,
  INKIND_ENABLED,
  INKIND_EXCLUDED_PATHS,
  INKIND_OFFER_URL,
  INKIND_OPEN_DELAY_MS,
  INKIND_SEEN_KEY,
} from "@/lib/inkind"

/**
 * inKind reward popup, mounted once in the root layout.
 *
 * - Renders nothing until NEXT_PUBLIC_INKIND_OFFER_URL is set (see lib/inkind.ts).
 * - Opens INKIND_OPEN_DELAY_MS after the first page view of a browser session,
 *   then marks itself seen in sessionStorage so it never nags on later pages or
 *   reloads. A new tab or a closed browser starts a fresh session.
 * - Skips the privacy page: an offer popup on a privacy notice reads badly.
 * - Radix Dialog gives us focus trapping, Esc-to-close and the aria wiring for free.
 * - The CTA opens inKind in a new tab; this page stays put so the diner can still
 *   book a table. A Vercel Analytics event records the click (ignored on plans
 *   without custom events).
 */
export function InKindModal() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!INKIND_ENABLED) return
    if (INKIND_EXCLUDED_PATHS.some((p) => pathname.startsWith(p))) return

    let seen = false
    try {
      seen = window.sessionStorage.getItem(INKIND_SEEN_KEY) === "1"
    } catch {
      // Storage blocked (private mode, strict settings): show once for this page load only.
    }
    if (seen) return

    const timer = window.setTimeout(() => {
      setOpen(true)
      try {
        window.sessionStorage.setItem(INKIND_SEEN_KEY, "1")
      } catch {
        /* ignore */
      }
    }, INKIND_OPEN_DELAY_MS)
    return () => window.clearTimeout(timer)
    // Runs once per mount. pathname is read at mount only; later navigations are
    // covered by the sessionStorage flag, not by re-arming the timer.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!INKIND_ENABLED) return null

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="ink__scrim" />
        <Dialog.Content className="ink" aria-describedby="ink-desc">
          <figure className="ink__fig" aria-hidden="true">
            {/* Plain <img>: a decorative, already-optimised JPEG; next/image adds nothing here. */}
            <img src={OG_IMAGE.url} alt="" width={OG_IMAGE.width} height={OG_IMAGE.height} loading="lazy" />
          </figure>
          <div className="ink__body">
            <LogoMark className="ink__mark" />
            <p className="eyebrow">{INKIND_COPY.eyebrow}</p>
            <Dialog.Title className="ink__title disp">{INKIND_COPY.title}</Dialog.Title>
            <Dialog.Description id="ink-desc" className="ink__desc">
              {INKIND_COPY.description}
            </Dialog.Description>
            <div className="ink__cta">
              <a
                className="btn btn--fill"
                href={INKIND_OFFER_URL}
                target="_blank"
                rel="noopener"
                onClick={() => {
                  track("inkind_offer_click")
                  setOpen(false)
                }}
              >
                {INKIND_COPY.cta}
              </a>
              <Dialog.Close className="tlink">{INKIND_COPY.dismiss}</Dialog.Close>
            </div>
            <p className="ink__fine">Reward issued by inKind. Pay with the inKind app at the table to redeem.</p>
          </div>
          <Dialog.Close className="ink__x icon" aria-label="Close">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
