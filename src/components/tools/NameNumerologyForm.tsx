import { useState } from "react";
import { calculateNameNumber, numberMeanings } from "@/lib/calculators";

const NameNumerologyForm = () => {
  const [name, setName] = useState("");
  const [result, setResult] = useState<number | null>(null);

  const handleCalculate = () => {
    if (!name.trim()) return;
    setResult(calculateNameNumber(name));
  };

  const meaning = result ? numberMeanings[result] : null;

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-card">
      <div className="space-y-4">
        <div>
          <label htmlFor="name-input" className="block text-sm font-medium mb-1.5">Enter Your Full Name</label>
          <input
            id="name-input"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleCalculate()}
            placeholder="e.g. Rahul Sharma"
            className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:ring-2 focus:ring-ring focus:outline-none"
          />
        </div>
        <button
          onClick={handleCalculate}
          className="w-full gradient-warm text-primary-foreground font-semibold py-2.5 rounded-lg text-sm hover:opacity-90 transition-opacity"
        >
          Calculate Name Number
        </button>
      </div>
      {result !== null && meaning && (
        <div className="mt-6 p-5 bg-muted rounded-lg animate-fade-in">
          <div className="text-center mb-3">
            <span className="text-4xl font-heading font-bold gradient-text">{result}</span>
            <p className="font-heading font-semibold text-lg mt-1">{meaning.title}</p>
          </div>
          <p className="text-sm text-muted-foreground mb-2"><strong>Traits:</strong> {meaning.traits}</p>
          <p className="text-sm text-muted-foreground">{meaning.description}</p>
        </div>
      )}
    </div>
  );
};

export default NameNumerologyForm;
