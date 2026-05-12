import type { Metadata } from "next";
import { Compass, Lightbulb, Orbit, Sparkles } from "lucide-react";

import { BrowserPanel } from "@/components/site/browser-panel";
import { Container } from "@/components/site/container";
import { ImagePanel } from "@/components/ui/image-panel";
import { MotionReveal } from "@/components/ui/motion-reveal";
import { guidingPrinciples } from "@/content/site";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Vision",
  description:
    "Near-term focus, medium-term trajectory, and long-term themes guiding Romone's work.",
  path: "/vision",
});

const horizonCards = [
  {
    label: "Horizon 01",
    title: "Build",
    summary:
      "Create and ship foundational systems that solve real problems in health, agents, and youth opportunity.",
    imageSrc: "/images/projects/vision-build.png",
  },
  {
    label: "Horizon 02",
    title: "Scale",
    summary:
      "Expand impact through partnerships, platforms, and durable operating systems.",
    imageSrc: "/images/projects/vision-scale.png",
  },
  {
    label: "Horizon 03",
    title: "Influence",
    summary:
      "Shape policy, support young leaders, and drive meaningful change across Australia.",
    imageSrc: "/images/projects/vision-influence.png",
  },
  {
    label: "Horizon 04",
    title: "Legacy",
    summary:
      "Build enduring systems and expand access to opportunity over time.",
    imageSrc: "/images/projects/vision-legacy.png",
  },
];

const principles = [
  {
    icon: Compass,
    title: "Purpose first",
    detail: guidingPrinciples[0],
  },
  {
    icon: Orbit,
    title: "Systems thinking",
    detail: guidingPrinciples[1],
  },
  {
    icon: Lightbulb,
    title: "Evidence driven",
    detail: guidingPrinciples[2],
  },
  {
    icon: Sparkles,
    title: "Empower others",
    detail: guidingPrinciples[4],
  },
];

export default function VisionPage() {
  return (
    <Container className="pb-16 pt-4 sm:pb-20 sm:pt-6">
      <MotionReveal>
        <BrowserPanel>
          <div className="grid gap-8 xl:grid-cols-[0.72fr_1.28fr] xl:items-start">
            <div>
              <h1 className="editorial-title max-w-[8.8ch] text-5xl sm:text-6xl lg:text-[4.65rem]">
                The <span className="text-cyan-200 italic">future</span> I&apos;m building toward.
              </h1>
              <p className="editorial-copy mt-7 max-w-[24rem]">
                A long-term vision to build systems that leverage technology and policy
                to create opportunity for more people.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {horizonCards.map((card) => (
                <article
                  key={card.title}
                  className="overflow-hidden rounded-[1.45rem] border border-white/10 bg-white/[0.03]"
                >
                  <div className="relative min-h-[19rem]">
                    <ImagePanel
                      src={card.imageSrc}
                      alt={`${card.title} vision visual`}
                      className="absolute inset-0 h-full w-full rounded-none border-0 bg-transparent"
                      imageClassName="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#07111a] via-[#07111a]/56 to-transparent" />
                    <div className="relative z-10 flex min-h-[19rem] flex-col justify-between p-5">
                      <div>
                        <p className="text-[0.68rem] uppercase tracking-[0.18em] text-cyan-200">
                          {card.label}
                        </p>
                        <h2 className="mt-4 font-[family-name:var(--font-newsreader)] text-[2.6rem] tracking-[-0.04em] text-white">
                          {card.title}
                        </h2>
                      </div>
                      <p className="max-w-[18ch] text-[0.95rem] leading-8 text-slate-200">
                        {card.summary}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="section-divider mt-10 grid gap-8 pt-8 xl:grid-cols-[1fr_0.62fr] xl:items-end">
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {principles.map((item) => {
                const Icon = item.icon;

                return (
                  <div key={item.title} className="flex items-start gap-3">
                    <span className="inline-flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-cyan-100">
                      <Icon className="size-4" />
                    </span>
                    <div>
                      <p className="text-[0.98rem] text-white">{item.title}</p>
                      <p className="mt-2 text-[0.78rem] uppercase tracking-[0.12em] text-slate-500">{item.detail}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="xl:justify-self-end">
              <p className="quote-mark max-w-[22rem] text-2xl leading-9 text-slate-200">
                The goal isn&apos;t just to build great projects. It&apos;s to build a
                better future.
              </p>
              <p className="mt-4 text-right font-[family-name:var(--font-newsreader)] text-4xl italic text-cyan-200">
                R.
              </p>
            </div>
          </div>
        </BrowserPanel>
      </MotionReveal>
    </Container>
  );
}
