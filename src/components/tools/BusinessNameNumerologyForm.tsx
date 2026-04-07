import { useState } from "react";
import { calculateNameNumber, numberMeanings } from "@/lib/calculators";

const businessInsights: Record<number, string> = {
  1: "Excellent for startups and solo ventures. Projects authority and leadership.",
  2: "Great for partnerships, consulting, and relationship-based businesses.",
  3: "Ideal for creative agencies, media companies, and entertainment brands.",
  4: "Perfect for construction, finance, legal firms — stability and trust.",
  5: "Best for travel, marketing, e-commerce — dynamic and adaptable.",
  6: "Wonderful for healthcare, education, hospitality — nurturing brands.",
  7: "Suited for tech, research, spiritual services — intellectual appeal.",
  8: "Powerful for corporate brands, real estate, banking — wealth energy.",
  9: "Great for NGOs, global brands, humanitarian ventures — universal appeal.",
  11: "Master energy for visionary startups and inspirational brands.",
  22: "Master builder energy — ideal for large-scale infrastructure and projects.",
  33: "Master teacher energy — perfect for educational institutions and healing brands.",
};

const BusinessNameNumerologyForm = () => {
  const [name, setName] = useState("");
  const [result, setResult] = useState<number | null>(null);

  const handleCalculate = () => {
    if (!name.trim()) return;
    setResult(calculateNameNumber(name));
  };

  const meaning = result ? numberMeanings[result] : null;

  return (
    <div className="bg-card rounded-xl border-2 border-border p-6 shadow-card">
      <div className="space-y-4">
        <div>
          <label htmlFor="biz-name" className="block text-sm font-medium mb-1.5">Enter Business Name</label>
          <input
            id="biz-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleCalculate()}
            placeholder="e.g. Stellar Tech Solutions"
            className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground text-sm focus:ring-2 focus:ring-ring focus:outline-none"
          />
        </div>
        <button onClick={handleCalculate} className="w-full bg-primary text-primary-foreground font-bold py-3 rounded-lg text-base hover:opacity-90 transition-opacity shadow-soft">
          ⚡ Analyze Business Name Now
        </button>
      </div>
      {result !== null && meaning && (
        <div className="mt-6 p-6 rounded-xl border-2 border-primary/30 bg-primary/5 animate-fade-in text-center shadow-elevated">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2 font-semibold">Business Name Number</p>
          <span className="text-5xl font-heading font-bold text-primary">{result}</span>
          <p className="font-heading font-bold text-xl mt-2">{meaning.title}</p>
          <p className="text-sm text-muted-foreground mt-3"><strong>Traits:</strong> {meaning.traits}</p>
          <p className="text-sm text-muted-foreground mt-2">{meaning.description}</p>
          {businessInsights[result] && (
            <div className="mt-4 p-3 rounded-lg bg-accent/10 ring-2 ring-accent/30">
              <p className="text-sm font-bold text-accent">💼 Business Insight</p>
              <p className="text-sm text-muted-foreground mt-1">{businessInsights[result]}</p>
            </div>
          )}
          <p className="text-xs text-muted-foreground mt-4">💡 Share your result or try related calculators below!</p>
        </div>
      )}
    </div>
  );
};

export default BusinessNameNumerologyForm;
