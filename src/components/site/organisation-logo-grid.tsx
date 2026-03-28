import type { OrganisationItem } from "@/content/site";

import { ImagePanel } from "../ui/image-panel";

type OrganisationLogoGridProps = {
  organisations: OrganisationItem[];
};

export function OrganisationLogoGrid({ organisations }: OrganisationLogoGridProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {organisations.map((organisation) => {
        const content = (
          <div className="flex h-full flex-col items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-5 text-center transition hover:border-white/20">
            <ImagePanel
              src={organisation.logoSrc}
              alt={`${organisation.name} logo`}
              className="h-14 w-full max-w-[9rem] rounded-xl border-white/10 bg-slate-900"
              imageClassName="object-contain p-2.5"
              sizes="144px"
            />
            <div>
              <p className="text-sm font-medium text-white">{organisation.name}</p>
              <p className="text-xs text-slate-400">{organisation.role}</p>
            </div>
          </div>
        );

        if (organisation.href) {
          return (
            <a
              key={organisation.name}
              href={organisation.href}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              {content}
            </a>
          );
        }

        return <div key={organisation.name}>{content}</div>;
      })}
    </div>
  );
}
