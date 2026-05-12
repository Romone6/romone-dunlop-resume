import type { Metadata } from "next";

import { BrowserPanel } from "@/components/site/browser-panel";
import { Container } from "@/components/site/container";
import { MotionReveal } from "@/components/ui/motion-reveal";
import { getRolesByType, type RoleItem } from "@/content/site";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Roles",
  description:
    "Current study, work, community, and founder roles with honest framing and clear responsibilities.",
  path: "/roles",
});

const columns: Array<{
  title: string;
  subtitle: string;
  roles: RoleItem[];
}> = [
  {
    title: "Community & Policy",
    subtitle: "Current public-facing work",
    roles: getRolesByType("Community"),
  },
  {
    title: "Study",
    subtitle: "Current education",
    roles: getRolesByType("Study"),
  },
  {
    title: "Work",
    subtitle: "Operational responsibility",
    roles: getRolesByType("Work"),
  },
  {
    title: "Founder & Builder",
    subtitle: "Current ventures",
    roles: getRolesByType("Founder"),
  },
];

export default function RolesPage() {
  return (
    <Container className="pb-16 pt-4 sm:pb-20 sm:pt-6">
      <MotionReveal>
        <BrowserPanel>
          <div className="grid gap-10 xl:grid-cols-[0.58fr_1.42fr]">
            <div>
              <p className="eyebrow">Roles</p>
              <h1 className="editorial-title mt-4 max-w-[7ch] text-5xl sm:text-6xl lg:text-[4.5rem]">
                Current roles.
              </h1>
              <p className="editorial-copy mt-7 max-w-[23rem]">
                I work across community, study, work, and ventures to create impact at
                every level.
              </p>
              <a
                href="/about"
                className="mt-10 inline-flex items-center gap-2 text-[0.72rem] uppercase tracking-[0.2em] text-cyan-200"
              >
                View impact timeline
              </a>
            </div>

            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
              {columns.map((column) => (
                <section key={column.title}>
                  <p className="mb-6 text-[0.68rem] uppercase tracking-[0.22em] text-cyan-200">
                    {column.title}
                  </p>
                  <div className="space-y-7">
                    {column.roles.map((role) => (
                      <article key={`${role.organisation}-${role.title}`} className="space-y-3">
                        <div>
                          <p className="text-[1.05rem] text-white">{role.organisation}</p>
                          <p className="mt-1 text-[0.74rem] uppercase tracking-[0.16em] text-slate-500">
                            {role.title} / {role.timeframe}
                          </p>
                        </div>
                        <p className="text-[0.95rem] leading-8 text-slate-400">{role.summary}</p>
                      </article>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>

          <div className="section-divider mt-12 flex items-center justify-between gap-8 pt-8">
            <p className="quote-mark max-w-4xl text-xl leading-8 text-slate-200 sm:text-2xl">
              Every role is connected by the same mission: build systems that create
              opportunity and improve lives.
            </p>
            <span className="font-[family-name:var(--font-newsreader)] text-4xl italic text-cyan-200">
              R.
            </span>
          </div>
        </BrowserPanel>
      </MotionReveal>
    </Container>
  );
}
