import type { ReactNode } from "react";
import type { SystemStatus, TelemetryItem } from "@/types/athlete";

export type SystemHeroProps = {
  teamScore: number;
  system: SystemStatus;
  acknowledged: boolean;
  setAcknowledged: (value: boolean) => void;
  children?: ReactNode;
  acceptedCount: number;
totalInterventions: number;
};

export type AthleteCardProps = {
  id: string;
  name: string;
  status: string;
  color: string;
  score: string;
  message: string;
  insights: string[];
  telemetry: TelemetryItem[];
  selected?: boolean;
  dimmed?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
};

export type InterventionPanelProps = {
  acceptedAdjustments: string[];
  acceptAdjustment: (name: string) => void;
};