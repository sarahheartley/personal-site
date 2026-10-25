export type ThemeMode = "day" | "night";

/** Night runs from 7 PM to 7 AM in the visitor's local time. */
export function modeForHour(hour: number): ThemeMode {
  return hour < 7 || hour >= 19 ? "night" : "day";
}

/**
 * A visitor's manual day/night pick lasts for the browser session; the next
 * visit follows the clock again.
 */
export const THEME_OVERRIDE_KEY = "theme-override";

/** Runs in <head> before first paint so the page never flashes the wrong theme. */
export const themeInitScript = `(function () {
  try {
    var o = sessionStorage.getItem("${THEME_OVERRIDE_KEY}");
    var h = new Date().getHours();
    var night = o ? o === "night" : h < 7 || h >= 19;
    document.documentElement.dataset.theme = night ? "night" : "day";
  } catch (e) {}
})();`;
