import Image from "next/image"
import { CHEF_NAME, HOURS } from "@/lib/business-info"
import { FEATURED_REVIEW } from "@/lib/reviews"
import { LogoMark } from "@/components/site/logo"
import { formatTime } from "./format"

/** Four quick facts under the hero. */
export function FactsBand() {
  return (
    <div className="facts-band" aria-label="At a glance">
      <div className="wrap">
        <dl className="hero__strip">
          <div>
            <dt>Open daily</dt>
            <dd>
              {formatTime(HOURS.opens)} – {formatTime(HOURS.closes)}
            </dd>
          </div>
          <div>
            <dt>Reservations</dt>
            <dd>OpenTable &amp; walk-ins</dd>
          </div>
          <div>
            <dt>Kitchen</dt>
            <dd>Chef {CHEF_NAME}</dd>
          </div>
          <div>
            <dt>Seating</dt>
            <dd>Dining room &amp; courtyard</dd>
          </div>
        </dl>
      </div>
    </div>
  )
}

/** Red-ink Arabic line above the featured Google review. */
export function FeatureQuote() {
  return (
    <section className="quote" aria-label="From our guests">
      <div className="wrap inner">
        <p className="paint" lang="ar" dir="rtl" aria-label="A night in Morocco">
          ليلة في المغرب
        </p>
        <span className="orn" aria-hidden="true">
          <i></i>
        </span>
        <blockquote>{FEATURED_REVIEW.quote}</blockquote>
        <cite>
          <b>{FEATURED_REVIEW.author}</b> · Google review
        </cite>
      </div>
    </section>
  )
}

/** "Our story" on the zellige ground, with the chef portrait. */
export function Story() {
  return (
    <section className="story" id="story" aria-labelledby="story-h">
      <LogoMark className="ghost" />
      <div className="wrap">
        <div className="story__grid">
          <figure className="story__fig">
            <Image
              src="/images/redesign/chef.jpg"
              width={1400}
              height={1794}
              sizes="(max-width: 860px) 92vw, 38vw"
              alt={`Chef ${CHEF_NAME} in chef's whites, finishing a tray of canapés with olive oil, clay tagines lined up behind him.`}
              loading="lazy"
            />
            <figcaption>Chef {CHEF_NAME}</figcaption>
          </figure>
          <div className="story__txt">
            <p className="label">Our story</p>
            <h2 id="story-h">In Morocco, the best rooms face inward.</h2>
            <div className="body">
              <p>
                A riad is a Moroccan house built around a courtyard. It keeps its back to the street and does its
                living inside. Marrakesh LA works the same way: you come in off Melrose Avenue and the traffic stays
                outside.
              </p>
              <p>
                Chef {CHEF_NAME} grew up cooking in his family&apos;s kitchen in <strong>Casablanca</strong> and
                trained there professionally. He cooked for royal households, led kitchen teams at hotels in
                Casablanca and Tunisia, and ran his own cooking school for ten years before moving to Los Angeles in
                2011.
              </p>
              <p>
                He started here as a caterer, cooking for weddings and private dinners across the city. The restaurant
                came later. The food is the same: tagines braised for hours, couscous with seven vegetables, and mint
                tea at the end of the meal.
              </p>
            </div>
            <div className="sign">
              <p>Chef {CHEF_NAME}</p>
              <p>and the Marrakesh LA family</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
