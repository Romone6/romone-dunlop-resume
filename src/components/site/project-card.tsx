import Link from "next/link";

import type { ProjectItem } from "@/content/site";

import { ImagePanel } from "../ui/image-panel";
import { TagBadge } from "../ui/tag-badge";

function ProjectLink({ href, label }: { href: string; label: string }) {
  const isExternal = href.startsWith("http");
  const classes =
    "inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-200 transition hover:text-cyan-100";

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {label}
        <span aria-hidden>?</span>
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {label}
      <span aria-hidden>?</span>
    </Link>
  );
}

export function ProjectCard({ project }: { project: ProjectItem }) {
  const projectLabel = project.href ? `Visit ${project.name}` : "";

  return (
    <article className="surface-frame rounded-[1.7rem] p-4 sm:p-5">
      <div className="rounded-[1.35rem] border border-white/10 bg-white/[0.03] p-4">
        <ImagePanel
          src={project.imageSrc}
          alt={`${project.name} project visual`}
          className="aspect-[16/10] w-full rounded-[1.1rem] border-white/10 bg-[#0a1019]"
          imageClassName="object-cover"
        />
      </div>
      <div className="flex items-start justify-between gap-4 px-1 pt-5">
        <div>
          <h3 className="text-[1.7rem] font-medium tracking-[-0.03em] text-white">
            {project.name}
          </h3>
          <p className="mt-2 text-sm text-cyan-100/86">{project.shortDescription}</p>
        </div>
        <span className="rounded-full border border-cyan-300/16 bg-cyan-300/8 px-3 py-1 text-[0.72rem] font-medium uppercase tracking-[0.14em] text-cyan-100">
          {project.status}
        </span>
      </div>
      <p className="px-1 pt-4 text-sm leading-7 text-slate-300">{project.thesis}</p>
      <p className="px-1 pt-4 text-sm leading-7 text-slate-500">{project.whyItMatters}</p>
      <div className="flex flex-wrap gap-2 px-1 pt-5">
        {project.tags.map((tag) => (
          <TagBadge key={`${project.name}-${tag}`} label={tag} />
        ))}
      </div>
      {(project.href || project.repoHref) && (
        <div className="flex flex-wrap gap-5 px-1 pt-6">
          {project.href ? <ProjectLink href={project.href} label={projectLabel} /> : null}
          {project.repoHref ? <ProjectLink href={project.repoHref} label={`View ${project.name} Source`} /> : null}
        </div>
      )}
    </article>
  );
}

