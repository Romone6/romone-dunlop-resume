import type { Metadata } from "next";

import { Container } from "@/components/site/container";
import { RoleCard } from "@/components/site/role-card";
import { SectionHeader } from "@/components/site/section-header";
import { MotionReveal } from "@/components/ui/motion-reveal";
import { getRolesByType, type RoleType } from "@/content/site";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Roles",
  description:
    "Current study, work, community, and founder roles with honest framing and clear responsibilities.",
  path: "/roles",
});

const roleTypes: RoleType[] = ["Study", "Work", "Community", "Founder"];

export default function RolesPage() {
  return (
    <Container className="space-y-14 py-16 sm:py-20">
      <MotionReveal>
        <SectionHeader
          eyebrow="Roles"
          title="Current responsibilities across youth policy, study, work, and building"
          description="A clear view of where time and execution are currently allocated, with NSW Youth Advisory Council work as a major current role."
        />
      </MotionReveal>
      {roleTypes.map((type, index) => {
        const roles = getRolesByType(type);
        if (roles.length === 0) {
          return null;
        }

        return (
          <MotionReveal key={type} className="space-y-5" delay={index * 0.03}>
            <h2 className="text-2xl font-semibold text-white">{type}</h2>
            <div className="grid gap-5 md:grid-cols-2">
              {roles.map((role) => (
                <RoleCard key={`${role.organisation}-${role.title}`} role={role} />
              ))}
            </div>
          </MotionReveal>
        );
      })}
    </Container>
  );
}
