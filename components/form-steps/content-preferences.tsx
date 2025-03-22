"use client"

import { useFormContext } from "react-hook-form"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function ContentPreferencesStep() {
  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = useFormContext()

  const contentTypes = watch("contentTypes") || []

  const handleContentTypeChange = (value: string, checked: boolean) => {
    if (checked) {
      setValue("contentTypes", [...contentTypes, value])
    } else {
      setValue(
        "contentTypes",
        contentTypes.filter((item: string) => item !== value),
      )
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Content Preferences</h2>

      <div className="space-y-6">
        <div>
          <Label htmlFor="contentTone">Preferred tone of content</Label>
          <Select onValueChange={(value) => setValue("contentTone", value)} defaultValue={watch("contentTone")}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select content tone" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="formal">Formal</SelectItem>
              <SelectItem value="conversational">Conversational</SelectItem>
              <SelectItem value="technical">Technical</SelectItem>
              <SelectItem value="persuasive">Persuasive</SelectItem>
              <SelectItem value="informative">Informative</SelectItem>
            </SelectContent>
          </Select>
          {errors.contentTone && <p className="text-sm text-red-500 mt-1">{errors.contentTone.message as string}</p>}
        </div>

        <div>
          <Label className="text-base">Type of content that resonates best with your audience</Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
            {[
              { id: "blogs", label: "Blogs/Articles" },
              { id: "videos", label: "Videos" },
              { id: "infographics", label: "Infographics" },
              { id: "case-studies", label: "Case Studies" },
              { id: "webinars", label: "Webinars" },
              { id: "podcasts", label: "Podcasts" },
            ].map((type) => (
              <div key={type.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`content-${type.id}`}
                  checked={contentTypes.includes(type.id)}
                  onCheckedChange={(checked) => handleContentTypeChange(type.id, checked as boolean)}
                />
                <label
                  htmlFor={`content-${type.id}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {type.label}
                </label>
              </div>
            ))}
          </div>
          {errors.contentTypes && <p className="text-sm text-red-500 mt-1">{errors.contentTypes.message as string}</p>}
        </div>

        <div>
          <Label className="text-base">Do you have existing content you'd like optimized?</Label>
          <RadioGroup
            defaultValue={watch("existingContent")}
            onValueChange={(value) => setValue("existingContent", value)}
            className="mt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="existing-yes" />
              <Label htmlFor="existing-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="existing-no" />
              <Label htmlFor="existing-no">No</Label>
            </div>
          </RadioGroup>
          {errors.existingContent && (
            <p className="text-sm text-red-500 mt-1">{errors.existingContent.message as string}</p>
          )}
        </div>
      </div>
    </div>
  )
}

