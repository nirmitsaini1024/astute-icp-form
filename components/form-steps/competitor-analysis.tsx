"use client"

import { useFormContext } from "react-hook-form"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export function CompetitorAnalysisStep() {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Competitor Analysis</h2>

      <div className="space-y-6">
        <div>
          <Label htmlFor="competitors">Main competitors in your industry</Label>
          <Textarea
            id="competitors"
            placeholder="List your main competitors"
            {...register("competitors")}
            className="mt-1 min-h-[100px]"
          />
          {errors.competitors && <p className="text-sm text-red-500 mt-1">{errors.competitors.message as string}</p>}
        </div>

        <div>
          <Label htmlFor="competitorWebsites">
            Competitor websites whose SEO strategies you admire or want to outperform
          </Label>
          <Textarea
            id="competitorWebsites"
            placeholder="Please list their URLs"
            {...register("competitorWebsites")}
            className="mt-1 min-h-[100px]"
          />
          {errors.competitorWebsites && (
            <p className="text-sm text-red-500 mt-1">{errors.competitorWebsites.message as string}</p>
          )}
        </div>
      </div>
    </div>
  )
}

