import type { ReactNode } from "react";
import {
  ArrowRight,
  BookOpen,
  Braces,
  Check,
  Code2,
  Download,
  ExternalLink,
  Globe2,
  GraduationCap,
  HeartHandshake,
  Quote,
  Rocket,
  Sparkles,
  Terminal,
  Trophy,
} from "lucide-react";

import Navbar from "@/components/navbar";

const marketplaceUrl =
  "https://marketplace.visualstudio.com/items?itemName=masota.swahilipro";
const releaseUrl =
  "https://github.com/bonnieace/swahilipro-downloads/releases/tag/v2.0.0";

const platforms = [
  {
    name: "Windows",
    note: "Standalone CLI",
    icon: "https://cdn.simpleicons.org/windows11/0f172a",
  },
  {
    name: "Linux",
    note: "Standalone CLI",
    icon: "https://cdn.simpleicons.org/linux/0f172a",
  },
  {
    name: "macOS",
    note: "Intel + Apple Silicon",
    icon: "https://cdn.simpleicons.org/apple/0f172a",
  },
  {
    name: "VS Code",
    note: "Extension",
    icon: "https://cdn.simpleicons.org/visualstudiocode/007ACC",
  },
];

const downloads = [
  {
    platform: "Windows",
    detail: "x64 · .exe",
    icon: "https://cdn.simpleicons.org/windows11/0f172a",
    href: "https://github.com/bonnieace/swahilipro-downloads/releases/download/v2.0.0/swa-windows-x86_64.exe",
  },
  {
    platform: "Linux",
    detail: "x64",
    icon: "https://cdn.simpleicons.org/linux/0f172a",
    href: "https://github.com/bonnieace/swahilipro-downloads/releases/download/v2.0.0/swa-linux-x86_64",
  },
  {
    platform: "macOS",
    detail: "Apple Silicon",
    icon: "https://cdn.simpleicons.org/apple/0f172a",
    href: "https://github.com/bonnieace/swahilipro-downloads/releases/download/v2.0.0/swa-darwin-arm64",
  },
  {
    platform: "macOS",
    detail: "Intel",
    icon: "https://cdn.simpleicons.org/apple/0f172a",
    href: "https://github.com/bonnieace/swahilipro-downloads/releases/download/v2.0.0/swa-darwin-x86_64",
  },
];

const testimonials = [
  {
    title: "Genius Idea!!",
    quote:
      "The idea from swahilipro foundation is groundbreaking and revolutionary.",
    author: "Chief ICT officer, Kiambu County KE.",
  },
  {
    title: "Awesome",
    quote:
      "Writing code in swahili feels like a dream come true. Concepts feel more familiar and easy to grasp.",
    author: "Anonymous Student",
  },
  {
    title: "Incredible.",
    quote:
      "The idea is fascinating and caters to a lot of issues programmers face in Tanzania. Having a swahili programming language is incredible.",
    author: "Founder, Silabu Foundation TZ.",
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

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-rose-200 bg-white/70 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-rose-700 shadow-sm shadow-rose-100/70">
      <Sparkles className="h-3.5 w-3.5" />
      {children}
    </div>
  );
}

function PlatformRail() {
  const items = [...platforms, ...platforms];

  return (
    <div className="mt-8 flex items-center gap-4">
      <span className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
        Build with
      </span>
      <div className="relative h-[58px] min-w-[230px] overflow-hidden rounded-2xl border border-white/80 bg-white/70 px-4 shadow-sm backdrop-blur">
        <div className="platform-scroll-track">
          {items.map((platform, index) => (
            <div
              key={`${platform.name}-${index}`}
              className="flex h-[58px] items-center gap-3"
            >
              <img
                alt={`${platform.name} icon`}
                className="h-6 w-6 object-contain"
                src={platform.icon}
              />
              <div>
                <p className="text-sm font-bold text-slate-900">{platform.name}</p>
                <p className="text-xs text-slate-500">{platform.note}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-amber-50 to-teal-50 text-slate-900 selection:bg-rose-200 selection:text-slate-950">
      <Navbar />

      <main>
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-24 top-10 h-80 w-80 rounded-full bg-rose-200/55 blur-3xl" />
            <div className="absolute right-[-8rem] top-24 h-96 w-96 rounded-full bg-teal-200/55 blur-3xl" />
            <div className="absolute left-1/2 top-[32rem] h-72 w-72 rounded-full bg-amber-200/40 blur-3xl" />
          </div>

          <div className="relative mx-auto grid max-w-7xl gap-14 px-5 pb-20 pt-16 sm:px-6 lg:grid-cols-[1.02fr_.98fr] lg:items-center lg:px-8 lg:pb-28 lg:pt-24">
            <div>
              <a
                href={releaseUrl}
                target="_blank"
                rel="noreferrer"
                className="mb-7 inline-flex items-center gap-2 rounded-full border border-rose-200 bg-white/70 px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-rose-300"
              >
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Swahili programming language · v2.0.0
                <ArrowRight className="h-3.5 w-3.5" />
              </a>

              <h1 className="max-w-4xl text-5xl font-black leading-[0.98] tracking-[-0.05em] text-slate-950 sm:text-6xl lg:text-7xl">
                Think in Swahili.
                <span className="mt-2 block bg-gradient-to-r from-rose-600 via-orange-500 to-teal-600 bg-clip-text text-transparent">
                  Code like any other modern developer.
                </span>
              </h1>

              <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-700 sm:text-xl">
                Swahilipro is a modern <strong>Swahili programming language</strong>{" "}
                and learning platform built to make programming easier to learn,
                teach and use in Kiswahili — while keeping the concepts, structure
                and workflows developers use everywhere.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href={marketplaceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-slate-950/10 transition hover:-translate-y-0.5 hover:bg-slate-800"
                >
                  <Code2 className="h-4 w-4" />
                  Install for VS Code
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
                <a
                  href="/lms"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-rose-200 bg-white/75 px-5 py-3.5 text-sm font-bold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:border-rose-300 hover:bg-white"
                >
                  <GraduationCap className="h-4 w-4 text-rose-600" />
                  Learn programming in Swahili
                </a>
              </div>

              <PlatformRail />
            </div>

            <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
              <div className="grid grid-cols-[1.15fr_.85fr] gap-3">
                <div className="relative min-h-[430px] overflow-hidden rounded-[2rem] border-4 border-white bg-white shadow-2xl shadow-rose-200/40">
                  <img
                    alt="Swahilipro team presenting the Swahili programming language at JKUAT Tech Expo"
                    className="absolute inset-0 h-full w-full object-cover"
                    src="/EXPO7.JPG"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent p-6 pt-24 text-white">
                    <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur">
                      <Trophy className="h-3.5 w-3.5 text-amber-300" />
                      JKUAT Tech Expo 14
                    </div>
                    <p className="mt-3 text-xl font-bold">Built, demonstrated and taught in the real world.</p>
                  </div>
                </div>

                <div className="grid gap-3">
                  <div className="overflow-hidden rounded-[1.6rem] border-4 border-white bg-white shadow-xl shadow-teal-100/50">
                    <img
                      alt="Swahilipro presentation with public and education stakeholders"
                      className="h-full min-h-[205px] w-full object-cover"
                      src="/kicc1.jpg"
                    />
                  </div>
                  <div className="overflow-hidden rounded-[1.6rem] border border-slate-800 bg-slate-950 shadow-xl">
                    <div className="flex h-10 items-center gap-1.5 border-b border-white/10 px-4">
                      <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                      <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                    </div>
                    <pre className="overflow-x-auto p-5 text-[11px] leading-6 text-slate-300 sm:text-xs">
                      <code>{`acha lugha = "Swahili"\n\nikiwa (lugha == "Swahili") {\n  andika("Tuanze kujenga")\n}`}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-rose-200/70 bg-white/55">
          <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 sm:px-6 lg:grid-cols-[.72fr_1.28fr] lg:items-center lg:px-8">
            <div className="flex items-center gap-4">
              <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-rose-600 text-white shadow-lg shadow-rose-200">
                <BookOpen className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-rose-700">SDG 4 · Quality Education</p>
                <p className="mt-1 text-lg font-black text-slate-950">Programming education should not begin with a language barrier.</p>
              </div>
            </div>
            <p className="text-base leading-7 text-slate-700 lg:border-l lg:border-rose-200 lg:pl-8">
              Swahilipro gives learners a path into programming through a language they already understand, while teaching transferable concepts they can carry into mainstream software development. That makes coding in Swahili a bridge into technology, not a separate destination.
            </p>
          </div>
        </section>

        <section id="why">
          <div className="mx-auto max-w-7xl px-5 py-24 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-[.75fr_1.25fr] lg:items-start">
              <div className="lg:sticky lg:top-28">
                <Eyebrow>Why Swahilipro</Eyebrow>
                <h2 className="text-4xl font-black tracking-[-0.04em] text-slate-950 sm:text-5xl">
                  Learn programming without translating every idea in your head first.
                </h2>
                <p className="mt-5 text-lg leading-8 text-slate-600">
                  Swahilipro is not English programming with labels swapped out. It is a learning and development experience designed around familiar programming concepts expressed with readable Swahili commands.
                </p>
              </div>

              <div className="overflow-hidden rounded-[2rem] border border-white/80 bg-white/65 shadow-xl shadow-rose-100/60 backdrop-blur">
                {[
                  {
                    icon: <Globe2 className="h-6 w-6" />,
                    number: "01",
                    title: "Think through the problem in Swahili",
                    copy: "Use readable commands such as ikiwa, andika, kwa and rudisha so the language of the code is closer to the language of your reasoning.",
                  },
                  {
                    icon: <Braces className="h-6 w-6" />,
                    number: "02",
                    title: "Learn concepts that transfer",
                    copy: "Variables, functions, conditions, loops, lists and familiar block structure mean what you learn maps naturally to other modern programming languages.",
                  },
                  {
                    icon: <Rocket className="h-6 w-6" />,
                    number: "03",
                    title: "Use real developer workflows",
                    copy: "Write .swa files in VS Code, run them with the swa CLI and work across Windows, Linux and macOS instead of learning inside a closed classroom-only environment.",
                  },
                ].map((item, index) => (
                  <article
                    key={item.number}
                    className={`grid gap-5 p-7 sm:grid-cols-[72px_1fr_auto] sm:items-center sm:p-9 ${
                      index !== 2 ? "border-b border-rose-100" : ""
                    }`}
                  >
                    <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-rose-100 to-teal-100 text-slate-900">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-slate-950">{item.title}</h3>
                      <p className="mt-2 max-w-2xl leading-7 text-slate-600">{item.copy}</p>
                    </div>
                    <span className="font-mono text-sm font-bold text-rose-500">{item.number}</span>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-teal-100 bg-teal-50/55" id="stories">
          <div className="mx-auto max-w-7xl px-5 py-24 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[.85fr_1.15fr] lg:items-end">
              <div>
                <Eyebrow>Built in public</Eyebrow>
                <h2 className="text-4xl font-black tracking-[-0.04em] text-slate-950 sm:text-5xl">
                  More than a compiler. A project people have seen, tested and discussed.
                </h2>
                <p className="mt-5 text-lg leading-8 text-slate-600">
                  From university technology expos to public exhibitions, Swahilipro has been presented to students, developers, educators, government officials and technology stakeholders.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {[
                  ["/EXPO5.JPG", "Swahilipro product demo at JKUAT Tech Expo"],
                  ["/kicc7.jpg", "Swahilipro exhibition setup at KICC"],
                  ["/coop2.jpg", "Swahilipro at the Co-operative University Tech Expo"],
                ].map(([src, alt], index) => (
                  <div
                    key={src}
                    className={`overflow-hidden rounded-[1.5rem] border-4 border-white shadow-lg ${index === 1 ? "translate-y-5" : ""}`}
                  >
                    <img alt={alt} className="aspect-[4/5] h-full w-full object-cover" src={src} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="syntax">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-6 lg:grid-cols-[.88fr_1.12fr] lg:items-center lg:px-8">
            <div>
              <Eyebrow>Swahilipro syntax</Eyebrow>
              <h2 className="text-4xl font-black tracking-[-0.04em] text-slate-950 sm:text-5xl">
                Swahili where people read. Familiar structure where developers expect it.
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-600">
                Version 2 uses braces, familiar operators and concise Swahili keywords. The result is code that looks like programming while reading more naturally to a Swahili speaker.
              </p>
              <div className="mt-8 flex flex-wrap gap-2">
                {["acha", "ikiwa", "vinginevyo", "kwa", "wakati", "andika", "rudisha", "na / au / sio"].map((token) => (
                  <span key={token} className="rounded-full border border-rose-200 bg-white/75 px-3.5 py-2 font-mono text-xs font-semibold text-slate-700 shadow-sm">
                    {token}
                  </span>
                ))}
              </div>
            </div>

            <div className="overflow-hidden rounded-[2rem] border border-slate-800 bg-slate-950 shadow-2xl shadow-teal-100/60">
              <div className="flex h-12 items-center justify-between border-b border-white/10 px-5">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                </div>
                <span className="font-mono text-xs text-slate-500">hello.swa</span>
              </div>
              <pre className="overflow-x-auto p-7 text-[13px] leading-7 text-slate-300 sm:p-9 sm:text-sm">
                <code>{codeExample}</code>
              </pre>
              <div className="flex items-center justify-between border-t border-white/10 bg-white/[0.03] px-6 py-4 font-mono text-xs sm:text-sm">
                <span className="text-slate-300"><span className="mr-2 text-emerald-400">$</span>swa hello.swa</span>
                <span className="text-emerald-300">Karibu, Amina!</span>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-rose-100 bg-white/55">
          <div className="mx-auto max-w-7xl px-5 py-24 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-[.72fr_1.28fr] lg:items-start">
              <div>
                <Eyebrow>Start building</Eyebrow>
                <h2 className="text-4xl font-black tracking-[-0.04em] text-slate-950 sm:text-5xl">
                  From install to your first Swahili program.
                </h2>
                <p className="mt-5 text-lg leading-8 text-slate-600">
                  Pick the workflow that already feels familiar. Swahilipro fits into your editor and terminal instead of forcing you into a separate learning environment.
                </p>
              </div>

              <div className="relative pl-8 sm:pl-12">
                <div className="absolute bottom-5 left-[15px] top-5 w-px bg-gradient-to-b from-rose-400 via-amber-400 to-teal-500 sm:left-[23px]" />
                {[
                  {
                    number: "1",
                    title: "Install Swahilipro",
                    copy: "Install the VS Code extension or download the standalone CLI for your operating system.",
                    icon: <Download className="h-5 w-5" />,
                  },
                  {
                    number: "2",
                    title: "Create a .swa file",
                    copy: "Write modern Swahilipro syntax with familiar blocks, operators and readable Swahili commands.",
                    icon: <Code2 className="h-5 w-5" />,
                  },
                  {
                    number: "3",
                    title: "Run real code",
                    copy: "Use Run File in VS Code or execute swa hello.swa directly from your terminal.",
                    icon: <Terminal className="h-5 w-5" />,
                  },
                ].map((step) => (
                  <div key={step.number} className="relative pb-10 last:pb-0">
                    <div className="absolute -left-8 grid h-8 w-8 place-items-center rounded-full bg-slate-950 text-xs font-black text-white shadow-md sm:-left-12 sm:h-12 sm:w-12">
                      {step.number}
                    </div>
                    <div className="rounded-[1.5rem] border border-white bg-white/80 p-6 shadow-md shadow-rose-100/40 sm:p-7">
                      <div className="flex items-center gap-3 text-rose-600">{step.icon}<span className="text-xs font-bold uppercase tracking-[0.16em]">Step {step.number}</span></div>
                      <h3 className="mt-3 text-xl font-black text-slate-950">{step.title}</h3>
                      <p className="mt-2 leading-7 text-slate-600">{step.copy}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="Reviews">
          <div className="mx-auto max-w-7xl px-5 py-24 sm:px-6 lg:px-8">
            <div className="mb-12 max-w-3xl">
              <Eyebrow>What people told us</Eyebrow>
              <h2 className="text-4xl font-black tracking-[-0.04em] text-slate-950 sm:text-5xl">
                Real feedback from people who encountered Swahilipro.
              </h2>
            </div>

            <div className="grid gap-5 lg:grid-cols-[1.1fr_.9fr]">
              <blockquote className="relative overflow-hidden rounded-[2rem] bg-slate-950 p-8 text-white shadow-2xl shadow-rose-200/40 sm:p-10">
                <Quote className="absolute right-8 top-8 h-14 w-14 text-rose-300/20" />
                <div className="flex gap-1 text-amber-300" aria-label="5 out of 5 stars">★★★★★</div>
                <p className="mt-8 text-3xl font-black text-rose-300 sm:text-4xl">{testimonials[0].title}</p>
                <p className="mt-5 max-w-xl text-xl leading-9 text-slate-200">“{testimonials[0].quote}”</p>
                <footer className="mt-9 text-sm font-semibold text-slate-400">— {testimonials[0].author}</footer>
              </blockquote>

              <div className="grid gap-5">
                {testimonials.slice(1).map((item) => (
                  <blockquote key={item.author} className="rounded-[1.75rem] border border-white bg-white/80 p-7 shadow-lg shadow-teal-100/40">
                    <div className="flex items-center justify-between gap-4">
                      <p className="text-2xl font-black text-rose-600">{item.title}</p>
                      <span className="text-sm tracking-[0.14em] text-amber-500" aria-label="5 out of 5 stars">★★★★★</span>
                    </div>
                    <p className="mt-4 leading-8 text-slate-700">“{item.quote}”</p>
                    <footer className="mt-5 text-sm font-semibold text-slate-500">— {item.author}</footer>
                  </blockquote>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="download" className="border-y border-teal-100 bg-teal-50/60">
          <div className="mx-auto max-w-7xl px-5 py-24 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
              <div>
                <Eyebrow>Standalone CLI</Eyebrow>
                <h2 className="text-4xl font-black tracking-[-0.04em] text-slate-950 sm:text-5xl">
                  Take Swahilipro to the platform you already use.
                </h2>
                <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
                  Download the public Swahilipro CLI for Windows, Linux or macOS, rename it to <code className="font-semibold text-slate-900">swa</code> and place it on your PATH.
                </p>
                <a href={releaseUrl} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-rose-700 transition hover:text-rose-800">
                  View the public v2.0.0 release <ExternalLink className="h-4 w-4" />
                </a>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {downloads.map((item) => (
                  <a
                    key={`${item.platform}-${item.detail}`}
                    href={item.href}
                    className="group flex items-center justify-between rounded-[1.4rem] border border-white bg-white/80 p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg hover:shadow-teal-100"
                  >
                    <div className="flex items-center gap-4">
                      <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-rose-50 to-teal-50">
                        <img alt={`${item.platform} logo`} className="h-6 w-6 object-contain" src={item.icon} />
                      </span>
                      <div>
                        <p className="font-black text-slate-950">{item.platform}</p>
                        <p className="mt-0.5 text-xs text-slate-500">{item.detail}</p>
                      </div>
                    </div>
                    <Download className="h-5 w-5 text-slate-400 transition group-hover:text-rose-600" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-5 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-6 overflow-hidden rounded-[2.2rem] bg-gradient-to-r from-rose-600 via-orange-500 to-teal-600 p-8 text-white shadow-2xl shadow-rose-200/50 sm:p-12 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-white/75"><HeartHandshake className="h-4 w-4" /> Learn in a language closer to home</div>
              <h2 className="mt-4 max-w-3xl text-3xl font-black tracking-[-0.04em] sm:text-5xl">Start learning programming in Swahili.</h2>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-white/85">Explore the learning path, write your first .swa program and build from there.</p>
            </div>
            <a href="/lms" className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3.5 text-sm font-black text-slate-950 shadow-lg transition hover:-translate-y-0.5">
              Open the learning path <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </section>
      </main>

      <footer className="border-t border-rose-100 bg-white/50">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 text-sm text-slate-500 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <p><strong className="text-slate-700">Swahilipro</strong> · Swahili programming language for learning and building.</p>
          <div className="flex flex-wrap gap-5">
            <a className="transition hover:text-rose-700" href="/lms">Learn</a>
            <a className="transition hover:text-rose-700" href="#syntax">Syntax</a>
            <a className="transition hover:text-rose-700" href={releaseUrl} target="_blank" rel="noreferrer">Downloads</a>
            <a className="transition hover:text-rose-700" href={marketplaceUrl} target="_blank" rel="noreferrer">VS Code Marketplace</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
