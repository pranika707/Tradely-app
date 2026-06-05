import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Sparkles, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { progressStore, type OnboardingProfile } from "@/lib/progress";
import { ThemeToggle } from "@/components/ThemeToggle";

export const Route = createFileRoute("/onboarding")({
  head: () => ({
    meta: [
      { title: "Get started — Tradely" },
      { name: "description", content: "Personalize your trading learning path in under a minute." },
    ],
  }),
  component: Onboarding,
});

type Step = 0 | 1 | 2 | 3 | 4;

const experiences: { id: OnboardingProfile["experience"]; label: string; desc: string; emoji: string }[] = [
  { id: "zero", label: "Total beginner", desc: "I've never traded anything.", emoji: "🌱" },
  { id: "some", label: "I've dabbled", desc: "Bought a stock or two, but no clue why.", emoji: "🧭" },
  { id: "intermediate", label: "Some experience", desc: "I know candles, want to get sharper.", emoji: "📈" },
];

const goals: { id: OnboardingProfile["goal"]; label: string; desc: string; emoji: string }[] = [
  { id: "skills", label: "Build real skills", desc: "Understand markets confidently.", emoji: "🧠" },
  { id: "income", label: "Side income (someday)", desc: "Learn safely before risking real money.", emoji: "💰" },
  { id: "curiosity", label: "Just curious", desc: "I want to know how this whole thing works.", emoji: "🔍" },
];

const minutes: { id: OnboardingProfile["dailyMinutes"]; label: string; desc: string }[] = [
  { id: 5, label: "5 min / day", desc: "Casual" },
  { id: 10, label: "10 min / day", desc: "Recommended" },
  { id: 20, label: "20 min / day", desc: "Serious" },
];

function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>(0);
  const [name, setName] = useState("");
  const [experience, setExperience] = useState<OnboardingProfile["experience"] | null>(null);
  const [goal, setGoal] = useState<OnboardingProfile["goal"] | null>(null);
  const [dailyMinutes, setDailyMinutes] = useState<OnboardingProfile["dailyMinutes"]>(10);

  const canNext =
    (step === 0 && name.trim().length >= 1) ||
    (step === 1 && experience !== null) ||
    (step === 2 && goal !== null) ||
    step === 3 ||
    step === 4;

  function finish() {
    progressStore.setProfile({
      name: name.trim() || "Trader",
      experience: experience!,
      goal: goal!,
      dailyMinutes,
      completedAt: new Date().toISOString(),
    });
    navigate({ to: "/learn" });
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <div className="absolute inset-0 -z-10 aurora-bg opacity-60" />
      <header className="mx-auto flex max-w-3xl items-center justify-between px-6 pt-6">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <div className="grid h-8 w-8 place-items-center rounded-xl bg-gradient-to-br from-primary to-accent shadow-[var(--shadow-glow)]">
            <Sparkles className="h-4 w-4 text-primary-foreground" />
          </div>
          Tradely
        </Link>
        <ThemeToggle />
      </header>

      <main className="mx-auto max-w-2xl px-6 pt-12 pb-24">
        {/* Progress bar */}
        <div className="mb-10 flex items-center gap-2">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full transition-all ${
                i <= step ? "bg-gradient-to-r from-primary to-accent" : "bg-muted"
              }`}
            />
          ))}
        </div>

        <div className="glass rounded-3xl p-8 sm:p-10 animate-[fadeUp_0.4s_ease-out]" key={step}>
          {step === 0 && (
            <>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Welcome 👋 What should we call you?
              </h1>
              <p className="mt-3 text-muted-foreground">
                Your AI mentor will use your name to keep things friendly. No email needed.
              </p>
              <Input
                autoFocus
                placeholder="e.g. Alex"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-8 h-14 rounded-2xl text-lg"
              />
            </>
          )}

          {step === 1 && (
            <>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Where are you starting from?
              </h1>
              <p className="mt-3 text-muted-foreground">No wrong answer — this just tunes your path.</p>
              <div className="mt-8 space-y-3">
                {experiences.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setExperience(opt.id)}
                    className={`group flex w-full items-center gap-4 rounded-2xl border-2 p-5 text-left transition-all ${
                      experience === opt.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/40 hover:bg-muted/40"
                    }`}
                  >
                    <span className="text-3xl">{opt.emoji}</span>
                    <span className="flex-1">
                      <span className="block font-semibold">{opt.label}</span>
                      <span className="block text-sm text-muted-foreground">{opt.desc}</span>
                    </span>
                    {experience === opt.id && <Check className="h-5 w-5 text-primary" />}
                  </button>
                ))}
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                What's pulling you in?
              </h1>
              <p className="mt-3 text-muted-foreground">We'll adjust lesson tone and examples.</p>
              <div className="mt-8 space-y-3">
                {goals.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setGoal(opt.id)}
                    className={`group flex w-full items-center gap-4 rounded-2xl border-2 p-5 text-left transition-all ${
                      goal === opt.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/40 hover:bg-muted/40"
                    }`}
                  >
                    <span className="text-3xl">{opt.emoji}</span>
                    <span className="flex-1">
                      <span className="block font-semibold">{opt.label}</span>
                      <span className="block text-sm text-muted-foreground">{opt.desc}</span>
                    </span>
                    {goal === opt.id && <Check className="h-5 w-5 text-primary" />}
                  </button>
                ))}
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                How much time daily?
              </h1>
              <p className="mt-3 text-muted-foreground">
                Tiny, consistent reps beat marathon sessions. Promise.
              </p>
              <div className="mt-8 grid grid-cols-3 gap-3">
                {minutes.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setDailyMinutes(m.id)}
                    className={`rounded-2xl border-2 p-5 text-center transition-all ${
                      dailyMinutes === m.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/40"
                    }`}
                  >
                    <div className="text-xl font-bold">{m.label}</div>
                    <div className="mt-1 text-xs text-muted-foreground">{m.desc}</div>
                  </button>
                ))}
              </div>
            </>
          )}

          {step === 4 && (
            <>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Your path is ready, {name || "Trader"} 🚀
              </h1>
              <p className="mt-3 text-muted-foreground">
                Based on your answers, we'll start with the basics and ramp you up gradually.
              </p>
              <div className="mt-8 space-y-3">
                <PathItem emoji="🌱" title="Module 1 — Trading Basics" desc="3 bite-sized lessons" />
                <PathItem emoji="📈" title="Module 2 — Charts & Patterns" desc="Spot trends with confidence" />
                <PathItem emoji="🛡️" title="Module 3 — Risk Management" desc="Protect your capital first" />
                <PathItem emoji="🧠" title="Module 4 — Trading Psychology" desc="Master the mind" />
              </div>
            </>
          )}

          <div className="mt-10 flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => setStep((s) => (Math.max(0, s - 1) as Step))}
              disabled={step === 0}
              className="rounded-full"
            >
              <ArrowLeft className="mr-1 h-4 w-4" /> Back
            </Button>
            {step < 4 ? (
              <Button
                onClick={() => setStep((s) => ((s + 1) as Step))}
                disabled={!canNext}
                className="rounded-full bg-gradient-to-r from-primary to-accent px-6 text-primary-foreground shadow-[var(--shadow-glow)] hover:opacity-95"
              >
                Continue <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            ) : (
              <Button
                onClick={finish}
                className="rounded-full bg-gradient-to-r from-primary to-accent px-6 text-primary-foreground shadow-[var(--shadow-glow)] hover:opacity-95"
              >
                Start learning <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

function PathItem({ emoji, title, desc }: { emoji: string; title: string; desc: string }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-border bg-card/50 p-4">
      <span className="text-2xl">{emoji}</span>
      <div className="flex-1">
        <div className="font-semibold">{title}</div>
        <div className="text-sm text-muted-foreground">{desc}</div>
      </div>
      <Check className="h-5 w-5 text-success" />
    </div>
  );
}
