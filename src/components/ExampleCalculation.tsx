interface ExampleCalculationProps {
  example: string;
}

const ExampleCalculation = ({ example }: ExampleCalculationProps) => (
  <section className="mt-10">
    <h2 className="font-heading font-bold text-xl mb-3">Example Calculation</h2>
    <div className="bg-card border border-border rounded-lg p-5 text-sm text-muted-foreground leading-relaxed">
      <span className="text-primary font-semibold mr-1">📐</span>
      {example}
    </div>
  </section>
);

export default ExampleCalculation;
