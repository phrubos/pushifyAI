"use client";

import { useState } from "react";
import { PricingCard } from "@/components/plushify/pricing-card";
import { pricingPlans } from "@/lib/mock-data/pricing-plans";
import { createCheckoutSession } from "@/app/actions/polar";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function PricingSection() {
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const router = useRouter();

  const handleCheckout = async (planId: string) => {
    setLoadingId(planId);
    try {
      const { url } = await createCheckoutSession(planId);
      if (url) {
        router.push(url);
      } else {
        throw new Error("No checkout URL returned");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("Failed to start checkout", {
        description: "Please try again later."
      });
      setLoadingId(null);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
      {pricingPlans.map((plan) => (
        <PricingCard
          key={plan.id}
          id={plan.id}
          name={plan.name}
          price={plan.price}
          credits={plan.credits}
          pricePerCredit={plan.pricePerCredit}
          features={plan.features}
          badge={plan.badge}
          isPopular={plan.isPopular}
          onCheckout={handleCheckout}
          isLoading={loadingId === plan.id}
        />
      ))}
    </div>
  );
}
