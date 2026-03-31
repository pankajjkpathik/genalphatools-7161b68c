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
    <div className="bg-card rounded-xl border-2 border-border p-6 shadow-card">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1.5">Weight (kg)</label>
          <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="e.g. 70"
            className="w-full px-4 py-3 rounded-lg border border-input bg-background text-sm focus:ring-2 focus:ring-ring focus:outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Height (cm)</label>
          <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="e.g. 170"
            className="w-full px-4 py-3 rounded-lg border border-input bg-background text-sm focus:ring-2 focus:ring-ring focus:outline-none" />
        </div>
        <button onClick={handleCalculate} className="w-full bg-primary text-primary-foreground font-bold py-3 rounded-lg text-base hover:opacity-90 transition-opacity shadow-soft">
          ⚡ Calculate BMI Now
        </button>
      </div>
      {result && (
        <div className="mt-6 p-6 rounded-xl border-2 border-primary/30 bg-primary/5 animate-fade-in text-center shadow-elevated">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2 font-semibold">Your BMI Result</p>
          <span className="text-5xl font-heading font-bold text-primary">{result.bmi}</span>
          <p className={`font-heading font-bold text-xl mt-2 ${result.color}`}>{result.category}</p>
          <div className="mt-4 grid grid-cols-4 gap-1 text-xs">
            <div className={`py-2 rounded-lg ${result.category === "Underweight" ? "bg-secondary/20 font-bold ring-2 ring-secondary/40" : "bg-muted"}`}>{"<18.5"}<br /><span className="text-[10px]">Under</span></div>
            <div className={`py-2 rounded-lg ${result.category === "Normal" ? "bg-accent/20 font-bold ring-2 ring-accent/40" : "bg-muted"}`}>18.5-24.9<br /><span className="text-[10px]">Normal</span></div>
            <div className={`py-2 rounded-lg ${result.category === "Overweight" ? "bg-primary/20 font-bold ring-2 ring-primary/40" : "bg-muted"}`}>25-29.9<br /><span className="text-[10px]">Over</span></div>
            <div className={`py-2 rounded-lg ${result.category === "Obese" ? "bg-destructive/20 font-bold ring-2 ring-destructive/40" : "bg-muted"}`}>30+<br /><span className="text-[10px]">Obese</span></div>
          </div>
          <p className="text-xs text-muted-foreground mt-4">💡 Share your result or try related calculators below!</p>
        </div>
      )}
    </div>
  );
};

export default BMIForm;
