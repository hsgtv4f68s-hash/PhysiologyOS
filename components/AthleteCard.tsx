import Link from "next/link";

export default function AthleteCard({
  name,
  status,
  color,
  score,
  message,
  insights,
}: {
  name: string;
  status: string;
  color: string;
  score: string;
  message: string;
  insights: string[];
}) {
  let glowClass = "glow-green";

if (status === "Yellow") {
  glowClass = "glow-yellow";
}

if (status === "Red") {
  glowClass = "glow-red";
}
  return (
    <div className="rounded-3xl border border-neutral-800 bg-neutral-900 p-6 shadow-2xl">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-neutral-400">Athlete</p>

          <h2 className="mt-1 text-2xl font-semibold">{name}</h2>
        </div>

        <div
  className={`relative flex h-24 w-24 items-center justify-center ${glowClass}`}
>
          <svg
            className="absolute inset-0 h-24 w-24 -rotate-90"
            viewBox="0 0 100 100"
          >
            <circle
              cx="50"
              cy="50"
              r="42"
              stroke="#262626"
              strokeWidth="11"
              fill="none"
            />

            <circle
              cx="50"
              cy="50"
              r="42"
              stroke="currentColor"
              strokeWidth="11"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={`${Number(score) * 2.64} 999`}
              className={color}
            />
          </svg>

          <span className="text-xl font-bold">{score}</span>
        </div>
      </div>

      <div className="mt-6">
        <p className={`text-lg font-semibold ${color}`}>{status}</p>

        <p className="mt-2 text-neutral-300">{message}</p>

        <div className="mt-4 space-y-2">
          {insights.map((insight) => (
            <div
              key={insight}
              className="rounded-lg bg-neutral-800 px-3 py-2 text-sm text-neutral-300"
            >
              {insight}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex gap-2">
        <Link
          href={`/athletes/${encodeURIComponent(name)}`}
          className="rounded-xl bg-white px-4 py-2 text-sm font-medium text-black hover:bg-neutral-200 transition"
        >
          View Athlete
        </Link>

        <button className="rounded-xl border border-neutral-700 px-4 py-2 text-sm text-neutral-300 hover:bg-neutral-800 transition">
          AI Details
        </button>
      </div>
    </div>
  );
}