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
  /** Shown on the root of the skill tree. */
  level: number;
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
  level: 5,
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
  { label: "Home", href: "#hero" },
  { label: "Skill tree", href: "#skills" },
  { label: "Projects", href: "#projects" },
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

// TODO(Sarah): confirm each project's description, status and tech stack,
// and add liveUrl where there is a demo.
export const projects: Project[] = [
  {
    id: "habit-tracker",
    title: "Habit Tracker",
    description: "A daily habit tracker that helps you keep a streak alive.",
    status: "in-progress",
    techStack: ["Flutter", "Dart"],
    sourceUrl: "https://github.com/sarahheartley/habit-tracker",
  },
  {
    id: "virtual-pet",
    title: "Virtual Pet",
    description: "A tiny digital pet that needs snacks, play and naps.",
    status: "completed",
    techStack: [],
    sourceUrl: "https://github.com/sarahheartley/virtual-pet",
  },
  {
    id: "medical-visualizer",
    title: "Medical Visualizer",
    description: "Turns complex medical data into charts people can read.",
    status: "completed",
    techStack: [],
    sourceUrl: "https://github.com/sarahheartley/medical-visualizer",
  },
];
