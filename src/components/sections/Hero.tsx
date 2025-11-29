import { RESUME_DATA } from "@/lib/data";
import { Section } from "@/components/ui/section";
import { Mail, MapPin, Download, ArrowRight } from "lucide-react";

export function Hero() {
    return (
        <Section className="flex flex-col items-start justify-center min-h-[90vh] space-y-8 pt-32 md:pt-40 pb-16 relative overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent pointer-events-none" />

            <div className="relative z-10 w-full max-w-4xl">
                {/* Location */}
                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm md:text-base">{RESUME_DATA.location}</span>
                </div>

                {/* Name */}
                <h1 className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tighter font-heading text-foreground leading-none mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    {RESUME_DATA.name}
                </h1>

                {/* New tagline */}
                <p className="text-xl md:text-2xl lg:text-3xl text-gray-700 dark:text-gray-200 leading-tight font-medium mb-6 animate-in fade-in slide-in-from-bottom-6 duration-900 delay-100 fill-mode-backwards">
                    Year 11 student building real businesses, coaching youth sport, and shaping policy in NSW.
                </p>

                {/* Stats row */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-base md:text-lg text-gray-600 dark:text-gray-300 mb-10 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200 fill-mode-backwards">
                    <span className="font-semibold">Age 16</span>
                    <span className="text-gray-400">·</span>
                    <span>Co-Founder, Evergreen Landscaping <span className="text-green-600 dark:text-green-400 font-semibold">($16k+ revenue)</span></span>
                    <span className="text-gray-400 hidden sm:inline">·</span>
                    <span className="font-medium">NSW Youth Advisory Council – Cabinet Member</span>
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-4 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300 fill-mode-backwards">
                    <a
                        href="#experience"
                        className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-accent rounded-xl hover:bg-accent/90 transition-all hover:scale-105 shadow-lg shadow-accent/20"
                    >
                        View my work & ventures
                        <ArrowRight className="w-5 h-5 ml-2" />
                    </a>
                    <a
                        href="/Romone_Dunlop_Resume.pdf"
                        download
                        className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-gray-900 bg-white dark:bg-white/10 dark:text-white rounded-xl hover:bg-gray-50 dark:hover:bg-white/15 transition-all border-2 border-divider hover:border-accent/50"
                    >
                        <Download className="w-5 h-5 mr-2" />
                        Download resume
                    </a>
                </div>
            </div>
        </Section>
    );
}
