"use client";

import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { Sparkles, CreditCard } from "lucide-react";
import Link from "next/link";
import { User } from "better-auth";

interface DashboardHeaderProps {
  user: User;
  credits: number;
}

export function DashboardHeader({ user, credits }: DashboardHeaderProps) {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/10 via-background to-accent/10 border p-8 md:p-12">
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
      
      <div className="relative z-10 space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-2">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-4xl font-bold tracking-tight"
            >
              Welcome back, {user.name}! 👋
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground text-lg"
            >
              You have <span className="font-semibold text-primary">{credits} credits</span> available to create magic.
            </motion.p>
          </div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex flex-wrap gap-3"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button asChild size="lg" className="gap-2 shadow-lg hover:shadow-primary/25 transition-all">
              <Link href="/generate">
                <Sparkles className="h-5 w-5" />
                Create New Plushie
              </Link>
            </Button>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button asChild size="lg" variant="outline" className="gap-2 shadow-md hover:shadow-lg transition-all">
              <Link href="/pricing">
                <CreditCard className="h-5 w-5" />
                Buy Credits
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
