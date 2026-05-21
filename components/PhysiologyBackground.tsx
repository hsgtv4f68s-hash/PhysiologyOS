type Tone = "green" | "yellow" | "red" | "blue" | null;

type Props = {
  stressOpacity?: number;
  focusTone?: Tone;
  variant?: "atmosphere" | "neural";
  systemTone?: Tone;
};

export default function PhysiologyBackground({
  stressOpacity = 0.08,
  focusTone = null,
  systemTone = null,
  variant = "atmosphere",
}: Props) {
  const activeTone = focusTone ?? systemTone ?? "red";

  const tone =
    activeTone === "green"
      ? "rgba(74,222,128,"
      : activeTone === "yellow"
        ? "rgba(253,186,116,"
        : activeTone === "blue"
          ? "rgba(125,211,252,"
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

  const blobClass =
    activeTone === "green"
      ? "bg-emerald-400"
      : activeTone === "yellow"
        ? "bg-orange-300"
        : activeTone === "blue"
          ? "bg-sky-300"
          : "bg-red-400";

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className={`background-blob absolute left-[-12%] top-[-12%] h-[30rem] w-[30rem] rounded-full ${blobClass} blur-3xl`}
        style={{ opacity: stressOpacity }}
      />

      <div
        className={`background-blob-slow absolute right-[-14%] top-[18%] h-[26rem] w-[26rem] rounded-full ${blobClass} blur-3xl`}
        style={{ opacity: stressOpacity * 0.7 }}
      />

      <div
        className={`background-blob absolute bottom-[-16%] left-[35%] h-[34rem] w-[34rem] rounded-full ${blobClass} blur-3xl`}
        style={{ opacity: stressOpacity * 1.15 }}
      />

      <div className="absolute inset-0 opacity-[0.08] neural-grid" />
    </div>
  );
}