import { RESUME_DATA } from "@/lib/data";
import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { TrendingUp, Users, Target } from "lucide-react";

export function Projects() {
    const project = RESUME_DATA.experience.find((e) => e.org === "Evergreen Landscaping");
    if (!project) return null;

    return (
        <Section id="projects" className="py-16">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl md:text-4xl font-bold font-heading">Venture</h2>
                <span className="text-sm font-semibold px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300">
                    Active
                </span>
            </div>

            <Card className="bg-gradient-to-br from-white to-gray-50 dark:from-white/5 dark:to-white/[0.02] border-accent/20 hover:border-accent/50 transition-all">
                <div className="flex flex-col gap-8">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                        <div>
                            <h3 className="text-2xl md:text-3xl font-bold">{project.org}</h3>
                            <p className="text-accent font-semibold text-lg mt-1">{project.role}</p>
                        </div>
                        <span className="text-sm text-gray-500 dark:text-gray-400 font-mono">{project.dates}</span>
                    </div>

                    {/* Key Metrics Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        {/* Revenue */}
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                                <TrendingUp className="w-5 h-5" />
                                <p className="text-sm font-semibold uppercase tracking-wider">Revenue</p>
                            </div>
                            <p className="text-3xl font-bold text-green-600 dark:text-green-400">$16,000+</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">in the first 12 months</p>
                        </div>

                        {/* Services */}
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-accent">
                                <Users className="w-5 h-5" />
                                <p className="text-sm font-semibold uppercase tracking-wider">Services</p>
                            </div>
                            <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-200">
                                <li>• Residential garden design</li>
                                <li>• Lawn care and maintenance</li>
                                <li>• Small landscape builds</li>
                            </ul>
                        </div>

                        {/* Focus */}
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-accent">
                                <Target className="w-5 h-5" />
                                <p className="text-sm font-semibold uppercase tracking-wider">Focus</p>
                            </div>
                            <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-200">
                                <li>• Growth and client acquisition</li>
                                <li>• Reliable, high-quality service</li>
                            </ul>
                        </div>
                    </div>

                    {/* Bullet points removed to avoid duplication with Experience section */}
                    <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                        See <a href="#experience" className="text-accent underline hover:text-accent/80">Experience section</a> for detailed role responsibilities.
                    </p>
                </div>
            </Card>
        </Section>
    );
}
