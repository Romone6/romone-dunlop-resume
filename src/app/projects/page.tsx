import type { Metadata } from "next";
import { Container } from "@/components/site/container";
import { ProjectsExplorer } from "@/components/site/projects-explorer";
import { MotionReveal } from "@/components/ui/motion-reveal";
import { projectItems } from "@/content/site";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Projects",
  description:
    "Current work across health technology, agentic systems, and regional pathways.",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <Container className="pb-16 pt-4 sm:pb-20 sm:pt-6">
      <MotionReveal>
        <ProjectsExplorer projects={projectItems} />
      </MotionReveal>
    </Container>
  );
}
