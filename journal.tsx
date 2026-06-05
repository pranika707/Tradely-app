import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, BookText, Plus, Trash2 } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { MentorChat } from "@/components/MentorChat";

export const Route = createFileRoute("/journal")({
  head: () => ({
    meta: [
      { title: "Trade journal — Tradely" },
      { name: "description", content: "Log every simulated trade. Patterns appear after 20 entries." },
    ],
  }),
  component: JournalPage,
});

type Entry = {
  id: string;
  date: string;
  asset: string;
  direction: "long" | "short";
  entry: number;
  exit: number;
  size: number;
  reason: string;
  feeling: string;
  lesson: string;
};

const KEY = "tradely.journal.v1";

function load(): Entry[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "[]");
  } catch {
    return [];
  }
}

function JournalPage() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [form, setForm] = useState<Omit<Entry, "id" | "date">>({
    asset: "",
    direction: "long",
    entry: 0,
    exit: 0,
    size: 0,
    reason: "",
    feeling: "",
    lesson: "",
  });

  useEffect(() => setEntries(load()), []);

  function save(list: Entry[]) {
    setEntries(list);
    localStorage.setItem(KEY, JSON.stringify(list));
  }

  function add() {
    if (!form.asset) return;
    const next: Entry = { ...form, id: crypto.randomUUID(), date: new Date().toISOString() };
    save([next, ...entries]);
    setForm({ asset: "", direction: "long", entry: 0, exit: 0, size: 0, reason: "", feeling: "", lesson: "" });
  }

  function remove(id: string) {
    save(entries.filter((e) => e.id !== id));
  }

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <div className="absolute inset-x-0 top-0 -z-10 h-[300px] aurora-bg opacity-40" />
      <header className="mx-auto flex max-w-5xl items-center justify-between px-6 pt-6">
        <Link to="/learn" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to dashboard
        </Link>
        <ThemeToggle />
      </header>

      <main className="mx-auto max-w-5xl px-6 pb-24 pt-10">
        <div className="mb-8 flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-[var(--shadow-glow)]">
            <BookText className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold sm:text-4xl">Trade journal</h1>
            <p className="mt-1 text-muted-foreground">The edge isn't in the trade — it's in the review.</p>
          </div>
        </div>

        <div className="glass rounded-3xl p-6">
          <h2 className="text-lg font-semibold">Log a trade</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <Field label="Asset" value={form.asset} onChange={(v) => setForm({ ...form, asset: v })} placeholder="e.g. BTC/USD" />
            <div>
              <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Direction</label>
              <div className="mt-1 flex gap-2">
                {(["long", "short"] as const).map((d) => (
                  <button
                    key={d}
                    onClick={() => setForm({ ...form, direction: d })}
                    className={`flex-1 rounded-xl border-2 px-3 py-2 text-sm font-medium capitalize transition ${
                      form.direction === d ? "border-primary bg-primary/10 text-primary" : "border-border"
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>
            <Field label="Entry price" value={String(form.entry || "")} onChange={(v) => setForm({ ...form, entry: Number(v) })} type="number" />
            <Field label="Exit price" value={String(form.exit || "")} onChange={(v) => setForm({ ...form, exit: Number(v) })} type="number" />
            <Field label="Size" value={String(form.size || "")} onChange={(v) => setForm({ ...form, size: Number(v) })} type="number" />
            <Field label="Setup / reason" value={form.reason} onChange={(v) => setForm({ ...form, reason: v })} placeholder="Trend pullback at 50 EMA" />
            <Field label="Feeling" value={form.feeling} onChange={(v) => setForm({ ...form, feeling: v })} placeholder="Calm / FOMO / anxious" />
            <Field label="Lesson learned" value={form.lesson} onChange={(v) => setForm({ ...form, lesson: v })} placeholder="Stop was too tight" />
          </div>
          <Button onClick={add} className="mt-4 rounded-full bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-[var(--shadow-glow)]">
            <Plus className="mr-1 h-4 w-4" /> Add entry
          </Button>
        </div>

        <h2 className="mt-10 text-lg font-semibold">Your entries ({entries.length})</h2>
        {entries.length === 0 ? (
          <div className="mt-4 rounded-2xl border border-dashed border-border p-8 text-center text-muted-foreground">
            No trades yet. Log your first simulated trade above.
          </div>
        ) : (
          <div className="mt-4 space-y-3">
            {entries.map((e) => {
              const pnl = (e.direction === "long" ? e.exit - e.entry : e.entry - e.exit) * e.size;
              const win = pnl >= 0;
              return (
                <div key={e.id} className="rounded-2xl border border-border bg-card p-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${e.direction === "long" ? "bg-success/15 text-success" : "bg-destructive/15 text-destructive"}`}>
                        {e.direction.toUpperCase()}
                      </span>
                      <div className="font-semibold">{e.asset}</div>
                      <div className="text-xs text-muted-foreground">{new Date(e.date).toLocaleString()}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className={`text-sm font-bold ${win ? "text-success" : "text-destructive"}`}>
                        {win ? "+" : ""}
                        {pnl.toFixed(2)}
                      </div>
                      <button onClick={() => remove(e.id)} className="grid h-8 w-8 place-items-center rounded-full hover:bg-muted">
                        <Trash2 className="h-4 w-4 text-muted-foreground" />
                      </button>
                    </div>
                  </div>
                  <div className="mt-3 grid gap-2 text-sm sm:grid-cols-3">
                    <div><span className="text-muted-foreground">Setup: </span>{e.reason || "—"}</div>
                    <div><span className="text-muted-foreground">Feeling: </span>{e.feeling || "—"}</div>
                    <div><span className="text-muted-foreground">Lesson: </span>{e.lesson || "—"}</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
      <MentorChat />
    </div>
  );
}

function Field({ label, value, onChange, placeholder, type = "text" }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string }) {
  return (
    <label className="block">
      <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</div>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
      />
    </label>
  );
}
