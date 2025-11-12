import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface PricingCardProps {
  name: string;
  price: number;
  credits: number;
  pricePerCredit: number;
  features: string[];
  badge?: string;
  isPopular?: boolean;
  className?: string;
}

export function PricingCard({
  name,
  price,
  credits,
  pricePerCredit,
  features,
  badge,
  isPopular = false,
  className,
}: PricingCardProps) {
  return (
    <Card
      className={cn(
        "relative flex flex-col transition-all hover:shadow-lg",
        isPopular && "border-primary shadow-md",
        className
      )}
    >
      {badge && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <Badge
            variant={isPopular ? "default" : "secondary"}
            className="px-3 py-1"
          >
            {badge}
          </Badge>
        </div>
      )}

      <CardHeader className="text-center">
        <CardTitle className="text-2xl">{name}</CardTitle>
        <CardDescription>
          <div className="mt-4 flex items-baseline justify-center gap-1">
            <span className="text-4xl font-bold text-foreground">${price}</span>
            <span className="text-muted-foreground">/one-time</span>
          </div>
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1 space-y-4">
        <div className="rounded-lg bg-muted p-3 text-center">
          <p className="text-2xl font-bold">{credits} credits</p>
          <p className="text-sm text-muted-foreground">
            ${pricePerCredit.toFixed(2)} per credit
          </p>
        </div>

        <ul className="space-y-2.5">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <span className="text-sm text-muted-foreground">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter>
        <Button
          className="w-full"
          variant={isPopular ? "default" : "outline"}
          size="lg"
        >
          Choose Plan
        </Button>
      </CardFooter>
    </Card>
  );
}
