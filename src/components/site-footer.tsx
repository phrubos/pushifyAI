import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="border-t py-6 text-sm text-muted-foreground">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center space-y-4">
          {/* Legal Links */}
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <Link
              href="/privacy"
              className="hover:text-foreground transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-foreground transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/cookies"
              className="hover:text-foreground transition-colors"
            >
              Cookie Policy
            </Link>
            <Link
              href="/refund"
              className="hover:text-foreground transition-colors"
            >
              Refund Policy
            </Link>
          </nav>
          
          {/* Copyright */}
          <p className="text-center">&copy; 2025 Plushify. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
