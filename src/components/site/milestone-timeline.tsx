import type { MilestoneItem } from "@/content/site";

type MilestoneTimelineProps = {
  milestones: MilestoneItem[];
};

export function MilestoneTimeline({ milestones }: MilestoneTimelineProps) {
  return (
    <ol className="relative ml-3 border-l border-white/15 pl-6">
      {milestones.map((milestone) => (
        <li key={`${milestone.year}-${milestone.title}`} className="mb-8 last:mb-0">
          <span className="absolute -left-[5px] mt-1.5 h-2.5 w-2.5 rounded-full bg-cyan-300" />
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
            {milestone.year}
          </p>
          <h3 className="mt-2 text-lg font-semibold text-white">{milestone.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-300">
            {milestone.description}
          </p>
        </li>
      ))}
    </ol>
  );
}
