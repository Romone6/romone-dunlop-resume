import { cn } from "@/lib/utils";

type TagBadgeProps = {
  label: string;
  className?: string;
};

export function TagBadge({ label, className }: TagBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium tracking-wide text-slate-200",
        className,
      )}
    >
      {label}
    </span>
  );
}
