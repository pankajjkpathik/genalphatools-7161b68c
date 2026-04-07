import { useState } from "react";
import { calculateWaterIntake } from "@/lib/calculators";

const WaterIntakeForm = () => {
  const [weight, setWeight] = useState("");
  const [activity, setActivity] = useState<"low" | "moderate" | "high">("moderate");
  const [hotClimate, setHotClimate] = useState(false);
  const [result, setResult] = useState<number | null>(null);

  const handleCalculate = () => {
    const w = parseFloat(weight);
    if (!w || w <= 0) return;
    setResult(calculateWaterIntake(w, activity, hotClimate));
  };

  return (
    <div className="bg-card rounded-xl border-2 border-border p-6 shadow-card">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1.5">Weight (kg)</label>
          <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="e.g. 70"
            className="w-full px-4 py-3 rounded-lg border border-input bg-background text-sm focus:ring-2 focus:ring-ring focus:outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Activity Level</label>
          <select value={activity} onChange={(e) => setActivity(e.target.value as "low" | "moderate" | "high")}
            className="w-full px-4 py-3 rounded-lg border border-input bg-background text-sm focus:ring-2 focus:ring-ring focus:outline-none">
            <option value="low">Low (desk job, minimal exercise)</option>
            <option value="moderate">Moderate (regular exercise)</option>
            <option value="high">High (intense daily exercise)</option>
          </select>
        </div>
        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <input type="checkbox" checked={hotClimate} onChange={(e) => setHotClimate(e.target.checked)}
            className="rounded border-input" />
          Hot / Humid Climate
        </label>
        <button onClick={handleCalculate} className="w-full bg-primary text-primary-foreground font-bold py-3 rounded-lg text-base hover:opacity-90 transition-opacity shadow-soft">
          ⚡ Calculate Water Intake Now
        </button>
      </div>
      {result !== null && (
        <div className="mt-6 p-6 rounded-xl border-2 border-primary/30 bg-primary/5 animate-fade-in text-center shadow-elevated">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2 font-semibold">Your Daily Water Intake</p>
          <span className="text-5xl font-heading font-bold text-primary">{result}</span>
          <p className="text-sm text-muted-foreground mt-1">ml per day</p>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="p-3 rounded-lg bg-muted">
              <p className="text-2xl font-heading font-bold text-foreground">{(result / 1000).toFixed(1)}</p>
              <p className="text-xs text-muted-foreground">litres</p>
            </div>
            <div className="p-3 rounded-lg bg-muted">
              <p className="text-2xl font-heading font-bold text-foreground">{Math.round(result / 250)}</p>
              <p className="text-xs text-muted-foreground">glasses (250ml)</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-4">💡 Share your result or try related calculators below!</p>
        </div>
      )}
    </div>
  );
};

export default WaterIntakeForm;
