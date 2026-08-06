import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/shorts")({
  component: ShortsGallery,
});

const SHORTS = [
  { id: 1, file: "short-1.mp4", title: "Salad Challenge" },
  { id: 2, file: "short-2.mp4", title: "Juice Reset" },
  { id: 3, file: "short-3.mp4", title: "Morning Tips" },
  { id: 4, file: "short-4.mp4", title: "Pre-Workout Snacks" },
  { id: 5, file: "short-5.mp4", title: "Tea Ritual" },
  { id: 6, file: "short-6.mp4", title: "Meal Prep" },
  { id: 7, file: "short-7.mp4", title: "Movement Rule" },
  { id: 8, file: "short-8.mp4", title: "Hydration Reset" },
  { id: 9, file: "short-9.mp4", title: "Supplements" },
  { id: 10, file: "short-10.mp4", title: "Detox Challenge" },
];

function ShortsGallery() {
  return (
    <div className="min-h-dvh bg-warm-900">
      {/* Navigation */}
      <header className="sticky top-0 z-50 border-b border-warm-700 bg-warm-900/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="flex size-8 items-center justify-center rounded-lg bg-teal-600 text-xs font-bold text-white shadow-sm">
              VC
            </span>
            <span className="font-heading text-base font-semibold text-warm-100">
              Vitality Compass
            </span>
          </Link>
          <nav className="flex items-center gap-4">
            <Link
              to="/"
              className="font-body text-sm font-medium text-warm-300 hover:text-teal-400"
            >
              Home
            </Link>
          </nav>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 py-12">
        {/* Header */}
        <div className="text-center">
          <span className="inline-flex size-12 items-center justify-center rounded-xl bg-teal-900/50 text-2xl">
            🎬
          </span>
          <h1 className="mt-4 font-heading text-3xl font-bold text-warm-100 sm:text-4xl">
            Wellness Shorts
          </h1>
          <p className="mx-auto mt-3 max-w-2xl font-body text-base text-warm-300">
            Quick, actionable wellness tips in under 60 seconds. Watch, learn, and
            apply — one short at a time.
          </p>
        </div>

        {/* Video Grid */}
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {SHORTS.map((short) => (
            <div
              key={short.id}
              className="group overflow-hidden rounded-xl bg-warm-800 shadow-lg ring-1 ring-warm-700 transition-all hover:shadow-xl hover:ring-teal-600/50"
            >
              <div className="relative aspect-[9/16] overflow-hidden bg-warm-950">
                <video
                  src={`/shorts/${short.file}`}
                  controls
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="h-full w-full object-cover"
                >
                  Your browser does not support the video tag.
                </video>
              </div>
              <div className="px-3 py-2.5">
                <p className="truncate font-heading text-sm font-semibold text-warm-100 group-hover:text-teal-400">
                  {short.title}
                </p>
                <p className="mt-0.5 font-body text-xs text-warm-500">
                  Short #{short.id}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <div className="mt-12 rounded-xl bg-teal-900/40 p-6 text-center ring-1 ring-teal-800/50 sm:p-8">
          <p className="font-heading text-lg font-semibold text-warm-100">
            More shorts coming soon
          </p>
          <p className="mt-2 font-body text-sm text-warm-400">
            Follow along for bite-sized wellness tips you can use right away.
          </p>
        </div>
      </div>
    </div>
  );
}