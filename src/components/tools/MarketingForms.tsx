import { useState } from "react";
import { Card, Field, CalcButton, ResultBox, Stat, ErrorMsg, money, pct, fmt, num } from "./ui";

export const CACForm = () => {
  const [spend, setSpend] = useState("");
  const [customers, setCustomers] = useState("");
  const [r, setR] = useState<number | null>(null);
  const calc = () => {
    const s = num(spend), c = num(customers);
    if (!Number.isFinite(s) || !Number.isFinite(c) || c <= 0) return setR(null);
    setR(s / c);
  };
  return (
    <Card>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Field label="Total sales & marketing spend ($)" value={spend} onChange={setSpend} placeholder="50000" />
        <Field label="New customers acquired" value={customers} onChange={setCustomers} placeholder="120" />
      </div>
      <CalcButton onClick={calc} label="Calculate CAC" />
      {r !== null && <ResultBox label="Customer Acquisition Cost" value={money(r)} sub="cost per new customer" />}
    </Card>
  );
};

export const LTVForm = () => {
  const [arpu, setArpu] = useState("");
  const [margin, setMargin] = useState("75");
  const [lifetime, setLifetime] = useState("24");
  const [r, setR] = useState<number | null>(null);
  const calc = () => {
    const a = num(arpu), m = num(margin), l = num(lifetime);
    if (![a, m, l].every(Number.isFinite)) return setR(null);
    setR(a * (m / 100) * l);
  };
  return (
    <Card>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <Field label="Avg revenue per user / month ($)" value={arpu} onChange={setArpu} placeholder="99" />
        <Field label="Gross margin (%)" value={margin} onChange={setMargin} placeholder="75" />
        <Field label="Avg customer lifetime (months)" value={lifetime} onChange={setLifetime} placeholder="24" />
      </div>
      <CalcButton onClick={calc} label="Calculate LTV" />
      {r !== null && <ResultBox label="Customer Lifetime Value" value={money(r)} sub="margin-adjusted" />}
    </Card>
  );
};

export const ConversionRateForm = () => {
  const [conv, setConv] = useState("");
  const [vis, setVis] = useState("");
  const [r, setR] = useState<{ rate: number } | null>(null);
  const calc = () => {
    const c = num(conv), v = num(vis);
    if (!Number.isFinite(c) || !Number.isFinite(v) || v <= 0) return setR(null);
    setR({ rate: (c / v) * 100 });
  };
  return (
    <Card>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Field label="Conversions" value={conv} onChange={setConv} placeholder="320" />
        <Field label="Total visitors" value={vis} onChange={setVis} placeholder="12500" />
      </div>
      <CalcButton onClick={calc} label="Calculate Conversion Rate" />
      {r && <ResultBox label="Conversion Rate" value={pct(r.rate, 2)} />}
    </Card>
  );
};

export const ProfitMarginForm = () => {
  const [revenue, setRevenue] = useState("");
  const [cost, setCost] = useState("");
  const [r, setR] = useState<{ margin: number; profit: number; markup: number } | null>(null);
  const calc = () => {
    const rev = num(revenue), c = num(cost);
    if (!Number.isFinite(rev) || !Number.isFinite(c) || rev <= 0) return setR(null);
    const profit = rev - c;
    setR({ margin: (profit / rev) * 100, profit, markup: c > 0 ? (profit / c) * 100 : NaN });
  };
  return (
    <Card>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Field label="Revenue / price ($)" value={revenue} onChange={setRevenue} placeholder="100" />
        <Field label="Cost ($)" value={cost} onChange={setCost} placeholder="60" />
      </div>
      <CalcButton onClick={calc} label="Calculate Margin" />
      {r && (
        <ResultBox label="Profit Margin" value={pct(r.margin)} tone={r.margin >= 0 ? "accent" : "destructive"}>
          <Stat label="Profit" value={money(r.profit)} />
          <Stat label="Equivalent markup" value={pct(r.markup)} />
        </ResultBox>
      )}
    </Card>
  );
};

export const MarkupForm = () => {
  const [cost, setCost] = useState("");
  const [markup, setMarkup] = useState("");
  const [r, setR] = useState<{ price: number; profit: number; margin: number } | null>(null);
  const calc = () => {
    const c = num(cost), m = num(markup);
    if (![c, m].every(Number.isFinite) || c <= 0) return setR(null);
    const profit = c * (m / 100);
    const price = c + profit;
    setR({ price, profit, margin: (profit / price) * 100 });
  };
  return (
    <Card>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Field label="Cost per unit ($)" value={cost} onChange={setCost} placeholder="50" />
        <Field label="Markup (%)" value={markup} onChange={setMarkup} placeholder="50" />
      </div>
      <CalcButton onClick={calc} label="Calculate Selling Price" />
      {r && (
        <ResultBox label="Selling Price" value={money(r.price)}>
          <Stat label="Profit / unit" value={money(r.profit)} />
          <Stat label="Equivalent margin" value={pct(r.margin)} />
        </ResultBox>
      )}
    </Card>
  );
};

export const CPLForm = () => {
  const [spend, setSpend] = useState("");
  const [leads, setLeads] = useState("");
  const [r, setR] = useState<number | null>(null);
  const calc = () => {
    const s = num(spend), l = num(leads);
    if (![s, l].every(Number.isFinite) || l <= 0) return setR(null);
    setR(s / l);
  };
  return (
    <Card>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Field label="Total campaign spend ($)" value={spend} onChange={setSpend} placeholder="8000" />
        <Field label="Leads generated" value={leads} onChange={setLeads} placeholder="240" />
      </div>
      <CalcButton onClick={calc} label="Calculate CPL" />
      {r !== null && <ResultBox label="Cost Per Lead" value={money(r)} />}
    </Card>
  );
};

export const CPAForm = () => {
  const [spend, setSpend] = useState("");
  const [acq, setAcq] = useState("");
  const [r, setR] = useState<number | null>(null);
  const calc = () => {
    const s = num(spend), a = num(acq);
    if (![s, a].every(Number.isFinite) || a <= 0) return setR(null);
    setR(s / a);
  };
  return (
    <Card>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Field label="Total ad spend ($)" value={spend} onChange={setSpend} placeholder="12000" />
        <Field label="Conversions / acquisitions" value={acq} onChange={setAcq} placeholder="180" />
      </div>
      <CalcButton onClick={calc} label="Calculate CPA" />
      {r !== null && <ResultBox label="Cost Per Acquisition" value={money(r)} />}
    </Card>
  );
};

export const SalesGrowthForm = () => {
  const [prev, setPrev] = useState("");
  const [curr, setCurr] = useState("");
  const [r, setR] = useState<{ growth: number; diff: number } | null>(null);
  const [err, setErr] = useState("");
  const calc = () => {
    setErr("");
    const p = num(prev), c = num(curr);
    if (![p, c].every(Number.isFinite)) return setR(null);
    if (p === 0) { setErr("Previous period cannot be zero."); return setR(null); }
    setR({ growth: ((c - p) / Math.abs(p)) * 100, diff: c - p });
  };
  return (
    <Card>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Field label="Previous period sales ($)" value={prev} onChange={setPrev} placeholder="120000" />
        <Field label="Current period sales ($)" value={curr} onChange={setCurr} placeholder="156000" />
      </div>
      <CalcButton onClick={calc} label="Calculate Growth" />
      <ErrorMsg>{err}</ErrorMsg>
      {r && (
        <ResultBox label="Sales Growth" value={pct(r.growth)} tone={r.growth >= 0 ? "accent" : "destructive"}>
          <Stat label="Absolute change" value={money(r.diff)} />
          <Stat label="Direction" value={r.growth >= 0 ? "↑ Growth" : "↓ Decline"} />
        </ResultBox>
      )}
    </Card>
  );
};
