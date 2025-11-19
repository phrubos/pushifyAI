"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkles, CreditCard, Plus } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export function QuickActionsSidebar() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show dock after scrolling past the header area (e.g., 400px)
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0, x: "-50%" }}
          animate={{ y: 0, opacity: 1, x: "-50%" }}
          exit={{ y: 100, opacity: 0, x: "-50%" }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="fixed bottom-8 left-1/2 z-50"
        >
          <div className="flex items-center gap-2 p-2 pr-4 rounded-full bg-foreground/80 text-background backdrop-blur-xl border border-white/10 shadow-2xl ring-1 ring-black/5">
            {/* Primary Action */}
            <Button 
              asChild 
              size="lg" 
              className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg px-6 h-12 gap-2"
            >
              <Link href="/generate">
                <Sparkles className="h-5 w-5 animate-pulse" />
                <span className="font-semibold">Create</span>
              </Link>
            </Button>

            {/* Divider */}
            <div className="w-px h-8 bg-white/20 mx-1" />

            {/* Secondary Action */}
            <Button 
              asChild 
              variant="ghost" 
              size="sm" 
              className="rounded-full hover:bg-white/10 text-background hover:text-background h-10 px-4 gap-2 font-medium"
            >
              <Link href="/pricing">
                <CreditCard className="h-4 w-4" />
                Buy Credits
              </Link>
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
