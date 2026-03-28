import type { Metadata } from "next";
import { Manrope, Newsreader, Space_Mono } from "next/font/google";

import { Footer } from "@/components/site/footer";
import { Navbar } from "@/components/site/navbar";
import { OptionalAnalytics } from "@/components/site/optional-analytics";
import { siteConfig } from "@/content/site";

import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  weight: ["400", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.person.url),
  title: {
    default: siteConfig.seo.titleTemplate,
    template: `%s | ${siteConfig.person.shortName}`,
  },
  description: siteConfig.seo.defaultDescription,
  openGraph: {
    title: siteConfig.seo.titleTemplate,
    description: siteConfig.seo.defaultDescription,
    type: "website",
    siteName: siteConfig.person.fullName,
    images: [
      {
        url: "/og/og-default.svg",
        width: 1200,
        height: 630,
        alt: "Romone personal website",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.seo.titleTemplate,
    description: siteConfig.seo.defaultDescription,
    images: ["/og/og-default.svg"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${manrope.variable} ${spaceMono.variable} ${newsreader.variable} antialiased`}
      >
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1 pt-16">{children}</main>
          <Footer />
        </div>
        <OptionalAnalytics />
      </body>
    </html>
  );
}
