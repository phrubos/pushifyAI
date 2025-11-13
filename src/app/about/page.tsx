import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload, Sparkles, Download } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          How Plushify Works
        </h1>
        <p className="text-xl text-muted-foreground mb-4 max-w-2xl mx-auto">
          Transform your favorite photos into adorable plushie designs with the
          power of AI
        </p>
        <p className="text-muted-foreground max-w-3xl mx-auto">
          Plushify uses advanced artificial intelligence to reimagine your
          photos as cute, huggable plushie characters. Whether it&apos;s a
          family photo, a pet, or a cherished memory, we help you see it in a
          whole new way.
        </p>
      </div>

      {/* Process Steps Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          Three Simple Steps
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Upload className="w-8 h-8 text-primary" />
              </div>
              <CardTitle>1. Upload Your Photo</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Choose any photo from your device. It can be a person, pet,
                group photo, or anything you&apos;d like to transform. Our AI
                works best with clear, well-lit images.
              </p>
            </CardContent>
          </Card>

          {/* Step 2 */}
          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-primary" />
              </div>
              <CardTitle>2. AI Transforms It</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Our advanced AI analyzes your photo and reimagines it as an
                adorable plushie design. Choose from cute, realistic, or cartoon
                styles to match your vision.
              </p>
            </CardContent>
          </Card>

          {/* Step 3 */}
          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Download className="w-8 h-8 text-primary" />
              </div>
              <CardTitle>3. Download Your Plushie</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Download your plushie design in high resolution. Share it with
                friends, use it as a profile picture, or keep it as a unique
                digital keepsake.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Technology Section */}
      <div className="mb-16 max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">Powered by AI</h2>
        <p className="text-lg text-muted-foreground mb-4">
          Plushify uses cutting-edge artificial intelligence to understand the
          essence of your photos and recreate them in a plushie style.
        </p>
        <p className="text-muted-foreground mb-4">
          Our AI has been trained on thousands of images to recognize faces,
          features, and expressions, then applies artistic transformations to
          create something truly unique and adorable.
        </p>
        <p className="text-muted-foreground">
          The result? A one-of-a-kind plushie design that captures the spirit of
          your original photo while adding a touch of whimsy and charm.
        </p>
      </div>

      {/* Why Choose Plushify Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          Why Choose Plushify?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="flex gap-4">
            <div className="text-3xl">⚡</div>
            <div>
              <h3 className="font-semibold mb-2">Lightning Fast</h3>
              <p className="text-sm text-muted-foreground">
                Get your plushie design in seconds, not hours. Our AI processes
                images quickly without compromising quality.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="text-3xl">🎨</div>
            <div>
              <h3 className="font-semibold mb-2">Multiple Styles</h3>
              <p className="text-sm text-muted-foreground">
                Choose from cute, realistic, or cartoon styles to match your
                creative vision and preferences.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="text-3xl">✨</div>
            <div>
              <h3 className="font-semibold mb-2">HD Quality</h3>
              <p className="text-sm text-muted-foreground">
                All plushie designs are generated in high resolution, perfect
                for printing or sharing online.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="text-3xl">🔒</div>
            <div>
              <h3 className="font-semibold mb-2">Privacy First</h3>
              <p className="text-sm text-muted-foreground">
                Your photos are processed securely and never used for training
                without your explicit consent.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center bg-muted/50 rounded-lg p-12">
        <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Join thousands of users creating adorable plushie designs from their
          favorite photos. It&apos;s quick, easy, and fun!
        </p>
        <Button size="lg" asChild>
          <a href="/generate">Try It Now</a>
        </Button>
      </div>
    </div>
  )
}
