"use client";

import { useState } from "react";
import AthleteCard from "@/components/AthleteCard";
import SystemHero from "@/components/SystemHero";
import PhysiologyBackground from "@/components/PhysiologyBackground";
import InterventionPanel from "@/components/InterventionPanel";

const athletes = [
  {
    name: "Eli Boldman",
    hrv: 82,
    baselineHrv: 70,
    restingHr: 40,
    baselineRestingHr: 44,
    sleep: 9.1,
    soreness: 1,
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

function generateTelemetry(athlete: any) {
  const readiness = calculateReadiness(athlete);

  if (readiness.status === "Green") {
    return [
      {
        label: "HRV Trend",
        value: "Stable",
        tone: "text-green-300",
      },
      {
        label: "Recovery Load",
        value: "Low",
        tone: "text-green-300",
      },
      {
        label: "Adaptation",
        value: "Favorable",
        tone: "text-green-300",
      },
    ];
  }

  if (readiness.status === "Yellow") {
    return [
      {
        label: "HRV Trend",
        value: "-8%",
        tone: "text-yellow-300",
      },
      {
        label: "Recovery Load",
        value: "Elevated",
        tone: "text-yellow-300",
      },
      {
        label: "Adaptation",
        value: "Cautious",
        tone: "text-yellow-200",
      },
    ];
  }

  return [
    {
      label: "HRV Trend",
      value: "Suppressed",
      tone: "text-red-300",
    },
    {
      label: "Recovery Load",
      value: "High",
      tone: "text-red-300",
    },
    {
      label: "Adaptation",
      value: "Compromised",
      tone: "text-red-300",
    },
  ];
}

function calculateTeamReadiness() {
  const scores = athletes.map((athlete) => {
    return calculateReadiness(athlete).score;
  });

  const average = scores.reduce((a, b) => a + b, 0) / scores.length;

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
      message: "Recovery and adaptation are trending positively.",
    };
  }

  if (score >= 60) {
    return {
      label: "SYSTEM STRAIN",
      color: "text-yellow-400",
      glow: "glow-yellow",
      message: "Monitor accumulating fatigue carefully.",
    };
  }

  return {
    label: "SYSTEM UNDER STRESS",
    color: "text-red-400",
    glow: "glow-red",
    message: "Multiple athletes are showing suppressed recovery.",
  };
}

export default function Home() {
  const [acknowledged, setAcknowledged] = useState(false);
  const [hoveredAthlete, setHoveredAthlete] = useState<string | null>(null);
  const [acceptedAdjustments, setAcceptedAdjustments] = useState<string[]>([]);

  function acceptAdjustment(name: string) {
    if (acceptedAdjustments.includes(name)) {
      return;
    }

    setAcceptedAdjustments((current) => [...current, name]);
  }

  const teamScore = calculateTeamReadiness();
  const system = getSystemStatus(teamScore, acknowledged);

  const stabilizationProgress = acceptedAdjustments.length / 2;
  const environmentOpacity = 0.18 - stabilizationProgress * 0.12;

  const hoveredReadiness = hoveredAthlete
    ? calculateReadiness(
        athletes.find((athlete) => athlete.name === hoveredAthlete)
      )
    : null;

  const focusTone =
    hoveredReadiness?.status === "Green"
      ? "green"
      : hoveredReadiness?.status === "Yellow"
        ? "yellow"
        : hoveredReadiness?.status === "Red"
          ? "red"
          : null;

  return (
    <main className="relative min-h-screen overflow-hidden bg-neutral-950 p-8 text-white">
      <PhysiologyBackground
        stressOpacity={environmentOpacity}
        focusTone={focusTone}
      />

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
            <InterventionPanel
              acceptedAdjustments={acceptedAdjustments}
              acceptAdjustment={acceptAdjustment}
            />
          )}
        </SystemHero>

        <section className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {athletes.map((athlete) => {
            const readiness = calculateReadiness(athlete);

            return (
              <AthleteCard
                key={athlete.name}
                name={athlete.name}
                status={readiness.status}
                color={readiness.color}
                score={String(readiness.score)}
                message={readiness.message}
                insights={generateInsights(athlete)}
                telemetry={generateTelemetry(athlete)}
                selected={hoveredAthlete === athlete.name}
                dimmed={
                  hoveredAthlete !== null &&
                  hoveredAthlete !== athlete.name
                }
                onMouseEnter={() => setHoveredAthlete(athlete.name)}
                onMouseLeave={() => setHoveredAthlete(null)}
              />
            );
          })}
        </section>
      </div>
    </main>
  );
}