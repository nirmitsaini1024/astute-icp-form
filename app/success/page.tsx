import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="flex justify-center">
          <CheckCircle className="h-20 w-20 text-green-500" />
        </div>
        <h1 className="mt-6 text-3xl font-extrabold text-gray-900">Form Submitted Successfully!</h1>
        <p className="mt-2 text-lg text-gray-600">
          Thank you for providing your information. Our team will review it and get back to you soon.
        </p>
        <div className="mt-8">
          <Link href="/" passHref>
            <Button className="w-full">Submit Another Response</Button>
          </Link>
        </div>
      </div>
    </main>
  )
}

