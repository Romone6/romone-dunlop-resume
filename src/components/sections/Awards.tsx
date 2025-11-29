import { RESUME_DATA } from "@/lib/data";
import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Award, Users, Trophy } from "lucide-react";

export function Awards() {
    const awards = [
        {
            icon: Users,
            title: "NSW Youth Advisory Council",
            description: "Selected from 220+ applicants (2025)",
            category: "Leadership"
        },
        {
            icon: Award,
            title: "Academic Scholarships",
            description: "Recognised for excellence and leadership (Hastings Secondary)",
            category: "Academic"
        },
        {
            icon: Trophy,
            title: "Three-Sport State Athlete",
            description: "Basketball, rugby union, and soccer",
            category: "Athletic"
        }
    ];

    return (
        <Section id="awards" className="py-16 bg-gray-50/50 dark:bg-white/[0.02]">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-8">Awards</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {awards.map((award, index) => {
                    const Icon = award.icon;
                    return (
                        <Card key={index} className="p-6 hover:border-accent/50 transition-all group">
                            <div className="p-3 rounded-lg bg-accent/10 w-fit mb-4 group-hover:scale-110 transition-transform">
                                <Icon className="w-7 h-7 text-accent" />
                            </div>
                            <div className="text-xs font-semibold text-accent uppercase tracking-wider mb-2">
                                {award.category}
                            </div>
                            <h3 className="text-lg font-bold text-foreground mb-2 leading-tight">{award.title}</h3>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">
                                {award.description}
                            </p>
                        </Card>
                    );
                })}
            </div>
        </Section>
    );
}
