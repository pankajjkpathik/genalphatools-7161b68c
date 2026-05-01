import { ReactNode } from "react";

/** Shared minimal primitives for calculator forms — keeps look consistent and concise. */

export const Card = ({ children }: { children: ReactNode }) => (
  <div className="bg-card rounded-xl border-2 border-border p-6 shadow-card">{children}</div>
);

export const Field = ({
  label,
  value,
  onChange,
  placeholder,
  type = "number",
  step,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  step?: string;
}) => (
  <div>
    <label className="block text-sm font-medium mb-1.5">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      step={step}
      className="w-full px-4 py-3 rounded-lg border border-input bg-background text-sm focus:ring-2 focus:ring-ring focus:outline-none"
    />
  </div>
);

export const TextArea = ({
  label,
  value,
  onChange,
  placeholder,
  rows = 4,
  mono = true,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
  mono?: boolean;
}) => (
  <div>
    <label className="block text-sm font-medium mb-1.5">{label}</label>
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className={`w-full px-4 py-3 rounded-lg border border-input bg-background text-sm ${mono ? "font-mono" : ""} focus:ring-2 focus:ring-ring focus:outline-none`}
    />
  </div>
);

export const Select = ({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) => (
  <div>
    <label className="block text-sm font-medium mb-1.5">{label}</label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-3 rounded-lg border border-input bg-background text-sm"
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  </div>
);

export const CalcButton = ({ onClick, label }: { onClick: () => void; label: string }) => (
  <button
    onClick={onClick}
    className="mt-4 w-full bg-primary text-primary-foreground font-bold py-3 rounded-lg hover:opacity-90 transition-opacity"
  >
    ⚡ {label}
  </button>
);

export const ResultBox = ({
  label,
  value,
  tone = "primary",
  sub,
  children,
}: {
  label: string;
  value: ReactNode;
  tone?: "primary" | "accent" | "destructive";
  sub?: string;
  children?: ReactNode;
}) => {
  const toneClass =
    tone === "accent" ? "text-accent" : tone === "destructive" ? "text-destructive" : "text-primary";
  return (
    <div className="mt-6 p-6 rounded-xl border-2 border-primary/30 bg-primary/5 animate-fade-in text-center">
      <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2 font-semibold">{label}</p>
      <span className={`text-5xl font-heading font-bold ${toneClass}`}>{value}</span>
      {sub && <p className="text-sm text-muted-foreground mt-1">{sub}</p>}
      {children && <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2">{children}</div>}
    </div>
  );
};

export const Stat = ({ label, value }: { label: string; value: ReactNode }) => (
  <div className="bg-card rounded-lg p-3">
    <p className="text-xs text-muted-foreground">{label}</p>
    <p className="font-bold text-base">{value}</p>
  </div>
);

export const ErrorMsg = ({ children }: { children: ReactNode }) =>
  children ? <p className="mt-3 text-sm text-destructive">{children}</p> : null;

export const fmt = (n: number, d = 2) =>
  Number.isFinite(n)
    ? n.toLocaleString("en-US", { maximumFractionDigits: d, minimumFractionDigits: 0 })
    : "—";

export const money = (n: number, d = 2) =>
  Number.isFinite(n) ? `$${fmt(n, d)}` : "—";

export const pct = (n: number, d = 2) =>
  Number.isFinite(n) ? `${fmt(n, d)}%` : "—";

export const num = (s: string) => {
  const n = parseFloat(s);
  return Number.isFinite(n) ? n : NaN;
};
