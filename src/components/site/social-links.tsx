import {
  Github,
  Instagram,
  Linkedin,
  Mail,
  Twitter,
  type LucideIcon,
} from "lucide-react";

import type { SocialLink as SocialLinkItem } from "@/content/site";

type SocialLinksProps = {
  links: SocialLinkItem[];
};

const iconMap: Record<SocialLinkItem["platform"], LucideIcon> = {
  Instagram,
  LinkedIn: Linkedin,
  GitHub: Github,
  X: Twitter,
  Email: Mail,
};

export function SocialLinks({ links }: SocialLinksProps) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {links.map((link) => {
        const Icon = iconMap[link.platform];
        const isEmail = link.href.startsWith("mailto:");
        const isExternal = !isEmail && link.href.startsWith("http");

        return (
          <li key={link.platform}>
            <a
              href={link.href}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
              className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-3 text-slate-200 transition hover:border-cyan-300/50"
            >
              <span className="rounded-lg border border-white/15 bg-slate-900 p-2 text-slate-100">
                <Icon size={16} aria-hidden />
              </span>
              <span className="text-sm font-medium">{link.label}</span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
