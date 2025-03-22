"use client"

import { useFormContext } from "react-hook-form"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function SeoGoalsStep() {
  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = useFormContext()

  const seoGoals = watch("seoGoals") || []

  const handleSeoGoalChange = (value: string, checked: boolean) => {
    if (checked) {
      setValue("seoGoals", [...seoGoals, value])
    } else {
      setValue(
        "seoGoals",
        seoGoals.filter((item: string) => item !== value),
      )
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">SEO Goals</h2>

      <div className="space-y-6">
        <div>
          <Label className="text-base">Main goals for SEO</Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
            {[
              { id: "increase-traffic", label: "Increase organic traffic" },
              { id: "rank-keywords", label: "Rank for specific keywords" },
              { id: "boost-sales", label: "Boost sales and conversions" },
              { id: "improve-visibility", label: "Improve brand visibility" },
              { id: "reduce-bounce", label: "Reduce bounce rate" },
              { id: "other", label: "Other (Specify)" },
            ].map((goal) => (
              <div key={goal.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`goal-${goal.id}`}
                  checked={seoGoals.includes(goal.id)}
                  onCheckedChange={(checked) => handleSeoGoalChange(goal.id, checked as boolean)}
                />
                <label
                  htmlFor={`goal-${goal.id}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {goal.label}
                </label>
              </div>
            ))}
          </div>
          {errors.seoGoals && <p className="text-sm text-red-500 mt-1">{errors.seoGoals.message as string}</p>}
        </div>

        {seoGoals.includes("other") && (
          <div>
            <Label htmlFor="otherSeoGoal">Specify Other SEO Goal</Label>
            <Input
              id="otherSeoGoal"
              placeholder="Please specify your other SEO goal"
              {...register("otherSeoGoal")}
              className="mt-1"
            />
          </div>
        )}

        <div>
          <Label htmlFor="seoType">Focus on SEO type</Label>
          <Select onValueChange={(value) => setValue("seoType", value)} defaultValue={watch("seoType")}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select SEO type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="local">Local SEO</SelectItem>
              <SelectItem value="global">Global SEO</SelectItem>
            </SelectContent>
          </Select>
          {errors.seoType && <p className="text-sm text-red-500 mt-1">{errors.seoType.message as string}</p>}
        </div>

        <div>
          <Label htmlFor="targetKeywords">Specific keywords or topics you'd like to target</Label>
          <Textarea
            id="targetKeywords"
            placeholder="Enter keywords or topics separated by commas"
            {...register("targetKeywords")}
            className="mt-1 min-h-[100px]"
          />
          {errors.targetKeywords && (
            <p className="text-sm text-red-500 mt-1">{errors.targetKeywords.message as string}</p>
          )}
        </div>
      </div>
    </div>
  )
}

