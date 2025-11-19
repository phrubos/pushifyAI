"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ImageIcon, Heart, Sparkles } from "lucide-react";
import { motion } from "motion/react";

interface StatsCardsProps {
  totalGenerations: number;
  completedCount: number;
  favoriteCount: number;
  credits: number;
  processingCount?: number;
}

export function StatsCards({ 
  totalGenerations, 
  completedCount, 
  favoriteCount, 
  credits,
  processingCount = 0 
}: StatsCardsProps) {
  const stats = [
    {
      title: "Total Creations",
      value: totalGenerations,
      description: `${completedCount} completed`,
      icon: ImageIcon,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      title: "Completed",
      value: completedCount,
      description: `${totalGenerations > 0 ? Math.round((completedCount / totalGenerations) * 100) : 0}% success rate`,
      icon: Sparkles,
      color: "text-green-500",
      bg: "bg-green-500/10",
    },
    {
      title: "Favorites",
      value: favoriteCount,
      description: `${totalGenerations > 0 ? Math.round((favoriteCount / totalGenerations) * 100) : 0}% of total`,
      icon: Heart,
      color: "text-pink-500",
      bg: "bg-pink-500/10",
    },
    {
      title: "Credits",
      value: credits,
      description: processingCount > 0 ? `${processingCount} processing` : "Ready to create",
      icon: Sparkles,
      color: "text-amber-500",
      bg: "bg-amber-500/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 + 0.3 }}
        >
          <Card className="border shadow-sm hover:shadow-md transition-all duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bg}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
