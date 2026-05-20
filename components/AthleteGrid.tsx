import type { Athlete } from "@/types/athlete";
import AthleteCard from "@/components/AthleteCard";
import {
  calculateReadiness,
  generateInsights,
  generateTelemetry,
} from "@/lib/readiness";

type AthleteGridProps = {
  athletes: Athlete[];
  hoveredAthlete: string | null;
  setHoveredAthlete: (name: string | null) => void;
};

export default function AthleteGrid({
  athletes,
  hoveredAthlete,
  setHoveredAthlete,
}: AthleteGridProps) {
  return (
    <section className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {athletes.map((athlete) => {
        const readiness = calculateReadiness(athlete);

        return (
          <AthleteCard
            id={athlete.id}
            key={athlete.id}
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
  );
}