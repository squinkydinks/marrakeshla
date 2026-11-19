import type { Metadata } from "next"
import Link from "next/link"
import { SiteHeader } from "@/components/site/site-header"
import { SiteFooter } from "@/components/site/site-footer"
import { ADDRESS_ONE_LINE, BUSINESS_NAME, EMAIL, OPENTABLE_URL, PHONE_DISPLAY, PHONE_HREF } from "@/lib/business-info"

const UPDATED = "November 18, 2026"
const TITLE = `Terms of Service | ${BUSINESS_NAME}`
const DESCRIPTION = `The terms for using marrakeshla.com and messaging ${BUSINESS_NAME}, including reservations, catering inquiries, allergies and automated replies.`

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/terms-of-service" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/terms-of-service", siteName: BUSINESS_NAME, type: "website" },
}

export default function TermsPage() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <section className="sec privacy" aria-labelledby="terms-h">
          <div className="wrap">
            <div className="shead">
              <div className="shead__l">
                <p className="eyebrow">Last updated {UPDATED}</p>
                <h1 className="h-sec" id="terms-h">
                  Terms of service
                </h1>
              </div>
              <div className="shead__r">
                <p className="stand">
                  The ground rules for using our website and messaging us online. Plain language, and short.
                </p>
              </div>
            </div>

            <div className="body privacy__body">
              <p>
                These terms cover marrakeshla.com and any messages you send us online, including chat through our
                Google Business Profile. They are between you and {BUSINESS_NAME} (Riad Al Maghrib), {ADDRESS_ONE_LINE}.
                By using the site or messaging us, you agree to them.
              </p>

              <h2>Menus, hours and prices</h2>
              <p>
                We keep the menu, hours and photos on this site current, but dishes, ingredients and availability
                change with the season and the market. Prices aren&apos;t listed online. What&apos;s on your menu and
                your bill at the restaurant is what applies.
              </p>

              <h2>Automated replies</h2>
              <p>
                Some messages, such as chats started from our listing on Google Search or Maps, may be answered first
                by an automated AI assistant. Its answers are general information drawn from our profile and this
                website, and they can be incomplete or wrong. Nothing an automated reply says is a confirmed
                reservation, booking, quote, price or allergy guarantee until a member of our team confirms it with
                you directly. If anything matters, call us on <a href={PHONE_HREF}>{PHONE_DISPLAY}</a>.
              </p>

              <h2>Reservations</h2>
              <p>
                Table reservations are made through{" "}
                <a href={OPENTABLE_URL} rel="noopener">
                  OpenTable
                </a>
                , and OpenTable&apos;s own terms apply to those bookings. Walk-ins are welcome when we have room.
              </p>

              <h2>Catering and private events</h2>
              <p>
                The catering form is a request, not a booking. An event is confirmed only when we agree the details
                with you in writing. Menus, pricing, deposits and cancellation terms are set in each event&apos;s own
                agreement, and that agreement takes priority over anything on this page.
              </p>

              <h2>Allergies and dietary needs</h2>
              <p>
                Our kitchen cooks with nuts, gluten, dairy, eggs, sesame and shellfish. We take allergies seriously
                and will tell you what we can, but we can&apos;t promise any dish is free of an allergen. Please tell
                your server, or tell us when you plan an event, about any allergy before you order.
              </p>

              <h2>Using the site</h2>
              <p>
                Please use the site and our messaging for genuine questions, bookings and inquiries. Don&apos;t send
                false or abusive messages, try to break or overload the site, or copy its content in bulk.
              </p>

              <h2>Our content</h2>
              <p>
                The {BUSINESS_NAME} name, logo, photos and text on this site belong to us. You&apos;re welcome to
                share links and to use our name when you talk about us; anything more needs our permission. Quoted
                reviews belong to the guests who wrote them.
              </p>

              <h2>Other sites</h2>
              <p>
                We link to OpenTable, Google, Instagram and others. We don&apos;t run those services, and their terms
                and privacy policies apply when you use them.
              </p>

              <h2>Our responsibility</h2>
              <p>
                The site is provided as it is. To the extent the law allows, we aren&apos;t liable for losses that
                come from relying on information on the site or in an automated reply. Nothing here limits your rights
                under California consumer law or our responsibility for the food and service you receive at the
                restaurant.
              </p>

              <h2>Law and changes</h2>
              <p>
                California law governs these terms, and any dispute will be handled in the courts of Los Angeles
                County. If we change these terms, we&apos;ll update the date at the top of the page.
              </p>

              <h2>Contact</h2>
              <p>
                Questions go to <a href={`mailto:${EMAIL}`}>{EMAIL}</a> or <a href={PHONE_HREF}>{PHONE_DISPLAY}</a>.
                How we handle your information is in our <Link href="/privacy-policy">privacy policy</Link>.
              </p>
              <p>
                <Link href="/">Back to the home page</Link>
              </p>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
