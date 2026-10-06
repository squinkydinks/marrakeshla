import Image from "next/image"
import Link from "next/link"
import {
  ADDRESS,
  ADDRESS_CITY_LINE,
  BUSINESS_NAME,
  EMAIL,
  HOURS,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  OPENTABLE_URL,
  PHONE_DISPLAY,
  PHONE_HREF,
} from "@/lib/business-info"
import { GOOGLE_PLACE_ID } from "@/lib/reviews"
import { formatTime } from "./format"

const ROOM = [
  {
    cls: "r1",
    src: "/images/redesign/courtyard-fountain.jpg",
    w: 1000,
    h: 1501,
    sizes: "(max-width: 760px) 92vw, 32vw",
    alt: "The courtyard at night: a zellige-tiled fountain in green, white and red, ringed by potted palms and lantern light.",
    cap: "The courtyard fountain",
  },
  {
    cls: "r2",
    src: "/images/redesign/dining-room.jpg",
    w: 1600,
    h: 1067,
    sizes: "(max-width: 760px) 92vw, 64vw",
    alt: "Guests at low banquettes in the warm-lit lounge, a kilim runner down the centre of the room.",
    cap: "The lounge",
  },
  {
    cls: "r3",
    src: "/images/redesign/mint-tea.jpg",
    w: 1375,
    h: 914,
    sizes: "(max-width: 760px) 46vw, 32vw",
    alt: "A gold mint tea service on a brass tray with fresh mint and small glasses.",
    cap: "Mint tea",
  },
  {
    cls: "r4",
    src: "/images/redesign/courtyard-corner.jpg",
    w: 1080,
    h: 1469,
    sizes: "(max-width: 760px) 46vw, 32vw",
    alt: "A corner of the courtyard: exposed brick, a palm in a terracotta pot, a Berber rug and a leather pouf.",
    cap: "The courtyard",
  },
  {
    cls: "r5",
    src: "/images/redesign/lamb-clay.jpg",
    w: 1040,
    h: 694,
    sizes: "(max-width: 760px) 46vw, 32vw",
    alt: "A whole braised lamb shoulder in an unglazed clay dish.",
    cap: "Cooked in clay",
  },
  {
    cls: "r6",
    src: "/images/redesign/shrimp.jpg",
    w: 1200,
    h: 1023,
    sizes: "(max-width: 760px) 46vw, 48vw",
    alt: "Grilled shrimp in a spiced tomato sauce with green olives and lemon, served in a steel pan.",
    cap: "From the grill",
    pos: "50% 35%",
  },
]

/** Six-up gallery of the dining room and courtyard. */
export function Room() {
  return (
    <section className="sec" aria-labelledby="room-h">
      <div className="wrap">
        <div className="shead">
          <div className="shead__l">
            <p className="eyebrow">The riad</p>
            <h2 className="h-sec" id="room-h">
              Dining room &amp; courtyard
            </h2>
          </div>
          <div className="shead__r">
            <p className="stand">
              Sit up front by the windows onto Melrose, or further in, in the courtyard, where it&apos;s quieter.
            </p>
          </div>
        </div>
        <div className="room">
          {ROOM.map((r) => (
            <figure className={r.cls} key={r.cls}>
              <Image
                src={r.src}
                width={r.w}
                height={r.h}
                sizes={r.sizes}
                alt={r.alt}
                loading="lazy"
                style={r.pos ? { objectPosition: r.pos } : undefined}
              />
              <figcaption>{r.cap}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

/** Private dining & catering teaser; the full inquiry form lives on /catering. */
export function PrivateDining() {
  return (
    <section className="sec" id="private-dining" aria-labelledby="pd-h" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="pd__grid">
          <figure className="pd__fig">
            <Image
              src="/images/redesign/banquet.jpg"
              width={1800}
              height={1200}
              sizes="(max-width: 860px) 92vw, 58vw"
              alt="A round wedding table dressed with white flowers, candles, crystal and small plates of Moroccan salads."
              loading="lazy"
            />
            <figure className="pd__inset">
              <Image
                src="/images/redesign/spread.jpg"
                width={828}
                height={820}
                sizes="(max-width: 860px) 40vw, 20vw"
                alt="A catering spread of tagines, couscous and salads on a long table."
                loading="lazy"
              />
            </figure>
          </figure>
          <div className="pd__txt">
            <p className="eyebrow">Private dining &amp; catering</p>
            <h2 className="h-sec" id="pd-h">
              Weddings, dinners, office lunches
            </h2>
            <p className="body">
              Marrakesh LA started as a catering company, and catering is still a big part of what we do. Book the
              courtyard for a private evening, or we can cook at your venue, your office or your home. We plan every
              menu with the host.
            </p>
            <ul className="pd__list">
              <li>
                <b>Weddings</b>
                <span>Full service, from the first course to the last pot of tea.</span>
              </li>
              <li>
                <b>Private</b>
                <span>The courtyard or the lounge, booked just for your group.</span>
              </li>
              <li>
                <b>Corporate</b>
                <span>Lunches, receptions and canapé service.</span>
              </li>
            </ul>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px 24px", alignItems: "center" }}>
              <Link className="btn" href="/catering#inquire">
                Plan an event
              </Link>
              <span style={{ fontSize: 14, color: "var(--muted)" }}>
                {EMAIL} · {PHONE_DISPLAY}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const PLACE_NAME = encodeURIComponent(BUSINESS_NAME)
const DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${PLACE_NAME}&destination_place_id=${GOOGLE_PLACE_ID}`
const MAP_URL = `https://www.google.com/maps/search/?api=1&query=${PLACE_NAME}&query_place_id=${GOOGLE_PLACE_ID}`

/** Address, hours, a drawn street map and the contact list. */
export function Visit() {
  return (
    <section className="sec visit" id="visit" aria-labelledby="visit-h">
      <div className="wrap">
        <div className="visit__grid">
          <div className="visit__l">
            <p className="eyebrow">Visit</p>
            <h2 className="visit__addr" id="visit-h">
              {ADDRESS.street}
              <br />
              {ADDRESS_CITY_LINE}
            </h2>
            <dl className="hours">
              <div>
                <dt>Monday – Sunday</dt>
                <dd>
                  {formatTime(HOURS.opens, true)} – {formatTime(HOURS.closes, true)}
                </dd>
              </div>
              <div>
                <dt>Parking</dt>
                <dd>Street parking on Melrose and side streets</dd>
              </div>
            </dl>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              <a className="btn btn--fill" href={OPENTABLE_URL} rel="noopener">
                Reserve on OpenTable
              </a>
              <a className="btn" href={DIRECTIONS_URL} rel="noopener">
                Directions
              </a>
            </div>
          </div>
          <div className="visit__r">
            <a className="map" href={MAP_URL} rel="noopener" aria-label={`Open ${BUSINESS_NAME} in Google Maps`}>
              <svg viewBox="0 0 480 300" aria-hidden="true">
                <rect width="480" height="300" fill="var(--raised)" />
                <g stroke="var(--line)" strokeWidth="1" fill="none">
                  <path d="M0 50h480M0 100h480M0 210h480M0 260h480" />
                  <path d="M60 0v300M150 0v300M232 0v300M318 0v300M400 0v300" />
                </g>
                <path d="M0 155h480" stroke="var(--line-strong)" strokeWidth="10" />
                <text x="18" y="182" fill="var(--muted)" style={{ fontFamily: "var(--sans)" }} fontSize="10" letterSpacing="3">
                  MELROSE AVE
                </text>
                <text
                  x="238"
                  y="40"
                  fill="var(--muted)"
                  style={{ fontFamily: "var(--sans)" }}
                  fontSize="9"
                  letterSpacing="2.4"
                  transform="rotate(90 238 40)"
                >
                  N GARDNER ST
                </text>
                <text
                  x="156"
                  y="40"
                  fill="var(--muted)"
                  style={{ fontFamily: "var(--sans)" }}
                  fontSize="9"
                  letterSpacing="2.4"
                  transform="rotate(90 156 40)"
                >
                  N VISTA ST
                </text>
                <g transform="translate(196 128)">
                  <path d="M0 -24l13 13-13 13-13-13z" fill="var(--brass-text)" />
                  <path d="M0 2v20" stroke="var(--brass-text)" strokeWidth="1" />
                  <circle cx="0" cy="24" r="3" fill="var(--brass-text)" />
                </g>
                <rect x="252" y="94" width="122" height="34" fill="var(--surface)" stroke="var(--line-strong)" />
                <text
                  x="313"
                  y="116"
                  textAnchor="middle"
                  fill="var(--ink)"
                  style={{ fontFamily: "var(--display)" }}
                  fontSize="14"
                >
                  {BUSINESS_NAME}
                </text>
              </svg>
            </a>
            <dl className="contact">
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
                <dt className="label">Instagram</dt>
                <dd>
                  <a href={INSTAGRAM_URL} rel="noopener">
                    @{INSTAGRAM_HANDLE}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="label">Reservations</dt>
                <dd>
                  <a href={OPENTABLE_URL} rel="noopener">
                    OpenTable
                  </a>{" "}
                  · walk-ins welcome
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}
