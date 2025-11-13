import Link from "next/link"
import { Heart } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="border-t py-12 text-sm">
      <div className="container mx-auto px-4">
        {/* 4-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Column 1: Branding */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center justify-center w-6 h-6 rounded-lg bg-primary/10">
                <Heart className="h-4 w-4 fill-current text-primary" />
              </div>
              <span className="font-bold text-foreground">Plushify</span>
            </div>
            <p className="text-muted-foreground">
              Transform photos into adorable plushies
            </p>
          </div>

          {/* Column 2: Product */}
          <div>
            <h3 className="font-semibold text-foreground mb-3">Product</h3>
            <nav className="flex flex-col space-y-2">
              <Link
                href="/dashboard"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Dashboard
              </Link>
              <Link
                href="/gallery"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Gallery
              </Link>
              <Link
                href="/pricing"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Pricing
              </Link>
              <Link
                href="/about"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                How It Works
              </Link>
            </nav>
          </div>

          {/* Column 3: Legal */}
          <div>
            <h3 className="font-semibold text-foreground mb-3">Legal</h3>
            <nav className="flex flex-col space-y-2">
              <Link
                href="/privacy"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="/cookies"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Cookie Policy
              </Link>
              <Link
                href="/refund"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Refund Policy
              </Link>
            </nav>
          </div>

          {/* Column 4: Support */}
          <div>
            <h3 className="font-semibold text-foreground mb-3">Support</h3>
            <nav className="flex flex-col space-y-2">
              <Link
                href="/faq"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                FAQ
              </Link>
              <Link
                href="/contact"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Contact
              </Link>
            </nav>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t pt-6">
          <p className="text-center text-muted-foreground">
            &copy; 2025 Plushify. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
