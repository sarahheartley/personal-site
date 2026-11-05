import Link from "next/link";
import { profile } from "@/config/portfolio";

export function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden px-4 pb-20 pt-20 sm:px-6 sm:pt-28 lg:px-8">
      {/* Soft color wash behind the headline. */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-[480px] w-[900px] -translate-x-1/2 rounded-full opacity-70 blur-3xl"
        style={{ background: "radial-gradient(closest-side, var(--glow), transparent)" }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl">
        <p className="flex w-fit items-center gap-2 rounded-full border border-line bg-panel px-3 py-1 text-sm text-muted">
          <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden="true" />
          {profile.title} · {profile.location}
        </p>

        <h1 className="mt-8 max-w-4xl text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
          Hi, I&apos;m {profile.firstName}.{" "}
          <span className="text-muted">I build for the web and I&apos;m learning to build games.</span>
        </h1>

        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">{profile.tagline}</p>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/projects/" className="btn btn-primary">
            View projects
            <span aria-hidden="true">→</span>
          </Link>
          <Link href="/#game-dev" className="btn btn-ghost">
            Explore the game dev map
          </Link>
          {profile.resumeUrl && (
            <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              Resume
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
