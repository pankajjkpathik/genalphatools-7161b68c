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
    <div className="bg-card rounded-xl border-2 border-border p-6 shadow-card">
      <div className="space-y-4">
        <div>
          <label htmlFor="ov-lmp" className="block text-sm font-medium mb-1.5">First Day of Last Period</label>
          <input id="ov-lmp" type="date" value={lmpDate} onChange={e => setLmpDate(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground text-sm focus:ring-2 focus:ring-ring focus:outline-none" />
        </div>
        <div>
          <label htmlFor="ov-cycle" className="block text-sm font-medium mb-1.5">Average Cycle Length (days)</label>
          <input id="ov-cycle" type="number" min="20" max="45" value={cycleLength} onChange={e => setCycleLength(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground text-sm focus:ring-2 focus:ring-ring focus:outline-none" />
        </div>
        <button onClick={handleCalculate} className="w-full bg-primary text-primary-foreground font-bold py-3 rounded-lg text-base hover:opacity-90 transition-opacity shadow-soft">
          ⚡ Calculate Ovulation Now
        </button>
      </div>
      {result && (
        <div className="mt-6 p-6 rounded-xl border-2 border-primary/30 bg-primary/5 animate-fade-in shadow-elevated">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2 font-semibold text-center">Estimated Ovulation Date</p>
          <p className="text-2xl font-heading font-bold text-primary text-center">{fmt(result.ovulationDate)}</p>
          <div className="space-y-3 mt-4">
            <div className="p-3 rounded-lg bg-accent/10 ring-2 ring-accent/30">
              <p className="text-sm font-bold text-accent">🌸 Fertile Window</p>
              <p className="text-sm text-muted-foreground">{fmt(result.fertileStart)} – {fmt(result.fertileEnd)}</p>
            </div>
            <div className="p-3 rounded-lg bg-muted">
              <p className="text-sm font-bold text-foreground">📅 Next Expected Period</p>
              <p className="text-sm text-muted-foreground">{fmt(result.nextPeriod)}</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-4 text-center">Ovulation typically occurs 14 days before your next period. Consult your doctor for family planning.</p>
          <p className="text-xs text-muted-foreground mt-2 text-center">💡 Share your result or try related calculators below!</p>
        </div>
      )}
    </div>
  );
};

export default OvulationForm;
