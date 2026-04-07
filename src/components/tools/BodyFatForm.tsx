import { useState } from "react";

function calculateBodyFat(gender: "male" | "female", waist: number, neck: number, height: number, hip?: number): number {
  if (gender === "male") {
    return Math.round((495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height)) - 450) * 10) / 10;
  }
  const h = hip || 0;
  return Math.round((495 / (1.29579 - 0.35004 * Math.log10(waist + h - neck) + 0.22100 * Math.log10(height)) - 450) * 10) / 10;
}

function getCategory(bf: number, gender: "male" | "female"): { label: string; color: string } {
  if (gender === "male") {
    if (bf < 6) return { label: "Essential Fat", color: "text-secondary" };
    if (bf < 14) return { label: "Athletic", color: "text-accent" };
    if (bf < 18) return { label: "Fitness", color: "text-accent" };
    if (bf < 25) return { label: "Average", color: "text-primary" };
    return { label: "Above Average", color: "text-destructive" };
  }
  if (bf < 14) return { label: "Essential Fat", color: "text-secondary" };
  if (bf < 21) return { label: "Athletic", color: "text-accent" };
  if (bf < 25) return { label: "Fitness", color: "text-accent" };
  if (bf < 32) return { label: "Average", color: "text-primary" };
  return { label: "Above Average", color: "text-destructive" };
}

const BodyFatForm = () => {
  const [gender, setGender] = useState<"male" | "female">("male");
  const [height, setHeight] = useState("");
  const [waist, setWaist] = useState("");
  const [neck, setNeck] = useState("");
  const [hip, setHip] = useState("");
  const [result, setResult] = useState<{ bf: number; category: { label: string; color: string } } | null>(null);

  const handleCalculate = () => {
    const h = parseFloat(height), w = parseFloat(waist), n = parseFloat(neck);
    if ([h, w, n].some(isNaN) || h <= 0 || w <= 0 || n <= 0) return;
    if (gender === "female" && (!hip || isNaN(parseFloat(hip)))) return;
    const bf = calculateBodyFat(gender, w, n, h, gender === "female" ? parseFloat(hip) : undefined);
    if (bf < 0 || bf > 60) return;
    setResult({ bf, category: getCategory(bf, gender) });
  };

  return (
    <div className="bg-card rounded-xl border-2 border-border p-6 shadow-card">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1.5">Gender</label>
          <div className="grid grid-cols-2 gap-2">
            {(["male", "female"] as const).map(g => (
              <button key={g} onClick={() => setGender(g)} className={`py-3 rounded-lg border text-sm font-bold transition-colors ${gender === g ? "bg-primary text-primary-foreground border-primary" : "bg-background border-input text-foreground hover:bg-muted"}`}>
                {g === "male" ? "Male" : "Female"}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Height (cm)</label>
          <input type="number" value={height} onChange={e => setHeight(e.target.value)} placeholder="e.g. 170" className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground text-sm focus:ring-2 focus:ring-ring focus:outline-none" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium mb-1.5">Waist (cm)</label>
            <input type="number" value={waist} onChange={e => setWaist(e.target.value)} placeholder="e.g. 80" className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground text-sm focus:ring-2 focus:ring-ring focus:outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Neck (cm)</label>
            <input type="number" value={neck} onChange={e => setNeck(e.target.value)} placeholder="e.g. 37" className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground text-sm focus:ring-2 focus:ring-ring focus:outline-none" />
          </div>
        </div>
        {gender === "female" && (
          <div>
            <label className="block text-sm font-medium mb-1.5">Hip (cm)</label>
            <input type="number" value={hip} onChange={e => setHip(e.target.value)} placeholder="e.g. 95" className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground text-sm focus:ring-2 focus:ring-ring focus:outline-none" />
          </div>
        )}
        <button onClick={handleCalculate} className="w-full bg-primary text-primary-foreground font-bold py-3 rounded-lg text-base hover:opacity-90 transition-opacity shadow-soft">
          ⚡ Calculate Body Fat Now
        </button>
      </div>
      {result && (
        <div className="mt-6 p-6 rounded-xl border-2 border-primary/30 bg-primary/5 animate-fade-in text-center shadow-elevated">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2 font-semibold">Your Body Fat Result</p>
          <span className="text-5xl font-heading font-bold text-primary">{result.bf}%</span>
          <p className={`font-heading font-bold text-xl mt-2 ${result.category.color}`}>{result.category.label}</p>
          <div className="mt-4 grid grid-cols-4 gap-1 text-xs">
            {gender === "male" ? (
              <>
                <div className={`py-2 rounded-lg ${result.category.label === "Essential Fat" ? "bg-secondary/20 font-bold ring-2 ring-secondary/40" : "bg-muted"}`}>2-5%<br /><span className="text-[10px]">Essential</span></div>
                <div className={`py-2 rounded-lg ${result.category.label === "Athletic" ? "bg-accent/20 font-bold ring-2 ring-accent/40" : "bg-muted"}`}>6-13%<br /><span className="text-[10px]">Athletic</span></div>
                <div className={`py-2 rounded-lg ${result.category.label === "Fitness" || result.category.label === "Average" ? "bg-primary/20 font-bold ring-2 ring-primary/40" : "bg-muted"}`}>14-24%<br /><span className="text-[10px]">Fitness</span></div>
                <div className={`py-2 rounded-lg ${result.category.label === "Above Average" ? "bg-destructive/20 font-bold ring-2 ring-destructive/40" : "bg-muted"}`}>25%+<br /><span className="text-[10px]">Above</span></div>
              </>
            ) : (
              <>
                <div className={`py-2 rounded-lg ${result.category.label === "Essential Fat" ? "bg-secondary/20 font-bold ring-2 ring-secondary/40" : "bg-muted"}`}>10-13%<br /><span className="text-[10px]">Essential</span></div>
                <div className={`py-2 rounded-lg ${result.category.label === "Athletic" ? "bg-accent/20 font-bold ring-2 ring-accent/40" : "bg-muted"}`}>14-20%<br /><span className="text-[10px]">Athletic</span></div>
                <div className={`py-2 rounded-lg ${result.category.label === "Fitness" || result.category.label === "Average" ? "bg-primary/20 font-bold ring-2 ring-primary/40" : "bg-muted"}`}>21-31%<br /><span className="text-[10px]">Fitness</span></div>
                <div className={`py-2 rounded-lg ${result.category.label === "Above Average" ? "bg-destructive/20 font-bold ring-2 ring-destructive/40" : "bg-muted"}`}>32%+<br /><span className="text-[10px]">Above</span></div>
              </>
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-4">💡 Share your result or try related calculators below!</p>
        </div>
      )}
    </div>
  );
};

export default BodyFatForm;
