import { ReactNode } from "react"

interface LegalPageLayoutProps {
  title: string
  lastUpdated: Date
  children: ReactNode
}

export function LegalPageLayout({
  title,
  lastUpdated,
  children,
}: LegalPageLayoutProps) {
  const formattedDate = lastUpdated.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <div className="mb-8">
        <h1 className="mb-2 text-4xl font-bold tracking-tight">{title}</h1>
        <p className="text-sm text-muted-foreground">
          Last updated: {formattedDate}
        </p>
      </div>
      <div className="h-px bg-border mb-8" />
      <div className="prose prose-neutral dark:prose-invert max-w-none">
        {children}
      </div>
    </div>
  )
}
