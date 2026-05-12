import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { ProjectItem } from "@/content/site";

import { BrowserPanel } from "./browser-panel";

type ProjectsExplorerProps = {
  projects: ProjectItem[];
};

function ProjectLink({ href, label }: { href: string; label: string }) {
  const isExternal = href.startsWith("http");
  const classes =
    "inline-flex items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-cyan-200 transition hover:text-cyan-100";

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {label}
        <ArrowRight className="size-3.5" />
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {label}
      <ArrowRight className="size-3.5" />
    </Link>
  );
}

function ProjectMetaList({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-x-4 gap-y-1 text-[0.72rem] uppercase tracking-[0.16em] text-slate-400">
      {items.map((item) => (
        <span key={item}>{item}</span>
      ))}
    </div>
  );
}

export function ProjectsExplorer({ projects }: ProjectsExplorerProps) {
  const priorityMap = new Map([
    ["AgentOS", 0],
    ["MindBridge Health", 1],
    ["Regional Pathways Project", 2],
  ]);

  const sortedProjects = [...projects].sort(
    (left, right) =>
      (priorityMap.get(left.name) ?? Number.MAX_SAFE_INTEGER) -
      (priorityMap.get(right.name) ?? Number.MAX_SAFE_INTEGER),
  );

  const [featuredProject, ...secondaryProjects] = sortedProjects;

  return (
    <BrowserPanel>
      <div className="grid gap-12 xl:grid-cols-[0.68fr_1.32fr] xl:items-start">
        <div>
          <p className="eyebrow">Projects</p>
          <h1 className="editorial-title mt-4 max-w-[9.2ch] text-5xl sm:text-6xl lg:text-[4.6rem]">
            Building systems that solve <span className="text-cyan-200 italic">real problems.</span>
          </h1>
          <p className="editorial-copy mt-7 max-w-[24rem]">
            I build at the intersection of health, agents, systems, and public
            impact. Each project is grounded in purpose and built for use.
          </p>
          <Link
            href="/about"
            className="mt-10 inline-flex items-center gap-2 text-[0.72rem] uppercase tracking-[0.2em] text-cyan-200 transition hover:text-cyan-100"
          >
            View impact timeline
            <ArrowRight className="size-3.5" />
          </Link>
        </div>

        <div className="space-y-8">
          {featuredProject ? (
            <article className="rounded-[1.6rem] border border-white/10 bg-[#08111c] p-4 sm:p-5">
              <div
                className="relative overflow-hidden rounded-[1.3rem] border border-white/10 bg-black"
                style={{
                  backgroundImage: `url(${featuredProject.imageSrc})`,
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                }}
              >
                <div className="aspect-[16/8.7] w-full" aria-hidden />
                <div className="absolute inset-0 bg-gradient-to-r from-[#08111c] via-[#08111c]/78 to-[#08111c]/34" />
                <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8">
                  <p className="text-[0.72rem] uppercase tracking-[0.18em] text-cyan-200">
                    {featuredProject.status}
                  </p>
                  <h2 className="mt-4 max-w-[10ch] font-[family-name:var(--font-newsreader)] text-[3rem] font-medium leading-[0.98] tracking-[-0.04em] text-white sm:text-[3.35rem]">
                    {featuredProject.name}
                  </h2>
                  <p className="mt-4 text-[1.08rem] text-slate-100">{featuredProject.shortDescription}</p>
                  <p className="mt-5 max-w-2xl text-[1rem] leading-8 text-slate-300">
                    {featuredProject.thesis}
                  </p>
                  <div className="mt-6">
                    <ProjectMetaList items={featuredProject.tags} />
                  </div>
                  <div className="mt-7 flex flex-wrap gap-5">
                    {featuredProject.href ? (
                      <ProjectLink href={featuredProject.href} label={`Visit ${featuredProject.name}`} />
                    ) : null}
                    {featuredProject.repoHref ? (
                      <ProjectLink href={featuredProject.repoHref} label={`View ${featuredProject.name} Source`} />
                    ) : null}
                  </div>
                </div>
              </div>
            </article>
          ) : null}

          <div className="divide-y divide-white/10 rounded-[1.4rem] border border-white/10 bg-white/[0.02]">
            {secondaryProjects.map((project) => (
              <article
                key={project.name}
                className="grid gap-4 px-6 py-6 lg:grid-cols-[1fr_auto] lg:items-start"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <p className="text-[0.72rem] uppercase tracking-[0.18em] text-cyan-200">
                      {project.status}
                    </p>
                    <h3 className="text-[1.75rem] font-medium tracking-[-0.035em] text-white">
                      {project.name}
                    </h3>
                  </div>
                  <p className="mt-3 text-[1rem] leading-8 text-slate-400">
                    {project.whyItMatters}
                  </p>
                  <div className="mt-4">
                    <ProjectMetaList items={project.tags.slice(0, 3)} />
                  </div>
                </div>
                <div className="lg:justify-self-end lg:pt-1">
                  {project.href ? (
                    <ProjectLink href={project.href} label="Open" />
                  ) : project.repoHref ? (
                    <ProjectLink href={project.repoHref} label="Source" />
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </BrowserPanel>
  );
}
