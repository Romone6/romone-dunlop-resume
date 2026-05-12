import type { Metadata } from "next";
import { BriefcaseBusiness, Handshake, Mic2, Users } from "lucide-react";

import { BrowserPanel } from "@/components/site/browser-panel";
import { Container } from "@/components/site/container";
import { OrganisationLogoGrid } from "@/components/site/organisation-logo-grid";
import { SocialLinks } from "@/components/site/social-links";
import { MotionReveal } from "@/components/ui/motion-reveal";
import { organisationItems, siteConfig, socialLinks } from "@/content/site";
import { buildMetadata } from "@/lib/metadata";

const collaborationTracks = [
  {
    title: "Projects",
    detail: "Co-build systems and ventures that solve real problems.",
    icon: BriefcaseBusiness,
  },
  {
    title: "Speaking",
    detail: "Panels, events, and youth forums on technology and impact.",
    icon: Mic2,
  },
  {
    title: "Mentoring",
    detail: "Support and mentor young people in tech and leadership.",
    icon: Users,
  },
  {
    title: "Partnerships",
    detail: "Work with organisations, schools, and communities to drive change.",
    icon: Handshake,
  },
];

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description:
    "Social links and collaboration pathways for project, media, and partnership contact.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <Container className="pb-16 pt-4 sm:pb-20 sm:pt-6">
      <MotionReveal>
        <BrowserPanel>
          <div className="grid gap-10 xl:grid-cols-[0.85fr_0.8fr]">
            <div>
              <p className="eyebrow">Contact</p>
              <h1 className="editorial-title mt-4 max-w-[8.7ch] text-5xl sm:text-6xl lg:text-[4.65rem]">
                Let&apos;s build impact <span className="text-cyan-200 italic">together.</span>
              </h1>
              <p className="editorial-copy mt-7 max-w-[24rem]">
                I&apos;m open to meaningful collaborations, speaking opportunities,
                partnerships, and projects that create real change.
              </p>

              <div className="mt-12">
                <p className="eyebrow">Best way to reach me</p>
                <a
                  href="mailto:romonedunlop2@gmail.com"
                  className="mt-5 inline-block font-[family-name:var(--font-newsreader)] text-[2.55rem] leading-none tracking-[-0.04em] text-cyan-200 sm:text-[2.9rem]"
                >
                  romonedunlop2@gmail.com
                </a>
                <p className="mt-4 text-sm text-slate-500">
                  I personally reply to every message.
                </p>
                <div className="mt-8 flex flex-wrap gap-6 text-sm text-slate-400">
                  <span>{siteConfig.person.location}</span>
                  <span className="text-slate-600">/</span>
                  <span>Open to opportunities</span>
                </div>
              </div>
            </div>

            <aside className="rounded-[1.55rem] border border-white/10 bg-white/[0.03] p-7">
              <p className="eyebrow">How I can collaborate</p>
              <div className="mt-6 space-y-5">
                {collaborationTracks.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div key={item.title} className="flex items-start gap-4">
                      <span className="inline-flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-cyan-100">
                        <Icon className="size-4" />
                      </span>
                      <div>
                        <p className="text-base text-white">{item.title}</p>
                        <p className="mt-2 text-sm leading-7 text-slate-400">{item.detail}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </aside>
          </div>

          <div className="section-divider mt-12 grid gap-8 pt-8 xl:grid-cols-[1fr_0.66fr] xl:items-end">
            <div>
              <p className="eyebrow mb-5">Connect</p>
              <SocialLinks links={socialLinks} />
            </div>
            <div className="rounded-[1.4rem] border border-white/10 bg-white/[0.03] px-6 py-5">
              <p className="quote-mark text-[2rem] leading-10 text-slate-200">
                &ldquo;The best systems don&apos;t just work. They empower people and create opportunity.&rdquo;
              </p>
              <p className="mt-4 text-right font-[family-name:var(--font-newsreader)] text-4xl italic text-cyan-200">
                R.
              </p>
            </div>
          </div>

          <OrganisationLogoGrid organisations={organisationItems} label="Proudly working with" />
        </BrowserPanel>
      </MotionReveal>
    </Container>
  );
}
