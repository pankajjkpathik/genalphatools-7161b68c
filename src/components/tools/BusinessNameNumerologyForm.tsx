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
    <div className="bg-card rounded-lg border border-border p-6 shadow-card">
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
            className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:ring-2 focus:ring-ring focus:outline-none"
          />
        </div>
        <button onClick={handleCalculate} className="w-full gradient-warm text-primary-foreground font-semibold py-2.5 rounded-lg text-sm hover:opacity-90 transition-opacity">
          Analyze Business Name
        </button>
      </div>
      {result !== null && meaning && (
        <div className="mt-6 p-5 bg-muted rounded-lg animate-fade-in">
          <div className="text-center mb-3">
            <span className="text-4xl font-heading font-bold gradient-text">{result}</span>
            <p className="font-heading font-semibold text-lg mt-1">{meaning.title}</p>
          </div>
          <p className="text-sm text-muted-foreground mb-2"><strong>Traits:</strong> {meaning.traits}</p>
          <p className="text-sm text-muted-foreground mb-3">{meaning.description}</p>
          {businessInsights[result] && (
            <div className="p-3 bg-background rounded border border-border">
              <p className="text-sm font-medium text-foreground">💼 Business Insight</p>
              <p className="text-sm text-muted-foreground mt-1">{businessInsights[result]}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BusinessNameNumerologyForm;
