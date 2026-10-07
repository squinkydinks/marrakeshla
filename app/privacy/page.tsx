import type { Metadata } from "next"
import Link from "next/link"
import { SiteHeader } from "@/components/site/site-header"
import { SiteFooter } from "@/components/site/site-footer"
import { AdTrackingChoice } from "@/components/privacy/ad-tracking-choice"
import { ADDRESS_ONE_LINE, BUSINESS_NAME, EMAIL, PHONE_DISPLAY, PHONE_HREF } from "@/lib/business-info"

const UPDATED = "October 7, 2026"
const TITLE = `Privacy Policy | ${BUSINESS_NAME}`
const DESCRIPTION = `What ${BUSINESS_NAME} collects through marrakeshla.com, how we use it, and your privacy choices, including how to opt out of ad tracking.`

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/privacy" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/privacy", siteName: BUSINESS_NAME, type: "website" },
}

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <section className="sec privacy" aria-labelledby="privacy-h">
          <div className="wrap">
            <div className="shead">
              <div className="shead__l">
                <p className="eyebrow">Last updated {UPDATED}</p>
                <h1 className="h-sec" id="privacy-h">
                  Privacy policy
                </h1>
              </div>
              <div className="shead__r">
                <p className="stand">
                  What we collect when you use marrakeshla.com, what we do with it, and how to opt out. We don&apos;t
                  sell your name, email or phone number to anyone.
                </p>
              </div>
            </div>

            <div className="body privacy__body">
              <p>
                This policy covers the website of {BUSINESS_NAME} (Riad Al Maghrib), {ADDRESS_ONE_LINE}. When it says
                &ldquo;we&rdquo; or &ldquo;us&rdquo;, it means the restaurant.
              </p>

              <h2>What you give us</h2>
              <p>
                When you send a catering or event inquiry, we collect what you type into the form: your name, email,
                phone number and the event details (date, time, guest count, location, budget, menu notes and any
                other requests). The form sends it to our inbox at {EMAIL} through our email provider, Resend. We use
                it to reply to you, plan your event and keep a record of the booking. We don&apos;t add you to a
                mailing list.
              </p>
              <p>
                If you call or email us directly, we keep what you tell us for the same reasons.
              </p>

              <h2>What is collected automatically</h2>
              <p>
                <strong>Site statistics.</strong> We use Vercel Web Analytics and Speed Insights to count visits and
                see how fast pages load. They don&apos;t use cookies and don&apos;t build a profile of you.
              </p>
              <p>
                <strong>Meta Pixel.</strong> We use the Meta Pixel, a small piece of code from Meta (the company
                behind Facebook and Instagram). It tells Meta which pages you view and whether you sent an inquiry,
                tapped our phone number or email, or clicked through to book on OpenTable. Meta also receives your IP
                address, browser and device details, and sets its own cookies. We use this to measure our ads and to
                show our ads to people who have visited the site. We never send Meta the name, email or phone number
                you type into our form. Meta handles this data under its own{" "}
                <a href="https://www.facebook.com/privacy/policy/" rel="noopener">
                  privacy policy
                </a>
                .
              </p>
              <p>
                <strong>Your settings.</strong> Your light or dark theme choice, and your ad-tracking choice below,
                are saved in your own browser. They aren&apos;t sent to us.
              </p>

              <h2 id="opt-out">Opt out of ad tracking</h2>
              <p>
                Under California law, using the Meta Pixel for advertising counts as &ldquo;sharing&rdquo; personal
                information. You can turn it off for this browser here. If your browser sends a Global Privacy Control
                signal, we treat that as an opt-out automatically.
              </p>
              <AdTrackingChoice />
              <p>
                You can also limit ads in your Facebook and Instagram{" "}
                <a href="https://accountscenter.facebook.com/ad_preferences" rel="noopener">
                  ad preferences
                </a>
                .
              </p>

              <h2>Other sites we link to</h2>
              <p>
                Reservations are handled by OpenTable, directions by Google Maps, and photos live on Instagram. When
                you follow those links, their own privacy policies apply.
              </p>

              <h2>How long we keep it</h2>
              <p>
                We keep inquiry emails for as long as we need them to plan and account for events, then delete them.
                Ask us and we will delete yours sooner, unless we have to keep it for a booking or tax records.
              </p>

              <h2>Your California privacy rights</h2>
              <p>
                If you live in California, you can ask us what personal information we have about you, ask us to
                correct or delete it, and opt out of its sale or sharing. We don&apos;t sell personal information,
                and we won&apos;t treat you differently for using any of these rights. To make a request, email{" "}
                <a href={`mailto:${EMAIL}`}>{EMAIL}</a> or call <a href={PHONE_HREF}>{PHONE_DISPLAY}</a>. We may ask
                you to confirm the contact details you used with us so we know the request is yours, and we will
                reply within 45 days.
              </p>

              <h2>Children</h2>
              <p>
                This site is for adults planning meals and events. We don&apos;t knowingly collect information from
                anyone under 16.
              </p>

              <h2>Changes and contact</h2>
              <p>
                If we change this policy, we&apos;ll update the date at the top of the page. Questions go to{" "}
                <a href={`mailto:${EMAIL}`}>{EMAIL}</a>, <a href={PHONE_HREF}>{PHONE_DISPLAY}</a>, or in person at{" "}
                {ADDRESS_ONE_LINE}.
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
