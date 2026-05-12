import { Hero } from "@/components/site/hero";
import { heroContent, organisationItems, roleItems } from "@/content/site";

const focusItems = [
  {
    title: "Youth Policy & Advisory",
    description:
      "Serving on the NSW Youth Advisory Council as a government-appointed youth advisor and contributing to work that sharpens pathways, representation, and practical access for regional young people.",
    detail: "Office for Youth, youth policy, youth voice, cost-of-living, mental health.",
  },
  {
    title: "Regional Pathways",
    description:
      "Building Pathway to Entry around the gap between choosing a post-school pathway and actually reaching university, TAFE, or skilled employment from a regional base.",
    detail: "Research, consultation design, survey strategy, stakeholder framework.",
  },
  {
    title: "Health Technology",
    description:
      "Building MindBridge Health Technologies around AI-assisted mental health intake, triage, and clinician workflow systems that improve context and speed.",
    detail: "Product strategy, workflow research, technical planning, go-to-market.",
  },
  {
    title: "Systems & AI",
    description:
      "Building AgentOS, Operator Layer, and Verblayer as open-source AI infrastructure for real execution, tooling, and legacy business software workflows.",
    detail: "Voice-native agents, execution layers, AI-actionable systems.",
  },
];

export default function Home() {
  const currentRoles = roleItems.filter((role) => role.status === "Current");

  return (
    <div className="space-y-10 pb-12 sm:space-y-14 sm:pb-16">
      <Hero
        content={heroContent}
        currentRoles={currentRoles}
        organisations={organisationItems}
        focusItems={focusItems}
      />
    </div>
  );
}

