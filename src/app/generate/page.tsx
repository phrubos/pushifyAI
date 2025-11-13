"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CreditDisplay } from "@/components/plushify/credit-display"
import { GenerationWizard } from "@/components/plushify/generation-wizard"
import { mockUser } from "@/lib/mock-data"
import { ArrowLeft } from "lucide-react"

export default function GeneratePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="flex items-center justify-between mb-4">
          <Button asChild variant="ghost" size="sm">
            <Link href="/dashboard">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
          <CreditDisplay credits={mockUser.credits} />
        </div>

        <div className="text-center space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold">
            Create Your Plushie
          </h1>
          <p className="text-muted-foreground">
            Upload a photo and watch it transform into an adorable plushie design
          </p>
        </div>
      </div>

      {/* Wizard */}
      <div className="max-w-4xl mx-auto">
        <GenerationWizard />
      </div>
    </div>
  )
}
