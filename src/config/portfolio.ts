export interface SkillNode {
  name: string;
  /** 1–10; 0 means the skill is "up next" and shows as locked. */
  level: number;
}

export interface SkillBranch {
  key: string;
  label: string;
  skills: SkillNode[];
}

export type ProjectStatus = "completed" | "in-progress";

export interface Project {
  id: string;
  title: string;
  description: string;
  status: ProjectStatus;
  techStack: string[];
  liveUrl?: string;
  sourceUrl?: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLinks {
  github: string;
  linkedin: string;
  twitter?: string;
  email: string;
}

export interface Profile {
  name: string;
  firstName: string;
  title: string;
  tagline: string;
  bio: string;
  location: string;
  education?: string;
  party: string[];
  resumeUrl?: string;
  social: SocialLinks;
}

export const profile: Profile = {
  name: "Sarah Hartley",
  firstName: "Sarah",
  title: "Software Engineer",
  tagline:
    "Full-stack engineer setting out to become a game developer, with side quests in security and AI.",
  bio: "Nearly five years of building production web apps, backend microservices and data pipelines. Now leveling up toward game development, with security and AI unlocking next.",
  location: "Austin, TX",
  education: "University of Oregon",
  party: ["Marcy", "Butters"],
  resumeUrl: "/Sarah-Hartley-Resume.docx",
  social: {
    github: "https://github.com/sarahheartley",
    linkedin: "https://linkedin.com/in/sarahgracehartley",
    email: "mailto:sarah@ushartleys.com",
  },
};

export const navLinks: NavLink[] = [
  { label: "About", href: "/#about" },
  { label: "Projects", href: "/projects/" },
  { label: "Game dev", href: "/#game-dev" },
  { label: "Contact", href: "#contact" },
];

export const skillBranches: SkillBranch[] = [
  {
    key: "full-stack",
    label: "Full-stack",
    skills: [
      { name: "TypeScript", level: 8 },
      { name: "React", level: 8 },
      { name: "Angular", level: 7 },
      { name: "Java", level: 7 },
      { name: "Python", level: 7 },
      { name: "C# / .NET", level: 6 },
      { name: "Flutter / Dart", level: 5 },
      { name: "SQL", level: 6 },
      { name: "CI/CD", level: 6 },
      { name: "AWS", level: 5 },
      { name: "Docker", level: 5 },
    ],
  },
  {
    key: "game-dev",
    label: "Game dev",
    skills: [
      { name: "Game design", level: 2 },
      { name: "Pixel art", level: 1 },
      { name: "Godot", level: 0 },
      { name: "Ship a game", level: 0 },
    ],
  },
  {
    key: "security",
    label: "Security",
    skills: [
      { name: "Secure coding", level: 3 },
      { name: "CTFs", level: 0 },
      { name: "Pen testing", level: 0 },
    ],
  },
  {
    key: "ai",
    label: "AI",
    skills: [
      { name: "Generative AI", level: 4 },
      { name: "ML pipelines", level: 3 },
      { name: "AI agents", level: 0 },
    ],
  },
];

export const projects: Project[] = [
  {
    id: "posy",
    title: "Posy",
    description:
      "A forgiving habit tracker that grows a flower for each day and a bouquet for each month. Built for iOS and Android.",
    status: "in-progress",
    techStack: ["Flutter", "Dart"],
    // Repo is private for now; add sourceUrl when it goes public.
  },
];

export type LevelStatus = "cleared" | "in-progress" | "upcoming";

/** A stop on the game dev overworld map, in the order the path visits them. */
export interface GameLevel {
  id: string;
  /** Short world-level tag shown on the map, like "1-1". */
  tag: string;
  title: string;
  description: string;
  status: LevelStatus;
  highlights?: string[];
  techStack: string[];
  liveUrl?: string;
  sourceUrl?: string;
}

/**
 * Add a new game by adding a level here. The map has five stops; the last
 * one is drawn as the castle.
 */
export const gameLevels: GameLevel[] = [
  {
    id: "pixel-pals",
    tag: "1-1",
    title: "Pixel Pals",
    description:
      "Hand-drawn sprites of me and my cats, Marcy and Butters. Each sprite is a text grid with a palette, rendered as crisp SVG, so there are no image files to load.",
    status: "cleared",
    highlights: [
      "Sprites live in code as readable text grids",
      "Pixel runs are merged into single rects to keep the SVG small",
    ],
    techStack: ["Pixel art", "TypeScript", "SVG"],
  },
  {
    id: "overworld",
    tag: "1-2",
    title: "The Overworld",
    description:
      "The map you are walking on right now: a level select built from scratch in React, with a small animation loop that walks along the path between stops.",
    status: "cleared",
    highlights: [
      "Keyboard, click and touch controls",
      "Respects reduced-motion settings",
      "Switches to a night palette with the site theme",
    ],
    techStack: ["React", "TypeScript", "Next.js"],
  },
  {
    id: "godot",
    tag: "1-3",
    title: "Godot Basics",
    description:
      "Next on the path: learning Godot and GDScript by building small prototypes.",
    status: "upcoming",
    techStack: ["Godot", "GDScript"],
  },
  {
    id: "game-jam",
    tag: "1-4",
    title: "First Game Jam",
    description: "Enter a game jam and finish something small, start to end, in a weekend.",
    status: "upcoming",
    techStack: [],
  },
  {
    id: "ship-a-game",
    tag: "1-5",
    title: "Ship a Game",
    description:
      "The castle at the end of the map: design, build and release a complete game.",
    status: "upcoming",
    techStack: [],
  },
];
