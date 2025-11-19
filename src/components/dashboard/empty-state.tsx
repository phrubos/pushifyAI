"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "motion/react";
import { ImageIcon, Sparkles } from "lucide-react";
import Link from "next/link";

export function EmptyState() {
  return (
    <Card className="border-2 border-dashed">
      <CardContent className="flex flex-col items-center justify-center py-16 px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative mb-6"
        >
          <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full" />
          <div className="relative bg-muted rounded-2xl p-6">
            <ImageIcon className="h-16 w-16 text-muted-foreground" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center space-y-4 max-w-md"
        >
          <h3 className="text-2xl font-bold">No plushies yet!</h3>
          <p className="text-muted-foreground text-lg">
            Start your creative journey by uploading your first photo and watch the AI magic happen.
          </p>
          
          <div className="pt-4">
            <Button asChild size="lg" className="h-12 px-8 rounded-full shadow-lg">
              <Link href="/generate">
                <Sparkles className="mr-2 h-5 w-5" />
                Create Your First Plushie
              </Link>
            </Button>
          </div>

          <p className="text-sm text-muted-foreground pt-2">
            It only takes a few seconds ⚡
          </p>
        </motion.div>
      </CardContent>
    </Card>
  );
}
