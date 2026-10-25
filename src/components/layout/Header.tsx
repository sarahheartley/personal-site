"use client";

import { useState } from "react";
import { navLinks, profile } from "@/config/portfolio";
import { ThemeClock } from "@/components/layout/ThemeClock";
import { PixelSprite } from "@/components/ui/PixelSprite";
import { emblem, heart } from "@/components/ui/sprites";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavClick = () => {
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-hud text-on-hud shadow-[0_4px_0_0_var(--dirt)]">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <a
          href="#hero"
          className="pixel-link flex items-center gap-3 font-pixel text-xs sm:text-sm"
          onClick={handleNavClick}
        >
          <PixelSprite sprite={emblem} scale={3} />
          {profile.name}
        </a>

        <nav className="ml-auto hidden items-center gap-1 md:flex" aria-label="Main">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="pixel-link px-2 py-2 font-pixel text-[11px] hover:underline hover:underline-offset-4"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-4 md:ml-2">
          <div className="hidden gap-1 lg:flex" aria-hidden="true">
            <PixelSprite sprite={heart} scale={2} />
            <PixelSprite sprite={heart} scale={2} />
            <PixelSprite sprite={heart} scale={2} />
          </div>
          <ThemeClock />
          <button
            type="button"
            className="pixel-button pixel-frame bg-panel p-2 text-ink md:hidden"
            aria-expanded={mobileOpen}
            aria-label="Toggle navigation menu"
            onClick={() => setMobileOpen((open) => !open)}
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              aria-hidden="true"
            >
              {mobileOpen ? (
                <path strokeLinecap="square" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="square" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="border-t-4 border-dirt px-4 py-3 md:hidden" aria-label="Mobile">
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="pixel-link block px-2 py-3 font-pixel text-[11px] hover:underline"
                  onClick={handleNavClick}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
