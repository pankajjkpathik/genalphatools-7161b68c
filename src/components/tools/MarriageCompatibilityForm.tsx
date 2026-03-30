import { useState } from "react";
import { calculateLifePath, numberMeanings } from "@/lib/calculators";

const compatibilityMatrix: Record<string, { score: number; description: string }> = {};

function getCompatibility(a: number, b: number): { score: number; level: string; description: string } {
  const excellent = [[1,5],[2,6],[3,9],[4,8],[5,7],[6,2],[1,3],[3,5],[7,9]];
  const good = [[1,1],[2,2],[3,3],[4,4],[5,5],[6,6],[7,7],[8,8],[9,9],[1,9],[2,4],[3,6],[4,6],[5,9],[6,8]];
  const pair = [Math.min(a,b), Math.max(a,b)];
  const isExcellent = excellent.some(e => (e[0]===pair[0]&&e[1]===pair[1]) || (e[0]===pair[1]&&e[1]===pair[0]));
  const isGood = good.some(e => (e[0]===pair[0]&&e[1]===pair[1]) || (e[0]===pair[1]&&e[1]===pair[0]));

  if (isExcellent) return { score: 90, level: "Excellent", description: "Your life paths are highly compatible! You complement each other's strengths and share deep understanding." };
  if (isGood) return { score: 70, level: "Good", description: "You have good compatibility with natural harmony. Minor adjustments can make this bond even stronger." };
  return { score: 50, level: "Moderate", description: "Your paths differ, which brings both challenges and growth opportunities. Communication and understanding are key." };
}

const MarriageCompatibilityForm = () => {
  const [dob1, setDob1] = useState({ day: "", month: "", year: "" });
  const [dob2, setDob2] = useState({ day: "", month: "", year: "" });
  const [result, setResult] = useState<{ lp1: number; lp2: number; compat: ReturnType<typeof getCompatibility> } | null>(null);

  const handleCalculate = () => {
    const d1 = parseInt(dob1.day), m1 = parseInt(dob1.month), y1 = parseInt(dob1.year);
    const d2 = parseInt(dob2.day), m2 = parseInt(dob2.month), y2 = parseInt(dob2.year);
    if ([d1,m1,y1,d2,m2,y2].some(isNaN)) return;
    const lp1 = calculateLifePath(d1, m1, y1);
    const lp2 = calculateLifePath(d2, m2, y2);
    setResult({ lp1, lp2, compat: getCompatibility(lp1, lp2) });
  };

  const dobInputs = (label: string, dob: typeof dob1, setDob: typeof setDob1) => (
    <div>
      <label className="block text-sm font-medium mb-1.5">{label}</label>
      <div className="grid grid-cols-3 gap-2">
        <input type="number" placeholder="DD" min="1" max="31" value={dob.day} onChange={e => setDob({...dob, day: e.target.value})} className="px-3 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:ring-2 focus:ring-ring focus:outline-none" />
        <input type="number" placeholder="MM" min="1" max="12" value={dob.month} onChange={e => setDob({...dob, month: e.target.value})} className="px-3 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:ring-2 focus:ring-ring focus:outline-none" />
        <input type="number" placeholder="YYYY" min="1900" max="2099" value={dob.year} onChange={e => setDob({...dob, year: e.target.value})} className="px-3 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:ring-2 focus:ring-ring focus:outline-none" />
      </div>
    </div>
  );

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-card">
      <div className="space-y-4">
        {dobInputs("Partner 1 – Date of Birth", dob1, setDob1)}
        {dobInputs("Partner 2 – Date of Birth", dob2, setDob2)}
        <button onClick={handleCalculate} className="w-full gradient-warm text-primary-foreground font-semibold py-2.5 rounded-lg text-sm hover:opacity-90 transition-opacity">
          Check Compatibility
        </button>
      </div>
      {result && (
        <div className="mt-6 p-5 bg-muted rounded-lg animate-fade-in">
          <div className="text-center mb-4">
            <div className="flex justify-center items-center gap-4 mb-3">
              <div>
                <span className="text-2xl font-heading font-bold gradient-text">{result.lp1}</span>
                <p className="text-xs text-muted-foreground">{numberMeanings[result.lp1]?.title}</p>
              </div>
              <span className="text-2xl">💕</span>
              <div>
                <span className="text-2xl font-heading font-bold gradient-text">{result.lp2}</span>
                <p className="text-xs text-muted-foreground">{numberMeanings[result.lp2]?.title}</p>
              </div>
            </div>
            <div className="w-full bg-background rounded-full h-3 mb-2">
              <div className="h-3 rounded-full gradient-warm transition-all duration-500" style={{ width: `${result.compat.score}%` }} />
            </div>
            <p className="font-heading font-semibold text-lg">{result.compat.score}% – {result.compat.level}</p>
          </div>
          <p className="text-sm text-muted-foreground">{result.compat.description}</p>
        </div>
      )}
    </div>
  );
};

export default MarriageCompatibilityForm;
