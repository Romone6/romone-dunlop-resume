import type { Metadata } from "next";

import { Container } from "@/components/site/container";
import { EventCard } from "@/components/site/event-card";
import { MilestoneTimeline } from "@/components/site/milestone-timeline";
import { SectionHeader } from "@/components/site/section-header";
import { ImagePanel } from "@/components/ui/image-panel";
import { MotionReveal } from "@/components/ui/motion-reveal";
import {
  aboutNarrative,
  eventItems,
  guidingPrinciples,
  milestoneItems,
  siteConfig,
} from "@/content/site";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "About",
  description:
    "Biography, values, milestones, and current context for Romone's work and trajectory.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <Container className="space-y-16 py-16 sm:py-20">
      <MotionReveal>
        <SectionHeader
          eyebrow="About"
          title="A focused chapter of youth-policy work, building, learning, and operating"
          description={`I am ${siteConfig.person.shortName}, currently in ${siteConfig.person.stage}, balancing academics, NSW Youth Advisory Council work through the Office for Youth, management responsibility, and founder projects.`}
        />
      </MotionReveal>
      <section className="grid gap-8 lg:grid-cols-12 lg:items-start">
        <MotionReveal className="space-y-5 lg:col-span-7">
          {aboutNarrative.map((paragraph) => (
            <p key={paragraph} className="text-base leading-relaxed text-slate-300 sm:text-lg">
              {paragraph}
            </p>
          ))}
        </MotionReveal>
        <MotionReveal className="lg:col-span-5" delay={0.08}>
          <ImagePanel
            src="/images/portrait/current-work-board.svg"
            alt="Selected organisations and current work"
            className="aspect-[4/5] w-full rounded-3xl border-white/15"
            imageClassName="scale-[1.01]"
          />
        </MotionReveal>
      </section>
      <section className="grid gap-8 lg:grid-cols-12">
        <MotionReveal className="lg:col-span-6">
          <SectionHeader
            eyebrow="Timeline"
            title="Milestones"
            description="Key points that shaped current direction."
            className="mb-6"
          />
          <MilestoneTimeline milestones={milestoneItems} />
        </MotionReveal>
        <MotionReveal className="lg:col-span-6" delay={0.05}>
          <SectionHeader
            eyebrow="Guiding Principles"
            title="How I approach work"
            description="Principles used to make decisions and maintain long-term focus."
            className="mb-6"
          />
          <ul className="space-y-3">
            {guidingPrinciples.map((principle) => (
              <li
                key={principle}
                className="rounded-xl border border-white/10 bg-white/[0.02] p-4 text-sm leading-relaxed text-slate-300"
              >
                {principle}
              </li>
            ))}
          </ul>
        </MotionReveal>
      </section>
      <section className="space-y-6">
        <MotionReveal>
          <SectionHeader
            eyebrow="Events"
            title="Current calendar"
            description="Selected youth leadership and policy events I am attending."
          />
        </MotionReveal>
        <div className="grid gap-5 md:grid-cols-3">
          {eventItems.map((event, index) => (
            <MotionReveal key={event.title} delay={index * 0.04}>
              <EventCard event={event} />
            </MotionReveal>
          ))}
        </div>
      </section>
    </Container>
  );
}
