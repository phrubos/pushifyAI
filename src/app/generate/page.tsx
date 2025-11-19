import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getUserCredits } from "@/app/actions/credits";
import { GeneratePageClient } from "@/components/plushify/generate-page-client";

export default async function GeneratePage() {
  // Check authentication
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/");
  }

  // Fetch user credits
  const credits = await getUserCredits();

  return <GeneratePageClient initialCredits={credits} />;
}
