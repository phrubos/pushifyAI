"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { CreditDisplay } from "@/components/plushify/credit-display"
import { FilterBar } from "@/components/plushify/filter-bar"
import { GalleryItem } from "@/components/plushify/gallery-item"
import { mockUser, sampleGenerations, type Generation } from "@/lib/mock-data"
import { ImageIcon, Plus } from "lucide-react"

type SortOption = "newest" | "oldest" | "favorites"
type FilterOption = "all" | "completed" | "processing"

export default function GalleryPage() {
  const [generations, setGenerations] = useState<Generation[]>(sampleGenerations)
  const [sortBy, setSortBy] = useState<SortOption>("newest")
  const [filterBy, setFilterBy] = useState<FilterOption>("all")
  const [deleteId, setDeleteId] = useState<string | null>(null)

  // Apply filters and sorting
  const filteredAndSorted = generations
    .filter((gen) => {
      // Apply status filter
      if (filterBy === "completed" && gen.status !== "completed") return false
      if (filterBy === "processing" && gen.status !== "processing") return false
      return true
    })
    .sort((a, b) => {
      if (sortBy === "newest") {
        return b.createdAt.getTime() - a.createdAt.getTime()
      } else if (sortBy === "oldest") {
        return a.createdAt.getTime() - b.createdAt.getTime()
      } else if (sortBy === "favorites") {
        if (a.isFavorite && !b.isFavorite) return -1
        if (!a.isFavorite && b.isFavorite) return 1
        return b.createdAt.getTime() - a.createdAt.getTime()
      }
      return 0
    })

  const handleDownload = (id: string) => {
    // Mock download functionality
    console.log("Downloading generation:", id)
    // In a real app, this would trigger an actual download
    alert("Download started! (This is a mock action)")
  }

  const handleDelete = (id: string) => {
    setDeleteId(id)
  }

  const confirmDelete = () => {
    if (deleteId) {
      setGenerations((prev) => prev.filter((gen) => gen.id !== deleteId))
      setDeleteId(null)
    }
  }

  const handleFavorite = (id: string) => {
    setGenerations((prev) =>
      prev.map((gen) =>
        gen.id === id ? { ...gen, isFavorite: !gen.isFavorite } : gen
      )
    )
  }

  const handleViewOriginal = (id: string) => {
    const generation = generations.find((gen) => gen.id === id)
    if (generation) {
      // Mock view original - in a real app would open a modal or new page
      console.log("Viewing original:", generation.originalImage)
      window.open(generation.originalImage, "_blank")
    }
  }

  const handleSortChange = (value: string) => {
    setSortBy(value as SortOption)
  }

  const handleFilterChange = (value: string) => {
    setFilterBy(value as FilterOption)
  }

  const handleSearch = (value: string) => {
    // Search functionality would be implemented here
    console.log("Search query:", value)
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold">My Gallery</h1>
          <p className="text-muted-foreground mt-1">
            {filteredAndSorted.length} plushie{filteredAndSorted.length !== 1 ? "s" : ""}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <CreditDisplay credits={mockUser.credits} />
          <Button asChild>
            <Link href="/generate">
              <Plus className="mr-2 h-4 w-4" />
              Generate New
            </Link>
          </Button>
        </div>
      </div>

      {/* Filter Bar */}
      <FilterBar
        onSortChange={handleSortChange}
        onFilterChange={handleFilterChange}
        onSearch={handleSearch}
      />

      {/* Gallery Grid */}
      {filteredAndSorted.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAndSorted.map((generation) => (
            <GalleryItem
              key={generation.id}
              generation={generation}
              onDownload={handleDownload}
              onDelete={handleDelete}
              onFavorite={handleFavorite}
              onViewOriginal={handleViewOriginal}
            />
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <ImageIcon className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">No plushies found</h3>
            <p className="text-muted-foreground text-center mb-6 max-w-md">
              {filterBy !== "all" || sortBy === "favorites"
                ? "Try adjusting your filters to see more results"
                : "Start creating your first adorable plushie design"}
            </p>
            <Button asChild>
              <Link href="/generate">
                <Plus className="mr-2 h-4 w-4" />
                Create Your First Plushie
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              plushie generation from your gallery.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
