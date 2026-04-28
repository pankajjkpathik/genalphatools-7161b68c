import { useState } from "react";
import { abTest, round } from "@/lib/stats";

const ABTestForm = () => {
  const [vA, setVA] = useState(""); const [cA, setCA] = useState("");
  const [vB, setVB] = useState(""); const [cB, setCB] = useState("");
  const [r, setR] = useState<ReturnType<typeof abTest> | null>(null);

  const calc = () => {
    const a = parseInt(vA), b = parseInt(cA), c = parseInt(vB), d = parseInt(cB);
    if (![a, b, c, d].every(Number.isFinite) || a <= 0 || c <= 0 || b < 0 || d < 0 || b > a || d > c) { setR(null); return; }
    setR(abTest(a, b, c, d));
  };

  return (
    <div className="bg-card rounded-xl border-2 border-border p-6 shadow-card">
      <p className="text-sm text-muted-foreground mb-4">Compare two variants using a two-proportion z-test. p &lt; 0.05 means the difference is statistically significant.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-muted/40 rounded-lg p-4 space-y-3">
          <h3 className="font-bold text-sm">Variant A (Control)</h3>
          <div><label className="block text-xs mb-1">Visitors</label><input type="number" value={vA} onChange={(e) => setVA(e.target.value)} placeholder="5000" className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm" /></div>
          <div><label className="block text-xs mb-1">Conversions</label><input type="number" value={cA} onChange={(e) => setCA(e.target.value)} placeholder="250" className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm" /></div>
        </div>
        <div className="bg-muted/40 rounded-lg p-4 space-y-3">
          <h3 className="font-bold text-sm">Variant B (Test)</h3>
          <div><label className="block text-xs mb-1">Visitors</label><input type="number" value={vB} onChange={(e) => setVB(e.target.value)} placeholder="5000" className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm" /></div>
          <div><label className="block text-xs mb-1">Conversions</label><input type="number" value={cB} onChange={(e) => setCB(e.target.value)} placeholder="295" className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm" /></div>
        </div>
      </div>
      <button onClick={calc} className="mt-4 w-full bg-primary text-primary-foreground font-bold py-3 rounded-lg hover:opacity-90">⚡ Run A/B Test</button>
      {r && (
        <div className={`mt-6 p-6 rounded-xl border-2 animate-fade-in ${r.significant ? "border-accent/40 bg-accent/5" : "border-border bg-muted/30"}`}>
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2 font-semibold text-center">Result</p>
          <p className="text-center text-2xl font-heading font-bold mb-3">
            {r.significant ? "✅ Statistically Significant" : "❌ Not Significant"}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-center">
            <div className="bg-card rounded-lg p-3"><p className="text-xs text-muted-foreground">A rate</p><p className="font-bold">{round(r.pA, 2)}%</p></div>
            <div className="bg-card rounded-lg p-3"><p className="text-xs text-muted-foreground">B rate</p><p className="font-bold">{round(r.pB, 2)}%</p></div>
            <div className="bg-card rounded-lg p-3"><p className="text-xs text-muted-foreground">Lift</p><p className={`font-bold ${r.lift >= 0 ? "text-accent" : "text-destructive"}`}>{round(r.lift, 2)}%</p></div>
            <div className="bg-card rounded-lg p-3"><p className="text-xs text-muted-foreground">p-value</p><p className="font-bold">{r.pValue < 0.0001 ? "<0.0001" : round(r.pValue, 4)}</p></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ABTestForm;
