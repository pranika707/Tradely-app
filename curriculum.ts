export type LessonBlock =
  | { type: "text"; title?: string; body: string }
  | { type: "callout"; tone: "tip" | "warn" | "info"; body: string }
  | { type: "interactive"; widget: "candle-builder" | "emotional-cycle" | "price-flow" | "liquidity-zones" | "market-structure" | "risk-pyramid" | "r-multiple" | "drawdown-math" | "fear-greed-meter" | "mindset-loop" }
  | {
      type: "quiz";
      question: string;
      options: string[];
      answerIndex: number;
      explanation: string;
    };


export interface Lesson {
  id: string;
  title: string;
  emoji: string;
  duration: number;
  xp: number;
  blocks: LessonBlock[];
}

export interface Module {
  id: string;
  title: string;
  subtitle: string;
  emoji: string;
  color: string;
  lessons: Lesson[];
}

export const curriculum: Module[] = [
  {
    id: "basics",
    title: "Trading Basics",
    subtitle: "What markets are and how prices actually move",
    emoji: "🌱",
    color: "from-emerald-400 to-teal-500",
    lessons: [
      {
        id: "what-is-trading",
        title: "What is trading, really?",
        emoji: "💱",
        duration: 5,
        xp: 25,
        blocks: [
          {
            type: "text",
            title: "Trading in one sentence",
            body: "Trading is buying something at one price and (hopefully) selling it later at a different price. That 'something' can be a stock (a tiny slice of a company), a currency (US dollars for euros), a commodity (gold, oil), or a crypto coin. The goal isn't magic — it's to end up with more money than you started with, ideally without losing your mind in the process.",
          },
          {
            type: "text",
            title: "Investing vs trading — what's the difference?",
            body: "Investors typically hold for years, betting that great companies grow over time. Traders try to profit from shorter price swings — days, hours, or even minutes. Neither is 'better.' They're different jobs with different skills. This course focuses on trading, but the discipline you'll learn helps both.",
          },
          {
            type: "callout",
            tone: "info",
            body: "Think of a market as a giant 24/7 farmers market — except instead of tomatoes, people are trading shares of Apple, barrels of oil, and digital coins. Prices change every second as buyers and sellers haggle.",
          },
          {
            type: "text",
            title: "Why do prices move?",
            body: "Prices move because of supply and demand. When more people want to buy than to sell, sellers can raise their asking price — and the market price drifts up. When more want to sell, buyers can demand discounts — price drifts down. Everything else (news, earnings, tweets, rumors) is just stuff that changes how many people want to buy or sell.",
          },
          {
            type: "quiz",
            question: "Why does a stock's price usually go up?",
            options: [
              "Because the company prints more shares",
              "Because more people want to buy than sell at the current price",
              "Because the news is always positive",
              "Because traders vote on a new price",
            ],
            answerIndex: 1,
            explanation:
              "Prices reflect supply and demand. More buyers than sellers at the current price = price drifts up until enough sellers show up to match.",
          },
        ],
      },
      {
        id: "long-vs-short",
        title: "Going long vs going short",
        emoji: "↕️",
        duration: 5,
        xp: 25,
        blocks: [
          {
            type: "text",
            title: "Going long = betting it goes up",
            body: "When you 'go long' you buy first and sell later. If price rises between those two moments, you pocket the difference. This is what most people picture when they think of trading.",
          },
          {
            type: "text",
            title: "Going short = betting it goes down",
            body: "Shorting feels weird at first: you borrow shares, sell them now at today's price, and buy them back later — hopefully cheaper. The difference is your profit. It lets you make money even when markets fall, but losses can be bigger if you're wrong.",
          },
          {
            type: "callout",
            tone: "warn",
            body: "Shorting carries more risk than going long. A stock you buy at $100 can only fall to $0 (–100%). But a stock you short at $100 could in theory rise to $500 (–400%). Always use a stop.",
          },
          {
            type: "quiz",
            question: "You think a stock will fall. Which trade fits?",
            options: ["Go long", "Go short", "Hold cash forever", "Buy more"],
            answerIndex: 1,
            explanation: "Shorting profits when price drops. Going long profits when price rises.",
          },
        ],
      },
      {
        id: "orders",
        title: "Market, limit & stop orders",
        emoji: "🧾",
        duration: 6,
        xp: 30,
        blocks: [
          {
            type: "text",
            title: "Market order — 'just fill me, now'",
            body: "A market order says 'I don't care about exact price, get me in immediately.' Fast, but you might pay a slightly worse price in fast-moving markets (that gap is called slippage).",
          },
          {
            type: "text",
            title: "Limit order — 'only at my price or better'",
            body: "A limit order sets a maximum you'll pay (or minimum you'll accept). You might not get filled at all — but you control the price. Great for patient entries.",
          },
          {
            type: "text",
            title: "Stop order — 'protect me if I'm wrong'",
            body: "A stop becomes a market order once price hits a trigger. Used as a stop-loss to cap how much you can lose on a trade. Setting one before you enter is the single highest-leverage habit a beginner can build.",
          },
          {
            type: "callout",
            tone: "tip",
            body: "Beginner default: limit order to enter, stop order to exit if wrong. Avoid market orders in thin or volatile markets.",
          },
          {
            type: "quiz",
            question: "Which order guarantees the price but not that you'll be filled?",
            options: ["Market order", "Limit order", "Stop order", "All-or-nothing telepathy"],
            answerIndex: 1,
            explanation:
              "Limit orders cap the price you'll accept, but the market might never reach your level.",
          },
        ],
      },
      {
        id: "market-players",
        title: "Who's on the other side?",
        emoji: "👥",
        duration: 4,
        xp: 20,
        blocks: [
          {
            type: "text",
            body: "Every time you click Buy, somebody is selling to you. That somebody might be a retail trader like you, a hedge fund with PhDs and supercomputers, or an automated market-maker bot. The market doesn't owe you a profit — knowing this keeps you humble and disciplined.",
          },
          {
            type: "callout",
            tone: "info",
            body: "Edge comes from preparation, patience, and risk control — not from being smarter than the room. You can't be smarter than the room. Just don't blow up.",
          },
          {
            type: "quiz",
            question: "When you buy a stock, who is on the other side?",
            options: [
              "Nobody — the exchange creates shares",
              "Another participant selling at that moment",
              "The company itself",
              "A government regulator",
            ],
            answerIndex: 1,
            explanation: "Every trade has a buyer and a seller. The exchange just matches them.",
          },
        ],
      },
      {

        id: "price-drivers",
        title: "What actually moves price",
        emoji: "⚡",
        duration: 7,
        xp: 35,
        blocks: [
          {
            type: "text",
            title: "The four big drivers",
            body: "Beneath every chart squiggle are four forces working in real time: (1) Supply & demand — who wants in, who wants out, and how badly. (2) News & catalysts — earnings, economic data (CPI, jobs, rates), geopolitical events, regulator decisions. (3) Liquidity — how easily big orders can be filled without moving price; thin liquidity = wild swings. (4) Sentiment & narrative — the story the crowd believes right now (AI hype, recession fear, 'soft landing'). Most moves are a mix of all four.",
          },
          { type: "interactive", widget: "price-flow" },
          {
            type: "text",
            title: "How to analyse a move",
            body: "When price jumps, ask in this order: 1) Is there fresh news? Check the headline. 2) Is volume backing the move? A spike with no volume = suspicious. 3) Where is price relative to structure (trend, support, resistance)? 4) Is the broader market doing the same thing (correlated risk-on / risk-off)? If you can answer those, you understand the move better than 90% of retail traders.",
          },
          {
            type: "callout",
            tone: "tip",
            body: "Build a habit: every morning glance at an economic calendar. Knowing CPI prints today at 8:30am explains why your chart suddenly looks crazy at 8:31am.",
          },
          {
            type: "quiz",
            question: "A big green candle appears but volume is tiny. The move is…",
            options: ["Definitely real, jump in", "Probably weak — low conviction", "A bug in the chart", "Always a top"],
            answerIndex: 1,
            explanation: "Low-volume moves often fade. Conviction = volume + structure + context.",
          },
        ],
      },
    ],
  },

  {
    id: "markets",
    title: "Types of Markets",
    subtitle: "Stocks, forex, crypto, commodities & more",
    emoji: "🌍",
    color: "from-cyan-400 to-blue-500",
    lessons: [
      {
        id: "stocks",
        title: "Stocks & ETFs",
        emoji: "🏢",
        duration: 5,
        xp: 25,
        blocks: [
          {
            type: "text",
            title: "Stocks = tiny slices of a company",
            body: "When you buy a share of Apple, you literally own a microscopic piece of Apple. If the business grows, your share is worth more. ETFs (Exchange-Traded Funds) bundle hundreds of stocks together so you can buy 'the whole S&P 500' in one click — instant diversification.",
          },
          {
            type: "callout",
            tone: "tip",
            body: "Hours: most stock exchanges open ~9:30am to 4pm local time on weekdays. The first and last hour are usually the most volatile (and most opportunity-rich).",
          },
          {
            type: "quiz",
            question: "An ETF is best described as…",
            options: ["A single company's stock", "A basket of many assets traded as one ticker", "A type of bond", "A government license"],
            answerIndex: 1,
            explanation: "ETFs bundle many holdings into one tradable ticker — easy diversification.",
          },
        ],
      },
      {
        id: "forex",
        title: "Forex (currencies)",
        emoji: "💱",
        duration: 5,
        xp: 25,
        blocks: [
          {
            type: "text",
            body: "Forex = trading one currency for another (EUR/USD, GBP/JPY…). It's the biggest market in the world by volume — trillions per day — and it runs 24 hours, 5 days a week. Moves tend to be small per day (cents on the dollar), so forex traders often use leverage to amplify both gains and losses.",
          },
          {
            type: "callout",
            tone: "warn",
            body: "Leverage is a double-edged sword. 50:1 leverage means a 2% move against you = 100% loss. Beginners: keep leverage low or off.",
          },
          {
            type: "quiz",
            question: "Forex markets typically run…",
            options: ["A few hours a day", "24/5 (closed weekends)", "Only when the US is open", "On a fixed daily schedule"],
            answerIndex: 1,
            explanation: "Forex trades around the clock as sessions hand off (Asia → Europe → US), but closes weekends.",
          },
        ],
      },
      {
        id: "crypto",
        title: "Crypto",
        emoji: "🪙",
        duration: 5,
        xp: 25,
        blocks: [
          {
            type: "text",
            body: "Crypto markets (Bitcoin, Ethereum, and thousands more) trade 24/7/365 with no closing bell. They're volatile, narrative-driven, and famously unforgiving for beginners using leverage. The same chart-reading skills work — but expect bigger swings, especially overnight.",
          },
          {
            type: "callout",
            tone: "warn",
            body: "Crypto can move 10–20% in a day on news or tweets. Smaller position size compensates for bigger moves.",
          },
          {
            type: "quiz",
            question: "A key difference of crypto vs stocks is…",
            options: ["It only trades weekdays", "It runs 24/7 with much higher volatility", "It has no charts", "It's regulated identically"],
            answerIndex: 1,
            explanation: "24/7 trading + high volatility = both more opportunity and more risk.",
          },
        ],
      },
      {
        id: "commodities-futures",
        title: "Commodities & futures",
        emoji: "🛢️",
        duration: 5,
        xp: 25,
        blocks: [
          {
            type: "text",
            body: "Commodities = raw stuff: oil, gold, wheat, natural gas. Most trade via 'futures' contracts — agreements to buy/sell at a set price on a future date. Useful for hedging real-world businesses (an airline locking in fuel costs) and for traders who like trending markets driven by macro forces.",
          },
          {
            type: "callout",
            tone: "info",
            body: "Gold often rises when investors are nervous; oil rises with growth/conflict. Commodities tell macro stories that stocks sometimes hide.",
          },
          {
            type: "quiz",
            question: "Futures contracts are agreements to…",
            options: ["Donate money", "Buy/sell at a set price on a future date", "Never close a trade", "Avoid all risk"],
            answerIndex: 1,
            explanation: "Futures lock in a price for a future delivery date — used for hedging and speculation.",
          },
        ],
      },
      {
        id: "indices",
        title: "Indices (S&P, Nasdaq, Dow)",
        emoji: "📊",
        duration: 4,
        xp: 20,
        blocks: [
          {
            type: "text",
            title: "An index = a basket score",
            body: "An index tracks a curated basket of stocks: the S&P 500 (500 biggest US companies), Nasdaq 100 (tech-heavy), Dow Jones (30 industrials). You can't buy 'the index' directly, but you can trade ETFs (SPY, QQQ, DIA) or index futures (ES, NQ, YM) that track them.",
          },
          {
            type: "callout",
            tone: "tip",
            body: "Indices are great for beginners: huge liquidity, less single-stock drama, and they reflect the broad market mood at a glance.",
          },
          {
            type: "quiz",
            question: "The Nasdaq 100 is most heavily weighted in…",
            options: ["Banks", "Tech & growth companies", "Oil producers", "Utilities"],
            answerIndex: 1,
            explanation: "Nasdaq 100 leans hard into tech — Apple, Microsoft, Nvidia, etc. — which is why it moves more on tech news.",
          },
        ],
      },
      {
        id: "options",
        title: "Options (the basics)",
        emoji: "🎟️",
        duration: 5,
        xp: 25,
        blocks: [
          {
            type: "text",
            title: "Calls and puts in one breath",
            body: "An option is a contract: you pay a small premium for the RIGHT (not the obligation) to buy (CALL) or sell (PUT) something at a set price by a set date. Calls profit if price rises; puts profit if it falls. Max loss = the premium you paid.",
          },
          {
            type: "callout",
            tone: "warn",
            body: "Options expire. Time literally bleeds value out of them every day (theta decay). They're powerful — and beginners blow up faster here than anywhere else. Learn stocks first.",
          },
          {
            type: "quiz",
            question: "A CALL option profits when the underlying…",
            options: ["Falls below the strike", "Rises above the strike before expiry", "Stays flat forever", "Pays a dividend"],
            answerIndex: 1,
            explanation: "Calls = right to buy at a strike. If price runs above the strike before expiry, the call gains value.",
          },
        ],
      },
      {
        id: "bull-bear-markets",
        title: "Bull, bear & sideways markets",
        emoji: "🐂",
        duration: 4,
        xp: 20,
        blocks: [
          {
            type: "text",
            body: "A BULL market is a sustained uptrend (think: 2020-2021 stocks). A BEAR market is a sustained downtrend, usually defined as a 20%+ drop from highs. A SIDEWAYS / range-bound market goes nowhere for weeks or months. Each demands a different playbook — trend-following in bulls, defensive shorts in bears, range fades when sideways.",
          },
          {
            type: "callout",
            tone: "info",
            body: "Most beginners learn in a bull market and think they're geniuses. The bear that follows is the real teacher.",
          },
          {
            type: "quiz",
            question: "A bear market is commonly defined as a drop of at least…",
            options: ["5% from highs", "10% from highs", "20% from highs", "50% from highs"],
            answerIndex: 2,
            explanation: "20%+ from peak = bear market by the textbook definition.",
          },
        ],
      },
    ],
  },


  {
    id: "candles",
    title: "Candlestick Mastery",
    subtitle: "Read every candle like a pro",
    emoji: "🕯️",
    color: "from-rose-400 to-orange-500",
    lessons: [
      {
        id: "anatomy",
        title: "Anatomy of a candle",
        emoji: "🕯️",
        duration: 5,
        xp: 25,
        blocks: [
          {
            type: "text",
            title: "A candle = one slice of time",
            body: "Each candlestick is a mini-movie of one chunk of time — could be 1 minute, 1 hour, or 1 day depending on your chart. It tells you four things: where price OPENED, where it CLOSED, the HIGHEST it touched, and the LOWEST.",
          },
          {
            type: "text",
            title: "Body and wicks",
            body: "The fat rectangle is the BODY (open to close). The thin lines sticking out are WICKS or SHADOWS (the highs and lows price touched but didn't hold). Green/white body = closed higher than it opened (buyers won). Red/black body = closed lower (sellers won).",
          },
          {
            type: "callout",
            tone: "tip",
            body: "Long body = strong conviction that period. Long wick = price tried to go somewhere and got rejected. Wicks are often more revealing than bodies.",
          },
          { type: "interactive", widget: "candle-builder" },
          {

            type: "quiz",
            question: "A long upper wick on a candle usually shows…",
            options: [
              "Buyers held control the whole period",
              "Price pushed up but sellers rejected it back down",
              "The market was closed",
              "A data error",
            ],
            answerIndex: 1,
            explanation:
              "Upper wicks = price tried higher and was pushed back. Often a sign of weakening buyers.",
          },
        ],
      },
      {
        id: "doji-hammer",
        title: "Doji, hammer & shooting star",
        emoji: "🔨",
        duration: 6,
        xp: 30,
        blocks: [
          {
            type: "text",
            title: "Doji — indecision",
            body: "When open and close are nearly equal, you get a tiny body with wicks on both sides. That's a doji. It means buyers and sellers fought to a draw — often a hint that the current trend is losing steam.",
          },
          {
            type: "text",
            title: "Hammer — buyers stepping in",
            body: "Small body at the top, long wick down. Sellers pushed price way down, but buyers slammed it back up by the close. After a downtrend, a hammer can signal a bounce.",
          },
          {
            type: "text",
            title: "Shooting star — sellers stepping in",
            body: "Mirror image: small body at the bottom, long wick up. Buyers pushed price way up, sellers crushed it back. After an uptrend, this often warns of a pullback.",
          },
          {
            type: "callout",
            tone: "warn",
            body: "One candle is a hint, not a guarantee. Always check the context — where in the trend is it happening?",
          },
          {
            type: "quiz",
            question: "A hammer after a long downtrend often hints at…",
            options: [
              "More aggressive selling",
              "A possible reversal up",
              "Nothing — it's random",
              "An exchange outage",
            ],
            answerIndex: 1,
            explanation:
              "A hammer = buyers defended the lows. After a downtrend, that's a clue selling pressure may be fading.",
          },
        ],
      },
      {
        id: "engulfing",
        title: "Engulfing patterns",
        emoji: "🌑",
        duration: 5,
        xp: 25,
        blocks: [
          {
            type: "text",
            title: "Bullish engulfing",
            body: "A small red candle followed by a big green candle whose body completely covers the red one. Translation: yesterday's sellers got steamrolled today. Often a reversal signal at the bottom of a move.",
          },
          {
            type: "text",
            title: "Bearish engulfing",
            body: "Opposite: small green, then big red that engulfs it. Buyers got steamrolled. Often a reversal at the top.",
          },
          {
            type: "callout",
            tone: "tip",
            body: "Engulfing patterns are most reliable at obvious turning points — like at a strong support or resistance level. In the middle of nowhere, they mean less.",
          },
          {
            type: "quiz",
            question: "A bullish engulfing candle is most meaningful when it appears…",
            options: [
              "In the middle of a sideways range",
              "After a sustained downtrend, near support",
              "Right after market open with low volume",
              "On a holiday",
            ],
            answerIndex: 1,
            explanation:
              "Context is everything. The same pattern in a noisy range means little; at a key level it can mark a real reversal.",
          },
        ],
      },
      {
        id: "morning-evening-star",
        title: "Morning star & evening star",
        emoji: "🌅",
        duration: 5,
        xp: 25,
        blocks: [
          {
            type: "text",
            title: "Morning star — bottom reversal",
            body: "Three candles: (1) a big red candle continuing the downtrend, (2) a small-bodied candle (often a doji) showing indecision, (3) a big green candle that closes deep into the first red one. Translation: sellers exhausted, buyers took over. Often marks a swing low.",
          },
          {
            type: "text",
            title: "Evening star — top reversal",
            body: "Mirror image at a high: big green, small indecision candle, then big red closing into the green. Often marks a swing high after a rally.",
          },
          {
            type: "callout",
            tone: "tip",
            body: "These 3-candle patterns are stronger than single candles because they show a transition over time, not a one-bar gut reaction.",
          },
          {
            type: "quiz",
            question: "A morning star is most powerful when it appears…",
            options: ["At all-time highs", "After a clear downtrend, near support", "On a Sunday", "In the middle of a range"],
            answerIndex: 1,
            explanation: "Context is everything. Morning stars near support, after a downtrend, are reliable bottom signals.",
          },
        ],
      },
      {
        id: "three-soldiers-crows",
        title: "Three white soldiers & three black crows",
        emoji: "⚔️",
        duration: 4,
        xp: 20,
        blocks: [
          {
            type: "text",
            body: "THREE WHITE SOLDIERS = three consecutive big green candles, each closing higher than the last, with small wicks. It screams 'buyers in full control.' Often confirms a fresh uptrend off a bottom. THREE BLACK CROWS = the bearish mirror: three big red candles closing lower — sellers have taken the wheel.",
          },
          {
            type: "callout",
            tone: "warn",
            body: "Don't chase the third candle. By then much of the move is done. Wait for a small pullback or a retest before entering.",
          },
          {
            type: "quiz",
            question: "Three white soldiers usually signal…",
            options: ["A failing rally", "Strong bullish momentum, often a trend start", "A bear-market bottom is far away", "Pure noise"],
            answerIndex: 1,
            explanation: "Three strong green closes in a row = real buying pressure — often the early phase of a new uptrend.",
          },
        ],
      },
      {
        id: "timeframes",
        title: "Picking the right timeframe",
        emoji: "⏱️",
        duration: 4,
        xp: 20,
        blocks: [
          {
            type: "text",
            body: "A 1-minute chart and a daily chart of the same asset can look like totally different stories. Day-traders live on minutes; swing-traders use hourly and daily; investors use weekly. Bigger timeframes are slower but more reliable. Smaller timeframes are noisier but offer more opportunities (and more chances to lose).",
          },
          {
            type: "callout",
            tone: "tip",
            body: "Multi-timeframe rule of thumb: use a higher timeframe to find the direction, a lower one to time the entry.",
          },
          {
            type: "quiz",
            question: "Which timeframe is generally LESS noisy and more reliable?",
            options: ["1 minute", "5 minutes", "1 hour", "1 day"],
            answerIndex: 3,
            explanation:
              "Daily candles compress more information and filter out short-term noise. They're slower but tend to be more trustworthy.",
          },
        ],
      },
    ],
  },

  {
    id: "charts",
    title: "Chart Reading",
    subtitle: "Trends, support & resistance",
    emoji: "📈",
    color: "from-sky-400 to-indigo-500",
    lessons: [
      {
        id: "market-structure",
        title: "Market structure (HH/HL/LH/LL)",
        emoji: "🏗️",
        duration: 7,
        xp: 35,
        blocks: [
          {
            type: "text",
            title: "The skeleton of every chart",
            body: "Forget indicators for a moment. Every chart, in every market, in every timeframe, is just a series of SWING HIGHS and SWING LOWS. Read those, and you read the chart. An uptrend = higher highs (HH) and higher lows (HL). A downtrend = lower highs (LH) and lower lows (LL). A range = highs and lows roughly even.",
          },
          { type: "interactive", widget: "market-structure" },
          {
            type: "text",
            title: "Break of structure (BOS)",
            body: "When an UPTREND makes a LOWER low for the first time in a while, structure has 'broken' — that's your first concrete clue the trend may be ending. Same in reverse for downtrends. BOS is the cleanest objective signal beginners can use to time exits and avoid holding losers into oblivion.",
          },
          {
            type: "callout",
            tone: "tip",
            body: "Pro habit: before drawing any indicator, label the last 3 swing highs and lows. If you can't tell the trend from those dots, you're trading noise.",
          },
          {
            type: "quiz",
            question: "An uptrend officially 'breaks structure' when…",
            options: ["A red candle appears", "Price makes a lower low for the first time", "Volume drops", "RSI says so"],
            answerIndex: 1,
            explanation: "A new lower low after a series of higher lows = the up-sequence has broken. That's BOS.",
          },
        ],
      },
      {

        id: "trends",
        title: "Spotting a trend",
        emoji: "📈",
        duration: 5,
        xp: 25,
        blocks: [
          {
            type: "text",
            title: "Higher highs, higher lows",
            body: "An uptrend is just a price that keeps making higher peaks AND higher dips. A downtrend is lower highs and lower lows. If neither is happening — it's ranging (sideways). 90% of chart reading is honestly answering: 'Which of these three is happening right now?'",
          },
          {
            type: "callout",
            tone: "tip",
            body: "Beginner mantra: 'The trend is your friend — until it bends.' Trade with the trend; don't fight it just because you have a feeling.",
          },
          {
            type: "quiz",
            question: "Which pattern describes an uptrend?",
            options: [
              "Lower highs and lower lows",
              "Higher highs and higher lows",
              "Flat highs and flat lows",
              "Random spikes everywhere",
            ],
            answerIndex: 1,
            explanation: "Uptrends step upward: each peak and dip is higher than the last.",
          },
        ],
      },
      {
        id: "support-resistance",
        title: "Support, resistance & liquidity",
        emoji: "🧱",
        duration: 9,
        xp: 45,
        blocks: [
          {
            type: "text",
            title: "Areas, not exact lines",
            body: "Support and resistance are ZONES, not pixel-perfect lines. Price doesn't know you drew a line at $100.00 — it reacts to a region (say $99.40 to $100.60) where buyers or sellers historically showed up. Draw them as boxes, not razor-thin lines, and you'll stop getting faked out by wicks.",
          },
          {
            type: "text",
            title: "Why these zones form",
            body: "Three reasons: (1) Memory — traders remember a level and react there. (2) Resting orders — limit orders pile up around round numbers ($100, $50,000). (3) Algorithms — bots are explicitly programmed to react at prior highs/lows. The zone is real because enough people behave as if it is.",
          },
          { type: "interactive", widget: "liquidity-zones" },
          {
            type: "text",
            title: "Liquidity zones — where the stops live",
            body: "Just above a clear resistance, retail traders pile in BUY STOPS (to enter on a breakout) and SHORT STOPS (to exit shorts). That pool of resting orders is called liquidity. Big players need liquidity to fill large orders — so price often gets PUSHED into those zones to trigger stops, then reverses. This is a 'liquidity grab' or 'stop hunt'.",
          },
          {
            type: "text",
            title: "Fake breakouts (and how to spot them)",
            body: "A fake breakout = price closes above resistance briefly, sucks in late buyers, then slams back below the level. Tells: (1) Breakout on weak volume. (2) A long upper wick on the breakout candle. (3) Price fails to make a new high after the break. (4) It happens right at a known liquidity zone. The cleanest trade is often FADING the fake — entering the OPPOSITE direction once price closes back inside the range.",
          },
          {
            type: "callout",
            tone: "tip",
            body: "Beginner rule: wait for a candle to CLOSE outside the zone, AND for price to retest the level as new support/resistance, before believing the breakout. Two confirmations beat one impulse.",
          },
          {
            type: "callout",
            tone: "warn",
            body: "Most stop-hunts target obvious levels: the prior day's high/low, weekly highs/lows, round numbers. If your stop is sitting right there with everyone else's, expect it to get tagged.",
          },
          {
            type: "quiz",
            question: "Price spikes 1% above resistance on a long upper wick, then closes back inside the range. This is most likely…",
            options: [
              "A confirmed breakout — buy aggressively",
              "A fake breakout / liquidity grab",
              "An exchange glitch",
              "Meaningless noise",
            ],
            answerIndex: 1,
            explanation: "A wick that pokes above resistance and instantly reverses = stops above got triggered, then sellers took over. Classic liquidity grab.",
          },
        ],
      },

      {
        id: "trendlines",
        title: "Drawing trendlines",
        emoji: "📐",
        duration: 5,
        xp: 25,
        blocks: [
          {
            type: "text",
            body: "A trendline is a straight line connecting at least two higher lows (uptrend line) or two lower highs (downtrend line). Each touch that holds adds credibility. When price finally breaks the line cleanly, the trend may be changing.",
          },
          {
            type: "callout",
            tone: "warn",
            body: "Don't force a trendline that doesn't fit. If you have to ignore three wicks to make it look clean, it's not a real trendline — it's a story you're telling yourself.",
          },
          {
            type: "quiz",
            question: "The minimum number of points needed to draw a meaningful trendline:",
            options: ["1", "2 (and ideally a 3rd touch to confirm)", "5", "10"],
            answerIndex: 1,
            explanation:
              "Two points define a line; a third touch that holds turns it from theory into evidence.",
          },
        ],
      },
      {
        id: "volume",
        title: "Reading volume",
        emoji: "📊",
        duration: 5,
        xp: 25,
        blocks: [
          {
            type: "text",
            title: "Volume = conviction",
            body: "Volume bars under the chart show how many shares (or contracts) changed hands. Big moves on HIGH volume = strong conviction. Big moves on LOW volume = often suspect, may not last.",
          },
          {
            type: "text",
            title: "Breakouts need volume",
            body: "When price breaks above resistance with a spike in volume, it's more likely to stick. A break on tiny volume often gets faded — price just sneaks back down. Always glance at volume before believing a breakout.",
          },
          {
            type: "quiz",
            question: "A breakout above resistance is MORE trustworthy when…",
            options: [
              "Volume is unusually high",
              "Volume is unusually low",
              "There's no volume data shown",
              "It happens on a holiday",
            ],
            answerIndex: 0,
            explanation:
              "High volume on the breakout = real participation, not just a few traders nudging price.",
          },
        ],
      },
    ],
  },

  {
    id: "risk",
    title: "Risk Management",
    subtitle: "Protect your capital first",
    emoji: "🛡️",
    color: "from-amber-400 to-orange-500",
    lessons: [
      {
        id: "position-size",
        title: "Position sizing 101",
        emoji: "⚖️",
        duration: 6,
        xp: 30,
        blocks: [
          {
            type: "text",
            title: "Risk a small slice",
            body: "Professional traders rarely risk more than 1–2% of their account on any single trade. If you have $1,000, that's $10–20 of risk per trade. Sounds boring? Yes. Sounds survivable? Also yes. You can be wrong 10 times in a row and still be in business.",
          },
          { type: "interactive", widget: "risk-pyramid" },
          {
            type: "text",
            title: "How to actually size it",
            body: "Position size = (Account × Risk %) ÷ (Entry − Stop). Example: $1,000 account, 1% risk = $10. If you enter at $50 and stop at $48, your risk per share is $2. So you buy $10 ÷ $2 = 5 shares. The position size adapts to where your stop is — not the other way around.",
          },
          {
            type: "callout",
            tone: "warn",
            body: "Blowing up an account is mostly about position size, not bad picks. Survive first. Profit second.",
          },
          {
            type: "quiz",
            question: "A common max risk per trade for beginners is…",
            options: ["10% of the account", "1–2% of the account", "50% of the account", "All in"],
            answerIndex: 1,
            explanation:
              "Risking 1–2% per trade lets you survive long losing streaks without going broke.",
          },
        ],
      },
      {
        id: "stop-loss",
        title: "Why every trade needs a stop",
        emoji: "🛑",
        duration: 5,
        xp: 25,
        blocks: [
          {
            type: "text",
            title: "Decide your exit before you enter",
            body: "A stop-loss is a pre-decided 'I'm wrong' price. You set it when you enter the trade — when you're calm, objective, and not in love with the position. No stop = unlimited downside and infinite anxiety.",
          },
          {
            type: "text",
            title: "Where to place it",
            body: "Place stops at a level that, if hit, genuinely invalidates your idea. Just below a clear support, or below a recent swing low. NEVER move a stop further away after you're in the trade. That's the #1 rookie mistake.",
          },
          {
            type: "callout",
            tone: "warn",
            body: "Hope is not a strategy. 'I'll just wait for it to come back' has destroyed more accounts than any market crash.",
          },
          {
            type: "quiz",
            question: "When should you set your stop-loss?",
            options: [
              "After the trade goes against you",
              "Before you enter the trade",
              "Only when news comes out",
              "Never, just watch the screen",
            ],
            answerIndex: 1,
            explanation:
              "Decide your exit BEFORE entry — that's when you're calmest and most objective.",
          },
        ],
      },
      {
        id: "risk-reward",
        title: "Risk : reward ratios",
        emoji: "⚖️",
        duration: 5,
        xp: 25,
        blocks: [
          {
            type: "text",
            body: "Risk:reward (R:R) is simply: how much you stand to lose vs how much you stand to gain. If you risk $1 to make $3, that's 1:3 R:R. With a 1:3 setup, you can be wrong more than half the time and still come out ahead.",
          },
          { type: "interactive", widget: "r-multiple" },
          {
            type: "callout",
            tone: "tip",
            body: "Beginner rule: don't take trades with a worse than 1:2 R:R. It's not about being right — it's about your winners outweighing your losers.",
          },
          {
            type: "quiz",
            question: "You risk $50 to potentially make $150. Your R:R is…",
            options: ["1:1", "1:2", "1:3", "3:1"],
            answerIndex: 2,
            explanation: "Risk $50 → reward $150 = 1 part risk to 3 parts reward = 1:3.",
          },
        ],
      },
      {
        id: "drawdowns",
        title: "Surviving drawdowns",
        emoji: "📉",
        duration: 4,
        xp: 20,
        blocks: [
          {
            type: "text",
            body: "A drawdown is the gap between your account's peak and its current value. They are NOT optional — every trader has them. The math is brutal: a 50% drawdown requires a 100% gain to recover. A 20% drawdown only needs 25% back. Keeping drawdowns small is more valuable than chasing huge wins.",
          },
          { type: "interactive", widget: "drawdown-math" },
          {
            type: "callout",
            tone: "info",
            body: "If you lose 10% in a week, the right move is usually to cut size in half — not double down to 'win it back.' Revenge trading is account-killer #2 (after no stops).",
          },
          {
            type: "quiz",
            question: "After a 50% drawdown, what gain is needed to break even?",
            options: ["50%", "75%", "100%", "150%"],
            answerIndex: 2,
            explanation:
              "If $100 falls to $50, you need a 100% gain on $50 to get back to $100. Avoid deep drawdowns at all costs.",
          },
        ],
      },
      {
        id: "leverage",
        title: "Leverage — the double-edged sword",
        emoji: "⚡",
        duration: 5,
        xp: 25,
        blocks: [
          {
            type: "text",
            title: "What leverage actually does",
            body: "Leverage lets you control a bigger position than your cash allows. 10× leverage on $1,000 = $10,000 of exposure. Sounds amazing — until you realize a 10% move against you wipes you out entirely. Leverage doesn't change your edge; it just multiplies the speed of winning AND losing.",
          },
          {
            type: "callout",
            tone: "warn",
            body: "Crypto exchanges advertise 100× leverage. That's marketing for 'liquidate yourself in one bad candle.' Beginners: use 1–3× max, or none at all.",
          },
          {
            type: "quiz",
            question: "At 20× leverage, a 5% move against you means…",
            options: ["A 5% loss", "A 20% loss", "A 100% loss (liquidation)", "No loss"],
            answerIndex: 2,
            explanation: "20× × 5% = 100%. Your collateral is gone. Leverage compresses both upside and downside hard.",
          },
        ],
      },
      {
        id: "correlation",
        title: "Correlation & portfolio risk",
        emoji: "🔗",
        duration: 4,
        xp: 20,
        blocks: [
          {
            type: "text",
            body: "If you're long Apple, Microsoft, and Nvidia, you don't have three trades — you basically have one big bet on tech. Correlated positions multiply your risk without feeling like it. True diversification means uncorrelated assets: e.g., stocks + gold + cash + maybe a short hedge.",
          },
          {
            type: "callout",
            tone: "tip",
            body: "Quick check: if a bad CPI print hits, would ALL your positions tank together? If yes, you're more concentrated than you think.",
          },
          {
            type: "quiz",
            question: "Being long Apple, Microsoft, and Nvidia is roughly equivalent to…",
            options: ["A fully diversified portfolio", "Three independent bets", "One big bet on US mega-cap tech", "A bear hedge"],
            answerIndex: 2,
            explanation: "Highly correlated tickers move together. You're concentrated, not diversified.",
          },
        ],
      },
      {
        id: "two-percent-rule",
        title: "The 2% rule in practice",
        emoji: "📐",
        duration: 5,
        xp: 25,
        blocks: [
          {
            type: "text",
            title: "Why 2% is the magic ceiling",
            body: "Risking 2% per trade means it takes 35 losses in a row to halve your account — statistically almost impossible if your edge is real. Risking 10% per trade halves it in just 7 losses. Same trader, same setups — different survival odds.",
          },
          { type: "interactive", widget: "drawdown-math" },
          {
            type: "text",
            title: "Real-world worked example",
            body: "Account: $5,000. Risk per trade: 1% = $50. You like XYZ at $20 with a stop at $19.50 (risk $0.50/share). Position size = $50 ÷ $0.50 = 100 shares. Notice you never asked 'how many shares feel right' — math decides, emotion doesn't.",
          },
          {
            type: "callout",
            tone: "tip",
            body: "Pre-print a position-size cheat sheet for your favourite stop distances. Removes guesswork in the heat of the moment.",
          },
          {
            type: "quiz",
            question: "Account $2,000, risk 1%, stop is $1 below entry. How many shares?",
            options: ["10 shares", "20 shares", "200 shares", "2,000 shares"],
            answerIndex: 1,
            explanation: "1% of $2,000 = $20 risk. $20 ÷ $1 stop = 20 shares. Position size scales to the stop, never the other way around.",
          },
        ],
      },
      {
        id: "scaling-exits",
        title: "Scaling out vs all-or-nothing exits",
        emoji: "📤",
        duration: 5,
        xp: 25,
        blocks: [
          {
            type: "text",
            title: "Lock in some, let the rest run",
            body: "Scaling out means selling part of your position at the first target and trailing the rest. You take guaranteed profit AND give yourself a shot at a home-run if the trend extends. Psychologically it's also kinder — partial wins calm the brain and reduce the urge to bail early on the runner.",
          },
          {
            type: "text",
            title: "When all-or-nothing is fine",
            body: "Mechanical systems often perform better with single exits because they're simpler to backtest. Scaling out is mainly for discretionary traders managing real-time emotion. Pick one method and stick with it for a whole month before comparing.",
          },
          {
            type: "callout",
            tone: "info",
            body: "Common split: take 50% off at 1R, move stop to break-even, let the remaining 50% trail toward 3R+. Bad days become tiny, good days become memorable.",
          },
          {
            type: "quiz",
            question: "The main psychological benefit of scaling out is…",
            options: ["You make more profit always", "It reduces the urge to bail on the runner", "It removes all risk", "It eliminates losses"],
            answerIndex: 1,
            explanation: "Booking partial profit calms the brain so you can let the rest run without panic-clicking.",
          },
        ],
      },
    ],
  },

  {
    id: "psychology",
    title: "Trading Psychology",
    subtitle: "Master the mind, master the market",
    emoji: "🧠",
    color: "from-fuchsia-400 to-purple-500",
    lessons: [
      {
        id: "fomo",
        title: "Beating FOMO",
        emoji: "🔥",
        duration: 5,
        xp: 25,
        blocks: [
          {
            type: "text",
            title: "What FOMO really is",
            body: "FOMO (Fear Of Missing Out) is the urge to chase a price that's already running. You see green candles, you panic-buy at the top, and the move reverses 5 minutes later. It feels rational in the moment ('I have to be in this!') and obviously stupid five minutes later.",
          },
          {
            type: "callout",
            tone: "tip",
            body: "Cure: a written plan made BEFORE the market opens. If a setup isn't on the plan, you don't take it. Period. Markets give infinite opportunities — there's another one in an hour.",
          },
          {
            type: "quiz",
            question: "FOMO most often leads to…",
            options: [
              "Buying near the top after a big rally",
              "Patient, planned entries",
              "Cutting losses early",
              "Doing nothing",
            ],
            answerIndex: 0,
            explanation:
              "Chasing a fast move usually means buying right before exhaustion. Patience wins.",
          },
        ],
      },
      {
        id: "revenge",
        title: "Revenge trading",
        emoji: "😤",
        duration: 4,
        xp: 20,
        blocks: [
          {
            type: "text",
            body: "After a loss, the brain SCREAMS for a quick win to feel okay again. So traders take bigger size on a worse setup. The result is usually a much bigger loss. The market does not owe you a refund.",
          },
          {
            type: "callout",
            tone: "warn",
            body: "Rule: after 2 losses in a row, take a walk. After 3, close the platform for the day. No exceptions.",
          },
          {
            type: "quiz",
            question: "The healthiest response to two losses in a row is…",
            options: [
              "Double your size to win it back",
              "Step away and review with a clear head",
              "Switch to a riskier asset",
              "Trade more frequently",
            ],
            answerIndex: 1,
            explanation:
              "Stepping away breaks the emotional loop. Doubling size after losses is how accounts evaporate.",
          },
        ],
      },
      {
        id: "discipline",
        title: "Discipline & the trading plan",
        emoji: "📓",
        duration: 5,
        xp: 25,
        blocks: [
          {
            type: "text",
            title: "Write it down",
            body: "A trading plan answers — in writing, before you trade — three questions: 1) What setup will I take? 2) Where's my stop? 3) Where's my target? If you can't answer all three, you're not trading, you're gambling.",
          },
          {
            type: "text",
            title: "Journal every trade",
            body: "Note your entry, exit, reason, and feelings. After 20 trades, patterns appear: maybe you always win in the morning and lose in the afternoon. The journal is where edge actually comes from.",
          },
          { type: "interactive", widget: "mindset-loop" },
          {
            type: "quiz",
            question: "A good trading plan defines, at minimum…",
            options: [
              "Just the entry price",
              "Setup, stop, and target — before entry",
              "How you feel about the market",
              "What your friends are trading",
            ],
            answerIndex: 1,
            explanation:
              "Setup + stop + target = a complete plan. Defining all three before entry kills 80% of bad decisions.",
          },
        ],
      },
      {
        id: "patience",
        title: "The power of doing nothing",
        emoji: "🧘",
        duration: 4,
        xp: 20,
        blocks: [
          {
            type: "text",
            body: "The best trade most days is NO trade. Sitting in cash is a position. Forcing trades in a choppy market is how confident accounts become humble accounts. Pros are paid to wait for fat pitches and swing hard at them.",
          },
          {
            type: "callout",
            tone: "tip",
            body: "Track your 'no-trade' days. Reward yourself for them. Boring is profitable.",
          },
          {
            type: "quiz",
            question: "On a choppy, news-driven day with no clear setup, the best move is usually…",
            options: ["Trade more to stay sharp", "Sit out and protect capital", "Use bigger size", "Switch to options"],
            answerIndex: 1,
            explanation:
              "Cash is a position. Doing nothing is often the highest-EV decision a trader can make.",
          },
        ],
      },
      {
        id: "fear-greed",
        title: "Fear, greed & the brain on price",
        emoji: "🎭",
        duration: 5,
        xp: 25,
        blocks: [
          {
            type: "text",
            title: "Why your brain betrays you",
            body: "Markets weaponize two ancient emotions: FEAR (close winners too early, freeze on losers) and GREED (size up after a win, hold for 'just a bit more'). Neuroscience shows price spikes light up the same brain regions as gambling and sugar. Knowing this doesn't make you immune — but it lets you build rules instead of trusting feelings.",
          },
          { type: "interactive", widget: "fear-greed-meter" },
          {
            type: "callout",
            tone: "info",
            body: "Useful checklist: are you breathing fast? Heart pounding? Refreshing the chart every 5 seconds? You're in lizard-brain mode. Step away before clicking.",
          },
          {
            type: "quiz",
            question: "A trader feels euphoric after 3 wins in a row. The biggest risk now is…",
            options: ["Bad luck", "Oversized next trade & sloppy rules", "The market closing", "Internet outage"],
            answerIndex: 1,
            explanation: "Winning streaks breed overconfidence. Most blow-ups happen right after a hot streak, not a cold one.",
          },
        ],
      },
      {
        id: "journaling-habit",
        title: "Journaling — the secret weapon",
        emoji: "📓",
        duration: 4,
        xp: 20,
        blocks: [
          {
            type: "text",
            body: "Top traders all keep a journal — not to brag, but to spot patterns invisible in the moment. For each trade log: ticker, setup, entry, stop, target, exit, R multiple, and one sentence on how you FELT. After 50 entries you'll see clear truths: 'I lose every Monday', 'My best trades are mornings only', 'I cut winners too early'. Use the Trade Journal tab in Tradely to start now.",
          },
          {
            type: "callout",
            tone: "tip",
            body: "If you skip journaling, you'll repeat the same mistake for years. If you journal honestly, you'll fix it in months.",
          },
          {
            type: "quiz",
            question: "The biggest payoff from journaling is…",
            options: ["A pretty notebook", "Spotting your own repeating patterns", "Bragging rights", "Tax help"],
            answerIndex: 1,
            explanation: "Patterns invisible in real-time become obvious in retrospect. Journals turn vague feelings into hard data.",
          },
        ],
      },
      {
        id: "process-over-outcome",
        title: "Process over outcomes",
        emoji: "🎯",
        duration: 5,
        xp: 25,
        blocks: [
          {
            type: "text",
            title: "A good trade can lose. A bad trade can win.",
            body: "Outcomes in trading are noisy in the short run. You can follow your plan perfectly and lose — or break every rule and get lucky. Beginners judge themselves by P&L; pros judge themselves by EXECUTION. Did you take only planned setups? Honor your stop? Size correctly? Yes = a good day, even if red.",
          },
          {
            type: "callout",
            tone: "tip",
            body: "Grade every trade A/B/C/D on EXECUTION, not result. After 30 trades, count A-grades. That's your real progress metric.",
          },
          { type: "interactive", widget: "mindset-loop" },
          {
            type: "quiz",
            question: "You followed your plan and still lost money on a trade. That was…",
            options: ["A bad trade", "A good trade with a bad outcome", "Proof your plan is broken", "Time to change strategies"],
            answerIndex: 1,
            explanation: "Process and outcome are separate. Good process + bad outcome = keep going. The math rewards consistency.",
          },
        ],
      },
      {
        id: "pre-trade-ritual",
        title: "Building a pre-trade ritual",
        emoji: "🕯️",
        duration: 4,
        xp: 20,
        blocks: [
          {
            type: "text",
            title: "Same 5 minutes, every day",
            body: "Surgeons scrub the same way before every operation. Pilots run a checklist before every takeoff. Why should clicking Buy on a $1,000 trade be casual? A simple pre-trade ritual quiets the limbic brain and tells you whether you're actually ready to trade — or whether today you should sit out.",
          },
          {
            type: "callout",
            tone: "info",
            body: "A 5-step ritual: 1) Check economic calendar. 2) Mark key levels on the chart. 3) Write today's bias in one sentence. 4) Decide max trades + max loss. 5) Three deep breaths. Then — and only then — open the order ticket.",
          },
          {
            type: "quiz",
            question: "The main job of a pre-trade ritual is to…",
            options: ["Guarantee profits", "Switch the brain from reactive to deliberate", "Replace having a strategy", "Show off discipline"],
            answerIndex: 1,
            explanation: "Rituals are mental gear-shifts. They move you out of impulse mode into deliberate, plan-based mode.",
          },
        ],
      },
      {
        id: "tilt-recovery",
        title: "Recovering from tilt",
        emoji: "🌪️",
        duration: 4,
        xp: 20,
        blocks: [
          {
            type: "text",
            body: "Tilt is the poker term for emotional decision-making after a bad beat. In trading it looks like revenge trades, oversized positions, abandoning the plan 'just this once'. Tilt is not a character flaw — it's a brain state. The cure is mechanical, not motivational: a hard stop on the day, a walk outside, and a 24-hour cooling-off rule before the next trade.",
          },
          {
            type: "callout",
            tone: "warn",
            body: "Most account blow-ups happen in a single 90-minute window of tilt, not over months. One enforced break can save your account.",
          },
          {
            type: "quiz",
            question: "The right response when you notice yourself tilting is…",
            options: ["Take one more trade to feel better", "Stop trading for the day — no exceptions", "Increase size to recover faster", "Switch to a hotter asset"],
            answerIndex: 1,
            explanation: "Tilt removes the part of your brain that follows rules. Stepping away is the only reliable fix.",
          },
        ],
      },
    ],
  },

  {
    id: "simulator",
    title: "Simulated Trading",
    subtitle: "Put it all together — risk-free",
    emoji: "🎮",
    color: "from-amber-500 to-pink-500",
    lessons: [
      {
        id: "why-simulate",
        title: "Why paper-trade first",
        emoji: "📝",
        duration: 4,
        xp: 20,
        blocks: [
          {
            type: "text",
            body: "Paper trading (simulated trades with fake money) lets you test ideas without losing real cash. It's not the same as real trading — your emotions are softer when nothing's at stake — but it's the best way to internalize mechanics: how orders work, what a stop-out feels like, how fast a small mistake compounds.",
          },
          {
            type: "callout",
            tone: "tip",
            body: "Goal in the simulator: not max profit. Max DISCIPLINE. Take only planned setups. Honor every stop. Journal every trade.",
          },
          {
            type: "quiz",
            question: "The main point of paper trading is to…",
            options: [
              "Get rich fast risk-free",
              "Build the habits and mechanics before real money is on the line",
              "Impress friends with a fake P&L",
              "Replace real trading forever",
            ],
            answerIndex: 1,
            explanation:
              "Sim trading is a flight simulator. Use it to build habits — not to score imaginary points.",
          },
        ],
      },
      {
        id: "using-sim",
        title: "Using the Tradely simulator",
        emoji: "🛠️",
        duration: 5,
        xp: 25,
        blocks: [
          {
            type: "text",
            title: "The setup",
            body: "Open the Simulator tab. You'll see a live candlestick chart, your cash, your equity, and Buy / Sell buttons. Pick a share size, click Buy to go long, Sell to go short. Pause to study the chart without action.",
          },
          {
            type: "text",
            title: "A practice routine",
            body: "Each session: 1) write down what setup you'll trade, 2) define your stop and target BEFORE clicking, 3) take only that setup, 4) review the trade log at the end. Five clean trades beats fifty random ones.",
          },
          {
            type: "callout",
            tone: "info",
            body: "The simulator uses a synthetic price feed — patterns behave like real markets but no real assets are involved. Perfect for safe practice.",
          },
          {
            type: "quiz",
            question: "Before clicking Buy in the simulator, you should…",
            options: [
              "Just vibe it",
              "Know your stop and target in advance",
              "Wait until you feel lucky",
              "Maximize share size for fun",
            ],
            answerIndex: 1,
            explanation:
              "Stop + target before entry = practicing the right habit. Random clicking is just video-game noise.",
          },
        ],
      },
      {
        id: "graduating",
        title: "Going from sim to real",
        emoji: "🎓",
        duration: 4,
        xp: 25,
        blocks: [
          {
            type: "text",
            body: "When you can consistently follow your plan in the simulator for several weeks — including the boring days — you're ready to consider real money. Start with the SMALLEST size your broker allows. Real money will feel completely different. That's normal.",
          },
          {
            type: "callout",
            tone: "warn",
            body: "Never skip from 'I learned a few things' straight to 'I'm risking 20% of my savings.' The gap between sim and real is bigger than between zero and sim.",
          },
          {
            type: "quiz",
            question: "When transitioning from simulator to real money, you should…",
            options: [
              "Trade the same size as in the sim",
              "Start with the smallest possible position size",
              "Take bigger risks for excitement",
              "Skip stops to feel more confident",
            ],
            answerIndex: 1,
            explanation:
              "Tiny size lets you adjust to the emotional weight of real money without damaging your account.",
          },
        ],
      },
    ],
  },

  {
    id: "tips",
    title: "Beginner Tips & Strategies",
    subtitle: "Field-tested rules to start smart",
    emoji: "💡",
    color: "from-lime-400 to-emerald-500",
    lessons: [
      {
        id: "starter-rules",
        title: "10 rules for your first 100 trades",
        emoji: "📋",
        duration: 8,
        xp: 50,
        blocks: [
          {
            type: "text",
            title: "Your first 100 trades are tuition, not income",
            body: "Nobody is born a trader. Your first 100 trades exist to build habits — not pay your rent. Tape these 10 rules above your screen. Follow them religiously, and you'll be ahead of 90% of beginners before you ever try to 'get good'.",
          },
          { type: "callout", tone: "warn", body: "Rule 1 — Risk ≤1% of your account per trade. A bad streak should bruise you, not kill you." },
          { type: "callout", tone: "warn", body: "Rule 2 — Set your stop-loss BEFORE you enter. If you can't define 'I'm wrong here', you can't trade the setup." },
          { type: "callout", tone: "tip", body: "Rule 3 — Take only setups on your written plan. No plan = gambling with extra steps." },
          { type: "callout", tone: "tip", body: "Rule 4 — Journal every trade with a screenshot. Future-you needs the evidence." },
          { type: "callout", tone: "info", body: "Rule 5 — Trade ONE market until you know its personality. Master one instrument before adding another." },
          { type: "callout", tone: "warn", body: "Rule 6 — After 2 losses in a row, step away. After 3, close the platform for the day. Non-negotiable." },
          { type: "callout", tone: "info", body: "Rule 7 — Avoid trading during major news (CPI, FOMC, earnings) unless that IS your edge. Spreads widen, stops get hunted." },
          { type: "callout", tone: "tip", body: "Rule 8 — Enter with LIMIT orders, exit with STOP orders. Discipline on entry, automation on exit." },
          { type: "callout", tone: "info", body: "Rule 9 — When timeframes disagree, trust the higher one. The daily chart beats the 1-minute chart, every time." },
          { type: "callout", tone: "tip", body: "Rule 10 — Every weekend, re-read your journal. Patterns invisible in real-time scream from a Sunday review." },
          {
            type: "callout",
            tone: "warn",
            body: "If a rule starts to feel 'optional' on a hot day, that's exactly when it matters most.",
          },
          {
            type: "quiz",
            question: "What's the single biggest skill in your first 100 trades?",
            options: ["Picking winners", "Surviving — keeping losses tiny", "Trading often", "Maximizing leverage"],
            answerIndex: 1,
            explanation: "Beginners who don't blow up get to compound — winners take care of themselves later.",
          },
        ],
      },
      {
        id: "starter-strategies",
        title: "3 simple strategies to practice",
        emoji: "🎯",
        duration: 7,
        xp: 35,
        blocks: [
          {
            type: "text",
            title: "1. Trend pullback",
            body: "On a clear uptrend (HH + HL), wait for price to pull back to a moving average (50 EMA is classic) or recent support. Enter long on the first bullish reversal candle. Stop below the swing low. Target = the recent high or 2× your risk. Simple, repeatable, works in almost every market.",
          },
          {
            type: "text",
            title: "2. Range fade",
            body: "When price is stuck between clear support and resistance, BUY near support / SELL near resistance with a tight stop just outside the zone. Best on slow, news-free days. Stop trading the range the moment a candle CLOSES outside — that often means the breakout is real.",
          },
          {
            type: "text",
            title: "3. Breakout retest",
            body: "Wait for a real breakout above resistance (with volume). Don't chase. Wait for price to come BACK to the broken level — if it holds as new support, enter long with a stop below it. Misses some big moves, but the ones it catches are clean.",
          },
          {
            type: "callout",
            tone: "warn",
            body: "Pick ONE strategy. Practice it 30+ times in the simulator before adding another. Strategy collecting is a fancy form of procrastination.",
          },
          {
            type: "quiz",
            question: "Which strategy works best in a clearly trending market?",
            options: ["Range fade", "Trend pullback", "Random clicking", "Holding cash"],
            answerIndex: 1,
            explanation: "Pullback entries align with the trend — you join the move at a discount, not a premium.",
          },
        ],
      },
      {
        id: "psych-cycle",
        title: "The market emotion cycle",
        emoji: "🎢",
        duration: 5,
        xp: 25,
        blocks: [
          {
            type: "text",
            body: "Every bubble and every crash follows the same emotional curve — disbelief, hope, optimism, belief, thrill, EUPHORIA, complacency, anxiety, denial, panic, capitulation, depression, then hope again. Knowing where the crowd is on this curve is a real edge. The most dangerous moment to buy is euphoria; the best is usually depression.",
          },
          { type: "interactive", widget: "emotional-cycle" },
          {
            type: "callout",
            tone: "tip",
            body: "When your barber, taxi driver, and aunt all start giving you stock tips — you're near euphoria. When nobody wants to even discuss markets — you might be near a bottom.",
          },
          {
            type: "quiz",
            question: "On the emotion cycle, the riskiest moment to BUY is…",
            options: ["Depression", "Disbelief", "Euphoria", "Hope"],
            answerIndex: 2,
            explanation: "Euphoria = everyone's already in. There are no buyers left to push price higher.",
          },
        ],
      },
    ],
  },
];


export const totalLessons = curriculum.reduce((n, m) => n + m.lessons.length, 0);
export const totalXp = curriculum.reduce(
  (n, m) => n + m.lessons.reduce((mm, l) => mm + l.xp, 0),
  0,
);

export function findLesson(moduleId: string, lessonId: string) {
  const mod = curriculum.find((m) => m.id === moduleId);
  if (!mod) return null;
  const idx = mod.lessons.findIndex((l) => l.id === lessonId);
  if (idx < 0) return null;
  const next = mod.lessons[idx + 1]
    ? { moduleId: mod.id, lessonId: mod.lessons[idx + 1].id }
    : (() => {
        const mIdx = curriculum.findIndex((m) => m.id === moduleId);
        const nextMod = curriculum[mIdx + 1];
        return nextMod
          ? { moduleId: nextMod.id, lessonId: nextMod.lessons[0].id }
          : null;
      })();
  return { module: mod, lesson: mod.lessons[idx], next };
}

export function firstLessonOf(moduleId: string) {
  const mod = curriculum.find((m) => m.id === moduleId);
  if (!mod || mod.lessons.length === 0) return null;
  return { moduleId: mod.id, lessonId: mod.lessons[0].id };
}
