// Statistics & finance calculation helpers — pure functions, no deps.

export const parseNumbers = (input: string): number[] =>
  input
    .split(/[\s,;]+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0)
    .map((s) => Number(s))
    .filter((n) => Number.isFinite(n));

export const round = (n: number, d = 2) => {
  const f = Math.pow(10, d);
  return Math.round(n * f) / f;
};

// ── Descriptive stats ───────────────────────────────────────
export const mean = (a: number[]) => a.reduce((s, x) => s + x, 0) / a.length;

export const median = (a: number[]) => {
  const s = [...a].sort((x, y) => x - y);
  const m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
};

export const mode = (a: number[]): number[] => {
  const c = new Map<number, number>();
  for (const x of a) c.set(x, (c.get(x) ?? 0) + 1);
  let max = 0;
  for (const v of c.values()) if (v > max) max = v;
  if (max === 1) return [];
  return [...c.entries()].filter(([, v]) => v === max).map(([k]) => k);
};

export const variance = (a: number[], sample = true) => {
  const m = mean(a);
  const sq = a.reduce((s, x) => s + (x - m) ** 2, 0);
  return sq / (sample ? a.length - 1 : a.length);
};

export const stdDev = (a: number[], sample = true) => Math.sqrt(variance(a, sample));

export const range = (a: number[]) => Math.max(...a) - Math.min(...a);

// ── Probability ─────────────────────────────────────────────
export const factorial = (n: number): number => {
  if (n < 0 || !Number.isInteger(n)) return NaN;
  let r = 1;
  for (let i = 2; i <= n; i++) r *= i;
  return r;
};

export const combinations = (n: number, k: number) => {
  if (k < 0 || k > n) return 0;
  k = Math.min(k, n - k);
  let r = 1;
  for (let i = 0; i < k; i++) r = (r * (n - i)) / (i + 1);
  return r;
};

export const binomialProbability = (n: number, k: number, p: number) =>
  combinations(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k);

// ── Finance ─────────────────────────────────────────────────
export const roi = (gain: number, cost: number) => ((gain - cost) / cost) * 100;

export const cagr = (begin: number, end: number, years: number) =>
  (Math.pow(end / begin, 1 / years) - 1) * 100;

export const breakEven = (fixedCost: number, pricePerUnit: number, variableCostPerUnit: number) => {
  const contributionMargin = pricePerUnit - variableCostPerUnit;
  if (contributionMargin <= 0) return null;
  const units = fixedCost / contributionMargin;
  return { units, revenue: units * pricePerUnit, contributionMargin };
};

export const linearForecast = (history: number[], periodsAhead: number): number[] => {
  // Simple linear regression y = a + bx
  const n = history.length;
  const xs = history.map((_, i) => i);
  const xMean = mean(xs);
  const yMean = mean(history);
  let num = 0, den = 0;
  for (let i = 0; i < n; i++) {
    num += (xs[i] - xMean) * (history[i] - yMean);
    den += (xs[i] - xMean) ** 2;
  }
  const b = den === 0 ? 0 : num / den;
  const a = yMean - b * xMean;
  return Array.from({ length: periodsAhead }, (_, i) => a + b * (n + i));
};

// ── A/B testing ─────────────────────────────────────────────
// Two-proportion z-test
export const abTest = (
  visitorsA: number, conversionsA: number,
  visitorsB: number, conversionsB: number,
) => {
  const pA = conversionsA / visitorsA;
  const pB = conversionsB / visitorsB;
  const pPool = (conversionsA + conversionsB) / (visitorsA + visitorsB);
  const se = Math.sqrt(pPool * (1 - pPool) * (1 / visitorsA + 1 / visitorsB));
  const z = se === 0 ? 0 : (pB - pA) / se;
  // Two-tailed p-value using error function approximation
  const pValue = 2 * (1 - normalCdf(Math.abs(z)));
  const lift = pA === 0 ? 0 : ((pB - pA) / pA) * 100;
  return { pA: pA * 100, pB: pB * 100, lift, z, pValue, significant: pValue < 0.05 };
};

// Standard normal CDF using Abramowitz & Stegun approximation
const normalCdf = (x: number) => {
  const a1 = 0.254829592, a2 = -0.284496736, a3 = 1.421413741;
  const a4 = -1.453152027, a5 = 1.061405429, p = 0.3275911;
  const sign = x < 0 ? -1 : 1;
  const ax = Math.abs(x) / Math.sqrt(2);
  const t = 1 / (1 + p * ax);
  const y = 1 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-ax * ax);
  return 0.5 * (1 + sign * y);
};

// ── CSV parsing ─────────────────────────────────────────────
export const parseCsv = (text: string): { headers: string[]; rows: string[][] } => {
  const lines = text.split(/\r?\n/).filter((l) => l.trim().length > 0);
  if (lines.length === 0) return { headers: [], rows: [] };
  const split = (line: string) => {
    const out: string[] = [];
    let cur = "", inQ = false;
    for (let i = 0; i < line.length; i++) {
      const c = line[i];
      if (c === '"') { inQ = !inQ; continue; }
      if (c === "," && !inQ) { out.push(cur); cur = ""; continue; }
      cur += c;
    }
    out.push(cur);
    return out.map((s) => s.trim());
  };
  const headers = split(lines[0]);
  const rows = lines.slice(1).map(split);
  return { headers, rows };
};
