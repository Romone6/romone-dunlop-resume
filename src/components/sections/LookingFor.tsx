import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Briefcase, FileText, Users, Mail } from "lucide-react";
import { RESUME_DATA } from "@/lib/data";

export function LookingFor() {
    const opportunities = [
        {
            icon: Briefcase,
            type: "Finance, Economics & Policy",
            description: "Internships or shadowing opportunities in these fields",
        },
        {
            icon: Users,
            type: "Youth Advisory & Research",
            description: "Advisory roles, research projects, or public speaking opportunities",
        }
    ];

    return (
        <Section id="looking-for" className="py-16">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-3">Looking For</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl">
                I'm seeking opportunities in these areas:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {opportunities.map((opportunity, index) => {
                    const Icon = opportunity.icon;
                    return (
                        <Card key={index} className="p-6 hover:border-accent/50 transition-all">
                            <div className="p-3 rounded-lg bg-accent/10 w-fit mb-4">
                                <Icon className="w-6 h-6 text-accent" />
                            </div>
                            <h3 className="text-lg font-bold text-foreground mb-2">{opportunity.type}</h3>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                {opportunity.description}
                            </p>
                        </Card>
                    );
                })}
            </div>

            <div className="text-center">
                <a
                    href={`mailto:${RESUME_DATA.email}?subject=Opportunity%20Inquiry&body=Hi%20Romone%2C%0A%0AI'd%20like%20to%20discuss%20an%20opportunity%20with%20you.%0A%0A`}
                    className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-white bg-accent rounded-lg hover:bg-accent/90 transition-all"
                >
                    <Mail className="w-5 h-5 mr-2" />
                    Get in Touch
                </a>
            </div>
        </Section>
    );
}
