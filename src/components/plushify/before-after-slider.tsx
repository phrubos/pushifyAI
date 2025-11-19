"use client";

import { useState, useRef, useEffect, KeyboardEvent } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { GripVertical } from "lucide-react";

type SliderAspect = "square" | "portrait" | "landscape";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeAlt?: string;
  afterAlt?: string;
  className?: string;
  aspect?: SliderAspect;
  priority?: boolean;
  objectFit?: "cover" | "contain";
}

export function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeAlt = "Before",
  afterAlt = "After",
  className,
  aspect = "square",
  priority = false,
  objectFit = "contain",
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updateSliderPosition = (clientX: number) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    const bounded = Math.max(0, Math.min(100, percentage));
    setSliderPosition(bounded);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") {
      setSliderPosition((prev) => Math.max(0, prev - 5));
    } else if (e.key === "ArrowRight") {
      setSliderPosition((prev) => Math.min(100, prev + 5));
    }
  };

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    updateSliderPosition(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    updateSliderPosition(e.touches[0].clientX);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.addEventListener("touchmove", handleTouchMove);
      document.addEventListener("touchend", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleMouseUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDragging]);

  const aspectClasses: Record<SliderAspect, string> = {
    square: "aspect-square",
    portrait: "aspect-[3/4]",
    landscape: "aspect-[4/3]",
  };

  const objectFitClass = objectFit === "cover" ? "object-cover" : "object-contain";
  
  // Don't apply aspect ratio if className contains height classes
  const hasHeightClass = className?.includes("h-") || className?.includes("min-h-") || className?.includes("max-h-");
  const aspectClass = hasHeightClass ? "" : aspectClasses[aspect];

  return (
    <div
      ref={containerRef}
      className={cn(
        "group relative w-full cursor-ew-resize overflow-hidden rounded-lg select-none focus:outline-none focus:ring-2 focus:ring-primary/50",
        aspectClass,
        className
      )}
      onMouseDown={handleMouseDown}
      onTouchStart={handleMouseDown}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="slider"
      aria-label="Before and after comparison slider"
      aria-valuenow={sliderPosition}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      {/* After Image (Background) */}
      <div className="absolute inset-0 bg-muted">
        <Image
          src={afterImage}
          alt={afterAlt}
          fill
          className={objectFitClass}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={priority}
          quality={90}
        />
        <div className="absolute right-4 top-4 rounded-full bg-black/40 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          After
        </div>
      </div>

      {/* Before Image (Clipped) */}
      <div
        className="absolute inset-0 bg-muted"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <Image
          src={beforeImage}
          alt={beforeAlt}
          fill
          className={objectFitClass}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={priority}
          quality={90}
        />
        <div className="absolute left-4 top-4 rounded-full bg-black/40 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Before
        </div>
      </div>

      {/* Slider Line and Handle */}
      <div
        className="absolute inset-y-0 w-1 bg-white/80 shadow-[0_0_10px_rgba(0,0,0,0.2)] backdrop-blur-sm"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-xl border border-gray-100 transform transition-transform hover:scale-110 active:scale-95">
          <GripVertical className="h-6 w-6 text-primary/80" />
        </div>
      </div>
    </div>
  );
}
