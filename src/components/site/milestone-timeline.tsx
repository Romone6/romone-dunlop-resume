import type { MilestoneItem } from "@/content/site";

export function MilestoneTimeline({ milestones }: { milestones: MilestoneItem[] }) {
  return (
    <div className="space-y-7">
      <div className="hidden h-px bg-white/10 lg:block" />
      <ol className="grid gap-6 lg:grid-cols-4">
        {milestones.map((milestone) => (
          <li key={`${milestone.year}-${milestone.title}`} className="relative">
            <div className="absolute left-0 top-[-1.9rem] hidden lg:block">
              <span className="block size-2 rounded-full bg-cyan-200 shadow-[0_0_0_7px_rgba(95,211,255,0.08)]" />
            </div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              {milestone.year}
            </p>
            <h3 className="mt-4 max-w-[16ch] text-[1.55rem] font-medium leading-[1.05] tracking-[-0.035em] text-white">
              {milestone.title}
            </h3>
            <p className="mt-4 max-w-[30ch] text-[0.98rem] leading-8 text-slate-400">
              {milestone.description}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}
