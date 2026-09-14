import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/react";

import "./globals.css";

const siteUrl = "https://swahilipro.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Swahilipro | Swahili programming language",
  description:
    "Swahilipro is a Swahili programming language for learning programming, writing code in Kiswahili, and building software with modern developer tools.",
  keywords: [
    "Swahili programming language",
    "programming in Swahili",
    "coding in Swahili",
    "Kiswahili programming language",
    "learn programming in Swahili",
    "learn coding in Swahili",
    "Swahili code",
    "Swahili compiler",
    "African programming language",
  ],
  icons: {
    icon: [{ url: "/swahilipro-icon.svg", type: "image/svg+xml" }],
    shortcut: "/swahilipro-icon.svg",
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "Swahilipro | Swahili programming language",
    description:
      "Learn programming and write real software in Swahili with Swahilipro, a modern Kiswahili programming language and developer platform.",
    url: siteUrl,
    siteName: "Swahilipro",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Swahilipro | Swahili programming language",
    description:
      "Learn programming and write real software in Swahili with Swahilipro.",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Swahilipro",
      description:
        "A Swahili programming language and learning platform for coding in Kiswahili.",
      inLanguage: ["en", "sw"],
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${siteUrl}/#software`,
      name: "Swahilipro",
      url: siteUrl,
      image: `${siteUrl}/swahilipro-logo.png`,
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Windows, Linux, macOS",
      description:
        "Swahilipro is a Swahili programming language for learning programming and building software using Swahili commands with familiar programming structure.",
    },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="relative antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
