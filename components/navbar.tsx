"use client";

import { useState } from "react";
import { ExternalLink, Github, Menu, X } from "lucide-react";

const links = [
  { label: "Why SwahiliPro", href: "/#why" },
  { label: "Docs", href: "/docs" },
  { label: "Learn", href: "/lms" },
  { label: "Examples", href: "/examples" },
  { label: "Blog", href: "/blog" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-emerald-950/10 bg-[#fffaf5]/78 shadow-sm shadow-stone-900/[0.025] backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
        <a className="group flex items-center" href="/" aria-label="SwahiliPro home">
          <img
            src="/swahilipro-logo.svg"
            alt="SwahiliPro"
            className="h-10 w-auto max-w-[150px] object-contain transition group-hover:opacity-90 sm:max-w-[175px]"
          />
        </a>

        <nav className="hidden items-center gap-5 md:flex" aria-label="Primary navigation">
          {links.map((link) => (
            <a
              key={link.href}
              className="text-sm font-semibold text-stone-700 transition hover:text-emerald-800"
              href={link.href}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-1.5 md:flex">
          <a
            className="inline-flex h-9 items-center gap-2 px-3 text-sm font-semibold text-stone-700 transition hover:bg-white/55 hover:text-stone-950"
            href="https://github.com/bonnieace/swahilipro-downloads"
            target="_blank"
            rel="noreferrer"
          >
            <Github className="h-4 w-4" />
            Releases
          </a>
          <a
            className="inline-flex h-9 items-center gap-2 bg-emerald-700 px-4 text-sm font-bold text-white transition hover:bg-emerald-800"
            href="https://marketplace.visualstudio.com/items?itemName=masota.swahilipro"
            target="_blank"
            rel="noreferrer"
          >
            Install
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>

        <button
          className="grid h-9 w-9 place-items-center border border-emerald-950/10 bg-white/55 text-stone-800 md:hidden"
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-emerald-950/10 bg-[#fffaf5]/96 px-5 py-3 backdrop-blur-xl md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1" aria-label="Mobile navigation">
            {links.map((link) => (
              <a
                key={link.href}
                className="px-3 py-3 text-sm font-semibold text-stone-700 hover:bg-white/75"
                href={link.href}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              className="mt-2 inline-flex items-center justify-center gap-2 bg-emerald-700 px-4 py-3 text-sm font-bold text-white"
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
