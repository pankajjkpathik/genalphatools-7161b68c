import { useMemo, useState } from "react";
import { Card, TextArea, Select, Field, CalcButton, ResultBox, Stat, ErrorMsg, fmt, num } from "./ui";
import { parseNumbers, mean, median, stdDev, parseCsv, pearson } from "@/lib/stats";

/** Inline SVG bar/line/pie chart generator. */
export const ChartGeneratorForm = () => {
  const [labels, setLabels] = useState("Jan, Feb, Mar, Apr, May, Jun");
  const [values, setValues] = useState("12, 19, 14, 22, 27, 31");
  const [type, setType] = useState<"bar" | "line" | "pie">("bar");
  const [err, setErr] = useState("");

  const data = useMemo(() => {
    const ls = labels.split(/[,;]/).map(s => s.trim()).filter(Boolean);
    const vs = parseNumbers(values);
    if (ls.length === 0 || vs.length === 0 || ls.length !== vs.length) return null;
    return ls.map((label, i) => ({ label, value: vs[i] }));
  }, [labels, values]);

  const render = () => { setErr(data ? "" : "Provide equal counts of labels and numeric values."); };

  const palette = ["hsl(var(--primary))", "hsl(var(--accent))", "hsl(var(--secondary))", "hsl(var(--muted-foreground))", "hsl(var(--ring))", "hsl(var(--destructive))"];

  return (
    <Card>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <TextArea label="Labels (comma separated)" value={labels} onChange={setLabels} mono={false} rows={3} />
        <TextArea label="Values (comma separated)" value={values} onChange={setValues} rows={3} />
      </div>
      <div className="mt-3">
        <Select label="Chart type" value={type} onChange={(v) => setType(v as "bar" | "line" | "pie")}
          options={[{ value: "bar", label: "Bar" }, { value: "line", label: "Line" }, { value: "pie", label: "Pie" }]} />
      </div>
      <CalcButton onClick={render} label="Generate Chart" />
      <ErrorMsg>{err}</ErrorMsg>
      {data && <ChartSvg data={data} type={type} palette={palette} />}
    </Card>
  );
};

const ChartSvg = ({ data, type, palette }: { data: { label: string; value: number }[]; type: "bar" | "line" | "pie"; palette: string[] }) => {
  const w = 600, h = 320, pad = 40;
  if (type === "pie") {
    const total = data.reduce((s, d) => s + Math.max(0, d.value), 0);
    let acc = 0;
    const cx = w / 2, cy = h / 2, r = Math.min(w, h) / 2 - pad;
    return (
      <div className="mt-6 rounded-xl border-2 border-primary/30 bg-primary/5 p-4 animate-fade-in">
        <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-auto">
          {data.map((d, i) => {
            const v = Math.max(0, d.value);
            const start = (acc / total) * Math.PI * 2 - Math.PI / 2;
            acc += v;
            const end = (acc / total) * Math.PI * 2 - Math.PI / 2;
            const large = end - start > Math.PI ? 1 : 0;
            const x1 = cx + r * Math.cos(start), y1 = cy + r * Math.sin(start);
            const x2 = cx + r * Math.cos(end), y2 = cy + r * Math.sin(end);
            return <path key={i} d={`M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${large} 1 ${x2},${y2} Z`} fill={palette[i % palette.length]} />;
          })}
        </svg>
        <div className="mt-3 flex flex-wrap gap-3 text-xs">
          {data.map((d, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm" style={{ background: palette[i % palette.length] }} />
              <span>{d.label}: {fmt(d.value, 2)} ({fmt((d.value / total) * 100, 1)}%)</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  const max = Math.max(...data.map(d => d.value));
  const min = Math.min(0, ...data.map(d => d.value));
  const x = (i: number) => pad + ((w - pad * 2) * i) / Math.max(1, data.length - 1);
  const xBar = (i: number) => pad + ((w - pad * 2) * i) / data.length;
  const y = (v: number) => h - pad - ((v - min) / (max - min || 1)) * (h - pad * 2);
  return (
    <div className="mt-6 rounded-xl border-2 border-primary/30 bg-primary/5 p-4 animate-fade-in">
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-auto">
        <line x1={pad} y1={h - pad} x2={w - pad} y2={h - pad} stroke="hsl(var(--border))" />
        <line x1={pad} y1={pad} x2={pad} y2={h - pad} stroke="hsl(var(--border))" />
        {type === "bar" && data.map((d, i) => {
          const bw = (w - pad * 2) / data.length - 6;
          const yv = y(Math.max(0, d.value));
          const bh = h - pad - yv;
          return (
            <g key={i}>
              <rect x={xBar(i) + 3} y={yv} width={bw} height={bh} fill={palette[i % palette.length]} />
              <text x={xBar(i) + bw / 2 + 3} y={h - pad + 14} fontSize="10" textAnchor="middle" fill="hsl(var(--muted-foreground))">{d.label}</text>
              <text x={xBar(i) + bw / 2 + 3} y={yv - 4} fontSize="10" textAnchor="middle" fill="hsl(var(--foreground))">{fmt(d.value, 1)}</text>
            </g>
          );
        })}
        {type === "line" && (
          <>
            <polyline fill="none" stroke="hsl(var(--primary))" strokeWidth="2"
              points={data.map((d, i) => `${x(i)},${y(d.value)}`).join(" ")} />
            {data.map((d, i) => (
              <g key={i}>
                <circle cx={x(i)} cy={y(d.value)} r="4" fill="hsl(var(--primary))" />
                <text x={x(i)} y={h - pad + 14} fontSize="10" textAnchor="middle" fill="hsl(var(--muted-foreground))">{d.label}</text>
              </g>
            ))}
          </>
        )}
      </svg>
    </div>
  );
};

export const HistogramForm = () => {
  const [input, setInput] = useState("");
  const [bins, setBins] = useState("10");
  const [out, setOut] = useState<{ buckets: { lo: number; hi: number; count: number }[]; n: number; mean: number; median: number; sd: number } | null>(null);
  const [err, setErr] = useState("");
  const calc = () => {
    setErr("");
    const data = parseNumbers(input);
    const k = Math.max(2, Math.min(50, parseInt(bins) || 10));
    if (data.length < 2) { setErr("Provide at least 2 numeric values."); return setOut(null); }
    const min = Math.min(...data), max = Math.max(...data);
    const width = (max - min) / k || 1;
    const buckets = Array.from({ length: k }, (_, i) => ({ lo: min + i * width, hi: min + (i + 1) * width, count: 0 }));
    for (const v of data) {
      const idx = Math.min(k - 1, Math.floor((v - min) / width));
      buckets[idx].count++;
    }
    setOut({ buckets, n: data.length, mean: mean(data), median: median(data), sd: stdDev(data) });
  };
  const w = 600, h = 280, pad = 36;
  const maxC = out ? Math.max(...out.buckets.map(b => b.count)) : 0;
  return (
    <Card>
      <TextArea label="Numeric values" value={input} onChange={setInput} placeholder="3.2, 4.1, 5, 5.5, 6, 6.8, 7, 7.5, 8, 9.1" />
      <div className="mt-3">
        <Field label="Number of bins" value={bins} onChange={setBins} placeholder="10" />
      </div>
      <CalcButton onClick={calc} label="Generate Histogram" />
      <ErrorMsg>{err}</ErrorMsg>
      {out && (
        <div className="mt-6 rounded-xl border-2 border-primary/30 bg-primary/5 p-4 animate-fade-in">
          <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-auto">
            <line x1={pad} y1={h - pad} x2={w - pad} y2={h - pad} stroke="hsl(var(--border))" />
            <line x1={pad} y1={pad} x2={pad} y2={h - pad} stroke="hsl(var(--border))" />
            {out.buckets.map((b, i) => {
              const bw = (w - pad * 2) / out.buckets.length;
              const bh = ((h - pad * 2) * b.count) / (maxC || 1);
              return <rect key={i} x={pad + i * bw + 1} y={h - pad - bh} width={bw - 2} height={bh} fill="hsl(var(--primary))" />;
            })}
            <text x={pad} y={h - 4} fontSize="10" fill="hsl(var(--muted-foreground))">{fmt(out.buckets[0].lo, 2)}</text>
            <text x={w - pad} y={h - 4} fontSize="10" textAnchor="end" fill="hsl(var(--muted-foreground))">{fmt(out.buckets[out.buckets.length - 1].hi, 2)}</text>
          </svg>
          <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2">
            <Stat label="N" value={out.n} />
            <Stat label="Mean" value={fmt(out.mean, 3)} />
            <Stat label="Median" value={fmt(out.median, 3)} />
            <Stat label="Std Dev" value={fmt(out.sd, 3)} />
          </div>
        </div>
      )}
    </Card>
  );
};

export const CorrelationHeatmapForm = () => {
  const [input, setInput] = useState("");
  const [out, setOut] = useState<{ headers: string[]; matrix: number[][] } | null>(null);
  const [err, setErr] = useState("");
  const calc = () => {
    setErr("");
    const { headers, rows } = parseCsv(input);
    if (headers.length < 2 || rows.length < 2) { setErr("Provide CSV with header and at least 2 numeric columns."); return setOut(null); }
    const cols: number[][] = headers.map((_, i) => rows.map(r => Number(r[i])).filter(n => Number.isFinite(n)));
    const matrix = headers.map((_, i) => headers.map((_, j) => pearson(cols[i], cols[j])));
    setOut({ headers, matrix });
  };
  const colorFor = (v: number) => {
    // -1 → red, 0 → muted, +1 → green (using HSL)
    if (!Number.isFinite(v)) return "hsl(var(--muted))";
    const a = Math.abs(v);
    const hue = v >= 0 ? 142 : 0;
    const light = 95 - a * 45;
    return `hsl(${hue} 70% ${light}%)`;
  };
  return (
    <Card>
      <TextArea label="Paste CSV (numeric columns)" value={input} onChange={setInput} rows={6}
        placeholder={"sales,marketing,traffic\n100,20,1500\n140,28,2100\n180,32,2400"} />
      <CalcButton onClick={calc} label="Generate Heatmap" />
      <ErrorMsg>{err}</ErrorMsg>
      {out && (
        <div className="mt-6 rounded-xl border-2 border-primary/30 bg-primary/5 p-4 animate-fade-in overflow-auto">
          <table className="text-xs border-collapse mx-auto">
            <thead>
              <tr><th></th>{out.headers.map(h => <th key={h} className="px-2 py-1 font-semibold">{h}</th>)}</tr>
            </thead>
            <tbody>
              {out.matrix.map((row, i) => (
                <tr key={i}>
                  <th className="px-2 py-1 text-right font-semibold">{out.headers[i]}</th>
                  {row.map((v, j) => (
                    <td key={j} className="text-center px-3 py-2 font-mono"
                      style={{ background: colorFor(v), color: Math.abs(v) > 0.6 ? "white" : "hsl(var(--foreground))" }}>
                      {Number.isFinite(v) ? v.toFixed(2) : "—"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
};

/** Survey results analyzer: paste responses (one per line per question is too complex — use rating column). */
export const SurveyResultsForm = () => {
  const [input, setInput] = useState("");
  const [out, setOut] = useState<{ counts: { label: string; n: number; pct: number }[]; total: number; nps: number | null } | null>(null);
  const calc = () => {
    const lines = input.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
    if (lines.length === 0) return setOut(null);
    const map = new Map<string, number>();
    for (const l of lines) map.set(l, (map.get(l) ?? 0) + 1);
    const counts = [...map.entries()].map(([label, n]) => ({ label, n, pct: (n / lines.length) * 100 }))
      .sort((a, b) => b.n - a.n);
    // NPS: if all values numeric 0–10
    const nums = lines.map(Number);
    let nps: number | null = null;
    if (nums.every(n => Number.isFinite(n) && n >= 0 && n <= 10)) {
      const promoters = nums.filter(n => n >= 9).length;
      const detractors = nums.filter(n => n <= 6).length;
      nps = ((promoters - detractors) / nums.length) * 100;
    }
    setOut({ counts, total: lines.length, nps });
  };
  return (
    <Card>
      <TextArea label="Survey responses (one per line)" value={input} onChange={setInput} rows={8} mono={false}
        placeholder={"Yes\nYes\nNo\nMaybe\nYes"} />
      <CalcButton onClick={calc} label="Analyze Responses" />
      {out && (
        <ResultBox label="Total Responses" value={fmt(out.total, 0)}>
          {out.nps !== null && <Stat label="NPS Score" value={fmt(out.nps, 1)} />}
          <Stat label="Unique answers" value={out.counts.length} />
          <Stat label="Top response" value={`${out.counts[0].label} (${fmt(out.counts[0].pct, 1)}%)`} />
        </ResultBox>
      )}
      {out && (
        <div className="mt-4 space-y-2">
          {out.counts.map((c, i) => (
            <div key={i} className="bg-card border border-border rounded-lg p-3">
              <div className="flex justify-between text-sm font-medium">
                <span>{c.label}</span>
                <span className="text-muted-foreground">{c.n} ({fmt(c.pct, 1)}%)</span>
              </div>
              <div className="h-2 mt-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary" style={{ width: `${c.pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};
