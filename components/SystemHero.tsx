"use client";

import { useEffect, useState } from "react";
import type { SystemHeroProps } from "@/types/ui";

export default function SystemHero({
  teamScore,
  system,
  acknowledged,
  setAcknowledged,
  acceptedCount,
  totalInterventions,
  children,
}: SystemHeroProps) {
  const [expanded, setExpanded] = useState(true);

  useEffect(() => {
    if (acknowledged) {
      setExpanded(false);
    } else {
      setExpanded(true);
    }
  }, [acknowledged]);

  const compact = acknowledged && !expanded;
  const unresolvedCount = Math.max(totalInterventions - acceptedCount, 0);

  return (
    <section
      onClick={() => {
        if (compact) setExpanded(true);
      }}
      className={`relative mt-12 overflow-hidden rounded-[42px] border transition-all duration-[2200ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
        compact
          ? "monitored-hero-breathe ml-auto max-w-xl scale-[0.985] cursor-pointer border-white/10 bg-white/[0.035] p-6 backdrop-blur-3xl"
          : acknowledged
            ? "monitored-hero-breathe scale-[1.002] border-white/10 bg-white/[0.045] p-12 backdrop-blur-3xl"
            : "border-white/10 bg-white/[0.05] p-12 backdrop-blur-3xl"
      }`}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-[-10%] top-[-20%] h-80 w-80 rounded-full bg-white/[0.03] blur-3xl" />
        <div className="absolute right-[-12%] top-[10%] h-72 w-72 rounded-full bg-white/[0.025] blur-3xl" />
        <div className="absolute inset-[1px] rounded-[41px] border border-white/[0.04]" />
      </div>

      <div
        className={`relative z-10 flex items-center ${
          compact ? "justify-between gap-6" : "flex-col text-center"
        }`}
      >
        <div
          className={`relative flex items-center justify-center ${system.glow} ${
            compact ? "h-24 w-24" : "h-48 w-48"
          }`}
        >
          <svg
            className={`absolute inset-0 -rotate-90 ${
              compact ? "h-24 w-24" : "h-48 w-48"
            }`}
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

          <div className="relative z-10 text-center">
            <p className={compact ? "text-2xl font-bold" : "text-5xl font-bold"}>
              {teamScore}
            </p>

            {!compact && (
              <p className="mt-1 text-sm text-white/45">
                Team Readiness
              </p>
            )}
          </div>
        </div>

        <div className={compact ? "flex-1 text-left" : "mt-10 text-center"}>
          <h1
            className={`font-bold tracking-tight ${system.color} ${
              compact ? "text-2xl" : "text-5xl"
            }`}
          >
            {system.label}
          </h1>

          <p
            className={`mt-3 leading-relaxed text-white/65 ${
              compact ? "text-sm" : "max-w-2xl text-lg"
            }`}
          >
            {compact
              ? unresolvedCount > 0
                ? `${acceptedCount}/${totalInterventions} interventions accepted. ${unresolvedCount} unresolved.`
                : "All interventions accepted. System is being monitored."
              : system.message}
          </p>
        </div>

        {!compact && teamScore < 80 && !acknowledged && (
          <button
            onClick={() => setAcknowledged(true)}
            className="mt-8 rounded-2xl border border-white/10 bg-white/[0.06] px-6 py-3 text-sm font-medium text-white backdrop-blur-xl transition-all duration-500 hover:bg-white/[0.1]"
          >
            Acknowledge System State
          </button>
        )}

        {!compact && acknowledged && teamScore < 80 && (
          <button
            onClick={(event) => {
              event.stopPropagation();
              setAcknowledged(false);
            }}
            className="mt-8 rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-3 text-sm font-medium text-white/70 backdrop-blur-xl transition-all duration-500 hover:bg-white/[0.08]"
          >
            Reopen Review
          </button>
        )}
      </div>

      {!compact && children && (
        <div className="relative z-10 mt-10 w-full">
          {children}
        </div>
      )}
    </section>
  );
}