import { RESUME_DATA } from "@/lib/data";
import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";

export function Projects() {
    const project = RESUME_DATA.experience.find((e) => e.org === "Evergreen Landscaping");
    if (!project) return null;

    return (
        <Section id="projects">
            <h2 className="text-3xl font-bold font-heading mb-8">Venture</h2>
            <Card className="bg-gradient-to-br from-white to-gray-50 dark:from-white/5 dark:to-white/[0.02] border-accent/20">
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                        <div>
                            <h3 className="text-2xl font-bold">{project.org}</h3>
                            <p className="text-accent font-medium">{project.role}</p>
                        </div>
                        <span className="text-sm text-gray-500 font-mono">{project.dates}</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="p-4 rounded-lg bg-background/50 border border-divider">
                            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Revenue</p>
                            <p className="text-xl font-bold text-green-600 dark:text-green-400">$16,000+</p>
                            <p className="text-xs text-gray-500">in 12 months</p>
                        </div>
                        <div className="p-4 rounded-lg bg-background/50 border border-divider">
                            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Services</p>
                            <p className="text-lg font-semibold">Design & Build</p>
                            <p className="text-xs text-gray-500">Residential Landscaping</p>
                        </div>
                        <div className="p-4 rounded-lg bg-background/50 border border-divider">
                            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Focus</p>
                            <p className="text-lg font-semibold">Growth</p>
                            <p className="text-xs text-gray-500">Client Acquisition</p>
                        </div>
                    </div>

                    <ul className="list-disc list-outside ml-5 space-y-1 text-gray-600 dark:text-gray-300">
                        {project.bullets.map((bullet, i) => (
                            <li key={i}>{bullet}</li>
                        ))}
                    </ul>
                </div>
            </Card>
        </Section>
    );
}
