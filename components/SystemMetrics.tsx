import type { Athlete } from "@/types/athlete";
import { calculateReadiness } from "@/lib/readiness";

export default function SystemMetrics({
  athletes,
}: {
  athletes: Athlete[];
}) {
  const readiness = athletes.map((athlete) =>
    calculateReadiness(athlete)
  );

  const stable = readiness.filter(
    (item) => item.status === "Green"
  ).length;

  const strained = readiness.filter(
    (item) => item.status === "Yellow"
  ).length;

  const stressed = readiness.filter(
    (item) => item.status === "Red"
  ).length;

  return (
    <section className="mt-5 grid gap-3 md:grid-cols-3">
      <MetricCard label="Stable" value={stable} tone="emerald" />
      <MetricCard label="Strained" value={strained} tone="orange" />
      <MetricCard label="Under Stress" value={stressed} tone="rose" />
    </section>
  );
}

function MetricCard({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone: "emerald" | "orange" | "rose";
}) {
  const styles = {
    emerald:
      "border-emerald-300/10 text-emerald-200 shadow-[0_0_28px_rgba(110,231,183,0.06)]",
    orange:
      "border-orange-300/15 text-orange-200 shadow-[0_0_32px_rgba(253,186,116,0.09)]",
    rose:
      "border-rose-300/12 text-rose-200 shadow-[0_0_30px_rgba(251,113,133,0.08)]",
  };

  return (
    <div
      className={`rounded-3xl border bg-[#0b0b0b]/80 p-5 backdrop-blur-2xl ${styles[tone]}`}
    >
      <p className="text-xs uppercase tracking-[0.18em] text-white/35">
        {label}
      </p>

      <p className="mt-3 text-4xl font-bold">{value}</p>
    </div>
  );
}