export type StatusTone =
  | "green"
  | "yellow"
  | "red";

export function scoreToTone(
  score: number
): StatusTone {
  if (score >= 75) return "green";
  if (score >= 55) return "yellow";
  return "red";
}

export function toneToTextColor(
  tone: StatusTone
) {
  if (tone === "green")
    return "text-emerald-300";

  if (tone === "yellow")
    return "text-orange-200";

  return "text-rose-300";
}

export function toneToBgColor(
  tone: StatusTone
) {
  if (tone === "green")
    return "bg-emerald-400/60";

  if (tone === "yellow")
    return "bg-orange-300/65";

  return "bg-rose-400/55";
}

export function toneToBorderGlow(
  tone: StatusTone
) {
  if (tone === "green") {
    return "border-emerald-400/10 shadow-[0_0_34px_rgba(74,222,128,0.10)]";
  }

  if (tone === "yellow") {
    return "border-orange-300/20 shadow-[0_0_52px_rgba(253,186,116,0.20)]";
  }

  return "border-rose-400/10 shadow-[0_0_34px_rgba(251,113,133,0.10)]";
}