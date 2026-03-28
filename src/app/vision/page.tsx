import type { Metadata } from "next";

import { Container } from "@/components/site/container";
import { FuturePlanCard } from "@/components/site/future-plan-card";
import { SectionHeader } from "@/components/site/section-header";
import { MotionReveal } from "@/components/ui/motion-reveal";
import { futurePlanItems, type FuturePlanItem } from "@/content/site";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Vision",
  description:
    "Near-term focus, medium-term trajectory, and long-term themes guiding Romone's work.",
  path: "/vision",
});

const sectionOrder: FuturePlanItem["horizon"][] = [
  "Near-term focus",
  "Medium-term trajectory",
  "Long-term themes",
];

export default function VisionPage() {
  return (
    <Container className="space-y-14 py-16 sm:py-20">
      <MotionReveal>
        <SectionHeader
          eyebrow="Vision"
          title="Direction over the next few years"
          description="Ambitions framed with practical horizons, measurable progress, public accountability, and stronger pathways work for regional young people."
        />
      </MotionReveal>
      {sectionOrder.map((horizon, index) => {
        const items = futurePlanItems.filter((item) => item.horizon === horizon);

        return (
          <MotionReveal key={horizon} className="space-y-5" delay={index * 0.04}>
            <h2 className="text-2xl font-semibold text-white">{horizon}</h2>
            <div className="grid gap-5 md:grid-cols-2">
              {items.map((item) => (
                <FuturePlanCard key={item.title} item={item} />
              ))}
            </div>
          </MotionReveal>
        );
      })}
      <MotionReveal className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
        <h3 className="text-lg font-semibold text-white">What I care about building</h3>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-300">
          I care about building systems that are practical, scalable, and useful in the
          real world, especially where technology, health outcomes, education access,
          and institutional design intersect.
        </p>
      </MotionReveal>
    </Container>
  );
}
