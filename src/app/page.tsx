import { Navigation } from "@/components/ui/Navigation";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Now } from "@/components/sections/Now";
import { LookingFor } from "@/components/sections/LookingFor";
import { Experience } from "@/components/sections/Experience";
import { Leadership } from "@/components/sections/Leadership";
import { Projects } from "@/components/sections/Projects";
import { Awards } from "@/components/sections/Awards";
import { Skills } from "@/components/sections/Skills";
import { Testimonials } from "@/components/sections/Testimonials";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background text-foreground selection:bg-accent/30">
        <Hero />
        <About />
        <Now />
        <Experience />
        <Projects />
        <Leadership />
        <Awards />
        <Skills />
        <Testimonials />
        <LookingFor />
        <Contact />

        <footer className="py-6 text-center text-sm text-gray-500 dark:text-gray-400 border-t border-divider">
          <p>© {new Date().getFullYear()} Romone Dunlop. All rights reserved.</p>
        </footer>
      </main>
    </>
  );
}
