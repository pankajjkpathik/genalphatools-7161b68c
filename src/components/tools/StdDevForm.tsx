import { useState } from "react";
import { parseNumbers, mean, stdDev, variance, round } from "@/lib/stats";

const StdDevForm = () => {
  const [input, setInput] = useState("");
  const [type, setType] = useState<"sample" | "population">("sample");
  const [result, setResult] = useState<{ mean: number; sd: number; var: number; count: number } | null>(null);

  const calc = () => {
    const a = parseNumbers(input);
    if (a.length < 2) { setResult(null); return; }
    setResult({
      count: a.length,
      mean: round(mean(a), 4),
      sd: round(stdDev(a, type === "sample"), 4),
      var: round(variance(a, type === "sample"), 4),
    });
  };

  return (
    <div className="bg-card rounded-xl border-2 border-border p-6 shadow-card">
      <label className="block text-sm font-medium mb-1.5">Enter numbers</label>
      <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="e.g. 4, 8, 6, 5, 3, 7" rows={4}
        className="w-full px-4 py-3 rounded-lg border border-input bg-background text-sm font-mono focus:ring-2 focus:ring-ring focus:outline-none" />
      <div className="mt-4">
        <label className="block text-sm font-medium mb-1.5">Data type</label>
        <select value={type} onChange={(e) => setType(e.target.value as "sample" | "population")}
          className="w-full px-4 py-3 rounded-lg border border-input bg-background text-sm">
          <option value="sample">Sample (divide by n−1)</option>
          <option value="population">Population (divide by n)</option>
        </select>
      </div>
      <button onClick={calc} className="mt-4 w-full bg-primary text-primary-foreground font-bold py-3 rounded-lg hover:opacity-90">
        ⚡ Calculate Standard Deviation
      </button>
      {result && (
        <div className="mt-6 p-6 rounded-xl border-2 border-primary/30 bg-primary/5 animate-fade-in text-center">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2 font-semibold">Standard Deviation</p>
          <span className="text-5xl font-heading font-bold text-primary">{result.sd}</span>
          <div className="mt-4 grid grid-cols-3 gap-2 text-center">
            <div className="bg-card rounded-lg p-2"><p className="text-xs text-muted-foreground">Mean</p><p className="font-bold">{result.mean}</p></div>
            <div className="bg-card rounded-lg p-2"><p className="text-xs text-muted-foreground">Variance</p><p className="font-bold">{result.var}</p></div>
            <div className="bg-card rounded-lg p-2"><p className="text-xs text-muted-foreground">Count</p><p className="font-bold">{result.count}</p></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StdDevForm;
