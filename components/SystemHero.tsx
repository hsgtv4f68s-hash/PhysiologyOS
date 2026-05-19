type SystemHeroProps = {
  teamScore: number;
  system: {
    label: string;
    color: string;
    glow: string;
    message: string;
  };
  acknowledged: boolean;
  setAcknowledged: (value: boolean) => void;
  children?: React.ReactNode;
};

export default function SystemHero({
  teamScore,
  system,
  acknowledged,
  setAcknowledged,
  children,
}: SystemHeroProps) {
  return (
    <section className="relative mt-12 overflow-hidden rounded-[40px] border border-neutral-800 bg-neutral-900/80 p-12">
      <div className="absolute inset-0 opacity-40">
        <div className="absolute left-[10%] top-[20%] h-64 w-64 rounded-full bg-green-400/10 blur-3xl ambient-drift" />
        <div className="absolute right-[5%] top-[10%] h-72 w-72 rounded-full bg-yellow-400/5 blur-3xl ambient-drift-slow" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center">
        <div
          className={`relative flex h-44 w-44 items-center justify-center ${system.glow}`}
        >
          <svg
            className="absolute inset-0 h-44 w-44 -rotate-90"
            viewBox="0 0 100 100"
          >
            <circle
              cx="50"
              cy="50"
              r="42"
              stroke="#262626"
              strokeWidth="10"
              fill="none"
            />

            <circle
              cx="50"
              cy="50"
              r="42"
              stroke="currentColor"
              strokeWidth="10"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={`${teamScore * 2.64} 999`}
              className={system.color}
            />
          </svg>

          <div className="text-center">
            <p className="text-5xl font-bold">{teamScore}</p>
            <p className="mt-1 text-sm text-neutral-400">Team Readiness</p>
          </div>
        </div>

        <h1 className={`mt-10 text-5xl font-bold tracking-tight ${system.color}`}>
          {system.label}
        </h1>

        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-neutral-300">
          {system.message}
        </p>

        {teamScore < 80 && !acknowledged && (
          <button
            onClick={() => setAcknowledged(true)}
            className="mt-8 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black hover:bg-neutral-200 transition"
          >
            Acknowledge System State
          </button>
        )}

        {acknowledged && teamScore < 80 && (
          <button
            onClick={() => setAcknowledged(false)}
            className="mt-8 rounded-xl border border-neutral-700 px-5 py-3 text-sm text-neutral-300 hover:bg-neutral-800 transition"
          >
            Reopen Review
          </button>
        )}

        {children}
      </div>
    </section>
  );
}