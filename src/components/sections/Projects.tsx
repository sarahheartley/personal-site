import { projects, projectsNotice } from "@/config/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/ui/ProjectCard";

export function Projects() {
  const hasProjects = projects.length > 0;

  return (
    <section id="projects" className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Portfolio"
          title={projectsNotice.title}
          description={projectsNotice.description}
        />

        {hasProjects ? (
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        ) : (
          <div className="mt-12 rounded-3xl border border-pink-100 bg-white/80 px-8 py-14 text-center shadow-lg shadow-pink-100/40">
            <p className="font-display text-2xl font-bold text-slate-800">
              {projectsNotice.message}
            </p>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate-500">
              This section will highlight selected projects with descriptions,
              tech stacks, and links. Check back soon.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
