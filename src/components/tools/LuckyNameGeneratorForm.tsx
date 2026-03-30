import { useState } from "react";
import { calculateNameNumber, numberMeanings } from "@/lib/calculators";

const VOWELS = "aeiou";

function suggestLetterAddition(name: string, targetNum: number): string[] {
  const suggestions: string[] = [];
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  for (const letter of alphabet) {
    const testName = name + letter;
    const num = calculateNameNumber(testName);
    if (num === targetNum) suggestions.push(testName);
    if (suggestions.length >= 3) break;
  }
  // Also try prefix
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
  const targetMeaning = numberMeanings[parseInt(targetNumber)];

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-card">
      <div className="space-y-4">
        <div>
          <label htmlFor="lucky-name" className="block text-sm font-medium mb-1.5">Enter Your Name</label>
          <input
            id="lucky-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Priya"
            className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:ring-2 focus:ring-ring focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="target-num" className="block text-sm font-medium mb-1.5">Desired Lucky Number</label>
          <select
            id="target-num"
            value={targetNumber}
            onChange={(e) => setTargetNumber(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:ring-2 focus:ring-ring focus:outline-none"
          >
            {[1,2,3,4,5,6,7,8,9].map(n => (
              <option key={n} value={n}>{n} – {numberMeanings[n].title}</option>
            ))}
          </select>
        </div>
        <button onClick={handleCalculate} className="w-full gradient-warm text-primary-foreground font-semibold py-2.5 rounded-lg text-sm hover:opacity-90 transition-opacity">
          Generate Lucky Name
        </button>
      </div>
      {result && currentMeaning && (
        <div className="mt-6 p-5 bg-muted rounded-lg animate-fade-in">
          <div className="text-center mb-3">
            <p className="text-sm text-muted-foreground">Current name number:</p>
            <span className="text-3xl font-heading font-bold gradient-text">{result.current}</span>
            <p className="font-heading font-semibold mt-1">{currentMeaning.title}</p>
          </div>
          {result.current === parseInt(targetNumber) ? (
            <div className="p-3 bg-background rounded border border-border text-center">
              <p className="text-sm text-accent font-medium">✨ Your name already vibrates with your desired number!</p>
            </div>
          ) : result.suggestions.length > 0 ? (
            <div className="mt-4">
              <p className="text-sm font-medium mb-2">Suggested name variations for number {targetNumber}:</p>
              <div className="space-y-2">
                {result.suggestions.map((s, i) => (
                  <div key={i} className="p-2 bg-background rounded border border-border text-sm capitalize">
                    {s}
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                These are spelling variations. Consult a numerologist for personalized guidance.
              </p>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center mt-2">
              No simple letter additions found. Try a different target number.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default LuckyNameGeneratorForm;
