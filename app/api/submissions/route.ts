import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"

export async function GET(request: NextRequest) {
  try {
    // Connect to MongoDB
    const { db } = await connectToDatabase()

    // Get query parameters
    const searchParams = request.nextUrl.searchParams
    const limit = Number.parseInt(searchParams.get("limit") || "10", 10)
    const page = Number.parseInt(searchParams.get("page") || "1", 10)
    const skip = (page - 1) * limit

    // Get submissions with pagination
    const submissions = await db
      .collection("seoForms")
      .find({})
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray()

    // Get total count for pagination
    const total = await db.collection("seoForms").countDocuments({})

    // Return submissions
    return NextResponse.json({
      success: true,
      data: {
        submissions,
        pagination: {
          total,
          page,
          limit,
          pages: Math.ceil(total / limit),
        },
      },
    })
  } catch (error) {
    console.error("Error fetching submissions:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch submissions" }, { status: 500 })
  }
}

