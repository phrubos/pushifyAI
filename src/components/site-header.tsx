"use client";

import Link from "next/link";
import { ModeToggle } from "./ui/mode-toggle";
import { UserMenu } from "./plushify/user-menu";
import { useSession, signIn } from "@/lib/auth-client";
import { Heart } from "lucide-react";
import { Button } from "./ui/button";

export function SiteHeader() {
  const { data: session, isPending } = useSession();
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-2xl font-bold">
          <Link
            href="/"
            className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10">
              <Heart className="h-5 w-5 fill-current" />
            </div>
            <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Plushify
            </span>
          </Link>
        </h1>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/about"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            How It Works
          </Link>
          <Link
            href="/pricing"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Pricing
          </Link>
          <Link
            href="/faq"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            FAQ
          </Link>
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center gap-4">
          <ModeToggle />
          {isPending ? (
            <div className="h-9 w-9 rounded-full bg-muted animate-pulse" />
          ) : session?.user ? (
            <UserMenu user={session.user} />
          ) : (
            <Button
              variant="default"
              size="sm"
              onClick={async () => {
                await signIn.social({
                  provider: "google",
                  callbackURL: "/dashboard",
                });
              }}
            >
              Sign In
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
