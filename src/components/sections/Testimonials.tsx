import { RESUME_DATA } from "@/lib/data";
import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Quote } from "lucide-react";

export function Testimonials() {
    const testimonials = [
        {
            name: RESUME_DATA.references[0].name,
            role: RESUME_DATA.references[0].relation,
            quote: "Romone has been an exceptional business partner. His work ethic, attention to detail, and ability to manage client relationships has been instrumental in growing Evergreen Landscaping to over $16,000 in revenue. He shows up on time, follows through on commitments, and brings creative solutions to every project. Any employer would be lucky to have him on their team.",
            phone: RESUME_DATA.references[0].phone
        },
        {
            name: RESUME_DATA.references[1].name,
            role: RESUME_DATA.references[1].relation,
            quote: "I've had the privilege of watching Romone develop into a natural leader. His commitment to youth advocacy, combined with his entrepreneurial drive and academic excellence, sets him apart. He listens carefully, thinks critically, and acts with integrity. Romone represents the very best of what young Australians can achieve when given opportunity and support.",
            phone: RESUME_DATA.references[1].phone
        }
    ];

    return (
        <Section id="testimonials">
            <h2 className="text-3xl font-bold font-heading mb-8">References</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {testimonials.map((testimonial, index) => (
                    <Card key={index} className="p-6 transition-all hover:border-accent/50">
                        <Quote className="w-8 h-8 text-accent mb-4 opacity-50" />
                        <p className="text-gray-600 dark:text-gray-300 italic mb-6 leading-relaxed">
                            &ldquo;{testimonial.quote}&rdquo;
                        </p>
                        <div className="border-t border-divider pt-4">
                            <p className="font-bold text-foreground">{testimonial.name}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                            <a
                                href={`tel:${testimonial.phone}`}
                                className="text-sm text-accent hover:underline mt-1 inline-block"
                            >
                                {testimonial.phone}
                            </a>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Request Reference Letter CTA */}
            <div className="mt-8 text-center">
                <a
                    href={`mailto:${RESUME_DATA.email}?subject=Reference%20Letter%20Request&body=Hello%2C%0A%0AI%20am%20interested%20in%20requesting%20a%20reference%20letter.%20Please%20let%20me%20know%20the%20process.%0A%0AThank%20you.`}
                    className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 border border-divider rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                >
                    Request Reference Letter
                </a>
            </div>
        </Section>
    );
}
