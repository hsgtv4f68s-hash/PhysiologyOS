type InterventionPanelProps = {
  acceptedAdjustments: string[];
  acceptAdjustment: (name: string) => void;
};

export default function InterventionPanel({
  acceptedAdjustments,
  acceptAdjustment,
}: InterventionPanelProps) {
  return (
    <section className="fade-in-soft mt-10 w-full max-w-5xl rounded-[32px] border border-white/10 bg-white/[0.035] p-8 backdrop-blur-2xl">
      <div className="mb-8">
        <p className="text-sm text-white/40">
          AI Intervention Guidance
        </p>

        <h2 className="mt-2 text-3xl font-semibold tracking-tight">
          System Regulation Recommendations
        </h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <InterventionCard
          name="Sarah Miller"
          statusColor="bg-yellow-400"
          glow="shadow-[0_0_12px_rgba(251,191,36,0.6)]"
          adjustment="Reduce threshold volume by 20%"
          concern="Accumulating autonomic fatigue markers."
          tags={["HRV suppressed", "Elevated RHR", "Sleep debt"]}
          accepted={acceptedAdjustments.includes("Sarah Miller")}
          onAccept={() => acceptAdjustment("Sarah Miller")}
        />

        <InterventionCard
          name="Jake Turner"
          statusColor="bg-red-400"
          glow="shadow-[0_0_14px_rgba(248,113,113,0.6)]"
          adjustment="Replace threshold work with aerobic recovery"
          concern="Recovery capacity appears significantly reduced."
          tags={["High soreness", "Elevated fatigue", "HRV instability"]}
          accepted={acceptedAdjustments.includes("Jake Turner")}
          onAccept={() => acceptAdjustment("Jake Turner")}
        />
      </div>
    </section>
  );
}

function InterventionCard({
  name,
  statusColor,
  glow,
  adjustment,
  concern,
  tags,
  accepted,
  onAccept,
}: {
  name: string;
  statusColor: string;
  glow: string;
  adjustment: string;
  concern: string;
  tags: string[];
  accepted: boolean;
  onAccept: () => void;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-6 text-left backdrop-blur-2xl transition-all duration-700">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-white/35">Athlete</p>

          <h3 className="mt-1 text-2xl font-semibold">
            {name}
          </h3>
        </div>

        <div className={`h-3 w-3 rounded-full ${statusColor} ${glow}`} />
      </div>

      <div className="mt-6">
        <p className="text-sm text-white/35">
          Suggested Adjustment
        </p>

        <p className="mt-2 text-lg text-white/80">
          {adjustment}
        </p>
      </div>

      <div className="mt-6">
        <p className="text-sm text-white/35">
          Primary Concern
        </p>

        <p className="mt-2 text-white/60">
          {concern}
        </p>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <div
            key={tag}
            className="rounded-full border border-white/10 bg-white/[0.025] px-3 py-1 text-sm text-white/55"
          >
            {tag}
          </div>
        ))}
      </div>

      <div className="mt-8 flex gap-3">
        <button
          onClick={onAccept}
          className="rounded-xl bg-white px-4 py-2 text-sm font-medium text-black transition hover:bg-neutral-200"
        >
          {accepted ? "Monitoring Response" : "Accept Adjustment"}
        </button>

        <button className="rounded-xl border border-white/10 px-4 py-2 text-sm text-white/55 transition hover:bg-white/[0.06]">
          Modify
        </button>
      </div>
    </div>
  );
}