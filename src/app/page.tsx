import { FuturePlanCard } from "@/components/site/future-plan-card";
import { Hero } from "@/components/site/hero";
import { OrganisationLogoGrid } from "@/components/site/organisation-logo-grid";
import { ProjectCard } from "@/components/site/project-card";
import { RoleCard } from "@/components/site/role-card";
import { SectionHeader } from "@/components/site/section-header";
import { SocialLinks } from "@/components/site/social-links";
import { Container } from "@/components/site/container";
import { MotionReveal } from "@/components/ui/motion-reveal";
import {
  futurePlanItems,
  getFeaturedProjects,
  heroContent,
  organisationItems,
  roleItems,
  socialLinks,
} from "@/content/site";

export default function Home() {
  const featuredProjects = getFeaturedProjects().slice(0, 4);
  const currentRoles = roleItems
    .filter((role) => role.status === "Current")
    .sort((left, right) => {
      if (left.organisation === "NSW Youth Advisory Council") {
        return -1;
      }
      if (right.organisation === "NSW Youth Advisory Council") {
        return 1;
      }
      return 0;
    })
    .slice(0, 6);

  return (
    <div>
      <Hero content={heroContent} />
      <section className="py-20">
        <Container className="space-y-8">
          <MotionReveal>
            <SectionHeader
              eyebrow="Current Snapshot"
              title="Roles and focus areas right now"
              description="Current responsibilities across youth policy, study, work, and founder projects."
            />
          </MotionReveal>
          <div className="grid gap-5 md:grid-cols-2">
            {currentRoles.map((role) => (
              <MotionReveal key={`${role.organisation}-${role.title}`}>
                <RoleCard role={role} />
              </MotionReveal>
            ))}
          </div>
        </Container>
      </section>
      <section className="border-y border-white/10 bg-slate-950/50 py-20">
        <Container className="space-y-8">
          <MotionReveal>
            <SectionHeader
              eyebrow="Featured Projects"
              title="Active projects with clear intent"
              description="Flagship work across health technology, agentic systems, and youth pathways."
            />
          </MotionReveal>
          <div className="grid gap-6 md:grid-cols-2">
            {featuredProjects.map((project, index) => (
              <MotionReveal key={project.name} delay={index * 0.04}>
                <ProjectCard project={project} />
              </MotionReveal>
            ))}
          </div>
        </Container>
      </section>
      <section className="py-20">
        <Container className="space-y-8">
          <MotionReveal>
            <SectionHeader
              eyebrow="Organisations"
              title="Where I study, work, and build"
              description="Selected organisations and initiatives connected to current work, including youth-policy work through the Office for Youth."
            />
          </MotionReveal>
          <MotionReveal delay={0.05}>
            <OrganisationLogoGrid organisations={organisationItems} />
          </MotionReveal>
        </Container>
      </section>
      <section className="border-y border-white/10 bg-slate-950/50 py-20">
        <Container className="space-y-8">
          <MotionReveal>
            <SectionHeader
              eyebrow="Future Direction"
              title="Grounded ambition with strategic direction"
              description="Focus themes for the next chapter, anchored in execution and useful work."
            />
          </MotionReveal>
          <div className="grid gap-5 lg:grid-cols-3">
            {futurePlanItems.slice(0, 3).map((item, index) => (
              <MotionReveal key={item.title} delay={index * 0.04}>
                <FuturePlanCard item={item} />
              </MotionReveal>
            ))}
          </div>
        </Container>
      </section>
      <section className="py-20">
        <Container className="space-y-8">
          <MotionReveal>
            <SectionHeader
              eyebrow="Connect"
              title="Open to serious collaborations and conversations"
              description="Use the channels below for project discussions, opportunities, or media-related contact."
            />
          </MotionReveal>
          <MotionReveal delay={0.04}>
            <SocialLinks links={socialLinks} />
          </MotionReveal>
        </Container>
      </section>
    </div>
  );
}
