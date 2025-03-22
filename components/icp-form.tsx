"use client"

import { useState } from "react"
import { useForm, FormProvider } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { BusinessInfoStep } from "./form-steps/business-info"
import { TargetAudienceStep } from "./form-steps/target-audience"
import { SeoGoalsStep } from "./form-steps/seo-goals"
import { CompetitorAnalysisStep } from "./form-steps/competitor-analysis"
import { ContentPreferencesStep } from "./form-steps/content-preferences"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
// Import the API utility
import { handleApiResponse } from "@/lib/api-utils"

const formSchema = z.object({
  // Business Information
  companyName: z.string().min(1, "Company name is required"),
  websiteUrl: z.string().url("Please enter a valid URL"),
  industry: z.string().min(1, "Industry is required"),
  otherIndustry: z.string().optional(),
  businessDescription: z.string().min(10, "Please provide a brief description"),

  // Target Audience
  ageGroups: z.array(z.string()).min(1, "Select at least one age group"),
  genders: z.array(z.string()).min(1, "Select at least one gender"),
  profession: z.string().optional(),
  interests: z.string().min(10, "Please describe interests or pain points"),
  regions: z.array(z.string()).min(1, "Select at least one region"),
  specificCountries: z.string().optional(),
  specificCities: z.string().optional(),
  purchasingBehavior: z.string().min(1, "Please select purchasing behavior"),

  // SEO Goals
  seoGoals: z.array(z.string()).min(1, "Select at least one SEO goal"),
  otherSeoGoal: z.string().optional(),
  seoType: z.string().min(1, "Please select SEO type"),
  targetKeywords: z.string().min(5, "Please provide target keywords"),

  // Competitor Analysis
  competitors: z.string().min(5, "Please list your main competitors"),
  competitorWebsites: z.string().min(5, "Please list competitor websites"),

  // Content Preferences
  contentTone: z.string().min(1, "Please select content tone"),
  contentTypes: z.array(z.string()).min(1, "Select at least one content type"),
  existingContent: z.string().min(1, "Please select an option"),
})

type FormData = z.infer<typeof formSchema>

export function IcpForm() {
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const router = useRouter()
  // Add error state
  const [error, setError] = useState<string | null>(null)

  const totalSteps = 5
  const progress = (step / totalSteps) * 100

  const methods = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: "",
      websiteUrl: "",
      industry: "",
      otherIndustry: "",
      businessDescription: "",
      ageGroups: [],
      genders: [],
      profession: "",
      interests: "",
      regions: [],
      specificCountries: "",
      specificCities: "",
      purchasingBehavior: "",
      seoGoals: [],
      otherSeoGoal: "",
      seoType: "",
      targetKeywords: "",
      competitors: "",
      competitorWebsites: "",
      contentTone: "",
      contentTypes: [],
      existingContent: "",
    },
    mode: "onChange",
  })

  const nextStep = async () => {
    let isValid = false

    if (step === 1) {
      isValid = await methods.trigger(["companyName", "websiteUrl", "industry", "businessDescription"])
    } else if (step === 2) {
      isValid = await methods.trigger(["ageGroups", "genders", "interests", "regions", "purchasingBehavior"])
    } else if (step === 3) {
      isValid = await methods.trigger(["seoGoals", "seoType", "targetKeywords"])
    } else if (step === 4) {
      isValid = await methods.trigger(["competitors", "competitorWebsites"])
    } else if (step === 5) {
      isValid = await methods.trigger(["contentTone", "contentTypes", "existingContent"])
    }

    if (isValid) {
      if (step < totalSteps) {
        setStep(step + 1)
        window.scrollTo(0, 0)
      } else {
        await handleSubmit()
      }
    }
  }

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1)
      window.scrollTo(0, 0)
    }
  }

  // Update the handleSubmit function to handle errors
  const handleSubmit = async () => {
    const isValid = await methods.trigger()
    if (!isValid) return

    try {
      setIsSubmitting(true)
      setError(null) // Clear any previous errors
      const formData = methods.getValues()

      // Use fetch to submit the form data to the API route
      const response = await fetch("/api/submit-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const result = await handleApiResponse(response)

      if (result.success) {
        setIsSuccess(true)
        router.push("/success")
      } else {
        setError(result.message || "Failed to submit form. Please try again.")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    methods.reset()
    setStep(1)
    setIsSuccess(false)
  }

  return (
    <FormProvider {...methods}>
      <Card className="shadow-lg border-0">
        <CardContent className="p-6">
          {!isSuccess ? (
            <>
              <div className="mb-6">
                <div className="flex justify-between text-sm font-medium text-gray-500 mb-2">
                  <span>
                    Step {step} of {totalSteps}
                  </span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>

              {step === 1 && <BusinessInfoStep />}
              {step === 2 && <TargetAudienceStep />}
              {step === 3 && <SeoGoalsStep />}
              {step === 4 && <CompetitorAnalysisStep />}
              {step === 5 && <ContentPreferencesStep />}

              {error && (
                <div className="p-3 mt-4 text-sm text-red-500 bg-red-50 rounded-md border border-red-200">{error}</div>
              )}

              <div className="flex justify-between mt-8">
                <Button variant="outline" onClick={prevStep} disabled={step === 1 || isSubmitting}>
                  Previous
                </Button>
                <Button onClick={nextStep} disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : step === totalSteps ? (
                    "Submit"
                  ) : (
                    "Next"
                  )}
                </Button>
              </div>
            </>
          ) : (
            <div className="text-center py-8">
              <h2 className="text-2xl font-bold text-green-600 mb-4">Form Submitted Successfully!</h2>
              <p className="text-gray-600 mb-6">
                Thank you for providing your information. Our team will review it and get back to you soon.
              </p>
              <Button onClick={resetForm}>Submit Another Response</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </FormProvider>
  )
}

