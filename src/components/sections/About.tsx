import { Section } from "@/components/ui/section";

export function About() {
    return (
        <Section id="about" className="py-16">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6">About Me</h2>
            <div className="max-w-3xl">
                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                    I'm a Year 12 student at Hastings Secondary College who believes in discipline, results, and action.
                    Through roles on the NSW Youth Advisory Council and as a Crew Trainer at McDonald's, I've learned
                    to lead by example and execute with precision. I build useful things, coach youth athletes, and
                    strive for excellence in everything I commit to.
                </p>
            </div>
        </Section>
    );
}
