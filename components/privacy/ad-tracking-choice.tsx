"use client"

import { useEffect, useState } from "react"
import { META_OPT_OUT_KEY } from "@/lib/meta-pixel"

/** Opt-out switch for the Meta Pixel, shown on /privacy. Saved in this browser only. */
export function AdTrackingChoice() {
  const [state, setState] = useState<"loading" | "in" | "out" | "gpc">("loading")

  useEffect(() => {
    if ((navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl === true) {
      setState("gpc")
      return
    }
    try {
      setState(window.localStorage.getItem(META_OPT_OUT_KEY) === "1" ? "out" : "in")
    } catch {
      setState("in")
    }
  }, [])

  function choose(optOut: boolean) {
    try {
      if (optOut) window.localStorage.setItem(META_OPT_OUT_KEY, "1")
      else window.localStorage.removeItem(META_OPT_OUT_KEY)
    } catch {
      /* storage blocked: nothing we can save */
    }
    // Reload so the pixel is either never loaded (opt-out) or loaded fresh (opt back in).
    window.location.reload()
  }

  if (state === "loading") return null

  if (state === "gpc") {
    return (
      <p className="privacy__status" role="status">
        Your browser is sending a Global Privacy Control signal, so ad tracking is already off for you.
      </p>
    )
  }

  return (
    <div className="privacy__choice">
      <p className="privacy__status" role="status">
        {state === "out" ? "Ad tracking is off in this browser." : "Ad tracking is on in this browser."}
      </p>
      {state === "out" ? (
        <button type="button" className="btn" onClick={() => choose(false)}>
          Turn ad tracking back on
        </button>
      ) : (
        <button type="button" className="btn btn--fill" onClick={() => choose(true)}>
          Do not sell or share my personal information
        </button>
      )}
    </div>
  )
}
