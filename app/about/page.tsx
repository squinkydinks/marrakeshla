import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { SiteHeader } from "@/components/site/site-header"
import { SiteFooter } from "@/components/site/site-footer"
import { BUSINESS_NAME, CHEF_NAME, OPENTABLE_URL } from "@/lib/business-info"

const TITLE = `About Chef Hicham Foual | ${BUSINESS_NAME} Moroccan Restaurant`
const DESCRIPTION = `How Chef ${CHEF_NAME} went from his family's kitchen in Casablanca to running ${BUSINESS_NAME} on Melrose Avenue.`

const CHEF_IMAGE = {
  url: "/images/redesign/chef.jpg",
  width: 1400,
  height: 1794,
  alt: "Chef Hicham Foual in chef's whites, finishing a tray of canapés with olive oil, clay tagines lined up behind him.",
}

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/about",
    siteName: BUSINESS_NAME,
    locale: "en_US",
    type: "profile",
    images: [CHEF_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: `About Chef Hicham Foual | ${BUSINESS_NAME}`,
    description: DESCRIPTION,
    images: [CHEF_IMAGE.url],
  },
}

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <section className="story" id="story" aria-labelledby="story-h">
          <div className="wrap">
            <div className="story__grid">
              <figure className="story__fig">
                <Image
                  src={CHEF_IMAGE.url}
                  width={CHEF_IMAGE.width}
                  height={CHEF_IMAGE.height}
                  sizes="(max-width: 860px) 92vw, 38vw"
                  alt={CHEF_IMAGE.alt}
                  priority
                />
                <figcaption>Chef {CHEF_NAME}</figcaption>
              </figure>
              <div className="story__txt">
                <p className="label">About our chef</p>
                <h1 id="story-h">From Casablanca to Los Angeles</h1>
                <div className="body">
                  <p>
                    {CHEF_NAME} learned to cook in his family&apos;s kitchen in <strong>Casablanca</strong>, from
                    relatives who had made the same dishes for generations.
                  </p>
                  <p>
                    He trained formally in Casablanca, then worked as a private chef for royal households and led
                    kitchen teams at hotels in Casablanca and Tunisia. In 2004 he opened his own cooking school. Over
                    the next ten years it trained thousands of cooks, and many of them now work in kitchens around the
                    world.
                  </p>
                  <p>
                    He moved to Los Angeles in 2011 and started Marrakesh LA as a catering company, cooking Moroccan
                    food the way he learned it, with a few modern touches.
                  </p>
                  <p>Today he runs the kitchen on Melrose and still oversees every catering event himself.</p>
                </div>
                <div className="sign">
                  <p>Chef {CHEF_NAME}</p>
                  <p>Founder &amp; head chef</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="sec" aria-labelledby="phil-h" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <div className="shead">
              <div className="shead__l">
                <p className="eyebrow">In the kitchen</p>
                <h2 className="h-sec" id="phil-h">
                  What he cooks
                </h2>
              </div>
              <div className="shead__r">
                <p className="stand">
                  Tagines, bastilla, couscous and lemon chicken with olives are the dishes he&apos;s known for. Each
                  one is made the way he learned it in Casablanca.
                </p>
              </div>
            </div>
            <div className="btns" style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 40 }}>
              <a className="btn btn--fill" href={OPENTABLE_URL} rel="noopener">
                Reserve a table
              </a>
              <Link className="btn" href="/catering#inquire">
                Plan an event
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
