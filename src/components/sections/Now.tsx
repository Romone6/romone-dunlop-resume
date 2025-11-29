import { Section } from "@/components/ui/section";
import { BookOpen, Briefcase, Award, Users } from "lucide-react";
import { Card } from "@/components/ui/card";

export function Now() {
    const currentFocuses = [
        {
            icon: BookOpen,
            item: "Year 11 at Hastings Secondary College – focus on Maths, Chemistry, Business"
        },
        {
            icon: Briefcase,
            item: "Co-Founder of Evergreen Landscaping (full-service residential design & maintenance)"
        },
        {
            icon: Award,
            item: "Cabinet Member – NSW Youth Advisory Council"
        },
        {
            icon: Users,
            item: "Youth sports coach – basketball, rugby, soccer"
        }
    ];

    return (
        <Section id="now" className="py-16 bg-gray-50/50 dark:bg-white/[0.02]">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-3">Now</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8 text-sm">Last updated: November 2025</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentFocuses.map((focus, index) => {
                    const Icon = focus.icon;
                    return (
                        <Card key={index} className="p-5 hover:border-accent/50 transition-all">
                            <div className="flex items-start gap-4">
                                <div className="p-2 rounded-lg bg-accent/10 flex-shrink-0">
                                    <Icon className="w-5 h-5 text-accent" />
                                </div>
                                <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
                                    {focus.item}
                                </p>
                            </div>
                        </Card>
                    );
                })}
            </div>
        </Section>
    );
}
