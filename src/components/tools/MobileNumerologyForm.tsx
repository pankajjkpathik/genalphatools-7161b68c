import { useState } from "react";
import { calculateMobileNumber, numberMeanings } from "@/lib/calculators";

const MobileNumerologyForm = () => {
  const [number, setNumber] = useState("");
  const [result, setResult] = useState<number | null>(null);

  const handleCalculate = () => {
    const digits = number.replace(/\D/g, "");
    if (digits.length < 4) return;
    setResult(calculateMobileNumber(digits));
  };

  const meaning = result ? numberMeanings[result] : null;

  return (
    <div className="bg-card rounded-xl border-2 border-border p-6 shadow-card">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1.5">Enter Mobile Number</label>
          <input type="tel" value={number} onChange={(e) => setNumber(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleCalculate()}
            placeholder="e.g. 9876543210"
            className="w-full px-4 py-3 rounded-lg border border-input bg-background text-sm focus:ring-2 focus:ring-ring focus:outline-none" />
        </div>
        <button onClick={handleCalculate} className="w-full bg-primary text-primary-foreground font-bold py-3 rounded-lg text-base hover:opacity-90 transition-opacity shadow-soft">
          ⚡ Check Number Energy Now
        </button>
      </div>
      {result !== null && meaning && (
        <div className="mt-6 p-6 rounded-xl border-2 border-primary/30 bg-primary/5 animate-fade-in text-center shadow-elevated">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2 font-semibold">Your Number Energy</p>
          <span className="text-5xl font-heading font-bold text-primary">{result}</span>
          <p className="font-heading font-bold text-xl mt-2">{meaning.title}</p>
          <p className="text-sm text-muted-foreground mt-3"><strong>Traits:</strong> {meaning.traits}</p>
          <p className="text-sm text-muted-foreground mt-2">{meaning.description}</p>
          <p className="text-xs text-muted-foreground mt-4">💡 Share your result or try related calculators below!</p>
        </div>
      )}
    </div>
  );
};

export default MobileNumerologyForm;
