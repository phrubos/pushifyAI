import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
      <div className="text-center space-y-6 max-w-md">
        {/* Confused Plushie Icon */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="flex items-center justify-center w-24 h-24 rounded-full bg-primary/10">
              <Heart className="h-12 w-12 fill-current text-primary opacity-50" />
            </div>
            <div className="absolute -top-2 -right-2 text-4xl">😕</div>
          </div>
        </div>

        {/* 404 Text */}
        <div>
          <h1 className="text-6xl font-bold text-primary mb-2">404</h1>
          <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
          <p className="text-muted-foreground">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button size="lg" asChild>
            <Link href="/">Go Home</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/dashboard">View Dashboard</Link>
          </Button>
        </div>

        {/* Helpful Links */}
        <div className="pt-6 border-t">
          <p className="text-sm text-muted-foreground mb-3">
            Looking for something specific?
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link href="/about" className="text-primary hover:underline">
              How It Works
            </Link>
            <Link href="/pricing" className="text-primary hover:underline">
              Pricing
            </Link>
            <Link href="/faq" className="text-primary hover:underline">
              FAQ
            </Link>
            <Link href="/contact" className="text-primary hover:underline">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
