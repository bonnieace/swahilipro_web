import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Learn Programming in Swahili | SwahiliPro",
  description:
    "Learn programming in Swahili with interactive SwahiliPro lessons covering variables, conditions, loops, functions, logic and lists in Kiswahili.",
  keywords: [
    "learn programming in Swahili",
    "learn coding in Swahili",
    "Swahili programming course",
    "Kiswahili coding course",
    "Swahili programming for beginners",
  ],
  alternates: { canonical: "/lms" },
  openGraph: {
    title: "Learn Programming in Swahili | SwahiliPro",
    description:
      "An interactive Swahili programming course for learning core coding concepts in Kiswahili.",
    url: "https://swahilipro.com/lms",
    type: "website",
  },
};

const courseSchema = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "Learn Programming in Swahili with SwahiliPro",
  description:
    "An interactive beginner course covering programming concepts in Swahili using the SwahiliPro programming language.",
  provider: {
    "@type": "Organization",
    name: "SwahiliPro",
    url: "https://swahilipro.com",
  },
  inLanguage: ["sw", "en"],
  educationalLevel: "Beginner",
  url: "https://swahilipro.com/lms",
};

export default function LmsLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      {children}
    </>
  );
}
