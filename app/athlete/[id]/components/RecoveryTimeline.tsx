import {
  scoreToTone,
  toneToBgColor,
  toneToBorderGlow,
  toneToTextColor,
} from "@/lib/status";

const recoveryData = [
  { day: "Mon", score: 72 },
  { day: "Tue", score: 68 },
  { day: "Wed", score: 61 },
  { day: "Thu", score: 54 },
  { day: "Fri", score: 58 },
  { day: "Sat", score: 66 },
  { day: "Sun", score: 78 },
];

export default function RecoveryTimeline() {
  return (
    <section className="mt-8 rounded-[36px] border border-white/10 bg-white/[0.035] p-7 backdrop-blur-2xl">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-white/35">
            Recovery Timeline
          </p>

          <h2 className="mt-2 text-3xl font-semibold tracking-tight">
            Seven-Day Physiological Drift
          </h2>
        </div>

        <p className="text-sm text-white/45">
          Adaptive trend view
        </p>
      </div>

      <div className="mt-10 grid grid-cols-7 gap-3">
        {recoveryData.map((item) => {
          const tone = scoreToTone(item.score);

          return (
            <div key={item.day} className="flex flex-col items-center gap-3">
              <div
                className={`relative flex h-28 w-full items-end justify-center rounded-2xl border bg-[#0b0b0b]/90 p-2 ${toneToBorderGlow(
                  tone
                )}`}
              >
                <div
                  className={`w-full rounded-xl ${toneToBgColor(tone)}`}
                  style={{
                    height: `${item.score}%`,
                  }}
                />
              </div>

              <p className="text-xs text-white/40">{item.day}</p>

              <p className={`text-sm font-semibold ${toneToTextColor(tone)}`}>
                {item.score}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}