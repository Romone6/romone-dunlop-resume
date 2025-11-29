import { RESUME_DATA } from "@/lib/data";
import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";

export function Skills() {
    const skillGroups = [
        {
            category: "Leadership & Coaching",
            skills: [
                "Leadership & team management",
                "Certified youth sports coaching"
            ]
        },
        {
            category: "Operations & Service",
            skills: [
                "Customer service excellence",
                "Operations coordination",
                "Problem-solving & adaptability"
            ]
        },
        {
            category: "Business & Finance",
            skills: [
                "Business planning",
                "Financial management"
            ]
        }
    ];

    return (
        <Section id="skills" className="py-16">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-8">Skills</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {skillGroups.map((group, index) => (
                    <Card key={index} className="p-6 hover:border-accent/50 transition-all">
                        <h3 className="text-lg font-bold text-foreground mb-4 border-b border-divider pb-2">
                            {group.category}
                        </h3>
                        <ul className="space-y-2">
                            {group.skills.map((skill, skillIndex) => (
                                <li key={skillIndex} className="text-gray-600 dark:text-gray-300 flex items-start">
                                    <span className="text-accent mr-2 mt-1">•</span>
                                    <span>{skill}</span>
                                </li>
                            ))}
                        </ul>
                    </Card>
                ))}
            </div>
        </Section>
    );
}
