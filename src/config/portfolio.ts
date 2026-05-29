export type SkillCategory = "frontend" | "backend" | "tools";

export interface Skill {
  name: string;
  category: SkillCategory;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  liveUrl?: string;
  sourceUrl?: string;
  featured?: boolean;
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
  title: string;
  company?: string;
  tagline: string;
  bio: string;
  focusAreas: string[];
  location: string;
  education?: string;
  resumeUrl?: string;
  social: SocialLinks;
}

export const profile: Profile = {
  name: "Sarah Hartley",
  title: "Software Engineer",
  tagline:
    "Designing and delivering scalable, secure full-stack software — from modern web applications to intelligent automation.",
  bio: "Software engineer with nearly five years of experience building production web applications, backend microservices, and data pipelines. I focus on clean architecture, reliable delivery, and thoughtful use of Generative AI and machine learning where they add real value.",
  focusAreas: [
    "Full-stack enterprise web development (React, Angular, TypeScript)",
    "Backend microservices & REST APIs (Java, .NET)",
    "Generative AI, ML automation & Python data pipelines",
    "Agile/Scrum, CI/CD & automated testing",
  ],
  location: "Austin, TX",
  education:
    "B.S. Computer and Information Science, University of Oregon (2021) · 3.79 GPA",
  resumeUrl: "/Sarah-Hartley-Resume.docx",
  social: {
    github: "https://github.com/sarahheartley",
    linkedin: "https://linkedin.com/in/sarahgracehartley",
    email: "mailto:sarah@ushartleys.com",
  },
};

export const navLinks: NavLink[] = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
];

export const skills: Skill[] = [
  { name: "JavaScript", category: "frontend" },
  { name: "TypeScript", category: "frontend" },
  { name: "React", category: "frontend" },
  { name: "Angular", category: "frontend" },
  { name: "HTML5", category: "frontend" },
  { name: "CSS3", category: "frontend" },
  { name: "Python", category: "backend" },
  { name: "Java", category: "backend" },
  { name: "C#", category: "backend" },
  { name: ".NET Core", category: "backend" },
  { name: "SQL", category: "backend" },
  { name: "REST APIs", category: "backend" },
  { name: "Microservices", category: "backend" },
  { name: "Git", category: "tools" },
  { name: "Docker", category: "tools" },
  { name: "AWS", category: "tools" },
  { name: "Azure", category: "tools" },
  { name: "Linux", category: "tools" },
  { name: "CI/CD", category: "tools" },
  { name: "JMeter", category: "tools" },
  { name: "BrowserStack", category: "tools" },
  { name: "Agile/Scrum", category: "tools" },
];

export const skillCategories: { key: SkillCategory; label: string }[] = [
  { key: "frontend", label: "Frontend" },
  { key: "backend", label: "Backend" },
  { key: "tools", label: "Tools & DevOps" },
];

export const projects: Project[] = [];

export const projectsNotice = {
  title: "Selected Projects",
  description:
    "A curated showcase of recent work will be published here shortly.",
  message: "Stay tuned — projects are on the way.",
};
