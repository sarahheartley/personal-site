import type { Sprite } from "@/components/ui/sprites";

interface Run {
  x: number;
  y: number;
  w: number;
  color: string;
}

/** Splits a sprite into horizontal runs of same-colored pixels. */
function spriteRuns(sprite: Sprite): Run[] {
  const runs: Run[] = [];
  sprite.rows.forEach((row, y) => {
    let x = 0;
    while (x < row.length) {
      const color = sprite.palette[row[x]];
      let end = x + 1;
      while (end < row.length && row[end] === row[x]) end++;
      if (color) runs.push({ x, y, w: end - x, color });
      x = end;
    }
  });
  return runs;
}

export function spriteSize(sprite: Sprite) {
  return {
    width: Math.max(...sprite.rows.map((row) => row.length)),
    height: sprite.rows.length,
  };
}

function Runs({ sprite }: { sprite: Sprite }) {
  return (
    <>
      {spriteRuns(sprite).map((run) => (
        <rect
          key={`${run.x}-${run.y}`}
          x={run.x}
          y={run.y}
          width={run.w}
          height={1}
          fill={run.color}
        />
      ))}
    </>
  );
}

interface PixelSpriteProps {
  sprite: Sprite;
  /** Size of one art pixel in CSS pixels. */
  scale?: number;
  /** Accessible name; omit for decorative sprites. */
  label?: string;
  className?: string;
}

/**
 * Renders pixel art as a standalone SVG. It needs no client JavaScript, so
 * sprites render in static HTML.
 */
export function PixelSprite({ sprite, scale = 4, label, className }: PixelSpriteProps) {
  const { width, height } = spriteSize(sprite);

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
      <Runs sprite={sprite} />
    </svg>
  );
}

/** Draws a sprite inside an existing SVG, one art pixel per user unit. */
export function SpriteGroup({
  sprite,
  x = 0,
  y = 0,
  flip = false,
}: {
  sprite: Sprite;
  x?: number;
  y?: number;
  flip?: boolean;
}) {
  const { width } = spriteSize(sprite);
  const transform = flip
    ? `translate(${x + width} ${y}) scale(-1 1)`
    : `translate(${x} ${y})`;
  return (
    <g transform={transform}>
      <Runs sprite={sprite} />
    </g>
  );
}
