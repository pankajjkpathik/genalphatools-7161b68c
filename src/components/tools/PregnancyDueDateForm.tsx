import { useState } from "react";

const PregnancyDueDateForm = () => {
  const [lmpDate, setLmpDate] = useState("");
  const [cycleLength, setCycleLength] = useState("28");
  const [result, setResult] = useState<{ dueDate: Date; weeksPregnant: number; trimester: string } | null>(null);

  const handleCalculate = () => {
    if (!lmpDate) return;
    const lmp = new Date(lmpDate);
    const cycle = parseInt(cycleLength) || 28;
    const adjustment = cycle - 28;
    const due = new Date(lmp);
    due.setDate(due.getDate() + 280 + adjustment);

    const today = new Date();
    const diffMs = today.getTime() - lmp.getTime();
    const weeksPregnant = Math.max(0, Math.floor(diffMs / (7 * 24 * 60 * 60 * 1000)));

    let trimester = "Not yet pregnant";
    if (weeksPregnant >= 1 && weeksPregnant <= 12) trimester = "First Trimester";
    else if (weeksPregnant <= 27) trimester = "Second Trimester";
    else if (weeksPregnant <= 42) trimester = "Third Trimester";

    setResult({ dueDate: due, weeksPregnant, trimester });
  };

  const formatDate = (d: Date) => d.toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" });

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-card">
      <div className="space-y-4">
        <div>
          <label htmlFor="lmp" className="block text-sm font-medium mb-1.5">Last Menstrual Period (LMP)</label>
          <input id="lmp" type="date" value={lmpDate} onChange={e => setLmpDate(e.target.value)} className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:ring-2 focus:ring-ring focus:outline-none" />
        </div>
        <div>
          <label htmlFor="cycle" className="block text-sm font-medium mb-1.5">Average Cycle Length (days)</label>
          <input id="cycle" type="number" min="20" max="45" value={cycleLength} onChange={e => setCycleLength(e.target.value)} className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:ring-2 focus:ring-ring focus:outline-none" />
        </div>
        <button onClick={handleCalculate} className="w-full gradient-warm text-primary-foreground font-semibold py-2.5 rounded-lg text-sm hover:opacity-90 transition-opacity">
          Calculate Due Date
        </button>
      </div>
      {result && (
        <div className="mt-6 p-5 bg-muted rounded-lg animate-fade-in">
          <div className="text-center mb-4">
            <p className="text-sm text-muted-foreground">Your estimated due date is</p>
            <p className="text-2xl font-heading font-bold gradient-text mt-1">{formatDate(result.dueDate)}</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-background rounded border border-border text-center">
              <p className="text-2xl font-bold text-foreground">{result.weeksPregnant}</p>
              <p className="text-xs text-muted-foreground">Weeks Pregnant</p>
            </div>
            <div className="p-3 bg-background rounded border border-border text-center">
              <p className="text-sm font-bold text-foreground">{result.trimester}</p>
              <p className="text-xs text-muted-foreground">Current Stage</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-4">Based on Naegele's rule (LMP + 280 days). Consult your doctor for confirmation.</p>
        </div>
      )}
    </div>
  );
};

export default PregnancyDueDateForm;
