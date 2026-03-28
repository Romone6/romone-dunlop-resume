"use client";

import { useMemo, useState } from "react";

import type { ProjectItem, ProjectStatus } from "@/content/site";

import { ProjectCard } from "./project-card";

type ProjectsExplorerProps = {
  projects: ProjectItem[];
  categories: string[];
  statuses: ProjectStatus[];
};

export function ProjectsExplorer({
  projects,
  categories,
  statuses,
}: ProjectsExplorerProps) {
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");

  const filteredProjects = useMemo(
    () =>
      projects.filter((project) => {
        const categoryMatch = category === "All" || project.category === category;
        const statusMatch = status === "All" || project.status === status;

        return categoryMatch && statusMatch;
      }),
    [category, status, projects],
  );

  return (
    <div className="space-y-8">
      <div className="grid gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-4 sm:grid-cols-2">
        <label className="space-y-2">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
            Category
          </span>
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="w-full rounded-lg border border-white/15 bg-slate-900 px-3 py-2 text-sm text-slate-100 focus:border-cyan-300/60 focus:outline-none"
          >
            <option value="All">All categories</option>
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
        <label className="space-y-2">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
            Status
          </span>
          <select
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            className="w-full rounded-lg border border-white/15 bg-slate-900 px-3 py-2 text-sm text-slate-100 focus:border-cyan-300/60 focus:outline-none"
          >
            <option value="All">All statuses</option>
            {statuses.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>
      {filteredProjects.length === 0 ? (
        <p className="rounded-xl border border-white/10 bg-white/[0.02] p-4 text-sm text-slate-300">
          No projects match this filter combination.
        </p>
      ) : null}
    </div>
  );
}
