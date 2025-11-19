import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { getUserCredits } from "@/app/actions/credits"
import { getGenerations } from "@/app/actions/generations"
import { UnifiedDashboardClient } from "@/components/dashboard/unified-dashboard-client"

export default async function DashboardPage() {
  // Check authentication
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/sign-in");
  }

  const user = session.user;
  
  // Fetch user credits and all generations
  const credits = await getUserCredits();
  const allGenerations = await getGenerations(20, 0);

  // Calculate stats
  const totalGenerations = allGenerations.length;
  const favoriteCount = allGenerations.filter((g) => g.isFavorite).length;
  const completedCount = allGenerations.filter(
    (g) => g.status === "completed"
  ).length;
  const processingCount = allGenerations.filter(
    (g) => g.status === "processing"
  ).length;

  return (
    <UnifiedDashboardClient
      user={user}
      credits={credits}
      initialGenerations={allGenerations}
      totalGenerations={totalGenerations}
      favoriteCount={favoriteCount}
      completedCount={completedCount}
      processingCount={processingCount}
    />
  )
}
