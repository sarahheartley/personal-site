import { profile, skillCategories, skills } from "@/config/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SkillBadge } from "@/components/ui/SkillBadge";

const categoryStyles = {
  frontend: {
    card: "from-pink-50 via-rose-50 to-white border-pink-200 shadow-pink-100/60",
    dot: "bg-pink-400",
  },
  backend: {
    card: "from-sky-50 via-cyan-50 to-white border-sky-200 shadow-sky-100/60",
    dot: "bg-sky-400",
  },
  tools: {
    card: "from-amber-50 via-orange-50 to-white border-amber-200 shadow-amber-100/60",
    dot: "bg-amber-400",
  },
} as const;

export function AboutSkills() {
  return (
    <section
      id="about"
      className="section-surface border-y border-pink-100 px-4 py-24 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="About"
          title="Engineering with purpose"
          description={profile.bio}
        />

        <div className="mt-6 flex flex-wrap gap-3 text-sm font-medium text-slate-600">
          <span className="rounded-full border border-pink-100 bg-white px-4 py-2 shadow-sm">
            {profile.location}
          </span>
          {profile.education && (
            <span className="rounded-full border border-violet-100 bg-white px-4 py-2 shadow-sm">
              {profile.education}
            </span>
          )}
          <span className="rounded-full border border-emerald-100 bg-emerald-50 px-4 py-2 text-emerald-800">
            Open to new opportunities
          </span>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {skillCategories.map((category) => {
            const categorySkills = skills.filter(
              (skill) => skill.category === category.key,
            );
            const styles = categoryStyles[category.key];

            return (
              <div
                key={category.key}
                className={`rounded-2xl border bg-gradient-to-br p-6 shadow-md transition-shadow hover:shadow-lg ${styles.card}`}
              >
                <h3 className="mb-5 flex items-center gap-2 font-display text-lg font-bold text-slate-800">
                  <span
                    className={`h-2.5 w-2.5 rounded-full ${styles.dot}`}
                    aria-hidden="true"
                  />
                  {category.label}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {categorySkills.map((skill) => (
                    <SkillBadge
                      key={skill.name}
                      name={skill.name}
                      category={skill.category}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
