export interface Purchase {
  id: string
  date: Date
  plan: string
  amount: number
  credits: number
  status: "completed" | "pending" | "failed"
}

export const mockPurchases: Purchase[] = [
  {
    id: "pur_001",
    date: new Date("2025-01-01T10:00:00.000Z"),
    plan: "Pro Plan",
    amount: 19,
    credits: 100,
    status: "completed",
  },
  {
    id: "pur_002",
    date: new Date("2024-12-01T09:30:00.000Z"),
    plan: "Pro Plan",
    amount: 19,
    credits: 100,
    status: "completed",
  },
  {
    id: "pur_003",
    date: new Date("2024-11-15T14:15:00.000Z"),
    plan: "Basic Plan",
    amount: 9,
    credits: 30,
    status: "completed",
  },
]
