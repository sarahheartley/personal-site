import type { Project } from "@/config/portfolio";

const statusStyles = {
  completed: { label: "★ Completed", className: "bg-gold text-[#3d2a17]" },
  "in-progress": { label: "In progress", className: "bg-accent text-on-accent" },
} as const;

export function ProjectCard({ project }: { project: Project }) {
  const status = statusStyles[project.status];

  return (
    <article className="pixel-frame m-[3px] flex h-full flex-col bg-panel p-6">
      <span className={`w-fit px-2 py-1 font-pixel text-[11px] ${status.className}`}>
        {status.label}
      </span>

      <h3 className="mt-5 font-pixel text-sm leading-relaxed text-heading">{project.title}</h3>

      <p className="mt-3 flex-1 text-sm leading-relaxed">{project.description}</p>

      {project.techStack.length > 0 && (
        <div className="mt-5">
          <p className="text-xs text-muted">Built with</p>
          <ul className="mt-2 flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <li key={tech} className="bg-tag px-2 py-1 text-xs text-on-tag">
                {tech}
              </li>
            ))}
          </ul>
        </div>
      )}

      {(project.liveUrl || project.sourceUrl) && (
        <div className="mt-6 flex flex-wrap gap-4">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="pixel-button pixel-frame bg-accent text-on-accent"
            >
              View project
            </a>
          )}
          {project.sourceUrl && (
            <a
              href={project.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="pixel-button pixel-frame bg-page text-ink"
            >
              View code
            </a>
          )}
        </div>
      )}
    </article>
  );
}
