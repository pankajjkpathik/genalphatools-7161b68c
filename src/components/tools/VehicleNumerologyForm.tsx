import { useState } from "react";
import { calculateMobileNumber, numberMeanings } from "@/lib/calculators";

const VehicleNumerologyForm = () => {
  const [number, setNumber] = useState("");
  const [result, setResult] = useState<number | null>(null);

  const handleCalculate = () => {
    const digits = number.replace(/\D/g, "");
    if (digits.length < 1) return;
    setResult(calculateMobileNumber(digits));
  };

  const meaning = result ? numberMeanings[result] : null;

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-card">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1.5">Enter Vehicle Number</label>
          <input type="text" value={number} onChange={(e) => setNumber(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleCalculate()}
            placeholder="e.g. MH 12 AB 1234"
            className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-sm focus:ring-2 focus:ring-ring focus:outline-none" />
          <p className="text-xs text-muted-foreground mt-1">Only digits will be analyzed</p>
        </div>
        <button onClick={handleCalculate} className="w-full gradient-warm text-primary-foreground font-semibold py-2.5 rounded-lg text-sm hover:opacity-90 transition-opacity">
          Check Vehicle Number
        </button>
      </div>
      {result !== null && meaning && (
        <div className="mt-6 p-5 bg-muted rounded-lg animate-fade-in text-center">
          <span className="text-4xl font-heading font-bold gradient-text">{result}</span>
          <p className="font-heading font-semibold text-lg mt-1">{meaning.title}</p>
          <p className="text-sm text-muted-foreground mt-2">{meaning.description}</p>
        </div>
      )}
    </div>
  );
};

export default VehicleNumerologyForm;
