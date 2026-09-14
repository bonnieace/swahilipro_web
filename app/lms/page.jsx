"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  Code2,
  Lock,
  Sparkles,
} from "lucide-react";

import Navbar from "@/components/navbar";

const LESSONS = [
  {
    id: 0,
    title: "Utangulizi · Getting started",
    points: 15,
    requiredPoints: 0,
    shortDescription:
      "Jifunze kuunda faili la .swa, kuandika programu yako ya kwanza na kuitumia kupitia swa CLI.",
    explanation:
      "SwahiliPro ni lugha ya programu inayotumia maneno yanayosomeka kwa Kiswahili huku muundo wa programu ukiendelea kufanana na lugha nyingine za kisasa. Unda faili lenye kiendelezi .swa, liandike katika VS Code, kisha uliendeshe kwa amri swa.",
    examples: [
      {
        title: "Hello world",
        code: 'andika("Habari Dunia!")',
      },
      {
        title: "Run from the terminal",
        code: "$ swa hello.swa",
      },
    ],
    practice: {
      question: "Andika programu inayochapisha: Karibu SwahiliPro",
      answer: 'andika("Karibu SwahiliPro")',
    },
  },
  {
    id: 1,
    title: "Vigezo · Variables",
    points: 15,
    requiredPoints: 15,
    shortDescription:
      "Hifadhi maandishi, nambari na thamani nyingine kwa kutumia acha.",
    explanation:
      "Katika SwahiliPro v2, kigezo kinatangazwa kwa kutumia neno acha. Jina la kigezo linaweza kutumika baadaye katika hesabu, masharti, kazi na matokeo ya programu.",
    examples: [
      {
        title: "Basic variables",
        code: 'acha jina = "Amina"\nacha umri = 24\nandika(jina)',
      },
      {
        title: "Combine values",
        code: 'acha salamu = "Habari " + jina\nandika(salamu)',
      },
    ],
    practice: {
      question: "Unda kigezo kinachoitwa umri na ukipe thamani 25.",
      answer: "acha umri = 25",
    },
  },
  {
    id: 2,
    title: "Hisabati · Arithmetic",
    points: 15,
    requiredPoints: 30,
    shortDescription:
      "Tumia +, -, *, / na operesheni nyingine kufanya hesabu ndani ya programu.",
    explanation:
      "Operesheni za hisabati hutumia alama zinazofahamika katika lugha nyingine za programu. Unaweza kuhifadhi majibu kwenye vigezo na kuyaonyesha kwa andika.",
    examples: [
      {
        title: "Addition",
        code: "acha a = 5\nacha b = 2\nacha jumla = a + b\nandika(jumla)",
      },
      {
        title: "Average",
        code: "acha jumla = 10 + 15 + 20\nacha wastani = jumla / 3\nandika(wastani)",
      },
    ],
    practice: {
      question: "Hesabu zao la 6 na 7 na ulichapishe.",
      answer: "acha zao = 6 * 7\nandika(zao)",
    },
  },
  {
    id: 3,
    title: "Masharti na marudio · Conditions & loops",
    points: 20,
    requiredPoints: 45,
    shortDescription:
      "Dhibiti mtiririko wa programu kwa ikiwa, vinginevyo, kwa na wakati.",
    explanation:
      "SwahiliPro v2 hutumia mabano ya curly braces kuonyesha blocks. Masharti yanatumia ikiwa na vinginevyo. Marudio yanaweza kutumia kwa ... katika kwa collection au range, pamoja na wakati kwa while-style loops.",
    examples: [
      {
        title: "Condition",
        code: 'acha umri = 20\n\nikiwa (umri >= 18) {\n  andika("Karibu")\n} vinginevyo {\n  andika("Bado mdogo")\n}',
      },
      {
        title: "Range loop",
        code: "kwa i katika 1..5 {\n  andika(i)\n}",
      },
    ],
    practice: {
      question: "Andika nambari 1 hadi 3 kwa kutumia kwa ... katika.",
      answer: "kwa i katika 1..4 {\n  andika(i)\n}",
    },
  },
  {
    id: 4,
    title: "Kazi · Functions",
    points: 20,
    requiredPoints: 65,
    shortDescription:
      "Tengeneza vipande vya msimbo vinavyotumika tena na urudishe matokeo kwa rudisha.",
    explanation:
      "SwahiliPro v2 haitumii neno maalum la kuanzisha function. Andika jina la function, parameters ndani ya mabano, halafu body ndani ya braces. Tumia rudisha ikiwa function inahitaji kutoa thamani.",
    examples: [
      {
        title: "Add two numbers",
        code: "jumlisha(a, b) {\n  rudisha a + b\n}\n\nacha jibu = jumlisha(5, 3)\nandika(jibu)",
      },
      {
        title: "Greeting",
        code: 'karibisha(jina) {\n  rudisha "Habari, " + jina\n}\n\nandika(karibisha("Amina"))',
      },
    ],
    practice: {
      question: "Tengeneza function zidisha(a, b) inayorudisha zao la nambari mbili.",
      answer: "zidisha(a, b) {\n  rudisha a * b\n}",
    },
  },
  {
    id: 5,
    title: "Mantiki · Logic",
    points: 15,
    requiredPoints: 85,
    shortDescription:
      "Unganisha masharti kwa na, au na sio pamoja na kweli na uongo.",
    explanation:
      "Mantiki hutumika kutengeneza masharti yenye sehemu zaidi ya moja. na inahitaji masharti yote yawe kweli, au inahitaji angalau moja, na sio hubadilisha boolean. Thamani za boolean ni kweli na uongo.",
    examples: [
      {
        title: "AND logic",
        code: 'acha umri = 25\nacha ana_kitambulisho = kweli\n\nikiwa (umri >= 18 na ana_kitambulisho) {\n  andika("Unaweza kuingia")\n}',
      },
      {
        title: "OR logic",
        code: 'acha saa = 23\n\nikiwa (saa < 6 au saa > 22) {\n  andika("Duka limefungwa")\n}',
      },
    ],
    practice: {
      question: "Kagua kama nambari iko kati ya 1 na 10.",
      answer: 'acha nambari = 5\n\nikiwa (nambari >= 1 na nambari <= 10) {\n  andika("Nambari sahihi")\n}',
    },
  },
  {
    id: 6,
    title: "Orodha · Lists",
    points: 15,
    requiredPoints: 100,
    shortDescription:
      "Hifadhi collections za data, soma kwa index na ongeza values mpya.",
    explanation:
      "Lists hutumia bracket syntax inayofahamika. Indexing ni zero-based, kwa hiyo item ya kwanza iko kwenye index 0. Tumia ongeza kuweka item mpya kwenye list.",
    examples: [
      {
        title: "Create and read a list",
        code: 'acha miji = ["Nairobi", "Mombasa", "Kisumu"]\nandika(miji[0])',
      },
      {
        title: "Append an item",
        code: 'ongeza(miji, "Nakuru")\nandika(urefu(miji))',
      },
    ],
    practice: {
      question: "Unda list ya lugha tatu na uchapishe item ya pili.",
      answer: 'acha lugha = ["SwahiliPro", "Python", "JavaScript"]\nandika(lugha[1])',
    },
  },
];

const BADGES = [
  { name: "Mwanafunzi", min: 25, icon: "🌱" },
  { name: "Mjuzi", min: 60, icon: "⭐" },
  { name: "Mtaalam", min: 100, icon: "👑" },
];

function Progress({ points, total }) {
  const percent = Math.min(100, Math.round((points / total) * 100));

  return (
    <div>
      <div className="flex items-center justify-between text-sm font-semibold text-stone-600">
        <span>{points} pointi</span>
        <span>{percent}%</span>
      </div>
      <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-emerald-950/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-emerald-600 to-teal-500 transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

function Practice({ practice }) {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="rounded-2xl border border-rose-900/10 bg-rose-50 p-5">
      <p className="font-semibold text-stone-900">{practice.question}</p>
      <button
        className="mt-4 rounded-xl bg-rose-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-rose-700"
        onClick={() => setRevealed((value) => !value)}
        type="button"
      >
        {revealed ? "Ficha jibu" : "Onyesha jibu"}
      </button>
      {revealed && (
        <pre className="mt-4 overflow-x-auto rounded-xl bg-stone-950 p-4 text-sm leading-7 text-stone-200">
          <code>{practice.answer}</code>
        </pre>
      )}
    </div>
  );
}

export default function SwahiliProgrammingLMS() {
  const [completed, setCompleted] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("swahiliLMSProgressV2");
    if (saved) setCompleted(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("swahiliLMSProgressV2", JSON.stringify(completed));
  }, [completed]);

  const points = useMemo(
    () =>
      completed.reduce((sum, id) => {
        const lesson = LESSONS.find((item) => item.id === id);
        return sum + (lesson?.points ?? 0);
      }, 0),
    [completed],
  );

  const totalPoints = useMemo(
    () => LESSONS.reduce((sum, lesson) => sum + lesson.points, 0),
    [],
  );

  const selected = LESSONS.find((lesson) => lesson.id === selectedId);

  function completeLesson(id) {
    if (!completed.includes(id)) setCompleted((items) => [...items, id]);
  }

  if (selected) {
    const isCompleted = completed.includes(selected.id);

    return (
      <div className="min-h-screen bg-[#fffaf5] text-stone-900">
        <Navbar />
        <main className="mx-auto max-w-5xl px-5 py-12 sm:px-6 lg:px-8">
          <button
            className="inline-flex items-center gap-2 text-sm font-bold text-emerald-800"
            onClick={() => setSelectedId(null)}
            type="button"
          >
            <ArrowLeft className="h-4 w-4" /> Rudi kwenye masomo
          </button>

          <div className="mt-8 rounded-[2rem] border border-stone-900/10 bg-white p-6 shadow-xl shadow-stone-900/5 sm:p-10">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <span className="text-xs font-black uppercase tracking-[0.16em] text-rose-600">Somo {selected.id + 1}</span>
                <h1 className="mt-3 text-4xl font-black tracking-[-0.035em] text-stone-950">{selected.title}</h1>
                <p className="mt-4 max-w-3xl text-lg leading-8 text-stone-600">{selected.explanation}</p>
              </div>
              <button
                className={`shrink-0 rounded-xl px-4 py-3 text-sm font-bold ${isCompleted ? "bg-emerald-100 text-emerald-800" : "bg-emerald-700 text-white hover:bg-emerald-800"}`}
                disabled={isCompleted}
                onClick={() => completeLesson(selected.id)}
                type="button"
              >
                {isCompleted ? "Imekamilika" : `Maliza somo · +${selected.points}`}
              </button>
            </div>

            <section className="mt-10">
              <h2 className="text-2xl font-black text-stone-950">Mifano</h2>
              <div className="mt-5 grid gap-4">
                {selected.examples.map((example) => (
                  <article key={example.title} className="overflow-hidden rounded-2xl border border-stone-900/10">
                    <div className="bg-stone-50 px-5 py-3 text-sm font-bold text-stone-700">{example.title}</div>
                    <pre className="overflow-x-auto bg-stone-950 p-5 text-sm leading-7 text-stone-200"><code>{example.code}</code></pre>
                  </article>
                ))}
              </div>
            </section>

            <section className="mt-10">
              <h2 className="text-2xl font-black text-stone-950">Jaribu mwenyewe</h2>
              <div className="mt-5"><Practice practice={selected.practice} /></div>
            </section>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fffaf5] text-stone-900">
      <Navbar />

      <header className="border-b border-emerald-950/10 bg-gradient-to-br from-rose-100 via-[#fffaf5] to-teal-100">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:px-8 lg:py-18">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-950/10 bg-white/70 px-3.5 py-2 text-xs font-black uppercase tracking-[0.18em] text-emerald-800">
            <Sparkles className="h-3.5 w-3.5" /> Interactive Swahili programming course
          </div>
          <h1 className="mt-6 max-w-4xl text-5xl font-black tracking-[-0.045em] text-stone-950 sm:text-6xl">
            Learn programming in Swahili.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-stone-700">
            SwahiliPro’s learning path teaches beginner programming concepts in Kiswahili using the current SwahiliPro v2 syntax. Start with your first <code className="font-mono font-semibold text-emerald-800">.swa</code> file, then work through variables, arithmetic, conditions, loops, functions, logic and lists.
          </p>
          <p className="mt-4 max-w-3xl leading-7 text-stone-600">
            The goal is to help you understand the idea in a language you already use while practising programming structure that transfers to other modern languages.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:px-8">
        <section className="grid gap-6 rounded-[2rem] border border-stone-900/10 bg-white p-6 shadow-lg shadow-stone-900/5 lg:grid-cols-[1fr_auto] lg:items-center lg:p-8">
          <div>
            <p className="text-sm font-black text-stone-950">Maendeleo yako</p>
            <div className="mt-3 max-w-2xl"><Progress points={points} total={totalPoints} /></div>
          </div>
          <div className="flex flex-wrap gap-2">
            {BADGES.map((badge) => (
              <span key={badge.name} className={`rounded-full px-3 py-2 text-xs font-bold ${points >= badge.min ? "bg-emerald-100 text-emerald-800" : "bg-stone-100 text-stone-400"}`}>
                {badge.icon} {badge.name}
              </span>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <div className="flex items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 text-sm font-black text-rose-600"><BookOpen className="h-4 w-4" /> Kozi ya msingi</div>
              <h2 className="mt-2 text-3xl font-black tracking-[-0.03em] text-stone-950">Masomo ya SwahiliPro v2</h2>
            </div>
            <a className="hidden text-sm font-bold text-emerald-800 sm:block" href="/docs">Fungua documentation →</a>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {LESSONS.map((lesson) => {
              const locked = points < lesson.requiredPoints;
              const done = completed.includes(lesson.id);

              return (
                <button
                  key={lesson.id}
                  className={`group flex min-h-[220px] flex-col justify-between rounded-[1.6rem] border p-6 text-left transition ${locked ? "cursor-not-allowed border-stone-900/5 bg-stone-100/70 opacity-65" : done ? "border-emerald-700/20 bg-emerald-50 hover:-translate-y-0.5" : "border-stone-900/10 bg-white shadow-sm hover:-translate-y-0.5 hover:shadow-lg"}`}
                  disabled={locked}
                  onClick={() => setSelectedId(lesson.id)}
                  type="button"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-100 text-emerald-800"><Code2 className="h-5 w-5" /></span>
                      {locked ? <Lock className="h-4 w-4 text-stone-400" /> : done ? <CheckCircle2 className="h-5 w-5 text-emerald-700" /> : <span className="text-xs font-black text-rose-600">+{lesson.points}</span>}
                    </div>
                    <h3 className="mt-5 text-xl font-black text-stone-950">{lesson.title}</h3>
                    <p className="mt-3 leading-7 text-stone-600">{lesson.shortDescription}</p>
                  </div>
                  {locked && <p className="mt-5 text-xs font-bold text-stone-400">Fungua baada ya pointi {lesson.requiredPoints}</p>}
                </button>
              );
            })}
          </div>
        </section>

        <section className="mt-14 rounded-[2rem] bg-emerald-800 p-8 text-white sm:p-10">
          <h2 className="text-3xl font-black tracking-[-0.03em]">Unahitaji reference ya syntax?</h2>
          <p className="mt-3 max-w-2xl leading-7 text-emerald-50">Masomo haya yanaeleza concepts hatua kwa hatua. Documentation ndiyo reference ya haraka ya syntax, CLI, VS Code na mifano ya SwahiliPro.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a className="rounded-xl bg-white px-5 py-3 text-sm font-bold text-emerald-900" href="/docs">Soma documentation</a>
            <a className="rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-bold text-white" href="/examples">Angalia examples</a>
          </div>
        </section>
      </main>
    </div>
  );
}
