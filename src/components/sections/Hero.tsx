import { RESUME_DATA } from "@/lib/data";
import { Section } from "@/components/ui/section";
import { Mail, MapPin } from "lucide-react";
import { DownloadButton } from "@/components/ui/download-button";

export function Hero() {
    return (
        <Section className="flex flex-col items-start justify-center min-h-[80vh] space-y-8 pt-24 md:pt-32">
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter font-heading text-foreground">
                    {RESUME_DATA.name}
                </h1>
                <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed">
                    {RESUME_DATA.tagline_options[0]}
                </p>
                <div className="flex items-center text-gray-500 dark:text-gray-400 pt-2">
                    <MapPin className="w-4 h-4 mr-2" />
                    {RESUME_DATA.location}
                </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200 fill-mode-backwards items-start">
                <DownloadButton />
                <a
                    href="#contact"
                    className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-gray-900 bg-gray-100 rounded-lg hover:bg-gray-200 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 transition-colors"
                >
                    <Mail className="w-5 h-5 mr-2" />
                    Contact Me
                </a>
            </div>
        </Section>
    );
}
