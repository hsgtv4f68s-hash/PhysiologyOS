type FocusTone = "green" | "yellow" | "red" | null;

type Props = {
  stressOpacity?: number;
  focusTone?: FocusTone;
  variant?: "atmosphere" | "neural";
};

export default function PhysiologyBackground({
  stressOpacity = 0.08,
  focusTone = null,
  variant = "atmosphere",
}: Props) {
  const tone =
    focusTone === "green"
      ? "rgba(74,222,128,"
      : focusTone === "yellow"
        ? "rgba(250,204,21,"
        : "rgba(248,113,113,";

  if (variant === "neural") {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <svg className="absolute inset-0 h-full w-full">
          <defs>
            <filter id="neuralBlur">
              <feGaussianBlur stdDeviation="18" />
            </filter>
          </defs>

          <g filter="url(#neuralBlur)">
            <path
              d="M-100 220 C 180 120, 320 340, 620 240 S 1040 160, 1400 260"
              stroke={`${tone}${stressOpacity})`}
              strokeWidth="22"
              fill="none"
              className="neural-flow-slow"
            />

            <path
              d="M-80 520 C 220 420, 420 660, 720 540 S 1100 460, 1480 620"
              stroke={`${tone}${stressOpacity * 0.8})`}
              strokeWidth="18"
              fill="none"
              className="neural-flow"
            />

            <circle
              cx="760"
              cy="540"
              r="16"
              fill={`${tone}${stressOpacity * 1.8})`}
              className="neural-node-pulse"
            />

            <circle
              cx="1120"
              cy="260"
              r="20"
              fill={`${tone}${stressOpacity * 1.9})`}
              className="neural-node-pulse-slow"
            />
          </g>
        </svg>
      </div>
    );
  }

  const focusColor =
    focusTone === "green"
      ? "bg-emerald-400"
      : focusTone === "yellow"
        ? "bg-yellow-400"
        : focusTone === "red"
          ? "bg-red-400"
          : "bg-white";

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
        style={{ opacity: focusTone ? 0.12 : 0 }}
      />

      <div className="absolute inset-0 opacity-[0.08] neural-grid" />
    </div>
  );
}