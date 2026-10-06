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
                A riad keeps its back to the street and opens onto a courtyard: a fountain, a lemon tree, a long
                table, and the people you came to see. Marrakesh LA is built on that idea. Step in from Melrose
                Avenue and the city goes quiet behind you.
              </p>
              <p>
                Chef {CHEF_NAME} learned to cook at home in <strong>Casablanca</strong>, beside the people who fed
                him. Harira to break the fast. Couscous on Friday, piled with seven vegetables. Tagines left to take
                their own time over low heat. Professional kitchens taught him technique; home taught him patience,
                and patience is the part he has never changed.
              </p>
              <p>
                Before the riad, the same kitchen cooked for weddings and private tables across Los Angeles. The room
                now follows the food: low light and brass, cumin and orange blossom in the air, long dinners with
                plates passed across the table. In Morocco, a guest is treated as family.
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
