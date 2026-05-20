export type NoteOrigin = "coach" | "ai" | "system";

export type NoteSeverity = "low" | "moderate" | "high";

export type CoachNote = {
  id: string;
  athleteId: string;
  title: string;
  body: string;
  time: string;
  origin: NoteOrigin;
  severity: NoteSeverity;
};