import { useState } from "react";
import { parseNumbers, mean, median, mode, round } from "@/lib/stats";

const StatsCalculatorForm = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<{
    count: number; mean: number; median: number; mode: string; sum: number; min: number; max: number;
  } | null>(null);

  const calc = () => {
    const a = parseNumbers(input);
    if (a.length === 0) { setResult(null); return; }
    const m = mode(a);
    setResult({
      count: a.length,
      mean: round(mean(a), 4),
      median: round(median(a), 4),
      mode: m.length === 0 ? "No mode" : m.join(", "),
      sum: round(a.reduce((s, x) => s + x, 0), 4),
      min: Math.min(...a),
      max: Math.max(...a),
    });
  };

  return (
    <div className="bg-card rounded-xl border-2 border-border p-6 shadow-card">
      <label className="block text-sm font-medium mb-1.5">Enter numbers (comma, space, or newline separated)</label>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="e.g. 12, 15, 18, 22, 22, 25, 30"
        rows={4}
        className="w-full px-4 py-3 rounded-lg border border-input bg-background text-sm focus:ring-2 focus:ring-ring focus:outline-none font-mono"
      />
      <button onClick={calc} className="mt-4 w-full bg-primary text-primary-foreground font-bold py-3 rounded-lg hover:opacity-90 transition-opacity">
        ⚡ Calculate Mean, Median, Mode
      </button>
      {result && (
        <div className="mt-6 p-6 rounded-xl border-2 border-primary/30 bg-primary/5 animate-fade-in">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3 font-semibold">Results ({result.count} values)</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-center">
            <div className="bg-card rounded-lg p-3"><p className="text-xs text-muted-foreground">Mean</p><p className="font-heading font-bold text-xl text-primary">{result.mean}</p></div>
            <div className="bg-card rounded-lg p-3"><p className="text-xs text-muted-foreground">Median</p><p className="font-heading font-bold text-xl text-primary">{result.median}</p></div>
            <div className="bg-card rounded-lg p-3"><p className="text-xs text-muted-foreground">Mode</p><p className="font-heading font-bold text-base text-primary">{result.mode}</p></div>
            <div className="bg-card rounded-lg p-3"><p className="text-xs text-muted-foreground">Sum</p><p className="font-heading font-bold text-lg">{result.sum}</p></div>
            <div className="bg-card rounded-lg p-3"><p className="text-xs text-muted-foreground">Min</p><p className="font-heading font-bold text-lg">{result.min}</p></div>
            <div className="bg-card rounded-lg p-3"><p className="text-xs text-muted-foreground">Max</p><p className="font-heading font-bold text-lg">{result.max}</p></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StatsCalculatorForm;
