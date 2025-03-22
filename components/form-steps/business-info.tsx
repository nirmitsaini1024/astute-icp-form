"use client"

import { useFormContext } from "react-hook-form"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function BusinessInfoStep() {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext()

  const industry = watch("industry")

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Business Information</h2>

      <div className="space-y-4">
        <div>
          <Label htmlFor="companyName">Company Name</Label>
          <Input id="companyName" placeholder="Enter your company name" {...register("companyName")} className="mt-1" />
          {errors.companyName && <p className="text-sm text-red-500 mt-1">{errors.companyName.message as string}</p>}
        </div>

        <div>
          <Label htmlFor="websiteUrl">Website URL</Label>
          <Input id="websiteUrl" placeholder="https://example.com" {...register("websiteUrl")} className="mt-1" />
          {errors.websiteUrl && <p className="text-sm text-red-500 mt-1">{errors.websiteUrl.message as string}</p>}
        </div>

        <div>
          <Label htmlFor="industry">Industry/Niche</Label>
          <Select onValueChange={(value) => setValue("industry", value)} defaultValue={industry}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select your industry" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="e-commerce">E-commerce</SelectItem>
              <SelectItem value="technology">Technology</SelectItem>
              <SelectItem value="health-wellness">Health & Wellness</SelectItem>
              <SelectItem value="education">Education</SelectItem>
              <SelectItem value="real-estate">Real Estate</SelectItem>
              <SelectItem value="finance">Finance</SelectItem>
              <SelectItem value="other">Others (Specify)</SelectItem>
            </SelectContent>
          </Select>
          {errors.industry && <p className="text-sm text-red-500 mt-1">{errors.industry.message as string}</p>}
        </div>

        {industry === "other" && (
          <div>
            <Label htmlFor="otherIndustry">Specify Industry</Label>
            <Input
              id="otherIndustry"
              placeholder="Please specify your industry"
              {...register("otherIndustry")}
              className="mt-1"
            />
          </div>
        )}

        <div>
          <Label htmlFor="businessDescription">Brief description of your business and offerings</Label>
          <Textarea
            id="businessDescription"
            placeholder="Tell us about your business and what you offer"
            {...register("businessDescription")}
            className="mt-1 min-h-[100px]"
          />
          {errors.businessDescription && (
            <p className="text-sm text-red-500 mt-1">{errors.businessDescription.message as string}</p>
          )}
        </div>
      </div>
    </div>
  )
}

