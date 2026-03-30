import { useState } from "react";
import { calculateBMI } from "@/lib/calculators";

const BMIForm = () => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [result, setResult] = useState<{ bmi: number; category: string; color: string } | null>(null);

  const handleCalculate = () => {
    const w = parseFloat(weight), h = parseFloat(height);
    if (!w || !h || w <= 0 || h <= 0) return;
    setResult(calculateBMI(w, h));
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
          <label className="block text-sm font-medium mb-1.5">Height (cm)</label>
          <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="e.g. 170"
            className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-sm focus:ring-2 focus:ring-ring focus:outline-none" />
        </div>
        <button onClick={handleCalculate} className="w-full gradient-health text-accent-foreground font-semibold py-2.5 rounded-lg text-sm hover:opacity-90 transition-opacity">
          Calculate BMI
        </button>
      </div>
      {result && (
        <div className="mt-6 p-5 bg-muted rounded-lg animate-fade-in text-center">
          <span className="text-4xl font-heading font-bold">{result.bmi}</span>
          <p className={`font-heading font-semibold text-lg mt-1 ${result.color}`}>{result.category}</p>
          <div className="mt-3 grid grid-cols-4 gap-1 text-xs">
            <div className={`py-1 rounded ${result.category === "Underweight" ? "bg-secondary/20 font-bold" : "bg-muted"}`}>{"<18.5"}</div>
            <div className={`py-1 rounded ${result.category === "Normal" ? "bg-accent/20 font-bold" : "bg-muted"}`}>18.5-24.9</div>
            <div className={`py-1 rounded ${result.category === "Overweight" ? "bg-primary/20 font-bold" : "bg-muted"}`}>25-29.9</div>
            <div className={`py-1 rounded ${result.category === "Obese" ? "bg-destructive/20 font-bold" : "bg-muted"}`}>30+</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BMIForm;
