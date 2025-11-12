import { Coins } from "lucide-react";
import { cn } from "@/lib/utils";

interface CreditDisplayProps {
  credits: number;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
}

export function CreditDisplay({
  credits,
  size = "md",
  showLabel = true,
  className,
}: CreditDisplayProps) {
  const sizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  const iconSizes = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-lg bg-muted px-3 py-2 transition-colors hover:bg-muted/80",
        sizeClasses[size],
        className
      )}
      title={`${credits} credits available`}
    >
      <Coins className={cn("text-primary", iconSizes[size])} />
      <span className="font-semibold">
        {credits}
        {showLabel && (
          <span className="ml-1 font-normal text-muted-foreground">
            {credits === 1 ? "credit" : "credits"}
          </span>
        )}
      </span>
    </div>
  );
}
