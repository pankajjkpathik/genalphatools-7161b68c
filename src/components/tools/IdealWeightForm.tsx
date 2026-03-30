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
    <div className="bg-card rounded-lg border border-border p-6 shadow-card">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1.5">Height (cm)</label>
          <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="e.g. 170"
            className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-sm focus:ring-2 focus:ring-ring focus:outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Gender</label>
          <select value={gender} onChange={(e) => setGender(e.target.value as "male" | "female")}
            className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-sm focus:ring-2 focus:ring-ring focus:outline-none">
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <button onClick={handleCalculate} className="w-full gradient-health text-accent-foreground font-semibold py-2.5 rounded-lg text-sm hover:opacity-90 transition-opacity">
          Calculate Ideal Weight
        </button>
      </div>
      {result && (
        <div className="mt-6 p-5 bg-muted rounded-lg animate-fade-in text-center">
          <span className="text-4xl font-heading font-bold">{result.ideal}</span>
          <p className="text-sm text-muted-foreground mt-1">kg (ideal)</p>
          <p className="text-lg font-heading font-semibold mt-2 text-accent">Healthy Range: {result.range}</p>
        </div>
      )}
    </div>
  );
};

export default IdealWeightForm;
