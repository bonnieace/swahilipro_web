"use client";

import { useState } from "react";
import { ExternalLink, Github, Menu, X } from "lucide-react";

const links = [
  { label: "Why SwahiliPro", href: "#why" },
  { label: "Syntax", href: "#syntax" },
  { label: "Download", href: "#download" },
  { label: "Learn", href: "/lms" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
        <a className="group flex items-center gap-3" href="/" aria-label="SwahiliPro home">
          <span className="grid h-9 w-9 place-items-center rounded-xl border border-emerald-400/20 bg-emerald-400/10 font-mono text-sm font-bold text-emerald-300 transition group-hover:border-emerald-300/40 group-hover:bg-emerald-400/15">
            SW
          </span>
          <span className="text-sm font-semibold tracking-wide text-white sm:text-base">
            SwahiliPro
          </span>
        </a>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary navigation">
          {links.map((link) => (
            <a
              key={link.href}
              className="text-sm font-medium text-slate-300 transition hover:text-white"
              href={link.href}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <a
            className="inline-flex h-9 items-center gap-2 rounded-lg px-3 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white"
            href="https://github.com/bonnieace/swahilipro-downloads"
            target="_blank"
            rel="noreferrer"
          >
            <Github className="h-4 w-4" />
            Releases
          </a>
          <a
            className="inline-flex h-9 items-center gap-2 rounded-lg bg-emerald-400 px-4 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300"
            href="https://marketplace.visualstudio.com/items?itemName=masota.swahilipro"
            target="_blank"
            rel="noreferrer"
          >
            Install
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>

        <button
          className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 text-slate-200 md:hidden"
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-slate-950 px-5 py-4 md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1" aria-label="Mobile navigation">
            {links.map((link) => (
              <a
                key={link.href}
                className="rounded-lg px-3 py-3 text-sm font-medium text-slate-200 hover:bg-white/5"
                href={link.href}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-400 px-4 py-3 text-sm font-semibold text-slate-950"
              href="https://marketplace.visualstudio.com/items?itemName=masota.swahilipro"
              target="_blank"
              rel="noreferrer"
            >
              Install for VS Code
              <ExternalLink className="h-4 w-4" />
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
