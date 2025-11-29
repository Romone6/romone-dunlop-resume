"use client";

import { useState, useEffect } from "react";
import { Menu, X, Download, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
    { href: "#about", label: "About" },
    { href: "#experience", label: "Experience" },
    { href: "#projects", label: "Venture" },
    { href: "#leadership", label: "Leadership" },
    { href: "#awards", label: "Awards" },
    { href: "#testimonials", label: "References" },
];

export function Navigation() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("");

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 100);

            // Determine active section
            const sections = navLinks.map(link => link.href.substring(1));
            const current = sections.find(section => {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    return rect.top <= 150 && rect.bottom >= 150;
                }
                return false;
            });

            if (current) {
                setActiveSection(`#${current}`);
            }
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll(); // Check on mount
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        setIsMobileMenuOpen(false);

        const targetId = href.substring(1);
        const element = document.getElementById(targetId);

        if (element) {
            const offset = 80; // Account for sticky nav height
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    };

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                isScrolled
                    ? "bg-background/80 backdrop-blur-xl border-b border-divider shadow-sm"
                    : "bg-transparent"
            )}
        >
            <div className="max-w-7xl mx-auto px-4 md:px-6">
                <div className="flex items-center justify-between h-16 md:h-20">
                    {/* Logo/Name */}
                    <a
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            window.scrollTo({ top: 0, behavior: "smooth" });
                            setIsMobileMenuOpen(false);
                        }}
                        className="text-xl md:text-2xl font-bold font-heading text-foreground hover:text-accent transition-colors"
                    >
                        Romone Dunlop
                    </a>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                onClick={(e) => handleClick(e, link.href)}
                                className={cn(
                                    "px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                                    activeSection === link.href
                                        ? "text-accent bg-accent/10"
                                        : "text-gray-600 dark:text-gray-300 hover:text-foreground hover:bg-gray-100 dark:hover:bg-white/5"
                                )}
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>

                    {/* Desktop CTAs */}
                    <div className="hidden lg:flex items-center gap-3">
                        <a
                            href="#contact"
                            onClick={(e) => handleClick(e, "#contact")}
                            className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-foreground transition-colors"
                        >
                            <Mail className="w-4 h-4 mr-2" />
                            Contact
                        </a>
                        <a
                            href="/Romone_Dunlop_Resume.pdf"
                            download
                            className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-accent rounded-lg hover:bg-accent/90 transition-colors"
                        >
                            <Download className="w-4 h-4 mr-2" />
                            Resume
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="lg:hidden p-2 text-foreground hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg transition-colors"
                        aria-label="Toggle menu"
                    >
                        {isMobileMenuOpen ? (
                            <X className="w-6 h-6" />
                        ) : (
                            <Menu className="w-6 h-6" />
                        )}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="lg:hidden border-t border-divider py-4 space-y-2">
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                onClick={(e) => handleClick(e, link.href)}
                                className={cn(
                                    "block px-4 py-2 text-base font-medium rounded-lg transition-colors",
                                    activeSection === link.href
                                        ? "text-accent bg-accent/10"
                                        : "text-gray-600 dark:text-gray-300 hover:text-foreground hover:bg-gray-100 dark:hover:bg-white/5"
                                )}
                            >
                                {link.label}
                            </a>
                        ))}
                        <div className="border-t border-divider pt-4 mt-4 space-y-2">
                            <a
                                href="#contact"
                                onClick={(e) => handleClick(e, "#contact")}
                                className="flex items-center px-4 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-foreground hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg transition-colors"
                            >
                                <Mail className="w-5 h-5 mr-2" />
                                Contact
                            </a>
                            <a
                                href="/Romone_Dunlop_Resume.pdf"
                                download
                                className="flex items-center justify-center px-4 py-2.5 text-base font-medium text-white bg-accent rounded-lg hover:bg-accent/90 transition-colors"
                            >
                                <Download className="w-5 h-5 mr-2" />
                                Download Resume
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
