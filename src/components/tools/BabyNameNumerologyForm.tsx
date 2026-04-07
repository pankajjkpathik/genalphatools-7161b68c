import { useState } from "react";
import { calculateNameNumber, numberMeanings } from "@/lib/calculators";

const BabyNameNumerologyForm = () => {
  const [name, setName] = useState("");
  const [result, setResult] = useState<number | null>(null);

  const handleCalculate = () => {
    if (!name.trim()) return;
    setResult(calculateNameNumber(name));
  };

  const meaning = result ? numberMeanings[result] : null;

  return (
    <div className="bg-card rounded-xl border-2 border-border p-6 shadow-card">
      <div className="space-y-4">
        <div>
          <label htmlFor="baby-name" className="block text-sm font-medium mb-1.5">Enter Baby Name</label>
          <input
            id="baby-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleCalculate()}
            placeholder="e.g. Aarav"
            className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground text-sm focus:ring-2 focus:ring-ring focus:outline-none"
          />
        </div>
        <button onClick={handleCalculate} className="w-full bg-primary text-primary-foreground font-bold py-3 rounded-lg text-base hover:opacity-90 transition-opacity shadow-soft">
          ⚡ Analyze Baby Name Now
        </button>
      </div>
      {result !== null && meaning && (
        <div className="mt-6 p-6 rounded-xl border-2 border-primary/30 bg-primary/5 animate-fade-in text-center shadow-elevated">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2 font-semibold">Baby Name Number</p>
          <span className="text-5xl font-heading font-bold text-primary">{result}</span>
          <p className="font-heading font-bold text-xl mt-2">{meaning.title}</p>
          <p className="text-sm text-muted-foreground mt-3"><strong>Traits:</strong> {meaning.traits}</p>
          <p className="text-sm text-muted-foreground mt-2">{meaning.description}</p>
          <div className="mt-4 p-3 rounded-lg bg-accent/10 ring-2 ring-accent/30">
            <p className="text-sm text-muted-foreground">
              <strong className="text-accent">For your baby:</strong> The name "{name}" vibrates with the energy of number {result}.
              {result <= 5 ? " This energy supports early independence and creativity." : " This energy nurtures stability and compassion."}
            </p>
          </div>
          <p className="text-xs text-muted-foreground mt-4">💡 Share your result or try related calculators below!</p>
        </div>
      )}
    </div>
  );
};

export default BabyNameNumerologyForm;
