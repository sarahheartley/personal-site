import type { Metadata } from "next";
import Link from "next/link";
import { profile, projects } from "@/config/portfolio";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: `Projects | ${profile.name}`,
  description: `Apps and tools built by ${profile.name}.`,
};

export default function ProjectsPage() {
  return (
    <section className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Link href="/" className="focus-ring rounded text-sm text-muted hover:text-ink">
          ← Back home
        </Link>

        <div className="mt-8">
          <SectionHeading
            as="h1"
            eyebrow="Projects"
            title="Things I've built"
            description="General software projects: apps, tools and experiments. Game projects live on the overworld map."
          />
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        <Link href="/#game-dev" className="btn btn-ghost mt-12">
          Visit the game dev map →
        </Link>
      </div>
    </section>
  );
}
