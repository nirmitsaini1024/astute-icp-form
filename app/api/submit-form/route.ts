import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json()

    // Validate the form data
    if (!formData || !formData.companyName) {
      return NextResponse.json({ success: false, message: "Invalid form data" }, { status: 400 })
    }

    // Connect to MongoDB
    const { db } = await connectToDatabase()

    // Add timestamp to the form data
    const dataToInsert = {
      ...formData,
      createdAt: new Date(),
    }

    // Insert the form data into the MongoDB collection
    const result = await db.collection("seoForms").insertOne(dataToInsert)

    // Return success response
    return NextResponse.json({
      success: true,
      message: "Form submitted successfully",
      id: result.insertedId,
    })
  } catch (error) {
    console.error("Error submitting form:", error)
    return NextResponse.json({ success: false, message: "Failed to submit form" }, { status: 500 })
  }
}

