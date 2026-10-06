import { SiteHeader } from "@/components/site/site-header"
import { SiteFooter } from "@/components/site/site-footer"
import { Hero } from "@/components/home/hero"
import { FactsBand, FeatureQuote, Story } from "@/components/home/intro"
import { MenuSection, Signatures } from "@/components/home/dishes"
import { Reviews } from "@/components/home/reviews"
import { PrivateDining, Room, Visit } from "@/components/home/riad"
import generateStructuredData from "./structured-data"

export default function Home() {
  return (
    <>
      {/*
        Rendered server-side, on purpose. This block used to be appended to
        document.head from a useEffect, which meant the served HTML contained no
        JSON-LD at all — the markup only existed after client-side hydration.
        For a single-location restaurant, local search is the acquisition
        channel, so this has to be in the initial response.
      */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateStructuredData()) }}
      />
      <SiteHeader />
      <main id="main">
        <span id="top"></span>
        <Hero />
        <FactsBand />
        <FeatureQuote />
        <Story />
        <Signatures />
        <MenuSection />
        <Reviews />
        <Room />
        <PrivateDining />
        <Visit />
      </main>
      <SiteFooter />
    </>
  )
}
