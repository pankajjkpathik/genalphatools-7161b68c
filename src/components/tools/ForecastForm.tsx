import { useState } from "react";
import { parseNumbers, linearForecast, round } from "@/lib/stats";

const ForecastForm = () => {
  const [history, setHistory] = useState("");
  const [periods, setPeriods] = useState("3");
  const [result, setResult] = useState<{ forecast: number[]; trend: "up" | "down" | "flat" } | null>(null);

  const calc = () => {
    const a = parseNumbers(history);
    const p = parseInt(periods);
    if (a.length < 2 || !Number.isFinite(p) || p < 1 || p > 50) { setResult(null); return; }
    const f = linearForecast(a, p).map((x) => round(x, 2));
    const trend = f[f.length - 1] > a[a.length - 1] ? "up" : f[f.length - 1] < a[a.length - 1] ? "down" : "flat";
    setResult({ forecast: f, trend });
  };

  return (
    <div className="bg-card rounded-xl border-2 border-border p-6 shadow-card">
      <p className="text-sm text-muted-foreground mb-4">Enter your historical data (e.g. monthly revenue, weekly users). We'll project the next periods using linear regression.</p>
      <label className="block text-sm font-medium mb-1.5">Historical values</label>
      <textarea value={history} onChange={(e) => setHistory(e.target.value)} placeholder="100, 120, 145, 170, 195" rows={3}
        className="w-full px-4 py-3 rounded-lg border border-input bg-background text-sm font-mono" />
      <div className="mt-3">
        <label className="block text-sm font-medium mb-1.5">Periods to forecast (1–50)</label>
        <input type="number" value={periods} onChange={(e) => setPeriods(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-input bg-background text-sm" />
      </div>
      <button onClick={calc} className="mt-4 w-full bg-primary text-primary-foreground font-bold py-3 rounded-lg hover:opacity-90">⚡ Generate Forecast</button>
      {result && (
        <div className="mt-6 p-6 rounded-xl border-2 border-primary/30 bg-primary/5 animate-fade-in">
          <div className="text-center mb-4">
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2 font-semibold">Trend</p>
            <span className="text-3xl font-heading font-bold text-primary">
              {result.trend === "up" ? "📈 Upward" : result.trend === "down" ? "📉 Downward" : "➖ Flat"}
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {result.forecast.map((v, i) => (
              <div key={i} className="bg-card rounded-lg p-2 text-center">
                <p className="text-xs text-muted-foreground">Period {i + 1}</p>
                <p className="font-bold text-lg">{v.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ForecastForm;
