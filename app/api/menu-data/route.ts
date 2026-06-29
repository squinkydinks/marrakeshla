import { NextResponse } from "next/server"

// Menu data
const menuData = {
  moroccan: {
    title: "Moroccan Cuisine",
    description: "Authentic flavors from the heart of Morocco",
    dishes: [
      {
        title: "Lamb Tagine",
        description: "Slow-cooked lamb with prunes, apricots, and almonds in aromatic spices",
      },
      // ... other dishes
    ],
  },
  italian: {
    title: "Italian Cuisine",
    description: "Classic Italian dishes with a Mediterranean twist",
    dishes: [
      // ... dishes
    ],
  },
  french: {
    title: "French Cuisine",
    description: "Refined French classics with elegant presentation",
    dishes: [
      // ... dishes
    ],
  },
  spanish: {
    title: "Spanish Cuisine",
    description: "Vibrant Spanish flavors with a modern presentation",
    dishes: [
      // ... dishes
    ],
  },
}

export async function GET() {
  // Simulate a slight delay to mimic a real API call
  await new Promise((resolve) => setTimeout(resolve, 100))

  return NextResponse.json(menuData)
}
