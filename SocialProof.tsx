const logos = ["Bloomberg", "Forbes", "TechCrunch", "ProductHunt", "Wired", "FastCo"];

export function SocialProof() {
  return (
    <section className="relative border-y border-border/60 bg-muted/30 py-10">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-center text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Featured in
        </p>
        <div className="mt-6 grid grid-cols-3 items-center gap-6 opacity-70 sm:grid-cols-6">
          {logos.map((l) => (
            <div
              key={l}
              className="text-center text-lg font-semibold tracking-tight text-muted-foreground"
            >
              {l}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
