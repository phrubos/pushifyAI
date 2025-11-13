import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CreditDisplay } from "@/components/plushify/credit-display"
import { GalleryItem } from "@/components/plushify/gallery-item"
import { mockUser, sampleGenerations } from "@/lib/mock-data"
import { Image as ImageIcon, Heart, Sparkles, Plus } from "lucide-react"

export default function DashboardPage() {
  // Get recent 6 generations
  const recentGenerations = sampleGenerations.slice(0, 6)

  // Calculate stats
  const totalGenerations = sampleGenerations.length
  const favoriteCount = sampleGenerations.filter((g) => g.isFavorite).length
  const completedCount = sampleGenerations.filter(
    (g) => g.status === "completed"
  ).length

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold">
            Welcome back, {mockUser.name}!
          </h1>
          <p className="text-muted-foreground mt-1">
            Ready to create more adorable plushies?
          </p>
        </div>
        <div className="flex items-center gap-4">
          <CreditDisplay credits={mockUser.credits} />
          <Button asChild size="lg">
            <Link href="/generate">
              <Plus className="mr-2 h-5 w-5" />
              Generate New
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Generations
            </CardTitle>
            <ImageIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalGenerations}</div>
            <p className="text-xs text-muted-foreground">
              {completedCount} completed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Credits Available
            </CardTitle>
            <Sparkles className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockUser.credits}</div>
            <p className="text-xs text-muted-foreground">
              <Link
                href="/pricing"
                className="hover:underline text-primary"
              >
                Buy more credits
              </Link>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Favorites</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground fill-current" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{favoriteCount}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((favoriteCount / totalGenerations) * 100)}% of total
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Generations Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Recent Creations</h2>
            <p className="text-muted-foreground">
              Your latest plushie generations
            </p>
          </div>
          <Button asChild variant="outline">
            <Link href="/gallery">View All</Link>
          </Button>
        </div>

        {recentGenerations.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentGenerations.map((generation) => (
              <GalleryItem
                key={generation.id}
                generation={generation}
                onDownload={() => console.log("Download:", generation.id)}
                onDelete={() => console.log("Delete:", generation.id)}
                onFavorite={() => console.log("Favorite:", generation.id)}
                onViewOriginal={() =>
                  console.log("View original:", generation.id)
                }
              />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <ImageIcon className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No plushies yet!</h3>
              <p className="text-muted-foreground text-center mb-6">
                Start creating your first adorable plushie design
              </p>
              <Button asChild>
                <Link href="/generate">Create Your First Plushie</Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-2 hover:border-primary transition-colors cursor-pointer">
          <Link href="/generate" className="block">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                Generate New Plushie
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Upload a new photo and create another adorable plushie design
              </p>
            </CardContent>
          </Link>
        </Card>

        <Card className="border-2 hover:border-primary transition-colors cursor-pointer">
          <Link href="/pricing" className="block">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Get More Credits
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                View pricing plans and add more credits to your account
              </p>
            </CardContent>
          </Link>
        </Card>
      </div>
    </div>
  )
}
