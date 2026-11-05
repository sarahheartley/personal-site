"use client";

import { memo, useCallback, useEffect, useRef, useState } from "react";
import type { GameLevel, LevelStatus } from "@/config/portfolio";
import { SpriteGroup } from "@/components/ui/PixelSprite";
import {
  bush,
  butters,
  campfire,
  castle,
  flowers,
  house,
  marcy,
  sarah,
  tree,
} from "@/components/ui/sprites";

/* ------------------------------------------------------------------ */
/* Map layout. Everything is in map units: one tile is 16 units, one   */
/* sprite pixel is one unit.                                           */
/* ------------------------------------------------------------------ */

const TILE = 16;
const COLS = 24;
const ROWS = 13;
const WIDTH = COLS * TILE;
const HEIGHT = ROWS * TILE;

/** Center of a tile, in map units. */
const c = (tile: number) => tile * TILE + TILE / 2;

/** The walkable path, as tile coordinates. Turns are plain waypoints. */
const ROUTE: [number, number][] = [
  [3, 10],
  [3, 6],
  [8, 6],
  [12, 6],
  [12, 10],
  [17, 10],
  [17, 5],
  [20, 5],
];

/** Which ROUTE point each level sits on, in level order. */
const LEVEL_POINTS = [0, 2, 4, 5, 7];

const levelAtPoint = (point: number) => LEVEL_POINTS.indexOf(point);

const ROUTE_PX = ROUTE.map(([x, y]) => ({ x: c(x), y: c(y) }));

/** Walking speed in map units per second. */
const SPEED = 110;

const TREES: [number, number][] = [
  [1, 1], [0, 3], [1, 5], [0, 8], [6, 9], [7, 11], [9, 10], [10, 1],
  [14, 1], [15, 3], [13, 3], [22, 1], [22, 8], [21, 11], [19, 11], [14, 11],
  [9, 3], [19, 8], [1, 11.2],
];
const BUSHES: [number, number][] = [
  [5, 8], [10, 8], [15, 7], [19, 2], [22, 4], [6, 2.5], [14, 9], [20, 10],
];
const FLOWER_SPOTS: [number, number][] = [
  [5, 4], [9, 8], [13, 8], [18, 11], [21, 6.5], [16, 2], [2, 7.5], [11, 11.2],
];

/** Lake in tile units: x, y, w, h. */
const LAKE = { x: 3, y: 1, w: 5, h: 3 };

const NODE_COLORS: Record<LevelStatus, { fill: string; edge: string }> = {
  cleared: { fill: "#ffd84a", edge: "#8a5a12" },
  "in-progress": { fill: "#f06ba0", edge: "#7a1f4a" },
  upcoming: { fill: "#c9c3d6", edge: "#4a4258" },
};

export const STATUS_LABEL: Record<LevelStatus, string> = {
  cleared: "Cleared",
  "in-progress": "In progress",
  upcoming: "Locked",
};

/* ------------------------------------------------------------------ */
/* Static scenery. Memoized so walking only re-renders the player.     */
/* ------------------------------------------------------------------ */

const Scenery = memo(function Scenery() {
  const routePoints = [[1, 10] as [number, number], ...ROUTE]
    .map(([x, y]) => `${c(x)},${c(y)}`)
    .join(" ");

  return (
    <g>
      {/* Sea around the island. */}
      <rect width={WIDTH} height={HEIGHT} style={{ fill: "var(--map-water)" }} />
      <g className="map-water" style={{ fill: "var(--map-water-2)" }}>
        {[
          [12, 2], [80, 200], [180, 3], [300, 202], [372, 60], [2, 120], [240, 2], [376, 150],
        ].map(([x, y]) => (
          <rect key={`${x}-${y}`} x={x} y={y} width={8} height={2} />
        ))}
      </g>

      {/* Island with a checkered grass pattern. */}
      <defs>
        <pattern id="grass" width={32} height={32} patternUnits="userSpaceOnUse">
          <rect width={32} height={32} style={{ fill: "var(--map-grass)" }} />
          <rect width={16} height={16} style={{ fill: "var(--map-grass-2)" }} />
          <rect x={16} y={16} width={16} height={16} style={{ fill: "var(--map-grass-2)" }} />
        </pattern>
      </defs>
      <rect x={6} y={8} width={WIDTH - 12} height={HEIGHT - 14} style={{ fill: "#d9b77a" }} />
      <rect x={8} y={8} width={WIDTH - 16} height={HEIGHT - 18} fill="url(#grass)" />

      {/* Lake */}
      <rect
        x={LAKE.x * TILE}
        y={LAKE.y * TILE}
        width={LAKE.w * TILE}
        height={LAKE.h * TILE}
        style={{ fill: "var(--map-water)" }}
      />
      <rect
        x={LAKE.x * TILE + 2}
        y={LAKE.y * TILE + 2}
        width={LAKE.w * TILE - 4}
        height={2}
        style={{ fill: "var(--map-water-2)" }}
      />
      <g className="map-water" style={{ fill: "var(--map-water-2)" }}>
        <rect x={LAKE.x * TILE + 14} y={LAKE.y * TILE + 18} width={10} height={2} />
        <rect x={LAKE.x * TILE + 46} y={LAKE.y * TILE + 30} width={12} height={2} />
      </g>

      {/* Path: an edge stroke under a lighter stroke, then dots like a board game. */}
      <polyline
        points={routePoints}
        fill="none"
        strokeWidth={10}
        strokeLinejoin="miter"
        style={{ stroke: "var(--map-path-edge)" }}
      />
      <polyline
        points={routePoints}
        fill="none"
        strokeWidth={7}
        strokeLinejoin="miter"
        style={{ stroke: "var(--map-path)" }}
      />
      <polyline
        points={routePoints}
        fill="none"
        strokeWidth={2}
        strokeDasharray="2 6"
        style={{ stroke: "var(--map-path-edge)" }}
      />

      {FLOWER_SPOTS.map(([x, y]) => (
        <SpriteGroup key={`f${x}-${y}`} sprite={flowers} x={x * TILE} y={y * TILE} />
      ))}
      {BUSHES.map(([x, y]) => (
        <SpriteGroup key={`b${x}-${y}`} sprite={bush} x={x * TILE} y={y * TILE} />
      ))}
      {TREES.map(([x, y]) => (
        <SpriteGroup key={`t${x}-${y}`} sprite={tree} x={x * TILE} y={y * TILE} />
      ))}

      {/* Home base: the house, a campfire, and the cats. */}
      <SpriteGroup sprite={house} x={c(1) - 8} y={c(10) - 14} />
      <SpriteGroup sprite={campfire} x={c(4) + 2} y={c(11) - 2} />
      <SpriteGroup sprite={marcy} x={c(3) - 4} y={c(11) + 1} />
      <SpriteGroup sprite={butters} x={c(5) - 2} y={c(11) + 1} flip />

      {/* Castle behind the final level. */}
      <SpriteGroup sprite={castle} x={c(20) - 11} y={c(5) - 16} />

      {/* Night sky glints on the sea. */}
      <g className="night-only" fill="#fff6d6">
        {[
          [20, 4], [120, 2], [200, 202], [350, 3], [378, 100], [3, 60], [260, 201],
        ].map(([x, y]) => (
          <rect key={`s${x}-${y}`} x={x} y={y} width={2} height={2} />
        ))}
      </g>
    </g>
  );
});

/* ------------------------------------------------------------------ */
/* Overworld                                                            */
/* ------------------------------------------------------------------ */

interface Walker {
  /** Last route point reached. */
  at: number;
  /** Route point being walked toward, or null when standing still. */
  next: number | null;
  /** Route point to stop at. */
  target: number;
  x: number;
  y: number;
  walked: number;
}

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function Overworld({ levels }: { levels: GameLevel[] }) {
  // The map has a fixed number of stops; extra levels are ignored.
  const stops = levels.slice(0, LEVEL_POINTS.length);

  const walker = useRef<Walker>({
    at: LEVEL_POINTS[0],
    next: null,
    target: LEVEL_POINTS[0],
    x: ROUTE_PX[LEVEL_POINTS[0]].x,
    y: ROUTE_PX[LEVEL_POINTS[0]].y,
    walked: 0,
  });
  const frame = useRef<number | null>(null);
  const lastTime = useRef(0);

  const [pos, setPos] = useState({ ...ROUTE_PX[LEVEL_POINTS[0]], bob: 0 });
  const [facingLeft, setFacingLeft] = useState(false);
  const [current, setCurrent] = useState(0);
  const [walking, setWalking] = useState(false);
  const [hop, setHop] = useState(0);
  const [openLevel, setOpenLevel] = useState<GameLevel | null>(null);

  const mapRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  /** Starts the walking loop, which runs until the walker reaches its target. */
  const startLoop = useCallback(() => {
    const loop = (time: number) => {
      const w = walker.current;
      const dt = lastTime.current ? Math.min((time - lastTime.current) / 1000, 0.05) : 0;
      lastTime.current = time;
      let budget = SPEED * dt;

      while (budget > 0) {
        if (w.next === null) {
          if (w.at === w.target) break;
          w.next = w.at + Math.sign(w.target - w.at);
        }
        const dest = ROUTE_PX[w.next];
        const dx = dest.x - w.x;
        const dy = dest.y - w.y;
        const dist = Math.hypot(dx, dy);
        if (dx !== 0) setFacingLeft(dx < 0);

        if (dist <= budget) {
          w.x = dest.x;
          w.y = dest.y;
          w.walked += dist;
          budget -= dist;
          w.at = w.next;
          w.next = null;
          const level = levelAtPoint(w.at);
          if (level !== -1) setCurrent(level);
        } else {
          w.x += (dx / dist) * budget;
          w.y += (dy / dist) * budget;
          w.walked += budget;
          budget = 0;
        }
      }

      const done = w.next === null && w.at === w.target;
      setPos({ x: w.x, y: w.y, bob: done ? 0 : Math.floor(w.walked / 5) % 2 });

      if (done) {
        frame.current = null;
        lastTime.current = 0;
        setWalking(false);
      } else {
        frame.current = requestAnimationFrame(loop);
      }
    };
    frame.current = requestAnimationFrame(loop);
  }, []);

  useEffect(
    () => () => {
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    },
    [],
  );

  const walkTo = useCallback(
    (level: number) => {
      const w = walker.current;
      const target = LEVEL_POINTS[Math.max(0, Math.min(stops.length - 1, level))];
      w.target = target;

      if (prefersReducedMotion()) {
        w.at = target;
        w.next = null;
        w.x = ROUTE_PX[target].x;
        w.y = ROUTE_PX[target].y;
        setPos({ x: w.x, y: w.y, bob: 0 });
        setCurrent(levelAtPoint(target));
        return;
      }

      // Turning around mid-step: head back to the point just left.
      if (w.next !== null) {
        const dir = w.next - w.at;
        if ((dir > 0 && target <= w.at) || (dir < 0 && target >= w.at)) {
          [w.at, w.next] = [w.next, w.at];
        }
      }

      if (frame.current === null && (w.next !== null || w.at !== target)) {
        setWalking(true);
        startLoop();
      }
    },
    [stops.length, startLoop],
  );

  /** The level the player is walking toward (or standing on). */
  const targetLevel = () => levelAtPoint(walker.current.target);

  const step = (dir: 1 | -1) => walkTo(targetLevel() + dir);

  const enterLevel = useCallback(() => {
    const w = walker.current;
    if (w.next !== null || w.at !== w.target) return;
    const level = stops[levelAtPoint(w.at)];
    if (!level) return;

    if (prefersReducedMotion()) {
      setOpenLevel(level);
      return;
    }

    // A quick hop into the level, then open its card.
    const start = performance.now();
    const animate = (now: number) => {
      const t = Math.min((now - start) / 320, 1);
      setHop(Math.sin(Math.PI * t) * 10);
      if (t < 1) requestAnimationFrame(animate);
      else setOpenLevel(level);
    };
    requestAnimationFrame(animate);
  }, [stops]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (openLevel && !dialog.open) dialog.showModal();
    if (!openLevel && dialog.open) dialog.close();
  }, [openLevel]);

  const onNodeClick = (level: number) => {
    const w = walker.current;
    const atRest = w.next === null && w.at === w.target;
    if (atRest && levelAtPoint(w.at) === level) enterLevel();
    else walkTo(level);
    mapRef.current?.focus({ preventScroll: true });
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    const key = event.key.toLowerCase();
    if (["arrowright", "arrowdown", "d", "s"].includes(key)) step(1);
    else if (["arrowleft", "arrowup", "a", "w"].includes(key)) step(-1);
    else if (key === "enter" || key === " ") enterLevel();
    else if (/^[1-9]$/.test(key) && Number(key) <= stops.length) walkTo(Number(key) - 1);
    else return;
    event.preventDefault();
  };

  const cleared = stops.filter((level) => level.status === "cleared").length;
  const here = stops[current];

  return (
    <div>
      <div
        ref={mapRef}
        tabIndex={0}
        role="group"
        aria-roledescription="map"
        aria-label="Game dev overworld. Use the left and right arrow keys to walk between levels, and Enter to open one."
        onKeyDown={onKeyDown}
        className="group relative overflow-hidden rounded-2xl border-4 border-[#2b1b24] bg-[#2b1b24] outline-none focus-visible:ring-4 focus-visible:ring-accent/60"
      >
        <svg
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          className="block h-auto w-full select-none"
          shapeRendering="crispEdges"
          aria-hidden="true"
        >
          <Scenery />

          {/* Night tint over the scenery, under the nodes and player. */}
          <rect className="night-only" width={WIDTH} height={HEIGHT} fill="#0c0a2a" opacity={0.25} />

          {stops.map((level, i) => {
            const p = ROUTE_PX[LEVEL_POINTS[i]];
            const colors = NODE_COLORS[level.status];
            const isHere = i === current && !walking;
            return (
              <g
                key={level.id}
                onClick={() => onNodeClick(i)}
                className="cursor-pointer"
              >
                {/* Bigger invisible hit area for taps. */}
                <rect x={p.x - 12} y={p.y - 12} width={24} height={24} fill="transparent" />
                {isHere && (
                  <rect
                    className="map-node-pulse"
                    x={p.x - 9}
                    y={p.y - 7}
                    width={18}
                    height={14}
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth={1.5}
                  />
                )}
                <rect x={p.x - 7} y={p.y - 5} width={14} height={10} fill={colors.edge} />
                <rect x={p.x - 6} y={p.y - 4} width={12} height={7} fill={colors.fill} />
                {level.status === "cleared" ? (
                  <path
                    d={`M${p.x - 1} ${p.y - 3}h2v2h2v1h-1v2h-1v-1h-2v1h-1v-2h-1v-1h2z`}
                    fill="#ffffff"
                  />
                ) : level.status === "upcoming" ? (
                  <path
                    d={`M${p.x - 2} ${p.y - 3}h4v1h1v1h-6v-1h1zM${p.x - 3} ${p.y - 1}h6v3h-6z`}
                    fill={colors.edge}
                  />
                ) : (
                  <rect x={p.x - 1} y={p.y - 2} width={2} height={3} fill="#ffffff" />
                )}
                <text
                  x={p.x}
                  y={p.y + 14}
                  textAnchor="middle"
                  fontSize={6}
                  style={{ fontFamily: "var(--font-press-start), monospace", fill: "var(--map-ink)" }}
                >
                  {level.tag}
                </text>
              </g>
            );
          })}

          {/* Player */}
          <g transform={`translate(${Math.round(pos.x)} ${Math.round(pos.y)})`} pointerEvents="none">
            <rect x={-5} y={1} width={10} height={2} fill="#000" opacity={0.25} />
            <SpriteGroup sprite={sarah} x={-7} y={-15 - pos.bob - Math.round(hop)} flip={facingLeft} />
          </g>
        </svg>

        {/* HUD */}
        <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-between p-2 font-pixel text-[8px] text-white sm:p-3 sm:text-[10px]">
          <span className="bg-[#2b1b24]/80 px-2 py-1.5">WORLD 1 · GAME DEV</span>
          <span className="bg-[#2b1b24]/80 px-2 py-1.5">
            ★ {cleared}/{stops.length}
          </span>
        </div>
      </div>

      {/* Controls and current level */}
      <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div aria-live="polite">
          <p className="font-pixel text-[10px] text-muted">
            {here?.tag} · {here ? STATUS_LABEL[here.status] : ""}
          </p>
          <p className="mt-2 text-xl font-semibold tracking-tight">{here?.title}</p>
        </div>

        <div className="flex items-center gap-4">
          <button type="button" className="pixel-btn" aria-label="Previous level" onClick={() => step(-1)}>
            ◀
          </button>
          <button type="button" className="pixel-btn" aria-label="Next level" onClick={() => step(1)}>
            ▶
          </button>
          <button
            type="button"
            className="pixel-btn !bg-[#ffd84a]"
            onClick={enterLevel}
            disabled={walking}
          >
            ENTER
          </button>
        </div>
      </div>

      <p className="mt-4 text-sm text-muted">
        Click the map, then use <kbd className="rounded border border-line px-1.5 text-xs">←</kbd>{" "}
        <kbd className="rounded border border-line px-1.5 text-xs">→</kbd> to walk and{" "}
        <kbd className="rounded border border-line px-1.5 text-xs">Enter</kbd> to hop in. Or tap a level.
      </p>

      {/* Level select, for skipping straight to a stop. */}
      <ol className="mt-6 flex flex-wrap gap-2" aria-label="Levels">
        {stops.map((level, i) => (
          <li key={level.id}>
            <button
              type="button"
              onClick={() => walkTo(i)}
              aria-current={i === current ? "location" : undefined}
              className={`focus-ring rounded-full border px-3 py-1.5 text-sm transition-colors ${
                i === current
                  ? "border-accent bg-accent-soft text-on-accent-soft"
                  : "border-line text-muted hover:text-ink"
              }`}
            >
              <span className="font-mono text-xs">{level.tag}</span> {level.title}
            </button>
          </li>
        ))}
      </ol>

      <dialog
        ref={dialogRef}
        className="level-dialog m-auto w-[min(92vw,34rem)] bg-transparent p-0 text-ink"
        onClose={() => {
          setOpenLevel(null);
          setHop(0);
          mapRef.current?.focus({ preventScroll: true });
        }}
        onClick={(event) => {
          // Clicking the backdrop closes the dialog.
          if (event.target === event.currentTarget) setOpenLevel(null);
        }}
        aria-labelledby="level-title"
      >
        {openLevel && <LevelCard level={openLevel} onClose={() => setOpenLevel(null)} />}
      </dialog>
    </div>
  );
}

function LevelCard({ level, onClose }: { level: GameLevel; onClose: () => void }) {
  const colors = NODE_COLORS[level.status];
  return (
    <div className="border-4 border-[#2b1b24] bg-panel shadow-[8px_8px_0_0_#2b1b24]">
      <div className="flex items-center justify-between gap-4 bg-[#2b1b24] px-5 py-3 font-pixel text-[10px] text-white">
        <span>LEVEL {level.tag}</span>
        <span className="px-2 py-1 text-[#2b1b24]" style={{ background: colors.fill }}>
          {STATUS_LABEL[level.status].toUpperCase()}
        </span>
      </div>

      <div className="p-6">
        <h3 id="level-title" className="text-2xl font-semibold tracking-tight">
          {level.title}
        </h3>
        <p className="mt-3 leading-relaxed text-muted">{level.description}</p>

        {level.highlights && level.highlights.length > 0 && (
          <ul className="mt-5 flex flex-col gap-2 text-sm">
            {level.highlights.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="text-accent" aria-hidden="true">
                  ▸
                </span>
                {item}
              </li>
            ))}
          </ul>
        )}

        {level.techStack.length > 0 && (
          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Built with">
            {level.techStack.map((tech) => (
              <li key={tech} className="rounded-full bg-accent-soft px-2.5 py-1 text-xs font-medium text-on-accent-soft">
                {tech}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-8 flex flex-wrap gap-3">
          {level.liveUrl && (
            <a href={level.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              Play
            </a>
          )}
          {level.sourceUrl && (
            <a href={level.sourceUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              View code
            </a>
          )}
          <button type="button" className="pixel-btn ml-auto" onClick={onClose} autoFocus>
            ◀ MAP
          </button>
        </div>
      </div>
    </div>
  );
}
