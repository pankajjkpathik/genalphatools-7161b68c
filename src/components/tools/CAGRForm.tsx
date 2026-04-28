import { useState } from "react";
import { cagr, round } from "@/lib/stats";

const CAGRForm = () => {
  const [begin, setBegin] = useState("");
  const [end, setEnd] = useState("");
  const [years, setYears] = useState("");
  const [result, setResult] = useState<{ cagr: number; multiplier: number } | null>(null);

  const calc = () => {
    const b = parseFloat(begin), e = parseFloat(end), y = parseFloat(years);
    if (!Number.isFinite(b) || b <= 0 || !Number.isFinite(e) || e <= 0 || !Number.isFinite(y) || y <= 0) {
      setResult(null); return;
    }
    setResult({ cagr: round(cagr(b, e, y), 2), multiplier: round(e / b, 2) });
  };

  return (
    <div className="bg-card rounded-xl border-2 border-border p-6 shadow-card">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div><label className="block text-sm font-medium mb-1.5">Beginning value ($)</label><input type="number" value={begin} onChange={(e) => setBegin(e.target.value)} placeholder="10000" className="w-full px-4 py-3 rounded-lg border border-input bg-background text-sm" /></div>
        <div><label className="block text-sm font-medium mb-1.5">Ending value ($)</label><input type="number" value={end} onChange={(e) => setEnd(e.target.value)} placeholder="22000" className="w-full px-4 py-3 rounded-lg border border-input bg-background text-sm" /></div>
        <div><label className="block text-sm font-medium mb-1.5">Years</label><input type="number" value={years} onChange={(e) => setYears(e.target.value)} placeholder="5" className="w-full px-4 py-3 rounded-lg border border-input bg-background text-sm" /></div>
      </div>
      <button onClick={calc} className="mt-4 w-full bg-primary text-primary-foreground font-bold py-3 rounded-lg hover:opacity-90">⚡ Calculate CAGR</button>
      {result && (
        <div className="mt-6 p-6 rounded-xl border-2 border-primary/30 bg-primary/5 animate-fade-in text-center">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2 font-semibold">Compound Annual Growth Rate</p>
          <span className="text-5xl font-heading font-bold text-primary">{result.cagr}%</span>
          <p className="mt-3 text-sm text-muted-foreground">Your investment grew <strong>{result.multiplier}x</strong> over the period.</p>
        </div>
      )}
    </div>
  );
};

export default CAGRForm;
