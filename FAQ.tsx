import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "Do I need any trading experience?", a: "No. Tradely is built specifically for absolute beginners. We assume zero knowledge." },
  { q: "Is this real money trading?", a: "No. Tradely is purely educational and uses a risk-free simulator with fake money." },
  { q: "How much time do I need each day?", a: "Lessons are 3–5 minutes. A 10-minute daily streak is enough to make real progress." },
  { q: "Will the AI judge my questions?", a: "Never. The AI mentor is designed to be supportive, patient, and beginner-friendly." },
];

export function FAQ() {
  return (
    <section id="faq" className="relative py-24">
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">FAQ</p>
          <h2 className="mt-3 text-balance text-4xl font-bold sm:text-5xl">Questions, answered.</h2>
        </div>
        <div className="mt-10 glass rounded-3xl p-2 sm:p-4">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((f, i) => (
              <AccordionItem key={f.q} value={`item-${i}`} className="border-border/60">
                <AccordionTrigger className="px-4 text-left text-base font-medium hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="px-4 text-muted-foreground">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
