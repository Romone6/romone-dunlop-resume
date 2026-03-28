import type { Metadata } from "next";

import { Container } from "@/components/site/container";
import { SectionHeader } from "@/components/site/section-header";
import { SocialLinks } from "@/components/site/social-links";
import { MotionReveal } from "@/components/ui/motion-reveal";
import { siteConfig, socialLinks } from "@/content/site";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description:
    "Social links and collaboration pathways for project, media, and partnership contact.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <Container className="space-y-10 py-16 sm:py-20">
      <MotionReveal>
        <SectionHeader
          eyebrow="Contact"
          title="Reach out through any channel below"
          description="Open to collaboration, opportunities, and serious conversations aligned with long-term work."
        />
      </MotionReveal>
      <MotionReveal delay={0.04}>
        <SocialLinks links={socialLinks} />
      </MotionReveal>
      <MotionReveal
        delay={0.08}
        className="rounded-2xl border border-white/10 bg-white/[0.02] p-6"
      >
        <p className="text-sm leading-relaxed text-slate-300">
          Direct email:{" "}
          <a
            href="mailto:romonedunlop2@gmail.com"
            className="text-cyan-200 transition hover:text-cyan-100"
          >
            romonedunlop2@gmail.com
          </a>
          . Location: {siteConfig.person.location}.
        </p>
      </MotionReveal>
    </Container>
  );
}
