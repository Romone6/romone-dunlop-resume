export type RoleType = "Study" | "Work" | "Community" | "Founder";
export type ProjectStatus = "Active" | "Building" | "Planning" | "Archived";

export interface HeroContent {
  headline: string;
  supportingCopy: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  portrait: { src: string; alt: string };
  chips: string[];
}

export interface RoleItem {
  type: RoleType;
  title: string;
  organisation: string;
  timeframe: string;
  status: "Current" | "Past";
  summary: string;
  logoSrc?: string;
  proofLink?: string;
}

export interface ProjectItem {
  name: string;
  category: string;
  status: ProjectStatus;
  shortDescription: string;
  thesis: string;
  whyItMatters: string;
  tags: string[];
  imageSrc: string;
  href?: string;
  repoHref?: string;
  featured: boolean;
  archived: boolean;
}

export interface OrganisationItem {
  name: string;
  role: string;
  logoSrc: string;
  href?: string;
}

export interface SocialLink {
  platform: "Instagram" | "LinkedIn" | "GitHub" | "X" | "Email";
  label: string;
  href: string;
}

export interface MilestoneItem {
  year: string;
  title: string;
  description: string;
}

export interface FuturePlanItem {
  horizon: "Near-term focus" | "Medium-term trajectory" | "Long-term themes";
  title: string;
  summary: string;
}

export interface EventItem {
  title: string;
  organisation: string;
  timeframe: string;
  location: string;
  summary: string;
  href?: string;
}

export interface SiteConfig {
  person: {
    fullName: string;
    shortName: string;
    location: string;
    stage: string;
    url: string;
  };
  seo: {
    titleTemplate: string;
    defaultDescription: string;
  };
  navigation: {
    label: string;
    href: string;
  }[];
}

export const siteConfig: SiteConfig = {
  person: {
    fullName: "Romone",
    shortName: "Romone",
    location: "Port Macquarie, NSW, Australia",
    stage: "Year 12 Student",
    url: "https://romone.me",
  },
  seo: {
    titleTemplate: "Romone | Student, Builder, and Future-Focused Operator",
    defaultDescription:
      "Personal website of Romone Dunlop, a Port Macquarie student working across youth policy, Pathway to Entry, MindBridge Health, AgentOS, independent research, and regional education access.",
  },
  navigation: [
    { label: "About", href: "/about" },
    { label: "Projects", href: "/projects" },
    { label: "Roles", href: "/roles" },
    { label: "Vision", href: "/vision" },
    { label: "Contact", href: "/contact" },
  ],
};

export const heroContent: HeroContent = {
  headline: "Romone - student, operator, and builder shaping what comes next.",
  supportingCopy:
    "A Year 12 student from Port Macquarie building across statewide youth policy, regional education access, AI product development, and independent research through the NSW Youth Advisory Council, Pathway to Entry, MindBridge Health, AgentOS, Operator Layer, and Verblayer.",
  primaryCta: { label: "View Projects", href: "/projects" },
  secondaryCta: { label: "Connect", href: "/contact" },
  portrait: {
    src: "/images/portrait/current-work-board.svg",
    alt: "Current work and organisation board for Romone",
  },
  chips: [
    "Year 12",
    "NSW Youth Advisory Council",
    "Southern Cross Scholars",
    "Pathway to Entry",
    "MindBridge Health",
    "AgentOS",
    "Regional Education Access",
  ],
};

export const roleItems: RoleItem[] = [
  {
    type: "Community",
    title: "Government-Appointed Youth Advisor",
    organisation: "NSW Youth Advisory Council",
    timeframe: "2026 - Present",
    status: "Current",
    summary:
      "Selected as one of 12 young people statewide to advise the NSW Government on policy, programs, and legislation affecting young people, with current focus on regional education pathways, cost-of-living pressure, youth voice, mental health access, and post-school transition barriers.",
    logoSrc: "/logos/office-for-youth.svg",
  },
  {
    type: "Study",
    title: "Year 12 Student",
    organisation: "Hastings Secondary College",
    timeframe: "2026",
    status: "Current",
    summary:
      "Completing Year 12 while balancing management responsibility, founder work, and public-facing policy projects.",
    logoSrc: "/logos/high-school.svg",
  },
  {
    type: "Study",
    title: "Scholars Program Student",
    organisation: "Southern Cross University Scholars Program",
    timeframe: "2026",
    status: "Current",
    summary:
      "Completed university-level study while in high school, securing a guaranteed conditional offer into Bachelor of Business and Bachelor of Laws study, with a $15,000 scholarship linked to program performance.",
    logoSrc: "/logos/southern-cross.png",
  },
  {
    type: "Work",
    title: "Manager / Crew Trainer",
    organisation: "McDonald's",
    timeframe: "2022 - Present",
    status: "Current",
    summary:
      "Leads and trains crew in high-pressure service operations and internal operational responsibilities while balancing school, civic leadership, research, and founder work.",
    logoSrc: "/logos/mcdonalds.svg",
  },
  {
    type: "Founder",
    title: "Founder / Project Lead",
    organisation: "Pathway to Entry",
    timeframe: "2026 - Present",
    status: "Current",
    summary:
      "Founded an NSW YAC-aligned policy and research project studying why regional students disengage between choosing a post-school pathway and reaching actual entry, building the public site, survey strategy, and stakeholder-facing framework.",
  },
  {
    type: "Founder",
    title: "Founder",
    organisation: "MindBridge Health Technologies",
    timeframe: "2025 - Present",
    status: "Current",
    summary:
      "Building AI-assisted mental-health clinic intake and triage software that converts patient context, symptoms, and goals into structured clinician handoffs.",
    logoSrc: "/logos/mindbridge.svg",
  },
  {
    type: "Founder",
    title: "Open-Source AI Infrastructure Builder",
    organisation: "AgentOS",
    timeframe: "2026 - Present",
    status: "Current",
    summary:
      "Building a voice-native multi-agent work and coding environment, alongside Operator Layer and Verblayer, to make execution, tooling, and legacy business workflows AI-actionable.",
    logoSrc: "/logos/agentos.svg",
  },
  {
    type: "Community",
    title: "Youth Media Spokesperson",
    organisation: "Port Macquarie-Hastings Council",
    timeframe: "2026 - Present",
    status: "Current",
    summary:
      "Conducts interviews and youth-facing public communication for council-linked initiatives and local media opportunities.",
  },
  {
    type: "Community",
    title: "Chair",
    organisation: "Youth Spaces Working Group & Youth Week 2027 Working Group",
    timeframe: "2026 - Present",
    status: "Current",
    summary:
      "Chairs two council-linked working groups focused on youth spaces and Youth Week planning, coordinating youth feedback, stakeholder priorities, and implementation direction.",
  },
  {
    type: "Founder",
    title: "Founder / Co-Founder",
    organisation: "Evergreen Landscaping",
    timeframe: "2024 - Present",
    status: "Current",
    summary:
      "Launched a local landscaping business and generated more than $16,000 in gross profit by December 2024 while managing clients, quoting, marketing, and operations.",
  },
  {
    type: "Work",
    title: "Freelance Web Designer",
    organisation: "Local Carpentry / Decking Business",
    timeframe: "2026",
    status: "Current",
    summary:
      "Designed and developed a lead-generation website focused on service clarity, local credibility, and search visibility for a local trade business.",
  },
  {
    type: "Community",
    title: "Youth Sports Coach / State-Level Athlete",
    organisation: "Basketball, Rugby Union & Soccer",
    timeframe: "2023 - Present coaching",
    status: "Current",
    summary:
      "Certified coach and former three-sport state athlete, coaching younger athletes in technical skill, discipline, teamwork, and confidence.",
  },
  {
    type: "Founder",
    title: "Author",
    organisation: "PhilArchive",
    timeframe: "2026",
    status: "Current",
    summary:
      "Author of 'Against Stable Folk Theories of Free Will: Why Deterministic Judgments Are Hybrid', an independent manuscript in experimental philosophy on free will, framing, and moral cognition.",
  },
];

export const projectItems: ProjectItem[] = [
  {
    name: "MindBridge Health",
    category: "Health Technology",
    status: "Active",
    shortDescription:
      "AI-assisted mental health intake for clinical teams.",
    thesis:
      "Standardize intake workflows, capture structured clinical context, and route cases to the right clinician faster.",
    whyItMatters:
      "MindBridge is designed to support, not replace, human judgment, with transparent risk review, structured summaries, and clinician oversight.",
    tags: ["mental health", "structured intake", "risk review", "clinical workflow"],
    imageSrc: "/images/projects/mindbridge-health.svg",
    href: "https://www.mindbridge.health",
    repoHref: "https://github.com/Romone6/mindbridge",
    featured: true,
    archived: false,
  },
  {
    name: "Pathway to Entry",
    category: "Public Policy / Education",
    status: "Active",
    shortDescription:
      "Research and policy project on regional post-school pathway access.",
    thesis:
      "Study why regional students disengage between choosing a post-school pathway and reaching actual entry, then turn those findings into practical frameworks for schools, youth services, TAFE, university partners, and policymakers.",
    whyItMatters:
      "The project translates lived regional barriers into a stakeholder-facing system that can improve pathway clarity, continuation, and actual access.",
    tags: ["regional education", "policy research", "pathways", "public impact"],
    imageSrc: "/images/projects/regional-pathways.jpg",
    href: "https://pathwaytoentry.com",
    featured: true,
    archived: false,
  },
  {
    name: "AgentOS",
    category: "Agentic Systems",
    status: "Building",
    shortDescription:
      "A local-first multi-agent coding loop built in public.",
    thesis:
      "The public repo coordinates manager, developer, tester, and researcher roles, runs allowlisted repo commands, and produces artifacts plus unified diff patches for inspection.",
    whyItMatters:
      "The goal is a safer, inspectable way to turn intent into execution without losing human review.",
    tags: ["multi-agent", "local-first", "coding loop", "patches"],
    imageSrc: "/images/projects/agentos-atmosphere.png",
    repoHref: "https://github.com/Romone6/agent-factory",
    featured: true,
    archived: false,
  },
  {
    name: "Operator Layer",
    category: "Agentic Systems",
    status: "Building",
    shortDescription:
      "Agent-to-tool execution infrastructure for real-world software workflows.",
    thesis:
      "Create the execution layer that lets agents act reliably across tools and operating environments rather than staying trapped in chat-only abstractions.",
    whyItMatters:
      "Operator Layer is meant to close the gap between agent reasoning and actual software execution in a way that is modular, inspectable, and useful.",
    tags: ["agent tooling", "execution", "infrastructure", "automation"],
    imageSrc: "/images/projects/agentos-atmosphere.png",
    featured: false,
    archived: false,
  },
  {
    name: "Verblayer",
    category: "AI Infrastructure",
    status: "Building",
    shortDescription:
      "Command layer for turning legacy business software into AI-actionable workflows.",
    thesis:
      "Translate older software environments into commandable action layers so AI systems can work across businesses that do not operate on modern AI-native stacks.",
    whyItMatters:
      "A large share of real work still happens inside legacy systems. Verblayer is about making those environments operable without forcing full software replacement first.",
    tags: ["legacy software", "workflow layer", "AI systems", "business tooling"],
    imageSrc: "/images/projects/agentos-atmosphere.png",
    featured: false,
    archived: false,
  },
  {
    name: "Regional Pathways Work",
    category: "Youth Policy / Education",
    status: "Active",
    shortDescription:
      "NSW Youth Advisory Council and Office for Youth work focused on narrowing the gap between regional students and post-school opportunity.",
    thesis:
      "Improve access to clearer pathways into university, TAFE, and skilled employment for regional young people through practical policy work and youth consultation.",
    whyItMatters:
      "This work is grounded in making credible next-step options more visible for regional students who are often further from metropolitan networks, information, and institutional access.",
    tags: ["NSW Youth Advisory Council", "Office for Youth", "education", "regional pathways"],
    imageSrc: "/images/projects/regional-pathways.jpg",
    href: "https://officeforyouth.nsw.gov.au/",
    featured: false,
    archived: false,
  },
];

export const organisationItems: OrganisationItem[] = [
  {
    name: "Office for Youth",
    role: "Youth Advisory Council",
    logoSrc: "/logos/office-for-youth.svg",
  },
  {
    name: "MindBridge Health",
    role: "Founder Project",
    logoSrc: "/logos/mindbridge.svg",
  },
  {
    name: "Hastings Secondary College",
    role: "Year 12",
    logoSrc: "/logos/high-school.svg",
  },
  {
    name: "McDonald's",
    role: "Manager / Crew Trainer",
    logoSrc: "/logos/mcdonalds.svg",
    href: "https://www.mcdonalds.com",
  },
  {
    name: "Southern Cross University Scholars Program",
    role: "Scholars Program",
    logoSrc: "/logos/southern-cross.png",
  },
];

export const socialLinks: SocialLink[] = [
  {
    platform: "Instagram",
    label: "Instagram / @romone00",
    href: "https://instagram.com/romone00",
  },
  {
    platform: "LinkedIn",
    label: "LinkedIn / Romone Dunlop",
    href: "https://www.linkedin.com",
  },
  {
    platform: "GitHub",
    label: "GitHub / Romone6",
    href: "https://github.com/Romone6",
  },
  {
    platform: "X",
    label: "X / Romone Dunlop",
    href: "https://x.com",
  },
  {
    platform: "Email",
    label: "Email / romonedunlop2@gmail.com",
    href: "mailto:romonedunlop2@gmail.com",
  },
];

export const milestoneItems: MilestoneItem[] = [
  {
    year: "2022",
    title: "Began McDonald's Role",
    description:
      "Started at McDonald's and built the operational foundation that now sits behind current management responsibility.",
  },
  {
    year: "2025",
    title: "Founded MindBridge Health Technologies",
    description:
      "Started MindBridge Health Technologies and deepened product work at the intersection of health systems, workflow design, and public impact.",
  },
  {
    year: "2026",
    title: "NSW Youth Advisory Council, Pathway to Entry, and Southern Cross",
    description:
      "Selected to the NSW Youth Advisory Council, launched Pathway to Entry, completed the Southern Cross University Scholars Program, and secured a guaranteed conditional offer into Business and Laws study with a linked scholarship opportunity.",
  },
];

export const futurePlanItems: FuturePlanItem[] = [
  {
    horizon: "Near-term focus",
    title: "Deliver useful work through the NSW Youth Advisory Council and Pathway to Entry",
    summary:
      "Stay close to practical youth-policy and pathway-access work that improves post-school transitions for regional students into university, TAFE, and skilled employment.",
  },
  {
    horizon: "Near-term focus",
    title: "Build MindBridge Health, AgentOS, Operator Layer, and Verblayer well",
    summary:
      "Keep product and infrastructure work moving with stronger execution, clearer systems, and honest public-facing positioning.",
  },
  {
    horizon: "Medium-term trajectory",
    title: "Deepen business, policy, and systems understanding",
    summary:
      "Develop stronger understanding across business, finance/economics, public policy, law, and how institutions shape outcomes over time.",
  },
  {
    horizon: "Medium-term trajectory",
    title: "Strengthen independent research and philosophy work",
    summary:
      "Continue work around deterministic theory, cognition, moral judgment, and structural inequality in legal systems.",
  },
  {
    horizon: "Long-term themes",
    title: "Build systems with public impact",
    summary:
      "Work on ventures and initiatives where technology, health, and institutional design can improve real-world outcomes at scale.",
  },
  {
    horizon: "Long-term themes",
    title: "Expand access to opportunity",
    summary:
      "Stay close to work that makes pathways into study, work, and long-term mobility more visible and more attainable.",
  },
];

export const aboutNarrative: string[] = [
  "I am a Year 12 student from Port Macquarie, studying at Hastings Secondary College and through the Southern Cross University Scholars Program. I have been recognised through the Gifted Learning Program, academic scholarships, and leadership awards, and my current chapter is built around public leadership, entrepreneurship, technology, and independent research.",
  "That includes serving as a government-appointed youth advisor on the NSW Youth Advisory Council, building Pathway to Entry around regional post-school pathway access, developing MindBridge Health Technologies for clinician intake and triage, and building open-source AI infrastructure through AgentOS, Operator Layer, and Verblayer.",
  "My academic interests sit across business, finance/economics, public policy, political science and law, entrepreneurship, AI product development, health technology, philosophy, and cognitive science. I also write independently on deterministic theory, free will, and structural inequality in legal systems, and have received nominations and recognition across leadership, volunteering, youth impact, and academic excellence.",
];

export const eventItems: EventItem[] = [
  {
    title: "International Youth Conference",
    organisation: "International Organization of Youth",
    timeframe: "2026",
    location: "Los Angeles, USA",
    summary:
      "Invited to attend the International Youth Conference in Los Angeles.",
    href: "https://www.ioyforyouth.org/programs/international-youth-conference",
  },
  {
    title: "Federal Youth Parliament",
    organisation: "Youth Parliament Program",
    timeframe: "2026",
    location: "Australia",
    summary:
      "Shortlisted for Federal Youth Parliament as part of a broader commitment to youth participation and public leadership.",
  },
  {
    title: "State Youth Parliament",
    organisation: "Youth Parliament Program",
    timeframe: "2026",
    location: "New South Wales",
    summary:
      "Waitlisted for State Youth Parliament while continuing to build policy and civic leadership work.",
  },
];

export const guidingPrinciples: string[] = [
  "Build practical systems over short-term hype.",
  "Operate with consistency before scale.",
  "Keep ambition grounded in evidence.",
  "Document decisions and learn in public.",
  "Treat people, time, and trust as compounding assets.",
];

export function getFeaturedProjects(): ProjectItem[] {
  return projectItems.filter((project) => project.featured);
}

export function getProjectCategories(): string[] {
  return Array.from(new Set(projectItems.map((project) => project.category)));
}

export function getProjectStatuses(): ProjectStatus[] {
  return Array.from(new Set(projectItems.map((project) => project.status)));
}

export function getRolesByType(type: RoleType): RoleItem[] {
  return roleItems.filter((role) => role.type === type);
}
