"use client"

import { sampleGenerations } from "@/lib/mock-data"
import { useSession } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { StatsCards } from "@/components/dashboard/stats-cards"
import { ProjectGallery } from "@/components/dashboard/project-gallery"

export default function DashboardPage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/sign-in");
    }
  }, [session, isPending, router]);

  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-48 bg-muted rounded" />
          <div className="h-4 w-32 bg-muted rounded" />
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const user = session.user;
  const credits = 42;
  
  // Get recent 6 generations
  const recentGenerations = sampleGenerations.slice(0, 6)

  // Calculate stats
  const totalGenerations = sampleGenerations.length
  const favoriteCount = sampleGenerations.filter((g) => g.isFavorite).length
  const completedCount = sampleGenerations.filter(
    (g) => g.status === "completed"
  ).length

  return (
    <div className="min-h-screen bg-muted/20">
      <div className="container mx-auto px-4 py-8 space-y-10">
        <DashboardHeader user={user} credits={credits} />
        
        <StatsCards 
          totalGenerations={totalGenerations}
          completedCount={completedCount}
          favoriteCount={favoriteCount}
          credits={credits}
        />

        <ProjectGallery
          generations={recentGenerations}
          onDownload={(id) => {
            console.log("Download:", id);
            // TODO: Implement download functionality
          }}
          onDelete={(id) => {
            console.log("Delete:", id);
            // TODO: Implement delete functionality
          }}
          onFavorite={(id) => {
            console.log("Favorite:", id);
            // TODO: Implement favorite toggle
          }}
          onViewOriginal={(id) => {
            const generation = recentGenerations.find((g) => g.id === id);
            if (generation) {
              window.open(generation.originalImage, "_blank");
            }
          }}
        />
      </div>
    </div>
  )
}
