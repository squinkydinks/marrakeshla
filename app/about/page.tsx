import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { SiteHeader } from "@/components/site/site-header"
import { SiteFooter } from "@/components/site/site-footer"
import { BUSINESS_NAME, CHEF_NAME, OPENTABLE_URL } from "@/lib/business-info"

const TITLE = `About Chef Hicham Foual | ${BUSINESS_NAME} Moroccan Restaurant`
const DESCRIPTION = `Chef ${CHEF_NAME}'s journey from Casablanca to Los Angeles, and the Moroccan cooking behind ${BUSINESS_NAME} on Melrose Avenue.`

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
                <h1 id="story-h">A culinary journey from Casablanca to Los Angeles</h1>
                <div className="body">
                  <p>
                    Chef {CHEF_NAME}&apos;s culinary journey began in <strong>Casablanca</strong>, Morocco, where he
                    spent countless hours in his family&apos;s kitchen, absorbing the traditions of Moroccan cooking
                    that had been passed down through generations.
                  </p>
                  <p>
                    After completing his formal culinary education in Casablanca, Hicham worked in several royal houses
                    as a private chef, and trained and led chefs in hotels in Casablanca and Tunisia, honing his
                    technical skills while keeping his passion for the flavors of his homeland. In 2004 he started his
                    own school, where he trained thousands of chefs over a decade; his students have gone on to serve in
                    kitchens across the world.
                  </p>
                  <p>
                    In 2011, Hicham moved to Los Angeles with a dream of bringing authentic Moroccan cuisine to America,
                    with a contemporary approach that respects tradition while embracing innovation. That vision led to
                    the founding of Marrakesh LA Catering.
                  </p>
                  <p>
                    Today, Hicham leads a team of culinary professionals who share his commitment to authenticity,
                    quality and service, and he personally oversees every catering event.
                  </p>
                </div>
                <div className="sign">
                  <p>Chef {CHEF_NAME}</p>
                  <p>Founder &amp; head chef</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="quote" aria-label="In the chef's words">
          <div className="wrap inner">
            <span className="orn" aria-hidden="true">
              <i></i>
            </span>
            <blockquote>
              <p>
                &ldquo;Moroccan cuisine is a beautiful tapestry of flavors influenced by Berber, Arabic, Andalusian and
                Mediterranean cultures.&rdquo;
              </p>
            </blockquote>
            <cite>
              <b>Chef {CHEF_NAME}</b>
            </cite>
          </div>
        </section>

        <section className="sec" aria-labelledby="phil-h" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <div className="shead">
              <div className="shead__l">
                <p className="eyebrow">Philosophy</p>
                <h2 className="h-sec" id="phil-h">
                  Nourishing the soul
                </h2>
              </div>
              <div className="shead__r">
                <p className="stand">
                  &ldquo;Moroccan cuisine is not just about feeding the body, but nourishing the soul. Every spice,
                  every technique, every presentation element has a purpose and a story. My mission is to share these
                  stories through food that honors tradition while embracing the present moment.&rdquo;
                </p>
              </div>
            </div>
            <div className="body">
              <p>
                Hicham&apos;s Moroccan specialties include tagines, pastilla, couscous and lemon chicken.
              </p>
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
