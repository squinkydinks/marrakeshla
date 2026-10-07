"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { INSTAGRAM_URL, OPENTABLE_URL } from "@/lib/business-info"
import { RATING, REVIEW_COUNT } from "@/lib/reviews"
import { InstagramIcon } from "@/components/site/site-header"

const SCENES = [
  {
    src: "/images/redesign/hero-feast.jpg",
    kicker: "Tagines, couscous and bastilla",
    alt: "Candlelit Moroccan dishes: lamb tagine with prunes, couscous, pastilla and small salads beside a silver tea service on a walnut table.",
  },
  {
    src: "/images/redesign/hero-tea.jpg",
    kicker: "Mint tea, poured from a height",
    alt: "An engraved silver teapot pouring amber mint tea into gold-patterned glasses beside pastries and lantern light.",
  },
  {
    src: "/images/redesign/hero-melrose.jpg",
    kicker: "Melrose Avenue, after dark",
    alt: "The dining room at blue hour: black-framed windows onto Melrose, cream curtains, candlelit tables and a silver teapot.",
  },
] as const

/**
 * Home hero. Three background scenes crossfade on a timer (7s, or 9s with no
 * zoom under prefers-reduced-motion; the zoom itself is disabled in CSS). The
 * kicker line follows the active scene. The timer pauses while the tab is hidden.
 * The pause button in the corner stops it entirely (WCAG 2.2.2: anything that moves
 * on its own for more than five seconds needs a way to stop it).
 */
export function Hero() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const slow = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    let timer: ReturnType<typeof setInterval> | null = null
    const stop = () => {
      if (timer) clearInterval(timer)
      timer = null
    }
    const start = () => {
      stop()
      timer = setInterval(() => setActive((i) => (i + 1) % SCENES.length), slow ? 9000 : 7000)
    }
    const onVis = () => (document.hidden ? stop() : start())
    document.addEventListener("visibilitychange", onVis)
    start()
    return () => {
      stop()
      document.removeEventListener("visibilitychange", onVis)
    }
  }, [paused])

  return (
    <section className="hero" aria-labelledby="hero-h">
      {SCENES.map((s, i) => (
        <Image
          key={s.src}
          className={`hero__bg${i === active ? " on" : ""}`}
          data-k={s.kicker}
          src={s.src}
          alt={s.alt}
          fill
          sizes="100vw"
          {...(i === 0 ? { priority: true } : { loading: "lazy" as const })}
        />
      ))}
      <button
        type="button"
        className="hero__pause"
        onClick={() => setPaused((p) => !p)}
        aria-label={paused ? "Play background slideshow" : "Pause background slideshow"}
      >
        {paused ? (
          <svg viewBox="0 0 16 16" aria-hidden="true">
            <path d="M4.5 2.8v10.4L13 8z" fill="currentColor" />
          </svg>
        ) : (
          <svg viewBox="0 0 16 16" aria-hidden="true">
            <path d="M4.5 3h2.4v10H4.5zM9.1 3h2.4v10H9.1z" fill="currentColor" />
          </svg>
        )}
      </button>
      <div className="wrap hero__in">
        <p className="eyebrow" id="heroKicker">
          {SCENES[active].kicker}
        </p>
        <h1 id="hero-h">
          A Night <span className="gold">in Morocco.</span>
        </h1>
        <div className="hero__cta">
          <a className="btn btn--fill" href={OPENTABLE_URL} rel="noopener">
            Reserve a table
          </a>
          <a className="btn" href="#menu">
            See the menu
          </a>
          <a className="btn ig" href={INSTAGRAM_URL} rel="noopener">
            <InstagramIcon />
            Instagram
          </a>
          <a className="rating" href="#reviews">
            <b>{RATING}</b>
            <span className="stars" aria-hidden="true">
              <i></i>
              <i></i>
              <i></i>
              <i></i>
              <i></i>
            </span>
            <span>{REVIEW_COUNT} reviews on Google</span>
          </a>
        </div>
      </div>
    </section>
  )
}
