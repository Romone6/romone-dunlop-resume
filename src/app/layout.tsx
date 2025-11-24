import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { RESUME_DATA } from "@/lib/data";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const siteUrl = "https://romonedunlop.com"; // TODO: Update with actual domain

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Romone Dunlop | Student, Coach & Entrepreneur",
    template: "%s | Romone Dunlop"
  },
  description: "Year 11 student, NSW Youth Advisory Council member, Co-Founder of Evergreen Landscaping, and youth sports coach. Academic excellence meets entrepreneurial drive.",
  keywords: [
    "Romone Dunlop",
    "Port Macquarie",
    "NSW Youth Advisory Council",
    "Student Leader",
    "Evergreen Landscaping",
    "Youth Sports Coach",
    "Resume"
  ],
  authors: [{ name: "Romone Dunlop" }],
  creator: "Romone Dunlop",
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: siteUrl,
    title: "Romone Dunlop | Student, Coach & Entrepreneur",
    description: "Year 11 student, NSW Youth Advisory Council member, and Co-Founder of Evergreen Landscaping.",
    siteName: "Romone Dunlop",
    images: [
      {
        url: "/og-image.png", // TODO: Create this image
        width: 1200,
        height: 630,
        alt: "Romone Dunlop - Student, Coach & Entrepreneur"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Romone Dunlop | Student, Coach & Entrepreneur",
    description: "Year 11 student, NSW Youth Advisory Council member, and Co-Founder of Evergreen Landscaping.",
    images: ["/og-image.png"], // TODO: Create this image
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: RESUME_DATA.name,
  email: RESUME_DATA.email,
  telephone: RESUME_DATA.phone,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Port Macquarie",
    addressRegion: "NSW",
    addressCountry: "AU"
  },
  jobTitle: "Student & Entrepreneur",
  knowsAbout: [
    "Youth Leadership",
    "Sports Coaching",
    "Customer Service",
    "Business Management",
    "Youth Advocacy"
  ],
  affiliation: [
    {
      "@type": "Organization",
      name: "NSW Youth Advisory Council (Ministry for Youth)"
    },
    {
      "@type": "Organization",
      name: "Evergreen Landscaping"
    }
  ],
  alumniOf: {
    "@type": "EducationalOrganization",
    name: "Hastings Secondary College, Port Macquarie"
  },
  // TODO: Add LinkedIn and other social profiles when available
  // sameAs: [
  //   "https://linkedin.com/in/romonedunlop",
  //   "https://twitter.com/romonedunlop"
  // ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} antialiased bg-background text-foreground font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
