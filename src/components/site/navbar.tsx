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
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-[rgba(5,11,20,0.76)] backdrop-blur-xl">
      <Container className="flex h-16 items-center justify-between sm:h-20">
        <Link href="/" className="flex items-center gap-4 text-white">
          <span className="font-[family-name:var(--font-newsreader)] text-3xl leading-none tracking-[-0.04em] sm:text-4xl">
            Romone
          </span>
          <span className="hidden h-10 w-px bg-white/14 lg:block" />
          <span className="hidden text-[0.92rem] leading-6 text-slate-400 lg:block">
            Personal website focused on<br />
            current work and direction.
          </span>
        </Link>
        <div className="hidden items-center gap-10 md:flex">
          <nav aria-label="Primary">
            <ul className="flex items-center gap-2">
              {siteConfig.navigation.map((item) => {
                const active = pathname === item.href;

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "relative px-3 py-2 text-sm text-slate-300 transition hover:text-white",
                        active && "text-white",
                      )}
                    >
                      {item.label}
                      <span
                        className={cn(
                          "absolute inset-x-3 -bottom-[0.8rem] h-px bg-cyan-200 transition-opacity",
                          active ? "opacity-100" : "opacity-0",
                        )}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <Link
            href="/projects"
            className="inline-flex items-center rounded-full border border-cyan-300/40 px-4 py-2.5 text-sm font-medium text-cyan-100 transition hover:bg-cyan-300/10"
          >
            View Projects
          </Link>
        </div>
        <MobileNav items={siteConfig.navigation} />
      </Container>
    </header>
  );
}

