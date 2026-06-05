import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, Play, Pause, RotateCcw, FastForward, Rewind, Film, TrendingUp, TrendingDown, Activity } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { MentorChat } from "@/components/MentorChat";

export const Route = createFileRoute("/replay")({
  head: () => ({
    meta: [
      { title: "Market replay — Tradely" },
      { name: "description", content: "Step through a historical-style chart bar by bar and practice reading price action." },
    ],
  }),
  component: ReplayPage,
});

type Candle = { o: number; h: number; l: number; c: number };

function generateSeries(seed: number, count = 200): Candle[] {
  let x = seed % 1000;
  const rand = () => {
    x = (x * 9301 + 49297) % 233280;
    return x / 233280;
  };
  let price = 100;
  const out: Candle[] = [];
  let drift = 0.05;
  for (let i = 0; i < count; i++) {
    if (i % 40 === 0) drift = (rand() - 0.5) * 0.4;
    const o = price;
    const change = (rand() - 0.5) * 2 + drift;
    const c = Math.max(1, o + change);
    const h = Math.max(o, c) + rand() * 1.2;
    const l = Math.min(o, c) - rand() * 1.2;
    out.push({ o, h, l, c });
    price = c;
  }
  return out;
}

function ReplayPage() {
  const [seed, setSeed] = useState(42);
  const data = useMemo(() => generateSeries(seed), [seed]);
  const [idx, setIdx] = useState(20);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(500);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    if (!playing) return;
    timer.current = window.setInterval(() => {
      setIdx((i) => {
        if (i >= data.length - 1) {
          setPlaying(false);
          return i;
        }
        return i + 1;
      });
    }, speed);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [playing, speed, data.length]);

  const visible = data.slice(Math.max(0, idx - 60), idx + 1);
  const high = Math.max(...visible.map((c) => c.h));
  const low = Math.min(...visible.map((c) => c.l));
  const range = high - low || 1;
  const W = 760;
  const H = 380;
  const cw = W / Math.max(visible.length, 1);

  function y(p: number) {
    return ((high - p) / range) * (H - 20) + 10;
  }

  // Stats / context for description
  const current = data[idx];
  const prev = data[Math.max(0, idx - 1)];
  const change = current.c - prev.c;
  const pctChange = (change / prev.c) * 100;
  const recent20 = data.slice(Math.max(0, idx - 19), idx + 1);
  const trendStart = recent20[0]?.c ?? current.c;
  const trendDelta = ((current.c - trendStart) / trendStart) * 100;
  const trendLabel =
    trendDelta > 1.5 ? "Uptrend" : trendDelta < -1.5 ? "Downtrend" : "Sideways / Range";
  const TrendIcon = trendDelta > 1.5 ? TrendingUp : trendDelta < -1.5 ? TrendingDown : Activity;
  const trendColor =
    trendDelta > 1.5 ? "text-emerald-500" : trendDelta < -1.5 ? "text-rose-500" : "text-amber-500";

  // Support / resistance zones from visible window
  const sortedHighs = [...visible].sort((a, b) => b.h - a.h).slice(0, 3);
  const sortedLows = [...visible].sort((a, b) => a.l - b.l).slice(0, 3);
  const resistance = sortedHighs.reduce((a, c) => a + c.h, 0) / sortedHighs.length;
  const support = sortedLows.reduce((a, c) => a + c.l, 0) / sortedLows.length;

  // SMA(20) overlay
  const sma: { x: number; y: number }[] = [];
  visible.forEach((_, i) => {
    if (i < 9) return;
    const slice = visible.slice(Math.max(0, i - 19), i + 1);
    const avg = slice.reduce((a, c) => a + c.c, 0) / slice.length;
    sma.push({ x: i * cw + cw / 2, y: y(avg) });
  });
  const smaPath = sma.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <div className="absolute inset-x-0 top-0 -z-10 h-[300px] aurora-bg opacity-30" />
      <header className="mx-auto flex max-w-5xl items-center justify-between px-6 pt-6">
        <Link to="/learn" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to dashboard
        </Link>
        <ThemeToggle />
      </header>

      <main className="mx-auto max-w-5xl px-6 pb-24 pt-10">
        <div className="mb-6 flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-[var(--shadow-glow)]">
            <Film className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold sm:text-4xl">Market replay</h1>
            <p className="text-sm text-muted-foreground">Step through a simulated chart bar by bar — train your eye to read price action in real time.</p>
          </div>
        </div>

        {/* What is this? */}
        <div className="mb-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Green candle</div>
            <p className="mt-1 text-sm text-foreground/80">Close &gt; Open — buyers won that bar.</p>
          </div>
          <div className="rounded-2xl border border-rose-500/30 bg-rose-500/5 p-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-rose-600 dark:text-rose-400">Red candle</div>
            <p className="mt-1 text-sm text-foreground/80">Close &lt; Open — sellers won that bar.</p>
          </div>
          <div className="rounded-2xl border border-sky-500/30 bg-sky-500/5 p-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-sky-600 dark:text-sky-400">Blue line · SMA(20)</div>
            <p className="mt-1 text-sm text-foreground/80">Average price of the last 20 bars — the trend's heartbeat.</p>
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-card p-4 sm:p-6">
          {/* Live readout */}
          <div className="mb-3 flex flex-wrap items-center justify-between gap-3 text-sm">
            <div className={`inline-flex items-center gap-2 font-semibold ${trendColor}`}>
              <TrendIcon className="h-4 w-4" /> {trendLabel}
              <span className="ml-2 text-xs text-muted-foreground">
                ({trendDelta >= 0 ? "+" : ""}{trendDelta.toFixed(2)}% over last 20 bars)
              </span>
            </div>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span>Price <strong className="text-foreground">{current.c.toFixed(2)}</strong></span>
              <span className={change >= 0 ? "text-emerald-500" : "text-rose-500"}>
                {change >= 0 ? "▲" : "▼"} {Math.abs(pctChange).toFixed(2)}%
              </span>
            </div>
          </div>

          <svg viewBox={`0 0 ${W} ${H}`} className="h-[380px] w-full">
            {/* Resistance zone */}
            <rect
              x={0}
              y={y(resistance) - 6}
              width={W}
              height={12}
              fill="rgb(244 63 94 / 0.12)"
              stroke="rgb(244 63 94 / 0.4)"
              strokeDasharray="3 3"
            />
            <text x={6} y={y(resistance) - 8} className="fill-rose-500" fontSize={10} fontWeight={600}>
              Resistance ≈ {resistance.toFixed(2)}
            </text>

            {/* Support zone */}
            <rect
              x={0}
              y={y(support) - 6}
              width={W}
              height={12}
              fill="rgb(16 185 129 / 0.12)"
              stroke="rgb(16 185 129 / 0.4)"
              strokeDasharray="3 3"
            />
            <text x={6} y={y(support) + 16} className="fill-emerald-500" fontSize={10} fontWeight={600}>
              Support ≈ {support.toFixed(2)}
            </text>

            {/* Candles */}
            {visible.map((c, i) => {
              const x = i * cw + cw / 2;
              const up = c.c >= c.o;
              const color = up ? "rgb(16 185 129)" : "rgb(244 63 94)";
              return (
                <g key={i}>
                  <line x1={x} x2={x} y1={y(c.h)} y2={y(c.l)} stroke={color} strokeWidth={1} />
                  <rect
                    x={x - cw * 0.35}
                    y={y(Math.max(c.o, c.c))}
                    width={cw * 0.7}
                    height={Math.max(1, Math.abs(y(c.o) - y(c.c)))}
                    fill={color}
                    rx={1}
                  />
                </g>
              );
            })}

            {/* SMA(20) line */}
            {smaPath && (
              <path d={smaPath} fill="none" stroke="rgb(56 189 248)" strokeWidth={1.8} strokeLinejoin="round" />
            )}
          </svg>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" className="rounded-full" onClick={() => setIdx((i) => Math.max(0, i - 1))}>
                <Rewind className="h-4 w-4" />
              </Button>
              <Button
                onClick={() => setPlaying((p) => !p)}
                className="rounded-full bg-foreground text-background hover:bg-foreground/90"
              >
                {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                <span className="ml-1">{playing ? "Pause" : "Play"}</span>
              </Button>
              <Button variant="outline" size="icon" className="rounded-full" onClick={() => setIdx((i) => Math.min(data.length - 1, i + 1))}>
                <FastForward className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full" onClick={() => { setIdx(20); setSeed(Math.floor(Math.random() * 10000)); }}>
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="text-muted-foreground">Speed</span>
              <input
                type="range"
                min={100}
                max={1200}
                step={50}
                value={1300 - speed}
                onChange={(e) => setSpeed(1300 - Number(e.target.value))}
              />
              <span className="text-muted-foreground">Bar {idx + 1} / {data.length}</span>
            </div>
          </div>
        </div>

        {/* What you're looking at */}
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <div className="rounded-3xl border border-border bg-card p-6">
            <h2 className="text-lg font-bold">What you're looking at</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Each vertical shape is a <strong className="text-foreground">candlestick</strong> — one slice of time
              showing the open, close, high, and low. <span className="text-emerald-500 font-semibold">Green</span> bars
              closed above where they opened; <span className="text-rose-500 font-semibold">red</span> bars closed below.
              The dashed <span className="text-rose-500 font-semibold">red band</span> marks recent
              <em> resistance</em> — where sellers have shown up before. The <span className="text-emerald-500 font-semibold">green band</span> marks
              <em> support</em>. The <span className="text-sky-500 font-semibold">blue line</span> is a
              20-bar moving average — a smooth view of the underlying trend.
            </p>
          </div>
          <div className="rounded-3xl border border-border bg-card p-6">
            <h2 className="text-lg font-bold">How to practice with it</h2>
            <ol className="mt-2 space-y-2 text-sm leading-relaxed text-muted-foreground">
              <li><strong className="text-foreground">1.</strong> Pause the chart. Look at the last 5 candles + the moving average.</li>
              <li><strong className="text-foreground">2.</strong> Out loud, predict: up, down, or chop next?</li>
              <li><strong className="text-foreground">3.</strong> Press the forward arrow one bar. Were you right?</li>
              <li><strong className="text-foreground">4.</strong> Note what surprised you. Reset with a new seed and repeat.</li>
            </ol>
            <p className="mt-3 text-xs text-muted-foreground">
              Five focused minutes a day for two weeks beats hours of passive reading. Pattern recognition is a muscle.
            </p>
          </div>
        </div>
      </main>
      <MentorChat />
    </div>
  );
}
