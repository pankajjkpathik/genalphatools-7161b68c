import { useState } from "react";
import { Card, Field, CalcButton, ResultBox, Stat, ErrorMsg, money, pct, fmt, num } from "./ui";

export const MRRForm = () => {
  const [customers, setCustomers] = useState("");
  const [arpu, setArpu] = useState("");
  const [r, setR] = useState<{ mrr: number; arr: number } | null>(null);
  const calc = () => {
    const c = num(customers), a = num(arpu);
    if (![c, a].every(Number.isFinite)) return setR(null);
    const mrr = c * a;
    setR({ mrr, arr: mrr * 12 });
  };
  return (
    <Card>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Field label="Active paying customers" value={customers} onChange={setCustomers} placeholder="450" />
        <Field label="Avg revenue per user / month ($)" value={arpu} onChange={setArpu} placeholder="79" />
      </div>
      <CalcButton onClick={calc} label="Calculate MRR" />
      {r && (
        <ResultBox label="Monthly Recurring Revenue" value={money(r.mrr, 0)}>
          <Stat label="ARR (×12)" value={money(r.arr, 0)} />
        </ResultBox>
      )}
    </Card>
  );
};

export const ARRForm = () => {
  const [mrr, setMrr] = useState("");
  const [r, setR] = useState<number | null>(null);
  const calc = () => {
    const m = num(mrr);
    if (!Number.isFinite(m)) return setR(null);
    setR(m * 12);
  };
  return (
    <Card>
      <Field label="Current MRR ($)" value={mrr} onChange={setMrr} placeholder="42000" />
      <CalcButton onClick={calc} label="Calculate ARR" />
      {r !== null && <ResultBox label="Annual Recurring Revenue" value={money(r, 0)} sub="MRR × 12" />}
    </Card>
  );
};

export const ChurnForm = () => {
  const [start, setStart] = useState("");
  const [lost, setLost] = useState("");
  const [r, setR] = useState<{ monthly: number; annualized: number } | null>(null);
  const calc = () => {
    const s = num(start), l = num(lost);
    if (![s, l].every(Number.isFinite) || s <= 0) return setR(null);
    const monthly = (l / s) * 100;
    const annualized = (1 - Math.pow(1 - monthly / 100, 12)) * 100;
    setR({ monthly, annualized });
  };
  return (
    <Card>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Field label="Customers at start of month" value={start} onChange={setStart} placeholder="500" />
        <Field label="Customers lost during month" value={lost} onChange={setLost} placeholder="15" />
      </div>
      <CalcButton onClick={calc} label="Calculate Churn" />
      {r && (
        <ResultBox label="Monthly Churn Rate" value={pct(r.monthly)} tone={r.monthly < 3 ? "accent" : r.monthly < 5 ? "primary" : "destructive"}>
          <Stat label="Annualized churn" value={pct(r.annualized)} />
          <Stat label="Annualized retention" value={pct(100 - r.annualized)} />
        </ResultBox>
      )}
    </Card>
  );
};

export const RetentionForm = () => {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [acq, setAcq] = useState("");
  const [r, setR] = useState<{ retention: number; churn: number } | null>(null);
  const [err, setErr] = useState("");
  const calc = () => {
    setErr("");
    const s = num(start), e = num(end), a = num(acq);
    if (![s, e, a].every(Number.isFinite) || s <= 0) return setR(null);
    if (a > e) { setErr("New customers acquired can't exceed end-of-period customer count."); return setR(null); }
    const retention = ((e - a) / s) * 100;
    setR({ retention, churn: 100 - retention });
  };
  return (
    <Card>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <Field label="Customers at start" value={start} onChange={setStart} placeholder="500" />
        <Field label="Customers at end" value={end} onChange={setEnd} placeholder="540" />
        <Field label="New customers acquired" value={acq} onChange={setAcq} placeholder="80" />
      </div>
      <CalcButton onClick={calc} label="Calculate Retention" />
      <ErrorMsg>{err}</ErrorMsg>
      {r && (
        <ResultBox label="Customer Retention Rate" value={pct(r.retention)} tone={r.retention >= 90 ? "accent" : "primary"}>
          <Stat label="Implied churn" value={pct(r.churn)} />
        </ResultBox>
      )}
    </Card>
  );
};

export const BurnRateForm = () => {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [months, setMonths] = useState("3");
  const [r, setR] = useState<{ monthly: number; runway: number | null } | null>(null);
  const calc = () => {
    const s = num(start), e = num(end), m = num(months);
    if (![s, e, m].every(Number.isFinite) || m <= 0) return setR(null);
    const monthly = (s - e) / m;
    const runway = monthly > 0 ? e / monthly : null;
    setR({ monthly, runway });
  };
  return (
    <Card>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <Field label="Cash at start ($)" value={start} onChange={setStart} placeholder="2000000" />
        <Field label="Cash at end ($)" value={end} onChange={setEnd} placeholder="1700000" />
        <Field label="Months elapsed" value={months} onChange={setMonths} />
      </div>
      <CalcButton onClick={calc} label="Calculate Burn Rate" />
      {r && (
        <ResultBox label="Monthly Net Burn" value={money(r.monthly, 0)} tone={r.monthly > 0 ? "destructive" : "accent"}>
          <Stat label="Runway" value={r.runway === null ? "∞ (profitable)" : `${fmt(r.runway, 1)} months`} />
        </ResultBox>
      )}
    </Card>
  );
};
