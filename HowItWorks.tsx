const steps = [
  { n: "01", title: "Tell us your level", desc: "Beginner, curious, or already trading — we tailor your roadmap." },
  { n: "02", title: "Learn bite-sized lessons", desc: "5-minute interactive cards with quizzes and animations." },
  { n: "03", title: "Practice risk-free", desc: "Trade on the simulator. Get AI feedback on every decision." },
  { n: "04", title: "Level up confidently", desc: "Earn badges, climb ranks, and master charts without losing a cent." },
];

export function HowItWorks() {
  return (
    <section id="how" className="relative py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">How it works</p>
          <h2 className="mt-3 text-balance text-4xl font-bold sm:text-5xl">From zero to confident in 4 steps</h2>
        </div>
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <div key={s.n} className="glass relative rounded-3xl p-6">
              <div className="text-5xl font-bold text-gradient">{s.n}</div>
              <h3 className="mt-3 text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
