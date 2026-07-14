type SummaryCardProps = {
  label: string;
  value: string;
  valueClassName?: string;
  primary?: boolean;
  testId?: string;
};

export default function SummaryCard({
  label,
  value,
  valueClassName = "",
  primary = false,
  testId,
}: SummaryCardProps) {
  return (
    <div
      data-testid={testId}
      className={`result-metric-card w-full min-w-0 overflow-hidden border p-4 sm:p-5 ${primary ? "result-metric-card--primary" : ""}`}
    >
      <p className="min-w-0 break-words text-xs font-semibold uppercase leading-5 tracking-[0.08em] text-slate-400">
        {label}
      </p>
      <p
        className={`mt-3 min-w-0 whitespace-normal break-words text-[clamp(1.55rem,3vw,2.25rem)] font-bold leading-tight tracking-tight [overflow-wrap:anywhere] ${valueClassName}`}
      >
        {value}
      </p>
    </div>
  );
}
