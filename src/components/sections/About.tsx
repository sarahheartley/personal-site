import { profile, skillBranches } from "@/config/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";

const MAX_LEVEL = 10;

export function About() {
  const facts = [profile.location, profile.education, `Cats: ${profile.party.join(" & ")}`].filter(Boolean);

  return (
    <section id="about" className="scroll-mt-20 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-[2fr_3fr]">
          <div>
            <SectionHeading eyebrow="About" title="Full-stack, heading for games." description={profile.bio} />
            <ul className="mt-6 flex flex-wrap gap-2 text-sm">
              {facts.map((fact) => (
                <li key={fact} className="rounded-full border border-line px-3 py-1 text-muted">
                  {fact}
                </li>
              ))}
            </ul>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {skillBranches.map((branch) => (
              <div key={branch.key} className="card p-5">
                <h3 className="text-sm font-semibold">{branch.label}</h3>
                <ul className="mt-4 flex flex-col gap-3">
                  {branch.skills.map((skill) => (
                    <li key={skill.name} className="text-sm">
                      <div className="flex items-center justify-between gap-2">
                        <span>{skill.name}</span>
                        {skill.level === 0 && <span className="text-xs text-muted">Up next</span>}
                      </div>
                      <div
                        className="mt-1.5 h-1 overflow-hidden rounded-full bg-soft"
                        role="meter"
                        aria-label={`${skill.name} proficiency`}
                        aria-valuemin={0}
                        aria-valuemax={MAX_LEVEL}
                        aria-valuenow={skill.level}
                      >
                        <div className="h-full rounded-full bg-accent" style={{ width: `${(skill.level / MAX_LEVEL) * 100}%` }} />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
