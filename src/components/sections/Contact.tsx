import { RESUME_DATA } from "@/lib/data";
import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Mail, Phone } from "lucide-react";

export function Contact() {
    return (
        <Section id="contact" className="mb-12">
            <h2 className="text-3xl font-bold font-heading mb-8">Get in Touch</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-6">
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                        I am available for new opportunities. Feel free to reach out via email or phone.
                    </p>
                    <div className="space-y-4">
                        <a href={`mailto:${RESUME_DATA.email}`} className="flex items-center gap-3 text-lg font-medium hover:text-accent transition-colors">
                            <div className="p-2 bg-accent/10 rounded-full text-accent">
                                <Mail className="w-5 h-5" />
                            </div>
                            {RESUME_DATA.email}
                        </a>
                        <a href={`tel:${RESUME_DATA.phone}`} className="flex items-center gap-3 text-lg font-medium hover:text-accent transition-colors">
                            <div className="p-2 bg-accent/10 rounded-full text-accent">
                                <Phone className="w-5 h-5" />
                            </div>
                            {RESUME_DATA.phone}
                        </a>
                    </div>
                </div>

                <Card className="p-6">
                    {/* TODO: Sign up at https://formspree.io and replace YOUR_FORM_ID below */}
                    <form className="space-y-4" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
                        <div className="space-y-2">
                            <label htmlFor="name" className="text-sm font-medium">Name</label>
                            <input
                                id="name"
                                name="name"
                                required
                                className="w-full px-3 py-2 rounded-md border border-divider bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                                placeholder="Your Name"
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium">Email</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                className="w-full px-3 py-2 rounded-md border border-divider bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                                placeholder="your@email.com"
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="message" className="text-sm font-medium">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                required
                                rows={4}
                                className="w-full px-3 py-2 rounded-md border border-divider bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                                placeholder="How can I help?"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full py-2 px-4 bg-accent text-white font-medium rounded-md hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent"
                        >
                            Send Message
                        </button>
                    </form>
                </Card>
            </div>
        </Section>
    );
}
