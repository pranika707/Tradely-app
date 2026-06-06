// Annotated, learnable candlestick visual used behind the hero.
// Shows a clean uptrend → pullback → continuation with one fully
// labelled candle so even a first-time viewer learns something
// from the background alone.

const candles = [
  { o: 60, c: 48, h: 44, l: 66 }, // bull
  { o: 50, c: 38, h: 34, l: 54 }, // bull
  { o: 40, c: 46, h: 36, l: 50 }, // bear
  { o: 46, c: 30, h: 26, l: 50 }, // bull
  { o: 32, c: 24, h: 20, l: 36 }, // bull
  { o: 26, c: 34, h: 22, l: 40 }, // bear (pullback)
  { o: 34, c: 40, h: 30, l: 44 }, // bear
  { o: 40, c: 28, h: 22, l: 44 }, // bull
  { o: 30, c: 18, h: 14, l: 34 }, // bull
  { o: 20, c: 26, h: 16, l: 32 }, // bear
  { o: 26, c: 14, h: 10, l: 30 }, // bull
  { o: 16, c: 8,  h: 4,  l: 22 }, // bull (breakout)
];

const STEP = 56;
const X0 = 60;
const BODY_W = 28;

function candleX(i: number) {
  return X0 + i * STEP;
}

export function CandlestickBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 aurora-bg opacity-80" />
      <svg
        viewBox="0 0 800 400"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full opacity-60 dark:opacity-45"
        aria-hidden
      >
        <defs>
          <linearGradient id="bull" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.78 0.18 155)" />
            <stop offset="100%" stopColor="oklch(0.6 0.18 160)" />
          </linearGradient>
          <linearGradient id="bear" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.7 0.2 20)" />
            <stop offset="100%" stopColor="oklch(0.55 0.22 25)" />
          </linearGradient>
          <pattern id="grid" width="56" height="40" patternUnits="userSpaceOnUse">
            <path d="M 56 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.15" />
          </pattern>
        </defs>

        <rect width="800" height="400" fill="url(#grid)" className="text-foreground" />

        {/* Trend line connecting closes (subtle) */}
        <polyline
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.25"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          className="text-foreground"
          points={candles.map((c, i) => `${candleX(i) + BODY_W / 2},${c.c}`).join(" ")}
        />

        {candles.map((c, i) => {
          const x = candleX(i);
          const bullish = c.c < c.o; // smaller y = higher price
          const top = Math.min(c.o, c.c);
          const bodyH = Math.abs(c.o - c.c);
          const fill = bullish ? "url(#bull)" : "url(#bear)";
          const stroke = bullish ? "oklch(0.7 0.18 155)" : "oklch(0.65 0.2 25)";
          return (
            <g
              key={i}
              style={{
                animation: `fadeUp 0.6s ease-out ${i * 0.08}s both`,
              }}
            >
              <line x1={x + BODY_W / 2} x2={x + BODY_W / 2} y1={c.h} y2={c.l} stroke={stroke} strokeWidth="2" />
              <rect x={x} y={top} width={BODY_W} height={Math.max(bodyH, 3)} rx="3" fill={fill} />
            </g>
          );
        })}

        {/* Annotations on one teaching candle (index 8) */}
        {(() => {
          const i = 8;
          const c = candles[i];
          const x = candleX(i);
          const cx = x + BODY_W / 2;
          const labelColor = "currentColor";
          return (
            <g className="text-foreground" style={{ animation: "fadeUp 0.6s ease-out 1.2s both" }}>
              {/* Wick high */}
              <line x1={cx} x2={cx - 70} y1={c.h} y2={c.h - 20} stroke={labelColor} strokeOpacity="0.5" />
              <text x={cx - 76} y={c.h - 22} textAnchor="end" fontSize="11" fill={labelColor} opacity="0.75">
                High (wick)
              </text>

              {/* Open */}
              <line x1={x} x2={x - 50} y1={c.o} y2={c.o} stroke={labelColor} strokeOpacity="0.5" />
              <text x={x - 54} y={c.o + 3} textAnchor="end" fontSize="11" fill={labelColor} opacity="0.75">
                Open
              </text>

              {/* Close */}
              <line x1={x + BODY_W} x2={x + BODY_W + 50} y1={c.c} y2={c.c} stroke={labelColor} strokeOpacity="0.5" />
              <text x={x + BODY_W + 54} y={c.c + 3} fontSize="11" fill={labelColor} opacity="0.75">
                Close
              </text>

              {/* Wick low */}
              <line x1={cx} x2={cx + 70} y1={c.l} y2={c.l + 22} stroke={labelColor} strokeOpacity="0.5" />
              <text x={cx + 76} y={c.l + 26} fontSize="11" fill={labelColor} opacity="0.75">
                Low (wick)
              </text>
            </g>
          );
        })()}

        {/* Trend label */}
        <g className="text-foreground" style={{ animation: "fadeUp 0.6s ease-out 1.4s both" }}>
          <text x={candleX(11) + 40} y={20} fontSize="11" fill="currentColor" opacity="0.7">
            Higher highs → uptrend
          </text>
        </g>
      </svg>

      <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-primary/30 blur-3xl animate-[float_10s_ease-in-out_infinite]" />
      <div className="absolute -bottom-40 -right-20 h-[28rem] w-[28rem] rounded-full bg-accent/30 blur-3xl animate-[float_14s_ease-in-out_infinite]" />
    </div>
  );
}
