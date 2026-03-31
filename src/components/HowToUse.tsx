interface HowToUseProps {
  steps: string[];
}

const HowToUse = ({ steps }: HowToUseProps) => (
  <section className="mt-10">
    <h2 className="font-heading font-bold text-xl mb-4">How to Use This Calculator</h2>
    <ol className="space-y-3">
      {steps.map((step, i) => (
        <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
          <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
            {i + 1}
          </span>
          <span className="pt-0.5">{step}</span>
        </li>
      ))}
    </ol>
  </section>
);

export default HowToUse;
