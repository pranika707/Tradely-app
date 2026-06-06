import type { LessonBlock } from "./curriculum";

// A second teaching block + a second quiz appended to each lesson so
// students get 2 questions per lesson with extra context between them.
export const extraBlocks: Record<string, LessonBlock[]> = {
  // ---------- BASICS ----------
  "basics/what-is-trading": [
    { type: "text", title: "Zoom out: why markets exist", body: "Markets exist so capital can find its best use. A farmer needs cash now and sells future wheat; a factory needs to lock in oil prices; a saver wants their money to grow. Traders provide liquidity to all of these people and get paid a small spread for taking the other side. You're not just guessing — you're providing a service." },
    { type: "quiz", question: "The core economic role of a market is to…", options: ["Make traders rich", "Match people who need capital with people who have it", "Predict the future", "Replace banks"], answerIndex: 1, explanation: "Markets exist to allocate capital and risk. Profit for traders is a byproduct of providing liquidity." },
  ],
  "basics/long-vs-short": [
    { type: "text", title: "Why brokers charge to short", body: "To short a stock you must borrow shares from someone who owns them — and pay a small daily fee (the borrow rate). Hard-to-borrow names can cost 50%+ per year. That cost eats into profits, which is one reason shorting is harder than going long." },
    { type: "quiz", question: "The maximum theoretical loss on a SHORT position is…", options: ["100%", "50%", "Unlimited", "Zero"], answerIndex: 2, explanation: "A stock can keep rising forever, so a short's loss is theoretically unlimited. Always use a stop." },
  ],
  "basics/orders": [
    { type: "text", title: "Slippage is a hidden tax", body: "On a fast-moving stock, a market order to buy 1000 shares might fill 200 at $50.00, 300 at $50.05, and 500 at $50.10. The 'price' you see isn't always the price you get. Limit orders cap that tax — at the cost of sometimes missing the trade." },
    { type: "quiz", question: "In a thin, fast-moving market the safer order type is usually…", options: ["Market", "Limit", "Stop", "All-or-nothing"], answerIndex: 1, explanation: "Limit orders prevent paying way more than expected when liquidity is thin." },
  ],
  "basics/market-players": [
    { type: "text", title: "Find your edge, not theirs", body: "You can't out-compute a hedge fund. But you also don't have to. Funds need to deploy millions and answer to investors quarterly. You can sit in cash for weeks, wait for ONE perfect setup, and risk $50. That patience is a real edge most pros don't have." },
    { type: "quiz", question: "A retail trader's biggest structural edge over a hedge fund is…", options: ["Faster computers", "Freedom to do nothing and wait", "Insider information", "Bigger position sizes"], answerIndex: 1, explanation: "Funds must trade to justify fees. You can sit out for as long as you like." },
  ],
  "basics/price-drivers": [
    { type: "text", title: "Context beats prediction", body: "You don't need to predict the news — you need to know when it's coming. A trader who knows CPI prints at 8:30am won't be surprised by 8:31am volatility. Predicting direction is hard. Predicting WHEN volatility shows up is mostly a calendar check." },
    { type: "quiz", question: "Before the market opens, the most useful thing a beginner can do is…", options: ["Guess the day's high", "Check the economic calendar", "Watch crypto Twitter", "Open 20 charts at once"], answerIndex: 1, explanation: "Knowing scheduled catalysts (CPI, FOMC, earnings) prepares you for the day's volatility windows." },
  ],

  // ---------- MARKETS ----------
  "markets/stocks": [
    { type: "text", title: "The first/last hour rule", body: "About 50% of a typical day's volume happens in the first 90 minutes and last 60 minutes. The middle of the day is often choppy noise. Most pros trade the edges and respect the lunchtime drift." },
    { type: "quiz", question: "Most stock volume tends to happen…", options: ["At lunchtime", "Evenly through the day", "At the open and close", "Only on Fridays"], answerIndex: 2, explanation: "Liquidity clusters at the open and close — that's where most clean setups live." },
  ],
  "markets/forex": [
    { type: "text", title: "Sessions hand off", body: "Forex trades 24/5 because sessions overlap: Tokyo → London → New York. The London/NY overlap (roughly 8am–noon ET) is the most liquid and volatile window. If you're trading EUR/USD outside that window, expect slow, choppy ranges." },
    { type: "quiz", question: "The most volatile forex window is usually…", options: ["Tokyo only", "Sydney only", "London/New York overlap", "Sunday open"], answerIndex: 2, explanation: "The London/NY overlap concentrates the biggest players in the world at the same time." },
  ],
  "markets/crypto": [
    { type: "text", title: "No circuit breakers", body: "Stock exchanges halt trading after big moves to let people breathe. Crypto has no such safety net — a 30% crash at 3am while you sleep is entirely possible. Position size accordingly, and never use leverage you can't actively monitor." },
    { type: "quiz", question: "The biggest hidden risk of crypto vs stocks is…", options: ["Lower volume", "No trading halts during crashes", "Better regulation", "Smaller spreads"], answerIndex: 1, explanation: "No halts means big moves can happen overnight with no chance to react." },
  ],
  "markets/commodities-futures": [
    { type: "text", title: "Contango & backwardation", body: "Futures prices for different months can be different. CONTANGO = future months pricier than today (storage costs etc). BACKWARDATION = future months cheaper (shortage now). These shapes drive returns for commodity ETFs and matter way more than most beginners realize." },
    { type: "quiz", question: "Contango means future-month futures prices are…", options: ["Lower than spot", "Equal to spot", "Higher than spot", "Always zero"], answerIndex: 2, explanation: "Contango = upward-sloping curve. It can quietly erode returns for long commodity ETFs." },
  ],
  "markets/indices": [
    { type: "text", title: "Cap-weighted vs equal-weighted", body: "The S&P 500 is cap-weighted — the 10 biggest companies make up ~35% of the index. So 'the market' is really a bet on a handful of mega-caps. Equal-weighted versions (RSP) spread risk evenly and behave very differently in a tech-led rally." },
    { type: "quiz", question: "In the cap-weighted S&P 500, the top 10 holdings make up roughly…", options: ["5%", "15%", "One-third or more", "Exactly half"], answerIndex: 2, explanation: "Mega-caps dominate the index — be aware of concentration when 'buying the market'." },
  ],
  "markets/options": [
    { type: "text", title: "Theta is the silent killer", body: "Every day an option is alive, time decay (theta) eats a little of its value — even if price doesn't move. Buying options near expiry is like buying ice cubes in the sun. Beginners lose mostly to theta, not direction." },
    { type: "quiz", question: "If price stays flat for a week, a long call's value will most likely…", options: ["Stay the same", "Decrease due to theta", "Always increase", "Become unlimited"], answerIndex: 1, explanation: "Time decay shrinks option premium daily. Flat markets are death for option buyers." },
  ],
  "markets/bull-bear-markets": [
    { type: "text", title: "Bear-market rallies fool everyone", body: "Some of the biggest single-day rallies in history happened INSIDE bear markets. 2008 had multiple 10%+ bounces — all of which failed. Beginners often think 'the bottom is in' way too early. Wait for confirmed higher highs and higher lows before believing a new bull." },
    { type: "quiz", question: "Sharp 10%+ rallies inside a bear market usually…", options: ["Confirm the bottom is in", "Fail and resume the downtrend", "Mean the bull is back", "Are caused by retail buying"], answerIndex: 1, explanation: "Bear-market bounces are violent but rarely the real bottom. Wait for structure to confirm." },
  ],

  // ---------- CANDLES ----------
  "candles/anatomy": [
    { type: "text", title: "Closes matter more than wicks", body: "A wick shows where price went; a close shows where it SETTLED. Pros weight closes heavily because they reflect where money was willing to sit at the end of the period. A breakout that wicks above resistance but closes back inside is not a breakout." },
    { type: "quiz", question: "Which part of a candle reflects where price actually settled?", options: ["The upper wick", "The lower wick", "The close", "The open"], answerIndex: 2, explanation: "Closes show committed positioning. Wicks just show intraday attempts." },
  ],
  "candles/doji-hammer": [
    { type: "text", title: "Confirmation candle", body: "A hammer at support is a hint, not a signal. Wait for the NEXT candle to close green above the hammer's high — that's confirmation buyers actually followed through. One candle = guess. Two = evidence." },
    { type: "quiz", question: "After a hammer at support, the best confirmation is…", options: ["Volume drops", "The next candle closes above the hammer's high", "Price gaps down", "A doji forms"], answerIndex: 1, explanation: "A follow-through close above the hammer's high confirms buyers are in control." },
  ],
  "candles/engulfing": [
    { type: "text", title: "Body size matters", body: "A 'bullish engulfing' where the green body is barely bigger than the red one is weak. Real engulfings show a 1.5–2× body — that's the visual signature of overwhelming pressure flipping sides." },
    { type: "quiz", question: "The strongest engulfing patterns have…", options: ["Tiny bodies", "A clearly larger engulfing body, ideally on rising volume", "Long wicks both sides", "No volume at all"], answerIndex: 1, explanation: "Bigger body + higher volume = real conviction flip. Marginal engulfings often fail." },
  ],
  "candles/morning-evening-star": [
    { type: "text", title: "The middle candle is the tell", body: "In a morning star, the middle (small) candle shows sellers losing energy. The smaller and more centered its body, the cleaner the signal. A doji in the middle is the gold-standard version." },
    { type: "quiz", question: "The middle candle of a morning star is best when it…", options: ["Is the biggest red candle of the day", "Is small/doji, showing indecision", "Gaps up sharply", "Has no wicks"], answerIndex: 1, explanation: "A small indecision candle = sellers exhausted, ready for buyers to take over." },
  ],
  "candles/three-soldiers-crows": [
    { type: "text", title: "Wait for the pullback", body: "By the third soldier, much of the move is already done. Chasing in usually means a bad entry and a wide stop. The cleaner trade is waiting for a 1–2 candle pullback into the trend, then entering with a tight risk." },
    { type: "quiz", question: "After three white soldiers, the highest-EV entry is usually…", options: ["Chase the third candle", "Wait for a small pullback and enter on continuation", "Short immediately", "Do nothing forever"], answerIndex: 1, explanation: "Pullback entries get a better price and a tighter stop than chasing." },
  ],
  "candles/timeframes": [
    { type: "text", title: "Top-down analysis", body: "Pros usually start on the weekly to find the regime, drop to the daily for setups, then go to the 1-hour or 15-min for entries. Going the other way (starting on the 1-min) is how you lose the forest for the trees." },
    { type: "quiz", question: "The best workflow is to analyse charts…", options: ["Bottom-up: start small, work up", "Top-down: start big, work down", "Only one timeframe ever", "Randomly"], answerIndex: 1, explanation: "Top-down gives you context before precision. The trend on a daily beats a 1-min signal." },
  ],

  // ---------- CHARTS ----------
  "charts/market-structure": [
    { type: "text", title: "Internal vs swing structure", body: "On the daily you might see a clear uptrend, while on the 15-min the same chart looks like a downtrend. Both are true — they're just different scales. Pros label structure on multiple timeframes and trade with the higher one." },
    { type: "quiz", question: "When daily and 15-min structures disagree, you should generally trust…", options: ["The 15-min", "The daily", "Whichever is greener", "Neither"], answerIndex: 1, explanation: "Higher timeframes carry more weight and filter out short-term noise." },
  ],
  "charts/trends": [
    { type: "text", title: "Pullbacks are gifts", body: "A trend doesn't go straight up — it stair-steps. Each pullback is an opportunity to enter at a discount with a tighter stop. Buying at the top of a 5-candle rally is buying retail. Buying the dip into prior support is buying like a pro." },
    { type: "quiz", question: "In a clean uptrend, the highest-quality entry is usually…", options: ["At a new high after a 10-candle rally", "On a pullback into support / moving average", "Right at the open", "After news"], answerIndex: 1, explanation: "Pullbacks let you enter with the trend at a better price and tighter risk." },
  ],
  "charts/support-resistance": [
    { type: "text", title: "Polarity: support becomes resistance", body: "Once a clear support breaks, it often acts as resistance on the way back up — and vice versa. Traders trapped on the wrong side cover their losses near the old level, creating a natural ceiling/floor. This is one of the most reliable patterns in charting." },
    { type: "quiz", question: "After a clear support level breaks down, that level often becomes…", options: ["A new uptrend line", "Resistance on the way back up", "Meaningless", "A buy signal"], answerIndex: 1, explanation: "Polarity flip: trapped longs sell into the retest, capping price at the old support." },
  ],
  "charts/trendlines": [
    { type: "text", title: "Logarithmic vs linear", body: "On long timeframes, switch your chart to LOG scale. Trendlines drawn on a linear scale get distorted by big percentage moves. Most pros use log for multi-year analysis and linear for short-term setups." },
    { type: "quiz", question: "For multi-year trendlines you should usually use…", options: ["Linear scale", "Log scale", "Volume scale", "No scale"], answerIndex: 1, explanation: "Log scale shows percentage moves evenly — much more accurate for long-term trends." },
  ],
  "charts/volume": [
    { type: "text", title: "Volume climaxes", body: "An enormous volume spike at the end of a long downtrend is often a CAPITULATION — last sellers giving up. The opposite (huge volume at a top) is often distribution. Extreme volume + extreme price = a turning point worth respecting." },
    { type: "quiz", question: "Massive volume after a long downtrend often signals…", options: ["The trend will accelerate", "Possible capitulation / bottom", "Nothing", "Holiday trading"], answerIndex: 1, explanation: "Capitulation flushes out the last sellers — often marking a major low." },
  ],

  // ---------- RISK ----------
  "risk/position-size": [
    { type: "text", title: "The Kelly trap", body: "The Kelly criterion math says to size much bigger than 1–2%. The catch: Kelly assumes you KNOW your true edge — which beginners don't. Pros run at 'half-Kelly' or less. For your first 100 trades, treat 1% as a ceiling, not a target." },
    { type: "quiz", question: "Account $5,000, risk 1%, stop $0.25 below entry. How many shares?", options: ["50", "100", "200", "500"], answerIndex: 2, explanation: "1% of $5,000 = $50. $50 ÷ $0.25 = 200 shares." },
  ],
  "risk/stop-loss": [
    { type: "text", title: "Mental stops vs hard stops", body: "A 'mental stop' is a stop you promise to honor — until you don't. Real stops live on the exchange. Slippage on a hard stop is annoying. Refusing to honor a mental stop is account-ending. Set the order, walk away." },
    { type: "quiz", question: "Mental stops fail most often because…", options: ["They're too tight", "Humans don't honor them under stress", "Brokers ignore them", "They cost extra"], answerIndex: 1, explanation: "Under loss-stress the brain rationalizes holding. Hard stops remove the decision from you." },
  ],
  "risk/risk-reward": [
    { type: "text", title: "Win rate × R:R = expectancy", body: "A 40% win rate at 1:3 R:R = profitable. A 70% win rate at 1:0.5 R:R = breakeven at best. Most beginners obsess over win rate. Pros obsess over expectancy: (win% × avg win) − (loss% × avg loss)." },
    { type: "quiz", question: "Which trader is more profitable long term?", options: ["70% win rate at 1:0.5 R:R", "40% win rate at 1:3 R:R", "Both equal", "Impossible to tell"], answerIndex: 1, explanation: "Expectancy = 0.4×3 − 0.6×1 = +0.6R per trade. The 70%/0.5R trader is roughly breakeven." },
  ],
  "risk/drawdowns": [
    { type: "text", title: "Cut size, don't quit", body: "After a 10% drawdown, halve your size. After a 20% drawdown, halve it again. Stay in the game with smaller bets until your equity curve stabilizes — then scale back up. Smart traders shrink in losing streaks, not double down." },
    { type: "quiz", question: "After a 20% drawdown, the smartest move is usually to…", options: ["Double size to recover faster", "Cut size and trade smaller until stable", "Stop trading forever", "Switch to options"], answerIndex: 1, explanation: "Smaller size protects you from a death spiral and gives time to find your edge again." },
  ],
  "risk/leverage": [
    { type: "text", title: "Funding rates", body: "Leveraged crypto positions pay (or receive) a funding rate every few hours. In strong bull markets longs can pay 30%+ per year just in funding fees. Leverage isn't just amplifying direction — it's renting capital, and rent costs money." },
    { type: "quiz", question: "On a perpetual futures contract, funding rates…", options: ["Are always free", "Are a periodic fee paid between long and short holders", "Only apply to stocks", "Are paid by exchanges"], answerIndex: 1, explanation: "Funding flips between longs and shorts to keep perp price near spot — a real ongoing cost." },
  ],
  "risk/correlation": [
    { type: "text", title: "Correlation goes to 1 in a crisis", body: "Assets that look uncorrelated in calm markets often crash together in panic ('everything sells at once'). 2008, March 2020 — even gold dipped briefly as everyone needed cash. True hedges are rare; cash is often the best one." },
    { type: "quiz", question: "During major market crashes, correlations between risk assets tend to…", options: ["Stay the same", "Drop to zero", "Spike toward 1 (move together)", "Become negative"], answerIndex: 2, explanation: "In panic, investors sell everything liquid for cash — diversification temporarily breaks down." },
  ],
  "risk/two-percent-rule": [
    { type: "text", title: "Scale risk to confidence", body: "Some pros risk 0.5% on weak setups and 1.5% on A+ setups — but NEVER above their max. Variable sizing inside the 2% ceiling lets your best ideas earn more without endangering the account." },
    { type: "quiz", question: "It's acceptable to risk slightly MORE on a trade when…", options: ["You feel lucky", "The setup grades A+ on your written rules AND total risk stays under 2%", "You just lost", "Volume is low"], answerIndex: 1, explanation: "Higher conviction can earn more — but only with objective criteria and a hard ceiling." },
  ],
  "risk/scaling-exits": [
    { type: "text", title: "Move the stop to breakeven", body: "Once you scale out partial profit at 1R, immediately move your stop on the remainder to your entry price. Now the worst case is a free trade — emotional kryptonite for the second-guessing brain." },
    { type: "quiz", question: "After taking 50% off at 1R, you should usually…", options: ["Move stop to breakeven", "Add more to the position", "Remove the stop", "Close the rest"], answerIndex: 0, explanation: "Stop at breakeven on the runner = guaranteed non-loss on the remaining shares." },
  ],

  // ---------- PSYCHOLOGY ----------
  "psychology/fomo": [
    { type: "text", title: "The 'I'll just check' trap", body: "FOMO usually starts with a casual chart-check, escalates to scrolling Twitter, then a panic click. The fix isn't willpower — it's environment. Close the chart app. Hide the watchlist. If a setup isn't planned, you literally don't see it." },
    { type: "quiz", question: "The most reliable cure for FOMO is…", options: ["Trying harder to resist", "Designing your environment so unplanned trades aren't visible", "Trading more", "Smaller size"], answerIndex: 1, explanation: "Willpower fails. Removing the trigger (closing the app) succeeds." },
  ],
  "psychology/revenge": [
    { type: "text", title: "Cortisol hijacks logic", body: "After a loss, your brain dumps cortisol — the stress hormone. It literally narrows perception and biases decisions toward 'fix it NOW'. A 20-minute walk drops cortisol enough to let logic come back online. This is biology, not weakness." },
    { type: "quiz", question: "Revenge trading is best understood as…", options: ["A character flaw", "A predictable stress response that needs a circuit-breaker", "Smart aggression", "A winning strategy"], answerIndex: 1, explanation: "It's biology. Treat it with a mechanical break, not motivational self-talk." },
  ],
  "psychology/discipline": [
    { type: "text", title: "Pre-commitment beats willpower", body: "Decide your rules when calm, write them down, and treat them as non-negotiable when stressed. 'Future you' will thank past-you. Willpower in the moment is unreliable; pre-commitment is bulletproof." },
    { type: "quiz", question: "Discipline in trading is mostly built through…", options: ["Trying harder in the moment", "Pre-committed written rules", "Hoping for the best", "Faster reflexes"], answerIndex: 1, explanation: "Decide-once, follow-always beats deciding under pressure every time." },
  ],
  "psychology/patience": [
    { type: "text", title: "Opportunity cost of bad trades", body: "Every bad trade costs you twice: the loss itself, AND the capital + focus that could have gone into a great setup later. Sitting in cash isn't 'missing out' — it's preserving the right to swing hard when the fat pitch shows up." },
    { type: "quiz", question: "Sitting in cash for a week with no setups is best described as…", options: ["A wasted week", "Active capital preservation", "Laziness", "A loss"], answerIndex: 1, explanation: "Cash is a position. Preserving capital for A+ setups is itself a strategy." },
  ],
  "psychology/fear-greed": [
    { type: "text", title: "Pre-decide everything", body: "If you decide your entry, stop, target, and size BEFORE the bell rings, fear and greed have less to grab onto. They show up most when you're improvising. A written plan is emotional armor." },
    { type: "quiz", question: "The best defense against in-trade emotion is…", options: ["Meditation only", "Decisions made before entry, in writing", "Trading more often", "Bigger size"], answerIndex: 1, explanation: "Pre-decisions remove the in-moment fight between logic and limbic brain." },
  ],
  "psychology/journaling-habit": [
    { type: "text", title: "Tag emotions, not just trades", body: "Beyond price data, log a one-word emotion for each trade: calm, rushed, revenge, FOMO, bored. After 30 trades you'll see your worst trades cluster around the same emotional state — and you can build rules to avoid that state." },
    { type: "quiz", question: "Adding an emotion tag to each trade helps you…", options: ["Look pro", "Spot which mental states correlate with losses", "Save on taxes", "Predict the market"], answerIndex: 1, explanation: "Patterns in your emotional state predict losses better than any indicator." },
  ],
  "psychology/process-over-outcome": [
    { type: "text", title: "Small sample size lies", body: "Over 10 trades, a coin-flip can look like genius. Over 100, your real expectancy emerges. Judge yourself in samples of at least 30 trades. Anything less is noise pretending to be signal." },
    { type: "quiz", question: "The minimum sample size to start judging a strategy is roughly…", options: ["3 trades", "10 trades", "30+ trades", "1 trade"], answerIndex: 2, explanation: "Statistical significance kicks in around 30 trades. Below that it's mostly luck." },
  ],
  "psychology/pre-trade-ritual": [
    { type: "text", title: "The 90-second reset", body: "If you skip your ritual one day, the simplest reset is 90 seconds: 6 slow breaths (4 in, 6 out), then read your written plan aloud. It sounds silly. It works. Slow breathing literally activates the parasympathetic nervous system — the 'thinking' brain comes back online." },
    { type: "quiz", question: "Slow exhale-focused breathing helps a trader by…", options: ["Increasing heart rate", "Activating the calmer parasympathetic system", "Reducing oxygen", "Generating profits"], answerIndex: 1, explanation: "Long exhales shift the nervous system out of fight-or-flight, restoring deliberate thinking." },
  ],
  "psychology/tilt-recovery": [
    { type: "text", title: "The 24-hour rule", body: "After a tilt-driven blow-up, ban yourself from trading for 24 hours minimum. Use the time to journal what happened, what triggered it, and exactly which rule would have prevented it. The cost of one day off is tiny vs the cost of compounding tilt." },
    { type: "quiz", question: "After a major tilt episode, the minimum cooling-off period should be…", options: ["10 minutes", "1 hour", "24 hours", "Never trade again"], answerIndex: 2, explanation: "24 hours lets stress hormones fully clear and gives you a chance to journal what triggered it." },
  ],

  // ---------- SIMULATOR ----------
  "simulator/why-simulate": [
    { type: "text", title: "Sim trading's weakness", body: "Paper trading has a known flaw: your emotions are softer because nothing's at stake. So sim results often overstate real-world performance. The fix: treat sim trades with full seriousness — full journaling, full discipline, no 'do-overs'." },
    { type: "quiz", question: "The main weakness of paper trading is…", options: ["Charts are different", "Emotional pressure is lower than real money", "It costs money", "It's banned"], answerIndex: 1, explanation: "Without real money on the line, your psychology behaves differently. Discipline must come from process, not pressure." },
  ],
  "simulator/using-sim": [
    { type: "text", title: "Define 'done' for the day", body: "Set a max number of trades (e.g. 3) and a max loss (e.g. 2%) per day. Once you hit either, you're done — winning or losing. This single rule prevents most blow-ups in both sim and real trading." },
    { type: "quiz", question: "A 'max daily loss' rule mainly protects you from…", options: ["Boredom", "Tilt-driven blow-up days", "Slow days", "The broker"], answerIndex: 1, explanation: "Daily loss caps stop one bad session from becoming a catastrophic one." },
  ],
  "simulator/graduating": [
    { type: "text", title: "Real money feels different", body: "When you go live, you'll be surprised how a $50 risk that felt nothing in the sim suddenly feels like $500. Start so small that the loss is genuinely meaningless — this lets your nervous system adapt to real stakes without damage." },
    { type: "quiz", question: "When moving from sim to real, the right first position size is…", options: ["Same as sim", "Whatever feels exciting", "The smallest size your broker allows", "Maximum leverage"], answerIndex: 2, explanation: "Tiny size protects both your account and your psychology while you adapt." },
  ],

  // ---------- TIPS ----------
  "tips/starter-rules": [
    { type: "text", title: "Rules > goals", body: "Goals like 'make $1,000 this month' are out of your control. Rules like 'risk ≤1%, journal every trade, max 3 trades/day' are 100% in your control. Pros set rules, not goals — and the P&L follows." },
    { type: "quiz", question: "Pros focus more on…", options: ["Profit goals", "Process rules they fully control", "Predicting tops", "Trading frequency"], answerIndex: 1, explanation: "Controllable inputs produce uncontrollable outputs. Focus on what you can control." },
  ],
  "tips/starter-strategies": [
    { type: "text", title: "Master one before adding another", body: "Strategy collecting feels productive but is procrastination. Pick ONE setup and run it 30+ times in the sim. Once your expectancy is positive on that one, then — and only then — add a second." },
    { type: "quiz", question: "Beginners learn faster by…", options: ["Trying 5 strategies at once", "Mastering one strategy for 30+ trades before adding another", "Switching daily", "Following influencers"], answerIndex: 1, explanation: "Depth beats breadth early on. Master one edge fully before broadening." },
  ],
  "tips/psych-cycle": [
    { type: "text", title: "Be a contrarian — carefully", body: "Buying at peak depression and selling at peak euphoria sounds easy and is brutally hard in practice. The crowd is wrong at extremes but RIGHT in the middle (trends persist). Contrarian only at the extremes — never just for the sake of being different." },
    { type: "quiz", question: "Contrarian trading works best…", options: ["All the time", "Only at emotional extremes (panic or euphoria)", "In the middle of trends", "Never"], answerIndex: 1, explanation: "Crowds are right during trends and wrong at extremes. Pick your spots." },
  ],
};
