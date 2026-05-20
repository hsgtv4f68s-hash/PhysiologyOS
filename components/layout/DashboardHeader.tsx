export default function DashboardHeader() {
  return (
    <header className="flex items-center justify-between">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">
          Coach Dashboard
        </h1>

        <p className="mt-2 text-neutral-400">
          AI-powered athlete readiness overview.
        </p>
      </div>

      <button className="rounded-xl bg-white px-4 py-2 font-medium text-black transition hover:bg-neutral-200">
        Add Athlete
      </button>
    </header>
  );
}