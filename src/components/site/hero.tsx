import Link from "next/link";

import type { HeroContent } from "@/content/site";

import { ImagePanel } from "../ui/image-panel";
import { MotionReveal } from "../ui/motion-reveal";
import { Container } from "./container";
import { StatChip } from "./stat-chip";

type HeroProps = {
  content: HeroContent;
};

export function Hero({ content }: HeroProps) {
  return (
    <section className="relative border-b border-white/10 py-24 sm:py-28">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <MotionReveal className="space-y-8 lg:col-span-7">
            <div className="space-y-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                Personal Site / 2026
              </p>
              <h1 className="font-[family-name:var(--font-newsreader)] text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
                {content.headline}
              </h1>
              <p className="max-w-2xl text-pretty text-base leading-relaxed text-slate-300 sm:text-lg">
                {content.supportingCopy}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {content.chips.map((chip) => (
                <StatChip key={chip} label={chip} />
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href={content.primaryCta.href}
                className="inline-flex items-center rounded-full border border-cyan-300/40 bg-cyan-300/15 px-5 py-2.5 text-sm font-semibold text-cyan-100 transition hover:border-cyan-200"
              >
                {content.primaryCta.label}
              </Link>
              <Link
                href={content.secondaryCta.href}
                className="inline-flex items-center rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-slate-200 transition hover:bg-white/5"
              >
                {content.secondaryCta.label}
              </Link>
            </div>
          </MotionReveal>
          <MotionReveal className="lg:col-span-5" delay={0.08}>
            <ImagePanel
              src={content.portrait.src}
              alt={content.portrait.alt}
              className="aspect-[4/5] w-full rounded-3xl border-white/15 bg-slate-900"
              imageClassName="scale-[1.01]"
              priority
            />
          </MotionReveal>
        </div>
      </Container>
    </section>
  );
}
