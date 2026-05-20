import type { CoachNote } from "@/types/note";

export const notes: CoachNote[] = [
  {
    id: "note-1",
    athleteId: "sarah-miller",
    title: "Intensity reduced",
    body: "Threshold work adjusted down by 20% due to suppressed recovery markers.",
    time: "Today",
    origin: "ai",
    severity: "moderate",
  },
  {
    id: "note-2",
    athleteId: "sarah-miller",
    title: "Sleep priority",
    body: "Athlete advised to prioritize 8+ hours and avoid additional evening strain.",
    time: "Yesterday",
    origin: "coach",
    severity: "moderate",
  },
  {
    id: "note-3",
    athleteId: "jake-turner",
    title: "Recovery response monitored",
    body: "HRV and soreness response flagged for next morning review.",
    time: "Today",
    origin: "system",
    severity: "high",
  },
];