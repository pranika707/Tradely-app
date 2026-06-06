import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="relative overflow-hidden rounded-[2rem] p-10 text-center sm:p-16">
          <div className="absolute inset-0 -z-10 opacity-95" style={{ backgroundImage: "var(--gradient-hero)" }} />
          <div className="absolute -top-32 -left-20 h-72 w-72 rounded-full bg-white/20 blur-3xl animate-[float_12s_ease-in-out_infinite]" />
          <div className="absolute -bottom-40 -right-20 h-96 w-96 rounded-full bg-white/10 blur-3xl animate-[float_16s_ease-in-out_infinite]" />
          <h2 className="text-balance text-3xl font-bold text-white sm:text-5xl">
            Your trading journey starts today.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-white/85">
            Build real confidence with bite-sized lessons, a risk-free simulator, and a calm AI mentor.
          </p>
          <Link to="/onboarding">
            <Button size="lg" className="mt-8 rounded-full bg-white text-black shadow-lg hover:bg-white/90">
              Start learning free
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
