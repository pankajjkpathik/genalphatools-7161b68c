import { useState } from "react";
import { calculateLifePath, numberMeanings } from "@/lib/calculators";

const LifePathForm = () => {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [result, setResult] = useState<number | null>(null);

  const handleCalculate = () => {
    const d = parseInt(day), m = parseInt(month), y = parseInt(year);
    if (!d || !m || !y || d < 1 || d > 31 || m < 1 || m > 12 || y < 1900 || y > 2100) return;
    setResult(calculateLifePath(d, m, y));
  };

  const meaning = result ? numberMeanings[result] : null;

  return (
    <div className="bg-card rounded-xl border-2 border-border p-6 shadow-card">
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-sm font-medium mb-1.5">Day</label>
            <input type="number" value={day} onChange={(e) => setDay(e.target.value)} placeholder="DD" min={1} max={31}
              className="w-full px-4 py-3 rounded-lg border border-input bg-background text-sm focus:ring-2 focus:ring-ring focus:outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Month</label>
            <input type="number" value={month} onChange={(e) => setMonth(e.target.value)} placeholder="MM" min={1} max={12}
              className="w-full px-4 py-3 rounded-lg border border-input bg-background text-sm focus:ring-2 focus:ring-ring focus:outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Year</label>
            <input type="number" value={year} onChange={(e) => setYear(e.target.value)} placeholder="YYYY" min={1900} max={2100}
              className="w-full px-4 py-3 rounded-lg border border-input bg-background text-sm focus:ring-2 focus:ring-ring focus:outline-none" />
          </div>
        </div>
        <button onClick={handleCalculate} className="w-full bg-primary text-primary-foreground font-bold py-3 rounded-lg text-base hover:opacity-90 transition-opacity shadow-soft">
          ⚡ Calculate Life Path Now
        </button>
      </div>
      {result !== null && meaning && (
        <div className="mt-6 p-6 rounded-xl border-2 border-primary/30 bg-primary/5 animate-fade-in text-center shadow-elevated">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2 font-semibold">Your Life Path Number</p>
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

export default LifePathForm;
