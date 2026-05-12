import {
  AtSign,
  Github,
  Instagram,
  Linkedin,
  MoveRight,
  Twitter,
} from "lucide-react";

type SocialLink = {
  platform: "Instagram" | "LinkedIn" | "GitHub" | "X" | "Email";
  label: string;
  href: string;
};

const metaMap = {
  Instagram: {
    title: "Instagram",
    handle: "@romone00",
    icon: Instagram,
  },
  LinkedIn: {
    title: "LinkedIn",
    handle: "Romone Dunlop",
    icon: Linkedin,
  },
  GitHub: {
    title: "GitHub",
    handle: "romone6",
    icon: Github,
  },
  X: {
    title: "X",
    handle: "Romone Dunlop",
    icon: Twitter,
  },
  Email: {
    title: "Email",
    handle: "romonedunlop2@gmail.com",
    icon: AtSign,
  },
} as const;

export function SocialLinks({
  links,
}: {
  links: SocialLink[];
}) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
      {links.map((link) => {
        const meta = metaMap[link.platform];
        const Icon = meta.icon;
        const isEmail = link.href.startsWith("mailto:");
        const isExternal = !isEmail && link.href.startsWith("http");

        return (
          <li key={link.platform}>
            <a
              href={link.href}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
              className="group flex h-full items-start gap-3 border-l border-white/10 pl-4 transition hover:border-cyan-300/34"
            >
              <span className="mt-0.5 inline-flex size-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-slate-300 transition group-hover:border-cyan-300/28 group-hover:text-cyan-100">
                <Icon className="size-4" />
              </span>
              <span className="block">
                <span className="block text-[0.98rem] text-white">{meta.title}</span>
                <span className="mt-1 block text-[0.76rem] uppercase tracking-[0.16em] text-slate-500">{meta.handle}</span>
                <span className="mt-3 inline-flex items-center gap-2 text-[0.68rem] uppercase tracking-[0.18em] text-cyan-200">
                  Open
                  <MoveRight className="size-3.5" />
                </span>
              </span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
