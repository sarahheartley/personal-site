import { profile } from "@/config/portfolio";

const focusColors = [
  "from-pink-50 to-rose-50 border-pink-200 text-slate-700",
  "from-sky-50 to-cyan-50 border-sky-200 text-slate-700",
  "from-violet-50 to-purple-50 border-violet-200 text-slate-700",
  "from-amber-50 to-yellow-50 border-amber-200 text-slate-700",
];

export function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-28 lg:px-8"
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10 dot-pattern"
        aria-hidden="true"
      >
        <div className="animate-float absolute -right-10 top-8 h-52 w-52 rounded-full bg-gradient-to-br from-pink-300 to-rose-300 opacity-50 blur-2xl" />
        <div className="animate-float-delayed absolute -left-8 top-1/3 h-60 w-60 rounded-full bg-gradient-to-br from-amber-200 to-orange-300 opacity-40 blur-2xl" />
        <div className="animate-float absolute right-1/4 bottom-4 h-44 w-44 rounded-full bg-gradient-to-br from-sky-300 to-violet-300 opacity-45 blur-2xl" />
      </div>

      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl rounded-3xl border border-white/80 bg-white/75 p-8 shadow-xl shadow-pink-100/50 backdrop-blur-sm sm:p-10">
          <p className="mb-4 inline-flex items-center rounded-full border border-pink-200 bg-gradient-to-r from-pink-50 to-violet-50 px-4 py-2 text-sm font-semibold text-pink-700">
            {profile.title}
          </p>

          <h1 className="font-display text-4xl font-extrabold leading-tight tracking-tight text-slate-800 sm:text-5xl lg:text-6xl">
            Hi, I&apos;m{" "}
            <span className="text-gradient">{profile.name}</span>
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-slate-600 sm:text-xl">
            {profile.tagline}
          </p>

          <p className="mt-4 text-sm font-medium text-slate-500">
            Based in {profile.location} · Open to new opportunities
          </p>

          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {profile.focusAreas.map((area, index) => (
              <li
                key={area}
                className={`rounded-xl border bg-gradient-to-br px-4 py-3 text-sm font-medium shadow-sm ${focusColors[index % focusColors.length]}`}
              >
                {area}
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#projects"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-500 px-7 py-3 text-sm font-semibold text-white shadow-md shadow-pink-200/50 transition-all hover:shadow-lg"
            >
              View Projects
            </a>
            <a
              href={profile.social.email}
              className="inline-flex items-center justify-center rounded-full border border-sky-200 bg-white px-7 py-3 text-sm font-semibold text-sky-800 shadow-sm transition-all hover:border-sky-300 hover:bg-sky-50"
            >
              Contact Me
            </a>
            {profile.resumeUrl && (
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-amber-200 bg-amber-50 px-7 py-3 text-sm font-semibold text-amber-800 transition-all hover:bg-amber-100"
              >
                Download Resume
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
