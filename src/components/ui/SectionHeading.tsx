interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
}

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="flex flex-col gap-4">
      {eyebrow && <span className="font-pixel text-[11px] text-accent">{eyebrow}</span>}
      <h2 className="font-pixel text-xl leading-relaxed text-heading sm:text-2xl">{title}</h2>
      {description && (
        <p className="max-w-2xl text-base leading-relaxed sm:text-lg">{description}</p>
      )}
    </div>
  );
}
