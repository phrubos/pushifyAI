"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { ImageUploader } from "./image-uploader";
import { BeforeAfterSlider } from "./before-after-slider";
import { Loader2, ArrowLeft, ArrowRight, Download, Image as ImageIcon, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

type StyleOption = "cute" | "realistic" | "cartoon";
type SizeOption = "small" | "medium" | "large";

const PROCESSING_MESSAGES = [
  "Analyzing your photo...",
  "Applying AI magic...",
  "Creating plushie features...",
  "Adding adorable details...",
  "Finalizing your plushie...",
];

const MOCK_GENERATED_IMAGE =
  "https://placehold.co/800x800/ffb6c1/8b4789.png?text=Your+Adorable+Plushie";

interface GenerationWizardProps {
  className?: string;
}

export function GenerationWizard({
  className,
}: GenerationWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadedPreview, setUploadedPreview] = useState<string>("");
  const [selectedStyle, setSelectedStyle] = useState<StyleOption>("cute");
  const [selectedSize, setSelectedSize] = useState<SizeOption>("medium");
  const [progress, setProgress] = useState(0);
  const [processingMessage, setProcessingMessage] = useState(PROCESSING_MESSAGES[0]);
  const [generatedImage, setGeneratedImage] = useState<string>("");

  // Handle image selection
  const handleImageSelect = (file: File, preview: string) => {
    setUploadedFile(file);
    setUploadedPreview(preview);
  };

  // Handle generation
  const handleGenerate = () => {
    setCurrentStep(3);
    setProgress(0);

    // Simulate processing with progress updates
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 25;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setGeneratedImage(MOCK_GENERATED_IMAGE);
            setCurrentStep(4);
          }, 500);
          return 100;
        }
        return next;
      });
    }, 800);

    // Update processing messages
    let messageIndex = 0;
    const messageInterval = setInterval(() => {
      messageIndex = (messageIndex + 1) % PROCESSING_MESSAGES.length;
      setProcessingMessage(PROCESSING_MESSAGES[messageIndex]);
    }, 1500);

    return () => {
      clearInterval(interval);
      clearInterval(messageInterval);
    };
  };

  // Reset wizard
  const handleReset = () => {
    setCurrentStep(1);
    setUploadedFile(null);
    setUploadedPreview("");
    setSelectedStyle("cute");
    setSelectedSize("medium");
    setProgress(0);
    setGeneratedImage("");
  };

  // Download result
  const handleDownload = () => {
    // In a real app, this would download the generated image
    toast.success("Download started!", {
      description: "Your plushie image is being downloaded"
    });
  };

  return (
    <div className={cn("w-full max-w-4xl mx-auto", className)}>
      {/* Step Indicator */}
      <div className="mb-8 flex items-center justify-center gap-2">
        {[1, 2, 3, 4].map((step) => (
          <div key={step} className="flex items-center">
            <div
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full border-2 font-semibold transition-colors",
                currentStep >= step
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-muted bg-background text-muted-foreground"
              )}
            >
              {step}
            </div>
            {step < 4 && (
              <div
                className={cn(
                  "h-0.5 w-12 transition-colors sm:w-20",
                  currentStep > step ? "bg-primary" : "bg-muted"
                )}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <Card>
        <CardContent className="p-6 sm:p-8">
          {/* Step 1: Upload */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold">Upload Your Photo</h2>
                <p className="mt-2 text-muted-foreground">
                  Choose a photo to transform into an adorable plushie
                </p>
              </div>

              <ImageUploader onImageSelect={handleImageSelect} />

              <div className="flex justify-end">
                <Button
                  size="lg"
                  onClick={() => setCurrentStep(2)}
                  disabled={!uploadedFile}
                >
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Preview & Options */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold">Customize Your Plushie</h2>
                <p className="mt-2 text-muted-foreground">
                  Choose style and size options
                </p>
              </div>

              {/* Image Preview */}
              <div className="relative aspect-video overflow-hidden rounded-lg border">
                <Image
                  src={uploadedPreview}
                  alt="Upload preview"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>

              {/* Style Selection */}
              <div className="space-y-3">
                <label className="text-sm font-medium">Style</label>
                <div className="grid grid-cols-3 gap-3">
                  {(["cute", "realistic", "cartoon"] as StyleOption[]).map((style) => (
                    <button
                      key={style}
                      onClick={() => setSelectedStyle(style)}
                      className={cn(
                        "rounded-lg border-2 p-4 text-center transition-colors",
                        selectedStyle === style
                          ? "border-primary bg-primary/5"
                          : "border-muted hover:border-primary/50"
                      )}
                    >
                      <div className="font-medium capitalize">{style}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div className="space-y-3">
                <label className="text-sm font-medium">Size</label>
                <Select
                  value={selectedSize}
                  onValueChange={(value) => setSelectedSize(value as SizeOption)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Small (512x512)</SelectItem>
                    <SelectItem value="medium">Medium (1024x1024)</SelectItem>
                    <SelectItem value="large">Large (2048x2048)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-between">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setCurrentStep(1)}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <Button size="lg" onClick={handleGenerate}>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate Plushie
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Processing */}
          {currentStep === 3 && (
            <div className="space-y-8 py-8">
              <div className="text-center">
                <Loader2 className="mx-auto mb-4 h-16 w-16 animate-spin text-primary" />
                <h2 className="text-2xl font-bold">Creating Your Plushie</h2>
                <p className="mt-2 text-muted-foreground animate-pulse">
                  {processingMessage}
                </p>
              </div>

              <div className="space-y-2">
                <Progress value={progress} className="h-3" />
                <p className="text-center text-sm text-muted-foreground">
                  {progress}%
                </p>
              </div>
            </div>
          )}

          {/* Step 4: Result */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold">Your Plushie is Ready!</h2>
                <p className="mt-2 text-muted-foreground">
                  Drag the slider to compare before and after
                </p>
              </div>

              <BeforeAfterSlider
                beforeImage={uploadedPreview}
                afterImage={generatedImage}
                beforeAlt="Original photo"
                afterAlt="Generated plushie"
              />

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                  variant="outline"
                  size="lg"
                  className="flex-1"
                  onClick={handleReset}
                >
                  <ImageIcon className="mr-2 h-4 w-4" />
                  Generate Another
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="flex-1"
                  asChild
                >
                  <Link href="/gallery">View Gallery</Link>
                </Button>
                <Button size="lg" className="flex-1" onClick={handleDownload}>
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
