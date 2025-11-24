import { Section } from "@/components/ui/section";

export function About() {
    return (
        <Section id="about" className="py-12">
            <h2 className="text-3xl font-bold font-heading mb-6">About Me</h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl">
                I am a Year 11 student at Hastings Secondary College with a focus on academic excellence and practical leadership.
                As a Crew Trainer at McDonald’s and Co-Founder of Evergreen Landscaping, I balance rigorous work ethic with entrepreneurial drive.
                My experience spans youth advocacy on the NSW Youth Advisory Council and coaching multiple sports teams, where I apply
                discipline and strategy to achieve results. I am committed to building useful things and leading by example.
            </p>
        </Section>
    );
}
