import Link from "next/link";
import { projects } from "@/config/portfolio";

/** Home page entry point to the full projects page. */
export function ProjectsLink() {
  return (
    <section id="projects" className="scroll-mt-20 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/projects/"
          className="card focus-ring group flex flex-col gap-6 p-8 transition-shadow hover:shadow-[0_16px_50px_-16px_var(--glow)] sm:flex-row sm:items-center sm:justify-between sm:p-10"
        >
          <div>
            <p className="text-sm font-medium text-accent">Projects</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">Apps, tools and other things I&apos;ve built</h2>
            <p className="mt-3 text-muted">
              {projects.map((project) => project.title).join(" · ")}
            </p>
          </div>
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent text-xl text-on-accent transition-transform group-hover:translate-x-1" aria-hidden="true">
            →
          </span>
        </Link>
      </div>
    </section>
  );
}
