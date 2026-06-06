import { Bot, Gamepad2, BarChart3, Brain } from "lucide-react";

const features = [
  {
    icon: Bot,
    title: "AI Mentor, always on",
    desc: "A calm, patient, and ethical tutor that explains any term, debriefs your trades, and answers ‘dumb’ questions without judgment.",
  },
  {
    icon: Gamepad2,
    title: "Gamified to the core",
    desc: "XP, badges, skill trees, daily quests. Learning trading should feel like leveling up — not homework.",
  },
  {
    icon: BarChart3,
    title: "Risk-free simulator",
    desc: "Paper trade live-style markets with fake money. The AI debriefs every win and loss so you actually improve.",
  },
  {
    icon: Brain,
    title: "Chart quizzes",
    desc: "Quickfire pattern-recognition drills. Train your eye to spot candles, structure, and setups in seconds.",
  },
];

export function Features() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-4 md:grid-cols-2">
          {features.map((f) => (
            <div key={f.title} className="glass rounded-3xl p-8 transition-all hover:-translate-y-0.5">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-primary to-accent text-primary-foreground">
                <f.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-xl font-semibold">{f.title}</h3>
              <p className="mt-2 text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
