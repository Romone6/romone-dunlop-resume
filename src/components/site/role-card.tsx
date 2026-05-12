import type { RoleItem } from "@/content/site";

import { ImagePanel } from "../ui/image-panel";

export function RoleCard({ role }: { role: RoleItem }) {
  return (
    <article className="surface-frame rounded-[1.6rem] p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[0.72rem] uppercase tracking-[0.18em] text-slate-500">{role.type}</p>
          <h3 className="mt-3 text-2xl font-medium tracking-[-0.03em] text-white">{role.title}</h3>
          <p className="mt-2 text-sm text-slate-300">{role.organisation}</p>
        </div>
        {role.logoSrc ? (
          <ImagePanel
            src={role.logoSrc}
            alt={`${role.organisation} logo`}
            className="size-14 shrink-0 rounded-2xl border-white/10 bg-white/[0.03]"
            imageClassName="object-contain p-2"
            sizes="56px"
          />
        ) : null}
      </div>
      <p className="mt-5 text-sm leading-7 text-slate-400">{role.summary}</p>
      <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4 text-xs uppercase tracking-[0.14em] text-slate-500">
        <span>{role.timeframe}</span>
        <span>{role.status}</span>
      </div>
    </article>
  );
}

