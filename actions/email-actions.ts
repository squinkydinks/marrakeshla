"use server"

import { Resend } from "resend"
import { z } from "zod"
import { storeSubmission } from "./store-submissions"

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
  // Log the email data for debugging
  console.log(`${type.toUpperCase()} FORM SUBMISSION:`, formData)
  console.log("Email would be sent with the following data:", emailData)

  // Store the submission data
  await storeSubmission(type, {
    formData,
    emailData,
    timestamp: new Date().toISOString(),
  })

  return {
    success: true,
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
      <p><strong>Name:</strong> ${validatedData.name}</p>
      <p><strong>Email:</strong> ${validatedData.email}</p>
      <p><strong>Phone:</strong> ${validatedData.phone}</p>
      ${validatedData.eventDate ? `<p><strong>Event Date:</strong> ${validatedData.eventDate}</p>` : ""}
      ${validatedData.guests ? `<p><strong>Number of Guests:</strong> ${validatedData.guests}</p>` : ""}
      ${validatedData.message ? `<p><strong>Message:</strong> ${validatedData.message}</p>` : ""}
    `

    const emailData = {
      from: "Dar Dmana Website <onboarding@resend.dev>",
      to: "dardmana2025@gmail.com",
      subject: "New Contact Form Submission - Dar Dmana",
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

        return { success: true, message: "Email sent successfully" }
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
  try {
    console.log("Starting reservation email process")

    // Get all form data for debugging
    const formEntries = Object.fromEntries(formData.entries())
    console.log("Raw form data:", formEntries)

    // Parse and validate form data
    const services = formData.getAll("services") as string[]
    console.log("Services from form:", services)

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

    console.log("Processed form data:", data)

    const validatedData = reservationFormSchema.parse(data)
    console.log("Validated data:", validatedData)

    // Format the email content
    const emailContent = `
      <h1>New Reservation Request</h1>
      <h2>Event Details</h2>
      <p><strong>Event Type:</strong> ${validatedData.eventType}</p>
      ${validatedData.eventDate ? `<p><strong>Event Date:</strong> ${validatedData.eventDate}</p>` : ""}
      ${validatedData.eventTime ? `<p><strong>Event Time:</strong> ${validatedData.eventTime}</p>` : ""}
      <p><strong>Number of Guests:</strong> ${validatedData.guests}</p>
      ${validatedData.budget ? `<p><strong>Budget Range:</strong> ${validatedData.budget}</p>` : ""}
      <p><strong>Event Location:</strong> ${validatedData.location}</p>
      
      ${validatedData.menu ? `<h2>Menu Preferences</h2><p>${validatedData.menu}</p>` : ""}
      
      ${
        validatedData.services && validatedData.services.length > 0
          ? `<h2>Additional Services Requested</h2>
        <ul>${validatedData.services.map((service) => `<li>${service}</li>`).join("")}</ul>`
          : ""
      }
      
      ${validatedData.notes ? `<h2>Special Requests/Notes</h2><p>${validatedData.notes}</p>` : ""}
      
      <h2>Contact Information</h2>
      <p><strong>Name:</strong> ${validatedData.name}</p>
      <p><strong>Email:</strong> ${validatedData.email}</p>
      <p><strong>Phone:</strong> ${validatedData.phone}</p>
    `

    const emailData = {
      from: "Dar Dmana Website <onboarding@resend.dev>",
      to: "dardmana2025@gmail.com",
      subject: "New Catering Reservation Request - Dar Dmana",
      html: emailContent,
      replyTo: validatedData.email,
    }

    console.log("Email data prepared:", emailData)

    // Get Resend client
    const resend = getResendClient()

    // If Resend client is available, use it to send email
    if (resend) {
      try {
        console.log("Attempting to send email with Resend")
        const { data: emailResponse, error } = await resend.emails.send(emailData)

        if (error) {
          console.error("Error sending email with Resend:", error)
          return await sendEmailAlternative("reservation", emailData, validatedData)
        }

        console.log("Email sent successfully:", emailResponse)

        // Store the submission data for record-keeping
        await storeSubmission("reservation", {
          formData: validatedData,
          emailResponse,
          timestamp: new Date().toISOString(),
        })

        return { success: true, message: "Email sent successfully" }
      } catch (error) {
        console.error("Exception when sending email with Resend:", error)
        return await sendEmailAlternative("reservation", emailData, validatedData)
      }
    } else {
      console.log("Resend client not available, using alternative method")
      // Use alternative method if Resend is not available
      return await sendEmailAlternative("reservation", emailData, validatedData)
    }
  } catch (error) {
    console.error("Error in sendReservationEmail:", error)
    if (error instanceof z.ZodError) {
      console.error("Validation errors:", error.errors)
      return {
        success: false,
        message: `Validation error: ${error.errors.map((e) => `${e.path.join(".")} - ${e.message}`).join(", ")}`,
      }
    }
    return { success: false, message: "Failed to process reservation submission" }
  }
}
