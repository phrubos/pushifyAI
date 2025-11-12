import { Badge } from "@/components/ui/badge";
import { Clock, Loader2, CheckCircle2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type GenerationStatus = "pending" | "processing" | "completed" | "failed";

interface GenerationStatusProps {
  status: GenerationStatus;
  className?: string;
}

export function GenerationStatus({
  status,
  className,
}: GenerationStatusProps) {
  const statusConfig = {
    pending: {
      label: "Pending",
      icon: Clock,
      className: "bg-gray-500/10 text-gray-600 dark:text-gray-400",
    },
    processing: {
      label: "Processing",
      icon: Loader2,
      className: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
      animate: true,
    },
    completed: {
      label: "Completed",
      icon: CheckCircle2,
      className: "bg-green-500/10 text-green-600 dark:text-green-400",
    },
    failed: {
      label: "Failed",
      icon: XCircle,
      className: "bg-red-500/10 text-red-600 dark:text-red-400",
    },
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <Badge
      variant="secondary"
      className={cn(
        "gap-1.5 border-0 font-medium",
        config.className,
        className
      )}
    >
      <Icon
        className={cn("h-3.5 w-3.5", config.animate && "animate-spin")}
      />
      {config.label}
    </Badge>
  );
}
