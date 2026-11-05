"use client";

import Link from "next/link";
import { useState } from "react";
import { navLinks, profile } from "@/config/portfolio";
import { ThemeClock } from "@/components/layout/ThemeClock";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const close = () => setMobileOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-page/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="focus-ring flex items-center gap-2.5 rounded-md font-semibold tracking-tight" onClick={close}>
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent text-sm font-bold text-on-accent">
            {profile.firstName[0]}
          </span>
          {profile.name}
        </Link>

        <nav className="ml-auto hidden items-center gap-1 md:flex" aria-label="Main">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="focus-ring rounded-full px-3 py-2 text-sm text-muted hover:bg-soft hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 md:ml-2">
          <ThemeClock />
          <button
            type="button"
            className="focus-ring grid h-9 w-9 place-items-center rounded-full border border-line md:hidden"
            aria-expanded={mobileOpen}
            aria-label="Toggle navigation menu"
            onClick={() => setMobileOpen((open) => !open)}
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
              {mobileOpen ? (
                <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="border-t border-line px-4 py-2 md:hidden" aria-label="Mobile">
          <ul className="flex flex-col">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="focus-ring block rounded-lg px-2 py-3 text-sm" onClick={close}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
