import type { FuturePlanItem } from "@/content/site";

type FuturePlanCardProps = {
  item: FuturePlanItem;
};

export function FuturePlanCard({ item }: FuturePlanCardProps) {
  return (
    <article className="h-full rounded-2xl border border-white/10 bg-white/[0.02] p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
        {item.horizon}
      </p>
      <h3 className="mt-2 text-lg font-semibold text-white">{item.title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-slate-300">{item.summary}</p>
    </article>
  );
}
