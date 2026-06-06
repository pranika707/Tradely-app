import { Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";

const links = [
  { href: "#features", label: "Features" },
  { href: "#how", label: "How it works" },
  { href: "#faq", label: "FAQ" },
];

export function Navbar() {
  return (
    <header className="fixed top-4 left-1/2 z-50 w-[min(1100px,calc(100%-2rem))] -translate-x-1/2">
      <div className="glass flex items-center justify-between rounded-full px-4 py-2 sm:px-6">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <div className="grid h-8 w-8 place-items-center rounded-xl bg-gradient-to-br from-primary to-accent shadow-[var(--shadow-glow)]">
            <Sparkles className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="hidden sm:inline">Tradely</span>
        </Link>
        <nav className="hidden gap-1 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
          <Link to="/learn" className="rounded-full px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground">
            Lessons
          </Link>
          <Link to="/simulator" className="rounded-full px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground">
            Simulator
          </Link>
          <Link to="/quiz" className="rounded-full px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground">
            Chart quizzes
          </Link>
          <Link to="/books" className="rounded-full px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground">
            Books
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link to="/onboarding">
            <Button size="sm" className="rounded-full bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-[var(--shadow-glow)] hover:opacity-90">
              Start learning
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
