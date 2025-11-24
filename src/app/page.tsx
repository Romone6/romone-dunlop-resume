import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Leadership } from "@/components/sections/Leadership";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Testimonials } from "@/components/sections/Testimonials";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-accent/30">
      <Hero />
      <About />
      <Experience />
      <Leadership />
      <Projects />
      <Skills />
      <Testimonials />
      <Contact />

      <footer className="py-6 text-center text-sm text-gray-500 dark:text-gray-400 border-t border-divider">
        <p>© {new Date().getFullYear()} Romone Dunlop. All rights reserved.</p>
      </footer>
    </main>
  );
}
