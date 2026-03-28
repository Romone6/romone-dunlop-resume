import type { Metadata } from "next";

import { Container } from "@/components/site/container";
import { ProjectsExplorer } from "@/components/site/projects-explorer";
import { SectionHeader } from "@/components/site/section-header";
import { MotionReveal } from "@/components/ui/motion-reveal";
import {
  getProjectCategories,
  getProjectStatuses,
  projectItems,
} from "@/content/site";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Projects",
  description:
    "Current work across health technology, agentic systems, and regional pathways.",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <Container className="space-y-10 py-16 sm:py-20">
      <MotionReveal>
        <SectionHeader
          eyebrow="Projects"
          title="A portfolio of active and notable work"
          description="Filter by category and status to scan current focus across health technology, agentic systems, and youth pathways."
        />
      </MotionReveal>
      <MotionReveal delay={0.05}>
        <ProjectsExplorer
          projects={projectItems}
          categories={getProjectCategories()}
          statuses={getProjectStatuses()}
        />
      </MotionReveal>
    </Container>
  );
}
