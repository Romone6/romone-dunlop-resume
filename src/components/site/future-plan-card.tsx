import type { FuturePlanItem } from "@/content/site";

export function FuturePlanCard({ item }: { item: FuturePlanItem }) {
  return (
    <article className="surface-frame rounded-[1.5rem] p-5">
      <p className="text-[0.72rem] uppercase tracking-[0.18em] text-slate-500">{item.horizon}</p>
      <h3 className="mt-4 text-2xl font-medium tracking-[-0.03em] text-white">{item.title}</h3>
      <p className="mt-4 text-sm leading-7 text-slate-400">{item.summary}</p>
    </article>
  );
}

