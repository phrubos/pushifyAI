import { GalleryItem } from "./gallery-item";
import { FileQuestion } from "lucide-react";
import { cn } from "@/lib/utils";

type GenerationStatus = "pending" | "processing" | "completed" | "failed";

interface Generation {
  id: string;
  originalImage: string;
  generatedImage: string;
  status: GenerationStatus;
  style: string;
  size: string;
  isFavorite: boolean;
  createdAt: Date;
}

interface GalleryGridProps {
  generations: Generation[];
  onDelete?: (id: string) => void;
  onFavorite?: (id: string) => void;
  onDownload?: (id: string) => void;
  onViewOriginal?: (id: string) => void;
  className?: string;
}

export function GalleryGrid({
  generations,
  onDelete,
  onFavorite,
  onDownload,
  onViewOriginal,
  className,
}: GalleryGridProps) {
  if (generations.length === 0) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border-2 border-dashed p-12 text-center">
        <FileQuestion className="mb-4 h-16 w-16 text-muted-foreground" />
        <h3 className="mb-2 text-lg font-semibold">No plushies found</h3>
        <p className="text-sm text-muted-foreground">
          Create your first plushie to see it here
        </p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
        className
      )}
    >
      {generations.map((generation) => (
        <GalleryItem
          key={generation.id}
          generation={generation}
          onDelete={onDelete}
          onFavorite={onFavorite}
          onDownload={onDownload}
          onViewOriginal={onViewOriginal}
        />
      ))}
    </div>
  );
}
