import type { Project } from "@/config/portfolio";

interface ProjectCardProps {
  project: Project;
  index?: number;
}

const cardAccents = [
  {
    hover: "hover:border-pink-300 hover:shadow-pink-200/50",
    title: "group-hover:text-pink-600",
  },
  {
    hover: "hover:border-sky-300 hover:shadow-sky-200/50",
    title: "group-hover:text-sky-600",
  },
  {
    hover: "hover:border-violet-300 hover:shadow-violet-200/50",
    title: "group-hover:text-violet-600",
  },
  {
    hover: "hover:border-amber-300 hover:shadow-amber-200/50",
    title: "group-hover:text-amber-600",
  },
  {
    hover: "hover:border-teal-300 hover:shadow-teal-200/50",
    title: "group-hover:text-teal-600",
  },
  {
    hover: "hover:border-fuchsia-300 hover:shadow-fuchsia-200/50",
    title: "group-hover:text-fuchsia-600",
  },
];

const tagColors = [
  "bg-pink-100 text-pink-700",
  "bg-sky-100 text-sky-700",
  "bg-violet-100 text-violet-700",
  "bg-amber-100 text-amber-800",
];

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const accent = cardAccents[index % cardAccents.length];

  return (
    <article
      className={`group flex h-full flex-col rounded-3xl border-2 border-white bg-white p-6 shadow-lg transition-all duration-300 hover:-rotate-1 hover:scale-[1.03] hover:shadow-xl ${accent.hover}`}
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <h3
          className={`font-display text-xl font-extrabold text-slate-800 transition-colors ${accent.title}`}
        >
          {project.title}
        </h3>
        {project.featured && (
          <span className="shrink-0 rounded-full bg-gradient-to-r from-pink-400 to-violet-400 px-2.5 py-0.5 text-xs font-semibold text-white">
            Featured
          </span>
        )}
      </div>

      <p className="mb-5 flex-1 text-sm leading-relaxed text-slate-600">
        {project.description}
      </p>

      <div className="mb-6 flex flex-wrap gap-2">
        {project.techStack.map((tech, techIndex) => (
          <span
            key={tech}
            className={`rounded-full px-2.5 py-1 text-xs font-bold ${tagColors[techIndex % tagColors.length]}`}
          >
            {tech}
          </span>
        ))}
      </div>

      {(project.liveUrl || project.sourceUrl) && (
        <div className="flex flex-wrap gap-3">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-violet-500 px-4 py-2 text-sm font-bold text-white transition-all hover:scale-105"
            >
              Live Demo
            </a>
          )}
          {project.sourceUrl && (
            <a
              href={project.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border-2 border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 transition-all hover:border-pink-300 hover:text-pink-600"
            >
              Source Code
            </a>
          )}
        </div>
      )}
    </article>
  );
}
