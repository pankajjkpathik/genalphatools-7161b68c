import { useState } from "react";
import { roi, round } from "@/lib/stats";

const ROIForm = () => {
  const [cost, setCost] = useState("");
  const [gain, setGain] = useState("");
  const [years, setYears] = useState("1");
  const [result, setResult] = useState<{ roi: number; net: number; annualized: number | null } | null>(null);

  const calc = () => {
    const c = parseFloat(cost), g = parseFloat(gain), y = parseFloat(years);
    if (!Number.isFinite(c) || c <= 0 || !Number.isFinite(g)) { setResult(null); return; }
    const r = roi(g, c);
    const annualized = y > 0 ? (Math.pow(g / c, 1 / y) - 1) * 100 : null;
    setResult({ roi: round(r, 2), net: round(g - c, 2), annualized: annualized !== null ? round(annualized, 2) : null });
  };

  return (
    <div className="bg-card rounded-xl border-2 border-border p-6 shadow-card">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div><label className="block text-sm font-medium mb-1.5">Initial investment ($)</label><input type="number" value={cost} onChange={(e) => setCost(e.target.value)} placeholder="10000" className="w-full px-4 py-3 rounded-lg border border-input bg-background text-sm" /></div>
        <div><label className="block text-sm font-medium mb-1.5">Final value ($)</label><input type="number" value={gain} onChange={(e) => setGain(e.target.value)} placeholder="14000" className="w-full px-4 py-3 rounded-lg border border-input bg-background text-sm" /></div>
        <div><label className="block text-sm font-medium mb-1.5">Years held</label><input type="number" value={years} onChange={(e) => setYears(e.target.value)} placeholder="3" className="w-full px-4 py-3 rounded-lg border border-input bg-background text-sm" /></div>
      </div>
      <button onClick={calc} className="mt-4 w-full bg-primary text-primary-foreground font-bold py-3 rounded-lg hover:opacity-90">⚡ Calculate ROI</button>
      {result && (
        <div className="mt-6 p-6 rounded-xl border-2 border-primary/30 bg-primary/5 animate-fade-in text-center">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2 font-semibold">Return on Investment</p>
          <span className={`text-5xl font-heading font-bold ${result.roi >= 0 ? "text-accent" : "text-destructive"}`}>{result.roi}%</span>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <div className="bg-card rounded-lg p-3"><p className="text-xs text-muted-foreground">Net profit</p><p className={`font-bold text-lg ${result.net >= 0 ? "text-accent" : "text-destructive"}`}>${result.net.toLocaleString()}</p></div>
            {result.annualized !== null && <div className="bg-card rounded-lg p-3"><p className="text-xs text-muted-foreground">Annualized return</p><p className="font-bold text-lg">{result.annualized}%</p></div>}
          </div>
        </div>
      )}
    </div>
  );
};

export default ROIForm;
