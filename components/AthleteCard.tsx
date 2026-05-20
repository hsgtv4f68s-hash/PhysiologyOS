type TelemetryItem = {
  label: string;
  value: string;
  tone: string;
};

type AthleteCardProps = {
  name: string;
  status: string;
  color: string;
  score: string;
  message: string;
  insights: string[];
  telemetry: TelemetryItem[];
  selected?: boolean;
  dimmed?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
};

export default function AthleteCard({
  name,
  status,
  color,
  score,
  message,
  insights,
  telemetry,
  selected,
  dimmed,
  onMouseEnter,
  onMouseLeave,
}: AthleteCardProps) {
  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`group relative cursor-pointer overflow-hidden rounded-[28px] border transition-all duration-700 ${
        selected
          ? "scale-[1.015] border-white/15 bg-black/35 shadow-[0_0_80px_rgba(255,255,255,0.04)] backdrop-blur-2xl"
          : "border-white/8 bg-black/30 backdrop-blur-xl"
      } ${dimmed ? "opacity-40 blur-[0.2px]" : "opacity-100"}`}
    >
      <div className="absolute inset-0">
        <div className="absolute left-[-20%] top-[-20%] h-40 w-40 rounded-full bg-white/[0.03] blur-3xl" />
        <div className="absolute inset-[1px] rounded-[27px] border border-white/[0.03]" />
      </div>

      <div className="relative z-10 p-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-white">
              {name}
            </h2>

            <p className={`mt-2 text-sm font-medium ${color}`}>{status}</p>
          </div>

          <div className="text-right">
            <p className="text-4xl font-bold text-white">{score}</p>

            <p className="mt-1 text-xs uppercase tracking-[0.2em] text-white/35">
              Readiness
            </p>
          </div>
        </div>

        <p className="mt-5 text-sm leading-relaxed text-white/60">
          {message}
        </p>

        <div className="mt-6 space-y-2">
          {insights.map((insight) => (
            <div
              key={insight}
              className="rounded-xl border border-white/[0.05] bg-[#0b0b0b]/90 px-3 py-2 text-sm text-white/55"
            >
              {insight}
            </div>
          ))}
        </div>

        <div
          className={`grid overflow-hidden transition-all duration-[1400ms] ease-out ${
            selected ? "mt-8 max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="grid gap-5 border-t border-white/[0.06] pt-6 md:grid-cols-3">
            {telemetry.map((item) => (
              <TelemetryBlock
                key={item.label}
                label={item.label}
                value={item.value}
                tone={item.tone}
              />
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-white/[0.06] bg-[#0b0b0b]/90 p-5 transition-all duration-700">
            <p className="text-xs uppercase tracking-[0.18em] text-white/35">
              AI Physiological Interpretation
            </p>

            <p className="mt-3 text-sm leading-relaxed text-white/65">
              {status === "Green" &&
                "Recovery markers are stable and adaptation appears favorable. Athlete is well-positioned for planned training load."}

              {status === "Yellow" &&
                "Accumulating fatigue indicators suggest reduced recovery capacity. Recommend preserving aerobic efficiency while reducing systemic load."}

              {status === "Red" &&
                "Multiple suppressed recovery markers suggest elevated physiological strain. Recommend prioritizing recovery and monitoring response before reintroducing intensity."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TelemetryBlock({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: string;
}) {
  const glow = tone.includes("green")
    ? "shadow-[0_0_18px_rgba(74,222,128,0.08)] border-emerald-400/10"
    : tone.includes("yellow")
      ? "shadow-[0_0_18px_rgba(250,204,21,0.08)] border-yellow-400/10"
      : "shadow-[0_0_18px_rgba(248,113,113,0.08)] border-red-400/10";

  const trace = tone.includes("green")
    ? "stroke-emerald-300/70 fill-emerald-300/70"
    : tone.includes("yellow")
      ? "stroke-yellow-300/70 fill-yellow-300/70"
      : "stroke-red-300/70 fill-red-300/70";

  return (
    <div
      className={`rounded-2xl border bg-[#0b0b0b]/90 p-4 transition-all duration-700 ${glow}`}
    >
      <p className="text-xs uppercase tracking-[0.18em] text-white/35">
        {label}
      </p>

      <p
  className={`mt-3 font-semibold leading-none ${tone} ${
    value.length > 10 ? "text-base" : "text-xl"
  }`}
>
  {value}
</p>

      <div className="mt-5 opacity-70">
        <svg
          viewBox="0 0 120 28"
          className="h-7 w-full overflow-visible"
          preserveAspectRatio="none"
        >
          {tone.includes("green") && (
            <>
              <path
                d="M4 14 C 14 10, 20 10, 30 12 S 48 18, 60 14 S 82 8, 96 12 S 108 16, 116 14"
                fill="none"
                strokeWidth="1.4"
                strokeLinecap="round"
                className={`${trace} neural-green`}
              />
              <circle cx="30" cy="12" r="1.4" className={`${trace} neural-node-green`} />
              <circle cx="60" cy="14" r="1.4" className={`${trace} neural-node-green`} />
              <circle cx="96" cy="12" r="1.4" className={`${trace} neural-node-green`} />
            </>
          )}

          {tone.includes("yellow") && (
            <>
              <path
                d="M4 16 C 12 10, 18 8, 28 12 S 42 22, 54 18 S 70 6, 82 10 S 96 20, 116 12"
                fill="none"
                strokeWidth="1.5"
                strokeLinecap="round"
                className={`${trace} neural-yellow`}
              />
              <circle cx="28" cy="12" r="1.6" className={`${trace} neural-node-yellow`} />
              <circle cx="54" cy="18" r="1.6" className={`${trace} neural-node-yellow`} />
              <circle cx="82" cy="10" r="1.6" className={`${trace} neural-node-yellow`} />
            </>
          )}

          {tone.includes("red") && (
            <>
              <path
                d="M4 18 C 10 8, 18 22, 28 12 S 42 4, 52 18 S 68 26, 78 10 S 96 4, 116 18"
                fill="none"
                strokeWidth="1.6"
                strokeLinecap="round"
                className={`${trace} neural-red`}
              />
              <circle cx="28" cy="12" r="1.8" className={`${trace} neural-node-red`} />
              <circle cx="52" cy="18" r="1.8" className={`${trace} neural-node-red`} />
              <circle cx="78" cy="10" r="1.8" className={`${trace} neural-node-red`} />
            </>
          )}
        </svg>
      </div>
    </div>
  );
}