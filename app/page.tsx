import type { ReactNode } from "react";
import {
  ArrowRight,
  BookOpen,
  Code2,
  Download,
  ExternalLink,
  Globe2,
  GraduationCap,
  Play,
  Quote,
  Sparkles,
  Terminal,
} from "lucide-react";

import AchievementsGallery from "@/components/achieve";
import Navbar from "@/components/navbar";

const marketplaceUrl =
  "https://marketplace.visualstudio.com/items?itemName=masota.swahilipro";
const releaseUrl =
  "https://github.com/bonnieace/swahilipro-downloads/releases/tag/v2.0.0";

const platforms = [
  {
    name: "Windows",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/windows11/windows11-original.svg",
  },
  {
    name: "Linux",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg",
  },
  {
    name: "macOS",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apple/apple-original.svg",
  },
  {
    name: "VS Code",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg",
  },
];

const downloads = [
  {
    platform: "Windows",
    detail: "x64 · .exe",
    icon: platforms[0].icon,
    href: "https://github.com/bonnieace/swahilipro-downloads/releases/download/v2.0.0/swa-windows-x86_64.exe",
  },
  {
    platform: "Linux",
    detail: "x64",
    icon: platforms[1].icon,
    href: "https://github.com/bonnieace/swahilipro-downloads/releases/download/v2.0.0/swa-linux-x86_64",
  },
  {
    platform: "macOS",
    detail: "Apple Silicon",
    icon: platforms[2].icon,
    href: "https://github.com/bonnieace/swahilipro-downloads/releases/download/v2.0.0/swa-darwin-arm64",
  },
  {
    platform: "macOS",
    detail: "Intel",
    icon: platforms[2].icon,
    href: "https://github.com/bonnieace/swahilipro-downloads/releases/download/v2.0.0/swa-darwin-x86_64",
  },
];

const testimonials = [
  {
    title: "Genius Idea!!",
    quote:
      "The idea from SwahiliPro foundation is groundbreaking and revolutionary.",
    source: "Chief ICT Officer, Kiambu County, Kenya",
  },
  {
    title: "Awesome",
    quote:
      "Writing code in Swahili feels like a dream come true. Concepts feel more familiar and easy to grasp.",
    source: "Anonymous student",
  },
  {
    title: "Incredible.",
    quote:
      "The idea is fascinating and caters to a lot of issues programmers face in Tanzania. Having a Swahili programming language is incredible.",
    source: "Founder, Silabu Foundation, Tanzania",
  },
];

const codeExample = `# hello.swa
acha jina = "Amina"

salimia(jina) {
  ikiwa (jina == "Amina") {
    andika("Karibu, " + jina + "!")
  } vinginevyo {
    andika("Habari, " + jina)
  }
}

kwa n katika 1..4 {
  andika(n)
}

salimia(jina)`;

function PlatformTicker() {
  const repeated = [...platforms, ...platforms];

  return (
    <div className="mt-8 flex items-center gap-4 text-sm text-stone-600">
      <span className="font-semibold text-stone-800">Build with</span>
      <div className="platform-ticker h-10 min-w-[170px] overflow-hidden rounded-full border border-emerald-900/10 bg-white/75 px-4 shadow-sm backdrop-blur">
        <div className="platform-ticker-track">
          {repeated.map((platform, index) => (
            <div
              key={`${platform.name}-${index}`}
              className="flex h-10 items-center gap-2.5 whitespace-nowrap"
            >
              <img
                alt=""
                aria-hidden="true"
                className="h-5 w-5 object-contain"
                src={platform.icon}
              />
              <span className="font-semibold text-stone-800">{platform.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-900/10 bg-white/70 px-3.5 py-2 text-xs font-bold uppercase tracking-[0.18em] text-emerald-800 shadow-sm">
      <Sparkles className="h-3.5 w-3.5" />
      {children}
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-[#fffaf5] text-stone-900 selection:bg-emerald-200 selection:text-emerald-950">
      <Navbar />

      <main>
        <section className="relative overflow-hidden border-b border-emerald-950/5 bg-gradient-to-br from-rose-100 via-[#fffaf5] to-teal-100">
          <div className="pointer-events-none absolute inset-0 opacity-70">
            <div className="absolute -left-32 top-16 h-72 w-72 rounded-full bg-rose-200/60 blur-3xl" />
            <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-teal-200/70 blur-3xl" />
          </div>

          <div className="relative mx-auto grid max-w-7xl gap-14 px-5 pb-20 pt-16 sm:px-6 lg:grid-cols-[1.06fr_.94fr] lg:items-center lg:px-8 lg:pb-28 lg:pt-24">
            <div>
              <a
                className="mb-7 inline-flex items-center gap-2 rounded-full border border-emerald-900/10 bg-white/70 px-3.5 py-2 text-xs font-semibold text-emerald-900 shadow-sm backdrop-blur transition hover:bg-white"
                href="/docs"
              >
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Swahili programming language · v2
                <ArrowRight className="h-3.5 w-3.5" />
              </a>

              <h1 className="max-w-4xl text-5xl font-black leading-[0.98] tracking-[-0.045em] text-stone-950 sm:text-6xl lg:text-7xl">
                Program in Swahili.
                <span className="mt-2 block bg-gradient-to-r from-emerald-700 via-teal-700 to-rose-600 bg-clip-text text-transparent">
                  Build like any modern developer.
                </span>
              </h1>

              <p className="mt-7 max-w-2xl text-lg leading-8 text-stone-700 sm:text-xl">
                <strong className="font-semibold text-stone-950">
                  SwahiliPro is a Swahili programming language and learning platform
                </strong>{" "}
                built to make programming more accessible to Swahili speakers. Learn
                core concepts in Kiswahili, write real{" "}
                <code className="rounded bg-emerald-950/5 px-1.5 py-0.5 font-mono text-base font-semibold text-emerald-800">
                  .swa
                </code>{" "}
                programs, and use the same kinds of tools and workflows modern developers
                use every day.
              </p>

              <p className="mt-4 max-w-2xl text-base leading-7 text-stone-600">
                Think in Swahili. Code like any other modern developer.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-700 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-900/10 transition hover:-translate-y-0.5 hover:bg-emerald-800"
                  href={marketplaceUrl}
                  rel="noreferrer"
                  target="_blank"
                >
                  <Code2 className="h-4 w-4" />
                  Install for VS Code
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
                <a
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-900/15 bg-white/75 px-5 py-3.5 text-sm font-bold text-stone-900 shadow-sm transition hover:bg-white"
                  href="/lms"
                >
                  <GraduationCap className="h-4 w-4 text-rose-600" />
                  Learn in Swahili
                </a>
              </div>

              <PlatformTicker />
            </div>

            <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
              <div className="absolute -inset-4 rotate-1 rounded-[2rem] bg-gradient-to-br from-rose-200 via-teal-100 to-emerald-200 opacity-80 blur-xl" />
              <div className="relative overflow-hidden rounded-[1.7rem] border border-stone-900/10 bg-[#151a18] shadow-2xl shadow-emerald-950/20">
                <div className="flex h-12 items-center justify-between border-b border-white/10 px-4">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  </div>
                  <span className="font-mono text-xs text-stone-400">hello.swa</span>
                </div>
                <pre className="overflow-x-auto p-6 text-[13px] leading-7 text-stone-300 sm:p-7 sm:text-sm">
                  <code>{codeExample}</code>
                </pre>
                <div className="flex items-center justify-between border-t border-white/10 bg-black/20 px-6 py-4 font-mono text-xs sm:text-sm">
                  <span>
                    <span className="mr-2 text-emerald-400">$</span>
                    <span className="text-stone-200">swa hello.swa</span>
                  </span>
                  <span className="text-emerald-300">ready</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-emerald-800 text-white" id="mission">
          <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 sm:px-6 lg:grid-cols-[.85fr_1.15fr] lg:items-center lg:px-8">
            <div className="flex items-center gap-4">
              <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-white/10">
                <Globe2 className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-100">
                  SDG 4 · Quality education
                </p>
                <h2 className="mt-1 text-2xl font-bold">
                  Programming education should not begin with a language barrier.
                </h2>
              </div>
            </div>
            <p className="text-base leading-7 text-emerald-50 lg:text-lg">
              SwahiliPro supports more inclusive access to programming education by
              letting learners understand ideas in a language they already use, while
              preserving the concepts and structures that transfer to mainstream software
              development.
            </p>
          </div>
        </section>

        <section className="bg-[#fffaf5]" id="why">
          <div className="mx-auto max-w-7xl px-5 py-24 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-[.82fr_1.18fr] lg:items-start">
              <div className="lg:sticky lg:top-28">
                <Eyebrow>Why SwahiliPro</Eyebrow>
                <h2 className="text-4xl font-black tracking-[-0.035em] text-stone-950 sm:text-5xl">
                  Learn the idea first. Keep the developer skills.
                </h2>
                <p className="mt-5 text-lg leading-8 text-stone-600">
                  SwahiliPro is not a simplified toy language. It is designed to make the
                  words around programming more familiar without hiding the structures
                  learners need to understand.
                </p>
                <a
                  className="mt-7 inline-flex items-center gap-2 font-bold text-emerald-800 hover:text-emerald-950"
                  href="/docs"
                >
                  Read the language documentation <ArrowRight className="h-4 w-4" />
                </a>
              </div>

              <div className="overflow-hidden rounded-[2rem] border border-stone-900/10 bg-white shadow-xl shadow-stone-900/5">
                <div className="grid md:grid-cols-2">
                  <div className="border-b border-stone-900/10 p-7 md:border-r">
                    <span className="text-sm font-bold text-rose-600">01 · Language</span>
                    <h3 className="mt-3 text-2xl font-bold text-stone-950">Think in Swahili</h3>
                    <p className="mt-3 leading-7 text-stone-600">
                      Use readable commands such as{" "}
                      <code className="font-semibold text-emerald-800">ikiwa</code>,{" "}
                      <code className="font-semibold text-emerald-800">andika</code> and{" "}
                      <code className="font-semibold text-emerald-800">kwa</code> while
                      keeping conventional programming structure.
                    </p>
                  </div>
                  <div className="border-b border-stone-900/10 p-7">
                    <span className="text-sm font-bold text-teal-700">02 · Transfer</span>
                    <h3 className="mt-3 text-2xl font-bold text-stone-950">
                      Learn concepts that travel
                    </h3>
                    <p className="mt-3 leading-7 text-stone-600">
                      Variables, functions, conditions, loops, lists and operators map to
                      concepts learners will meet again in other programming languages.
                    </p>
                  </div>
                  <div className="border-b border-stone-900/10 p-7 md:border-b-0 md:border-r">
                    <span className="text-sm font-bold text-amber-700">03 · Tools</span>
                    <h3 className="mt-3 text-2xl font-bold text-stone-950">
                      Use real developer workflows
                    </h3>
                    <p className="mt-3 leading-7 text-stone-600">
                      Write <code className="font-semibold text-emerald-800">.swa</code>{" "}
                      files in VS Code, use syntax highlighting, and run programs from the
                      standalone <code className="font-semibold text-emerald-800">swa</code>{" "}
                      CLI.
                    </p>
                  </div>
                  <div className="p-7">
                    <span className="text-sm font-bold text-emerald-700">04 · Access</span>
                    <h3 className="mt-3 text-2xl font-bold text-stone-950">
                      Start closer to how you reason
                    </h3>
                    <p className="mt-3 leading-7 text-stone-600">
                      For learners who already think and learn in Swahili, the language can
                      reduce unnecessary friction around the first programming concepts.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div
          className="border-y border-stone-900/10 bg-gradient-to-br from-teal-50 to-rose-50 pt-20"
          id="proof"
        >
          <AchievementsGallery />
        </div>

        <section className="bg-[#fffaf5]" id="learn">
          <div className="mx-auto max-w-7xl px-5 py-24 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <Eyebrow>From first idea to first program</Eyebrow>
              <h2 className="text-4xl font-black tracking-[-0.035em] text-stone-950 sm:text-5xl">
                A learning path that connects language, concepts and tools.
              </h2>
            </div>

            <div className="relative mt-14 overflow-hidden rounded-[2rem] border border-stone-900/10 bg-white shadow-xl shadow-stone-900/5">
              <div className="grid md:grid-cols-3">
                {[
                  {
                    icon: <BookOpen className="h-6 w-6" />,
                    step: "01",
                    title: "Learn the idea",
                    copy: "Use the SwahiliPro LMS to understand variables, conditions, loops and functions in Swahili.",
                  },
                  {
                    icon: <Code2 className="h-6 w-6" />,
                    step: "02",
                    title: "Write real .swa code",
                    copy: "Move from examples into actual SwahiliPro v2 programs using familiar syntax and braces.",
                  },
                  {
                    icon: <Terminal className="h-6 w-6" />,
                    step: "03",
                    title: "Run it like a developer",
                    copy: "Use VS Code or the standalone swa CLI and keep building from there.",
                  },
                ].map((item, index) => (
                  <article
                    key={item.step}
                    className={`p-8 ${
                      index < 2
                        ? "border-b border-stone-900/10 md:border-b-0 md:border-r"
                        : ""
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-100 text-emerald-800">
                        {item.icon}
                      </div>
                      <span className="font-mono text-sm font-bold text-rose-500">
                        {item.step}
                      </span>
                    </div>
                    <h3 className="mt-7 text-2xl font-bold">{item.title}</h3>
                    <p className="mt-3 leading-7 text-stone-600">{item.copy}</p>
                  </article>
                ))}
              </div>
              <div className="flex flex-col items-center justify-between gap-4 border-t border-stone-900/10 bg-emerald-50 px-8 py-6 sm:flex-row">
                <p className="font-semibold text-stone-800">
                  Ready to learn programming in Swahili?
                </p>
                <a
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-5 py-3 text-sm font-bold text-white"
                  href="/lms"
                >
                  Open the learning path <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-stone-950 text-white" id="syntax">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-6 lg:grid-cols-[.8fr_1.2fr] lg:px-8">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-2 text-xs font-bold uppercase tracking-[0.18em] text-emerald-300">
                <Code2 className="h-3.5 w-3.5" /> SwahiliPro v2 syntax
              </div>
              <h2 className="text-4xl font-black tracking-[-0.035em] sm:text-5xl">
                Readable Swahili commands. Familiar programming structure.
              </h2>
              <p className="mt-5 text-lg leading-8 text-stone-300">
                Version 2 uses braces for blocks, conventional operators and concise
                Swahili keywords. You learn the structure once, then focus on expressing
                the logic clearly.
              </p>
              <a
                className="mt-8 inline-flex items-center gap-2 font-bold text-emerald-300 hover:text-emerald-200"
                href="/docs"
              >
                Explore full documentation <ArrowRight className="h-4 w-4" />
              </a>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                ["acha", "Variables", 'acha mji = "Nairobi"'],
                ["ikiwa", "Conditions", 'ikiwa (miaka >= 18) { andika("Karibu") }'],
                ["kwa", "Loops", "kwa i katika 1..10 { andika(i) }"],
                ["rudisha", "Functions", "jumlisha(a, b) { rudisha a + b }"],
              ].map(([keyword, title, code]) => (
                <article
                  key={keyword}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] p-6"
                >
                  <span className="font-mono text-sm font-bold text-emerald-300">
                    {keyword}
                  </span>
                  <h3 className="mt-3 text-xl font-bold">{title}</h3>
                  <pre className="mt-5 overflow-x-auto rounded-xl bg-black/30 p-4 text-xs leading-6 text-stone-300">
                    <code>{code}</code>
                  </pre>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#fffaf5]" id="reviews">
          <div className="mx-auto max-w-7xl px-5 py-24 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <Eyebrow>What people have said</Eyebrow>
              <h2 className="text-4xl font-black tracking-[-0.035em] text-stone-950 sm:text-5xl">
                Real reactions from people who encountered SwahiliPro.
              </h2>
            </div>
            <div className="mt-12 grid gap-4 lg:grid-cols-3">
              {testimonials.map((testimonial) => (
                <blockquote
                  key={testimonial.title}
                  className="flex min-h-[285px] flex-col justify-between rounded-[1.7rem] border border-stone-900/10 bg-white p-7 shadow-lg shadow-stone-900/5"
                >
                  <div>
                    <Quote className="h-7 w-7 text-rose-500" />
                    <p className="mt-5 text-2xl font-bold text-stone-950">
                      {testimonial.title}
                    </p>
                    <p className="mt-4 text-lg leading-8 text-stone-600">
                      “{testimonial.quote}”
                    </p>
                  </div>
                  <footer className="mt-8 border-t border-stone-900/10 pt-5 text-sm font-semibold text-emerald-800">
                    {testimonial.source}
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        </section>

        <section
          className="border-y border-stone-900/10 bg-gradient-to-r from-rose-100 to-teal-100"
          id="download"
        >
          <div className="mx-auto max-w-7xl px-5 py-24 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[.72fr_1.28fr] lg:items-end">
              <div>
                <Eyebrow>Standalone CLI</Eyebrow>
                <h2 className="text-4xl font-black tracking-[-0.035em] text-stone-950 sm:text-5xl">
                  Take SwahiliPro to the platform you already use.
                </h2>
                <p className="mt-5 text-lg leading-8 text-stone-600">
                  Download the standalone{" "}
                  <code className="font-mono font-semibold text-emerald-800">swa</code>{" "}
                  runtime, place it on your PATH and run SwahiliPro files directly from
                  your terminal.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {downloads.map((item) => (
                  <a
                    key={`${item.platform}-${item.detail}`}
                    className="group flex items-center justify-between rounded-2xl border border-stone-900/10 bg-white/80 p-5 shadow-sm transition hover:-translate-y-0.5 hover:bg-white hover:shadow-lg"
                    href={item.href}
                  >
                    <span className="flex items-center gap-4">
                      <span className="grid h-12 w-12 place-items-center rounded-xl bg-stone-50">
                        <img
                          alt={`${item.platform} icon`}
                          className="h-7 w-7 object-contain"
                          src={item.icon}
                        />
                      </span>
                      <span>
                        <strong className="block text-stone-950">{item.platform}</strong>
                        <span className="text-sm text-stone-500">{item.detail}</span>
                      </span>
                    </span>
                    <Download className="h-5 w-5 text-emerald-700 transition group-hover:translate-y-0.5" />
                  </a>
                ))}
              </div>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-stone-600">
              <a
                className="inline-flex items-center gap-2 font-bold text-emerald-800"
                href={releaseUrl}
                rel="noreferrer"
                target="_blank"
              >
                View v2.0.0 release <ExternalLink className="h-3.5 w-3.5" />
              </a>
              <span>•</span>
              <a
                className="inline-flex items-center gap-2 font-bold text-emerald-800"
                href={marketplaceUrl}
                rel="noreferrer"
                target="_blank"
              >
                VS Code Marketplace <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </section>

        <section className="bg-emerald-800 text-white">
          <div className="mx-auto grid max-w-7xl gap-8 px-5 py-16 sm:px-6 lg:grid-cols-[1fr_auto] lg:items-center lg:px-8">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-100">
                Start where you are
              </p>
              <h2 className="mt-3 max-w-3xl text-4xl font-black tracking-[-0.035em]">
                Learn programming in Swahili, then keep building without changing how
                modern development works.
              </h2>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <a
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3.5 text-sm font-bold text-emerald-900"
                href="/lms"
              >
                <Play className="h-4 w-4" /> Start learning
              </a>
              <a
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3.5 text-sm font-bold text-white"
                href="/docs"
              >
                Read the docs <BookOpen className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-stone-950 text-stone-400">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-10 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <div>
            <p className="font-bold text-white">SwahiliPro</p>
            <p className="mt-1 text-sm">
              A Swahili programming language for learning and building.
            </p>
          </div>
          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
            <a className="hover:text-white" href="/docs">
              Docs
            </a>
            <a className="hover:text-white" href="/lms">
              Learn
            </a>
            <a className="hover:text-white" href="/examples">
              Examples
            </a>
            <a className="hover:text-white" href="/blog">
              Blog
            </a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
