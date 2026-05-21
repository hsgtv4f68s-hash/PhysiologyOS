"use client";

import { useState } from "react";
import type { SystemHeroProps } from "@/types/ui";

export default function SystemHero({
  teamScore,
  system,
  acceptedCount,
  totalInterventions,
  children,
}: SystemHeroProps) {
  const [reviewOpen, setReviewOpen] = useState(false);

  const unresolvedCount = Math.max(totalInterventions - acceptedCount, 0);

  return (
    <section className="mt-10">
      <div
  className={`relative overflow-hidden rounded-[32px] border bg-white/[0.045] p-5 backdrop-blur-3xl transition-all duration-[1800ms] ${
    teamScore >= 80
      ? "border-emerald-300/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_0_90px_rgba(110,231,183,0.06)]"
      : teamScore >= 60
        ? "border-orange-300/12 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_0_110px_rgba(253,186,116,0.08)]"
        : "border-rose-300/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_0_120px_rgba(251,113,133,0.08)]"
  }`}
>
        <div className="absolute inset-0">
          <div className="absolute left-[-8%] top-[-60%] h-40 w-40 rounded-full bg-white/[0.04] blur-3xl" />
          <div className="absolute right-[-10%] top-[-40%] h-48 w-48 rounded-full bg-white/[0.025] blur-3xl" />
        </div>

        <div className="relative z-10 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-5">
            <div className={`relative flex h-20 w-20 items-center justify-center ${system.glow}`}>
              <svg
                className="absolute inset-0 h-20 w-20 -rotate-90"
                viewBox="0 0 100 100"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  stroke="rgba(255,255,255,0.08)"
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

              <p className="relative z-10 text-2xl font-bold">
                {teamScore}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-white/35">
                Team Readiness
              </p>

              <h2 className={`mt-1 text-2xl font-semibold tracking-tight ${system.color}`}>
                {system.label}
              </h2>

              <p className="mt-1 max-w-2xl text-sm leading-relaxed text-white/55">
                {unresolvedCount > 0
                  ? `${unresolvedCount} intervention${unresolvedCount === 1 ? "" : "s"} still need review.`
                  : "All active recommendations are being monitored."}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="rounded-2xl border border-white/10 bg-[#0b0b0b]/70 px-4 py-3">
              <p className="text-xs text-white/35">Interventions</p>
              <p className="mt-1 text-sm font-semibold text-white/75">
                {acceptedCount}/{totalInterventions} active
              </p>
            </div>

            <button
              onClick={() => setReviewOpen((current) => !current)}
              className="rounded-2xl border border-white/10 bg-white/[0.06] px-5 py-3 text-sm font-medium text-white/75 backdrop-blur-xl transition-all duration-500 hover:bg-white/[0.1] hover:text-white"
            >
              {reviewOpen ? "Hide Review" : "Review"}
            </button>
          </div>
        </div>
      </div>

      {reviewOpen && children && (
        <div className="fade-in-soft">
          {children}
        </div>
      )}
    </section>
  );
}