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
    <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 shadow-xl shadow-black/20">
      <p className="text-sm text-slate-400">{label}</p>
      <p className={`mt-2 text-3xl font-bold ${valueClassName}`}>{value}</p>
    </div>
  );
}
