interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  as?: "h1" | "h2";
}

export function SectionHeading({ eyebrow, title, description, as: Tag = "h2" }: SectionHeadingProps) {
  return (
    <div className="flex flex-col gap-3">
      {eyebrow && <span className="text-sm font-medium text-accent">{eyebrow}</span>}
      <Tag className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</Tag>
      {description && <p className="max-w-2xl text-lg leading-relaxed text-muted">{description}</p>}
    </div>
  );
}
