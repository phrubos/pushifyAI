"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GalleryItem } from "@/components/plushify/gallery-item";
import { EmptyState } from "./empty-state";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Generation } from "@/lib/mock-data";

interface ProjectGalleryProps {
  generations: Generation[];
  onDownload?: (id: string) => void;
  onDelete?: (id: string) => void;
  onFavorite?: (id: string) => void;
  onViewOriginal?: (id: string) => void;
}

export function ProjectGallery({
  generations,
  onDownload,
  onDelete,
  onFavorite,
  onViewOriginal,
}: ProjectGalleryProps) {
  const favoriteGenerations = generations.filter((g) => g.isFavorite);
  const hasGenerations = generations.length > 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Your Creations</h2>
          <p className="text-muted-foreground">
            Manage and organize your plushie designs
          </p>
        </div>
        {hasGenerations && (
          <Button asChild variant="outline">
            <Link href="/gallery">View All</Link>
          </Button>
        )}
      </div>

      {!hasGenerations ? (
        <EmptyState />
      ) : (
        <Tabs defaultValue="recent" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="recent">
              Recent ({generations.length})
            </TabsTrigger>
            <TabsTrigger value="favorites">
              Favorites ({favoriteGenerations.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="recent" className="mt-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {generations.map((generation, index) => (
                <motion.div
                  key={generation.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <GalleryItem
                    generation={generation}
                    onDownload={() => onDownload?.(generation.id)}
                    onDelete={() => onDelete?.(generation.id)}
                    onFavorite={() => onFavorite?.(generation.id)}
                    onViewOriginal={() => onViewOriginal?.(generation.id)}
                  />
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          <TabsContent value="favorites" className="mt-6">
            {favoriteGenerations.length > 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {favoriteGenerations.map((generation, index) => (
                  <motion.div
                    key={generation.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <GalleryItem
                      generation={generation}
                      onDownload={() => onDownload?.(generation.id)}
                      onDelete={() => onDelete?.(generation.id)}
                      onFavorite={() => onFavorite?.(generation.id)}
                      onViewOriginal={() => onViewOriginal?.(generation.id)}
                    />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-12 border-2 border-dashed rounded-lg">
                <p className="text-muted-foreground text-lg">
                  No favorites yet. Click the heart icon on any creation to save it here.
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
