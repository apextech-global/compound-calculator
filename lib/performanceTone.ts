export type PerformanceTone = "positive" | "neutral" | "negative";

export function getPerformanceTone(value: number): PerformanceTone {
  if (value > 0) {
    return "positive";
  }

  if (value < 0) {
    return "negative";
  }

  return "neutral";
}

export function getPerformanceToneClassName(tone: PerformanceTone) {
  switch (tone) {
    case "positive":
      return "text-emerald-400";
    case "negative":
      return "text-rose-300";
    default:
      return "text-slate-100";
  }
}
