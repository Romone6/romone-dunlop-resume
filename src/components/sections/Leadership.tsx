import { RESUME_DATA } from "@/lib/data";
import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";

export function Leadership() {
    return (
        <Section id="leadership" className="py-16 bg-gray-50/50 dark:bg-white/[0.02]">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-8">Leadership & Coaching</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Leadership Column */}
                <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">Leadership</h3>
                    {RESUME_DATA.leadership.map((item, index) => (
                        <Card key={index} className="transition-all hover:border-accent/50 hover:scale-[1.02]">
                            <h4 className="text-xl font-bold text-foreground">{item.title}</h4>
                            <p className="text-gray-600 dark:text-gray-400 mt-1 font-medium">{item.org}</p>
                            <p className="text-gray-700 dark:text-gray-300 mt-3 leading-relaxed text-sm">
                                • {(item as any).outcome}
                            </p>
                            <div className="flex items-center gap-2 mt-3">
                                <span className="text-xs font-mono text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-white/5 px-2 py-1 rounded">
                                    {item.dates}
                                </span>
                                <span className="text-xs font-semibold px-2 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300">
                                    Active
                                </span>
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Coaching Column */}
                <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">Sports Coaching</h3>
                    <Card className="h-full transition-all hover:border-accent/50">
                        <p className="text-xs font-mono text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-white/5 px-2 py-1 rounded w-fit mb-4">
                            2023 – Present
                        </p>
                        <ul className="space-y-3 mb-4">
                            {RESUME_DATA.coaching.filter((c: any) => c.sport).map((item: any, index: number) => (
                                <li key={index} className="text-gray-700 dark:text-gray-200 leading-relaxed">
                                    <span className="font-semibold text-foreground">{item.sport}</span> – {item.description}
                                </li>
                            ))}
                        </ul>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm border-t border-divider pt-4">
                            • {(RESUME_DATA.coaching.find((c: any) => c.general) as any)?.general}
                        </p>
                    </Card>
                </div>
            </div>
        </Section>
    );
}
