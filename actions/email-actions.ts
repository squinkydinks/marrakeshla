"use server"

import { Resend } from "resend"
import { z } from "zod"
import { storeSubmission } from "./store-submissions"
import { EMAIL } from "@/lib/business-info"

// Contact form schema
const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(1, "Phone number is required"),
  eventDate: z.string().optional(),
  guests: z.string().optional(),
  message: z.string().optional(),
})

// Reservation form schema
const reservationFormSchema = z.object({
  eventType: z.string().min(1, "Event type is required"),
  eventDate: z.string().optional(),
  eventTime: z.string().optional(),
  guests: z.string().min(1, "Number of guests is required"),
  budget: z.string().optional(),
  location: z.string().min(1, "Event location is required"),
  menu: z.string().optional(),
  services: z.array(z.string()).optional().default([]),
  notes: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(1, "Phone number is required"),
})

// User input is interpolated into email HTML; escape it so a submitted value cannot inject markup or links.
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

// Recipient is configurable per environment; defaults to the public inbox, info@marrakeshla.com.
const INQUIRY_TO_EMAIL = process.env.INQUIRY_TO_EMAIL || EMAIL
// Sender. Resend's test sender (onboarding@resend.dev) only delivers to the Resend account
// owner's own address, so set INQUIRY_FROM_EMAIL to an address on a domain verified in Resend
// (e.g. "Marrakesh LA Website <website@marrakeshla.com>") for inquiries to reach info@.
const INQUIRY_FROM = process.env.INQUIRY_FROM_EMAIL || "Marrakesh LA Website <onboarding@resend.dev>"

// Function to get Resend client or null if API key is missing
function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY

  if (!apiKey) {
    console.error("RESEND_API_KEY environment variable is not set")
    return null
  }

  return new Resend(apiKey)
}

// Alternative email sending function for when Resend is not available
async function sendEmailAlternative(
  type: "contact" | "reservation",
  emailData: {
    to: string
    subject: string
    html: string
    from: string
    replyTo?: string
  },
  formData: any,
) {

  // Store the submission data
  await storeSubmission(type, {
    formData,
    emailData,
    timestamp: new Date().toISOString(),
  })

  return {
    success: true,
    // Not emailed: the caller must tell the customer to follow up by phone or email.
    delivered: false,
    message: "Form submission received (Email delivery is currently unavailable, but your information has been saved)",
  }
}

export async function sendContactEmail(formData: FormData) {
  try {
    // Parse and validate form data
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      eventDate: formData.get("eventDate") as string,
      guests: formData.get("guests") as string,
      message: formData.get("message") as string,
    }

    const validatedData = contactFormSchema.parse(data)

    // Format the email content
    const emailContent = `
      <h1>New Contact Form Submission</h1>
      <p><strong>Name:</strong> ${escapeHtml(validatedData.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(validatedData.email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(validatedData.phone)}</p>
      ${validatedData.eventDate ? `<p><strong>Event Date:</strong> ${escapeHtml(validatedData.eventDate)}</p>` : ""}
      ${validatedData.guests ? `<p><strong>Number of Guests:</strong> ${escapeHtml(validatedData.guests)}</p>` : ""}
      ${validatedData.message ? `<p><strong>Message:</strong> ${escapeHtml(validatedData.message)}</p>` : ""}
    `

    const emailData = {
      from: INQUIRY_FROM,
      to: INQUIRY_TO_EMAIL,
      subject: "New Contact Form Submission - Marrakesh LA",
      html: emailContent,
      replyTo: validatedData.email,
    }

    // Get Resend client
    const resend = getResendClient()

    // If Resend client is available, use it to send email
    if (resend) {
      try {
        const { data: emailResponse, error } = await resend.emails.send(emailData)

        if (error) {
          console.error("Error sending email with Resend:", error)
          return await sendEmailAlternative("contact", emailData, validatedData)
        }

        // Store the submission data for record-keeping
        await storeSubmission("contact", {
          formData: validatedData,
          emailResponse,
          timestamp: new Date().toISOString(),
        })

        return { success: true, delivered: true, message: "Email sent successfully" }
      } catch (error) {
        console.error("Exception when sending email with Resend:", error)
        return await sendEmailAlternative("contact", emailData, validatedData)
      }
    } else {
      // Use alternative method if Resend is not available
      return await sendEmailAlternative("contact", emailData, validatedData)
    }
  } catch (error) {
    console.error("Error in sendContactEmail:", error)
    return { success: false, message: "Failed to process form submission" }
  }
}

export async function sendReservationEmail(formData: FormData) {
  // Server-side honeypot. The catering form checks "fax" in the browser too, but a bot
  // posting straight to this action skips that code, so reject here as well.
  if (String(formData.get("fax") ?? "").trim() !== "") {
    return { success: false, message: "We couldn't verify this submission." }
  }
  try {
    // Parse and validate form data
    const services = formData.getAll("services") as string[]

    const data = {
      eventType: formData.get("eventType") as string,
      eventDate: formData.get("eventDate") as string,
      eventTime: formData.get("eventTime") as string,
      guests: formData.get("guests") as string,
      budget: formData.get("budget") as string,
      location: formData.get("location") as string,
      menu: formData.get("menu") as string,
      services: services,
      notes: formData.get("notes") as string,
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
    }

    const validatedData = reservationFormSchema.parse(data)

    // Format the email content
    const emailContent = `
      <h1>New Reservation Request</h1>
      <h2>Event Details</h2>
      <p><strong>Event Type:</strong> ${escapeHtml(validatedData.eventType)}</p>
      ${validatedData.eventDate ? `<p><strong>Event Date:</strong> ${escapeHtml(validatedData.eventDate)}</p>` : ""}
      ${validatedData.eventTime ? `<p><strong>Event Time:</strong> ${escapeHtml(validatedData.eventTime)}</p>` : ""}
      <p><strong>Number of Guests:</strong> ${escapeHtml(validatedData.guests)}</p>
      ${validatedData.budget ? `<p><strong>Budget Range:</strong> ${escapeHtml(validatedData.budget)}</p>` : ""}
      <p><strong>Event Location:</strong> ${escapeHtml(validatedData.location)}</p>
      
      ${validatedData.menu ? `<h2>Menu Preferences</h2><p>${escapeHtml(validatedData.menu)}</p>` : ""}
      
      ${
        validatedData.services && validatedData.services.length > 0
          ? `<h2>Additional Services Requested</h2>
        <ul>${validatedData.services.map((service) => `<li>${escapeHtml(service)}</li>`).join("")}</ul>`
          : ""
      }
      
      ${validatedData.notes ? `<h2>Special Requests/Notes</h2><p>${escapeHtml(validatedData.notes)}</p>` : ""}
      
      <h2>Contact Information</h2>
      <p><strong>Name:</strong> ${escapeHtml(validatedData.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(validatedData.email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(validatedData.phone)}</p>
    `

    const emailData = {
      from: INQUIRY_FROM,
      to: INQUIRY_TO_EMAIL,
      subject: "New Catering Reservation Request - Marrakesh LA",
      html: emailContent,
      replyTo: validatedData.email,
    }

    // Get Resend client
    const resend = getResendClient()

    // If Resend client is available, use it to send email
    if (resend) {
      try {
        const { data: emailResponse, error } = await resend.emails.send(emailData)

        if (error) {
          console.error("Error sending email with Resend:", error)
          return await sendEmailAlternative("reservation", emailData, validatedData)
        }

        // Message id only. Never log the form contents: names, emails and phone numbers
        // would sit in Vercel's runtime logs, which the privacy policy does not cover.
        console.log("Inquiry email sent:", emailResponse?.id)

        // Store the submission data for record-keeping
        await storeSubmission("reservation", {
          formData: validatedData,
          emailResponse,
          timestamp: new Date().toISOString(),
        })

        return { success: true, delivered: true, message: "Email sent successfully" }
      } catch (error) {
        console.error("Exception when sending email with Resend:", error)
        return await sendEmailAlternative("reservation", emailData, validatedData)
      }
    } else {
      // Use alternative method if Resend is not available
      return await sendEmailAlternative("reservation", emailData, validatedData)
    }
  } catch (error) {
    console.error("Error in sendReservationEmail:", error)
    if (error instanceof z.ZodError) {
      // zod v4 renamed ZodError.errors to .issues. Using the old name here threw
      // a TypeError inside the catch block, so a validation failure surfaced to
      // the customer as a hard crash instead of a message telling them what to fix.
      console.error("Validation errors:", error.issues)
      return {
        success: false,
        message: `Validation error: ${error.issues
          .map((issue) => `${issue.path.join(".")} - ${issue.message}`)
          .join(", ")}`,
      }
    }
    return { success: false, message: "Failed to process reservation submission" }
  }
}
