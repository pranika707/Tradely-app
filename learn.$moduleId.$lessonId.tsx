import { createFileRoute, Link, useNavigate, notFound } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Check, Lightbulb, AlertTriangle, Info, Sparkles, X, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { findLesson, type LessonBlock } from "@/lib/curriculum";
import { extraBlocks } from "@/lib/extraQuizzes";
import { progressStore, useProgress } from "@/lib/progress";
import { ThemeToggle } from "@/components/ThemeToggle";
import { MentorChat } from "@/components/MentorChat";
import { CandleBuilder } from "@/components/lesson/CandleBuilder";
import { EmotionalCycle } from "@/components/lesson/EmotionalCycle";
import { PriceFlow, LiquidityZones, MarketStructure, RiskPyramid, RMultipleBars, DrawdownMath, FearGreedMeter, MindsetLoop } from "@/components/lesson/FlowDiagram";
import { getModuleIcon } from "@/lib/moduleIcons";

export const Route = createFileRoute("/learn/$moduleId/$lessonId")({
  head: ({ params }) => ({
    meta: [{ title: `Lesson — Tradely` }, { name: "description", content: `Interactive lesson: ${params.lessonId}` }],
  }),
  loader: ({ params }) => {
    const found = findLesson(params.moduleId, params.lessonId);
    if (!found) throw notFound();
    return found;
  },
  component: LessonPlayer,
  notFoundComponent: () => (
    <div className="grid min-h-screen place-items-center bg-background text-foreground">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Lesson not found</h1>
        <Link to="/learn" className="mt-4 inline-block text-primary underline">Back to dashboard</Link>
      </div>
    </div>
  ),
  errorComponent: ({ reset }) => (
    <div className="grid min-h-screen place-items-center bg-background p-6 text-foreground">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Something went wrong</h1>
        <Button onClick={reset} className="mt-4">Try again</Button>
      </div>
    </div>
  ),
});

function LessonPlayer() {
  const { module: mod, lesson, next } = Route.useLoaderData();
  const navigate = useNavigate();
  const progress = useProgress();
  const alreadyDone = progress.completedLessons.includes(`${mod.id}/${lesson.id}`);

  const [idx, setIdx] = useState(0);
  const [quizState, setQuizState] = useState<Record<number, number>>({}); // block idx -> chosen
  const [finished, setFinished] = useState(false);

  const blocks = useMemo<LessonBlock[]>(() => {
    const extras = extraBlocks[`${mod.id}/${lesson.id}`] ?? [];
    return [...lesson.blocks, ...extras];
  }, [mod.id, lesson.id, lesson.blocks]);

  const total = blocks.length;
  const block: LessonBlock = blocks[idx];
  const pct = Math.round(((idx + (finished ? 1 : 0)) / total) * 100);

  const isQuiz = block.type === "quiz";
  const chosen = isQuiz ? quizState[idx] : undefined;
  const answered = chosen !== undefined;
  const correct = isQuiz && answered && chosen === (block as Extract<LessonBlock, { type: "quiz" }>).answerIndex;

  // Quizzes must be answered correctly before continuing. If wrong, the
  // user can clear their answer and try again.
  const canAdvance = !isQuiz || correct;
  const ModIcon = getModuleIcon(mod.id);

  function handleNext() {
    if (idx < total - 1) {
      setIdx(idx + 1);
    } else {
      progressStore.completeLesson(mod.id, lesson.id, alreadyDone ? 0 : lesson.xp);
      setFinished(true);
    }
  }

  const xpEarned = useMemo(() => (alreadyDone ? 0 : lesson.xp), [alreadyDone, lesson.xp]);

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <div className="absolute inset-x-0 top-0 -z-10 h-[300px] aurora-bg opacity-40" />

      <header className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-6 pt-6">
        <Link to="/learn" className="grid h-9 w-9 place-items-center rounded-full bg-card hover:bg-muted">
          <X className="h-4 w-4" />
        </Link>
        <div className="flex-1">
          <div className="h-2 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
        <ThemeToggle />
      </header>



      <main className="mx-auto max-w-3xl px-6 pb-32 pt-10">
        {!finished ? (
          <>
            <div className="mb-6 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              <ModIcon className="h-4 w-4 text-primary" />
              <span>{mod.title}</span>
              <span>·</span>
              <span>{idx + 1} / {total}</span>
            </div>
            <h1 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
              {lesson.title}
            </h1>

            <div key={idx} className="mt-8 animate-[fadeUp_0.4s_ease-out]">
              <BlockRenderer
                block={block}
                chosen={chosen}
                onChoose={(c) => setQuizState((s) => ({ ...s, [idx]: c }))}
                onRetry={() => setQuizState((s) => {
                  const copy = { ...s };
                  delete copy[idx];
                  return copy;
                })}
              />
            </div>
          </>
        ) : (
          <FinishedView
            xpEarned={xpEarned}
            onNext={() => {
              if (next) {
                navigate({ to: "/learn/$moduleId/$lessonId", params: next });
                setIdx(0);
                setQuizState({});
                setFinished(false);
              } else {
                navigate({ to: "/learn" });
              }
            }}
            hasNext={!!next}
          />
        )}
      </main>

      {!finished && (
        <div className="fixed inset-x-0 bottom-0 border-t border-border bg-background/90 backdrop-blur-md">
          <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 px-6 py-4">
            <Button
              variant="ghost"
              onClick={() => setIdx((i) => Math.max(0, i - 1))}
              disabled={idx === 0}
              className="rounded-full"
            >
              <ArrowLeft className="mr-1 h-4 w-4" /> Back
            </Button>
            <Button
              onClick={handleNext}
              disabled={!canAdvance}
              className="rounded-full bg-gradient-to-r from-primary to-accent px-6 text-primary-foreground shadow-[var(--shadow-glow)] hover:opacity-95"
            >
              {idx === total - 1 ? "Finish" : "Continue"} <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
      <MentorChat moduleTitle={mod.title} lessonTitle={lesson.title} />
    </div>
  );
}

function BlockRenderer({
  block,
  chosen,
  onChoose,
  onRetry,
}: {
  block: LessonBlock;
  chosen: number | undefined;
  onChoose: (c: number) => void;
  onRetry: () => void;
}) {
  if (block.type === "text") {
    return (
      <div className="glass rounded-3xl p-8">
        {block.title && (
          <h2 className="text-xl font-bold tracking-tight sm:text-2xl">{block.title}</h2>
        )}
        <p className={`${block.title ? "mt-3" : ""} text-lg leading-relaxed text-foreground/90`}>
          {block.body}
        </p>
      </div>
    );
  }
  if (block.type === "callout") {
    const map = {
      tip: { Icon: Lightbulb, color: "from-emerald-400 to-teal-500", label: "Tip" },
      warn: { Icon: AlertTriangle, color: "from-amber-400 to-orange-500", label: "Heads up" },
      info: { Icon: Info, color: "from-sky-400 to-indigo-500", label: "Good to know" },
    } as const;
    const { Icon, color, label } = map[block.tone];
    return (
      <div className="overflow-hidden rounded-3xl border border-border bg-card p-6">
        <div className="flex items-center gap-2">
          <span className={`grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br ${color} text-white`}>
            <Icon className="h-4 w-4" />
          </span>
          <span className="text-sm font-semibold uppercase tracking-wider">{label}</span>
        </div>
        <p className="mt-3 text-lg leading-relaxed text-foreground/90">{block.body}</p>
      </div>
    );
  }
  if (block.type === "interactive") {

    if (block.widget === "candle-builder") return <CandleBuilder />;
    if (block.widget === "emotional-cycle") return <EmotionalCycle />;
    if (block.widget === "price-flow") return <PriceFlow />;
    if (block.widget === "liquidity-zones") return <LiquidityZones />;
    if (block.widget === "market-structure") return <MarketStructure />;
    if (block.widget === "risk-pyramid") return <RiskPyramid />;
    if (block.widget === "r-multiple") return <RMultipleBars />;
    if (block.widget === "drawdown-math") return <DrawdownMath />;
    if (block.widget === "fear-greed-meter") return <FearGreedMeter />;
    if (block.widget === "mindset-loop") return <MindsetLoop />;
    return null;
  }
  // quiz
  const q = block;

  const answered = chosen !== undefined;
  return (
    <div className="rounded-3xl border border-border bg-card p-6 sm:p-8">
      <div className="text-xs font-semibold uppercase tracking-wider text-primary">Quick check</div>
      <h2 className="mt-2 text-xl font-bold tracking-tight sm:text-2xl">{q.question}</h2>
      <div className="mt-6 space-y-3">
        {q.options.map((opt, i) => {
          const isChosen = chosen === i;
          const isAnswer = i === q.answerIndex;
          const state = !answered
            ? "neutral"
            : isAnswer
              ? "correct"
              : isChosen
                ? "wrong"
                : "dim";
          return (
            <button
              key={i}
              onClick={() => !answered && onChoose(i)}
              disabled={answered}
              className={`flex w-full items-center justify-between gap-3 rounded-2xl border-2 p-4 text-left transition-all ${
                state === "neutral"
                  ? "border-border hover:border-primary/50 hover:bg-muted/40"
                  : state === "correct"
                    ? "border-success bg-success/10"
                    : state === "wrong"
                      ? "border-destructive bg-destructive/10"
                      : "border-border opacity-50"
              }`}
            >
              <span className="font-medium">{opt}</span>
              {state === "correct" && <Check className="h-5 w-5 text-success" />}
              {state === "wrong" && <X className="h-5 w-5 text-destructive" />}
            </button>
          );
        })}
      </div>
      {answered && (
        <div
          className={`mt-5 rounded-2xl border p-4 text-sm ${
            chosen === q.answerIndex
              ? "border-success/40 bg-success/10 text-success-foreground"
              : "border-amber-400/40 bg-amber-400/10"
          }`}
        >
          <div className="font-semibold">
            {chosen === q.answerIndex ? "Nice — you got it!" : "Not quite — here's why:"}
          </div>
          <div className="mt-1 text-foreground/80">{q.explanation}</div>
          {chosen !== q.answerIndex && (
            <Button
              onClick={onRetry}
              size="sm"
              className="mt-3 rounded-full"
              variant="outline"
            >
              Try again
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

function FinishedView({
  xpEarned,
  hasNext,
  onNext,
}: {
  xpEarned: number;
  hasNext: boolean;
  onNext: () => void;
}) {
  return (
    <div className="mt-10 text-center">
      <div className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-gradient-to-br from-primary to-accent shadow-[var(--shadow-glow)] animate-[pulseGlow_2s_ease-in-out_infinite]">
        <Sparkles className="h-10 w-10 text-primary-foreground" />
      </div>
      <h1 className="mt-6 text-balance text-4xl font-bold tracking-tight sm:text-5xl">
        Lesson complete!
      </h1>
      <p className="mt-3 text-muted-foreground">
        Tiny win, real progress. Keep the streak alive.
      </p>
      {xpEarned > 0 && (
        <div className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-5 py-2 text-primary-foreground shadow-[var(--shadow-glow)]">
          <Zap className="h-4 w-4" />
          <span className="font-bold">+{xpEarned} XP</span>
        </div>
      )}
      <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Link to="/learn">
          <Button variant="outline" className="rounded-full">Back to dashboard</Button>
        </Link>
        <Button
          onClick={onNext}
          className="rounded-full bg-gradient-to-r from-primary to-accent px-6 text-primary-foreground shadow-[var(--shadow-glow)] hover:opacity-95"
        >
          {hasNext ? "Next lesson" : "Finish module"} <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
