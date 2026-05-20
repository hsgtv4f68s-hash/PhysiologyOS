import type {
  Athlete,
  ReadinessResult,
  SystemStatus,
  TelemetryItem,
} from "@/types/athlete";

export function calculateReadiness(athlete: Athlete): ReadinessResult {
  let score = 100;

  score -= (athlete.baselineHrv - athlete.hrv) * 2;
  score -= (athlete.restingHr - athlete.baselineRestingHr) * 3;

  if (athlete.sleep < 7) {
    score -= (7 - athlete.sleep) * 8;
  }

  score -= athlete.soreness * 3;

  score = Math.max(0, Math.min(100, score));

  let status: ReadinessResult["status"] = "Green";
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

export function generateInsights(athlete: Athlete): string[] {
  const insights: string[] = [];

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

export function generateTelemetry(athlete: Athlete): TelemetryItem[] {
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

export function calculateTeamReadiness(athletes: Athlete[]): number {
  const scores = athletes.map((athlete) => {
    return calculateReadiness(athlete).score;
  });

  const average = scores.reduce((a, b) => a + b, 0) / scores.length;

  return Math.round(average);
}

export function getSystemStatus(
  score: number,
  acknowledged: boolean
): SystemStatus {
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