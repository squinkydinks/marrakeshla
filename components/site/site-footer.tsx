import Link from "next/link"
import { ADDRESS, BUSINESS_NAME, INSTAGRAM_URL } from "@/lib/business-info"
import { LogoMark, LogoSub, LogoWord } from "./logo"

export function SiteFooter() {
  return (
    <footer className="ftr">
      <div className="wrap ftr__inner">
        <LogoMark className="mark" />
        <span role="img" aria-label={BUSINESS_NAME} style={{ display: "contents" }}>
          <LogoWord className="word" />
        </span>
        <span role="img" aria-label="Riad Al Maghrib" style={{ display: "contents" }}>
          <LogoSub className="sub" />
        </span>
        <nav aria-label="Footer">
          <Link href="/#menu">Menu</Link>
          <Link href="/#story">Our story</Link>
          <Link href="/#reviews">Reviews</Link>
          <Link href="/catering">Catering</Link>
          <Link href="/#visit">Visit</Link>
          <a href={INSTAGRAM_URL} rel="noopener">Instagram</a>
        </nav>
        <small>
          © {new Date().getFullYear()} {BUSINESS_NAME} · Riad Al Maghrib · {ADDRESS.street}, {ADDRESS.locality}
        </small>
        <small className="ftr__legal">
          <Link href="/privacy">Privacy policy</Link> ·{" "}
          <Link href="/privacy#opt-out">Do not sell or share my personal information</Link>
        </small>
      </div>
    </footer>
  )
}
