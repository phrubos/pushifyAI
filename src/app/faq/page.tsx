import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { faqData } from "@/lib/mock-data"

export default function FAQPage() {
  // Group FAQs by category
  const categories = [
    "Getting Started",
    "Credits & Pricing",
    "Technical",
    "Account & Privacy",
  ]

  const getFAQsByCategory = (category: string) => {
    return faqData.filter((faq) => faq.category === category)
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Frequently Asked Questions
        </h1>
        <p className="text-xl text-muted-foreground">
          Find answers to common questions
        </p>
      </div>

      {/* Search Bar (UI only) */}
      <div className="max-w-2xl mx-auto mb-12">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <Input
            type="text"
            placeholder="Search questions..."
            className="pl-10"
          />
        </div>
      </div>

      {/* FAQ Categories */}
      <div className="max-w-4xl mx-auto space-y-12">
        {categories.map((category) => {
          const categoryFAQs = getFAQsByCategory(category)
          if (categoryFAQs.length === 0) return null

          return (
            <div key={category}>
              <h2 className="text-2xl font-bold mb-6">{category}</h2>
              <Accordion type="single" collapsible className="w-full">
                {categoryFAQs.map((faq) => (
                  <AccordionItem key={faq.id} value={faq.id}>
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          )
        })}
      </div>

      {/* Still Have Questions Section */}
      <div className="text-center mt-16 bg-muted/50 rounded-lg p-12 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
        <p className="text-muted-foreground mb-6">
          Can&apos;t find what you&apos;re looking for? Our support team is
          here to help.
        </p>
        <Button size="lg" asChild>
          <a href="/contact">Contact Support</a>
        </Button>
      </div>
    </div>
  )
}
