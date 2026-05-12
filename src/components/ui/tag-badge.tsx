import { cn } from "@/lib/utils";

type TagBadgeProps = {
  label: string;
  className?: string;
};

export function TagBadge({ label, className }: TagBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center text-[0.72rem] uppercase tracking-[0.16em] text-slate-400",
        className,
      )}
    >
      {label}
    </span>
  );
}
