import Link from "next/link"
import { ADDRESS, BUSINESS_NAME, INSTAGRAM_URL } from "@/lib/business-info"
import { LogoMark, LogoSub, LogoWord } from "./logo"

export function SiteFooter() {
  return (
    <footer className="ftr">
      <div className="wrap ftr__inner">
        {/* Primary stacked lockup, to the Logo Kit's proportions: medallion 42%,
            wordmark 100%, subheading 73% of the lockup width, all in brass. */}
        <div className="ftr__lockup" role="img" aria-label={`${BUSINESS_NAME}, Riad Al Maghrib`}>
          <LogoMark className="mark" />
          <LogoWord className="word" />
          <LogoSub className="sub" />
        </div>
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
