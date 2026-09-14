import type { Metadata } from "next";
import { ArrowRight, BookOpen } from "lucide-react";

import Navbar from "@/components/navbar";

export const metadata: Metadata = {
  title: "Swahili Programming Blog | SwahiliPro",
  description:
    "Articles about Swahili programming, coding in Kiswahili, programming education and the SwahiliPro language.",
  alternates: { canonical: "/blog" },
};

const posts = [
  {
    title: "What is a Swahili programming language?",
    description:
      "A practical explanation of programming in Swahili, what changes, what stays familiar and where SwahiliPro fits.",
    href: "/blog/what-is-a-swahili-programming-language",
    tag: "Swahili programming",
  },
  {
    title: "Why learn programming in a language you already think in?",
    description:
      "How language accessibility can help first-time learners focus on programming concepts instead of vocabulary friction.",
    href: "/lms",
    tag: "Learning",
  },
  {
    title: "From Kiswahili lessons to modern developer tools",
    description:
      "See how the SwahiliPro learning path connects Swahili-first education to VS Code, the CLI and real .swa programs.",
    href: "/docs",
    tag: "Developer tools",
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[#fffaf5] text-stone-900">
      <Navbar />
      <header className="border-b border-emerald-950/10 bg-gradient-to-br from-rose-100 via-[#fffaf5] to-teal-100">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-950/10 bg-white/70 px-3.5 py-2 text-xs font-bold uppercase tracking-[0.18em] text-emerald-800">
            <BookOpen className="h-3.5 w-3.5" /> SwahiliPro journal
          </div>
          <h1 className="mt-6 max-w-4xl text-5xl font-black tracking-[-0.045em] text-stone-950 sm:text-6xl">
            Swahili programming, learning and the ideas behind the language.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-stone-700">
            Guides and stories about programming in Swahili, coding education in Kiswahili and the tools being built around SwahiliPro.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-5 lg:grid-cols-3">
          {posts.map((post, index) => (
            <article key={post.title} className={`flex min-h-[330px] flex-col justify-between rounded-[1.8rem] border border-stone-900/10 p-7 shadow-lg shadow-stone-900/5 ${index === 0 ? "bg-emerald-800 text-white" : "bg-white"}`}>
              <div>
                <span className={`text-xs font-black uppercase tracking-[0.16em] ${index === 0 ? "text-emerald-100" : "text-rose-600"}`}>{post.tag}</span>
                <h2 className="mt-4 text-3xl font-black tracking-[-0.03em]">{post.title}</h2>
                <p className={`mt-4 leading-7 ${index === 0 ? "text-emerald-50" : "text-stone-600"}`}>{post.description}</p>
              </div>
              <a className={`mt-8 inline-flex items-center gap-2 text-sm font-bold ${index === 0 ? "text-white" : "text-emerald-800"}`} href={post.href}>Read more <ArrowRight className="h-4 w-4" /></a>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
