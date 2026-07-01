type SummaryCardProps = {
  label: string;
  value: string;
  valueClassName?: string;
};

export default function SummaryCard({
  label,
  value,
  valueClassName = "",
}: SummaryCardProps) {
  return (
    <div className="w-full min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] p-4 shadow-xl shadow-black/20 sm:rounded-3xl sm:p-6">
      <p className="min-w-0 truncate whitespace-nowrap text-sm text-slate-400">
        {label}
      </p>
      <p
        className={`mt-2 min-w-0 whitespace-normal break-words text-[clamp(1.7rem,3vw,2.25rem)] font-bold leading-tight [overflow-wrap:anywhere] ${valueClassName}`}
      >
        {value}
      </p>
    </div>
  );
}
