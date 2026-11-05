"use client";

import { useEffect, useSyncExternalStore } from "react";
import { modeForHour, THEME_OVERRIDE_KEY, type ThemeMode } from "@/lib/theme";

// Current minute since the epoch, re-read every few seconds so the clock and
// the automatic day/night switch stay current.
const subscribeToClock = (onChange: () => void) => {
  const id = window.setInterval(onChange, 5000);
  return () => window.clearInterval(id);
};
const getMinute = () => Math.floor(Date.now() / 60000);

// The manual override lives in sessionStorage, with an in-memory fallback for
// browsers that block storage.
const overrideListeners = new Set<() => void>();
let memoryOverride: ThemeMode | null = null;

const subscribeToOverride = (onChange: () => void) => {
  overrideListeners.add(onChange);
  return () => {
    overrideListeners.delete(onChange);
  };
};

const getOverride = (): ThemeMode | null => {
  try {
    const stored = sessionStorage.getItem(THEME_OVERRIDE_KEY);
    if (stored === "day" || stored === "night") return stored;
  } catch {}
  return memoryOverride;
};

const setOverride = (mode: ThemeMode) => {
  memoryOverride = mode;
  try {
    sessionStorage.setItem(THEME_OVERRIDE_KEY, mode);
  } catch {}
  overrideListeners.forEach((listener) => listener());
};

const getServerValue = () => null;

export function ThemeClock() {
  const minute = useSyncExternalStore(subscribeToClock, getMinute, getServerValue);
  const override = useSyncExternalStore(subscribeToOverride, getOverride, getServerValue);

  const now = minute === null ? null : new Date(minute * 60000);
  const mode: ThemeMode | null =
    override ?? (now ? modeForHour(now.getHours()) : null);

  useEffect(() => {
    if (mode) document.documentElement.dataset.theme = mode;
  }, [mode]);

  const nextMode: ThemeMode = mode === "night" ? "day" : "night";
  const time = now
    ? now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })
    : "--:--";

  return (
    <button
      type="button"
      onClick={() => setOverride(nextMode)}
      className="focus-ring flex items-center gap-2 whitespace-nowrap rounded-full border border-line bg-panel px-3 py-1.5 text-sm text-muted hover:text-ink"
      title="The theme follows your local time. Click to switch."
      aria-label={`${time}. Switch to the ${nextMode} theme.`}
    >
      <svg className="day-only h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden="true">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
      <svg className="night-only h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
      </svg>
      <span className="tabular-nums" suppressHydrationWarning>{time}</span>
    </button>
  );
}
