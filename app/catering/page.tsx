import type { Metadata } from "next"
import Image from "next/image"
import { SiteHeader } from "@/components/site/site-header"
import { SiteFooter } from "@/components/site/site-footer"
import { InquiryForm } from "@/components/catering/inquiry-form"
import { ADDRESS, BUSINESS_NAME, CHEF_NAME, EMAIL, PHONE_DISPLAY, PHONE_HREF } from "@/lib/business-info"

const CATERING_TITLE = "Catering & Private Events | Marrakesh LA"
const CATERING_DESCRIPTION = `Catering and private events by Marrakesh LA: weddings, corporate events and private dining by Chef ${CHEF_NAME}. Send an inquiry and we reply within 24 hours.`

const CATERING_OG_IMAGE = {
  url: "/images/redesign/banquet.jpg",
  width: 1800,
  height: 1200,
  alt: "A round wedding table dressed with white flowers, candles, crystal and small plates of Moroccan salads.",
}

export const metadata: Metadata = {
  title: CATERING_TITLE,
  description: CATERING_DESCRIPTION,
  alternates: {
    canonical: "/catering",
  },
  openGraph: {
    title: CATERING_TITLE,
    description: CATERING_DESCRIPTION,
    url: "/catering",
    siteName: BUSINESS_NAME,
    locale: "en_US",
    type: "website",
    images: [CATERING_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: CATERING_TITLE,
    description: CATERING_DESCRIPTION,
    images: [CATERING_OG_IMAGE.url],
  },
}

const CHEF_FIRST_NAME = CHEF_NAME.split(" ")[0]

const SERVICES = [
  {
    title: "Weddings",
    copy: "An authentic Moroccan feast for your day, served with ceremony and care.",
    points: [
      "Customized menu planning",
      "Traditional Moroccan wedding dishes",
      "Elegant presentation and service",
      "Moroccan tea ceremony",
    ],
    img: { src: "/images/redesign/banquet.jpg", width: 1800, height: 1200 },
    alt: "Wedding table with white florals and Moroccan small plates.",
  },
  {
    title: "Corporate events",
    copy: "A table your clients and colleagues will talk about, from boardroom lunch to company reception.",
    points: [
      "Menus for any business occasion",
      "Buffet or seated service",
      "Professional staff and presentation",
      "Dietary accommodations",
    ],
    img: { src: "/images/redesign/plated.jpg", width: 1600, height: 1200 },
    alt: "A round table set with painted tagines, salads and mezze for a corporate lunch.",
  },
  {
    title: "Private dining",
    copy: `Chef ${CHEF_FIRST_NAME} in your kitchen, or the courtyard on Melrose reserved for your guests.`,
    points: [
      "Personal menu consultation",
      "In-home chef experience",
      "Complete setup and cleanup",
      "Cooking demonstrations",
    ],
    img: { src: "/images/redesign/seven-veg.jpg", width: 1122, height: 1374 },
    alt: "Seven-vegetable couscous with lamb in a painted clay dish.",
    style: { objectPosition: "50% 45%" },
  },
]

const SVC_SIZES = "(max-width: 600px) 92vw, (max-width: 960px) 40vw, 30vw"

export default function CateringPage() {
  return (
    <>
      <SiteHeader current="catering" cta={{ href: "#inquire", label: "Inquire" }} />

      <main id="main">
        <section className="c-hero" aria-labelledby="c-h">
          <Image
            className="c-hero__img"
            src="/images/redesign/banquet.jpg"
            width={1800}
            height={1200}
            sizes="100vw"
            priority
            alt="A round wedding table dressed with white flowers, candles, crystal and small plates of Moroccan salads."
          />
          <div className="wrap">
            <div className="c-hero__panel">
              <p className="eyebrow">Catering &amp; private events</p>
              <h1 id="c-h">
                The riad, <em>at your table</em>
                <span className="ar" lang="ar" dir="rtl">
                  الضيافة المغربية
                </span>
              </h1>
              <p className="stand">
                Before the dining room on Melrose, this kitchen cooked for weddings, boardrooms and private homes across
                Los Angeles. It still does. Tell us about your event and we will write a menu for it.
              </p>
              <div className="c-hero__cta">
                <a className="btn btn--fill" href="#inquire">
                  Start an inquiry
                </a>
                <a className="btn" href={PHONE_HREF}>
                  Call {PHONE_DISPLAY}
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="sec" aria-labelledby="svc-h">
          <div className="wrap">
            <div className="shead">
              <div className="shead__l">
                <p className="eyebrow">What we cater</p>
                <h2 className="h-sec" id="svc-h">
                  From forty guests to four hundred
                </h2>
              </div>
              <div className="shead__r">
                <p className="stand">
                  Intimate dinners or grand celebrations, each menu is built around your guests, your room and your
                  budget.
                </p>
              </div>
            </div>
            <div className="svc">
              {SERVICES.map((s) => (
                <article key={s.title}>
                  <Image
                    src={s.img.src}
                    width={s.img.width}
                    height={s.img.height}
                    sizes={SVC_SIZES}
                    alt={s.alt}
                    style={s.style}
                  />
                  <div className="in">
                    <h3>{s.title}</h3>
                    <p>{s.copy}</p>
                    <ul>
                      {s.points.map((p) => (
                        <li key={p}>{p}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="sec" id="inquire" aria-labelledby="inq-h" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <div className="shead">
              <div className="shead__l">
                <p className="eyebrow">Inquiry</p>
                <h2 className="h-sec" id="inq-h">
                  Plan your event
                </h2>
              </div>
              <div className="shead__r">
                <p className="stand">Share the date, the guest count and what you need. We reply within 24 hours.</p>
              </div>
            </div>

            <div className="inq">
              <InquiryForm />

              <aside className="inq__side" aria-label="Catering contacts">
                <div className="side-card">
                  <h3>Talk to us</h3>
                  <dl>
                    <div>
                      <dt className="label">Telephone</dt>
                      <dd>
                        <a href={PHONE_HREF}>{PHONE_DISPLAY}</a>
                      </dd>
                    </div>
                    <div>
                      <dt className="label">Email</dt>
                      <dd>
                        <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
                      </dd>
                    </div>
                    <div>
                      <dt className="label">Find us</dt>
                      <dd>
                        {ADDRESS.street}, {ADDRESS.locality}
                      </dd>
                    </div>
                  </dl>
                </div>
                <div className="side-card">
                  <h3>What happens next</h3>
                  <ol className="steps">
                    <li>
                      <b>1</b>
                      <span>We call or email within 24 hours to talk through the day.</span>
                    </li>
                    <li>
                      <b>2</b>
                      <span>We plan the menu with you around your guests and budget.</span>
                    </li>
                    <li>
                      <b>3</b>
                      <span>We confirm the details and the date is yours.</span>
                    </li>
                  </ol>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section className="sec" aria-label="Catering gallery" style={{ paddingTop: 0 }}>
          <div className="wrap strip">
            <figure>
              <Image
                src="/images/redesign/plated.jpg"
                width={1600}
                height={1200}
                sizes="(max-width: 760px) 92vw, 50vw"
                alt="Painted tagines, salads and couscous set out family-style."
              />
            </figure>
            <figure>
              <Image
                src="/images/redesign/canapes.jpg"
                width={1090}
                height={1354}
                sizes="(max-width: 760px) 46vw, 25vw"
                alt="Smoked salmon and cucumber canapés in rows."
              />
            </figure>
            <figure>
              <Image
                src="/images/redesign/spread.jpg"
                width={828}
                height={820}
                sizes="(max-width: 760px) 46vw, 25vw"
                alt="A buffet of tagines, couscous and beet salad."
              />
            </figure>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  )
}
