"use client";

import { useState } from "react";
import AthleteCard from "@/components/AthleteCard";
import SystemHero from "@/components/SystemHero";
import PhysiologyBackground from "@/components/PhysiologyBackground";
import InterventionPanel from "@/components/InterventionPanel";
import { athletes } from "@/data/athletes";
import {
  calculateReadiness,
  calculateTeamReadiness,
  generateInsights,
  generateTelemetry,
  getSystemStatus,
} from "@/lib/readiness";

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

  const teamScore = calculateTeamReadiness(athletes);
  const system = getSystemStatus(teamScore, acknowledged);

  const stabilizationProgress = acceptedAdjustments.length / 2;
  const environmentOpacity = 0.18 - stabilizationProgress * 0.12;

  const hoveredAthleteData = athletes.find(
    (athlete) => athlete.name === hoveredAthlete
  );

  const hoveredReadiness = hoveredAthleteData
    ? calculateReadiness(hoveredAthleteData)
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