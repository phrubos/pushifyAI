"use client";

import { useState, useEffect, useRef } from "react";
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
import {
  Loader2,
  ArrowLeft,
  ArrowRight,
  Download,
  Image as ImageIcon,
  Sparkles,
  Wand2,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";

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
  onGenerate?: (data: {
    file: File;
    style: StyleOption;
    size: SizeOption;
  }) => void;
  isGenerating?: boolean;
  generationResult?: {
    originalImageUrl: string;
    generatedImageUrl: string | null;
    status: string;
  } | null;
}

export function GenerationWizard({
  className,
  onGenerate,
  isGenerating = false,
  generationResult = null,
}: GenerationWizardProps) {
  const wizardRef = useRef<HTMLDivElement>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadedPreview, setUploadedPreview] = useState<string>("");
  const [selectedStyle, setSelectedStyle] = useState<StyleOption>("cute");
  const [selectedSize, setSelectedSize] = useState<SizeOption>("medium");
  const [progress, setProgress] = useState(0);
  const [processingMessage, setProcessingMessage] = useState(PROCESSING_MESSAGES[0]);
  const [generatedImage, setGeneratedImage] = useState<string>("");

  // Scroll to wizard when step changes or generation starts
  useEffect(() => {
    if (wizardRef.current) {
      // Small delay to ensure content is rendered
      setTimeout(() => {
        wizardRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 100);
    }
  }, [currentStep, isGenerating]);

  // Handle generation result changes
  useEffect(() => {
    if (generationResult && generationResult.status === "completed") {
      setCurrentStep(4);
    }
  }, [generationResult]);

  // Handle image selection
  const handleImageSelect = (file: File, preview: string) => {
    setUploadedFile(file);
    setUploadedPreview(preview);
  };

  // Handle generation
  const handleGenerate = () => {
    if (!uploadedFile) return;

    // If onGenerate prop is provided, use it (real generation)
    if (onGenerate) {
      onGenerate({
        file: uploadedFile,
        style: selectedStyle,
        size: selectedSize,
      });
      setCurrentStep(3);
      return;
    }

    // Otherwise, use mock generation
    setCurrentStep(3);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 2;
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
    }, 100);

    let messageIndex = 0;
    const messageInterval = setInterval(() => {
      messageIndex = (messageIndex + 1) % PROCESSING_MESSAGES.length;
      setProcessingMessage(PROCESSING_MESSAGES[messageIndex]);
    }, 2000);

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
    <div ref={wizardRef} className={cn("w-full max-w-4xl mx-auto", className)}>
      {/* Step Indicator */}
      <div className="mb-8 flex items-center justify-center gap-2 sm:gap-4">
        {[1, 2, 3, 4].map((step) => (
          <div key={step} className="flex items-center">
            <div
              className={cn(
                "flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full border-2 font-semibold transition-all duration-300",
                currentStep >= step
                  ? "border-primary bg-primary text-primary-foreground scale-100"
                  : "border-muted bg-muted/50 text-muted-foreground scale-90"
              )}
            >
              {currentStep > step ? <CheckCircle2 className="h-5 w-5" /> : step}
            </div>
            {step < 4 && (
              <div
                className={cn(
                  "h-0.5 w-8 sm:w-16 transition-colors duration-500",
                  currentStep > step ? "bg-primary" : "bg-muted"
                )}
              />
            )}
          </div>
        ))}
      </div>

      <Card className="border-none bg-transparent shadow-none">
        <CardContent className="p-0">
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <motion.div
                key="step-1"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ duration: 0.35 }}
                className="space-y-8 rounded-2xl border bg-card p-6 shadow-sm sm:p-8"
              >
                <div className="text-center space-y-3">
                  <h2 className="text-2.5xl font-bold">Upload Your Photo</h2>
                  <p className="text-muted-foreground">
                    Choose a clear photo to transform into an adorable plushie
                  </p>
                </div>

                <ImageUploader onImageSelect={handleImageSelect} />

                <div className="flex justify-end">
                  <Button
                    size="lg"
                    onClick={() => setCurrentStep(2)}
                    disabled={!uploadedFile}
                    className="w-full gap-2 sm:w-auto"
                  >
                    Next Step
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                key="step-2"
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.35 }}
                className="space-y-8 rounded-2xl border bg-card p-6 shadow-sm sm:p-8"
              >
                <div className="text-center space-y-3">
                  <h2 className="text-2.5xl font-bold">Customize Your Plushie</h2>
                  <p className="text-muted-foreground">
                    Select the perfect style and size for your creation
                  </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2">
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-muted-foreground">
                      Original Photo
                    </label>
                    <div className="relative aspect-square overflow-hidden rounded-xl border bg-muted/30">
                      {uploadedPreview && (
                        <Image
                          src={uploadedPreview}
                          alt="Upload preview"
                          fill
                          className="object-contain"
                        />
                      )}
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-3">
                      <label className="flex items-center gap-2 text-sm font-medium">
                        <Sparkles className="h-4 w-4 text-primary" />
                        Choose Style
                      </label>
                      <div className="grid gap-3">
                        {(["cute", "realistic", "cartoon"] as StyleOption[]).map((style) => (
                          <button
                            key={style}
                            onClick={() => setSelectedStyle(style)}
                            className={cn(
                              "relative overflow-hidden rounded-xl border-2 p-4 text-left transition-all",
                              selectedStyle === style
                                ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                                : "border-muted bg-card hover:border-primary/40"
                            )}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-lg font-semibold capitalize">{style}</p>
                                <p className="text-xs text-muted-foreground">
                                  {style === "cute" && "Big eyes, soft textures, super adorable"}
                                  {style === "realistic" && "Detailed fur, lifelike appearance"}
                                  {style === "cartoon" && "Bold lines, vibrant colors, stylized"}
                                </p>
                              </div>
                              {selectedStyle === style && (
                                <motion.span layoutId="style-check">
                                  <CheckCircle2 className="h-5 w-5 text-primary" />
                                </motion.span>
                              )}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="flex items-center gap-2 text-sm font-medium">
                        <ImageIcon className="h-4 w-4 text-primary" />
                        Output Size
                      </label>
                      <Select
                        value={selectedSize}
                        onValueChange={(value) => setSelectedSize(value as SizeOption)}
                      >
                        <SelectTrigger className="h-12">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="small">Small (512x512) · Fast</SelectItem>
                          <SelectItem value="medium">Medium (1024x1024) · Recommended</SelectItem>
                          <SelectItem value="large">Large (2048x2048) · High Detail</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3 border-t pt-4 sm:flex-row">
                  <Button
                    variant="ghost"
                    size="lg"
                    onClick={() => setCurrentStep(1)}
                    className="gap-2"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                  </Button>
                  <Button
                    size="lg"
                    onClick={handleGenerate}
                    className="gap-2 bg-gradient-to-r from-primary to-purple-600 text-white shadow-lg shadow-primary/30"
                  >
                    <Wand2 className="h-4 w-4" />
                    Generate Magic
                  </Button>
                </div>
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div
                key="step-3"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.45 }}
                className="flex min-h-[360px] flex-col items-center justify-center rounded-2xl border bg-card/70 px-6 py-16 text-center backdrop-blur"
              >
                <div className="relative mb-8">
                  <div className="absolute inset-0 -z-10 rounded-full bg-primary/20 blur-3xl" />
                  <div className="rounded-full border bg-background p-6 shadow-2xl">
                    <Loader2 className="h-16 w-16 animate-spin text-primary" />
                  </div>
                </div>
                <h2 className="text-3xl font-bold">Creating Your Plushie</h2>
                <div className="relative h-10 w-full max-w-md overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={processingMessage}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -16 }}
                      className="text-muted-foreground"
                    >
                      {isGenerating ? "Generating your plushie..." : processingMessage}
                    </motion.p>
                  </AnimatePresence>
                </div>
                {!isGenerating && (
                  <div className="mt-8 w-full max-w-md space-y-2">
                    <Progress value={progress} className="h-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Start</span>
                      <span>{progress}%</span>
                      <span>Finish</span>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {currentStep === 4 && (
              <motion.div
                key="step-4"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="space-y-8 rounded-2xl border bg-card p-6 shadow-lg sm:p-8"
              >
                <div className="text-center">
                  <div className="mx-auto mb-4 inline-flex items-center justify-center rounded-full bg-green-500/10 p-3 text-green-500">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h2 className="text-3xl font-bold">Your Plushie is Ready!</h2>
                  <p className="text-muted-foreground">
                    Drag the slider to compare before and after.
                  </p>
                </div>

                <div className="rounded-2xl border-4 border-white/10 shadow-2xl overflow-hidden">
                  <BeforeAfterSlider
                    beforeImage={
                      generationResult?.originalImageUrl || uploadedPreview
                    }
                    afterImage={
                      generationResult?.generatedImageUrl || generatedImage
                    }
                    beforeAlt="Original photo"
                    afterAlt="Generated plushie"
                    aspect="square"
                    objectFit="contain"
                    className="bg-muted"
                  />
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button
                    variant="outline"
                    size="lg"
                    className="flex-1 gap-2"
                    onClick={handleReset}
                  >
                    <Wand2 className="h-4 w-4" />
                    Create Another
                  </Button>
                  <Button
                    variant="secondary"
                    size="lg"
                    className="flex-1"
                    asChild
                  >
                    <Link href="/dashboard">View Dashboard</Link>
                  </Button>
                  <Button size="lg" className="flex-1 gap-2" onClick={handleDownload}>
                    <Download className="h-4 w-4" />
                    Download HD
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  );
}
