import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowLeft, Check, X, RefreshCw, Brain } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { MentorChat } from "@/components/MentorChat";

export const Route = createFileRoute("/quiz")({
  head: () => ({
    meta: [
      { title: "Chart quiz — Tradely" },
      { name: "description", content: "Quick pattern-recognition drills for trading beginners." },
    ],
  }),
  component: QuizPage,
});

type Choice = { label: string; path: string };
type Q = {
  prompt: string;
  hint?: string;
  choices: Choice[];
  answerIndex: number;
  explanation: string;
};

const QUESTIONS: Q[] = [
  {
    prompt: "Which chart shows a clean UPTREND (higher highs + higher lows)?",
    hint: "Look for an overall staircase climbing to the right.",
    choices: [
      { label: "A · Staircase up", path: "M0,170 L60,130 L100,150 L160,90 L200,110 L260,55 L320,75 L380,25" },
      { label: "B · Staircase down", path: "M0,30 L60,70 L100,55 L160,110 L200,90 L260,150 L320,135 L380,180" },
      { label: "C · Choppy sideways", path: "M0,100 L60,80 L100,120 L160,90 L200,130 L260,80 L320,120 L380,100" },
      { label: "D · Flat line", path: "M0,100 L380,100" },
    ],
    answerIndex: 0,
    explanation: "Each swing high is higher than the last AND each swing low is higher too — textbook uptrend.",
  },
  {
    prompt: "Which one looks like a FAKE BREAKOUT above resistance?",
    hint: "A real breakout holds; a fake one stabs above and snaps back fast.",
    choices: [
      { label: "A · Bouncing inside a range", path: "M0,120 L80,120 L160,80 L240,120 L320,80 L380,120" },
      { label: "B · Sharp wick above level, instant rejection", path: "M0,120 L80,118 L160,80 L180,40 L200,90 L280,120 L380,130" },
      { label: "C · Flat at the top", path: "M0,40 L380,40" },
      { label: "D · Steady downtrend", path: "M0,40 L60,70 L120,90 L180,110 L240,130 L300,150 L380,170" },
    ],
    answerIndex: 1,
    explanation: "Sharp wick above the level, then immediate rejection back into the range = liquidity grab / fake breakout.",
  },
  {
    prompt: "Which is a RANGE (sideways) market?",
    hint: "Price bouncing between the same ceiling and floor for a while.",
    choices: [
      { label: "A · Zig-zag inside two levels", path: "M0,60 L60,140 L120,60 L180,140 L240,60 L300,140 L380,60" },
      { label: "B · Strong uptrend", path: "M0,180 L380,20" },
      { label: "C · Strong downtrend", path: "M0,20 L380,180" },
      { label: "D · One flat line", path: "M0,100 L380,100" },
    ],
    answerIndex: 0,
    explanation: "Price oscillates between roughly the same highs and lows — that's a range.",
  },
  {
    prompt: "Which shows a BREAK OF STRUCTURE (trend likely shifting up)?",
    hint: "A new HIGHER high after a series of lower highs.",
    choices: [
      { label: "A · Lower lows continuing", path: "M0,40 L60,90 L120,70 L180,130 L240,110 L300,170 L380,150" },
      { label: "B · Down-then-up, breaks prior high", path: "M0,80 L40,140 L80,120 L140,160 L180,100 L240,140 L300,60 L380,30" },
      { label: "C · Flat range", path: "M0,100 L380,100" },
      { label: "D · Straight diagonal down", path: "M0,20 L380,180" },
    ],
    answerIndex: 1,
    explanation: "After a downtrend, price prints a new higher high — that's a break of structure to the upside.",
  },
  {
    prompt: "Which is a healthy PULLBACK inside an uptrend (buy-the-dip setup)?",
    hint: "Up — small dip — up again, not a full reversal.",
    choices: [
      { label: "A · Up, small dip, continues up", path: "M0,170 L80,110 L130,130 L180,120 L240,70 L320,90 L380,30" },
      { label: "B · Up then full reversal down", path: "M0,170 L120,40 L200,60 L300,150 L380,180" },
      { label: "C · Pure choppy noise", path: "M0,100 L40,80 L80,120 L120,80 L160,120 L200,80 L240,120 L280,80 L320,120 L380,100" },
      { label: "D · Straight flat", path: "M0,100 L380,100" },
    ],
    answerIndex: 0,
    explanation: "A pullback retraces only part of the prior up-move, then the trend resumes. That's where pros buy.",
  },
  {
    prompt: "Which line shows a clear SUPPORT level being respected?",
    hint: "Price keeps bouncing off the same floor.",
    choices: [
      { label: "A · Multiple bounces off a floor", path: "M0,80 L40,140 L80,90 L120,140 L160,100 L200,140 L240,70 L300,140 L380,60" },
      { label: "B · One-way down forever", path: "M0,30 L380,180" },
      { label: "C · Flat horizontal", path: "M0,100 L380,100" },
      { label: "D · Single spike up", path: "M0,150 L180,30 L380,150" },
    ],
    answerIndex: 0,
    explanation: "Support holds when price touches the same level repeatedly and bounces — buyers defend it each time.",
  },
];

function QuizPage() {
  const [i, setI] = useState(0);
  const [chosen, setChosen] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const q = QUESTIONS[i];
  const finished = i >= QUESTIONS.length - 1 && chosen !== null;

  function next() {
    if (chosen === q.answerIndex) setScore((s) => s + 1);
    setChosen(null);
    setI((x) => Math.min(x + 1, QUESTIONS.length - 1));
  }

  function reset() {
    setI(0);
    setChosen(null);
    setScore(0);
  }

  const total = QUESTIONS.length;
  const done = useMemo(() => i + (chosen !== null ? 1 : 0), [i, chosen]);

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <div className="absolute inset-x-0 top-0 -z-10 h-[300px] aurora-bg opacity-40" />
      <header className="mx-auto flex max-w-4xl items-center justify-between px-6 pt-6">
        <Link to="/learn" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to dashboard
        </Link>
        <ThemeToggle />
      </header>

      <main className="mx-auto max-w-4xl px-6 pb-24 pt-10">
        <div className="mb-6 flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-[var(--shadow-glow)]">
            <Brain className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold sm:text-4xl">Chart quiz</h1>
            <p className="text-sm text-muted-foreground">Train your eye — {done}/{total} · Score {score}</p>
          </div>
        </div>

        {!finished ? (
          <div className="rounded-3xl border border-border bg-card p-6">
            <h2 className="text-xl font-bold">{q.prompt}</h2>
            {q.hint && <p className="mt-1 text-sm text-muted-foreground">💡 {q.hint}</p>}
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {q.choices.map((c, idx) => {
                const isChosen = chosen === idx;
                const isAnswer = idx === q.answerIndex;
                const state = chosen === null ? "neutral" : isAnswer ? "correct" : isChosen ? "wrong" : "dim";
                return (
                  <button
                    key={idx}
                    disabled={chosen !== null}
                    onClick={() => setChosen(idx)}
                    className={`relative rounded-2xl border-2 p-4 text-left transition ${
                      state === "neutral"
                        ? "border-border hover:border-primary/50 hover:bg-muted/40"
                        : state === "correct"
                          ? "border-success bg-success/10"
                          : state === "wrong"
                            ? "border-destructive bg-destructive/10"
                            : "border-border opacity-50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold">{c.label}</span>
                      {state === "correct" && <Check className="h-5 w-5 text-success" />}
                      {state === "wrong" && <X className="h-5 w-5 text-destructive" />}
                    </div>
                    <svg viewBox="0 0 380 200" className="mt-3 h-28 w-full text-foreground">
                      <path d={c.path} stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                );
              })}
            </div>
            {chosen !== null && (
              <div className={`mt-5 rounded-2xl border p-4 text-sm ${chosen === q.answerIndex ? "border-success/40 bg-success/10" : "border-amber-400/40 bg-amber-400/10"}`}>
                <div className="font-semibold">{chosen === q.answerIndex ? "Correct!" : "Not quite — here's why:"}</div>
                <div className="mt-1 text-foreground/80">{q.explanation}</div>
                <div className="mt-1 text-xs text-muted-foreground">No worries either way — keep going, the next question is on its way.</div>
              </div>
            )}
            {chosen !== null && (
              <Button onClick={next} className="mt-4 rounded-full bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-[var(--shadow-glow)]">
                {i === total - 1 ? "Finish" : "Next question"}
              </Button>
            )}
          </div>
        ) : (
          <div className="rounded-3xl border border-border bg-card p-10 text-center">
            <h2 className="text-3xl font-bold">Quiz complete</h2>
            <p className="mt-2 text-muted-foreground">
              You scored {score + (chosen === q.answerIndex ? 1 : 0)} / {total}
            </p>
            <Button onClick={reset} className="mt-6 rounded-full bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-[var(--shadow-glow)]">
              <RefreshCw className="mr-1 h-4 w-4" /> Try again
            </Button>
          </div>
        )}
      </main>
      <MentorChat />
    </div>
  );
}
