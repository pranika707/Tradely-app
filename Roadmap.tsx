import { Link } from "@tanstack/react-router";
import { BookOpen, CandlestickChart, LineChart, Shield, Brain, Trophy } from "lucide-react";
import { curriculum } from "@/lib/curriculum";

const ICONS = [BookOpen, CandlestickChart, LineChart, Shield, Brain, Trophy];
const COLORS = [
  "from-primary to-accent",
  "from-rose-400 to-orange-500",
  "from-sky-400 to-indigo-500",
  "from-emerald-500 to-amber-400",
  "from-fuchsia-500 to-primary",
  "from-amber-500 to-pink-500",
];

export function Roadmap() {
  return (
    <section id="features" className="relative py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Your roadmap</p>
          <h2 className="mt-3 text-balance text-4xl font-bold sm:text-5xl">
            Six modules. Zero overwhelm.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            A guided, gamified path from total beginner to confident chart reader —
            each lesson under 6 minutes.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {curriculum.map((mod, i) => {
            const Icon = ICONS[i] ?? BookOpen;
            const color = COLORS[i] ?? COLORS[0];
            const first = mod.lessons[0];
            return (
              <Link
                key={mod.id}
                to="/learn/$moduleId/$lessonId"
                params={{ moduleId: mod.id, lessonId: first.id }}
                className="group glass relative block overflow-hidden rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-glow)]"
              >
                <div
                  className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-gradient-to-br opacity-20 blur-2xl transition-opacity group-hover:opacity-40"
                  style={{ backgroundImage: "var(--gradient-hero)" }}
                />
                <div
                  className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${color} text-white shadow-[var(--shadow-glow)]`}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <div className="mt-5 flex items-center justify-between">
                  <h3 className="text-lg font-semibold">{mod.title}</h3>
                  <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs text-muted-foreground">
                    Module {i + 1}
                  </span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{mod.subtitle}</p>
                <div className="mt-4 text-xs text-muted-foreground">
                  {mod.lessons.length} lessons · {mod.lessons.reduce((n, l) => n + l.xp, 0)} XP
                </div>
                <div className="mt-4 text-xs font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                  Start module →
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
