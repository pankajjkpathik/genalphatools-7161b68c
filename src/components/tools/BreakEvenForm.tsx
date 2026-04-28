import { useState } from "react";
import { breakEven, round } from "@/lib/stats";

const BreakEvenForm = () => {
  const [fixed, setFixed] = useState("");
  const [price, setPrice] = useState("");
  const [variable, setVariable] = useState("");
  const [result, setResult] = useState<{ units: number; revenue: number; cm: number } | null>(null);
  const [error, setError] = useState("");

  const calc = () => {
    setError("");
    const f = parseFloat(fixed), p = parseFloat(price), v = parseFloat(variable);
    if (![f, p, v].every(Number.isFinite) || f < 0 || p <= 0 || v < 0) { setResult(null); return; }
    const r = breakEven(f, p, v);
    if (!r) { setError("Variable cost must be less than price per unit, otherwise you never break even."); setResult(null); return; }
    setResult({ units: Math.ceil(r.units), revenue: round(r.revenue, 2), cm: round(r.contributionMargin, 2) });
  };

  return (
    <div className="bg-card rounded-xl border-2 border-border p-6 shadow-card">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div><label className="block text-sm font-medium mb-1.5">Fixed costs ($)</label><input type="number" value={fixed} onChange={(e) => setFixed(e.target.value)} placeholder="50000" className="w-full px-4 py-3 rounded-lg border border-input bg-background text-sm" /></div>
        <div><label className="block text-sm font-medium mb-1.5">Price per unit ($)</label><input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="100" className="w-full px-4 py-3 rounded-lg border border-input bg-background text-sm" /></div>
        <div><label className="block text-sm font-medium mb-1.5">Variable cost / unit ($)</label><input type="number" value={variable} onChange={(e) => setVariable(e.target.value)} placeholder="40" className="w-full px-4 py-3 rounded-lg border border-input bg-background text-sm" /></div>
      </div>
      <button onClick={calc} className="mt-4 w-full bg-primary text-primary-foreground font-bold py-3 rounded-lg hover:opacity-90">⚡ Calculate Break-Even</button>
      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}
      {result && (
        <div className="mt-6 p-6 rounded-xl border-2 border-primary/30 bg-primary/5 animate-fade-in text-center">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2 font-semibold">Break-Even Point</p>
          <span className="text-5xl font-heading font-bold text-primary">{result.units.toLocaleString()}</span>
          <p className="text-sm text-muted-foreground mt-1">units to sell</p>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <div className="bg-card rounded-lg p-3"><p className="text-xs text-muted-foreground">Revenue at break-even</p><p className="font-bold text-lg">${result.revenue.toLocaleString()}</p></div>
            <div className="bg-card rounded-lg p-3"><p className="text-xs text-muted-foreground">Contribution margin</p><p className="font-bold text-lg">${result.cm}/unit</p></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BreakEvenForm;
