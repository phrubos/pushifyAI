"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GenerationStatus } from "./generation-status";
import {
  Download,
  Trash2,
  Heart,
  Eye,
  Star,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import Image from "next/image";

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

interface GalleryItemProps {
  generation: Generation;
  onDelete?: (id: string) => void;
  onFavorite?: (id: string) => void;
  onDownload?: (id: string) => void;
  onViewOriginal?: (id: string) => void;
  className?: string;
}

export function GalleryItem({
  generation,
  onDelete,
  onFavorite,
  onDownload,
  onViewOriginal,
  className,
}: GalleryItemProps) {
  const [isHovered, setIsHovered] = useState(false);

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) return "Today";
    if (diffInDays === 1) return "Yesterday";
    if (diffInDays < 7) return `${diffInDays} days ago`;

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
    });
  };

  return (
    <Card
      className={cn(
        "group relative overflow-hidden transition-all hover:shadow-lg",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image */}
      <div className="relative aspect-square w-full overflow-hidden bg-muted">
        <Image
          src={generation.generatedImage}
          alt={`Generated plushie ${generation.id}`}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Favorite indicator */}
        {generation.isFavorite && (
          <div className="absolute right-2 top-2">
            <div className="rounded-full bg-yellow-500 p-1.5 shadow-lg">
              <Star className="h-4 w-4 fill-white text-white" />
            </div>
          </div>
        )}

        {/* Hover Overlay */}
        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center gap-2 bg-black/60 transition-opacity",
            isHovered ? "opacity-100" : "opacity-0"
          )}
        >
          {onDownload && (
            <Button
              size="icon"
              variant="secondary"
              onClick={() => onDownload(generation.id)}
              title="Download"
            >
              <Download className="h-4 w-4" />
            </Button>
          )}
          {onViewOriginal && (
            <Button
              size="icon"
              variant="secondary"
              onClick={() => onViewOriginal(generation.id)}
              title="View Original"
            >
              <Eye className="h-4 w-4" />
            </Button>
          )}
          {onFavorite && (
            <Button
              size="icon"
              variant="secondary"
              onClick={() => onFavorite(generation.id)}
              title={generation.isFavorite ? "Unfavorite" : "Favorite"}
            >
              <Heart
                className={cn(
                  "h-4 w-4",
                  generation.isFavorite && "fill-red-500 text-red-500"
                )}
              />
            </Button>
          )}
          {onDelete && (
            <Button
              size="icon"
              variant="destructive"
              onClick={() => onDelete(generation.id)}
              title="Delete"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="p-3 space-y-2">
        <div className="flex items-center justify-between">
          <GenerationStatus status={generation.status} />
          <span className="text-xs text-muted-foreground">
            {formatDate(generation.createdAt)}
          </span>
        </div>
      </div>
    </Card>
  );
}
