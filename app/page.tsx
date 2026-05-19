"use client";

import { useState } from "react";
import AthleteCard from "@/components/AthleteCard";
import SystemHero from "@/components/SystemHero";

const athletes = [
  {
    name: "Eli Boldman",
    hrv: 78,
    baselineHrv: 70,
    restingHr: 42,
    baselineRestingHr: 44,
    sleep: 8.1,
    soreness: 2,
  },
  {
    name: "Sarah Miller",
    hrv: 58,
    baselineHrv: 68,
    restingHr: 49,
    baselineRestingHr: 44,
    sleep: 6.2,
    soreness: 6,
  },
  {
    name: "Jake Turner",
    hrv: 45,
    baselineHrv: 67,
    restingHr: 54,
    baselineRestingHr: 43,
    sleep: 5.4,
    soreness: 8,
  },
];

function calculateReadiness(athlete: any) {
  let score = 100;

  score -= (athlete.baselineHrv - athlete.hrv) * 2;
  score -= (athlete.restingHr - athlete.baselineRestingHr) * 3;

  if (athlete.sleep < 7) {
    score -= (7 - athlete.sleep) * 8;
  }

  score -= athlete.soreness * 3;

  score = Math.max(0, Math.min(100, score));

  let status = "Green";
  let color = "text-green-400";
  let message = "Ready for high intensity training.";

  if (score < 75) {
    status = "Yellow";
    color = "text-yellow-400";
    message = "Reduce intensity slightly today.";
  }

  if (score < 55) {
    status = "Red";
    color = "text-red-400";
    message = "Recovery recommended.";
  }

  return {
    score: Math.round(score),
    status,
    color,
    message,
  };
}

function generateInsights(athlete: any) {
  const insights = [];

  if (athlete.hrv < athlete.baselineHrv) {
    insights.push("HRV is below baseline.");
  }

  if (athlete.restingHr > athlete.baselineRestingHr) {
    insights.push("Resting HR is elevated.");
  }

  if (athlete.sleep < 7) {
    insights.push("Sleep duration was insufficient.");
  }

  if (athlete.soreness > 5) {
    insights.push("High soreness reported.");
  }

  if (insights.length === 0) {
    insights.push("Recovery metrics are trending positively.");
  }

  return insights;
}

function calculateTeamReadiness() {
  const scores = athletes.map((athlete) => {
    return calculateReadiness(athlete).score;
  });

  const average =
    scores.reduce((a, b) => a + b, 0) / scores.length;

  return Math.round(average);
}

function getSystemStatus(score: number, acknowledged: boolean) {
  if (acknowledged && score < 80) {
    return {
      label: "SYSTEM MONITORED",
      color: "text-blue-300",
      glow: "glow-green",
      message:
        "Coach review complete. Physiological stress remains present, but the system is now being actively managed.",
    };
  }

  if (score >= 80) {
    return {
      label: "SYSTEM STABLE",
      color: "text-green-400",
      glow: "glow-green",
      message:
        "Recovery and adaptation are trending positively.",
    };
  }

  if (score >= 60) {
    return {
      label: "SYSTEM STRAIN",
      color: "text-yellow-400",
      glow: "glow-yellow",
      message:
        "Monitor accumulating fatigue carefully.",
    };
  }

  return {
    label: "SYSTEM UNDER STRESS",
      color: "text-red-400",
      glow: "glow-red",
      message:
        "Multiple athletes are showing suppressed recovery.",
    };
}

export default function Home() {
  const [acknowledged, setAcknowledged] = useState(false);

  const [acceptedAdjustments, setAcceptedAdjustments] = useState<string[]>([]);

  function acceptAdjustment(name: string) {
    if (acceptedAdjustments.includes(name)) {
      return;
    }

    setAcceptedAdjustments((current) => [...current, name]);
  }

  const teamScore = calculateTeamReadiness();

  const system = getSystemStatus(teamScore, acknowledged);

  const stabilizationProgress =
    acceptedAdjustments.length / 2;

  const environmentOpacity =
    0.18 - stabilizationProgress * 0.12;

  return (
    <main className="relative min-h-screen overflow-hidden bg-neutral-950 p-8 text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-10%] top-[-10%] h-80 w-80 rounded-full bg-emerald-400/10 blur-3xl ambient-drift" />

        <div className="absolute right-[-8%] top-[20%] h-72 w-72 rounded-full bg-yellow-400/5 blur-3xl ambient-drift-slow" />

        <div
          className="absolute bottom-[-12%] left-[35%] h-96 w-96 rounded-full bg-red-400 blur-3xl ambient-drift transition-all duration-[3000ms]"
          style={{
            opacity: environmentOpacity,
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">
              Coach Dashboard
            </h1>

            <p className="mt-2 text-neutral-400">
              AI-powered athlete readiness overview.
            </p>
          </div>

          <button className="rounded-xl bg-white px-4 py-2 font-medium text-black transition hover:bg-neutral-200">
            Add Athlete
          </button>
        </div>

        <SystemHero
          teamScore={teamScore}
          system={system}
          acknowledged={acknowledged}
          setAcknowledged={setAcknowledged}
        >
          {acknowledged && teamScore < 80 && (
            <section className="fade-in-soft mt-10 w-full max-w-5xl rounded-[32px] border border-neutral-800 bg-neutral-950/80 p-8">
              <div className="mb-8">
                <p className="text-sm text-neutral-500">
                  AI Intervention Guidance
                </p>

                <h2 className="mt-2 text-3xl font-semibold tracking-tight">
                  System Regulation Recommendations
                </h2>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6 text-left">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-neutral-500">
                        Athlete
                      </p>

                      <h3 className="mt-1 text-2xl font-semibold">
                        Sarah Miller
                      </h3>
                    </div>

                    <div className="h-3 w-3 rounded-full bg-yellow-400 shadow-[0_0_12px_rgba(251,191,36,0.6)]" />
                  </div>

                  <div className="mt-6">
                    <p className="text-sm text-neutral-500">
                      Suggested Adjustment
                    </p>

                    <p className="mt-2 text-lg text-neutral-200">
                      Reduce threshold volume by 20%
                    </p>
                  </div>

                  <div className="mt-6">
                    <p className="text-sm text-neutral-500">
                      Primary Concern
                    </p>

                    <p className="mt-2 text-neutral-300">
                      Accumulating autonomic fatigue markers.
                    </p>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2">
                    <div className="rounded-full border border-neutral-700 px-3 py-1 text-sm text-neutral-300">
                      HRV suppressed
                    </div>

                    <div className="rounded-full border border-neutral-700 px-3 py-1 text-sm text-neutral-300">
                      Elevated RHR
                    </div>

                    <div className="rounded-full border border-neutral-700 px-3 py-1 text-sm text-neutral-300">
                      Sleep debt
                    </div>
                  </div>

                  <div className="mt-8 flex gap-3">
                    <button
                      onClick={() =>
                        acceptAdjustment("Sarah Miller")
                      }
                      className="rounded-xl bg-white px-4 py-2 text-sm font-medium text-black transition hover:bg-neutral-200"
                    >
                      {acceptedAdjustments.includes(
                        "Sarah Miller"
                      )
                        ? "Monitoring Response"
                        : "Accept Adjustment"}
                    </button>

                    <button className="rounded-xl border border-neutral-700 px-4 py-2 text-sm text-neutral-300 transition hover:bg-neutral-800">
                      Modify
                    </button>
                  </div>
                </div>

                <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6 text-left">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-neutral-500">
                        Athlete
                      </p>

                      <h3 className="mt-1 text-2xl font-semibold">
                        Jake Turner
                      </h3>
                    </div>

                    <div className="h-3 w-3 rounded-full bg-red-400 shadow-[0_0_14px_rgba(248,113,113,0.6)]" />
                  </div>

                  <div className="mt-6">
                    <p className="text-sm text-neutral-500">
                      Suggested Adjustment
                    </p>

                    <p className="mt-2 text-lg text-neutral-200">
                      Replace threshold work with aerobic recovery
                    </p>
                  </div>

                  <div className="mt-6">
                    <p className="text-sm text-neutral-500">
                      Primary Concern
                    </p>

                    <p className="mt-2 text-neutral-300">
                      Recovery capacity appears significantly reduced.
                    </p>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2">
                    <div className="rounded-full border border-neutral-700 px-3 py-1 text-sm text-neutral-300">
                      High soreness
                    </div>

                    <div className="rounded-full border border-neutral-700 px-3 py-1 text-sm text-neutral-300">
                      Elevated fatigue
                    </div>

                    <div className="rounded-full border border-neutral-700 px-3 py-1 text-sm text-neutral-300">
                      HRV instability
                    </div>
                  </div>

                  <div className="mt-8 flex gap-3">
                    <button
                      onClick={() =>
                        acceptAdjustment("Jake Turner")
                      }
                      className="rounded-xl bg-white px-4 py-2 text-sm font-medium text-black transition hover:bg-neutral-200"
                    >
                      {acceptedAdjustments.includes(
                        "Jake Turner"
                      )
                        ? "Monitoring Response"
                        : "Accept Adjustment"}
                    </button>

                    <button className="rounded-xl border border-neutral-700 px-4 py-2 text-sm text-neutral-300 transition hover:bg-neutral-800">
                      Modify
                    </button>
                  </div>
                </div>
              </div>
            </section>
          )}
        </SystemHero>

        <section className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {athletes.map((athlete) => {
            const readiness =
              calculateReadiness(athlete);

            return (
              <AthleteCard
                key={athlete.name}
                name={athlete.name}
                status={readiness.status}
                color={readiness.color}
                score={String(readiness.score)}
                message={readiness.message}
                insights={generateInsights(athlete)}
              />
            );
          })}
        </section>
      </div>
    </main>
  );
}