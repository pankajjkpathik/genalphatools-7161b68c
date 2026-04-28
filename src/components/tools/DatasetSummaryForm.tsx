import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { parseCsv, parseNumbers, mean, median, stdDev, round } from "@/lib/stats";
import { toast } from "sonner";

const DatasetSummaryForm = () => {
  const [csvText, setCsvText] = useState("");
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState("");
  const [stats, setStats] = useState<Record<string, { mean: number; median: number; sd: number; min: number; max: number; n: number }> | null>(null);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (f.size > 2 * 1024 * 1024) { toast.error("File too large (max 2MB)."); return; }
    setFileName(f.name);
    setCsvText(await f.text());
  };

  const analyze = async () => {
    if (!csvText.trim()) { toast.error("Paste CSV text or upload a file first."); return; }
    const { headers, rows } = parseCsv(csvText);
    if (headers.length === 0 || rows.length === 0) { toast.error("Could not parse CSV."); return; }

    // Compute stats for each numeric column
    const colStats: typeof stats = {};
    headers.forEach((h, idx) => {
      const col = rows.map((r) => r[idx]).filter((v) => v !== undefined);
      const nums = parseNumbers(col.join(" "));
      if (nums.length >= Math.max(2, rows.length * 0.5)) {
        colStats[h] = {
          n: nums.length,
          mean: round(mean(nums), 3),
          median: round(median(nums), 3),
          sd: round(stdDev(nums), 3),
          min: Math.min(...nums),
          max: Math.max(...nums),
        };
      }
    });
    setStats(colStats);

    setLoading(true);
    setSummary("");
    try {
      const { data, error } = await supabase.functions.invoke("dataset-summary", {
        body: { headers, sample: rows.slice(0, 20), stats: colStats },
      });
      if (error) throw error;
      if (data?.error) { toast.error(data.error); return; }
      setSummary(data?.summary ?? "");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to generate summary");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-card rounded-xl border-2 border-border p-6 shadow-card">
      <label className="block text-sm font-medium mb-1.5">Upload CSV file (max 2MB)</label>
      <input type="file" accept=".csv,text/csv" onChange={handleFile}
        className="w-full text-sm file:mr-3 file:px-4 file:py-2 file:rounded-lg file:border-0 file:bg-primary file:text-primary-foreground file:font-medium file:cursor-pointer" />
      {fileName && <p className="mt-1 text-xs text-muted-foreground">📎 {fileName}</p>}

      <p className="my-3 text-xs text-muted-foreground text-center">— or paste CSV text —</p>
      <textarea value={csvText} onChange={(e) => setCsvText(e.target.value)}
        placeholder="name,age,salary&#10;Alice,30,55000&#10;Bob,28,48000"
        rows={5}
        className="w-full px-4 py-3 rounded-lg border border-input bg-background text-xs font-mono" />

      <button onClick={analyze} disabled={loading}
        className="mt-4 w-full bg-primary text-primary-foreground font-bold py-3 rounded-lg hover:opacity-90 disabled:opacity-50">
        {loading ? "🤖 Analyzing..." : "✨ Generate AI Summary"}
      </button>

      {stats && Object.keys(stats).length > 0 && (
        <div className="mt-6">
          <h3 className="font-bold text-sm mb-2">📊 Numeric column stats</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead><tr className="bg-muted">
                <th className="p-2 text-left">Column</th><th className="p-2">N</th><th className="p-2">Mean</th><th className="p-2">Median</th><th className="p-2">SD</th><th className="p-2">Min</th><th className="p-2">Max</th>
              </tr></thead>
              <tbody>{Object.entries(stats).map(([k, v]) => (
                <tr key={k} className="border-b border-border">
                  <td className="p-2 font-medium">{k}</td><td className="p-2 text-center">{v.n}</td>
                  <td className="p-2 text-center">{v.mean}</td><td className="p-2 text-center">{v.median}</td>
                  <td className="p-2 text-center">{v.sd}</td><td className="p-2 text-center">{v.min}</td><td className="p-2 text-center">{v.max}</td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        </div>
      )}

      {summary && (
        <div className="mt-6 p-6 rounded-xl border-2 border-primary/30 bg-primary/5 animate-fade-in">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3 font-semibold">🤖 AI Insight Summary</p>
          <div className="prose prose-sm max-w-none whitespace-pre-wrap text-sm leading-relaxed">{summary}</div>
        </div>
      )}
    </div>
  );
};

export default DatasetSummaryForm;
