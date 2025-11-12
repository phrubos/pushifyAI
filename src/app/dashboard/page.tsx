export default function DashboardPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 border border-border rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Welcome to Plushify!</h2>
          <p className="text-muted-foreground mb-4">
            Your dashboard will be redesigned in Phase 4 of the implementation.
          </p>
        </div>

        <div className="p-6 border border-border rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Coming Soon</h2>
          <p className="text-muted-foreground mb-4">
            More features will be added as we progress through the implementation phases.
          </p>
        </div>
      </div>
    </div>
  );
}
