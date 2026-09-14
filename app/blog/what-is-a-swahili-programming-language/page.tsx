import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";

import Navbar from "@/components/navbar";

export const metadata: Metadata = {
  title: "What Is a Swahili Programming Language? | SwahiliPro",
  description:
    "Learn what a Swahili programming language is, how coding in Kiswahili works, and how SwahiliPro combines Swahili commands with familiar programming structure.",
  alternates: { canonical: "/blog/what-is-a-swahili-programming-language" },
  openGraph: {
    title: "What Is a Swahili Programming Language? | SwahiliPro",
    description:
      "A practical guide to programming in Swahili and the ideas behind SwahiliPro.",
    type: "article",
    url: "https://swahilipro.com/blog/what-is-a-swahili-programming-language",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  headline: "What Is a Swahili Programming Language?",
  description:
    "A practical guide to programming in Swahili and how SwahiliPro combines Swahili commands with familiar programming structure.",
  mainEntityOfPage: "https://swahilipro.com/blog/what-is-a-swahili-programming-language",
  author: { "@type": "Organization", name: "SwahiliPro" },
  publisher: { "@type": "Organization", name: "SwahiliPro" },
};

export default function ArticlePage() {
  return (
    <div className="min-h-screen bg-[#fffaf5] text-stone-900">
      <Navbar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <article>
        <header className="border-b border-emerald-950/10 bg-gradient-to-br from-rose-100 via-[#fffaf5] to-teal-100">
          <div className="mx-auto max-w-4xl px-5 py-16 sm:px-6 lg:py-20">
            <a className="text-sm font-bold text-emerald-800" href="/blog">← SwahiliPro blog</a>
            <h1 className="mt-6 text-5xl font-black tracking-[-0.045em] text-stone-950 sm:text-6xl">
              What is a Swahili programming language?
            </h1>
            <p className="mt-6 text-xl leading-9 text-stone-700">
              A Swahili programming language lets people express parts of program logic using Swahili words instead of requiring every readable command to be English. The important part is not simply translating keywords; it is preserving the programming concepts learners need while making the language around those concepts more familiar.
            </p>
          </div>
        </header>

        <div className="mx-auto max-w-4xl px-5 py-14 sm:px-6">
          <div className="space-y-10 text-lg leading-9 text-stone-700">
            <section>
              <h2 className="text-3xl font-black tracking-[-0.03em] text-stone-950">Programming concepts do not belong to one spoken language</h2>
              <p className="mt-4">Variables, conditions, loops, functions and data structures are programming ideas. Most popular languages happen to describe many of those ideas with English words, but the concepts themselves are not English. That creates room for languages such as SwahiliPro to make those concepts readable in Kiswahili without removing the underlying structure.</p>
            </section>

            <section>
              <h2 className="text-3xl font-black tracking-[-0.03em] text-stone-950">What coding in Swahili looks like</h2>
              <p className="mt-4">In SwahiliPro, human-readable commands are Swahili while braces, operators, function calls and other common programming structures remain familiar.</p>
              <pre className="mt-5 overflow-x-auto rounded-2xl bg-stone-950 p-6 text-sm leading-7 text-stone-200"><code>{`acha jina = "Amina"\n\nikiwa (jina == "Amina") {\n  andika("Karibu, " + jina)\n}`}</code></pre>
              <p className="mt-4">Here, <code className="font-mono font-semibold text-emerald-800">acha</code> introduces a variable, <code className="font-mono font-semibold text-emerald-800">ikiwa</code> expresses a condition and <code className="font-mono font-semibold text-emerald-800">andika</code> produces output. The block and comparison syntax remains recognizable to someone who later works with other mainstream languages.</p>
            </section>

            <section>
              <h2 className="text-3xl font-black tracking-[-0.03em] text-stone-950">Why build a programming language in Swahili?</h2>
              <p className="mt-4">For a first-time learner, programming already introduces many unfamiliar ideas at once. When the teaching language and the programming vocabulary are both unfamiliar, that cognitive load can increase. A Swahili-first learning environment can help some learners reason about the concept in a language they already use, while still practising the same logical thinking.</p>
              <p className="mt-4">This is also why SwahiliPro connects its language work to SDG 4 and the broader goal of more inclusive access to quality education. The aim is not to isolate learners from the global developer ecosystem, but to give them another entry point into it.</p>
            </section>

            <section>
              <h2 className="text-3xl font-black tracking-[-0.03em] text-stone-950">SwahiliPro is designed around modern developer workflows</h2>
              <p className="mt-4">SwahiliPro programs use the <code className="font-mono font-semibold text-emerald-800">.swa</code> extension. Developers can write them in VS Code with the SwahiliPro extension or run them from the standalone <code className="font-mono font-semibold text-emerald-800">swa</code> command-line interface on Windows, Linux and macOS.</p>
              <p className="mt-4">The language keeps conventional blocks, operators and indexing so that learning SwahiliPro still reinforces ideas that transfer to other languages.</p>
            </section>

            <section>
              <h2 className="text-3xl font-black tracking-[-0.03em] text-stone-950">Where to start</h2>
              <p className="mt-4">If you want to learn programming in Swahili, start with the interactive learning path, then use the documentation and code examples as your reference while you build your own programs.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a className="inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-5 py-3 text-sm font-bold text-white" href="/lms">Learn programming in Swahili <ArrowRight className="h-4 w-4" /></a>
                <a className="inline-flex items-center gap-2 rounded-xl border border-emerald-950/10 bg-white px-5 py-3 text-sm font-bold text-stone-900" href="/docs">Read SwahiliPro docs <ArrowRight className="h-4 w-4" /></a>
              </div>
            </section>
          </div>
        </div>
      </article>
    </div>
  );
}
