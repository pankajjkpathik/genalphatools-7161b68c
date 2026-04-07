import { useState } from "react";
import { calculateNameNumber, numberMeanings } from "@/lib/calculators";

function suggestLetterAddition(name: string, targetNum: number): string[] {
  const suggestions: string[] = [];
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  for (const letter of alphabet) {
    const testName = name + letter;
    const num = calculateNameNumber(testName);
    if (num === targetNum) suggestions.push(testName);
    if (suggestions.length >= 3) break;
  }
  for (const letter of alphabet) {
    const testName = letter + name;
    const num = calculateNameNumber(testName);
    if (num === targetNum) suggestions.push(testName);
    if (suggestions.length >= 5) break;
  }
  return suggestions;
}

const LuckyNameGeneratorForm = () => {
  const [name, setName] = useState("");
  const [targetNumber, setTargetNumber] = useState("1");
  const [result, setResult] = useState<{ current: number; suggestions: string[] } | null>(null);

  const handleCalculate = () => {
    if (!name.trim()) return;
    const current = calculateNameNumber(name);
    const target = parseInt(targetNumber);
    const suggestions = current === target ? [] : suggestLetterAddition(name, target);
    setResult({ current, suggestions });
  };

  const currentMeaning = result ? numberMeanings[result.current] : null;

  return (
    <div className="bg-card rounded-xl border-2 border-border p-6 shadow-card">
      <div className="space-y-4">
        <div>
          <label htmlFor="lucky-name" className="block text-sm font-medium mb-1.5">Enter Your Name</label>
          <input
            id="lucky-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Priya"
            className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground text-sm focus:ring-2 focus:ring-ring focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="target-num" className="block text-sm font-medium mb-1.5">Desired Lucky Number</label>
          <select
            id="target-num"
            value={targetNumber}
            onChange={(e) => setTargetNumber(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground text-sm focus:ring-2 focus:ring-ring focus:outline-none"
          >
            {[1,2,3,4,5,6,7,8,9].map(n => (
              <option key={n} value={n}>{n} – {numberMeanings[n].title}</option>
            ))}
          </select>
        </div>
        <button onClick={handleCalculate} className="w-full bg-primary text-primary-foreground font-bold py-3 rounded-lg text-base hover:opacity-90 transition-opacity shadow-soft">
          ⚡ Generate Lucky Name Now
        </button>
      </div>
      {result && currentMeaning && (
        <div className="mt-6 p-6 rounded-xl border-2 border-primary/30 bg-primary/5 animate-fade-in shadow-elevated">
          <div className="text-center mb-3">
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2 font-semibold">Current Name Number</p>
            <span className="text-5xl font-heading font-bold text-primary">{result.current}</span>
            <p className="font-heading font-bold text-xl mt-2">{currentMeaning.title}</p>
          </div>
          {result.current === parseInt(targetNumber) ? (
            <div className="p-3 rounded-lg bg-accent/10 ring-2 ring-accent/30 text-center">
              <p className="text-sm text-accent font-bold">✨ Your name already vibrates with your desired number!</p>
            </div>
          ) : result.suggestions.length > 0 ? (
            <div className="mt-4">
              <p className="text-sm font-bold mb-2 text-center">Suggested variations for number {targetNumber}:</p>
              <div className="space-y-2">
                {result.suggestions.map((s, i) => (
                  <div key={i} className="p-3 rounded-lg bg-muted text-sm capitalize font-medium text-center">
                    {s}
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-3 text-center">
                These are spelling variations. Consult a numerologist for personalized guidance.
              </p>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center mt-2">
              No simple letter additions found. Try a different target number.
            </p>
          )}
          <p className="text-xs text-muted-foreground mt-4 text-center">💡 Share your result or try related calculators below!</p>
        </div>
      )}
    </div>
  );
};

export default LuckyNameGeneratorForm;
