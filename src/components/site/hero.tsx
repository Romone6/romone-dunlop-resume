import { Bot, HeartPulse, MapPinned, ShieldCheck, type LucideIcon } from "lucide-react";
import Link from "next/link";

import type { HeroContent, OrganisationItem, RoleItem } from "@/content/site";
import { cn } from "@/lib/utils";

import { ImagePanel } from "../ui/image-panel";
import { MotionReveal } from "../ui/motion-reveal";

type FocusItem = {
  title: string;
  description: string;
  detail: string;
};

type HeroProps = {
  content: HeroContent;
  currentRoles: RoleItem[];
  organisations: OrganisationItem[];
  focusItems: FocusItem[];
};

type HeroOrganisationMeta = {
  displaySrc?: string;
  widthClassName: string;
  imageClassName?: string;
};

const organisationMeta: Record<string, HeroOrganisationMeta> = {
  "Office for Youth": {
    widthClassName: "w-[10.75rem] lg:w-[11.75rem]",
    imageClassName: "object-contain object-left",
  },
  "MindBridge Health": {
    displaySrc: "/logos/mindbridge-lockup.svg",
    widthClassName: "w-[13rem] lg:w-[14rem]",
    imageClassName: "object-contain object-left",
  },
  "Hastings Secondary College": {
    widthClassName: "w-[11.5rem] lg:w-[13rem]",
    imageClassName: "object-contain object-left",
  },
  "McDonald's": {
    displaySrc: "/logos/mcdonalds-lockup.svg",
    widthClassName: "w-[10.5rem] lg:w-[11.5rem]",
    imageClassName: "object-contain object-left",
  },
  "Southern Cross University Scholars Program": {
    widthClassName: "w-[13rem] lg:w-[14.25rem]",
    imageClassName: "object-contain object-left",
  },
};

const focusIcons: Record<string, LucideIcon> = {
  "Youth Policy & Advisory": ShieldCheck,
  "Health Technology": HeartPulse,
  "Systems & AI": Bot,
  "Regional Pathways": MapPinned,
};

export function Hero({
  content,
  currentRoles,
  organisations,
  focusItems,
}: HeroProps) {
  return (
    <section className="px-4 sm:px-6 lg:px-8">
      <div className="surface-frame mx-auto max-w-[1520px] rounded-[2rem] sm:rounded-[2.2rem]">
        <div className="grid gap-8 px-6 py-6 sm:px-8 sm:py-8 lg:grid-cols-[minmax(0,1fr)_15.5rem] lg:gap-10 lg:px-10 lg:py-10">
          <div className="relative overflow-hidden rounded-[1.8rem] border border-white/10 bg-slate-950/60 px-6 py-8 sm:px-8 sm:py-10 lg:min-h-[29rem] lg:px-10 lg:py-12">
            <div className="absolute inset-0">
              <ImagePanel
                src="/images/projects/regional-pathways.jpg"
                alt="Coastal landscape backdrop"
                className="h-full w-full rounded-none border-0 opacity-38"
                imageClassName="object-cover object-bottom"
                priority
              />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,11,20,0.94)_0%,rgba(5,11,20,0.82)_46%,rgba(5,11,20,0.62)_100%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_18%,rgba(95,211,255,0.14),transparent_28%)]" />
            </div>
            <div className="relative flex h-full flex-col justify-between gap-10">
              <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.22em] text-slate-300/88">
                <span className="inline-flex items-center gap-2">
                  <span className="inline-block size-2 rounded-full bg-cyan-300" />
                  {content.chips[0]}
                </span>
              </div>
              <div className="max-w-[40rem] space-y-6">
                <MotionReveal>
                  <h1 className="max-w-[11ch] font-[family-name:var(--font-newsreader)] text-5xl font-medium leading-[0.92] tracking-[-0.05em] text-white sm:text-6xl lg:text-[5.3rem]">
                    Student. Operator. Builder of <span className="text-cyan-200 italic">what matters.</span>
                  </h1>
                </MotionReveal>
                <MotionReveal delay={0.04}>
                  <p className="max-w-[31rem] text-base leading-8 text-slate-200/88 sm:text-lg">
                    {content.supportingCopy}
                  </p>
                </MotionReveal>
                <MotionReveal delay={0.08}>
                  <div className="flex flex-wrap gap-3">
                    <Link
                      href={content.primaryCta.href}
                      className="inline-flex min-w-[10.75rem] items-center justify-center rounded-xl border border-cyan-300/50 bg-cyan-300/90 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
                    >
                      Explore Projects
                    </Link>
                    <Link
                      href={content.secondaryCta.href}
                      className="inline-flex min-w-[10.75rem] items-center justify-center rounded-xl border border-white/18 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/[0.08]"
                    >
                      Get In Touch
                    </Link>
                  </div>
                </MotionReveal>
              </div>
            </div>
          </div>
          <aside className="rounded-[1.8rem] border border-white/10 bg-white/[0.03] p-5 sm:p-6">
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.3em] text-slate-500">
              At a glance
            </p>
            <ul className="mt-6 flex flex-col gap-4">
              {currentRoles.slice(0, 5).map((role) => (
                <li key={`${role.organisation}-${role.title}`} className="border-b border-white/8 pb-4 last:border-b-0 last:pb-0">
                  <p className="text-sm font-medium text-white">{role.title}</p>
                  <p className="mt-1 text-sm text-slate-300">{role.organisation}</p>
                  <p className="mt-1 text-xs tracking-[0.08em] text-slate-500">{role.timeframe}</p>
                </li>
              ))}
            </ul>
          </aside>
        </div>
        <div className="section-divider grid gap-4 px-6 py-5 sm:px-8 lg:grid-cols-[13rem_repeat(5,minmax(0,1fr))] lg:px-10">
          <div className="pr-4 lg:pr-6">
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.3em] text-slate-500">
              Trusted by &amp; working with
            </p>
          </div>
          {organisations.map((organisation, index) => {
            const meta = organisationMeta[organisation.name];

            return (
              <div
                key={organisation.name}
                className={cn(
                  "flex min-h-[4.25rem] items-center border-white/8",
                  index === 0 ? "lg:border-l lg:pl-6" : "lg:border-l lg:pl-8",
                )}
              >
                <ImagePanel
                  src={meta?.displaySrc ?? organisation.logoSrc}
                  alt={`${organisation.name} logo`}
                  className={cn(
                    "h-11 rounded-none border-0 bg-transparent lg:h-12",
                    meta?.widthClassName ?? "w-[12rem]",
                  )}
                  imageClassName={meta?.imageClassName ?? "object-contain object-left"}
                  sizes="(max-width: 1024px) 160px, 224px"
                />
              </div>
            );
          })}
        </div>
        <div className="section-divider px-6 py-8 sm:px-8 lg:px-10 lg:py-10">
          <p className="eyebrow mb-6">Current focus</p>
          <div className="grid gap-5 lg:grid-cols-4">
            {focusItems.map((item) => {
              const Icon = focusIcons[item.title];

              return (
                <article key={item.title} className="border-l border-white/10 pl-5 first:border-l-0 first:pl-0">
                  <div className="mb-4 inline-flex size-10 items-center justify-center rounded-2xl border border-white/12 bg-white/[0.03] text-cyan-200">
                    {Icon ? <Icon size={18} aria-hidden /> : null}
                  </div>
                  <h2 className="text-xl font-medium text-white">{item.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-slate-300">{item.description}</p>
                  <p className="mt-4 text-sm leading-7 text-slate-500">{item.detail}</p>
                </article>
              );
            })}
          </div>
        </div>
        <div className="section-divider flex items-center justify-between gap-8 px-6 py-6 sm:px-8 lg:px-10">
          <p className="quote-mark text-xl leading-8 text-slate-200 sm:text-2xl">
            “Systems create leverage. People create impact. Purpose creates direction.”
          </p>
          <span className="font-[family-name:var(--font-newsreader)] text-4xl italic text-cyan-200">R.</span>
        </div>
      </div>
    </section>
  );
}
