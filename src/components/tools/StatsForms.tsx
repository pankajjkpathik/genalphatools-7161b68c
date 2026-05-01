import { useState } from "react";
import { Card, Field, TextArea, Select, CalcButton, ResultBox, Stat, ErrorMsg, fmt, pct, num } from "./ui";
import {
  parseNumbers, mean, stdDev, variance, normalCdf, inverseNormalCdf, zCritical,
  pearson, linearRegression, round,
} from "@/lib/stats";

export const VarianceForm = () => {
  const [input, setInput] = useState("");
  const [type, setType] = useState<"sample" | "population">("sample");
  const [r, setR] = useState<{ variance: number; sd: number; mean: number; n: number } | null>(null);
  const calc = () => {
    const a = parseNumbers(input);
    if (a.length < 2) return setR(null);
    const sample = type === "sample";
    setR({ variance: variance(a, sample), sd: stdDev(a, sample), mean: mean(a), n: a.length });
  };
  return (
    <Card>
      <TextArea label="Enter numbers (comma or space separated)" value={input} onChange={setInput} placeholder="4, 8, 6, 5, 3, 7, 9, 2" />
      <div className="mt-3">
        <Select label="Data type" value={type} onChange={(v) => setType(v as "sample" | "population")}
          options={[{ value: "sample", label: "Sample (n−1)" }, { value: "population", label: "Population (n)" }]} />
      </div>
      <CalcButton onClick={calc} label="Calculate Variance" />
      {r && (
        <ResultBox label="Variance" value={fmt(r.variance, 4)}>
          <Stat label="Std deviation" value={fmt(r.sd, 4)} />
          <Stat label="Mean" value={fmt(r.mean, 4)} />
          <Stat label="Count" value={r.n} />
        </ResultBox>
      )}
    </Card>
  );
};

export const ZScoreForm = () => {
  const [x, setX] = useState("");
  const [m, setM] = useState("");
  const [sd, setSd] = useState("");
  const [r, setR] = useState<{ z: number; pBelow: number; pAbove: number } | null>(null);
  const [err, setErr] = useState("");
  const calc = () => {
    setErr("");
    const xv = num(x), mv = num(m), sv = num(sd);
    if (![xv, mv, sv].every(Number.isFinite)) return setR(null);
    if (sv <= 0) { setErr("Standard deviation must be greater than 0."); return setR(null); }
    const z = (xv - mv) / sv;
    const pBelow = normalCdf(z) * 100;
    setR({ z, pBelow, pAbove: 100 - pBelow });
  };
  return (
    <Card>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <Field label="Value (x)" value={x} onChange={setX} placeholder="85" />
        <Field label="Mean (μ)" value={m} onChange={setM} placeholder="75" />
        <Field label="Std deviation (σ)" value={sd} onChange={setSd} placeholder="10" />
      </div>
      <CalcButton onClick={calc} label="Calculate Z-Score" />
      <ErrorMsg>{err}</ErrorMsg>
      {r && (
        <ResultBox label="Z-Score" value={fmt(r.z, 4)} tone={Math.abs(r.z) > 2 ? "accent" : "primary"}>
          <Stat label="% below" value={pct(r.pBelow)} />
          <Stat label="% above" value={pct(r.pAbove)} />
          <Stat label="Interpretation" value={Math.abs(r.z) >= 2 ? "Unusual" : "Typical"} />
        </ResultBox>
      )}
    </Card>
  );
};

export const PValueForm = () => {
  const [z, setZ] = useState("");
  const [tail, setTail] = useState<"two" | "left" | "right">("two");
  const [r, setR] = useState<{ p: number; significant: boolean } | null>(null);
  const calc = () => {
    const zv = num(z);
    if (!Number.isFinite(zv)) return setR(null);
    let p: number;
    if (tail === "left") p = normalCdf(zv);
    else if (tail === "right") p = 1 - normalCdf(zv);
    else p = 2 * (1 - normalCdf(Math.abs(zv)));
    setR({ p, significant: p < 0.05 });
  };
  return (
    <Card>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Field label="Z-score (test statistic)" value={z} onChange={setZ} placeholder="1.96" step="0.0001" />
        <Select label="Tail" value={tail} onChange={(v) => setTail(v as "two" | "left" | "right")}
          options={[{ value: "two", label: "Two-tailed" }, { value: "left", label: "Left (lower)" }, { value: "right", label: "Right (upper)" }]} />
      </div>
      <CalcButton onClick={calc} label="Calculate P-Value" />
      {r && (
        <ResultBox label="P-Value" value={r.p < 0.0001 ? "<0.0001" : fmt(r.p, 4)} tone={r.significant ? "accent" : "destructive"}>
          <Stat label="α = 0.05" value={r.significant ? "Significant" : "Not significant"} />
        </ResultBox>
      )}
    </Card>
  );
};

export const ConfidenceIntervalForm = () => {
  const [m, setM] = useState("");
  const [sd, setSd] = useState("");
  const [n, setN] = useState("");
  const [conf, setConf] = useState("0.95");
  const [r, setR] = useState<{ lo: number; hi: number; moe: number } | null>(null);
  const calc = () => {
    const mv = num(m), sv = num(sd), nv = num(n), cv = num(conf);
    if (![mv, sv, nv, cv].every(Number.isFinite) || nv <= 0 || sv < 0 || cv <= 0 || cv >= 1) return setR(null);
    const z = zCritical(cv);
    const moe = z * (sv / Math.sqrt(nv));
    setR({ lo: mv - moe, hi: mv + moe, moe });
  };
  return (
    <Card>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Field label="Sample mean (x̄)" value={m} onChange={setM} placeholder="100" />
        <Field label="Standard deviation (σ)" value={sd} onChange={setSd} placeholder="15" />
        <Field label="Sample size (n)" value={n} onChange={setN} placeholder="50" />
        <Select label="Confidence level" value={conf} onChange={setConf}
          options={[{ value: "0.90", label: "90%" }, { value: "0.95", label: "95%" }, { value: "0.99", label: "99%" }]} />
      </div>
      <CalcButton onClick={calc} label="Calculate CI" />
      {r && (
        <ResultBox label="Confidence Interval" value={`${fmt(r.lo, 3)} – ${fmt(r.hi, 3)}`}>
          <Stat label="Margin of error" value={`±${fmt(r.moe, 3)}`} />
        </ResultBox>
      )}
    </Card>
  );
};

export const MarginOfErrorForm = () => {
  const [n, setN] = useState("");
  const [p, setP] = useState("0.5");
  const [conf, setConf] = useState("0.95");
  const [r, setR] = useState<number | null>(null);
  const calc = () => {
    const nv = num(n), pv = num(p), cv = num(conf);
    if (![nv, pv, cv].every(Number.isFinite) || nv <= 0 || pv < 0 || pv > 1) return setR(null);
    const z = zCritical(cv);
    setR(z * Math.sqrt((pv * (1 - pv)) / nv) * 100);
  };
  return (
    <Card>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <Field label="Sample size (n)" value={n} onChange={setN} placeholder="1000" />
        <Field label="Proportion (p, 0–1)" value={p} onChange={setP} placeholder="0.5" step="0.01" />
        <Select label="Confidence level" value={conf} onChange={setConf}
          options={[{ value: "0.90", label: "90%" }, { value: "0.95", label: "95%" }, { value: "0.99", label: "99%" }]} />
      </div>
      <CalcButton onClick={calc} label="Calculate Margin of Error" />
      {r !== null && <ResultBox label="Margin of Error" value={`±${fmt(r, 2)}%`} />}
    </Card>
  );
};

export const SampleSizeForm = () => {
  const [moe, setMoe] = useState("5");
  const [p, setP] = useState("0.5");
  const [conf, setConf] = useState("0.95");
  const [pop, setPop] = useState("");
  const [r, setR] = useState<number | null>(null);
  const calc = () => {
    const e = num(moe) / 100, pv = num(p), cv = num(conf), N = num(pop);
    if (![e, pv, cv].every(Number.isFinite) || e <= 0 || pv <= 0 || pv >= 1) return setR(null);
    const z = zCritical(cv);
    let nInf = (z * z * pv * (1 - pv)) / (e * e);
    if (Number.isFinite(N) && N > 0) nInf = nInf / (1 + (nInf - 1) / N);
    setR(Math.ceil(nInf));
  };
  return (
    <Card>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Field label="Desired margin of error (%)" value={moe} onChange={setMoe} placeholder="5" />
        <Field label="Estimated proportion (0–1)" value={p} onChange={setP} placeholder="0.5" step="0.01" />
        <Select label="Confidence level" value={conf} onChange={setConf}
          options={[{ value: "0.90", label: "90%" }, { value: "0.95", label: "95%" }, { value: "0.99", label: "99%" }]} />
        <Field label="Population size (optional)" value={pop} onChange={setPop} placeholder="100000" />
      </div>
      <CalcButton onClick={calc} label="Calculate Sample Size" />
      {r !== null && <ResultBox label="Required Sample Size" value={fmt(r, 0)} sub="respondents" />}
    </Card>
  );
};

export const RegressionForm = () => {
  const [xs, setXs] = useState("");
  const [ys, setYs] = useState("");
  const [r, setR] = useState<{ slope: number; intercept: number; r2: number; r: number } | null>(null);
  const [err, setErr] = useState("");
  const calc = () => {
    setErr("");
    const xa = parseNumbers(xs), ya = parseNumbers(ys);
    if (xa.length < 2 || xa.length !== ya.length) {
      setErr("Provide at least 2 X and Y values, with equal counts.");
      return setR(null);
    }
    setR(linearRegression(xa, ya));
  };
  return (
    <Card>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <TextArea label="X values" value={xs} onChange={setXs} placeholder="1, 2, 3, 4, 5" />
        <TextArea label="Y values" value={ys} onChange={setYs} placeholder="2, 4, 5, 4, 5" />
      </div>
      <CalcButton onClick={calc} label="Run Regression" />
      <ErrorMsg>{err}</ErrorMsg>
      {r && (
        <ResultBox label="Regression Equation" value={`y = ${round(r.intercept, 4)} + ${round(r.slope, 4)}x`}>
          <Stat label="Slope (b)" value={fmt(r.slope, 4)} />
          <Stat label="Intercept (a)" value={fmt(r.intercept, 4)} />
          <Stat label="R²" value={fmt(r.r2, 4)} />
        </ResultBox>
      )}
    </Card>
  );
};

export const CorrelationForm = () => {
  const [xs, setXs] = useState("");
  const [ys, setYs] = useState("");
  const [r, setR] = useState<{ r: number; strength: string } | null>(null);
  const [err, setErr] = useState("");
  const interp = (v: number) => {
    const a = Math.abs(v);
    if (a >= 0.7) return v >= 0 ? "Strong positive" : "Strong negative";
    if (a >= 0.3) return v >= 0 ? "Moderate positive" : "Moderate negative";
    if (a > 0) return v >= 0 ? "Weak positive" : "Weak negative";
    return "No correlation";
  };
  const calc = () => {
    setErr("");
    const xa = parseNumbers(xs), ya = parseNumbers(ys);
    if (xa.length < 2 || xa.length !== ya.length) {
      setErr("Provide at least 2 X and Y values, with equal counts.");
      return setR(null);
    }
    const v = pearson(xa, ya);
    setR({ r: v, strength: interp(v) });
  };
  return (
    <Card>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <TextArea label="X values" value={xs} onChange={setXs} placeholder="1, 2, 3, 4, 5" />
        <TextArea label="Y values" value={ys} onChange={setYs} placeholder="2, 4, 5, 4, 5" />
      </div>
      <CalcButton onClick={calc} label="Calculate Correlation" />
      <ErrorMsg>{err}</ErrorMsg>
      {r && (
        <ResultBox label="Pearson r" value={fmt(r.r, 4)}>
          <Stat label="Strength" value={r.strength} />
          <Stat label="R²" value={fmt(r.r * r.r, 4)} />
        </ResultBox>
      )}
    </Card>
  );
};
