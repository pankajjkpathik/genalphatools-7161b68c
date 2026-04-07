import { useState } from "react";
import { calculateIdealWeight } from "@/lib/calculators";

const IdealWeightForm = () => {
  const [height, setHeight] = useState("");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [result, setResult] = useState<{ ideal: number; range: string } | null>(null);

  const handleCalculate = () => {
    const h = parseFloat(height);
    if (!h || h < 100 || h > 250) return;
    setResult(calculateIdealWeight(h, gender));
  };

  return (
    <div className="bg-card rounded-xl border-2 border-border p-6 shadow-card">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1.5">Height (cm)</label>
          <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="e.g. 170"
            className="w-full px-4 py-3 rounded-lg border border-input bg-background text-sm focus:ring-2 focus:ring-ring focus:outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Gender</label>
          <select value={gender} onChange={(e) => setGender(e.target.value as "male" | "female")}
            className="w-full px-4 py-3 rounded-lg border border-input bg-background text-sm focus:ring-2 focus:ring-ring focus:outline-none">
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <button onClick={handleCalculate} className="w-full bg-primary text-primary-foreground font-bold py-3 rounded-lg text-base hover:opacity-90 transition-opacity shadow-soft">
          ⚡ Calculate Ideal Weight Now
        </button>
      </div>
      {result && (
        <div className="mt-6 p-6 rounded-xl border-2 border-primary/30 bg-primary/5 animate-fade-in text-center shadow-elevated">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2 font-semibold">Your Ideal Weight</p>
          <span className="text-5xl font-heading font-bold text-primary">{result.ideal}</span>
          <p className="text-sm text-muted-foreground mt-1">kg (ideal)</p>
          <div className="mt-4 p-3 rounded-lg bg-accent/10 ring-2 ring-accent/30">
            <p className="text-xs text-muted-foreground font-medium">Healthy Range</p>
            <p className="text-xl font-heading font-bold text-accent">{result.range}</p>
          </div>
          <p className="text-xs text-muted-foreground mt-4">💡 Share your result or try related calculators below!</p>
        </div>
      )}
    </div>
  );
};

export default IdealWeightForm;
