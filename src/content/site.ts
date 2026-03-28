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
    location: "Australia",
    stage: "Year 12 Student",
    url: "https://romone.me",
  },
  seo: {
    titleTemplate: "Romone | Student, Builder, and Future-Focused Operator",
    defaultDescription:
      "Personal website of Romone, a Year 12 student, Southern Cross University Scholars Program student, McDonald's manager, MindBridge Health founder, AgentOS builder, and one of 12 members of the NSW Youth Advisory Council.",
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
    "A Year 12 student studying through the Southern Cross University Scholars Program, serving as one of 12 members of the NSW Youth Advisory Council through the Office for Youth, managing at McDonald's, and building MindBridge Health and AgentOS.",
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
    "Office for Youth",
    "McDonald's Manager",
    "MindBridge Health",
    "AgentOS",
  ],
};

export const roleItems: RoleItem[] = [
  {
    type: "Community",
    title: "One of 12 Members",
    organisation: "NSW Youth Advisory Council",
    timeframe: "2026",
    status: "Current",
    summary:
      "Serving on the NSW Youth Advisory Council through the Office for Youth, with current work focused on improving pathways for regional students into university, TAFE, and skilled employment.",
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
      "Studying alongside school through the Southern Cross University Scholars Program.",
    logoSrc: "/logos/southern-cross.png",
  },
  {
    type: "Work",
    title: "Manager",
    organisation: "McDonald's",
    timeframe: "2022 - Present",
    status: "Current",
    summary:
      "Managing in a fast-paced environment with responsibility for consistency, people, and day-to-day execution.",
    logoSrc: "/logos/mcdonalds.svg",
  },
  {
    type: "Founder",
    title: "Founder",
    organisation: "MindBridge Health",
    timeframe: "2025 - Present",
    status: "Current",
    summary:
      "Building an AI-powered intake, triage, and clinician workflow platform.",
    logoSrc: "/logos/mindbridge.svg",
  },
  {
    type: "Founder",
    title: "Builder",
    organisation: "AgentOS",
    timeframe: "2026",
    status: "Current",
    summary:
      "Building an agentic-first operating system designed to handle every task imaginable.",
    logoSrc: "/logos/agentos.svg",
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
    imageSrc: "/images/projects/agentos.svg",
    repoHref: "https://github.com/Romone6/agent-factory",
    featured: true,
    archived: false,
  },
  {
    name: "Regional Pathways Project",
    category: "Youth Policy / Education",
    status: "Active",
    shortDescription:
      "NSW Youth Advisory Council and Office for Youth work focused on narrowing the gap between regional students and metropolitan pathways.",
    thesis:
      "Improve access to clearer pathways into university, TAFE, and skilled employment for regional young people through practical youth-policy work.",
    whyItMatters:
      "The work is grounded in making credible next-step options more visible for regional students who are too often left further from metropolitan networks and information.",
    tags: ["NSW Youth Advisory Council", "Office for Youth", "education", "regional pathways"],
    imageSrc: "/images/projects/regional-pathways.jpg",
    href: "https://officeforyouth.nsw.gov.au/",
    featured: true,
    archived: false,
  },
];

export const organisationItems: OrganisationItem[] = [
  {
    name: "Office for Youth",
    role: "NSW Youth Advisory Council",
    logoSrc: "/logos/office-for-youth.svg",
  },
  {
    name: "MindBridge Health",
    role: "Founder Project",
    logoSrc: "/logos/mindbridge.svg",
  },
  {
    name: "Hastings Secondary College",
    role: "Study",
    logoSrc: "/logos/high-school.svg",
  },
  {
    name: "McDonald's",
    role: "Work",
    logoSrc: "/logos/mcdonalds.svg",
    href: "https://www.mcdonalds.com",
  },
  {
    name: "Southern Cross University Scholars Program",
    role: "Study",
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
    title: "Founded MindBridge Health",
    description:
      "Started MindBridge Health and deepened work at the intersection of health systems, execution, and public impact.",
  },
  {
    year: "2026",
    title: "Year 12, NSW Youth Advisory Council, and AgentOS",
    description:
      "Balancing Year 12, the Southern Cross University Scholars Program, NSW Youth Advisory Council work through the Office for Youth, AgentOS, and regional pathways policy work.",
  },
];

export const futurePlanItems: FuturePlanItem[] = [
  {
    horizon: "Near-term focus",
    title: "Deliver useful work through the NSW Youth Advisory Council",
    summary:
      "Stay close to practical youth-policy work that improves pathways for regional students into university, TAFE, and skilled employment.",
  },
  {
    horizon: "Near-term focus",
    title: "Build MindBridge Health and AgentOS well",
    summary:
      "Keep both projects moving with stronger execution, clearer systems, and honest public-facing positioning.",
  },
  {
    horizon: "Medium-term trajectory",
    title: "Deepen policy and systems understanding",
    summary:
      "Develop stronger understanding of how education, institutions, and opportunity structures shape outcomes over time.",
  },
  {
    horizon: "Medium-term trajectory",
    title: "Strengthen independent research",
    summary:
      "Continue research around deterministic theory and structural inequality in legal systems.",
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
  "I am a Year 12 student at Hastings Secondary College, currently also studying through the Southern Cross University Scholars Program. My current chapter is about balancing school with NSW Youth Advisory Council work through the Office for Youth, management responsibility at McDonald's, founder work at MindBridge Health, and the buildout of AgentOS.",
  "I am one of 12 members of the NSW Youth Advisory Council. A major part of that work is improving pathways for regional students into university, TAFE, and skilled employment, and helping close the gap between regional young people and the opportunities more visible in metropolitan settings.",
  "My independent research interests include deterministic theory and structural inequality in legal systems. I am interested in how institutions, incentives, and system design shape outcomes over time.",
];

export const eventItems: EventItem[] = [
  {
    title: "State Youth Parliament",
    organisation: "Youth Parliament Program",
    timeframe: "2026",
    location: "New South Wales",
    summary:
      "Attending as part of a broader commitment to youth participation, policy, and parliamentary process.",
  },
  {
    title: "Federal Youth Parliament",
    organisation: "Youth Parliament Program",
    timeframe: "2026",
    location: "Australia",
    summary:
      "Attending to deepen national policy understanding and sharpen practical engagement with democratic process.",
  },
  {
    title: "International Youth Conference 13",
    organisation: "International Organization of Youth",
    timeframe: "May 21 - 24, 2026",
    location: "Los Angeles, USA",
    summary:
      "Attending IYC13 in Los Angeles, a global conference focused on youth-led diplomacy, policy dialogue, and international collaboration.",
    href: "https://www.ioyforyouth.org/programs/international-youth-conference",
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
