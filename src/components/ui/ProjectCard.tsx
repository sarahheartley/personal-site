import type { Project } from "@/config/portfolio";

const statusStyles = {
  completed: { label: "Shipped", dot: "bg-emerald-500" },
  "in-progress": { label: "In progress", dot: "bg-amber-400" },
} as const;

export function ProjectCard({ project }: { project: Project }) {
  const status = statusStyles[project.status];

  return (
    <article className="card flex h-full flex-col p-6 transition-shadow hover:shadow-[0_12px_40px_-12px_var(--glow)]">
      <span className="flex w-fit items-center gap-2 rounded-full bg-soft px-2.5 py-1 text-xs text-muted">
        <span className={`h-1.5 w-1.5 rounded-full ${status.dot}`} aria-hidden="true" />
        {status.label}
      </span>

      <h3 className="mt-5 text-xl font-semibold tracking-tight">{project.title}</h3>
      <p className="mt-2 flex-1 leading-relaxed text-muted">{project.description}</p>

      {project.techStack.length > 0 && (
        <ul className="mt-6 flex flex-wrap gap-2" aria-label="Built with">
          {project.techStack.map((tech) => (
            <li key={tech} className="rounded-full bg-accent-soft px-2.5 py-1 text-xs font-medium text-on-accent-soft">
              {tech}
            </li>
          ))}
        </ul>
      )}

      {(project.liveUrl || project.sourceUrl) && (
        <div className="mt-6 flex flex-wrap gap-3">
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              View project
            </a>
          )}
          {project.sourceUrl && (
            <a href={project.sourceUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              View code
            </a>
          )}
        </div>
      )}
    </article>
  );
}
