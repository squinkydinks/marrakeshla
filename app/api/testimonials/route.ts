import { NextResponse } from "next/server"

// Testimonial data
const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Wedding Client",
    quote:
      "Dar Dmana transformed our wedding reception into an unforgettable Moroccan feast. The flavors were authentic and the presentation was stunning. Our guests are still talking about it months later!",
    image: "/placeholder.svg?height=100&width=100",
    rating: 5,
  },
  // ... other testimonials
]

export async function GET() {
  // Simulate a slight delay to mimic a real API call
  await new Promise((resolve) => setTimeout(resolve, 100))

  return NextResponse.json(testimonials)
}
