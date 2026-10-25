"use client";

import { useEffect, useSyncExternalStore } from "react";
import { PixelSprite } from "@/components/ui/PixelSprite";
import { moon, sun } from "@/components/ui/sprites";
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
      className="pixel-button pixel-frame whitespace-nowrap bg-panel px-3 py-2 text-ink"
      title="The theme follows your local time. Click to switch."
      aria-label={`${time}. Switch to the ${nextMode} theme.`}
    >
      <PixelSprite sprite={sun} scale={2} className="day-only" />
      <PixelSprite sprite={moon} scale={2} className="night-only" />
      <span suppressHydrationWarning>{time}</span>
    </button>
  );
}
