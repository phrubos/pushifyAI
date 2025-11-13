export interface MockUser {
  id: string
  name: string
  email: string
  image: string
  plan: "basic" | "pro" | "elite"
  credits: number
  createdAt: Date
}

export const mockUser: MockUser = {
  id: "usr_2NNEqL2nrIRdJ194ndJqzHzLq",
  name: "Sarah Johnson",
  email: "sarah@example.com",
  image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
  plan: "pro",
  credits: 42,
  createdAt: new Date("2024-11-15T10:30:00.000Z"),
}
