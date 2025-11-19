"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { QuickActionsSidebar } from "@/components/dashboard/quick-actions-sidebar";
import { FilterBar } from "@/components/plushify/filter-bar";
import { GalleryItem } from "@/components/plushify/gallery-item";
import { Plus, Sparkles, CreditCard } from "lucide-react";
import { motion } from "motion/react";
import { User } from "better-auth";
import { InferSelectModel } from "drizzle-orm";
import { generations } from "@/lib/schema";
import { deleteGeneration, toggleFavorite, getGenerations } from "@/app/actions/generations";

type Generation = InferSelectModel<typeof generations>;

interface UnifiedDashboardClientProps {
  user: User;
  credits: number;
  initialGenerations: Generation[];
  totalGenerations: number;
  favoriteCount: number;
  completedCount: number;
  processingCount: number;
}

type SortOption = "newest" | "oldest" | "favorites";
type FilterOption = "all" | "completed" | "processing" | "failed";

export function UnifiedDashboardClient({
  user,
  credits,
  initialGenerations,
  totalGenerations,
  favoriteCount,
  completedCount,
  processingCount,
}: UnifiedDashboardClientProps) {
  const [generations, setGenerations] = useState<Generation[]>(initialGenerations);
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [filterBy, setFilterBy] = useState<FilterOption>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(initialGenerations.length >= 20);

  // Apply filters and sorting
  const filteredAndSorted = generations
    .filter((gen) => {
      // Apply status filter
      if (filterBy === "completed" && gen.status !== "completed") return false;
      if (filterBy === "processing" && gen.status !== "processing") return false;
      if (filterBy === "failed" && gen.status !== "failed") return false;

      // Apply search filter
      if (searchTerm && !gen.prompt?.toLowerCase().includes(searchTerm.toLowerCase()))
        return false;

      return true;
    })
    .sort((a, b) => {
      if (sortBy === "newest") {
        return b.createdAt.getTime() - a.createdAt.getTime();
      } else if (sortBy === "oldest") {
        return a.createdAt.getTime() - b.createdAt.getTime();
      } else if (sortBy === "favorites") {
        if (a.isFavorite && !b.isFavorite) return -1;
        if (!a.isFavorite && b.isFavorite) return 1;
        return b.createdAt.getTime() - a.createdAt.getTime();
      }
      return 0;
    });

  const handleLoadMore = async () => {
    setIsLoadingMore(true);
    try {
      const newGenerations = await getGenerations(20, generations.length);
      if (newGenerations.length < 20) {
        setHasMore(false);
      }
      setGenerations((prev) => [...prev, ...newGenerations]);
    } catch (error) {
      console.error("Failed to load more:", error);
      toast.error("Failed to load more plushies");
    } finally {
      setIsLoadingMore(false);
    }
  };

  const handleDownload = async (imageUrl: string) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = "plushify-image.png";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      toast.success("Download started!");
    } catch (error) {
      console.error("Download failed:", error);
      toast.error("Failed to download image");
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    setIsDeleting(true);
    try {
      await deleteGeneration(deleteId);
      setGenerations((prev) => prev.filter((g) => g.id !== deleteId));
      toast.success("Plushie deleted successfully");
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error("Failed to delete plushie");
    } finally {
      setIsDeleting(false);
      setDeleteId(null);
    }
  };

  const handleFavorite = async (id: string) => {
    try {
      const result = await toggleFavorite(id);
      setGenerations((prev) =>
        prev.map((g) => (g.id === id ? { ...g, isFavorite: result.isFavorite } : g))
      );
      toast.success(result.isFavorite ? "Added to favorites" : "Removed from favorites");
    } catch (error) {
      console.error("Favorite toggle failed:", error);
      toast.error("Failed to update favorite");
    }
  };

  const handleViewOriginal = (id: string) => {
    const generation = generations.find((g) => g.id === id);
    if (generation) {
      window.open(generation.originalImageUrl, "_blank");
    }
  };

  const hasGenerations = generations.length > 0;

  return (
    <>
      <QuickActionsSidebar />
      <div className="min-h-screen bg-muted/20">
        <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <DashboardHeader user={user} credits={credits} />

        {/* Stats Cards */}
        <StatsCards
          totalGenerations={totalGenerations}
          completedCount={completedCount}
          favoriteCount={favoriteCount}
          credits={credits}
          processingCount={processingCount}
        />

        {/* Gallery Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Your Creations</h2>
              <p className="text-muted-foreground">
                {filteredAndSorted.length} {filteredAndSorted.length === 1 ? "plushie" : "plushies"}
              </p>
            </div>
          </div>

          {/* Filter Bar */}
          {hasGenerations && (
            <FilterBar
              defaultSort={sortBy}
              onSortChange={(sort) => setSortBy(sort as SortOption)}
              defaultFilter={filterBy}
              onFilterChange={(filter) => setFilterBy(filter as FilterOption)}
              onSearch={setSearchTerm}
            />
          )}

          {/* Gallery Grid */}
          {!hasGenerations ? (
            <div className="flex flex-col items-center justify-center py-16 px-4 text-center space-y-6 rounded-2xl border-2 border-dashed">
              <div className="rounded-full bg-muted p-6">
                <Plus className="h-12 w-12 text-muted-foreground" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold">No plushies yet</h3>
                <p className="text-muted-foreground max-w-md">
                  Start creating your first adorable plushie design with our AI-powered generator!
                </p>
              </div>
              <Button asChild size="lg" className="gap-2">
                <Link href="/generate">
                  <Sparkles className="h-5 w-5" />
                  Create Your First Plushie
                </Link>
              </Button>
            </div>
          ) : filteredAndSorted.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 px-4 text-center space-y-4 rounded-2xl border-2 border-dashed">
              <p className="text-lg text-muted-foreground">
                No plushies match your filters
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setFilterBy("all");
                  setSearchTerm("");
                  setSortBy("newest");
                }}
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {filteredAndSorted.map((generation, index) => (
                  <motion.div
                    key={generation.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <GalleryItem
                      generation={generation}
                      onDownload={() =>
                        generation.generatedImageUrl &&
                        handleDownload(generation.generatedImageUrl)
                      }
                      onDelete={() => setDeleteId(generation.id)}
                      onFavorite={() => handleFavorite(generation.id)}
                      onViewOriginal={() => handleViewOriginal(generation.id)}
                    />
                  </motion.div>
                ))}
              </motion.div>

              {/* Load More */}
              {hasMore && (
                <div className="flex justify-center pt-8">
                  <Button
                    onClick={handleLoadMore}
                    disabled={isLoadingMore}
                    size="lg"
                    variant="outline"
                  >
                    {isLoadingMore ? "Loading..." : "Load More"}
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Plushie?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your plushie and remove
              it from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      </div>
    </>
  );
}
