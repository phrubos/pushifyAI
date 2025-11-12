import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Heart, Sparkles, ImageIcon } from "lucide-react";

export default function Home() {
  return (
    <main className="flex-1 container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto text-center space-y-12">
        {/* Hero Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10">
              <Heart className="h-8 w-8 text-primary fill-current" />
            </div>
          </div>
          <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-primary via-primary/90 to-primary/70 bg-clip-text text-transparent">
            Transform Photos into Adorable Plushies
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Upload images of people, pets, or loved ones and watch them become cute AI-generated plushie designs in seconds.
          </p>
          <div className="flex gap-4 justify-center mt-8">
            <Button asChild size="lg">
              <Link href="/dashboard">Start Creating</Link>
            </Button>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="p-6 border rounded-lg">
            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mx-auto mb-4">
              <ImageIcon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Upload Your Photo</h3>
            <p className="text-sm text-muted-foreground">
              Choose any photo of a person, pet, or loved one
            </p>
          </div>
          <div className="p-6 border rounded-lg">
            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mx-auto mb-4">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">AI Transforms It</h3>
            <p className="text-sm text-muted-foreground">
              Our AI creates an adorable plushie design
            </p>
          </div>
          <div className="p-6 border rounded-lg">
            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mx-auto mb-4">
              <Heart className="h-6 w-6 text-primary fill-current" />
            </div>
            <h3 className="font-semibold mb-2">Get Your Plushie</h3>
            <p className="text-sm text-muted-foreground">
              Download your custom plushie design instantly
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 p-8 border rounded-lg bg-muted/30">
          <h2 className="text-3xl font-bold mb-4">Ready to create your plushie?</h2>
          <p className="text-muted-foreground mb-6">
            Join thousands creating adorable plushies from their photos
          </p>
          <Button asChild size="lg">
            <Link href="/dashboard">Get Started</Link>
          </Button>
        </div>

        {/* Note about implementation */}
        <div className="mt-12 p-4 border rounded-lg bg-muted/20">
          <p className="text-sm text-muted-foreground">
            <strong>Phase 1 Complete:</strong> The landing page will be fully redesigned with before/after showcase examples in Phase 4.
          </p>
        </div>
      </div>
    </main>
  );
}
