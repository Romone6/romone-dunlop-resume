import { RESUME_DATA } from "@/lib/data";
import { Section } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Trophy } from "lucide-react";

export function Skills() {
    return (
        <Section id="skills">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Awards */}
                <div>
                    <h2 className="text-3xl font-bold font-heading mb-8">Awards</h2>
                    <div className="space-y-4">
                        {RESUME_DATA.awards.map((award, index) => (
                            <Card key={index} className="flex items-start p-4 gap-4">
                                <Trophy className="w-5 h-5 text-accent shrink-0 mt-1" />
                                <p className="text-gray-700 dark:text-gray-200 font-medium">{award}</p>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Skills */}
                <div>
                    <h2 className="text-3xl font-bold font-heading mb-8">Skills</h2>
                    <div className="flex flex-wrap gap-2">
                        {RESUME_DATA.skills.map((skill, index) => (
                            <Badge key={index} className="text-base py-2 px-4">
                                {skill}
                            </Badge>
                        ))}
                    </div>
                </div>
            </div>
        </Section>
    );
}
