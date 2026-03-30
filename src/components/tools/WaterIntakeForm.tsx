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
    <div className="bg-card rounded-lg border border-border p-6 shadow-card">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1.5">Weight (kg)</label>
          <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="e.g. 70"
            className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-sm focus:ring-2 focus:ring-ring focus:outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Activity Level</label>
          <select value={activity} onChange={(e) => setActivity(e.target.value as "low" | "moderate" | "high")}
            className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-sm focus:ring-2 focus:ring-ring focus:outline-none">
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
        <button onClick={handleCalculate} className="w-full gradient-health text-accent-foreground font-semibold py-2.5 rounded-lg text-sm hover:opacity-90 transition-opacity">
          Calculate Water Intake
        </button>
      </div>
      {result !== null && (
        <div className="mt-6 p-5 bg-muted rounded-lg animate-fade-in text-center">
          <span className="text-4xl font-heading font-bold">{result}</span>
          <p className="text-sm text-muted-foreground mt-1">ml per day</p>
          <p className="text-lg font-heading font-semibold mt-2">{(result / 1000).toFixed(1)} litres</p>
          <p className="text-xs text-muted-foreground mt-2">≈ {Math.round(result / 250)} glasses (250ml each)</p>
        </div>
      )}
    </div>
  );
};

export default WaterIntakeForm;
