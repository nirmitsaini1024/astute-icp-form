"use client"

import { useFormContext } from "react-hook-form"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function TargetAudienceStep() {
  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = useFormContext()

  const ageGroups = watch("ageGroups") || []
  const genders = watch("genders") || []
  const regions = watch("regions") || []

  const handleAgeGroupChange = (value: string, checked: boolean) => {
    if (checked) {
      setValue("ageGroups", [...ageGroups, value])
    } else {
      setValue(
        "ageGroups",
        ageGroups.filter((item: string) => item !== value),
      )
    }
  }

  const handleGenderChange = (value: string, checked: boolean) => {
    if (checked) {
      setValue("genders", [...genders, value])
    } else {
      setValue(
        "genders",
        genders.filter((item: string) => item !== value),
      )
    }
  }

  const handleRegionChange = (value: string, checked: boolean) => {
    if (checked) {
      setValue("regions", [...regions, value])
    } else {
      setValue(
        "regions",
        regions.filter((item: string) => item !== value),
      )
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Target Audience</h2>

      <div className="space-y-6">
        <div>
          <Label className="text-base">Primary target audience (Age Group)</Label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
            {[
              { id: "18-24", label: "18-24" },
              { id: "25-34", label: "25-34" },
              { id: "35-44", label: "35-44" },
              { id: "45-54", label: "45-54" },
              { id: "55+", label: "55+" },
            ].map((age) => (
              <div key={age.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`age-${age.id}`}
                  checked={ageGroups.includes(age.id)}
                  onCheckedChange={(checked) => handleAgeGroupChange(age.id, checked as boolean)}
                />
                <label
                  htmlFor={`age-${age.id}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {age.label}
                </label>
              </div>
            ))}
          </div>
          {errors.ageGroups && <p className="text-sm text-red-500 mt-1">{errors.ageGroups.message as string}</p>}
        </div>

        <div>
          <Label className="text-base">Gender</Label>
          <div className="grid grid-cols-3 gap-2 mt-2">
            {[
              { id: "male", label: "Male" },
              { id: "female", label: "Female" },
              { id: "other", label: "Other" },
            ].map((gender) => (
              <div key={gender.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`gender-${gender.id}`}
                  checked={genders.includes(gender.id)}
                  onCheckedChange={(checked) => handleGenderChange(gender.id, checked as boolean)}
                />
                <label
                  htmlFor={`gender-${gender.id}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {gender.label}
                </label>
              </div>
            ))}
          </div>
          {errors.genders && <p className="text-sm text-red-500 mt-1">{errors.genders.message as string}</p>}
        </div>

        <div>
          <Label htmlFor="profession">Profession</Label>
          <Input id="profession" placeholder="Enter target profession" {...register("profession")} className="mt-1" />
        </div>

        <div>
          <Label htmlFor="interests">Main interests or pain points related to your industry</Label>
          <Textarea
            id="interests"
            placeholder="Describe interests or pain points of your target audience"
            {...register("interests")}
            className="mt-1 min-h-[100px]"
          />
          {errors.interests && <p className="text-sm text-red-500 mt-1">{errors.interests.message as string}</p>}
        </div>

        <div>
          <Label className="text-base">Geographical regions or markets you primarily target</Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
            {[
              { id: "specific-countries", label: "Specific Countries" },
              { id: "specific-cities", label: "Specific Cities" },
              { id: "global", label: "Global" },
            ].map((region) => (
              <div key={region.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`region-${region.id}`}
                  checked={regions.includes(region.id)}
                  onCheckedChange={(checked) => handleRegionChange(region.id, checked as boolean)}
                />
                <label
                  htmlFor={`region-${region.id}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {region.label}
                </label>
              </div>
            ))}
          </div>
          {errors.regions && <p className="text-sm text-red-500 mt-1">{errors.regions.message as string}</p>}
        </div>

        {regions.includes("specific-countries") && (
          <div>
            <Label htmlFor="specificCountries">Specify Countries</Label>
            <Input
              id="specificCountries"
              placeholder="Enter countries separated by commas"
              {...register("specificCountries")}
              className="mt-1"
            />
          </div>
        )}

        {regions.includes("specific-cities") && (
          <div>
            <Label htmlFor="specificCities">Specify Cities</Label>
            <Input
              id="specificCities"
              placeholder="Enter cities separated by commas"
              {...register("specificCities")}
              className="mt-1"
            />
          </div>
        )}

        <div>
          <Label htmlFor="purchasingBehavior">Typical purchasing behavior of your customers</Label>
          <Select
            onValueChange={(value) => setValue("purchasingBehavior", value)}
            defaultValue={watch("purchasingBehavior")}
          >
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select purchasing behavior" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="online">Online</SelectItem>
              <SelectItem value="in-store">In-store</SelectItem>
              <SelectItem value="both">Both</SelectItem>
            </SelectContent>
          </Select>
          {errors.purchasingBehavior && (
            <p className="text-sm text-red-500 mt-1">{errors.purchasingBehavior.message as string}</p>
          )}
        </div>
      </div>
    </div>
  )
}

