"use client";

import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { Plus } from "lucide-react";
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
      
      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
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

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Button asChild size="lg" className="h-12 px-8 rounded-full shadow-lg hover:shadow-primary/25 transition-all">
            <Link href="/generate">
              <Plus className="mr-2 h-5 w-5" />
              Create New Plushie
            </Link>
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
