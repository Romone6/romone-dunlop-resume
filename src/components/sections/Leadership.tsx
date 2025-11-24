import { RESUME_DATA } from "@/lib/data";
import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function Leadership() {
    return (
        <Section id="leadership">
            <h2 className="text-3xl font-bold font-heading mb-8">Leadership & Coaching</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Leadership Column */}
                <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Leadership</h3>
                    {RESUME_DATA.leadership.map((item, index) => (
                        <Card key={index} className="transition-all hover:border-accent/50">
                            <h4 className="text-lg font-bold">{item.title}</h4>
                            <p className="text-gray-600 dark:text-gray-400">{item.org}</p>
                            <p className="text-sm text-gray-500 mt-2 font-mono">{item.dates}</p>
                        </Card>
                    ))}
                </div>

                {/* Coaching Column */}
                <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Sports Coaching</h3>
                    <Card className="h-full transition-all hover:border-accent/50">
                        <div className="flex flex-wrap gap-2 mb-4">
                            {RESUME_DATA.coaching.filter((c) => "sport" in c).map((item, index) => (
                                <Badge key={index} className="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800">
                                    {(item as any).sport}
                                </Badge>
                            ))}
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                            {RESUME_DATA.coaching.find((c) => "notes" in c)?.notes}
                        </p>
                        <p className="text-sm text-gray-500 font-mono">2023 – Present</p>
                    </Card>
                </div>
            </div>
        </Section>
    );
}
