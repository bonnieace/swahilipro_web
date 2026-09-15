import type { ReactNode } from "react";
import {
  ArrowRight,
  BookOpen,
  Code2,
  Download,
  ExternalLink,
  Globe2,
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

function PlatformTicker() {
  const repeated = [...platforms, ...platforms];

  return (
    <div className="mb-5 flex items-center gap-3 text-sm text-stone-600">
      <span className="font-semibold text-stone-800">Build with</span>
      <div className="platform-ticker h-10 min-w-[170px] overflow-hidden rounded-full border border-emerald-900/10 bg-white/65 px-4 shadow-sm backdrop-blur">
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
    <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-900/10 bg-white/60 px-3.5 py-2 text-xs font-bold uppercase tracking-[0.18em] text-emerald-800 shadow-sm backdrop-blur-sm">
      <Sparkles className="h-3.5 w-3.5" />
      {children}
    </div>
  );
}

function MissionSection() {
  const metrics = [
    ["31", "Current users"],
    ["300+", "Monthly website visitors"],
    ["5", "Collaborators"],
  ];

  return (
    <section className="px-5 py-20 sm:px-6 lg:px-8" id="mission">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.25rem] border border-emerald-950/10 bg-gradient-to-br from-rose-100/85 via-white/70 to-teal-100/90 shadow-xl shadow-stone-900/5 backdrop-blur-sm">
        <div className="mx-auto max-w-4xl px-6 py-14 text-center sm:px-10 sm:py-16">
          <div className="mx-auto mb-6 grid h-16 w-16 place-items-center rounded-2xl border border-emerald-900/10 bg-white/70 text-emerald-800 shadow-sm">
            <Globe2 className="h-7 w-7" />
          </div>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-emerald-800">
            SDG 4 · Quality Education
          </p>
          <h2 className="mt-4 text-4xl font-black tracking-[-0.035em] text-stone-950 sm:text-5xl">
            Programming education in Swahili should feel accessible from the first line.
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-stone-600">
            SwahiliPro supports more inclusive access to programming education by helping
            Swahili speakers learn core software concepts in a language they already use,
            while keeping the structures and workflows that transfer to modern development.
          </p>
        </div>

        <dl className="grid border-t border-emerald-950/10 bg-white/35 sm:grid-cols-3">
          {metrics.map(([value, label], index) => (
            <div
              key={label}
              className={`px-6 py-8 text-center ${
                index < metrics.length - 1
                  ? "border-b border-emerald-950/10 sm:border-b-0 sm:border-r"
                  : ""
              }`}
            >
              <dd className="text-4xl font-black text-emerald-800 sm:text-5xl">{value}</dd>
              <dt className="mt-2 text-sm font-semibold text-stone-600">{label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-[#fffaf5] to-teal-50 text-stone-900 selection:bg-emerald-200 selection:text-emerald-950">
      <Navbar />

      <main>
        <section className="relative overflow-hidden border-b border-emerald-950/5">
          <div className="pointer-events-none absolute inset-0 opacity-70">
            <div className="absolute -left-32 top-8 h-72 w-72 rounded-full bg-rose-200/60 blur-3xl" />
            <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-teal-200/70 blur-3xl" />
          </div>

          <div className="relative mx-auto grid max-w-7xl gap-8 px-5 pb-7 pt-5 sm:px-6 sm:pb-9 sm:pt-6 lg:min-h-[calc(100svh-4rem)] lg:grid-cols-[1fr_.92fr] lg:items-center lg:px-8 lg:py-7">
            <div className="max-w-2xl">
              <PlatformTicker />

              <h1 className="text-5xl font-black leading-[0.98] tracking-[-0.045em] text-stone-950 sm:text-6xl lg:text-[4rem] xl:text-[4.35rem]">
                Think in Swahili.
                <span className="mt-2 block bg-gradient-to-r from-emerald-700 via-teal-700 to-rose-600 bg-clip-text text-transparent">
                  Build like any modern developer.
                </span>
              </h1>

              <p className="mt-5 max-w-xl text-lg leading-7 text-stone-700">
                Learn programming in the language you already think in. SwahiliPro brings
                core coding concepts into Kiswahili so you can focus on ideas, solve
                problems and grow from your first .swa program into modern software
                development.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-700 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-900/10 transition hover:-translate-y-0.5 hover:bg-emerald-800"
                  href={marketplaceUrl}
                  rel="noreferrer"
                  target="_blank"
                >
                  <Code2 className="h-4 w-4" />
                  Get VS Code extension
                </a>
                <a
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-900/15 bg-white/65 px-5 py-3 text-sm font-bold text-stone-900 shadow-sm transition hover:bg-white"
                  href="/docs"
                >
                  <BookOpen className="h-4 w-4 text-emerald-800" />
                  Explore the docs
                </a>
              </div>

              <a
                className="mt-5 inline-flex items-center gap-2 rounded-full border border-emerald-900/10 bg-white/60 px-3.5 py-2 text-xs font-semibold text-emerald-900 shadow-sm backdrop-blur transition hover:bg-white/80"
                href="/docs"
              >
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Swahili programming language · v2
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>

            <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
              <div className="absolute -inset-3 rotate-1 rounded-[2rem] bg-gradient-to-br from-rose-200 via-teal-100 to-emerald-200 opacity-65 blur-xl" />
              <div className="relative overflow-hidden rounded-[2rem] border border-stone-900/10 bg-white/45 p-2 shadow-2xl shadow-emerald-950/10 backdrop-blur-sm">
                <img
                  alt="SwahiliPro presentation at the JKUAT Tech Expo"
                  className="h-[360px] w-full rounded-[1.55rem] object-cover object-center sm:h-[430px] lg:h-[min(63vh,540px)]"
                  src="/EXPO2.JPG"
                />
              </div>
            </div>
          </div>
        </section>

        <MissionSection />

        <section className="px-5 py-20 sm:px-6 lg:px-8" id="why">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.82fr_1.18fr] lg:items-start">
            <div className="lg:sticky lg:top-28">
              <Eyebrow>Why SwahiliPro</Eyebrow>
              <h2 className="text-4xl font-black tracking-[-0.035em] text-stone-950 sm:text-5xl">
                Learn the idea first. Keep the developer skills.
              </h2>
              <p className="mt-5 text-lg leading-8 text-stone-600">
                SwahiliPro is not a simplified toy language. It makes the words around
                programming more familiar without hiding the structures learners need to
                understand.
              </p>
              <a
                className="mt-7 inline-flex items-center gap-2 font-bold text-emerald-800 hover:text-emerald-950"
                href="/docs"
              >
                Read the language documentation <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            <div className="overflow-hidden rounded-[2rem] border border-stone-900/10 bg-white/60 shadow-xl shadow-stone-900/5 backdrop-blur-sm">
              <div className="grid md:grid-cols-2">
                {[
                  ["01 · Language", "Think in Swahili", "Use readable commands such as ikiwa, andika and kwa while keeping conventional programming structure."],
                  ["02 · Transfer", "Learn concepts that travel", "Variables, functions, conditions, loops, lists and operators map to concepts learners will meet again in other programming languages."],
                  ["03 · Tools", "Use real developer workflows", "Write .swa files in VS Code, use syntax highlighting, and run programs from the standalone swa CLI."],
                  ["04 · Access", "Start closer to how you reason", "For learners who already think and learn in Swahili, the language can reduce unnecessary friction around the first programming concepts."],
                ].map(([label, title, copy], index) => (
                  <article
                    key={label}
                    className={`p-7 ${index < 2 ? "border-b border-stone-900/10" : ""} ${index % 2 === 0 ? "md:border-r" : ""}`}
                  >
                    <span className="text-sm font-bold text-emerald-800">{label}</span>
                    <h3 className="mt-3 text-2xl font-bold text-stone-950">{title}</h3>
                    <p className="mt-3 leading-7 text-stone-600">{copy}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-5 py-12 sm:px-6 lg:px-8" id="proof">
          <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.25rem] border border-stone-900/10 bg-white/40 pt-16 shadow-xl shadow-stone-900/5 backdrop-blur-sm">
            <AchievementsGallery />
          </div>
        </section>

        <section className="px-5 py-20 sm:px-6 lg:px-8" id="learn">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl text-center">
              <Eyebrow>From first idea to first program</Eyebrow>
              <h2 className="text-4xl font-black tracking-[-0.035em] text-stone-950 sm:text-5xl">
                A learning path that connects language, concepts and tools.
              </h2>
            </div>

            <div className="relative mt-14 overflow-hidden rounded-[2rem] border border-stone-900/10 bg-white/60 shadow-xl shadow-stone-900/5 backdrop-blur-sm">
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
                    className={`p-8 ${index < 2 ? "border-b border-stone-900/10 md:border-b-0 md:border-r" : ""}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-100 text-emerald-800">
                        {item.icon}
                      </div>
                      <span className="font-mono text-sm font-bold text-rose-500">{item.step}</span>
                    </div>
                    <h3 className="mt-7 text-2xl font-bold">{item.title}</h3>
                    <p className="mt-3 leading-7 text-stone-600">{item.copy}</p>
                  </article>
                ))}
              </div>
              <div className="flex flex-col items-center justify-between gap-4 border-t border-stone-900/10 bg-gradient-to-r from-rose-50/80 to-teal-50/80 px-8 py-6 sm:flex-row">
                <p className="font-semibold text-stone-800">Ready to learn programming in Swahili?</p>
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

        <section className="px-5 py-20 sm:px-6 lg:px-8" id="syntax">
          <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.25rem] border border-stone-900/10 bg-gradient-to-br from-rose-100/75 via-white/65 to-teal-100/80 p-7 shadow-xl shadow-stone-900/5 backdrop-blur-sm sm:p-10 lg:p-12">
            <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-start">
              <div>
                <Eyebrow>SwahiliPro v2 syntax</Eyebrow>
                <h2 className="text-4xl font-black tracking-[-0.035em] text-stone-950 sm:text-5xl">
                  Readable Swahili commands. Familiar programming structure.
                </h2>
                <p className="mt-5 text-lg leading-8 text-stone-600">
                  Version 2 uses braces for blocks, conventional operators and concise
                  Swahili keywords. You learn the structure once, then focus on expressing
                  the logic clearly.
                </p>
                <a
                  className="mt-8 inline-flex items-center gap-2 font-bold text-emerald-800 hover:text-emerald-950"
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
                    className="rounded-2xl border border-stone-900/10 bg-white/65 p-6 shadow-sm backdrop-blur-sm"
                  >
                    <span className="font-mono text-sm font-bold text-emerald-800">{keyword}</span>
                    <h3 className="mt-3 text-xl font-bold text-stone-950">{title}</h3>
                    <pre className="mt-5 overflow-x-auto rounded-xl bg-[#151a18] p-4 text-xs leading-6 text-stone-300">
                      <code>{code}</code>
                    </pre>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-5 py-20 sm:px-6 lg:px-8" id="reviews">
          <div className="mx-auto max-w-7xl">
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
                  className="flex min-h-[285px] flex-col justify-between rounded-[1.7rem] border border-stone-900/10 bg-white/60 p-7 shadow-lg shadow-stone-900/5 backdrop-blur-sm"
                >
                  <div>
                    <Quote className="h-7 w-7 text-rose-500" />
                    <p className="mt-5 text-2xl font-bold text-stone-950">{testimonial.title}</p>
                    <p className="mt-4 text-lg leading-8 text-stone-600">“{testimonial.quote}”</p>
                  </div>
                  <footer className="mt-8 border-t border-stone-900/10 pt-5 text-sm font-semibold text-emerald-800">
                    {testimonial.source}
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-20 sm:px-6 lg:px-8" id="download">
          <div className="mx-auto max-w-7xl rounded-[2.25rem] border border-stone-900/10 bg-gradient-to-r from-rose-100/80 to-teal-100/80 p-7 shadow-xl shadow-stone-900/5 sm:p-10 lg:p-12">
            <div className="grid gap-10 lg:grid-cols-[.72fr_1.28fr] lg:items-end">
              <div>
                <Eyebrow>Standalone CLI</Eyebrow>
                <h2 className="text-4xl font-black tracking-[-0.035em] text-stone-950 sm:text-5xl">
                  Take SwahiliPro to the platform you already use.
                </h2>
                <p className="mt-5 text-lg leading-8 text-stone-600">
                  Download the standalone <code className="font-mono font-semibold text-emerald-800">swa</code>{" "}
                  runtime, place it on your PATH and run SwahiliPro files directly from your terminal.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {downloads.map((item) => (
                  <a
                    key={`${item.platform}-${item.detail}`}
                    className="group flex items-center justify-between rounded-2xl border border-stone-900/10 bg-white/65 p-5 shadow-sm backdrop-blur-sm transition hover:-translate-y-0.5 hover:bg-white/90 hover:shadow-lg"
                    href={item.href}
                  >
                    <span className="flex items-center gap-4">
                      <span className="grid h-12 w-12 place-items-center rounded-xl bg-white/80">
                        <img alt={`${item.platform} icon`} className="h-7 w-7 object-contain" src={item.icon} />
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
              <a className="inline-flex items-center gap-2 font-bold text-emerald-800" href={releaseUrl} rel="noreferrer" target="_blank">
                View v2.0.0 release <ExternalLink className="h-3.5 w-3.5" />
              </a>
              <span>•</span>
              <a className="inline-flex items-center gap-2 font-bold text-emerald-800" href={marketplaceUrl} rel="noreferrer" target="_blank">
                VS Code Marketplace <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </section>

        <section className="px-5 pb-16 pt-8 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-8 rounded-[2.25rem] border border-stone-900/10 bg-gradient-to-br from-teal-100/85 via-white/65 to-rose-100/80 px-7 py-10 shadow-xl shadow-stone-900/5 sm:px-10 lg:grid-cols-[1fr_auto] lg:items-center lg:px-12">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-emerald-800">Start where you are</p>
              <h2 className="mt-3 max-w-3xl text-4xl font-black tracking-[-0.035em] text-stone-950">
                Learn programming in Swahili, then keep building with modern developer tools.
              </h2>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <a className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-700 px-5 py-3.5 text-sm font-bold text-white" href="/lms">
                <Play className="h-4 w-4" /> Start learning
              </a>
              <a className="inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-900/15 bg-white/55 px-5 py-3.5 text-sm font-bold text-stone-900" href="/docs">
                Read the docs <BookOpen className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-emerald-950/10 bg-transparent text-stone-600">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-10 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <div>
            <p className="font-black text-stone-950">SwahiliPro</p>
            <p className="mt-1 text-sm">A Swahili programming language for learning and building.</p>
          </div>
          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
            <a className="hover:text-emerald-800" href="/docs">Docs</a>
            <a className="hover:text-emerald-800" href="/lms">Learn</a>
            <a className="hover:text-emerald-800" href="/examples">Examples</a>
            <a className="hover:text-emerald-800" href="/blog">Blog</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}