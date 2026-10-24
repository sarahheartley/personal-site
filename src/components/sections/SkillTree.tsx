import { profile, skillBranches, type SkillNode } from "@/config/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";

const MAX_LEVEL = 10;

function SkillCard({ skill }: { skill: SkillNode }) {
  // A short connector links each card to the one above it.
  const connector = (
    <span className="absolute -top-4 left-1/2 h-4 w-[3px] -translate-x-1/2 bg-line" aria-hidden="true" />
  );

  if (skill.level === 0) {
    return (
      <li className="relative mt-4 bg-locked px-3 py-2 text-sm text-muted outline-2 -outline-offset-2 outline-dashed outline-line">
        {connector}
        <div className="flex items-center justify-between gap-2">
          <span>{skill.name}</span>
          <svg className="h-4 w-4 shrink-0" viewBox="0 0 8 8" shapeRendering="crispEdges" aria-hidden="true">
            <path fill="currentColor" d="M2 1h4v1H2zM1 2h1v2H1zM6 2h1v2H6zM1 4h6v4H1z" />
          </svg>
        </div>
        <p className="mt-1 text-xs">Up next</p>
      </li>
    );
  }

  return (
    <li className="pixel-frame-sm relative mt-4 bg-panel px-3 py-2 text-sm">
      {connector}
      <div className="flex items-center justify-between gap-2">
        <span>{skill.name}</span>
        <span className="font-pixel text-[11px] text-heading">Lv {skill.level}</span>
      </div>
      <div
        className="mt-2 h-2 bg-locked"
        role="meter"
        aria-label={`${skill.name} level`}
        aria-valuemin={0}
        aria-valuemax={MAX_LEVEL}
        aria-valuenow={skill.level}
      >
        <div className="h-2 bg-gold" style={{ width: `${(skill.level / MAX_LEVEL) * 100}%` }} />
      </div>
    </li>
  );
}

export function SkillTree() {
  const facts = [profile.location, profile.education, profile.title].filter(Boolean);

  return (
    <section id="skills" className="scroll-mt-20 px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="About" title="Skill tree" description={profile.bio} />

        <ul className="mt-6 flex flex-wrap gap-4 text-sm">
          {facts.map((fact) => (
            <li key={fact} className="pixel-frame-sm bg-panel px-3 py-1.5">
              {fact}
            </li>
          ))}
        </ul>

        <div className="mt-16 flex flex-col items-center">
          <div className="pixel-frame bg-accent px-4 py-3 font-pixel text-xs text-on-accent">
            {profile.firstName} · Lv {profile.level}
          </div>
          <span className="mt-[3px] hidden h-6 w-[3px] bg-line lg:block" aria-hidden="true" />
        </div>

        <div className="relative grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6 lg:pt-6">
          {/* Horizontal bar joining the root to the four branches. */}
          <span className="absolute left-[12.5%] right-[12.5%] top-0 hidden h-[3px] bg-line lg:block" aria-hidden="true" />

          {skillBranches.map((branch) => (
            <div key={branch.key} className="relative mt-8 lg:mt-0">
              <span className="absolute -top-6 left-1/2 hidden h-6 w-[3px] -translate-x-1/2 bg-line lg:block" aria-hidden="true" />
              <h3 className="pixel-frame bg-accent-2 px-3 py-3 text-center font-pixel text-[11px] text-on-accent-2">
                {branch.label}
              </h3>
              <ul>
                {branch.skills.map((skill) => (
                  <SkillCard key={skill.name} skill={skill} />
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
