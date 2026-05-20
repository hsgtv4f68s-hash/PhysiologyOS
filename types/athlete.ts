export type AthleteHistoryPoint = {
  day: string;
  readiness: number;
  hrv: number;
  sleep: number;
  strain: number;
};

export type Athlete = {
  id: string;
  name: string;
  hrv: number;
  baselineHrv: number;
  restingHr: number;
  baselineRestingHr: number;
  sleep: number;
  soreness: number;
  history: AthleteHistoryPoint[];
};

export type ReadinessStatus =
  | "Green"
  | "Yellow"
  | "Red";

export type ReadinessResult = {
  score: number;
  status: ReadinessStatus;
  color: string;
  message: string;
};

export type TelemetryItem = {
  label: string;
  value: string;
  tone: string;
};

export type SystemStatus = {
  label: string;
  color: string;
  glow: string;
  message: string;
};