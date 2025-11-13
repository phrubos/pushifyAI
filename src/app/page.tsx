import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Heart, Sparkles, ImageIcon } from "lucide-react"
import { BeforeAfterSlider } from "@/components/plushify/before-after-slider"
import { showcaseExamples } from "@/lib/mock-data"

export default function Home() {
  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/10">
              <Heart className="h-10 w-10 text-primary fill-current" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-primary via-primary/90 to-primary/70 bg-clip-text text-transparent">
            Transform Photos into Adorable Plushies
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Upload images of people, pets, friends, or family members and watch
            them become cute AI-generated plushie designs in seconds.
          </p>
          <div className="flex gap-4 justify-center mt-8">
            <Button asChild size="lg" className="h-12 px-8 text-lg">
              <Link href="/dashboard">Start Creating</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Before/After Showcase Section */}
      <section className="bg-muted/30 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              See the Magic
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Real transformations from ordinary photos to extraordinary plushie
              designs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {showcaseExamples.map((example) => (
              <div key={example.id} className="space-y-3">
                <div className="relative aspect-square rounded-lg overflow-hidden border bg-background shadow-sm">
                  <BeforeAfterSlider
                    beforeImage={example.beforeImage}
                    afterImage={example.afterImage}
                    beforeAlt="Original photo"
                    afterAlt="Plushie transformation"
                  />
                </div>
                <p className="text-sm text-center text-muted-foreground px-2">
                  {example.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Three Simple Steps
            </h2>
            <p className="text-lg text-muted-foreground">
              Creating your plushie is quick and easy
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 border rounded-lg">
              <div className="flex items-center justify-center w-16 h-16 rounded-lg bg-primary/10 mx-auto mb-4">
                <ImageIcon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">1. Upload Your Photo</h3>
              <p className="text-muted-foreground">
                Choose any photo of a person, pet, friend, or family member
              </p>
            </div>

            <div className="text-center p-6 border rounded-lg">
              <div className="flex items-center justify-center w-16 h-16 rounded-lg bg-primary/10 mx-auto mb-4">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">2. AI Transforms It</h3>
              <p className="text-muted-foreground">
                Our advanced AI creates an adorable plushie design in seconds
              </p>
            </div>

            <div className="text-center p-6 border rounded-lg">
              <div className="flex items-center justify-center w-16 h-16 rounded-lg bg-primary/10 mx-auto mb-4">
                <Heart className="h-8 w-8 text-primary fill-current" />
              </div>
              <h3 className="text-xl font-semibold mb-2">3. Download & Share</h3>
              <p className="text-muted-foreground">
                Get your custom plushie design instantly and share with friends
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-muted/30 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              Ready to create your plushie?
            </h2>
            <p className="text-lg text-muted-foreground">
              Join thousands creating adorable plushies from their photos
            </p>
            <Button asChild size="lg" className="h-12 px-8 text-lg">
              <Link href="/dashboard">Get Started</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
