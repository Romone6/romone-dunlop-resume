import type { Metadata } from "next";
import { BriefcaseBusiness, GraduationCap, Landmark, ShieldCheck } from "lucide-react";

import { BrowserPanel } from "@/components/site/browser-panel";
import { Container } from "@/components/site/container";
import { EventCard } from "@/components/site/event-card";
import { MilestoneTimeline } from "@/components/site/milestone-timeline";
import { OrganisationLogoGrid } from "@/components/site/organisation-logo-grid";
import { MotionReveal } from "@/components/ui/motion-reveal";
import {
  aboutNarrative,
  eventItems,
  milestoneItems,
  organisationItems,
} from "@/content/site";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "About",
  description:
    "Biography, values, milestones, and current context for Romone's work and trajectory.",
  path: "/about",
});

const detailItems = [
  {
    icon: GraduationCap,
    title: "Year 12 Student",
    detail: "Hastings Secondary College",
  },
  {
    icon: Landmark,
    title: "NSW Youth Advisory Council",
    detail: "One of 12 members",
  },
  {
    icon: ShieldCheck,
    title: "Southern Cross University",
    detail: "Scholars Program student",
  },
  {
    icon: BriefcaseBusiness,
    title: "McDonald's Manager",
    detail: "Since 2022",
  },
];

const extendedMilestones = [
  ...milestoneItems,
  {
    year: "Beyond",
    title: "Scale impact",
    description:
      "Expand work in policy, systems, and public-facing projects that create more opportunity for young people.",
  },
];

export default function AboutPage() {
  return (
    <Container className="pb-16 pt-4 sm:pb-20 sm:pt-6">
      <MotionReveal>
        <BrowserPanel>
          <div className="grid gap-8 xl:grid-cols-[1fr_0.72fr]">
            <div>
              <p className="eyebrow">About me</p>
              <h1 className="editorial-title mt-4 max-w-[9ch] text-5xl sm:text-6xl lg:text-[4.7rem]">
                Student. Operator. Builder of <span className="text-cyan-200 italic">what matters.</span>
              </h1>
              <div className="editorial-copy mt-8 max-w-[36rem] space-y-5">
                {aboutNarrative.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                {detailItems.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div key={item.title} className="flex items-start gap-3">
                      <span className="inline-flex size-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-cyan-100">
                        <Icon className="size-4" />
                      </span>
                      <div>
                        <p className="text-[0.98rem] text-white">{item.title}</p>
                        <p className="mt-1 text-[0.74rem] uppercase tracking-[0.16em] text-slate-500">{item.detail}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <aside className="rounded-[1.55rem] border border-white/10 bg-white/[0.03] p-7">
              <p className="eyebrow">NSW Youth Advisory Council</p>
              <h2 className="editorial-title mt-4 max-w-[13ch] text-[2.6rem] leading-[0.98]">
                One of 12 voices shaping youth opportunity across NSW.
              </h2>
              <p className="mt-5 max-w-[32ch] text-[0.98rem] leading-8 text-slate-300">
                Selected by the NSW Government to represent young people and advise on
                policies that drive meaningful change.
              </p>
              <ul className="mt-7 space-y-3 text-[0.92rem] leading-7 text-slate-400">
                <li>Advise government on youth policy</li>
                <li>Represent diverse communities across NSW</li>
                <li>Contribute to strategy and reform</li>
                <li>Create real impact for future generations</li>
              </ul>
              <a
                href="https://officeforyouth.nsw.gov.au/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 text-[0.72rem] uppercase tracking-[0.2em] text-cyan-200"
              >
                Learn more about my role
              </a>
            </aside>
          </div>

          <div className="section-divider mt-12 pt-8">
            <p className="eyebrow mb-6">Recognition & Invitations</p>
            <div className="grid gap-4 lg:grid-cols-3">
              {eventItems.map((event) => (
                <EventCard key={event.title} event={event} />
              ))}
            </div>
          </div>

          <div className="section-divider mt-12 pt-8">
            <p className="eyebrow mb-6">Milestones</p>
            <MilestoneTimeline milestones={extendedMilestones} />
          </div>

          <OrganisationLogoGrid organisations={organisationItems} />
        </BrowserPanel>
      </MotionReveal>
    </Container>
  );
}
