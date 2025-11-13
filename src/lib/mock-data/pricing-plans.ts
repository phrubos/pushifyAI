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
    id: "plan_basic",
    name: "Basic",
    price: 9,
    credits: 30,
    pricePerCredit: 0.3,
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
    price: 19,
    credits: 100,
    pricePerCredit: 0.19,
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
    id: "plan_elite",
    name: "Elite",
    price: 29,
    credits: 200,
    pricePerCredit: 0.145,
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
