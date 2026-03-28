type StatChipProps = {
  label: string;
};

export function StatChip({ label }: StatChipProps) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/15 bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-200">
      {label}
    </span>
  );
}
