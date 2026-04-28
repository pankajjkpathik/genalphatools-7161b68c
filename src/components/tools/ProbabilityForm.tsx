import { useState } from "react";
import { binomialProbability, combinations, round } from "@/lib/stats";

const ProbabilityForm = () => {
  const [n, setN] = useState("10");
  const [k, setK] = useState("3");
  const [p, setP] = useState("0.5");
  const [result, setResult] = useState<{ exact: number; cumulative: number; combos: number } | null>(null);

  const calc = () => {
    const N = parseInt(n), K = parseInt(k), P = parseFloat(p);
    if (!Number.isFinite(N) || !Number.isFinite(K) || !Number.isFinite(P) || P < 0 || P > 1 || K > N || N < 0) {
      setResult(null); return;
    }
    let cumulative = 0;
    for (let i = 0; i <= K; i++) cumulative += binomialProbability(N, i, P);
    setResult({
      exact: round(binomialProbability(N, K, P) * 100, 4),
      cumulative: round(cumulative * 100, 4),
      combos: combinations(N, K),
    });
  };

  return (
    <div className="bg-card rounded-xl border-2 border-border p-6 shadow-card">
      <p className="text-sm text-muted-foreground mb-4">Binomial probability: chance of exactly k successes in n independent trials, each with probability p.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div><label className="block text-sm font-medium mb-1.5">Trials (n)</label><input type="number" value={n} onChange={(e) => setN(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-input bg-background text-sm" /></div>
        <div><label className="block text-sm font-medium mb-1.5">Successes (k)</label><input type="number" value={k} onChange={(e) => setK(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-input bg-background text-sm" /></div>
        <div><label className="block text-sm font-medium mb-1.5">Probability (p)</label><input type="number" step="0.01" min="0" max="1" value={p} onChange={(e) => setP(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-input bg-background text-sm" /></div>
      </div>
      <button onClick={calc} className="mt-4 w-full bg-primary text-primary-foreground font-bold py-3 rounded-lg hover:opacity-90">⚡ Calculate Probability</button>
      {result && (
        <div className="mt-6 p-6 rounded-xl border-2 border-primary/30 bg-primary/5 animate-fade-in text-center">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2 font-semibold">P(X = {k})</p>
          <span className="text-5xl font-heading font-bold text-primary">{result.exact}%</span>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <div className="bg-card rounded-lg p-3"><p className="text-xs text-muted-foreground">P(X ≤ {k}) cumulative</p><p className="font-bold text-lg">{result.cumulative}%</p></div>
            <div className="bg-card rounded-lg p-3"><p className="text-xs text-muted-foreground">Combinations C(n,k)</p><p className="font-bold text-lg">{result.combos.toLocaleString()}</p></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProbabilityForm;
