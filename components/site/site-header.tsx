"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { INSTAGRAM_URL, OPENTABLE_URL } from "@/lib/business-info"
import { LogoMark, LogoSub, LogoWord } from "./logo"

const NAV = [
  { href: "/#menu", label: "Menu" },
  { href: "/#story", label: "Our story" },
  { href: "/#reviews", label: "Reviews" },
  { href: "/catering", label: "Catering" },
  { href: "/#visit", label: "Visit" },
]

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r=".9" fill="currentColor" stroke="none" />
    </svg>
  )
}
export { InstagramIcon }

/**
 * Sticky site header: logo lockup, primary nav, Reserve/Inquire CTA, Instagram,
 * theme toggle and the mobile menu. `current` marks the active page in the nav.
 */
export function SiteHeader({
  current,
  cta = { href: OPENTABLE_URL, label: "Reserve", external: true },
}: {
  current?: "catering"
  cta?: { href: string; label: string; external?: boolean }
}) {
  const [open, setOpen] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  useEffect(() => {
    const onResize = () => window.innerWidth > 1040 && setOpen(false)
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [])

  const isDark = !mounted || resolvedTheme !== "light"

  return (
    <header className="hdr">
      <div className="wrap">
        <div className="hdr__bar">
          <Link className="lockup" href="/" aria-label="Marrakesh LA, home">
            <LogoMark className="mark" />
            <span className="stack">
              <LogoWord className="word" />
              <LogoSub className="sub" />
            </span>
          </Link>
          <nav className="nav" aria-label="Primary">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} aria-current={current && n.href === `/${current}` ? "page" : undefined}>
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="tools">
            {cta.external ? (
              <a className="btn btn--fill" href={cta.href} rel="noopener">
                {cta.label}
              </a>
            ) : (
              <Link className="btn btn--fill" href={cta.href}>
                {cta.label}
              </Link>
            )}
            <a className="icon" href={INSTAGRAM_URL} rel="noopener" aria-label="Marrakesh LA on Instagram">
              <InstagramIcon />
            </a>
            <button
              className="icon"
              type="button"
              aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
              onClick={() => setTheme(isDark ? "light" : "dark")}
            >
              {isDark ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
                  <circle cx="12" cy="12" r="4.2" />
                  <path d="M12 2.5v2.6M12 18.9v2.6M2.5 12h2.6M18.9 12h2.6M5.3 5.3l1.8 1.8M16.9 16.9l1.8 1.8M5.3 18.7l1.8-1.8M16.9 7.1l1.8-1.8" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
                  <path d="M20 14.6A8.3 8.3 0 0 1 9.4 4a8.3 8.3 0 1 0 10.6 10.6z" />
                </svg>
              )}
            </button>
            <button
              className="icon burger"
              type="button"
              aria-label={open ? "Close navigation" : "Open navigation"}
              aria-expanded={open}
              aria-controls="mob"
              onClick={() => setOpen((o) => !o)}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
                <path d="M3 7h18M3 12h18M3 17h18" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <nav className="mob" id="mob" aria-label="Mobile" hidden={!open} onClick={(e) => (e.target as HTMLElement).closest("a") && setOpen(false)}>
        <div className="wrap">
          <ul>
            {NAV.map((n) => (
              <li key={n.href}>
                <Link href={n.href}>{n.label}</Link>
              </li>
            ))}
            <li>
              <a href={OPENTABLE_URL} rel="noopener">Reserve a table</a>
            </li>
            <li>
              <a href={INSTAGRAM_URL} rel="noopener">Instagram</a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  )
}
