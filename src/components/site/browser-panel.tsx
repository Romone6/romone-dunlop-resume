import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type BrowserPanelProps = {
  children: ReactNode;
  className?: string;
};

export function BrowserPanel({ children, className }: BrowserPanelProps) {
  return (
    <section className={cn("surface-frame rounded-[2rem] px-6 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12", className)}>
      {children}
    </section>
  );
}
