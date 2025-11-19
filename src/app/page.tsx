import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sparkles, ArrowRight } from "lucide-react"
import { BeforeAfterSlider } from "@/components/plushify/before-after-slider"
import { showcaseExamples } from "@/lib/mock-data"
import { HeroSection } from "@/components/landing/hero"
import { FeaturesSection } from "@/components/landing/features"
import { HowItWorksSection } from "@/components/landing/how-it-works"

export default function Home() {
  return (
    <main className="flex-1 overflow-x-hidden">
      <HeroSection />
      
      <FeaturesSection />

      {/* Before/After Showcase Section */}
      <section id="gallery" className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Real Transformations
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              See how we turn ordinary photos into extraordinary plushies.
            </p>
          </div>

          {/* Featured Real Example */}
          <div className="max-w-6xl mx-auto mb-20">
            <div className="grid gap-10 lg:grid-cols-2 items-center rounded-[32px] border border-primary/10 bg-gradient-to-br from-muted/40 via-background to-primary/5 p-6 sm:p-10 shadow-2xl">
              <div className="space-y-6 lg:order-1">
                <span className="inline-flex items-center gap-2 self-start rounded-full bg-primary/15 px-4 py-2 text-sm font-semibold text-primary shadow-sm ring-1 ring-primary/30">
                  <Sparkles className="h-4 w-4" />
                  Featured Creation
                </span>
                <div className="space-y-4">
                  <h3 className="text-3xl font-bold tracking-tight">From candid photo to collectible plushie</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    This real customer transformation shows how our stylists preserve the personality of your original photo while adding the plush-ready details—soft fabrics, brighter palettes, and storybook charm.
                  </p>
                </div>
                <ul className="grid gap-3 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <span className="inline-flex h-2 w-2 rounded-full bg-primary" aria-hidden />
                    High-fidelity facial features maintained
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="inline-flex h-2 w-2 rounded-full bg-primary" aria-hidden />
                    Texture-friendly color palette for stitching
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="inline-flex h-2 w-2 rounded-full bg-primary" aria-hidden />
                    Subtle accessories to amplify personality
                  </li>
                </ul>
                <p className="text-muted-foreground text-base italic">
                  &quot;{showcaseExamples[0].description}&quot;
                </p>
              </div>
              <div className="relative lg:order-2 w-full max-w-xl mx-auto lg:mx-0">
                <BeforeAfterSlider
                  beforeImage={showcaseExamples[0].beforeImage}
                  afterImage={showcaseExamples[0].afterImage}
                  beforeAlt="Original photo"
                  afterAlt="AI-generated plushie"
                  aspect="landscape"
                  objectFit="cover"
                  className="rounded-3xl border border-white/20 shadow-2xl"
                  priority
                />
                <div className="pointer-events-none absolute inset-4 rounded-[28px] border border-white/10 shadow-inner" aria-hidden />
              </div>
            </div>
          </div>

          {/* More Examples Grid - REMOVED as per user request */}
          
        </div>
      </section>

      <HowItWorksSection />

      {/* Final CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 -z-10" />
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-primary/10 blur-[100px] rounded-full -z-10" />
        
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8 p-12 rounded-3xl bg-background/50 backdrop-blur-sm border shadow-xl">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              Ready to hug your <span className="text-primary">imagination?</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Join thousands of happy creators and turn your memories into soft, cuddly friends today.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
              <Button asChild size="lg" className="h-14 px-10 text-xl rounded-full shadow-xl hover:shadow-primary/25 hover:scale-105 transition-all">
                <Link href="/dashboard">
                  Create My Plushie <ArrowRight className="ml-2 w-6 h-6" />
                </Link>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground pt-4">
              No credit card required for preview • Instant results
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
