import { Sparkles } from "lucide-react";
import { Link } from "@tanstack/react-router";

const cols = [
  { title: "Product", links: ["Features", "Roadmap", "Simulator"] },
  { title: "Learn", links: ["Modules", "AI Mentor", "Chart Quizzes", "Books"] },
  { title: "Legal", links: ["Privacy", "Terms", "Disclaimer", "Cookies"] },
];

export function Footer() {
  return (
    <footer className="relative border-t border-border/60 bg-muted/30 pt-16 pb-10">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-10 md:grid-cols-5">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 font-semibold">
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-primary to-accent">
                <Sparkles className="h-4 w-4 text-primary-foreground" />
              </div>
              <span>Tradely</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              The friendliest way to learn trading. Educational only — no financial advice,
              no real-money risk.
            </p>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <h4 className="text-sm font-semibold">{c.title}</h4>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {c.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="hover:text-foreground">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} Tradely. For educational purposes only.</p>
          <p>Made with care for beginner traders worldwide.</p>
        </div>
      </div>
    </footer>
  );
}
