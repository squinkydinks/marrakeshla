import type { Metadata } from "next"
import { SiteHeader } from "@/components/site/site-header"
import { SiteFooter } from "@/components/site/site-footer"
import { MenuTabs } from "@/components/site/menu-tabs"
import { BUSINESS_NAME, CHEF_NAME, OG_IMAGE, OPENTABLE_URL } from "@/lib/business-info"

const TITLE = `Menu | ${BUSINESS_NAME} Moroccan Restaurant on Melrose`
const DESCRIPTION = `The à la carte menu at ${BUSINESS_NAME}: tagines, couscous, mezze, grilled fish, Moroccan tea and more, by Chef ${CHEF_NAME}. Lunch and dinner daily on Melrose Avenue, Los Angeles.`

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "/menu",
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/menu",
    siteName: BUSINESS_NAME,
    locale: "en_US",
    type: "website",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE.url],
  },
}

export default function MenuPage() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <section className="sec menu" id="menu" aria-labelledby="menu-h">
          <div className="wrap">
            <div className="shead">
              <div className="shead__l">
                <p className="eyebrow">The menu · by Chef {CHEF_NAME}</p>
                <h1 className="h-sec" id="menu-h">
                  À la carte
                </h1>
              </div>
              <div className="shead__r">
                <p className="stand">
                  Lunch and dinner, every day. Plenty of the menu is vegetarian, and your server can point it out.
                </p>
              </div>
            </div>

            <MenuTabs courseHeading="h2" />

            <div className="menu__foot">
              <span>Please tell your server about any allergies or dietary needs.</span>
              <a className="tlink" href={OPENTABLE_URL} rel="noopener">
                Book a table
              </a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
