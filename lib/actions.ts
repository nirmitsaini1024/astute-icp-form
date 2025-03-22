"use server"

import { connectToDatabase } from "@/lib/mongodb"
import { revalidatePath } from "next/cache"

export async function submitFormData(formData: any) {
  try {
    const { db } = await connectToDatabase()

    // Add timestamp to the form data
    const dataToInsert = {
      ...formData,
      createdAt: new Date(),
    }

    // Insert the form data into the MongoDB collection
    await db.collection("seoForms").insertOne(dataToInsert)

    // Revalidate the success page
    revalidatePath("/success")

    return { success: true }
  } catch (error) {
    console.error("Error submitting form data:", error)
    throw new Error("Failed to submit form data")
  }
}

