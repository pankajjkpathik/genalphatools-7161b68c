// Numerology calculation utilities

const PYTHAGOREAN_MAP: Record<string, number> = {
  a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9,
  j: 1, k: 2, l: 3, m: 4, n: 5, o: 6, p: 7, q: 8, r: 9,
  s: 1, t: 2, u: 3, v: 4, w: 5, x: 6, y: 7, z: 8,
};

export function reduceToSingle(num: number): number {
  while (num > 9 && num !== 11 && num !== 22 && num !== 33) {
    num = String(num).split("").reduce((a, b) => a + parseInt(b), 0);
  }
  return num;
}

export function calculateNameNumber(name: string): number {
  const sum = name
    .toLowerCase()
    .split("")
    .reduce((total, char) => total + (PYTHAGOREAN_MAP[char] || 0), 0);
  return reduceToSingle(sum);
}

export function calculateLifePath(day: number, month: number, year: number): number {
  const sum = String(day).split("").reduce((a, b) => a + parseInt(b), 0)
    + String(month).split("").reduce((a, b) => a + parseInt(b), 0)
    + String(year).split("").reduce((a, b) => a + parseInt(b), 0);
  return reduceToSingle(sum);
}

export function calculateMobileNumber(number: string): number {
  const digits = number.replace(/\D/g, "");
  const sum = digits.split("").reduce((a, b) => a + parseInt(b), 0);
  return reduceToSingle(sum);
}

export function calculatePersonalYear(day: number, month: number, year: number): number {
  const sum = String(day).split("").reduce((a, b) => a + parseInt(b), 0)
    + String(month).split("").reduce((a, b) => a + parseInt(b), 0)
    + String(year).split("").reduce((a, b) => a + parseInt(b), 0);
  return reduceToSingle(sum);
}

export const numberMeanings: Record<number, { title: string; traits: string; description: string }> = {
  1: { title: "The Leader", traits: "Independent, ambitious, innovative", description: "Number 1 represents new beginnings, leadership, and independence. You are a natural pioneer with a drive to succeed." },
  2: { title: "The Peacemaker", traits: "Diplomatic, sensitive, cooperative", description: "Number 2 represents harmony, partnership, and balance. You are intuitive and work well with others." },
  3: { title: "The Communicator", traits: "Creative, expressive, joyful", description: "Number 3 represents creativity, self-expression, and social interaction. You have artistic talents and an optimistic outlook." },
  4: { title: "The Builder", traits: "Practical, disciplined, hardworking", description: "Number 4 represents stability, order, and determination. You build solid foundations through hard work." },
  5: { title: "The Free Spirit", traits: "Adventurous, versatile, dynamic", description: "Number 5 represents freedom, change, and adventure. You thrive on variety and new experiences." },
  6: { title: "The Nurturer", traits: "Caring, responsible, harmonious", description: "Number 6 represents love, family, and responsibility. You are a natural caregiver with a strong sense of duty." },
  7: { title: "The Seeker", traits: "Analytical, spiritual, introspective", description: "Number 7 represents wisdom, spirituality, and inner knowledge. You seek deeper truths and understanding." },
  8: { title: "The Achiever", traits: "Powerful, ambitious, material success", description: "Number 8 represents power, abundance, and achievement. You have strong business instincts and leadership ability." },
  9: { title: "The Humanitarian", traits: "Compassionate, generous, idealistic", description: "Number 9 represents completion, wisdom, and universal love. You are driven by a desire to make the world better." },
  11: { title: "Master Intuitive", traits: "Visionary, inspirational, spiritual", description: "Master number 11 represents heightened intuition, spiritual insight, and inspirational leadership." },
  22: { title: "Master Builder", traits: "Visionary, practical, powerful", description: "Master number 22 combines vision with practicality. You can turn grand dreams into reality." },
  33: { title: "Master Teacher", traits: "Compassionate, healing, selfless", description: "Master number 33 represents the highest form of love and service. You are a master healer and teacher." },
};

// Health calculation utilities
export function calculateBMI(weightKg: number, heightCm: number): { bmi: number; category: string; color: string } {
  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);
  let category = "";
  let color = "";
  if (bmi < 18.5) { category = "Underweight"; color = "text-secondary"; }
  else if (bmi < 25) { category = "Normal"; color = "text-accent"; }
  else if (bmi < 30) { category = "Overweight"; color = "text-primary"; }
  else { category = "Obese"; color = "text-destructive"; }
  return { bmi: Math.round(bmi * 10) / 10, category, color };
}

export function calculateBMR(weightKg: number, heightCm: number, age: number, gender: "male" | "female"): number {
  if (gender === "male") return Math.round(10 * weightKg + 6.25 * heightCm - 5 * age + 5);
  return Math.round(10 * weightKg + 6.25 * heightCm - 5 * age - 161);
}

export function calculateTDEE(bmr: number, activityLevel: number): number {
  return Math.round(bmr * activityLevel);
}

export function calculateIdealWeight(heightCm: number, gender: "male" | "female"): { ideal: number; range: string } {
  const heightInches = heightCm / 2.54;
  let ideal: number;
  if (gender === "male") ideal = 50 + 2.3 * (heightInches - 60);
  else ideal = 45.5 + 2.3 * (heightInches - 60);
  ideal = Math.max(ideal, 0);
  const low = Math.round(ideal * 0.9);
  const high = Math.round(ideal * 1.1);
  return { ideal: Math.round(ideal), range: `${low} - ${high} kg` };
}

export function calculateWaterIntake(weightKg: number, activity: "low" | "moderate" | "high", hotClimate: boolean): number {
  let ml = weightKg * 35;
  if (activity === "moderate") ml += 500;
  if (activity === "high") ml += 1000;
  if (hotClimate) ml += 500;
  return Math.round(ml);
}
