"use client";

import { useState } from "react";
import { navLinks, profile } from "@/config/portfolio";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavClick = () => {
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b-2 border-pink-100 bg-white/90 shadow-sm shadow-pink-100/40 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <a
          href="#hero"
          className="font-display text-xl font-extrabold tracking-tight text-slate-800 transition-transform hover:scale-105"
          onClick={handleNavClick}
        >
          {profile.name.split(" ")[0]}
          <span className="bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
            .
          </span>
        </a>

        <nav className="hidden items-center gap-2 md:flex" aria-label="Main">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-2 text-sm font-semibold text-slate-600 transition-all hover:bg-pink-100 hover:text-pink-600"
            >
              {link.label}
            </a>
          ))}
          <a
            href={profile.social.email}
            className="ml-2 rounded-full bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-500 px-5 py-2 text-sm font-semibold text-white shadow-md shadow-pink-300/40 transition-all hover:shadow-lg"
          >
            Contact
          </a>
        </nav>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full border-2 border-pink-200 bg-white p-2.5 text-pink-500 transition-all hover:border-pink-300 hover:bg-pink-50 md:hidden"
          aria-expanded={mobileOpen}
          aria-label="Toggle navigation menu"
          onClick={() => setMobileOpen((open) => !open)}
        >
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            aria-hidden="true"
          >
            {mobileOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            )}
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <nav
          className="border-t border-pink-200/60 bg-white/95 px-4 py-4 md:hidden"
          aria-label="Mobile"
        >
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="block rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-600 transition-colors hover:bg-pink-50 hover:text-pink-600"
                  onClick={handleNavClick}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={profile.social.email}
                className="mt-2 block rounded-full bg-gradient-to-r from-pink-500 to-violet-500 px-3 py-2.5 text-center text-sm font-bold text-white"
                onClick={handleNavClick}
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
