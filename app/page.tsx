"use client";

import { useState } from "react";

import InterventionPanel from "@/components/InterventionPanel";
import PhysiologyBackground from "@/components/PhysiologyBackground";
import SystemHero from "@/components/SystemHero";
import AthleteGrid from "@/components/AthleteGrid";

import DashboardHeader from "@/components/layout/DashboardHeader";
import DashboardShell from "@/components/layout/DashboardShell";

import { athletes } from "@/data/athletes";

import {
  calculateReadiness,
  calculateTeamReadiness,
  getSystemStatus,
} from "@/lib/readiness";

export default function Home() {
  const [acknowledged, setAcknowledged] = useState(false);

  const [hoveredAthlete, setHoveredAthlete] =
    useState<string | null>(null);

  const [acceptedAdjustments, setAcceptedAdjustments] =
    useState<string[]>([]);

  function acceptAdjustment(name: string) {
    if (acceptedAdjustments.includes(name)) {
      return;
    }

    setAcceptedAdjustments((current) => [
      ...current,
      name,
    ]);
  }

  const teamScore =
    calculateTeamReadiness(athletes);

  const system = getSystemStatus(
    teamScore,
    acknowledged
  );

  const stabilizationProgress =
    acceptedAdjustments.length / 2;

  const environmentOpacity =
    0.18 - stabilizationProgress * 0.12;

  const hoveredAthleteData = athletes.find(
    (athlete) =>
      athlete.name === hoveredAthlete
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
    <DashboardShell>
      <PhysiologyBackground
      variant="atmosphere"
        stressOpacity={environmentOpacity}
        focusTone={focusTone}
      />

      <div className="relative z-10">
        <DashboardHeader />

        <SystemHero
          teamScore={teamScore}
          system={system}
          acknowledged={acknowledged}
          setAcknowledged={setAcknowledged}
          acceptedCount={acceptedAdjustments.length}
          totalInterventions={2}
        >
          {acknowledged &&
            teamScore < 80 && (
              <InterventionPanel
                acceptedAdjustments={
                  acceptedAdjustments
                }
                acceptAdjustment={
                  acceptAdjustment
                }
              />
            )}
        </SystemHero>

        <AthleteGrid
          athletes={athletes}
          hoveredAthlete={hoveredAthlete}
          setHoveredAthlete={
            setHoveredAthlete
          }
        />
      </div>
    </DashboardShell>
  );
}