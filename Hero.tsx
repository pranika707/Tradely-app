import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { CandlestickBackdrop } from "@/components/CandlestickBackdrop";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden pt-36 pb-24 sm:pt-44 sm:pb-32">
      <CandlestickBackdrop />
      <div className="relative mx-auto max-w-5xl px-6 text-center">
        <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-muted-foreground animate-[fadeUp_0.6s_ease-out]">
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          AI-powered learning for absolute beginners
        </div>
        <p className="mt-6 text-sm font-semibold uppercase tracking-[0.35em] text-primary animate-[fadeUp_0.7s_ease-out_0.05s_both]">
          Tradely <span className="text-muted-foreground font-medium">by Pranika</span>
        </p>
        <h1 className="mt-3 text-balance text-5xl font-bold tracking-tight sm:text-7xl animate-[fadeUp_0.7s_ease-out_0.1s_both]">
          Learn Trading From <br className="hidden sm:block" />
          <span className="text-gradient">Scratch Using AI</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-muted-foreground sm:text-xl animate-[fadeUp_0.7s_ease-out_0.2s_both]">
          A Duolingo-style journey from “what is a candle?” to confident,
          simulated trades — guided by a friendly AI mentor every step of the way.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row animate-[fadeUp_0.7s_ease-out_0.3s_both]">
          <Link to="/onboarding">
            <Button size="lg" className="group rounded-full bg-foreground px-7 text-background shadow-lg hover:bg-foreground/90">
              Start Learning
              <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
          </Link>
        </div>

      </div>
    </section>
  );
}
