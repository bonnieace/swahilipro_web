import {
  ArrowRight,
  BookOpen,
  Check,
  Code2,
  Download,
  ExternalLink,
  Github,
  Globe2,
  Monitor,
  Play,
  Sparkles,
  Terminal,
  Zap,
} from "lucide-react";

import Navbar from "@/components/navbar";

const marketplaceUrl =
  "https://marketplace.visualstudio.com/items?itemName=masota.swahilipro";
const releaseUrl =
  "https://github.com/bonnieace/swahilipro-compiler/releases/tag/v2.0.0";

const downloads = [
  {
    platform: "Windows",
    detail: "x64 · .exe",
    href: "https://github.com/bonnieace/swahilipro-compiler/releases/download/v2.0.0/swa-windows-x86_64.exe",
  },
  {
    platform: "Linux",
    detail: "x64",
    href: "https://github.com/bonnieace/swahilipro-compiler/releases/download/v2.0.0/swa-linux-x86_64",
  },
  {
    platform: "macOS",
    detail: "Apple Silicon",
    href: "https://github.com/bonnieace/swahilipro-compiler/releases/download/v2.0.0/swa-darwin-arm64",
  },
  {
    platform: "macOS",
    detail: "Intel",
    href: "https://github.com/bonnieace/swahilipro-compiler/releases/download/v2.0.0/swa-darwin-x86_64",
  },
];

const codeExample = `# hello.swa
acha jina = "Amina"

salimia(jina) {
  ikiwa jina == "Amina" {
    andika("Karibu, " + jina + "!")
  } vinginevyo {
    andika("Habari, " + jina)
  }
}

kwa n katika 1..4 {
  andika(n)
}

salimia(jina)`;

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">
      <Sparkles className="h-3.5 w-3.5" />
      {children}
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-emerald-300 selection:text-slate-950">
      <Navbar />

      <main>
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/2 top-[-18rem] h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-emerald-400/10 blur-3xl" />
            <div className="absolute right-[-12rem] top-32 h-[24rem] w-[24rem] rounded-full bg-cyan-400/10 blur-3xl" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.05)_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
          </div>

          <div className="relative mx-auto grid max-w-7xl gap-14 px-5 pb-24 pt-20 sm:px-6 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:px-8 lg:pb-32 lg:pt-28">
            <div>
              <a
                href={releaseUrl}
                target="_blank"
                rel="noreferrer"
                className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-2 text-xs font-medium text-slate-300 transition hover:border-emerald-400/30 hover:text-white"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                SwahiliPro v2.0.0 is live
                <ArrowRight className="h-3.5 w-3.5" />
              </a>

              <h1 className="max-w-4xl text-5xl font-black leading-[0.98] tracking-[-0.045em] text-white sm:text-6xl lg:text-7xl">
                Program in Swahili.
                <span className="mt-2 block bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-300 bg-clip-text text-transparent">
                  Build like any modern developer.
                </span>
              </h1>

              <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
                SwahiliPro keeps programming structure familiar while making the
                commands you read and write feel natural in Swahili. Write real
                <code className="mx-1 rounded bg-white/5 px-1.5 py-0.5 font-mono text-base text-emerald-300">
                  .swa
                </code>
                programs in VS Code or run them directly with the standalone
                <code className="mx-1 rounded bg-white/5 px-1.5 py-0.5 font-mono text-base text-emerald-300">
                  swa
                </code>
                CLI.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href={marketplaceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-400 px-5 py-3.5 text-sm font-bold text-slate-950 transition hover:-translate-y-0.5 hover:bg-emerald-300"
                >
                  <Code2 className="h-4 w-4" />
                  Install for VS Code
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
                <a
                  href="#download"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3.5 text-sm font-semibold text-white transition hover:border-white/20 hover:bg-white/[0.07]"
                >
                  <Terminal className="h-4 w-4" />
                  Download standalone CLI
                </a>
              </div>

              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-400">
                {[
                  "Windows, Linux & macOS",
                  "No Python install required",
                  "Open source",
                ].map((item) => (
                  <span key={item} className="inline-flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-400" />
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
              <div className="absolute -inset-1 rounded-[1.6rem] bg-gradient-to-br from-emerald-400/25 via-cyan-400/5 to-transparent blur-xl" />
              <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-slate-900/95 shadow-2xl shadow-black/30">
                <div className="flex h-12 items-center justify-between border-b border-white/10 px-4">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-300/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
                  </div>
                  <span className="font-mono text-xs text-slate-500">hello.swa</span>
                </div>
                <pre className="overflow-x-auto p-6 text-[13px] leading-7 text-slate-300 sm:p-7 sm:text-sm">
                  <code>{codeExample}</code>
                </pre>
                <div className="border-t border-white/10 bg-black/20 px-6 py-4 font-mono text-xs sm:text-sm">
                  <span className="mr-2 text-emerald-400">$</span>
                  <span className="text-slate-200">swa hello.swa</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-white/10 bg-white/[0.025]" id="why">
          <div className="mx-auto max-w-7xl px-5 py-24 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <Eyebrow>Why SwahiliPro</Eyebrow>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
                Familiar programming concepts. A language that reads closer to
                how you think.
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-400">
                SwahiliPro is not a toy syntax layer. It is a practical language
                designed to reduce the language barrier without hiding the core
                ideas programmers need to learn.
              </p>
            </div>

            <div className="mt-12 grid gap-4 md:grid-cols-3">
              <article className="rounded-2xl border border-white/10 bg-slate-900/60 p-6">
                <div className="mb-5 grid h-11 w-11 place-items-center rounded-xl bg-emerald-400/10 text-emerald-300">
                  <Globe2 className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-white">Think in Swahili</h3>
                <p className="mt-3 leading-7 text-slate-400">
                  Use words such as <code className="text-emerald-300">ikiwa</code>,
                  <code className="mx-1 text-emerald-300">andika</code> and
                  <code className="ml-1 text-emerald-300">kwa</code> while keeping
                  recognizable programming structure.
                </p>
              </article>

              <article className="rounded-2xl border border-white/10 bg-slate-900/60 p-6">
                <div className="mb-5 grid h-11 w-11 place-items-center rounded-xl bg-cyan-400/10 text-cyan-300">
                  <Zap className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-white">Run it anywhere</h3>
                <p className="mt-3 leading-7 text-slate-400">
                  Use the VS Code experience for editing and execution, or keep
                  it simple with a standalone native CLI on Windows, Linux and
                  macOS.
                </p>
              </article>

              <article className="rounded-2xl border border-white/10 bg-slate-900/60 p-6">
                <div className="mb-5 grid h-11 w-11 place-items-center rounded-xl bg-violet-400/10 text-violet-300">
                  <BookOpen className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-white">Learn transferable ideas</h3>
                <p className="mt-3 leading-7 text-slate-400">
                  Variables, conditionals, functions, loops and collections map
                  to concepts you will meet again in mainstream programming
                  languages.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section id="syntax">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-6 lg:grid-cols-[.85fr_1.15fr] lg:items-start lg:px-8">
            <div className="lg:sticky lg:top-28">
              <Eyebrow>SwahiliPro v2 syntax</Eyebrow>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
                Less ceremony. More readable code.
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-400">
                Version 2 uses braces for blocks and keeps the language compact.
                The structure looks familiar, while the commands remain Swahili.
              </p>

              <div className="mt-8 flex flex-wrap gap-2">
                {[
                  "acha variables",
                  "ikiwa conditionals",
                  "kwa loops",
                  "wakati loops",
                  "andika output",
                  "ingiza input",
                  "na / au / sio logic",
                ].map((token) => (
                  <span
                    key={token}
                    className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 font-mono text-xs text-slate-300"
                  >
                    {token}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {[
                {
                  number: "01",
                  title: "Variables stay simple",
                  copy: "Declare data with acha and work with familiar strings, numbers and lists.",
                  code: 'acha mji = "Nairobi"',
                },
                {
                  number: "02",
                  title: "Blocks use familiar braces",
                  copy: "Conditionals no longer need special closing words. The visual structure is immediately recognizable.",
                  code: 'ikiwa miaka >= 18 { andika("Karibu") }',
                },
                {
                  number: "03",
                  title: "Functions do not need extra ceremony",
                  copy: "Name the function, define its parameters and write the body.",
                  code: "jumlisha(a, b) { rudisha a + b }",
                },
                {
                  number: "04",
                  title: "Loops read naturally",
                  copy: "Iterate over collections or end-exclusive ranges with kwa ... katika.",
                  code: "kwa i katika 1..10 { andika(i) }",
                },
              ].map((item) => (
                <article
                  key={item.number}
                  className="group rounded-2xl border border-white/10 bg-white/[0.025] p-6 transition hover:border-emerald-400/20 hover:bg-white/[0.04] sm:p-7"
                >
                  <div className="flex gap-5">
                    <span className="font-mono text-xs font-semibold text-emerald-400">
                      {item.number}
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                      <p className="mt-2 leading-7 text-slate-400">{item.copy}</p>
                      <div className="mt-5 overflow-x-auto rounded-xl border border-white/10 bg-slate-950 px-4 py-3 font-mono text-sm text-emerald-300">
                        {item.code}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-white/10 bg-white/[0.025]">
          <div className="mx-auto max-w-7xl px-5 py-24 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <Eyebrow>Get running</Eyebrow>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
                From install to your first program in three steps.
              </h2>
            </div>

            <div className="mt-14 grid gap-4 md:grid-cols-3">
              {[
                {
                  icon: <Download className="h-5 w-5" />,
                  title: "Install",
                  copy: "Use the VS Code extension for the complete editor experience or download the standalone CLI.",
                },
                {
                  icon: <Code2 className="h-5 w-5" />,
                  title: "Create hello.swa",
                  copy: "Write SwahiliPro code in a normal text file using the .swa extension.",
                },
                {
                  icon: <Play className="h-5 w-5" />,
                  title: "Run",
                  copy: "Run the file from VS Code or execute swa hello.swa from your terminal.",
                },
              ].map((step, index) => (
                <div
                  key={step.title}
                  className="relative rounded-2xl border border-white/10 bg-slate-900/60 p-6"
                >
                  <span className="absolute right-5 top-5 font-mono text-xs text-slate-600">
                    0{index + 1}
                  </span>
                  <div className="mb-5 grid h-11 w-11 place-items-center rounded-xl bg-emerald-400/10 text-emerald-300">
                    {step.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                  <p className="mt-3 leading-7 text-slate-400">{step.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="download">
          <div className="mx-auto max-w-7xl px-5 py-24 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-[.9fr_1.1fr] lg:items-end">
              <div>
                <Eyebrow>Standalone CLI</Eyebrow>
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
                  One executable. No Python setup.
                </h2>
                <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-400">
                  Download the build for your machine, make it available on your
                  PATH if you want system-wide access, then run SwahiliPro with
                  the <code className="font-mono text-emerald-300">swa</code> command.
                </p>
                <a
                  href={releaseUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-emerald-300 hover:text-emerald-200"
                >
                  View full v2.0.0 release
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {downloads.map((download) => (
                  <a
                    key={`${download.platform}-${download.detail}`}
                    href={download.href}
                    className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.025] p-5 transition hover:border-emerald-400/25 hover:bg-white/[0.05]"
                  >
                    <div className="flex items-center gap-4">
                      <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/5 text-slate-300 group-hover:text-emerald-300">
                        <Monitor className="h-5 w-5" />
                      </span>
                      <div>
                        <div className="font-semibold text-white">{download.platform}</div>
                        <div className="mt-0.5 text-xs text-slate-500">{download.detail}</div>
                      </div>
                    </div>
                    <Download className="h-4 w-4 text-slate-500 transition group-hover:text-emerald-300" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-white/10 bg-gradient-to-br from-emerald-400/[0.08] via-transparent to-cyan-400/[0.06]">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
            <div>
              <Eyebrow>Built for learning</Eyebrow>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
                Make the first programming step feel closer to home.
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-300">
                SwahiliPro started from a simple idea: language should not be an
                unnecessary barrier between a learner and computational thinking.
                The project supports inclusive access to programming education and
                aligns with the spirit of SDG 4: quality education.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-7 sm:p-8">
              <BookOpen className="h-7 w-7 text-emerald-300" />
              <h3 className="mt-5 text-2xl font-semibold text-white">Learn SwahiliPro</h3>
              <p className="mt-3 leading-7 text-slate-400">
                Follow guided lessons and examples, then apply the same concepts in
                your own <code className="font-mono text-emerald-300">.swa</code> programs.
                The learning experience is being updated for the v2 language.
              </p>
              <a
                href="/lms"
                className="mt-6 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm font-semibold text-white transition hover:border-emerald-400/30 hover:bg-white/[0.08]"
              >
                Open learning hub
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>

        <section>
          <div className="mx-auto max-w-7xl px-5 py-24 sm:px-6 lg:px-8">
            <div className="overflow-hidden rounded-3xl border border-emerald-400/20 bg-emerald-400 p-8 text-slate-950 sm:p-12 lg:flex lg:items-center lg:justify-between lg:gap-12">
              <div className="max-w-2xl">
                <div className="mb-4 inline-flex items-center gap-2 text-sm font-bold">
                  <Terminal className="h-4 w-4" />
                  SwahiliPro v2.0.0
                </div>
                <h2 className="text-3xl font-black tracking-tight sm:text-5xl">
                  Your next program can start in Swahili.
                </h2>
                <p className="mt-4 max-w-xl text-base font-medium leading-7 text-slate-800">
                  Install the VS Code extension, create a .swa file and start
                  building with a language designed to feel familiar from the first
                  line.
                </p>
              </div>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:mt-0 lg:flex-col">
                <a
                  href={marketplaceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-slate-900"
                >
                  Install for VS Code
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="https://github.com/bonnieace/swahilipro-compiler"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-900/20 px-5 py-3.5 text-sm font-bold transition hover:bg-black/5"
                >
                  <Github className="h-4 w-4" />
                  View source
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-8 text-sm text-slate-500 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <div className="flex items-center gap-3">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-emerald-400/10 font-mono text-xs font-bold text-emerald-300">
              SW
            </span>
            <span>SwahiliPro · Programming in Swahili.</span>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <a className="hover:text-white" href="/lms">
              Learn
            </a>
            <a
              className="hover:text-white"
              href="https://github.com/bonnieace/swahilipro-compiler"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
            <a className="hover:text-white" href={marketplaceUrl} target="_blank" rel="noreferrer">
              VS Code Marketplace
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
