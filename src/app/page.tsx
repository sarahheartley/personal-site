import { About } from "@/components/sections/About";
import { GameDev } from "@/components/sections/GameDev";
import { Hero } from "@/components/sections/Hero";
import { ProjectsLink } from "@/components/sections/Projects";

export default function Home() {
  return (
    <>
      <Hero />
      <ProjectsLink />
      <GameDev />
      <About />
    </>
  );
}
