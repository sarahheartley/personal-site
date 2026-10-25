import { profile } from "@/config/portfolio";
import { PixelSprite } from "@/components/ui/PixelSprite";
import { butters, marcy, moon, sarah, sun } from "@/components/ui/sprites";

// Fixed positions so the server and client render the same stars.
const stars = Array.from({ length: 28 }, (_, i) => ({
  left: (i * 37 + 11) % 97,
  top: (i * 53 + 7) % 70,
  delay: (i % 8) * -0.2,
}));

const clouds = [
  { top: "12%", delay: "-6s", duration: "45s" },
  { top: "30%", delay: "-24s", duration: "60s" },
  { top: "8%", delay: "-38s", duration: "52s" },
];

const companions = [
  { name: profile.party[0], sprite: marcy },
  { name: profile.party[1], sprite: butters },
];

export function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden bg-hero px-4 pt-16 sm:px-6 sm:pt-24 lg:px-8">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="night-only">
          {stars.map((star, i) => (
            <span
              key={i}
              className="star"
              style={{ left: `${star.left}%`, top: `${star.top}%`, animationDelay: `${star.delay}s` }}
            />
          ))}
          <PixelSprite sprite={moon} scale={8} className="absolute right-[8%] top-10 hidden sm:block" />
        </div>
        <div className="day-only">
          {clouds.map((cloud, i) => (
            <span
              key={i}
              className="cloud"
              style={{ top: cloud.top, animationDelay: cloud.delay, animationDuration: cloud.duration }}
            />
          ))}
          <PixelSprite sprite={sun} scale={8} className="absolute right-[8%] top-10 hidden sm:block" />
        </div>
      </div>

      <div className="relative mx-auto grid max-w-6xl items-end gap-12 md:grid-cols-[3fr_2fr]">
        <div className="pb-12">
          <p className="font-pixel text-[11px] leading-relaxed text-accent">
            Chapter 1 · A new adventure begins
          </p>
          <h1 className="mt-6 font-pixel text-3xl leading-snug text-heading sm:text-4xl lg:text-5xl">
            Hi, I&apos;m {profile.firstName}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed sm:text-xl">{profile.tagline}</p>
          <p className="mt-4 text-sm text-muted">
            Home base: {profile.location} · Party: {profile.party.join(" and ")}
          </p>

          <div className="mt-10 flex flex-wrap gap-5">
            <a href="#projects" className="pixel-button pixel-frame bg-accent text-on-accent">
              View projects
            </a>
            <a href={profile.social.email} className="pixel-button pixel-frame bg-accent-2 text-on-accent-2">
              Send a message
            </a>
            {profile.resumeUrl && (
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="pixel-button pixel-frame bg-panel text-ink"
              >
                Resume
              </a>
            )}
          </div>
        </div>

        <div className="flex items-end justify-center gap-6">
          <figure className="flex flex-col items-center gap-2">
            <PixelSprite sprite={sarah} scale={7} label={`Pixel art of ${profile.firstName}`} />
            <figcaption className="font-pixel text-[11px]">{profile.firstName}</figcaption>
          </figure>
          {companions.map((companion) => (
            <figure key={companion.name} className="flex flex-col items-center gap-2">
              <PixelSprite sprite={companion.sprite} scale={6} label={`Pixel art of ${companion.name} the cat`} />
              <figcaption className="font-pixel text-[11px]">{companion.name}</figcaption>
            </figure>
          ))}
        </div>
      </div>

      <div className="relative -mx-4 mt-4 h-4 border-b-[12px] border-dirt bg-grass sm:-mx-6 lg:-mx-8" aria-hidden="true" />
    </section>
  );
}
