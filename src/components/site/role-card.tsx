import type { RoleItem } from "@/content/site";

import { ImagePanel } from "../ui/image-panel";

type RoleCardProps = {
  role: RoleItem;
};

export function RoleCard({ role }: RoleCardProps) {
  return (
    <article className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 shadow-lg shadow-black/10">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
            {role.type}
          </p>
          <h3 className="mt-2 text-xl font-semibold text-white">{role.title}</h3>
          <p className="text-sm text-slate-300">{role.organisation}</p>
        </div>
        {role.logoSrc ? (
          <ImagePanel
            src={role.logoSrc}
            alt={`${role.organisation} logo`}
            className="h-12 w-20 shrink-0 rounded-xl border-white/10 bg-slate-900/80"
            imageClassName="p-2 object-contain"
            sizes="80px"
          />
        ) : null}
      </div>
      <p className="text-sm leading-relaxed text-slate-300">{role.summary}</p>
      <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
        <span>{role.timeframe}</span>
        <span className="rounded-full border border-white/10 bg-white/[0.03] px-2 py-1">
          {role.status}
        </span>
      </div>
    </article>
  );
}
