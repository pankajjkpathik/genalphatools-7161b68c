import { useState } from "react";
import { Card, Field, TextArea, Select, CalcButton, ResultBox, Stat, ErrorMsg, money, pct, fmt, num } from "./ui";
import { compoundInterest, npv, irr, loanPayment, retirementProjection, inflationAdjust, futureValueOfMoney } from "@/lib/finance";
import { parseNumbers } from "@/lib/stats";

export const CompoundInterestForm = () => {
  const [p, setP] = useState("10000");
  const [r, setR] = useState("8");
  const [t, setT] = useState("10");
  const [m, setM] = useState("250");
  const [n, setN] = useState("12");
  const [out, setOut] = useState<ReturnType<typeof compoundInterest> | null>(null);
  const calc = () => {
    const pv = num(p), rv = num(r), tv = num(t), mv = num(m), nv = num(n);
    if (![pv, rv, tv, mv, nv].every(Number.isFinite) || tv < 0 || nv <= 0) return setOut(null);
    setOut(compoundInterest(pv, rv, tv, nv, mv));
  };
  return (
    <Card>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <Field label="Principal ($)" value={p} onChange={setP} />
        <Field label="Annual rate (%)" value={r} onChange={setR} step="0.01" />
        <Field label="Years" value={t} onChange={setT} />
        <Field label="Monthly contribution ($)" value={m} onChange={setM} />
        <Select label="Compounded" value={n} onChange={setN}
          options={[
            { value: "1", label: "Annually" },
            { value: "4", label: "Quarterly" },
            { value: "12", label: "Monthly" },
            { value: "365", label: "Daily" },
          ]} />
      </div>
      <CalcButton onClick={calc} label="Project Future Value" />
      {out && (
        <ResultBox label="Future Value" value={money(out.total, 0)}>
          <Stat label="Total contributed" value={money(out.totalContributed, 0)} />
          <Stat label="Interest earned" value={money(out.interestEarned, 0)} />
        </ResultBox>
      )}
    </Card>
  );
};

export const InvestmentReturnForm = () => {
  const [init, setInit] = useState("");
  const [final, setFinal] = useState("");
  const [years, setYears] = useState("5");
  const [r, setR] = useState<{ totalReturn: number; cagr: number; profit: number } | null>(null);
  const calc = () => {
    const i = num(init), f = num(final), y = num(years);
    if (![i, f, y].every(Number.isFinite) || i <= 0 || y <= 0) return setR(null);
    setR({ totalReturn: ((f - i) / i) * 100, cagr: (Math.pow(f / i, 1 / y) - 1) * 100, profit: f - i });
  };
  return (
    <Card>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <Field label="Initial investment ($)" value={init} onChange={setInit} placeholder="10000" />
        <Field label="Final value ($)" value={final} onChange={setFinal} placeholder="18500" />
        <Field label="Years held" value={years} onChange={setYears} />
      </div>
      <CalcButton onClick={calc} label="Calculate Returns" />
      {r && (
        <ResultBox label="Total Return" value={pct(r.totalReturn)} tone={r.totalReturn >= 0 ? "accent" : "destructive"}>
          <Stat label="Annualized (CAGR)" value={pct(r.cagr)} />
          <Stat label="Profit / Loss" value={money(r.profit, 0)} />
        </ResultBox>
      )}
    </Card>
  );
};

export const NPVForm = () => {
  const [rate, setRate] = useState("10");
  const [flows, setFlows] = useState("");
  const [r, setR] = useState<number | null>(null);
  const [err, setErr] = useState("");
  const calc = () => {
    setErr("");
    const rv = num(rate);
    const cf = parseNumbers(flows);
    if (!Number.isFinite(rv) || cf.length < 2) {
      setErr("Enter discount rate and at least 2 cash flows (year 0 first, usually negative).");
      return setR(null);
    }
    setR(npv(rv, cf));
  };
  return (
    <Card>
      <Field label="Discount rate (%)" value={rate} onChange={setRate} step="0.01" />
      <div className="mt-3">
        <TextArea label="Cash flows (year 0, year 1, year 2, …)" value={flows} onChange={setFlows} placeholder="-100000, 30000, 35000, 40000, 45000" />
      </div>
      <CalcButton onClick={calc} label="Calculate NPV" />
      <ErrorMsg>{err}</ErrorMsg>
      {r !== null && (
        <ResultBox label="Net Present Value" value={money(r, 2)} tone={r >= 0 ? "accent" : "destructive"}
          sub={r >= 0 ? "Project creates value" : "Project destroys value"} />
      )}
    </Card>
  );
};

export const IRRForm = () => {
  const [flows, setFlows] = useState("");
  const [r, setR] = useState<number | null>(null);
  const [err, setErr] = useState("");
  const calc = () => {
    setErr("");
    const cf = parseNumbers(flows);
    if (cf.length < 2) { setErr("Enter at least 2 cash flows."); return setR(null); }
    const v = irr(cf);
    if (v === null) { setErr("Could not converge — check that cash flows include both positive and negative values."); return setR(null); }
    setR(v);
  };
  return (
    <Card>
      <TextArea label="Cash flows (year 0, year 1, year 2, …)" value={flows} onChange={setFlows} placeholder="-100000, 30000, 35000, 40000, 45000" />
      <CalcButton onClick={calc} label="Calculate IRR" />
      <ErrorMsg>{err}</ErrorMsg>
      {r !== null && <ResultBox label="Internal Rate of Return" value={pct(r)} tone={r >= 0 ? "accent" : "destructive"} />}
    </Card>
  );
};

const PaymentBase = ({ defaultRate, label }: { defaultRate: string; label: string }) => {
  const [p, setP] = useState("");
  const [rate, setRate] = useState(defaultRate);
  const [years, setYears] = useState("30");
  const [r, setR] = useState<{ monthly: number; total: number; interest: number } | null>(null);
  const calc = () => {
    const pv = num(p), rv = num(rate), yv = num(years);
    if (![pv, rv, yv].every(Number.isFinite) || pv <= 0 || yv <= 0 || rv < 0) return setR(null);
    const m = loanPayment(pv, rv, yv);
    const total = m * yv * 12;
    setR({ monthly: m, total, interest: total - pv });
  };
  return (
    <Card>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <Field label="Loan amount ($)" value={p} onChange={setP} placeholder="350000" />
        <Field label="Annual rate (%)" value={rate} onChange={setRate} step="0.01" />
        <Field label="Term (years)" value={years} onChange={setYears} />
      </div>
      <CalcButton onClick={calc} label={label} />
      {r && (
        <ResultBox label="Monthly Payment" value={money(r.monthly, 2)}>
          <Stat label="Total paid" value={money(r.total, 0)} />
          <Stat label="Total interest" value={money(r.interest, 0)} />
        </ResultBox>
      )}
    </Card>
  );
};

export const MortgageForm = () => <PaymentBase defaultRate="6.5" label="Calculate Mortgage" />;
export const LoanForm = () => <PaymentBase defaultRate="9" label="Calculate Loan Payment" />;

export const DTIForm = () => {
  const [debt, setDebt] = useState("");
  const [income, setIncome] = useState("");
  const [r, setR] = useState<{ ratio: number; verdict: string } | null>(null);
  const calc = () => {
    const d = num(debt), i = num(income);
    if (![d, i].every(Number.isFinite) || i <= 0) return setR(null);
    const ratio = (d / i) * 100;
    const v = ratio < 36 ? "Healthy" : ratio < 43 ? "Borderline" : "High risk";
    setR({ ratio, verdict: v });
  };
  return (
    <Card>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Field label="Total monthly debt payments ($)" value={debt} onChange={setDebt} placeholder="2200" />
        <Field label="Gross monthly income ($)" value={income} onChange={setIncome} placeholder="7500" />
      </div>
      <CalcButton onClick={calc} label="Calculate DTI" />
      {r && (
        <ResultBox label="Debt-to-Income Ratio" value={pct(r.ratio)}
          tone={r.ratio < 36 ? "accent" : r.ratio < 43 ? "primary" : "destructive"}
          sub={r.verdict} />
      )}
    </Card>
  );
};

export const RetirementForm = () => {
  const [age, setAge] = useState("30");
  const [retire, setRetire] = useState("65");
  const [savings, setSavings] = useState("25000");
  const [monthly, setMonthly] = useState("500");
  const [ret, setRet] = useState("7");
  const [r, setR] = useState<ReturnType<typeof retirementProjection> | null>(null);
  const calc = () => {
    const a = num(age), rt = num(retire), sv = num(savings), mn = num(monthly), rn = num(ret);
    if (![a, rt, sv, mn, rn].every(Number.isFinite) || rt <= a) return setR(null);
    setR(retirementProjection(a, rt, sv, mn, rn));
  };
  return (
    <Card>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <Field label="Current age" value={age} onChange={setAge} />
        <Field label="Retirement age" value={retire} onChange={setRetire} />
        <Field label="Current savings ($)" value={savings} onChange={setSavings} />
        <Field label="Monthly contribution ($)" value={monthly} onChange={setMonthly} />
        <Field label="Expected return (%)" value={ret} onChange={setRet} step="0.1" />
      </div>
      <CalcButton onClick={calc} label="Project Retirement Savings" />
      {r && (
        <ResultBox label="Projected Nest Egg" value={money(r.total, 0)}>
          <Stat label="Total contributed" value={money(r.totalContributed, 0)} />
          <Stat label="Investment growth" value={money(r.interestEarned, 0)} />
        </ResultBox>
      )}
    </Card>
  );
};

export const InflationForm = () => {
  const [amt, setAmt] = useState("10000");
  const [rate, setRate] = useState("3");
  const [years, setYears] = useState("10");
  const [r, setR] = useState<{ future: number; realToday: number } | null>(null);
  const calc = () => {
    const a = num(amt), rv = num(rate), y = num(years);
    if (![a, rv, y].every(Number.isFinite) || y < 0) return setR(null);
    setR({ future: futureValueOfMoney(a, rv, y), realToday: inflationAdjust(a, rv, y) });
  };
  return (
    <Card>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <Field label="Amount today ($)" value={amt} onChange={setAmt} />
        <Field label="Annual inflation (%)" value={rate} onChange={setRate} step="0.1" />
        <Field label="Years" value={years} onChange={setYears} />
      </div>
      <CalcButton onClick={calc} label="Calculate Inflation Impact" />
      {r && (
        <ResultBox label="Equivalent Future Cost" value={money(r.future, 0)} sub="needed to match today's purchasing power">
          <Stat label="Today's $ in real terms" value={money(r.realToday, 0)} />
        </ResultBox>
      )}
    </Card>
  );
};

export const SavingsGoalForm = () => {
  const [goal, setGoal] = useState("100000");
  const [years, setYears] = useState("10");
  const [rate, setRate] = useState("6");
  const [start, setStart] = useState("0");
  const [r, setR] = useState<{ monthly: number } | null>(null);
  const calc = () => {
    const g = num(goal), y = num(years), rt = num(rate), s = num(start);
    if (![g, y, rt, s].every(Number.isFinite) || y <= 0) return setR(null);
    const months = y * 12;
    const mr = rt / 100 / 12;
    const fvStart = s * Math.pow(1 + mr, months);
    const need = g - fvStart;
    const monthly = mr === 0 ? need / months : (need * mr) / (Math.pow(1 + mr, months) - 1);
    setR({ monthly: Math.max(0, monthly) });
  };
  return (
    <Card>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Field label="Savings goal ($)" value={goal} onChange={setGoal} />
        <Field label="Years to reach goal" value={years} onChange={setYears} />
        <Field label="Expected annual return (%)" value={rate} onChange={setRate} step="0.1" />
        <Field label="Starting balance ($)" value={start} onChange={setStart} />
      </div>
      <CalcButton onClick={calc} label="Calculate Required Savings" />
      {r && <ResultBox label="Monthly Savings Needed" value={money(r.monthly, 2)} sub="to reach your goal" />}
    </Card>
  );
};
