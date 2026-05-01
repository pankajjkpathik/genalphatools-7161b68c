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
export const normalCdf = (x: number) => {
  const a1 = 0.254829592, a2 = -0.284496736, a3 = 1.421413741;
  const a4 = -1.453152027, a5 = 1.061405429, p = 0.3275911;
  const sign = x < 0 ? -1 : 1;
  const ax = Math.abs(x) / Math.sqrt(2);
  const t = 1 / (1 + p * ax);
  const y = 1 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-ax * ax);
  return 0.5 * (1 + sign * y);
};

/** Inverse normal CDF (Beasley-Springer-Moro). Returns z for cumulative probability p∈(0,1). */
export const inverseNormalCdf = (p: number): number => {
  if (p <= 0 || p >= 1) return NaN;
  const a = [-39.69683028665376, 220.9460984245205, -275.9285104469687, 138.357751867269, -30.66479806614716, 2.506628277459239];
  const b = [-54.47609879822406, 161.5858368580409, -155.6989798598866, 66.80131188771972, -13.28068155288572];
  const c = [-0.007784894002430293, -0.3223964580411365, -2.400758277161838, -2.549732539343734, 4.374664141464968, 2.938163982698783];
  const d = [0.007784695709041462, 0.3224671290700398, 2.445134137142996, 3.754408661907416];
  const pl = 0.02425, ph = 1 - pl;
  let q: number, r: number;
  if (p < pl) {
    q = Math.sqrt(-2 * Math.log(p));
    return (((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) / ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1);
  }
  if (p <= ph) {
    q = p - 0.5; r = q * q;
    return (((((a[0] * r + a[1]) * r + a[2]) * r + a[3]) * r + a[4]) * r + a[5]) * q /
      (((((b[0] * r + b[1]) * r + b[2]) * r + b[3]) * r + b[4]) * r + 1);
  }
  q = Math.sqrt(-2 * Math.log(1 - p));
  return -(((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) / ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1);
};

/** z critical for two-tailed confidence level (e.g. 0.95 → 1.96). */
export const zCritical = (confidence: number) => inverseNormalCdf(1 - (1 - confidence) / 2);

/** Pearson correlation coefficient. */
export const pearson = (xs: number[], ys: number[]): number => {
  const n = Math.min(xs.length, ys.length);
  if (n < 2) return NaN;
  const mx = mean(xs.slice(0, n));
  const my = mean(ys.slice(0, n));
  let num = 0, dx = 0, dy = 0;
  for (let i = 0; i < n; i++) {
    const a = xs[i] - mx, b = ys[i] - my;
    num += a * b; dx += a * a; dy += b * b;
  }
  const den = Math.sqrt(dx * dy);
  return den === 0 ? NaN : num / den;
};

/** Simple linear regression y = a + bx. Returns slope, intercept, r². */
export const linearRegression = (xs: number[], ys: number[]) => {
  const n = Math.min(xs.length, ys.length);
  const mx = mean(xs.slice(0, n));
  const my = mean(ys.slice(0, n));
  let num = 0, den = 0;
  for (let i = 0; i < n; i++) {
    num += (xs[i] - mx) * (ys[i] - my);
    den += (xs[i] - mx) ** 2;
  }
  const slope = den === 0 ? 0 : num / den;
  const intercept = my - slope * mx;
  const r = pearson(xs, ys);
  return { slope, intercept, r2: r * r, r };
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
