import Link from "next/link";

import type { ProjectItem } from "@/content/site";

import { ImagePanel } from "../ui/image-panel";
import { TagBadge } from "../ui/tag-badge";

type ProjectCardProps = {
  project: ProjectItem;
};

function ProjectLink({ href, label }: { href: string; label: string }) {
  const isExternal = href.startsWith("http");

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-200 hover:text-cyan-100"
      >
        {label}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-200 hover:text-cyan-100"
    >
      {label}
    </Link>
  );
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-white/10 bg-slate-950/65 transition hover:border-white/20">
      <ImagePanel
        src={project.imageSrc}
        alt={`${project.name} project visual`}
        className="aspect-[16/10] w-full rounded-none border-0"
        imageClassName="transition duration-500 group-hover:scale-[1.02]"
      />
      <div className="space-y-4 p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-white">{project.name}</h3>
            <p className="text-sm text-slate-300">{project.shortDescription}</p>
          </div>
          <span className="rounded-full border border-white/15 bg-white/[0.04] px-3 py-1 text-xs font-medium text-slate-200">
            {project.status}
          </span>
        </div>
        <p className="text-sm leading-relaxed text-slate-300">{project.thesis}</p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <TagBadge key={`${project.name}-${tag}`} label={tag} />
          ))}
        </div>
        {project.href || project.repoHref ? (
          <div className="flex gap-5 pt-2">
            {project.href ? <ProjectLink href={project.href} label="Project Link" /> : null}
            {project.repoHref ? <ProjectLink href={project.repoHref} label="Source" /> : null}
          </div>
        ) : null}
      </div>
    </article>
  );
}
