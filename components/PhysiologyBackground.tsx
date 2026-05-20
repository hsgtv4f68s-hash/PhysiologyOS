type FocusTone = "green" | "yellow" | "red" | null;

export default function PhysiologyBackground({
  stressOpacity = 0.12,
  focusTone = null,
}: {
  stressOpacity?: number;
  focusTone?: FocusTone;
}) {
  const focusColor =
    focusTone === "green"
      ? "bg-emerald-400"
      : focusTone === "yellow"
        ? "bg-yellow-400"
        : focusTone === "red"
          ? "bg-red-400"
          : "bg-white";

  const focusOpacity =
    focusTone === null ? 0 : 0.12;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute left-[-10%] top-[-10%] h-96 w-96 rounded-full bg-emerald-400/10 blur-3xl ambient-drift" />

      <div className="absolute right-[-12%] top-[15%] h-80 w-80 rounded-full bg-yellow-400/5 blur-3xl ambient-drift-slow" />

      <div
        className="absolute bottom-[-14%] left-[35%] h-[28rem] w-[28rem] rounded-full bg-red-400 blur-3xl ambient-drift transition-all duration-[3000ms]"
        style={{ opacity: stressOpacity }}
      />

      <div
        className={`absolute left-[30%] top-[25%] h-[34rem] w-[34rem] rounded-full ${focusColor} blur-3xl transition-all duration-[900ms]`}
        style={{ opacity: focusOpacity }}
      />

      <div className="absolute inset-0 opacity-[0.08] neural-grid" />

      <svg
        className="absolute inset-0 h-full w-full opacity-[0.12] neural-flow"
        viewBox="0 0 1440 1024"
        preserveAspectRatio="none"
      >
        <path
          d="M120 280 C 320 160, 420 420, 620 300 S 920 220, 1100 360 S 1260 520, 1360 420"
          fill="none"
          stroke="rgba(110, 231, 183, 0.45)"
          strokeWidth="1"
        />

        <path
          d="M80 720 C 240 560, 460 660, 620 520 S 880 440, 1040 600 S 1260 760, 1400 620"
          fill="none"
          stroke="rgba(248, 113, 113, 0.35)"
          strokeWidth="1"
        />

        <path
          d="M260 120 C 420 240, 500 180, 700 260 S 980 420, 1220 260"
          fill="none"
          stroke="rgba(251, 191, 36, 0.28)"
          strokeWidth="1"
        />
      </svg>
    </div>
  );
}