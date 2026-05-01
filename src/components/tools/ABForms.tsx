import { useState } from "react";
import { Card, Field, CalcButton, ResultBox, Stat, ErrorMsg, fmt, pct, num } from "./ui";
import { abTest, normalCdf } from "@/lib/stats";

const ABTestBase = ({ ctaLabel }: { ctaLabel: string }) => {
  const [vA, setVA] = useState("");
  const [cA, setCA] = useState("");
  const [vB, setVB] = useState("");
  const [cB, setCB] = useState("");
  const [r, setR] = useState<ReturnType<typeof abTest> | null>(null);
  const [err, setErr] = useState("");
  const calc = () => {
    setErr("");
    const va = num(vA), ca = num(cA), vb = num(vB), cb = num(cB);
    if (![va, ca, vb, cb].every(Number.isFinite) || va <= 0 || vb <= 0 || ca < 0 || cb < 0) return setR(null);
    if (ca > va || cb > vb) { setErr("Conversions can't exceed visitors."); return setR(null); }
    setR(abTest(va, ca, vb, cb));
  };
  return (
    <Card>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Field label="Variant A — visitors" value={vA} onChange={setVA} placeholder="5000" />
        <Field label="Variant A — conversions" value={cA} onChange={setCA} placeholder="200" />
        <Field label="Variant B — visitors" value={vB} onChange={setVB} placeholder="5000" />
        <Field label="Variant B — conversions" value={cB} onChange={setCB} placeholder="240" />
      </div>
      <CalcButton onClick={calc} label={ctaLabel} />
      <ErrorMsg>{err}</ErrorMsg>
      {r && (
        <ResultBox
          label={r.significant ? "✓ Statistically Significant" : "✗ Not Significant"}
          value={`${fmt(r.lift, 2)}% lift`}
          tone={r.significant ? "accent" : "destructive"}
        >
          <Stat label="Conv A" value={pct(r.pA)} />
          <Stat label="Conv B" value={pct(r.pB)} />
          <Stat label="Z-score" value={fmt(r.z, 3)} />
          <Stat label="P-value" value={r.pValue < 0.0001 ? "<0.0001" : fmt(r.pValue, 4)} />
        </ResultBox>
      )}
    </Card>
  );
};

export const StatSignificanceForm = () => <ABTestBase ctaLabel="Calculate Significance" />;
export const SplitTestForm = () => <ABTestBase ctaLabel="Analyze Split Test" />;

export const ConversionLiftForm = () => {
  const [c, setC] = useState("");
  const [t, setT] = useState("");
  const [r, setR] = useState<{ lift: number; abs: number } | null>(null);
  const calc = () => {
    const cv = num(c), tv = num(t);
    if (![cv, tv].every(Number.isFinite) || cv <= 0) return setR(null);
    setR({ lift: ((tv - cv) / cv) * 100, abs: tv - cv });
  };
  return (
    <Card>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Field label="Control conversion rate (%)" value={c} onChange={setC} placeholder="3.2" step="0.01" />
        <Field label="Treatment conversion rate (%)" value={t} onChange={setT} placeholder="3.8" step="0.01" />
      </div>
      <CalcButton onClick={calc} label="Calculate Lift" />
      {r && (
        <ResultBox label="Relative Lift" value={pct(r.lift)} tone={r.lift >= 0 ? "accent" : "destructive"}>
          <Stat label="Absolute change" value={`${fmt(r.abs, 3)} pp`} />
        </ResultBox>
      )}
    </Card>
  );
};

/** Bayesian A/B test using Beta-binomial conjugate, Monte Carlo P(B>A). */
export const BayesianABForm = () => {
  const [vA, setVA] = useState("");
  const [cA, setCA] = useState("");
  const [vB, setVB] = useState("");
  const [cB, setCB] = useState("");
  const [r, setR] = useState<{ pB: number; lift: number; cra: number; crb: number } | null>(null);

  const sampleBeta = (a: number, b: number) => {
    // Use ratio of gammas via Marsaglia & Tsang for shape >= 1; else boost
    const gamma = (k: number): number => {
      if (k < 1) return gamma(k + 1) * Math.pow(Math.random(), 1 / k);
      const d = k - 1 / 3;
      const c = 1 / Math.sqrt(9 * d);
      while (true) {
        let x: number, v: number;
        do {
          // Box-Muller
          const u1 = Math.random() || 1e-12, u2 = Math.random();
          x = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
          v = 1 + c * x;
        } while (v <= 0);
        v = v * v * v;
        const u = Math.random();
        if (u < 1 - 0.0331 * x * x * x * x) return d * v;
        if (Math.log(u) < 0.5 * x * x + d * (1 - v + Math.log(v))) return d * v;
      }
    };
    const ga = gamma(a), gb = gamma(b);
    return ga / (ga + gb);
  };

  const calc = () => {
    const va = num(vA), ca = num(cA), vb = num(vB), cb = num(cB);
    if (![va, ca, vb, cb].every(Number.isFinite) || va <= 0 || vb <= 0) return setR(null);
    // Beta(1+conv, 1+nonconv) — uniform prior
    const aA = 1 + ca, bA = 1 + (va - ca);
    const aB = 1 + cb, bB = 1 + (vb - cb);
    const N = 5000;
    let wins = 0;
    for (let i = 0; i < N; i++) {
      const sA = sampleBeta(aA, bA);
      const sB = sampleBeta(aB, bB);
      if (sB > sA) wins++;
    }
    const cra = ca / va, crb = cb / vb;
    setR({ pB: (wins / N) * 100, lift: cra > 0 ? ((crb - cra) / cra) * 100 : 0, cra: cra * 100, crb: crb * 100 });
  };
  return (
    <Card>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Field label="Variant A — visitors" value={vA} onChange={setVA} placeholder="5000" />
        <Field label="Variant A — conversions" value={cA} onChange={setCA} placeholder="200" />
        <Field label="Variant B — visitors" value={vB} onChange={setVB} placeholder="5000" />
        <Field label="Variant B — conversions" value={cB} onChange={setCB} placeholder="240" />
      </div>
      <CalcButton onClick={calc} label="Run Bayesian Analysis" />
      {r && (
        <ResultBox
          label="Probability B beats A"
          value={pct(r.pB)}
          tone={r.pB >= 95 ? "accent" : r.pB <= 5 ? "destructive" : "primary"}
        >
          <Stat label="Conv A" value={pct(r.cra)} />
          <Stat label="Conv B" value={pct(r.crb)} />
          <Stat label="Lift" value={pct(r.lift)} />
        </ResultBox>
      )}
    </Card>
  );
};
