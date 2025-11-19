export interface PricingPlan {
  id: string
  name: string
  price: number
  credits: number
  pricePerCredit: number
  features: string[]
  badge?: string
  isPopular?: boolean
}

export const pricingPlans: PricingPlan[] = [
  {
    id: "plan_starter",
    name: "Starter",
    price: 4.99,
    credits: 50,
    pricePerCredit: 0.10,
    features: [
      "HD quality generations",
      "Unlimited gallery storage",
      "Download full resolution",
      "All style options",
    ],
  },
  {
    id: "plan_pro",
    name: "Pro",
    price: 14.99,
    credits: 200,
    pricePerCredit: 0.075,
    features: [
      "HD quality generations",
      "Unlimited gallery storage",
      "Download full resolution",
      "All style options",
      "Priority support",
    ],
    badge: "Popular",
    isPopular: true,
  },
  {
    id: "plan_ultimate",
    name: "Ultimate",
    price: 29.99,
    credits: 500,
    pricePerCredit: 0.06,
    features: [
      "HD quality generations",
      "Unlimited gallery storage",
      "Download full resolution",
      "All style options",
      "Priority support",
      "Early access to new features",
    ],
    badge: "Best Value",
  },
]
