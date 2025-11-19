"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CreditDisplay } from "@/components/plushify/credit-display";
import { GenerationWizard } from "@/components/plushify/generation-wizard";
import { ArrowLeft, Sparkles } from "lucide-react";
import { Meteors } from "@/components/ui/meteors";
import { useState } from "react";
import { generatePlushImage, getGenerationById } from "@/app/actions/generate-image";
import { getUserCredits } from "@/app/actions/credits";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface GeneratePageClientProps {
  initialCredits: number;
}

interface GenerationResult {
  id: string;
  originalImageUrl: string;
  generatedImageUrl: string | null;
  status: "pending" | "processing" | "completed" | "failed";
}

export function GeneratePageClient({ initialCredits }: GeneratePageClientProps) {
  const [credits, setCredits] = useState(initialCredits);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationResult, setGenerationResult] = useState<GenerationResult | null>(null);
  const router = useRouter();

  const handleGenerate = async (data: {
    file: File;
    style: "cute" | "realistic" | "cartoon";
    size: "small" | "medium" | "large";
  }) => {
    try {
      setIsGenerating(true);

      const result = await generatePlushImage({
        originalImageFile: data.file,
        style: data.style,
        size: data.size,
      });

      if (!result.success) {
        if (result.error === "INSUFFICIENT_CREDITS") {
          toast.error("Insufficient credits", {
            description: "You need more credits to generate images",
            action: {
              label: "Buy Credits",
              onClick: () => router.push("/pricing"),
            },
          });
        } else {
          toast.error("Generation failed", {
            description: result.error || "An error occurred",
          });
        }
        setIsGenerating(false);
        return;
      }

      // Update credits immediately
      const newCredits = await getUserCredits();
      setCredits(newCredits);

      // Poll for generation status
      if (result.generationId) {
        await pollGenerationStatus(result.generationId);
      }
    } catch (error) {
      console.error("Error generating image:", error);
      toast.error("Generation failed", {
        description: "An unexpected error occurred",
      });
      setIsGenerating(false);
    }
  };

  const pollGenerationStatus = async (generationId: string) => {
    const maxAttempts = 60; // 2 minutes max (2 seconds interval)
    let attempts = 0;

    const poll = async (): Promise<void> => {
      try {
        const generation = await getGenerationById(generationId);

        if (generation.status === "completed") {
          setGenerationResult(generation);
          setIsGenerating(false);
          toast.success("Image generated successfully!", {
            description: "Your plushie is ready!",
          });
          return;
        }

        if (generation.status === "failed") {
          setIsGenerating(false);
          // Credits already refunded by server
          const newCredits = await getUserCredits();
          setCredits(newCredits);
          toast.error("Generation failed", {
            description: "Your credit has been refunded",
          });
          return;
        }

        // Still processing, continue polling
        attempts++;
        if (attempts < maxAttempts) {
          setTimeout(() => poll(), 2000); // Poll every 2 seconds
        } else {
          setIsGenerating(false);
          toast.error("Generation timed out", {
            description: "Please try again",
          });
        }
      } catch (error) {
        console.error("Error polling generation:", error);
        setIsGenerating(false);
        toast.error("Error checking status", {
          description: "Please refresh the page",
        });
      }
    };

    poll();
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background text-foreground">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Meteors number={20} />
        <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/50 to-background z-10" />
      </div>

      <div className="relative z-20 container mx-auto px-4 py-8 min-h-screen flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-12 animate-in fade-in slide-in-from-top-4 duration-700">
          <Button
            asChild
            variant="ghost"
            className="hover:bg-primary/10 transition-colors"
          >
            <Link href="/dashboard">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>

          <div className="flex items-center gap-4">
            <CreditDisplay credits={credits} />
          </div>
        </div>

        {/* Hero Content */}
        <div className="text-center space-y-4 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
          <div className="inline-flex items-center justify-center px-3 py-1 bg-primary/10 rounded-full mb-4 ring-1 ring-primary/20 backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-primary mr-2" />
            <span className="text-sm font-medium text-primary">
              AI-Powered Plushie Generation
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-foreground via-foreground to-muted-foreground">
            Create Your Dream Plushie
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Transform any photo into an adorable plushie design in seconds using
            our advanced AI engine.
          </p>
        </div>

        {/* Wizard Container */}
        <div className="flex-1 max-w-5xl mx-auto w-full animate-in fade-in scale-95 duration-700 delay-300 pb-12">
          <div className="relative group">
            {/* Decorative gradients behind the card */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/30 via-purple-500/30 to-primary/30 rounded-2xl blur-2xl opacity-50 group-hover:opacity-75 transition duration-1000" />
            <GenerationWizard
              className="relative bg-card/80 backdrop-blur-xl border-white/10 dark:border-white/5 shadow-2xl rounded-xl overflow-hidden"
              onGenerate={handleGenerate}
              isGenerating={isGenerating}
              generationResult={generationResult}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
