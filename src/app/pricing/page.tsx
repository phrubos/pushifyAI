import { Button } from "@/components/ui/button"
import { PricingSection } from "@/components/plushify/pricing-section"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { faqData } from "@/lib/mock-data"

export default function PricingPage() {
  // Filter pricing-related FAQs
  const pricingFAQs = faqData
    .filter((faq) => faq.category === "Credits & Pricing")
    .slice(0, 4)

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Simple, Credit-Based Pricing
        </h1>
        <p className="text-xl text-muted-foreground mb-2">
          One credit = one plushie generation
        </p>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Choose the plan that fits your needs. All plans include HD quality
          generations, unlimited gallery storage, and access to all style
          options. Credits never expire.
        </p>
      </div>

      {/* Pricing Cards Section */}
      <PricingSection />

      {/* Features Comparison */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-center mb-8">
          All Plans Include
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <div className="text-center">
            <div className="mb-2 text-3xl">✨</div>
            <h3 className="font-semibold mb-1">HD Quality</h3>
            <p className="text-sm text-muted-foreground">
              High-resolution plushie generations
            </p>
          </div>
          <div className="text-center">
            <div className="mb-2 text-3xl">🎨</div>
            <h3 className="font-semibold mb-1">All Styles</h3>
            <p className="text-sm text-muted-foreground">
              Cute, realistic, and cartoon options
            </p>
          </div>
          <div className="text-center">
            <div className="mb-2 text-3xl">💾</div>
            <h3 className="font-semibold mb-1">Unlimited Storage</h3>
            <p className="text-sm text-muted-foreground">
              Keep all your creations forever
            </p>
          </div>
          <div className="text-center">
            <div className="mb-2 text-3xl">⬇️</div>
            <h3 className="font-semibold mb-1">Full Resolution</h3>
            <p className="text-sm text-muted-foreground">
              Download in original quality
            </p>
          </div>
        </div>
      </div>

      {/* FAQ Mini-Section */}
      <div className="max-w-3xl mx-auto mb-16">
        <h2 className="text-2xl font-bold text-center mb-8">
          Common Questions
        </h2>
        <Accordion type="single" collapsible className="w-full">
          {pricingFAQs.map((faq) => (
            <AccordionItem key={faq.id} value={faq.id}>
              <AccordionTrigger className="text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <div className="text-center mt-6">
          <a
            href="/faq"
            className="text-primary hover:underline text-sm font-medium"
          >
            View all frequently asked questions →
          </a>
        </div>
      </div>

      {/* Final CTA */}
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to get started?</h2>
        <p className="text-muted-foreground mb-6">
          Join thousands creating adorable plushies
        </p>
        <Button size="lg" asChild>
          <a href="/dashboard">Get Started</a>
        </Button>
      </div>
    </div>
  )
}
