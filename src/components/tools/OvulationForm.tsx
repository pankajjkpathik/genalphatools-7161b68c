import { useState } from "react";

const OvulationForm = () => {
  const [lmpDate, setLmpDate] = useState("");
  const [cycleLength, setCycleLength] = useState("28");
  const [result, setResult] = useState<{ ovulationDate: Date; fertileStart: Date; fertileEnd: Date; nextPeriod: Date } | null>(null);

  const handleCalculate = () => {
    if (!lmpDate) return;
    const lmp = new Date(lmpDate);
    const cycle = parseInt(cycleLength) || 28;

    const ovulation = new Date(lmp);
    ovulation.setDate(ovulation.getDate() + cycle - 14);

    const fertileStart = new Date(ovulation);
    fertileStart.setDate(fertileStart.getDate() - 5);

    const fertileEnd = new Date(ovulation);
    fertileEnd.setDate(fertileEnd.getDate() + 1);

    const nextPeriod = new Date(lmp);
    nextPeriod.setDate(nextPeriod.getDate() + cycle);

    setResult({ ovulationDate: ovulation, fertileStart, fertileEnd, nextPeriod });
  };

  const fmt = (d: Date) => d.toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" });

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-card">
      <div className="space-y-4">
        <div>
          <label htmlFor="ov-lmp" className="block text-sm font-medium mb-1.5">First Day of Last Period</label>
          <input id="ov-lmp" type="date" value={lmpDate} onChange={e => setLmpDate(e.target.value)} className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:ring-2 focus:ring-ring focus:outline-none" />
        </div>
        <div>
          <label htmlFor="ov-cycle" className="block text-sm font-medium mb-1.5">Average Cycle Length (days)</label>
          <input id="ov-cycle" type="number" min="20" max="45" value={cycleLength} onChange={e => setCycleLength(e.target.value)} className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:ring-2 focus:ring-ring focus:outline-none" />
        </div>
        <button onClick={handleCalculate} className="w-full gradient-warm text-primary-foreground font-semibold py-2.5 rounded-lg text-sm hover:opacity-90 transition-opacity">
          Calculate Ovulation
        </button>
      </div>
      {result && (
        <div className="mt-6 p-5 bg-muted rounded-lg animate-fade-in">
          <div className="text-center mb-4">
            <p className="text-sm text-muted-foreground">Estimated Ovulation Date</p>
            <p className="text-2xl font-heading font-bold gradient-text mt-1">{fmt(result.ovulationDate)}</p>
          </div>
          <div className="space-y-3">
            <div className="p-3 bg-background rounded border border-border">
              <p className="text-sm font-medium text-foreground">🌸 Fertile Window</p>
              <p className="text-sm text-muted-foreground">{fmt(result.fertileStart)} – {fmt(result.fertileEnd)}</p>
            </div>
            <div className="p-3 bg-background rounded border border-border">
              <p className="text-sm font-medium text-foreground">📅 Next Expected Period</p>
              <p className="text-sm text-muted-foreground">{fmt(result.nextPeriod)}</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-4">Ovulation typically occurs 14 days before your next period. This is an estimate — consult your doctor for family planning.</p>
        </div>
      )}
    </div>
  );
};

export default OvulationForm;
