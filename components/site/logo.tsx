/**
 * Marrakesh LA logo parts, drawn as real inline SVG from one shared sprite
 * (/public/brand/logo.svg, fetched once and cached). Real SVG stays sharp at any
 * size and on retina screens; the old CSS-mask version was rasterised and went
 * soft, and its "contain" box could drift the subheading off the left edge.
 *
 * Every part takes its colour from CSS `color` (fill="currentColor").
 * preserveAspectRatio xMinYMid keeps each part pinned to the left of its box.
 */
type Part = "mark" | "word" | "sub"

const VIEWBOX: Record<Part, string> = {
  mark: "0 0 2820 2972",
  word: "0 0 5784 544",
  sub: "0 0 4224 292",
}

function LogoPart({ part, className = "" }: { part: Part; className?: string }) {
  return (
    <svg
      className={`logo-part ${part} ${className}`}
      viewBox={VIEWBOX[part]}
      preserveAspectRatio="xMinYMid meet"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <use href={`/brand/logo.svg#${part}`} />
    </svg>
  )
}

export function LogoMark({ className = "" }: { className?: string }) {
  return <LogoPart part="mark" className={className} />
}
export function LogoWord({ className = "" }: { className?: string }) {
  return <LogoPart part="word" className={className} />
}
export function LogoSub({ className = "" }: { className?: string }) {
  return <LogoPart part="sub" className={className} />
}
