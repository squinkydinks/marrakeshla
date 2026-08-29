"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { format } from "date-fns"
import { CalendarIcon, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { sendReservationEmail } from "@/actions/email-actions"
import { EMAIL, PHONE_DISPLAY, PHONE_HREF } from "@/lib/business-info"

// Hidden from sighted users, screen readers and the tab order, so a value here only
// ever comes from a bot filling every field it can find.
const HONEYPOT_FIELD = "fax"

export function ReservationForm() {
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [eventType, setEventType] = useState("")
  const [budget, setBudget] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [selectedServices, setSelectedServices] = useState<string[]>([])

  const handleServiceChange = (service: string, checked: boolean) => {
    if (checked) {
      setSelectedServices((prev) => [...prev, service])
    } else {
      setSelectedServices((prev) => prev.filter((s) => s !== service))
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Captured before the first await: React nulls currentTarget once the handler
    // returns, and the form unmounts as soon as the confirmation panel renders.
    const form = e.currentTarget
    const formData = new FormData(form)

    // Reject rather than silently discarding: a false positive must never make a
    // real request vanish without telling the customer how else to reach us.
    if (((formData.get(HONEYPOT_FIELD) as string) ?? "").trim() !== "") {
      setError("We couldn't verify this submission.")
      return
    }
    formData.delete(HONEYPOT_FIELD)

    // The event type lives in a custom Select, so the browser's own required-field
    // check never sees it. Catch it here instead of letting the server bounce it back.
    if (!eventType) {
      setError("Please select an event type.")
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      // Add the date if selected
      if (date) {
        formData.set("eventDate", format(date, "PPP"))
      }

      // Add selected services
      if (selectedServices.length > 0) {
        // Clear any existing services to avoid duplication
        formData.delete("services")
        selectedServices.forEach((service) => {
          formData.append("services", service)
        })
      }

      const result = await sendReservationEmail(formData)

      if (result.success) {
        setIsSubmitted(true)
        form.reset()
        setDate(undefined)
        setEventType("")
        setBudget("")
        setSelectedServices([])
        // Return to the empty form after the confirmation has been read.
        setTimeout(() => setIsSubmitted(false), 5000)
      } else {
        setError(result.message || "Something went wrong. Please try again.")
      }
    } catch (err) {
      console.error("Reservation form submission failed:", err)
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const services = [
    { id: "servers", label: "Servers" },
    { id: "bartenders", label: "Bartenders" },
    { id: "rentals", label: "Rentals (tables, chairs)" },
    { id: "tea", label: "Moroccan Tea Service" },
    { id: "cooking", label: "Live Cooking Station" },
    { id: "decor", label: "Decor" },
  ]

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          {isSubmitted ? (
            <Card className="border-morocco-salmon/20 bg-morocco-charcoal-light">
              <CardContent className="pt-6">
                <div className="text-center py-8" role="status">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-morocco-clover/20 mb-4">
                    <Check className="h-8 w-8 text-morocco-amber" />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-morocco-amber mb-4">Reservation Received!</h3>
                  <p className="text-lg mb-4 text-morocco-givry">
                    Thank you for your catering reservation request. Our team will review your details and contact you
                    within 24 hours to discuss your event further.
                  </p>
                  <p className="text-morocco-givry">
                    If you need immediate assistance, please call us at{" "}
                    <a href={PHONE_HREF} className="text-morocco-amber hover:underline">
                      {PHONE_DISPLAY}
                    </a>
                    .
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-morocco-salmon/20 bg-morocco-charcoal-light">
              <CardHeader>
                <CardTitle className="text-2xl text-morocco-amber">Event Details</CardTitle>
                <CardDescription className="text-morocco-givry">
                  Please provide the details of your event so we can prepare a customized catering proposal.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {error && (
                  <div
                    id="reservation-form-error"
                    role="alert"
                    className="p-3 mb-4 bg-red-500/20 border border-red-500/50 rounded-md text-white"
                  >
                    <p>{error}</p>
                    <p className="mt-2 text-sm">
                      Your request has not reached us. Please call{" "}
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
                <form
                  onSubmit={handleSubmit}
                  className="space-y-6"
                  aria-busy={isSubmitting}
                  aria-describedby={error ? "reservation-form-error" : undefined}
                >
                  <div className="space-y-2">
                    <label htmlFor="eventType" className="block font-medium text-white">
                      Event Type
                    </label>
                    <Select value={eventType} onValueChange={setEventType} name="eventType" required>
                      <SelectTrigger
                        id="eventType"
                        className="border-morocco-salmon/30 focus-visible:ring-morocco-prairie"
                      >
                        <SelectValue placeholder="Select event type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="wedding">Wedding</SelectItem>
                        <SelectItem value="corporate">Corporate Event</SelectItem>
                        <SelectItem value="private">Private Dining</SelectItem>
                        <SelectItem value="birthday">Birthday Celebration</SelectItem>
                        <SelectItem value="anniversary">Anniversary</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      {/* A popover trigger is a button, which a <label> cannot name, so the
                          text is associated with aria-labelledby instead. */}
                      <span id="reservation-event-date-label" className="block font-medium text-white">
                        Event Date
                      </span>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            type="button"
                            id="reservation-event-date-trigger"
                            aria-labelledby="reservation-event-date-label reservation-event-date-trigger"
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal border-morocco-salmon/30 focus-visible:ring-morocco-prairie",
                              !date && "text-muted-foreground",
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP") : <span>Select a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                            disabled={(date) => date < new Date()}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="eventTime" className="block font-medium text-white">
                        Event Time
                      </label>
                      <Input
                        id="eventTime"
                        name="eventTime"
                        type="time"
                        className="border-morocco-salmon/30 focus-visible:ring-morocco-prairie"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                        required
                        className="border-morocco-salmon/30 focus-visible:ring-morocco-prairie"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="budget" className="block font-medium text-white">
                        Budget Range (per person)
                      </label>
                      <Select value={budget} onValueChange={setBudget} name="budget">
                        <SelectTrigger
                          id="budget"
                          className="border-morocco-salmon/30 focus-visible:ring-morocco-prairie"
                        >
                          <SelectValue placeholder="Select budget range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="$50-75 per person">$55-75 per person</SelectItem>
                          <SelectItem value="$75-100 per person">$75-100 per person</SelectItem>
                          <SelectItem value="$100+ per person">$100+ per person</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="location" className="block font-medium text-white">
                      Event Location
                    </label>
                    <Input
                      id="location"
                      name="location"
                      placeholder="Address of the event"
                      required
                      maxLength={200}
                      className="border-morocco-salmon/30 focus-visible:ring-morocco-prairie"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="menu" className="block font-medium text-white">
                      Menu Preferences
                    </label>
                    <Textarea
                      id="menu"
                      name="menu"
                      placeholder="Any specific dishes, dietary restrictions, or preferences"
                      rows={3}
                      maxLength={2000}
                      className="border-morocco-salmon/30 focus-visible:ring-morocco-prairie"
                    />
                  </div>

                  <div className="space-y-2" role="group" aria-labelledby="services-label">
                    <span id="services-label" className="block font-medium text-white">
                      Additional Services Needed
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      {services.map((service) => (
                        <label key={service.id} className="flex items-center space-x-2 text-white">
                          <input
                            type="checkbox"
                            name="services-checkbox"
                            className="rounded border-morocco-salmon/30 text-morocco-prairie"
                            checked={selectedServices.includes(service.label)}
                            onChange={(e) => handleServiceChange(service.label, e.target.checked)}
                          />
                          <span>{service.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="notes" className="block font-medium text-white">
                      Special Requests or Notes
                    </label>
                    <Textarea
                      id="notes"
                      name="notes"
                      placeholder="Any additional information about your event"
                      rows={3}
                      maxLength={2000}
                      className="border-morocco-salmon/30 focus-visible:ring-morocco-prairie"
                    />
                  </div>

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
                      className="border-morocco-salmon/30 focus-visible:ring-morocco-prairie"
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
                      className="border-morocco-salmon/30 focus-visible:ring-morocco-prairie"
                    />
                  </div>

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
                      className="border-morocco-salmon/30 focus-visible:ring-morocco-prairie"
                    />
                  </div>

                  <div className="sr-only" aria-hidden="true">
                    <label htmlFor="reservation-fax">Do not fill this in</label>
                    <input
                      id="reservation-fax"
                      name={HONEYPOT_FIELD}
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      defaultValue=""
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-morocco-prairie hover:bg-morocco-prairie/90 text-white"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Reservation Request"}
                  </Button>

                  <p className="sr-only" role="status" aria-live="polite">
                    {isSubmitting ? "Submitting your reservation request." : ""}
                  </p>
                </form>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="md:col-span-1">
          <div className="space-y-6 sticky top-24">
            <Card className="border-morocco-salmon/20 bg-morocco-charcoal-light">
              <CardHeader>
                <CardTitle className="text-xl text-morocco-amber">Need Help?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-morocco-givry">
                  If you have questions about our catering services or need assistance with your reservation, please
                  contact us:
                </p>
                <div className="space-y-2 text-morocco-givry">
                  <p className="flex items-center">
                    <span className="font-medium mr-2">Phone:</span>
                    <a href={PHONE_HREF} className="hover:text-morocco-amber transition-colors">
                      {PHONE_DISPLAY}
                    </a>
                  </p>
                  <p className="flex items-center">
                    <span className="font-medium mr-2">Email:</span> {EMAIL}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
