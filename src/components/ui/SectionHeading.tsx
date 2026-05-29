interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  const alignment =
    align === "center" ? "items-center text-center" : "items-start text-left";

  return (
    <div className={`flex flex-col gap-3 ${alignment}`}>
      {eyebrow && (
        <span className="inline-flex w-fit rounded-full border border-pink-200 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-pink-600 shadow-sm">
          {eyebrow}
        </span>
      )}
      <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
        <span className="text-gradient">{title}</span>
      </h2>
      {description && (
        <p className="max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}
