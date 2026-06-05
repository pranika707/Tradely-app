import { createFileRoute, Link } from "@tanstack/react-router";
import { Sparkles, Trophy, Check, ArrowRight, Zap, BookOpen, BookText, Brain, Film, LogIn, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { curriculum, totalLessons } from "@/lib/curriculum";
import { useProgress, lessonLevel } from "@/lib/progress";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { MentorChat } from "@/components/MentorChat";
import { getModuleIcon } from "@/lib/moduleIcons";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/learn/")({
  head: () => ({
    meta: [
      { title: "Your learning dashboard — Tradely" },
      { name: "description", content: "Track your XP and continue your bite-sized lessons." },
    ],
  }),
  component: Learn,
});

function Learn() {
  const progress = useProgress();
  const { level, intoLevel, toNext } = lessonLevel(progress.xp);
  const done = progress.completedLessons.length;
  const pct = Math.round((done / totalLessons) * 100);

  let nextUp: { moduleId: string; lessonId: string; title: string; emoji: string } | null = null;
  for (const m of curriculum) {
    for (const l of m.lessons) {
      if (!progress.completedLessons.includes(`${m.id}/${l.id}`)) {
        nextUp = { moduleId: m.id, lessonId: l.id, title: l.title, emoji: l.emoji };
        break;
      }
    }
    if (nextUp) break;
  }

  const greeting = progress.profile?.name ? `Hey ${progress.profile.name} 👋` : "Welcome 👋";

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <div className="absolute inset-x-0 top-0 -z-10 h-[400px] aurora-bg opacity-50" />

      <header className="mx-auto flex max-w-5xl items-center justify-between px-6 pt-6">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <div className="grid h-8 w-8 place-items-center rounded-xl bg-gradient-to-br from-primary to-accent shadow-[var(--shadow-glow)]">
            <Sparkles className="h-4 w-4 text-primary-foreground" />
          </div>
          Tradely
        </Link>
        <div className="flex items-center gap-2">
          <AuthButton />
          <ThemeToggle />
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 pb-24 pt-10">
        {/* Stats hero (streak removed) */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="glass rounded-3xl p-5">
            <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              <Zap className="h-4 w-4 text-primary" /> XP
            </div>
            <div className="mt-2 text-3xl font-bold">{progress.xp}</div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all"
                style={{ width: `${intoLevel}%` }}
              />
            </div>
            <div className="mt-2 text-xs text-muted-foreground">
              Level {level} · {toNext} XP to next
            </div>
          </div>
          <div className="glass rounded-3xl p-5">
            <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              <Trophy className="h-4 w-4 text-amber-500" /> Progress
            </div>
            <div className="mt-2 text-3xl font-bold">{pct}%</div>
            <div className="mt-1 text-sm text-muted-foreground">
              {done} / {totalLessons} lessons
            </div>
          </div>
        </div>

        {/* Continue — darker accent button */}
        {nextUp && (
          <div className="mt-6 overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-accent p-6 text-primary-foreground shadow-[var(--shadow-glow)]">
            <div className="text-sm opacity-90">{greeting} — pick up where you left off</div>
            <div className="mt-2 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{nextUp.emoji}</span>
                <div className="text-xl font-bold">{nextUp.title}</div>
              </div>
              <Link
                to="/learn/$moduleId/$lessonId"
                params={{ moduleId: nextUp.moduleId, lessonId: nextUp.lessonId }}
              >
                <Button className="rounded-full bg-foreground text-background hover:bg-foreground/90">
                  Continue <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        )}


        {/* Tools strip */}
        <div className="mt-6 grid gap-3 sm:grid-cols-4">
          <ToolLink to="/quiz" label="Chart quiz" Icon={Brain} />
          <ToolLink to="/journal" label="Trade journal" Icon={BookText} />
          <ToolLink to="/replay" label="Market replay" Icon={Film} />
          <ToolLink to="/books" label="Recommended books" Icon={BookOpen} />
        </div>

        {/* Modules — all unlocked */}
        <section className="mt-10 space-y-8">
          {curriculum.map((mod, mIdx) => {
            const ModIcon = getModuleIcon(mod.id);
            return (
            <div key={mod.id}>
              <div className="mb-4 flex items-start gap-3">
                <div className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br ${mod.color} text-white shadow-[var(--shadow-glow)]`}>
                  <ModIcon className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Module {mIdx + 1}
                  </div>
                  <h2 className="mt-1 text-2xl font-bold tracking-tight">{mod.title}</h2>
                  <p className="text-sm text-muted-foreground">{mod.subtitle}</p>
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {mod.lessons.map((lesson) => {
                  const key = `${mod.id}/${lesson.id}`;
                  const isDone = progress.completedLessons.includes(key);
                  return (
                    <LessonCard
                      key={lesson.id}
                      moduleId={mod.id}
                      lessonId={lesson.id}
                      title={lesson.title}
                      emoji={lesson.emoji}
                      duration={lesson.duration}
                      xp={lesson.xp}
                      color={mod.color}
                      isDone={isDone}
                    />
                  );
                })}
              </div>
            </div>
            );
          })}
        </section>
      </main>
      <MentorChat />
    </div>
  );
}

function ToolLink({ to, label, Icon }: { to: "/quiz" | "/journal" | "/replay" | "/books"; label: string; Icon: typeof Brain }) {
  return (
    <Link
      to={to}
      className="group flex items-center gap-3 rounded-2xl border border-border bg-card p-4 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[var(--shadow-glow)]"
    >
      <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-primary to-accent text-primary-foreground">
        <Icon className="h-5 w-5" />
      </div>
      <div className="text-sm font-semibold">{label}</div>
      <ArrowRight className="ml-auto h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
    </Link>
  );
}

function LessonCard({
  moduleId,
  lessonId,
  title,
  emoji,
  duration,
  xp,
  color,
  isDone,
}: {
  moduleId: string;
  lessonId: string;
  title: string;
  emoji: string;
  duration: number;
  xp: number;
  color: string;
  isDone: boolean;
}) {
  return (
    <Link to="/learn/$moduleId/$lessonId" params={{ moduleId, lessonId }}>
      <div
        className={
          "group relative h-full overflow-hidden rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[var(--shadow-glow)]"
        }
      >
        <div
          className={`absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br ${color} opacity-20 blur-2xl`}
        />
        <div className="flex items-start justify-between">
          <span className="text-3xl">{emoji}</span>
          {isDone && (
            <span className="grid h-7 w-7 place-items-center rounded-full bg-success text-success-foreground">
              <Check className="h-4 w-4" />
            </span>
          )}
        </div>
        <h3 className="mt-4 font-semibold leading-tight">{title}</h3>
        <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
          <span>{duration} min</span>
          <span>·</span>
          <span className="inline-flex items-center gap-1">
            <Zap className="h-3 w-3" /> {xp} XP
          </span>
        </div>
      </div>
    </Link>
  );
}

function AuthButton() {
  const [email, setEmail] = useState<string | null>(null);
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setEmail(data.session?.user?.email ?? null));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setEmail(s?.user?.email ?? null));
    return () => sub.subscription.unsubscribe();
  }, []);
  if (email) {
    return (
      <Button
        variant="outline"
        size="sm"
        onClick={async () => { await supabase.auth.signOut(); }}
        className="rounded-full"
        title={email}
      >
        <LogOut className="mr-1 h-4 w-4" /> Sign out
      </Button>
    );
  }
  return (
    <Link to="/auth">
      <Button size="sm" className="rounded-full">
        <LogIn className="mr-1 h-4 w-4" /> Sign in
      </Button>
    </Link>
  );
}
