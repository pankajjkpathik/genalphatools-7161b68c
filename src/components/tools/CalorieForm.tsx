import { useState } from "react";
import { calculateBMR, calculateTDEE } from "@/lib/calculators";

const CalorieForm = () => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [activity, setActivity] = useState("1.55");
  const [result, setResult] = useState<{ bmr: number; tdee: number; loss: number; gain: number } | null>(null);

  const handleCalculate = () => {
    const w = parseFloat(weight), h = parseFloat(height), a = parseInt(age);
    if (!w || !h || !a) return;
    const bmr = calculateBMR(w, h, a, gender);
    const tdee = calculateTDEE(bmr, parseFloat(activity));
    setResult({ bmr, tdee, loss: tdee - 500, gain: tdee + 500 });
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-card">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium mb-1.5">Weight (kg)</label>
            <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="70"
              className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-sm focus:ring-2 focus:ring-ring focus:outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Height (cm)</label>
            <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="170"
              className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-sm focus:ring-2 focus:ring-ring focus:outline-none" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium mb-1.5">Age</label>
            <input type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="25"
              className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-sm focus:ring-2 focus:ring-ring focus:outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Gender</label>
            <select value={gender} onChange={(e) => setGender(e.target.value as "male" | "female")}
              className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-sm focus:ring-2 focus:ring-ring focus:outline-none">
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Activity Level</label>
          <select value={activity} onChange={(e) => setActivity(e.target.value)}
            className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-sm focus:ring-2 focus:ring-ring focus:outline-none">
            <option value="1.2">Sedentary (little/no exercise)</option>
            <option value="1.375">Lightly Active (1-3 days/week)</option>
            <option value="1.55">Moderately Active (3-5 days/week)</option>
            <option value="1.725">Very Active (6-7 days/week)</option>
            <option value="1.9">Extra Active (athlete)</option>
          </select>
        </div>
        <button onClick={handleCalculate} className="w-full gradient-health text-accent-foreground font-semibold py-2.5 rounded-lg text-sm hover:opacity-90 transition-opacity">
          Calculate Calories
        </button>
      </div>
      {result && (
        <div className="mt-6 p-5 bg-muted rounded-lg animate-fade-in">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-xs text-muted-foreground">BMR</p>
              <p className="text-xl font-heading font-bold">{result.bmr}</p>
              <p className="text-xs text-muted-foreground">cal/day</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Maintenance</p>
              <p className="text-xl font-heading font-bold text-accent">{result.tdee}</p>
              <p className="text-xs text-muted-foreground">cal/day</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Weight Loss</p>
              <p className="text-xl font-heading font-bold text-primary">{result.loss}</p>
              <p className="text-xs text-muted-foreground">cal/day</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Weight Gain</p>
              <p className="text-xl font-heading font-bold text-secondary">{result.gain}</p>
              <p className="text-xs text-muted-foreground">cal/day</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalorieForm;
