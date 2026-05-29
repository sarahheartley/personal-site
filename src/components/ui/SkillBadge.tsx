import type { SkillCategory } from "@/config/portfolio";

interface SkillBadgeProps {
  name: string;
  category: SkillCategory;
}

const badgeStyles: Record<SkillCategory, string> = {
  frontend:
    "bg-pink-50 border-pink-200 text-pink-700 hover:bg-pink-100 hover:border-pink-300",
  backend:
    "bg-sky-50 border-sky-200 text-sky-700 hover:bg-sky-100 hover:border-sky-300",
  tools:
    "bg-amber-50 border-amber-200 text-amber-800 hover:bg-amber-100 hover:border-amber-300",
};

export function SkillBadge({ name, category }: SkillBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1.5 text-sm font-medium transition-colors ${badgeStyles[category]}`}
    >
      {name}
    </span>
  );
}
