import type { OrganisationItem } from "@/content/site";
import { cn } from "@/lib/utils";

import { ImagePanel } from "../ui/image-panel";

type OrganisationMeta = {
  displaySrc?: string;
  widthClassName: string;
  imageClassName?: string;
};

const organisationMeta: Record<string, OrganisationMeta> = {
  "Office for Youth": {
    widthClassName: "w-[6.2rem] lg:w-[7rem]",
    imageClassName: "object-contain object-left",
  },
  "MindBridge Health": {
    displaySrc: "/logos/mindbridge-lockup.svg",
    widthClassName: "w-[7.8rem] lg:w-[8.6rem]",
    imageClassName: "object-contain object-left",
  },
  "Hastings Secondary College": {
    widthClassName: "w-[7.6rem] lg:w-[8.4rem]",
    imageClassName: "object-contain object-left",
  },
  "McDonald's": {
    displaySrc: "/logos/mcdonalds-lockup.svg",
    widthClassName: "w-[5.2rem] lg:w-[6rem]",
    imageClassName: "object-contain object-left",
  },
  "Southern Cross University Scholars Program": {
    widthClassName: "w-[8.4rem] lg:w-[9.2rem]",
    imageClassName: "object-contain object-left",
  },
};

export function OrganisationLogoGrid({
  organisations,
  label = "Trusted by & working with",
}: {
  organisations: OrganisationItem[];
  label?: string;
}) {
  return (
    <div className="section-divider mt-10 pt-8">
      <div className="grid gap-5 lg:grid-cols-[12rem_repeat(5,minmax(0,1fr))] lg:items-center">
        <p className="font-mono text-[0.68rem] uppercase tracking-[0.3em] text-slate-500">
          {label}
        </p>
        {organisations.map((organisation, index) => {
          const meta = organisationMeta[organisation.name];
          const content = (
            <ImagePanel
              src={meta?.displaySrc ?? organisation.logoSrc}
              alt={`${organisation.name} logo`}
              className={cn(
                "h-8 rounded-none border-0 bg-transparent lg:h-9",
                meta?.widthClassName ?? "w-[8rem]",
              )}
              imageClassName={meta?.imageClassName ?? "object-contain object-left"}
              sizes="160px"
            />
          );

          const classes = cn(
            "flex min-h-[3rem] items-center lg:pl-5",
            index === 0 ? "lg:border-l lg:border-white/8" : "lg:border-l lg:border-white/8",
          );

          return organisation.href ? (
            <a
              key={organisation.name}
              href={organisation.href}
              target="_blank"
              rel="noopener noreferrer"
              className={classes}
              aria-label={organisation.name}
            >
              {content}
            </a>
          ) : (
            <div key={organisation.name} className={classes} aria-label={organisation.name}>
              {content}
            </div>
          );
        })}
      </div>
    </div>
  );
}
