// Pure finance helpers shared across calculators.

export const compoundInterest = (
  principal: number,
  annualRate: number,
  years: number,
  compoundsPerYear = 12,
  monthlyContribution = 0,
) => {
  const r = annualRate / 100;
  const n = compoundsPerYear;
  const t = years;
  // Future value of principal
  const fvPrincipal = principal * Math.pow(1 + r / n, n * t);
  // Future value of monthly contributions (annuity due of monthly payments compounded n times/year)
  const monthlyRate = r / 12;
  const months = t * 12;
  const fvContrib =
    monthlyRate === 0
      ? monthlyContribution * months
      : monthlyContribution * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
  const total = fvPrincipal + fvContrib;
  const totalContributed = principal + monthlyContribution * months;
  return { total, totalContributed, interestEarned: total - totalContributed };
};

export const npv = (rate: number, cashFlows: number[]) => {
  // cashFlows[0] is t=0
  const r = rate / 100;
  return cashFlows.reduce((s, cf, t) => s + cf / Math.pow(1 + r, t), 0);
};

/** Newton/bisection IRR. Returns annual % or null. */
export const irr = (cashFlows: number[], guess = 0.1): number | null => {
  if (cashFlows.length < 2) return null;
  const fn = (r: number) => cashFlows.reduce((s, cf, t) => s + cf / Math.pow(1 + r, t), 0);
  // Bisection between -0.99 and 10
  let lo = -0.99,
    hi = 10;
  let fLo = fn(lo),
    fHi = fn(hi);
  if (fLo * fHi > 0) {
    // Try to widen
    for (const h of [50, 200, 1000]) {
      hi = h;
      fHi = fn(hi);
      if (fLo * fHi <= 0) break;
    }
    if (fLo * fHi > 0) return null;
  }
  for (let i = 0; i < 200; i++) {
    const mid = (lo + hi) / 2;
    const fMid = fn(mid);
    if (Math.abs(fMid) < 1e-7) return mid * 100;
    if (fLo * fMid < 0) {
      hi = mid;
      fHi = fMid;
    } else {
      lo = mid;
      fLo = fMid;
    }
  }
  return ((lo + hi) / 2) * 100;
};

/** Standard mortgage / loan amortization payment. */
export const loanPayment = (principal: number, annualRate: number, years: number) => {
  const r = annualRate / 100 / 12;
  const n = years * 12;
  if (r === 0) return principal / n;
  return (principal * r) / (1 - Math.pow(1 + r, -n));
};

/** Retirement projection: contributing monthly until retirement age. */
export const retirementProjection = (
  currentAge: number,
  retireAge: number,
  currentSavings: number,
  monthlyContribution: number,
  annualReturn: number,
) => {
  const years = Math.max(0, retireAge - currentAge);
  return compoundInterest(currentSavings, annualReturn, years, 12, monthlyContribution);
};

export const inflationAdjust = (amount: number, annualInflation: number, years: number) =>
  amount / Math.pow(1 + annualInflation / 100, years);

export const futureValueOfMoney = (amount: number, annualInflation: number, years: number) =>
  amount * Math.pow(1 + annualInflation / 100, years);
