/**
 * Marrakesh LA logo parts. The vector artwork lives in /public/brand/*.svg and is
 * painted with CSS masks so every part inherits `color` (brass in the header,
 * bone on dark grounds) without shipping 200 KB of inline SVG paths per page.
 */
export function LogoMark({ className = "" }: { className?: string }) {
  return <span aria-hidden="true" className={`logo-mask mark ${className}`} />
}
export function LogoWord({ className = "" }: { className?: string }) {
  return <span aria-hidden="true" className={`logo-mask word ${className}`} />
}
export function LogoSub({ className = "" }: { className?: string }) {
  return <span aria-hidden="true" className={`logo-mask sub ${className}`} />
}
