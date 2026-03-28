import Link from "next/link";

import { siteConfig } from "@/content/site";

import { Container } from "./container";

export function Footer() {
  return (
    <footer className="border-t border-white/10 py-8">
      <Container className="flex flex-col gap-4 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {siteConfig.person.fullName}. Built with
          deliberate systems.
        </p>
        <div className="flex items-center gap-4">
          <Link href="/projects" className="transition hover:text-white">
            Projects
          </Link>
          <Link href="/contact" className="transition hover:text-white">
            Contact
          </Link>
        </div>
      </Container>
    </footer>
  );
}
