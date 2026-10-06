import Image from "next/image"
import { CHEF_NAME, OPENTABLE_URL } from "@/lib/business-info"
import { MenuTabs } from "@/components/site/menu-tabs"

const SIGNATURES = [
  {
    name: "Lamb Tagine with Prunes",
    desc: "Slow-cooked lamb, prunes, almonds",
    src: "/images/redesign/lamb-prunes.jpg",
    w: 1400,
    h: 1419,
    alt: "Lamb shank glazed dark and glossy, scattered with toasted almonds and prunes, on a white plate.",
  },
  {
    name: "Whole Branzino",
    desc: "Herbs and olive oil, served with vegetables",
    src: "/images/redesign/branzino.jpg",
    w: 1400,
    h: 1493,
    alt: "A whole grilled branzino with charred skin, grilled asparagus and a lemon half.",
  },
  {
    name: "Moroccan Mezze",
    desc: "Carrot, eggplant, tomato and cucumber, beet, hummus, goat cheese with harissa. Serves two.",
    src: "/images/redesign/mezze.jpg",
    w: 1600,
    h: 986,
    alt: "A spread of small Moroccan salads in ceramic bowls: beets, spiced carrots, eggplant and tomato with cucumber.",
  },
  {
    name: "Lemon Chicken with Olives",
    desc: "Chicken, olives, lemon sauce",
    src: "/images/redesign/chicken-olives.jpg",
    w: 1600,
    h: 1197,
    alt: "Chicken with green olives and preserved lemon in a golden sauce, on hand-painted Moroccan pottery.",
  },
]

/** Four signature plates. No prices online, by design. */
export function Signatures() {
  return (
    <section className="sec" aria-labelledby="sig-h">
      <div className="wrap">
        <div className="shead">
          <div className="shead__l">
            <p className="eyebrow">From the kitchen</p>
            <h2 className="h-sec" id="sig-h">
              The plates guests come back for
            </h2>
          </div>
          <div className="shead__r">
            <p className="stand">
              If it&apos;s your first visit, start here.
            </p>
          </div>
        </div>
        <div className="sigs">
          {SIGNATURES.map((s) => (
            <article className="sig" key={s.name}>
              <figure>
                <Image
                  src={s.src}
                  width={s.w}
                  height={s.h}
                  sizes="(max-width: 520px) 92vw, (max-width: 1040px) 46vw, 24vw"
                  alt={s.alt}
                  loading="lazy"
                />
              </figure>
              <div className="sig__row">
                <h3>{s.name}</h3>
              </div>
              <p>{s.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/** À la carte: tabs + carte from lib/menu.ts, then two photographs. */
export function MenuSection() {
  return (
    <section className="sec menu" id="menu" aria-labelledby="menu-h">
      <div className="wrap">
        <div className="shead">
          <div className="shead__l">
            <p className="eyebrow">The menu · by Chef {CHEF_NAME}</p>
            <h2 className="h-sec" id="menu-h">
              À la carte
            </h2>
          </div>
          <div className="shead__r">
            <p className="stand">
              Lunch and dinner, every day. Plenty of the menu is vegetarian, and your server can point it out.
            </p>
          </div>
        </div>

        <MenuTabs />

        <div className="menu__foot">
          <span>Please tell your server about any allergies or dietary needs.</span>
          <a className="tlink" href={OPENTABLE_URL} rel="noopener">
            Book a table
          </a>
        </div>

        <div className="menu__fig">
          <figure>
            <Image
              src="/images/redesign/mezze-spread.jpg"
              width={1600}
              height={947}
              sizes="(max-width: 860px) 92vw, 56vw"
              alt="Mezze set out on the pass before service: carrots, beets, eggplant and a chopped tomato salad in white and green bowls."
              loading="lazy"
            />
            <figcaption>Mezze, set out before service</figcaption>
          </figure>
          <figure>
            <Image
              src="/images/redesign/lamb-plate.jpg"
              width={1200}
              height={1216}
              sizes="(max-width: 860px) 92vw, 36vw"
              alt="Braised lamb with almonds and herbs in a deep sauce."
              loading="lazy"
            />
            <figcaption>Braised lamb with almonds</figcaption>
          </figure>
        </div>
      </div>
    </section>
  )
}
