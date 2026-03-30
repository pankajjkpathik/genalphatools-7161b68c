import { useState } from "react";
import { calculatePersonalYear, numberMeanings } from "@/lib/calculators";

const PersonalYearForm = () => {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const currentYear = new Date().getFullYear();

  const handleCalculate = () => {
    const d = parseInt(day), m = parseInt(month);
    if (!d || !m || d < 1 || d > 31 || m < 1 || m > 12) return;
    setResult(calculatePersonalYear(d, m, currentYear));
  };

  const meaning = result ? numberMeanings[result] : null;

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-card">
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">Enter your birth day & month. We'll calculate for {currentYear}.</p>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium mb-1.5">Birth Day</label>
            <input type="number" value={day} onChange={(e) => setDay(e.target.value)} placeholder="DD" min={1} max={31}
              className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-sm focus:ring-2 focus:ring-ring focus:outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Birth Month</label>
            <input type="number" value={month} onChange={(e) => setMonth(e.target.value)} placeholder="MM" min={1} max={12}
              className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-sm focus:ring-2 focus:ring-ring focus:outline-none" />
          </div>
        </div>
        <button onClick={handleCalculate} className="w-full gradient-mystic text-secondary-foreground font-semibold py-2.5 rounded-lg text-sm hover:opacity-90 transition-opacity">
          Calculate Personal Year
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

export default PersonalYearForm;
