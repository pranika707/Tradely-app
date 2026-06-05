import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowDown, ArrowUp, Pause, Play, RotateCcw, Sparkles, TrendingDown, TrendingUp, Wallet, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";

export const Route = createFileRoute("/simulator")({
  head: () => ({
    meta: [
      { title: "Paper-trading simulator — Tradely" },
      { name: "description", content: "Practice trading with fake money. Zero risk, beginner-friendly chart and AI feedback." },
    ],
  }),
  component: Simulator,
});

type Candle = { o: number; h: number; l: number; c: number };
type Position = { side: "long" | "short"; entry: number; size: number; openedAt: number };
type ClosedTrade = Position & { exit: number; pnl: number; closedAt: number };

const START_BALANCE = 10_000;
const START_PRICE = 100;
const MAX_CANDLES = 60;

function genCandle(prev: number): Candle {
  // Gentle random walk with occasional momentum
  const drift = (Math.random() - 0.5) * 1.4;
  const o = prev;
  const c = Math.max(1, +(o + drift).toFixed(2));
  const hi = Math.max(o, c) + Math.random() * 0.8;
  const lo = Math.min(o, c) - Math.random() * 0.8;
  return { o, c, h: +hi.toFixed(2), l: +Math.max(0.5, lo).toFixed(2) };
}

function Simulator() {
  const [candles, setCandles] = useState<Candle[]>(() => {
    const arr: Candle[] = [];
    let p = START_PRICE;
    for (let i = 0; i < 30; i++) {
      const c = genCandle(p);
      arr.push(c);
      p = c.c;
    }
    return arr;
  });
  const [running, setRunning] = useState(true);
  const [balance, setBalance] = useState(START_BALANCE);
  const [position, setPosition] = useState<Position | null>(null);
  const [history, setHistory] = useState<ClosedTrade[]>([]);
  const [tradeSize, setTradeSize] = useState(10); // shares per trade
  const tickRef = useRef<number | null>(null);

  const price = candles[candles.length - 1].c;

  useEffect(() => {
    if (!running) return;
    tickRef.current = window.setInterval(() => {
      setCandles((prev) => {
        const next = [...prev, genCandle(prev[prev.length - 1].c)];
        if (next.length > MAX_CANDLES) next.shift();
        return next;
      });
    }, 900);
    return () => {
      if (tickRef.current) window.clearInterval(tickRef.current);
    };
  }, [running]);

  const unrealized = useMemo(() => {
    if (!position) return 0;
    const diff = position.side === "long" ? price - position.entry : position.entry - price;
    return +(diff * position.size).toFixed(2);
  }, [position, price]);

  const equity = +(balance + unrealized).toFixed(2);
  const totalPnl = +(equity - START_BALANCE).toFixed(2);

  function openPosition(side: "long" | "short") {
    if (position) return;
    const cost = price * tradeSize;
    if (cost > balance) return;
    setPosition({ side, entry: price, size: tradeSize, openedAt: Date.now() });
  }

  function closePosition() {
    if (!position) return;
    const diff = position.side === "long" ? price - position.entry : position.entry - price;
    const pnl = +(diff * position.size).toFixed(2);
    setBalance((b) => +(b + pnl).toFixed(2));
    setHistory((h) => [{ ...position, exit: price, pnl, closedAt: Date.now() }, ...h].slice(0, 20));
    setPosition(null);
  }

  function reset() {
    setBalance(START_BALANCE);
    setPosition(null);
    setHistory([]);
    setCandles(() => {
      const arr: Candle[] = [];
      let p = START_PRICE;
      for (let i = 0; i < 30; i++) {
        const c = genCandle(p);
        arr.push(c);
        p = c.c;
      }
      return arr;
    });
  }

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <div className="absolute inset-x-0 top-0 -z-10 h-[300px] aurora-bg opacity-40" />

      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 pt-6">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <div className="grid h-8 w-8 place-items-center rounded-xl bg-gradient-to-br from-primary to-accent shadow-[var(--shadow-glow)]">
            <Sparkles className="h-4 w-4 text-primary-foreground" />
          </div>
          Tradely
        </Link>
        <div className="flex items-center gap-2">
          <Link to="/learn">
            <Button variant="ghost" size="sm" className="rounded-full">Lessons</Button>
          </Link>
          <ThemeToggle />
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 pb-24 pt-8">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Paper Trading</p>
            <h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">Practice — risk free 🧪</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Fake money. Real reflexes. Try a long or short and feel how price moves against you.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="rounded-full" onClick={() => setRunning((r) => !r)}>
              {running ? <><Pause className="mr-1 h-4 w-4" /> Pause</> : <><Play className="mr-1 h-4 w-4" /> Play</>}
            </Button>
            <Button variant="ghost" size="sm" className="rounded-full" onClick={reset}>
              <RotateCcw className="mr-1 h-4 w-4" /> Reset
            </Button>
          </div>
        </div>

        {/* Stats row */}
        <div className="mt-6 grid gap-3 sm:grid-cols-4">
          <Stat label="Price" value={`$${price.toFixed(2)}`} icon={<TrendingUp className="h-4 w-4 text-primary" />} />
          <Stat label="Cash" value={`$${balance.toFixed(2)}`} icon={<Wallet className="h-4 w-4 text-accent" />} />
          <Stat
            label="Equity"
            value={`$${equity.toFixed(2)}`}
            icon={<Zap className="h-4 w-4 text-primary" />}
          />
          <Stat
            label="Total P&L"
            value={`${totalPnl >= 0 ? "+" : ""}$${totalPnl.toFixed(2)}`}
            tone={totalPnl >= 0 ? "good" : "bad"}
            icon={totalPnl >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
          />
        </div>

        {/* Chart + Controls */}
        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="glass rounded-3xl p-4 sm:p-6">
            <Chart candles={candles} position={position} />
          </div>

          <div className="glass rounded-3xl p-6">
            <div className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Trade</div>

            <div className="mt-4">
              <label className="text-xs text-muted-foreground">Size (shares)</label>
              <div className="mt-1 flex items-center gap-2">
                {[5, 10, 25, 50].map((s) => (
                  <button
                    key={s}
                    onClick={() => setTradeSize(s)}
                    className={`flex-1 rounded-xl border px-2 py-2 text-sm font-medium transition ${
                      tradeSize === s
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border hover:bg-muted/50"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
              <div className="mt-2 text-xs text-muted-foreground">
                Cost: ${(price * tradeSize).toFixed(2)}
              </div>
            </div>

            {!position ? (
              <div className="mt-5 grid grid-cols-2 gap-2">
                <Button
                  onClick={() => openPosition("long")}
                  className="rounded-2xl bg-success py-6 text-success-foreground hover:opacity-90"
                >
                  <ArrowUp className="mr-1 h-4 w-4" /> Buy / Long
                </Button>
                <Button
                  onClick={() => openPosition("short")}
                  className="rounded-2xl bg-destructive py-6 text-destructive-foreground hover:opacity-90"
                >
                  <ArrowDown className="mr-1 h-4 w-4" /> Sell / Short
                </Button>
              </div>
            ) : (
              <div className="mt-5 rounded-2xl border border-border bg-card p-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">
                    {position.side === "long" ? "🟢 Long" : "🔴 Short"} × {position.size}
                  </span>
                  <span className="text-muted-foreground">@ ${position.entry.toFixed(2)}</span>
                </div>
                <div className={`mt-2 text-2xl font-bold ${unrealized >= 0 ? "text-success" : "text-destructive"}`}>
                  {unrealized >= 0 ? "+" : ""}${unrealized.toFixed(2)}
                </div>
                <div className="text-xs text-muted-foreground">Unrealized P&L</div>
                <Button onClick={closePosition} className="mt-4 w-full rounded-xl" variant="outline">
                  Close position
                </Button>
              </div>
            )}

            <div className="mt-5 rounded-2xl bg-muted/40 p-3 text-xs text-muted-foreground">
              💡 Tip: <span className="text-foreground/80">going <b>long</b> profits when price goes up. Going <b>short</b> profits when price goes down.</span>
            </div>
          </div>
        </div>

        {/* History */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold">Trade history</h2>
          {history.length === 0 ? (
            <p className="mt-2 text-sm text-muted-foreground">No closed trades yet — open one above to see it here.</p>
          ) : (
            <div className="mt-3 overflow-hidden rounded-2xl border border-border">
              <table className="w-full text-sm">
                <thead className="bg-muted/40 text-xs uppercase tracking-wider text-muted-foreground">
                  <tr>
                    <th className="px-4 py-2 text-left">Side</th>
                    <th className="px-4 py-2 text-right">Size</th>
                    <th className="px-4 py-2 text-right">Entry</th>
                    <th className="px-4 py-2 text-right">Exit</th>
                    <th className="px-4 py-2 text-right">P&L</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((t, i) => (
                    <tr key={i} className="border-t border-border">
                      <td className="px-4 py-2">{t.side === "long" ? "🟢 Long" : "🔴 Short"}</td>
                      <td className="px-4 py-2 text-right">{t.size}</td>
                      <td className="px-4 py-2 text-right">${t.entry.toFixed(2)}</td>
                      <td className="px-4 py-2 text-right">${t.exit.toFixed(2)}</td>
                      <td className={`px-4 py-2 text-right font-semibold ${t.pnl >= 0 ? "text-success" : "text-destructive"}`}>
                        {t.pnl >= 0 ? "+" : ""}${t.pnl.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function Stat({
  label,
  value,
  icon,
  tone,
}: {
  label: string;
  value: string;
  icon?: React.ReactNode;
  tone?: "good" | "bad";
}) {
  const color = tone === "good" ? "text-success" : tone === "bad" ? "text-destructive" : "text-foreground";
  return (
    <div className="glass rounded-2xl p-4">
      <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {icon}
        {label}
      </div>
      <div className={`mt-1 text-2xl font-bold ${color}`}>{value}</div>
    </div>
  );
}

function Chart({ candles, position }: { candles: Candle[]; position: Position | null }) {
  const W = 760;
  const H = 320;
  const pad = 24;

  const min = Math.min(...candles.map((c) => c.l));
  const max = Math.max(...candles.map((c) => c.h));
  const range = max - min || 1;

  const cw = (W - pad * 2) / candles.length;
  const y = (v: number) => pad + (1 - (v - min) / range) * (H - pad * 2);

  const entryY = position ? y(position.entry) : null;

  return (
    <div className="relative w-full overflow-hidden">
      <svg viewBox={`0 0 ${W} ${H}`} className="h-[320px] w-full" preserveAspectRatio="none">
        {/* grid */}
        {[0.25, 0.5, 0.75].map((g) => (
          <line
            key={g}
            x1={pad}
            x2={W - pad}
            y1={pad + g * (H - pad * 2)}
            y2={pad + g * (H - pad * 2)}
            stroke="currentColor"
            strokeOpacity="0.08"
            strokeDasharray="3 4"
          />
        ))}

        {/* entry line */}
        {entryY !== null && position && (
          <g>
            <line
              x1={pad}
              x2={W - pad}
              y1={entryY}
              y2={entryY}
              stroke={position.side === "long" ? "oklch(0.72 0.17 155)" : "oklch(0.62 0.22 25)"}
              strokeWidth="1.5"
              strokeDasharray="5 5"
            />
            <text
              x={W - pad - 4}
              y={entryY - 6}
              textAnchor="end"
              fontSize="11"
              fill={position.side === "long" ? "oklch(0.72 0.17 155)" : "oklch(0.62 0.22 25)"}
            >
              Entry ${position.entry.toFixed(2)}
            </text>
          </g>
        )}

        {/* candles */}
        {candles.map((c, i) => {
          const x = pad + i * cw + cw / 2;
          const isUp = c.c >= c.o;
          const color = isUp ? "oklch(0.72 0.17 155)" : "oklch(0.62 0.22 25)";
          const bodyTop = y(Math.max(c.o, c.c));
          const bodyBot = y(Math.min(c.o, c.c));
          const bodyH = Math.max(1, bodyBot - bodyTop);
          const bw = Math.max(2, cw * 0.6);
          return (
            <g key={i}>
              <line x1={x} x2={x} y1={y(c.h)} y2={y(c.l)} stroke={color} strokeWidth="1" />
              <rect x={x - bw / 2} y={bodyTop} width={bw} height={bodyH} fill={color} rx="1" />
            </g>
          );
        })}
      </svg>
    </div>
  );
}
