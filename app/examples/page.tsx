import type { Metadata } from "next";
import { ArrowRight, Code2 } from "lucide-react";

import Navbar from "@/components/navbar";

export const metadata: Metadata = {
  title: "Swahili Programming Examples | SwahiliPro Code Examples",
  description:
    "Explore practical Swahili programming examples in SwahiliPro, including variables, conditions, loops, functions and lists.",
  alternates: { canonical: "/examples" },
};

const examples = [
  {
    title: "Hello world",
    description: "Print a simple message using andika.",
    code: 'andika("Habari Dunia!")',
  },
  {
    title: "Variables",
    description: "Store and combine values using acha.",
    code: 'acha jina = "Amina"\nacha umri = 24\nandika(jina + " ana miaka " + umri)',
  },
  {
    title: "Conditions",
    description: "Make decisions with ikiwa and vinginevyo.",
    code: 'acha umri = 20\n\nikiwa (umri >= 18) {\n  andika("Karibu")\n} vinginevyo {\n  andika("Bado mdogo")\n}',
  },
  {
    title: "Loops",
    description: "Iterate through an end-exclusive range.",
    code: 'kwa i katika 1..5 {\n  andika(i)\n}',
  },
  {
    title: "Functions",
    description: "Create reusable logic and return a result.",
    code: 'jumlisha(a, b) {\n  rudisha a + b\n}\n\nandika(jumlisha(4, 6))',
  },
  {
    title: "Lists",
    description: "Create a list, index it and append another value.",
    code: 'acha miji = ["Nairobi", "Mombasa"]\nongeza(miji, "Kisumu")\nandika(miji[0])',
  },
];

export default function ExamplesPage() {
  return (
    <div className="min-h-screen bg-[#fffaf5] text-stone-900">
      <Navbar />
      <header className="border-b border-emerald-950/10 bg-gradient-to-br from-teal-100 via-[#fffaf5] to-rose-100">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-950/10 bg-white/70 px-3.5 py-2 text-xs font-bold uppercase tracking-[0.18em] text-emerald-800">
            <Code2 className="h-3.5 w-3.5" /> Swahili code examples
          </div>
          <h1 className="mt-6 max-w-4xl text-5xl font-black tracking-[-0.045em] text-stone-950 sm:text-6xl">
            Learn Swahili programming by reading real code.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-stone-700">
            These SwahiliPro examples show how familiar programming ideas look when the readable commands are written in Swahili. Copy them into a <code className="font-mono font-semibold text-emerald-800">.swa</code> file and run them with the <code className="font-mono font-semibold text-emerald-800">swa</code> CLI.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-5 lg:grid-cols-2">
          {examples.map((example) => (
            <article key={example.title} className="overflow-hidden rounded-[1.7rem] border border-stone-900/10 bg-white shadow-lg shadow-stone-900/5">
              <div className="p-6 sm:p-7">
                <h2 className="text-2xl font-black text-stone-950">{example.title}</h2>
                <p className="mt-2 leading-7 text-stone-600">{example.description}</p>
              </div>
              <pre className="overflow-x-auto bg-stone-950 p-6 text-sm leading-7 text-stone-200"><code>{example.code}</code></pre>
            </article>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <a className="inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-5 py-3 text-sm font-bold text-white" href="/docs">Read the language docs <ArrowRight className="h-4 w-4" /></a>
          <a className="inline-flex items-center gap-2 rounded-xl border border-emerald-950/10 bg-white px-5 py-3 text-sm font-bold text-stone-900" href="/lms">Learn interactively <ArrowRight className="h-4 w-4" /></a>
        </div>
      </main>
    </div>
  );
}
