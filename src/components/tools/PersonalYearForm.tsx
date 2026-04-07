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
    <div className="bg-card rounded-xl border-2 border-border p-6 shadow-card">
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">Enter your birth day & month. We'll calculate for {currentYear}.</p>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium mb-1.5">Birth Day</label>
            <input type="number" value={day} onChange={(e) => setDay(e.target.value)} placeholder="DD" min={1} max={31}
              className="w-full px-4 py-3 rounded-lg border border-input bg-background text-sm focus:ring-2 focus:ring-ring focus:outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Birth Month</label>
            <input type="number" value={month} onChange={(e) => setMonth(e.target.value)} placeholder="MM" min={1} max={12}
              className="w-full px-4 py-3 rounded-lg border border-input bg-background text-sm focus:ring-2 focus:ring-ring focus:outline-none" />
          </div>
        </div>
        <button onClick={handleCalculate} className="w-full bg-primary text-primary-foreground font-bold py-3 rounded-lg text-base hover:opacity-90 transition-opacity shadow-soft">
          ⚡ Calculate Personal Year Now
        </button>
      </div>
      {result !== null && meaning && (
        <div className="mt-6 p-6 rounded-xl border-2 border-primary/30 bg-primary/5 animate-fade-in text-center shadow-elevated">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2 font-semibold">Your Personal Year for {currentYear}</p>
          <span className="text-5xl font-heading font-bold text-primary">{result}</span>
          <p className="font-heading font-bold text-xl mt-2">{meaning.title}</p>
          <p className="text-sm text-muted-foreground mt-3">{meaning.description}</p>
          <p className="text-xs text-muted-foreground mt-4">💡 Share your result or try related calculators below!</p>
        </div>
      )}
    </div>
  );
};

export default PersonalYearForm;
