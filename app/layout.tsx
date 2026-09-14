import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";

import "./globals.css";

export const metadata: Metadata = {
  title: "SwahiliPro — Program in Swahili",
  description:
    "A Swahili-first programming language with a VS Code extension and standalone CLI for Windows, Linux and macOS.",
  openGraph: {
    title: "SwahiliPro — Program in Swahili",
    description:
      "Write real programs with familiar structure and human-readable Swahili commands.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="relative antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
