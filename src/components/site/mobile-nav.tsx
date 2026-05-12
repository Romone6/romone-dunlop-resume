"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

type NavItem = {
  label: string;
  href: string;
};

type MobileNavProps = {
  items: NavItem[];
};

export function MobileNav({ items }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!open) {
      document.body.style.removeProperty("overflow");
      return;
    }

    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.removeProperty("overflow");
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        className="inline-flex size-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-white transition hover:border-cyan-300/50"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="mobile-nav"
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
      >
        {open ? <X size={18} /> : <Menu size={18} />}
      </button>
      <div
        className={cn(
          "fixed inset-0 z-50 bg-black/55 backdrop-blur-sm transition",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={() => setOpen(false)}
        aria-hidden={!open}
      >
        <div
          id="mobile-nav"
          className={cn(
            "absolute right-4 top-4 flex w-[min(21rem,calc(100vw-2rem))] flex-col rounded-[1.75rem] border border-white/12 bg-[color:var(--panel-strong)] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.45)] transition duration-300",
            open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
          )}
          onClick={(event) => event.stopPropagation()}
        >
          <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-4">
            <span className="font-mono text-[0.72rem] uppercase tracking-[0.34em] text-white">
              Romone
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="inline-flex size-10 items-center justify-center rounded-full border border-white/12 bg-white/[0.03] text-white"
              aria-label="Close navigation menu"
            >
              <X size={16} />
            </button>
          </div>
          <nav aria-label="Mobile">
            <ul className="flex flex-col gap-1">
              {items.map((item, index) => {
                const active = pathname === item.href;

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex items-center justify-between rounded-2xl px-3 py-3 text-sm font-medium transition",
                        active
                          ? "bg-cyan-300/10 text-cyan-100"
                          : "text-slate-100 hover:bg-white/[0.04]",
                      )}
                    >
                      <span>{item.label}</span>
                      <span className="text-[0.7rem] uppercase tracking-[0.22em] text-slate-500">
                        0{index + 1}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="mt-6 space-y-4 border-t border-white/10 pt-5">
            <Link
              href="/projects"
              onClick={() => setOpen(false)}
              className="inline-flex w-full items-center justify-center rounded-full border border-cyan-300/40 bg-cyan-300/12 px-4 py-3 text-sm font-medium text-cyan-100"
            >
              View Projects
            </Link>
            <div className="flex items-center gap-3 text-slate-400">
              <span className="inline-flex size-8 items-center justify-center rounded-full border border-white/10">?</span>
              <span className="inline-flex size-8 items-center justify-center rounded-full border border-white/10">in</span>
              <span className="inline-flex size-8 items-center justify-center rounded-full border border-white/10">gh</span>
              <span className="inline-flex size-8 items-center justify-center rounded-full border border-white/10">?</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

