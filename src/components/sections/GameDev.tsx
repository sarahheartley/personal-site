import { gameLevels } from "@/config/portfolio";
import { Overworld } from "@/components/game/Overworld";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function GameDev() {
  return (
    <section id="game-dev" className="scroll-mt-20 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Game dev"
          title="World 1: the road to shipping a game"
          description="Each stop on the map is a game project or milestone. Walk the path and hop into a level to see what it's about."
        />
        <div className="mt-10">
          <Overworld levels={gameLevels} />
        </div>
      </div>
    </section>
  );
}
