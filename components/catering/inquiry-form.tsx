"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { sendReservationEmail } from "@/actions/email-actions"
import { EMAIL, PHONE_DISPLAY, PHONE_HREF } from "@/lib/business-info"
import { trackMetaEvent } from "@/lib/meta-pixel"

// Hidden from sighted users, screen readers and the tab order, so a value here only
// ever comes from a bot filling every field it can find. Same field name as production.
const HONEYPOT_FIELD = "fax"

const EVENT_TYPES = [
  { value: "Wedding", label: "Wedding" },
  { value: "Corporate Event", label: "Corporate" },
  { value: "Private Dining", label: "Private dining" },
  { value: "Birthday Celebration", label: "Birthday" },
  { value: "Anniversary", label: "Anniversary" },
  { value: "Other", label: "Other" },
]

const SERVICES = [
  { id: "s-servers", value: "Servers", label: "Servers" },
  { id: "s-bar", value: "Bartenders", label: "Bartenders" },
  { id: "s-rentals", value: "Rentals (tables, chairs)", label: "Rentals (tables, chairs)" },
  { id: "s-tea", value: "Moroccan Tea Service", label: "Moroccan tea service", defaultChecked: true },
  { id: "s-cook", value: "Live Cooking Station", label: "Live cooking station" },
  { id: "s-decor", value: "Decor", label: "Decor" },
]

const BUDGETS = ["$55–75 per person", "$75–100 per person", "$100+ per person"]

type FieldKey = "date" | "guests" | "loc" | "name" | "email" | "phone"
type Errors = Partial<Record<FieldKey, string>>

const FIELD_IDS: Record<FieldKey, string> = {
  date: "f-date",
  guests: "f-guests",
  loc: "f-loc",
  name: "f-name",
  email: "f-email",
  phone: "f-phone",
}

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "sent"; delivered: boolean }
  | { kind: "error"; message: string }

/** Today's date as YYYY-MM-DD in the visitor's local time zone (the input's `min`). */
function localToday(): string {
  const now = new Date()
  return new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 10)
}

/** "2026-11-14" -> "Saturday, November 14, 2026" (same wording the prototype summary used). */
function formatDate(iso: string): string {
  const d = new Date(`${iso}T00:00`)
  return d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })
}

/** "18:00" -> "6:00 pm" */
function formatTime(hhmm: string): string {
  const h = Number(hhmm.slice(0, 2))
  const m = hhmm.slice(3, 5)
  return `${h % 12 || 12}:${m} ${h < 12 ? "am" : "pm"}`
}

export function InquiryForm() {
  const formRef = useRef<HTMLFormElement>(null)
  const doneRef = useRef<HTMLDivElement>(null)
  const errorRef = useRef<HTMLDivElement>(null)
  const [eventType, setEventType] = useState(EVENT_TYPES[0].value)
  const [guests, setGuests] = useState("60")
  const [minDate, setMinDate] = useState<string | undefined>(undefined)
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<Status>({ kind: "idle" })

  // Computed after mount so the server-rendered HTML and the first client render agree.
  useEffect(() => setMinDate(localToday()), [])

  useEffect(() => {
    if (status.kind === "sent") doneRef.current?.focus()
    if (status.kind === "error") errorRef.current?.focus()
  }, [status])

  const step = (delta: number) => {
    const current = Number.parseInt(guests || "0", 10) || 0
    setGuests(String(Math.min(2000, Math.max(1, current + delta))))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (status.kind === "sending") return

    // Captured before the first await: React nulls currentTarget once the handler returns.
    const form = e.currentTarget
    const formData = new FormData(form)
    const v = (name: string) => ((formData.get(name) as string | null) ?? "").trim()

    // Production behaviour (components/reservation-form.tsx): reject rather than silently
    // discard, so a false positive still tells a real customer how else to reach us.
    if (v(HONEYPOT_FIELD) !== "") {
      setStatus({ kind: "error", message: "We couldn't verify this submission." })
      return
    }

    // Inline validation, messages identical to the approved prototype.
    const today = minDate ?? localToday()
    const date = v("date")
    const gv = Number.parseInt(v("guests"), 10)
    const next: Errors = {}
    if (!date) next.date = "Choose the date of your event."
    else if (date < today) next.date = "Choose a date from today onward."
    if (!(gv >= 1 && gv <= 2000)) next.guests = "Enter a guest count between 1 and 2,000."
    if (!v("location")) next.loc = "Tell us where the event will be."
    if (!v("name")) next.name = "Enter your name."
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v("email"))) next.email = "Enter an email address like name@example.com."
    if (v("phone").replace(/\D/g, "").length < 7) next.phone = "Enter a phone number we can reach you on."
    setErrors(next)

    const firstInvalid = (Object.keys(FIELD_IDS) as FieldKey[]).find((k) => next[k])
    if (firstInvalid) {
      document.getElementById(FIELD_IDS[firstInvalid])?.focus()
      return
    }

    // Map the prototype's field names onto the ones sendReservationEmail reads.
    const time = v("time")
    const payload = new FormData()
    payload.set("eventType", eventType)
    payload.set("eventDate", formatDate(date))
    if (time) payload.set("eventTime", formatTime(time))
    payload.set("guests", String(gv))
    payload.set("budget", v("budget"))
    payload.set("location", v("location"))
    payload.set("menu", v("menu"))
    formData.getAll("services").forEach((s) => payload.append("services", s))
    payload.set("notes", v("notes"))
    payload.set("name", v("name"))
    payload.set("email", v("email"))
    payload.set("phone", v("phone"))
    payload.set(HONEYPOT_FIELD, v(HONEYPOT_FIELD))

    setStatus({ kind: "sending" })
    try {
      const result = await sendReservationEmail(payload)
      if (result.success) {
        // delivered is true only when Resend accepted the email; the fallback path
        // (no API key, or Resend failed) returns success with delivered: false.
        setStatus({ kind: "sent", delivered: "delivered" in result && result.delivered === true })
        // Meta Pixel conversion. Event type only; never send the guest's name, email or phone.
        trackMetaEvent("Lead", { content_name: "Catering inquiry", content_category: String(payload.get("eventType") ?? "") })
      } else {
        setStatus({ kind: "error", message: result.message || "Something went wrong. Please try again." })
      }
    } catch (err) {
      console.error("Catering inquiry submission failed:", err)
      setStatus({ kind: "error", message: "An unexpected error occurred. Please try again." })
    }
  }

  const resetForm = () => {
    formRef.current?.reset()
    setEventType(EVENT_TYPES[0].value)
    setGuests("60")
    setErrors({})
    setStatus({ kind: "idle" })
  }

  const invalid = (k: FieldKey) => (errors[k] ? { "data-invalid": "" } : {})
  const describedBy = (k: FieldKey, errId: string) => (errors[k] ? { "aria-describedby": errId, "aria-invalid": true } : {})
  const sending = status.kind === "sending"

  return (
    <div className="inq__form">
      {status.kind === "sent" ? (
        <div className="done" ref={doneRef} tabIndex={-1} role="status">
          <p className="eyebrow">Inquiry received</p>
          <h2>Thank you. We have your inquiry.</h2>
          {status.delivered ? (
            <p className="body">
              We&apos;ll read through the details and get back to you within 24 hours. If you need us sooner, call{" "}
              <a href={PHONE_HREF} style={{ color: "var(--ink)", whiteSpace: "nowrap" }}>
                {PHONE_DISPLAY}
              </a>
              .
            </p>
          ) : (
            <p className="body">
              Your details were received, but our email notifications are delayed right now. To make sure we reply
              within 24 hours, please also call{" "}
              <a href={PHONE_HREF} style={{ color: "var(--ink)", whiteSpace: "nowrap" }}>
                {PHONE_DISPLAY}
              </a>{" "}
              or email{" "}
              <a href={`mailto:${EMAIL}`} style={{ color: "var(--ink)" }}>
                {EMAIL}
              </a>
              .
            </p>
          )}
          <div className="acts">
            <button className="btn" type="button" onClick={resetForm}>
              Send another inquiry
            </button>
          </div>
        </div>
      ) : (
        <form ref={formRef} id="inqForm" noValidate onSubmit={handleSubmit} aria-busy={sending}>
          <fieldset disabled={sending}>
            <legend>The event</legend>
            <div className="field">
              <span className="lab" id="type-lab">
                Event type
              </span>
              <div className="chips" role="group" aria-labelledby="type-lab" id="typeChips">
                {EVENT_TYPES.map((t) => (
                  <button
                    key={t.value}
                    className="chip"
                    type="button"
                    aria-pressed={eventType === t.value}
                    onClick={() => setEventType(t.value)}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
              <input type="hidden" name="eventType" value={eventType} />
            </div>
            <div className="row">
              <div className="field" {...invalid("date")}>
                <label htmlFor="f-date">
                  Event date <span className="req">required</span>
                </label>
                <input id="f-date" name="date" type="date" required min={minDate} {...describedBy("date", "e-date")} />
                <span className="err" id="e-date">
                  {errors.date}
                </span>
              </div>
              <div className="field">
                <label htmlFor="f-time">Event time</label>
                <input id="f-time" name="time" type="time" defaultValue="18:00" />
              </div>
            </div>
            <div className="row">
              <div className="field" {...invalid("guests")}>
                <label htmlFor="f-guests">
                  Number of guests <span className="req">required</span>
                </label>
                <div className="guests">
                  <button type="button" id="gMinus" aria-label="Fewer guests" onClick={() => step(-10)}>
                    −
                  </button>
                  <input
                    id="f-guests"
                    name="guests"
                    type="number"
                    inputMode="numeric"
                    min={1}
                    max={2000}
                    required
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    {...describedBy("guests", "e-guests")}
                  />
                  <button type="button" id="gPlus" aria-label="More guests" onClick={() => step(10)}>
                    +
                  </button>
                </div>
                <span className="err" id="e-guests">
                  {errors.guests}
                </span>
              </div>
              <div className="field">
                <label htmlFor="f-budget">Budget per person</label>
                <select id="f-budget" name="budget" defaultValue="">
                  <option value="">Select a range</option>
                  {BUDGETS.map((b) => (
                    <option key={b}>{b}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="field" {...invalid("loc")}>
              <label htmlFor="f-loc">
                Event location <span className="req">required</span>
              </label>
              <input
                id="f-loc"
                name="location"
                type="text"
                placeholder="Address of the event, or “At the riad on Melrose”"
                required
                autoComplete="street-address"
                {...describedBy("loc", "e-loc")}
              />
              <span className="err" id="e-loc">
                {errors.loc}
              </span>
            </div>
          </fieldset>

          <fieldset disabled={sending}>
            <legend>Food &amp; service</legend>
            <div className="field">
              <label htmlFor="f-menu">Menu preferences</label>
              <textarea
                id="f-menu"
                name="menu"
                placeholder="Dishes you love, dietary needs, family-style or plated"
              />
            </div>
            <div className="field">
              <span className="lab" id="svc-lab">
                Additional services
              </span>
              <div className="checks" role="group" aria-labelledby="svc-lab">
                {SERVICES.map((s) => (
                  <label className="check" key={s.id}>
                    <input type="checkbox" id={s.id} name="services" value={s.value} defaultChecked={s.defaultChecked} />
                    {s.label}
                  </label>
                ))}
              </div>
            </div>
            <div className="field">
              <label htmlFor="f-notes">Special requests or notes</label>
              <textarea id="f-notes" name="notes" placeholder="Anything else we should know" />
            </div>
          </fieldset>

          <fieldset disabled={sending}>
            <legend>Your details</legend>
            <div className="field" {...invalid("name")}>
              <label htmlFor="f-name">
                Name <span className="req">required</span>
              </label>
              <input id="f-name" name="name" type="text" autoComplete="name" required {...describedBy("name", "e-name")} />
              <span className="err" id="e-name">
                {errors.name}
              </span>
            </div>
            <div className="row">
              <div className="field" {...invalid("email")}>
                <label htmlFor="f-email">
                  Email <span className="req">required</span>
                </label>
                <input
                  id="f-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  {...describedBy("email", "e-email")}
                />
                <span className="err" id="e-email">
                  {errors.email}
                </span>
              </div>
              <div className="field" {...invalid("phone")}>
                <label htmlFor="f-phone">
                  Phone <span className="req">required</span>
                </label>
                <input
                  id="f-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  required
                  {...describedBy("phone", "e-phone")}
                />
                <span className="err" id="e-phone">
                  {errors.phone}
                </span>
              </div>
            </div>
            <div className="hp" aria-hidden="true">
              <label htmlFor="f-fax">Leave this empty</label>
              <input id="f-fax" name={HONEYPOT_FIELD} type="text" tabIndex={-1} autoComplete="off" />
            </div>
          </fieldset>

          {status.kind === "error" && (
            <div className="side-card" role="alert" ref={errorRef} tabIndex={-1}>
              <h3>We couldn&rsquo;t send your inquiry</h3>
              <p className="err">{status.message}</p>
              <p>
                Please try again, or reach us directly at{" "}
                <a href={PHONE_HREF} style={{ color: "var(--ink)", whiteSpace: "nowrap" }}>
                  {PHONE_DISPLAY}
                </a>{" "}
                or{" "}
                <a href={`mailto:${EMAIL}`} style={{ color: "var(--ink)" }}>
                  {EMAIL}
                </a>
                .
              </p>
            </div>
          )}

          <button className="btn btn--fill submit" type="submit" disabled={sending} aria-disabled={sending}>
            {sending ? "Sending…" : "Send inquiry"}
          </button>
          <p className="vh" role="status" aria-live="polite">
            {sending ? "Sending your inquiry…" : ""}
          </p>
          <p className="fine">We reply within 24 hours. For dates in the next two weeks, please also call.</p>
        </form>
      )}
    </div>
  )
}
