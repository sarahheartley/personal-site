import type { Sprite } from "@/components/ui/sprites";

interface PixelSpriteProps {
  sprite: Sprite;
  /** Size of one art pixel in CSS pixels. */
  scale?: number;
  /** Accessible name; omit for decorative sprites. */
  label?: string;
  className?: string;
}

/**
 * Renders pixel art as an SVG, one rect per horizontal run of same-colored
 * pixels. It needs no client JavaScript, so sprites render in static HTML.
 */
export function PixelSprite({
  sprite,
  scale = 4,
  label,
  className,
}: PixelSpriteProps) {
  const { rows, palette } = sprite;
  const width = Math.max(...rows.map((row) => row.length));
  const height = rows.length;

  const runs: { x: number; y: number; w: number; color: string }[] = [];
  rows.forEach((row, y) => {
    let x = 0;
    while (x < row.length) {
      const color = palette[row[x]];
      let end = x + 1;
      while (end < row.length && row[end] === row[x]) end++;
      if (color) runs.push({ x, y, w: end - x, color });
      x = end;
    }
  });

  return (
    <svg
      width={width * scale}
      height={height * scale}
      viewBox={`0 0 ${width} ${height}`}
      shapeRendering="crispEdges"
      className={className}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      {runs.map((run) => (
        <rect
          key={`${run.x}-${run.y}`}
          x={run.x}
          y={run.y}
          width={run.w}
          height={1}
          fill={run.color}
        />
      ))}
    </svg>
  );
}
