import { RESUME_DATA } from "@/lib/data";
import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";

export function Experience() {
    return (
        <Section id="experience" className="py-16">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-12">Experience</h2>
            <div className="relative border-l border-divider ml-3 md:ml-6 space-y-12 pl-8 md:pl-12">
                {RESUME_DATA.experience.map((role, index) => {
                    // For Evergreen, show minimal info (detailed in Venture section)
                    const isEvergreen = role.org === "Evergreen Landscaping";
                    const displayBullets = isEvergreen ? role.bullets.slice(0, 2) : role.bullets;

                    return (
                        <div key={index} className="relative">
                            {/* Timeline dot */}
                            <div className="absolute -left-[42px] md:-left-[58px] top-6 h-5 w-5 rounded-full border-4 border-background bg-accent" />

                            <Card className="flex flex-col gap-4 transition-all hover:border-accent/50">
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                                    <div>
                                        <h3 className="text-xl font-bold text-foreground">{role.role}</h3>
                                        <p className="text-base text-gray-600 dark:text-gray-400 font-medium">{role.org}</p>
                                    </div>
                                    <span className="text-sm text-gray-500 dark:text-gray-500 font-mono bg-gray-100 dark:bg-white/5 px-2 py-1 rounded w-fit">
                                        {role.dates}
                                    </span>
                                </div>
                                <ul className="list-disc list-outside ml-5 space-y-1 text-gray-600 dark:text-gray-300">
                                    {displayBullets.map((bullet, i) => (
                                        <li key={i}>{bullet}</li>
                                    ))}
                                </ul>
                                {isEvergreen && (
                                    <p className="text-sm text-accent italic">
                                        → See full details in <a href="#projects" className="underline hover:text-accent/80">Venture section</a>
                                    </p>
                                )}
                            </Card>
                        </div>
                    );
                })}
            </div>
        </Section>
    );
}
