import type { Metadata } from "next";

import { siteConfig } from "@/content/site";

type MetadataInput = {
  title: string;
  description: string;
  path?: string;
};

export function buildMetadata({
  title,
  description,
  path = "/",
}: MetadataInput): Metadata {
  const url = new URL(path, siteConfig.person.url).toString();

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.person.fullName,
      type: "website",
      images: [
        {
          url: "/og/og-default.svg",
          width: 1200,
          height: 630,
          alt: `${siteConfig.person.fullName} website open graph image`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og/og-default.svg"],
    },
  };
}
