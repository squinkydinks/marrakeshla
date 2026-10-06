import { GOOGLE_REVIEWS_URL, GOOGLE_WRITE_REVIEW_URL, RATING, REVIEW_COUNT, REVIEWS } from "@/lib/reviews"

/** Verbatim Google review excerpts from lib/reviews.ts. Never invent or paraphrase. */
export function Reviews() {
  return (
    <section className="sec reviews" id="reviews" aria-labelledby="rev-h">
      <div className="wrap">
        <div className="shead">
          <div className="shead__l">
            <p className="eyebrow">Reviews from Google</p>
            <h2 className="h-sec" id="rev-h">
              What our guests are saying
            </h2>
          </div>
          <div className="shead__r">
            <div className="score">
              <b>{RATING}</b>
              <div>
                <span className="stars" role="img" aria-label={`${RATING} out of 5`}>
                  <i></i>
                  <i></i>
                  <i></i>
                  <i></i>
                  <i></i>
                </span>
                <span>{REVIEW_COUNT} Google reviews</span>
              </div>
            </div>
          </div>
        </div>

        <div className="rgrid">
          {REVIEWS.map((r) => (
            <figure className="rv" key={r.author}>
              <blockquote>{r.quote}</blockquote>
              <footer>
                <span>
                  <b>{r.author}</b>
                  {r.guide ? " · Local Guide" : null}
                </span>
                <span>Google</span>
              </footer>
            </figure>
          ))}
        </div>

        <div className="reviews__cta">
          <a className="btn" href={GOOGLE_REVIEWS_URL} rel="noopener">
            Read all reviews
          </a>
          <a className="tlink" href={GOOGLE_WRITE_REVIEW_URL} rel="noopener">
            Dined with us? Leave a review
          </a>
          <span className="reviews__note">Excerpts quoted from public Google reviews, October 2026.</span>
        </div>
      </div>
    </section>
  )
}
