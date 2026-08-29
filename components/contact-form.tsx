"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, Check, Mail, MapPin, Phone } from "lucide-react"
import { cn } from "@/lib/utils"
import { sendContactEmail } from "@/actions/email-actions"
import { ADDRESS, ADDRESS_CITY_LINE, EMAIL, GOOGLE_MAPS_URL, PHONE_DISPLAY, PHONE_HREF } from "@/lib/business-info"

// Hidden from sighted users, screen readers and the tab order, so a value here only
// ever comes from a bot filling every field it can find.
const HONEYPOT_FIELD = "fax"

export function ContactForm() {
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Captured before the first await: React nulls currentTarget once the handler
    // returns, and the form unmounts as soon as the success panel renders.
    const form = e.currentTarget
    const formData = new FormData(form)

    // Reject rather than silently discarding: a false positive must never make a
    // real enquiry vanish without telling the customer how else to reach us.
    if (((formData.get(HONEYPOT_FIELD) as string) ?? "").trim() !== "") {
      setError("We couldn't verify this submission.")
      return
    }
    formData.delete(HONEYPOT_FIELD)

    setIsSubmitting(true)
    setError(null)

    try {
      // Add the date if selected
      if (date) {
        formData.set("eventDate", format(date, "PPP"))
      }

      const result = await sendContactEmail(formData)

      if (result.success) {
        setIsSubmitted(true)
        form.reset()
        setDate(undefined)
        // Return to the empty form after the confirmation has been read.
        setTimeout(() => setIsSubmitted(false), 5000)
      } else {
        setError(result.message || "Something went wrong. Please try again.")
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.")
      console.error("Contact form submission failed:", err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-20 bg-morocco-charcoal reveal section-deferred">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-morocco-amber mb-6">
              Book Your Catering Experience
            </h2>
            <p className="text-lg mb-8 text-morocco-givry">
              Ready to bring the flavors of Morocco to your next event? Fill out the form below, and we'll get back to
              you within 24 hours to discuss your catering needs.
            </p>

            <div className="space-y-6 text-white">
              <div className="flex items-start">
                <MapPin className="h-6 w-6 text-morocco-amber mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-lg">Our Location</h3>
                  <p>{ADDRESS.street}</p>
                  <p>{ADDRESS_CITY_LINE}</p>
                  <a
                    href={GOOGLE_MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-morocco-amber hover:underline"
                  >
                    Get directions
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <Phone className="h-6 w-6 text-morocco-amber mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-lg">Phone</h3>
                  <p>
                    <a href={PHONE_HREF} className="hover:text-morocco-amber transition-colors">
                      {PHONE_DISPLAY}
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <Mail className="h-6 w-6 text-morocco-amber mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-lg">Email</h3>
                  <p>{EMAIL}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-morocco-charcoal-light rounded-lg shadow-lg p-8 border border-morocco-amber/20">
            {isSubmitted ? (
              <div className="text-center py-8" role="status">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-morocco-clover/20 mb-4">
                  <Check className="h-8 w-8 text-morocco-amber" />
                </div>
                <h3 className="text-2xl font-display font-bold text-morocco-amber mb-4">Thank You!</h3>
                <p className="text-lg text-morocco-givry">
                  Your catering inquiry has been received. We'll contact you within 24 hours to discuss your event
                  details.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-6"
                aria-busy={isSubmitting}
                aria-describedby={error ? "contact-form-error" : undefined}
              >
                {error && (
                  <div
                    id="contact-form-error"
                    role="alert"
                    className="p-3 bg-red-500/20 border border-red-500/50 rounded-md text-white"
                  >
                    <p>{error}</p>
                    <p className="mt-2 text-sm">
                      Your inquiry has not reached us. Please call{" "}
                      <a href={PHONE_HREF} className="text-morocco-amber hover:underline">
                        {PHONE_DISPLAY}
                      </a>{" "}
                      or email{" "}
                      <a href={`mailto:${EMAIL}`} className="text-morocco-amber hover:underline">
                        {EMAIL}
                      </a>{" "}
                      and we'll take your details directly.
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="block font-medium text-white">
                      Full Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Your name"
                      required
                      maxLength={100}
                      autoComplete="name"
                      className="border-morocco-amber/30 focus-visible:ring-morocco-amber bg-morocco-charcoal text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="block font-medium text-white">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your@email.com"
                      required
                      maxLength={254}
                      autoComplete="email"
                      className="border-morocco-amber/30 focus-visible:ring-morocco-amber bg-morocco-charcoal text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="phone" className="block font-medium text-white">
                      Phone Number
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="(123) 456-7890"
                      required
                      maxLength={30}
                      autoComplete="tel"
                      className="border-morocco-amber/30 focus-visible:ring-morocco-amber bg-morocco-charcoal text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    {/* A popover trigger is a button, which a <label> cannot name, so the
                        text is associated with aria-labelledby instead. */}
                    <span id="contact-event-date-label" className="block font-medium text-white">
                      Event Date
                    </span>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          type="button"
                          id="contact-event-date-trigger"
                          aria-labelledby="contact-event-date-label contact-event-date-trigger"
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal border-morocco-amber/30 focus-visible:ring-morocco-amber bg-morocco-charcoal",
                            !date && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : <span>Select a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 bg-morocco-charcoal-light border-morocco-amber/30">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                          disabled={(date) => date < new Date()}
                          className="bg-morocco-charcoal-light text-white"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="guests" className="block font-medium text-white">
                    Number of Guests
                  </label>
                  <Input
                    id="guests"
                    name="guests"
                    type="number"
                    min={1}
                    max={2000}
                    placeholder="Estimated number of guests"
                    className="border-morocco-amber/30 focus-visible:ring-morocco-amber bg-morocco-charcoal text-white"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="block font-medium text-white">
                    Special Requests
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell us about your event, dietary requirements, or any special requests"
                    rows={4}
                    maxLength={2000}
                    className="border-morocco-amber/30 focus-visible:ring-morocco-amber bg-morocco-charcoal text-white"
                  />
                </div>

                <div className="sr-only" aria-hidden="true">
                  <label htmlFor="contact-fax">Do not fill this in</label>
                  <input
                    id="contact-fax"
                    name={HONEYPOT_FIELD}
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    defaultValue=""
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-morocco-amber hover:bg-morocco-amber-light text-white font-medium"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Submit Inquiry"}
                </Button>

                <p className="sr-only" role="status" aria-live="polite">
                  {isSubmitting ? "Sending your catering inquiry." : ""}
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
