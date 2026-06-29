"use server"

import fs from "fs"
import path from "path"

// Function to store form submissions in a JSON file
export async function storeSubmission(type: "contact" | "reservation", data: any) {
  try {
    // Create directory if it doesn't exist
    const dir = path.join(process.cwd(), "submissions")
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }

    // Create a filename with timestamp
    const timestamp = new Date().toISOString().replace(/:/g, "-")
    const filename = `${type}_${timestamp}.json`
    const filePath = path.join(dir, filename)

    // Write the data to the file
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2))

    return { success: true, filePath }
  } catch (error) {
    console.error("Error storing submission:", error)
    return { success: false, error }
  }
}
