import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/admin";
import { AdminCreditsClient } from "@/components/admin/admin-credits-client";

export default async function AdminCreditsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/sign-in?callbackUrl=/admin/credits");
  }

  const userIsAdmin = await isAdmin();

  if (!userIsAdmin) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4">Access Denied</h1>
          <p className="text-muted-foreground mb-6">
            You do not have permission to access this page.
          </p>
          <a
            href="/dashboard"
            className="text-primary hover:underline"
          >
            Return to Dashboard
          </a>
        </div>
      </div>
    );
  }

  return <AdminCreditsClient />;
}
