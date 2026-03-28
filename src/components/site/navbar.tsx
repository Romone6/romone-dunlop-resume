"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { siteConfig } from "@/content/site";
import { cn } from "@/lib/utils";

import { Container } from "./container";
import { MobileNav } from "./mobile-nav";

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-slate-950/85 backdrop-blur-xl">
      <Container className="flex h-16 items-center justify-between">
        <Link
          href="/"
          className="text-sm font-semibold tracking-[0.24em] text-slate-100 uppercase"
        >
          {siteConfig.person.shortName}
        </Link>
        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {siteConfig.navigation.map((item) => {
              const active = pathname === item.href;

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "rounded-md px-3 py-2 text-sm font-medium transition",
                      active
                        ? "text-cyan-200"
                        : "text-slate-300 hover:bg-white/5 hover:text-white",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="hidden md:block">
          <Link
            href="/projects"
            className="inline-flex items-center rounded-full border border-cyan-300/40 bg-cyan-300/10 px-4 py-2 text-xs font-semibold tracking-wide text-cyan-100 transition hover:border-cyan-200"
          >
            View Projects
          </Link>
        </div>
        <MobileNav items={siteConfig.navigation} />
      </Container>
    </header>
  );
}
