import type { Metadata } from "next";
import { ArrowRight, BookOpen, Code2, ExternalLink, Terminal } from "lucide-react";

import Navbar from "@/components/navbar";

export const metadata: Metadata = {
  title: "SwahiliPro Documentation | Swahili Programming Language Docs",
  description:
    "Official SwahiliPro documentation for learning Swahili programming syntax, variables, conditions, loops, functions, lists, the swa CLI and VS Code workflow.",
  alternates: { canonical: "/docs" },
  openGraph: {
    title: "SwahiliPro Documentation | Swahili Programming Language Docs",
    description:
      "Learn SwahiliPro syntax, core programming concepts, CLI usage and VS Code workflow.",
    url: "https://swahilipro.com/docs",
    type: "article",
  },
};

const sections = [
  ["getting-started", "Getting started"],
  ["variables", "Variables"],
  ["conditions", "Conditions"],
  ["loops", "Loops"],
  ["functions", "Functions"],
  ["lists", "Lists"],
  ["logic", "Logic"],
  ["cli", "CLI"],
  ["vscode", "VS Code"],
] as const;

function Code({ children }: { children: string }) {
  return (
    <pre className="mt-4 overflow-x-auto rounded-2xl bg-stone-950 p-5 text-sm leading-7 text-stone-200 shadow-inner">
      <code>{children}</code>
    </pre>
  );
}

function DocSection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28 border-b border-stone-900/10 pb-12 last:border-0">
      <h2 className="text-3xl font-black tracking-[-0.03em] text-stone-950">{title}</h2>
      <div className="mt-4 space-y-4 text-base leading-8 text-stone-600">{children}</div>
    </section>
  );
}

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-[#fffaf5] text-stone-900">
      <Navbar />
      <header className="border-b border-emerald-950/10 bg-gradient-to-br from-rose-100 via-[#fffaf5] to-teal-100">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-950/10 bg-white/70 px-3.5 py-2 text-xs font-bold uppercase tracking-[0.18em] text-emerald-800">
            <BookOpen className="h-3.5 w-3.5" /> Official documentation
          </div>
          <h1 className="mt-6 max-w-4xl text-5xl font-black tracking-[-0.045em] text-stone-950 sm:text-6xl">
            SwahiliPro programming language documentation
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-stone-700">
            Learn how to write SwahiliPro v2 programs with familiar programming structure and human-readable Swahili commands. This reference covers the language basics, the <code className="font-mono font-semibold text-emerald-800">swa</code> CLI and the VS Code workflow.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a className="inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-5 py-3 text-sm font-bold text-white" href="#getting-started">Start reading <ArrowRight className="h-4 w-4" /></a>
            <a className="inline-flex items-center gap-2 rounded-xl border border-emerald-950/10 bg-white/75 px-5 py-3 text-sm font-bold text-stone-900" href="/examples"><Code2 className="h-4 w-4 text-rose-600" /> See examples</a>
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-6 lg:grid-cols-[230px_1fr] lg:px-8">
        <aside className="hidden lg:block">
          <div className="sticky top-24 rounded-2xl border border-stone-900/10 bg-white/75 p-4 shadow-sm">
            <p className="px-3 pb-2 text-xs font-black uppercase tracking-[0.16em] text-stone-400">On this page</p>
            <nav className="space-y-1">
              {sections.map(([id, label]) => (
                <a key={id} className="block rounded-lg px-3 py-2 text-sm font-semibold text-stone-600 hover:bg-emerald-50 hover:text-emerald-800" href={`#${id}`}>{label}</a>
              ))}
            </nav>
          </div>
        </aside>

        <article className="space-y-12 rounded-[2rem] border border-stone-900/10 bg-white p-6 shadow-xl shadow-stone-900/5 sm:p-10 lg:p-12">
          <DocSection id="getting-started" title="Getting started">
            <p>Create a file ending in <code className="font-mono font-semibold text-emerald-800">.swa</code>, write your program, then run it with the standalone SwahiliPro CLI.</p>
            <Code>{`# hello.swa\nandika("Habari Dunia!")`}</Code>
            <Code>{`$ swa hello.swa`}</Code>
            <p>You can also install the SwahiliPro VS Code extension for language support and run commands from the editor.</p>
          </DocSection>

          <DocSection id="variables" title="Variables with acha">
            <p>Use <code className="font-mono font-semibold text-emerald-800">acha</code> to bind values. Variables can hold numbers, text, lists and other supported values.</p>
            <Code>{`acha jina = "Amina"\nacha umri = 24\nacha miji = ["Nairobi", "Mombasa"]`}</Code>
          </DocSection>

          <DocSection id="conditions" title="Conditions with ikiwa and vinginevyo">
            <p>Conditions use braces, keeping block structure familiar while the readable commands remain Swahili.</p>
            <Code>{`acha umri = 20\n\nikiwa (umri >= 18) {\n  andika("Karibu")\n} vinginevyo {\n  andika("Bado mdogo")\n}`}</Code>
          </DocSection>

          <DocSection id="loops" title="Loops with kwa and wakati">
            <p>Use <code className="font-mono font-semibold text-emerald-800">kwa ... katika</code> to iterate through a collection or an end-exclusive range. Use <code className="font-mono font-semibold text-emerald-800">wakati</code> for while-style loops.</p>
            <Code>{`kwa i katika 1..5 {\n  andika(i)\n}`}</Code>
          </DocSection>

          <DocSection id="functions" title="Functions and rudisha">
            <p>Functions do not require a separate function keyword. Name the function, declare parameters and use <code className="font-mono font-semibold text-emerald-800">rudisha</code> when a value should be returned.</p>
            <Code>{`jumlisha(a, b) {\n  rudisha a + b\n}\n\nandika(jumlisha(2, 3))`}</Code>
          </DocSection>

          <DocSection id="lists" title="Lists and indexing">
            <p>Lists use familiar bracket syntax and conventional zero-based indexing.</p>
            <Code>{`acha lugha = ["SwahiliPro", "Python", "JavaScript"]\nandika(lugha[0])\nongeza(lugha, "Go")`}</Code>
          </DocSection>

          <DocSection id="logic" title="Logic and booleans">
            <p>Use <code className="font-mono font-semibold text-emerald-800">na</code>, <code className="font-mono font-semibold text-emerald-800">au</code> and <code className="font-mono font-semibold text-emerald-800">sio</code> for boolean logic. Boolean values are <code className="font-mono font-semibold text-emerald-800">kweli</code> and <code className="font-mono font-semibold text-emerald-800">uongo</code>.</p>
            <Code>{`acha ana_kitambulisho = kweli\nacha umri = 25\n\nikiwa (umri >= 18 na ana_kitambulisho) {\n  andika("Unaweza kuingia")\n}`}</Code>
          </DocSection>

          <DocSection id="cli" title="Standalone swa CLI">
            <p>The standalone CLI runs SwahiliPro files directly and can also open the interactive REPL.</p>
            <Code>{`swa hello.swa\nswa\nswa repl\nswa --version\nswa --help`}</Code>
            <a className="inline-flex items-center gap-2 font-bold text-emerald-800" href="https://github.com/bonnieace/swahilipro-downloads/releases/tag/v2.0.0" rel="noreferrer" target="_blank"><Terminal className="h-4 w-4" /> Download the standalone CLI <ExternalLink className="h-3.5 w-3.5" /></a>
          </DocSection>

          <DocSection id="vscode" title="VS Code extension">
            <p>The SwahiliPro extension adds language recognition, syntax highlighting, Run File, Open REPL and editor actions for <code className="font-mono font-semibold text-emerald-800">.swa</code> files.</p>
            <a className="inline-flex items-center gap-2 font-bold text-emerald-800" href="https://marketplace.visualstudio.com/items?itemName=masota.swahilipro" rel="noreferrer" target="_blank"><Code2 className="h-4 w-4" /> Install from VS Code Marketplace <ExternalLink className="h-3.5 w-3.5" /></a>
          </DocSection>
        </article>
      </main>
    </div>
  );
}
