import { useState } from "react";
import { Card, TextArea, Select, CalcButton, ErrorMsg, fmt } from "./ui";
import { parseCsv } from "@/lib/stats";

const CopyResult = ({ text, lines }: { text: string; lines: number }) => {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 1500); } catch { /* ignore */ }
  };
  return (
    <div className="mt-6 rounded-xl border-2 border-primary/30 bg-primary/5 animate-fade-in">
      <div className="flex items-center justify-between p-3 border-b border-border">
        <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Result · {fmt(lines, 0)} lines</p>
        <button onClick={copy} className="text-xs px-3 py-1.5 rounded-md bg-primary text-primary-foreground font-bold hover:opacity-90">
          {copied ? "✓ Copied" : "Copy"}
        </button>
      </div>
      <pre className="p-4 text-xs font-mono overflow-auto max-h-96 text-foreground whitespace-pre-wrap break-all">{text}</pre>
    </div>
  );
};

export const CsvToJsonForm = () => {
  const [csv, setCsv] = useState("");
  const [out, setOut] = useState("");
  const [err, setErr] = useState("");
  const convert = () => {
    setErr("");
    try {
      const { headers, rows } = parseCsv(csv);
      if (headers.length === 0) { setErr("Provide CSV with a header row."); setOut(""); return; }
      const json = rows.map((r) => Object.fromEntries(headers.map((h, i) => {
        const v = r[i] ?? "";
        const n = Number(v);
        return [h, v !== "" && !isNaN(n) && /^-?\d+(\.\d+)?$/.test(v) ? n : v];
      })));
      setOut(JSON.stringify(json, null, 2));
    } catch (e) { setErr("Could not parse CSV. Check formatting."); setOut(""); }
  };
  return (
    <Card>
      <TextArea label="Paste CSV" value={csv} onChange={setCsv} rows={8} placeholder={"name,age,city\nAlice,30,NYC\nBob,25,LA"} />
      <CalcButton onClick={convert} label="Convert to JSON" />
      <ErrorMsg>{err}</ErrorMsg>
      {out && <CopyResult text={out} lines={out.split("\n").length} />}
    </Card>
  );
};

export const JsonFormatterForm = () => {
  const [input, setInput] = useState("");
  const [indent, setIndent] = useState("2");
  const [out, setOut] = useState("");
  const [err, setErr] = useState("");
  const format = () => {
    setErr("");
    try {
      const parsed = JSON.parse(input);
      setOut(JSON.stringify(parsed, null, parseInt(indent) || 0));
    } catch (e) {
      setErr(e instanceof Error ? `Invalid JSON: ${e.message}` : "Invalid JSON.");
      setOut("");
    }
  };
  const minify = () => {
    setErr("");
    try { setOut(JSON.stringify(JSON.parse(input))); } catch (e) { setErr("Invalid JSON."); setOut(""); }
  };
  return (
    <Card>
      <TextArea label="Paste JSON" value={input} onChange={setInput} rows={8} placeholder='{"name":"Alice","age":30}' />
      <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
        <Select label="Indentation" value={indent} onChange={setIndent}
          options={[{ value: "2", label: "2 spaces" }, { value: "4", label: "4 spaces" }, { value: "0", label: "Minified" }]} />
        <div className="flex gap-2 items-end">
          <button onClick={format} className="flex-1 bg-primary text-primary-foreground font-bold py-3 rounded-lg hover:opacity-90">⚡ Format</button>
          <button onClick={minify} className="flex-1 bg-secondary text-secondary-foreground font-bold py-3 rounded-lg hover:opacity-90">Minify</button>
        </div>
      </div>
      <ErrorMsg>{err}</ErrorMsg>
      {out && <CopyResult text={out} lines={out.split("\n").length} />}
    </Card>
  );
};

export const RemoveDuplicatesForm = () => {
  const [input, setInput] = useState("");
  const [caseSensitive, setCaseSensitive] = useState(true);
  const [trim, setTrim] = useState(true);
  const [out, setOut] = useState<{ text: string; removed: number; kept: number } | null>(null);
  const run = () => {
    const lines = input.split(/\r?\n/);
    const seen = new Set<string>();
    const kept: string[] = [];
    for (const raw of lines) {
      const line = trim ? raw.trim() : raw;
      if (line === "") continue;
      const key = caseSensitive ? line : line.toLowerCase();
      if (!seen.has(key)) { seen.add(key); kept.push(line); }
    }
    setOut({ text: kept.join("\n"), removed: lines.filter(l => (trim ? l.trim() : l) !== "").length - kept.length, kept: kept.length });
  };
  return (
    <Card>
      <TextArea label="Paste lines (one per line)" value={input} onChange={setInput} rows={8}
        placeholder={"alice@example.com\nbob@example.com\nalice@example.com"} />
      <div className="mt-3 flex flex-wrap gap-4 text-sm">
        <label className="flex items-center gap-2"><input type="checkbox" checked={caseSensitive} onChange={(e) => setCaseSensitive(e.target.checked)} /> Case sensitive</label>
        <label className="flex items-center gap-2"><input type="checkbox" checked={trim} onChange={(e) => setTrim(e.target.checked)} /> Trim whitespace</label>
      </div>
      <CalcButton onClick={run} label="Remove Duplicates" />
      {out && (
        <>
          <p className="mt-4 text-sm text-muted-foreground">Kept <strong className="text-foreground">{fmt(out.kept, 0)}</strong> · Removed <strong className="text-foreground">{fmt(out.removed, 0)}</strong> duplicate(s)</p>
          <CopyResult text={out.text} lines={out.kept} />
        </>
      )}
    </Card>
  );
};

export const TextCleanerForm = () => {
  const [input, setInput] = useState("");
  const [trim, setTrim] = useState(true);
  const [collapseSpaces, setCollapseSpaces] = useState(true);
  const [removeBlank, setRemoveBlank] = useState(true);
  const [lower, setLower] = useState(false);
  const [stripPunct, setStripPunct] = useState(false);
  const [out, setOut] = useState<string>("");
  const clean = () => {
    let lines = input.split(/\r?\n/);
    if (trim) lines = lines.map(l => l.trim());
    if (collapseSpaces) lines = lines.map(l => l.replace(/\s+/g, " "));
    if (removeBlank) lines = lines.filter(l => l !== "");
    if (lower) lines = lines.map(l => l.toLowerCase());
    if (stripPunct) lines = lines.map(l => l.replace(/[.,;:!?'"()\[\]{}]/g, ""));
    setOut(lines.join("\n"));
  };
  return (
    <Card>
      <TextArea label="Paste text" value={input} onChange={setInput} rows={8} mono={false} placeholder="Enter messy text here…" />
      <div className="mt-3 grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
        <label className="flex items-center gap-2"><input type="checkbox" checked={trim} onChange={(e) => setTrim(e.target.checked)} /> Trim lines</label>
        <label className="flex items-center gap-2"><input type="checkbox" checked={collapseSpaces} onChange={(e) => setCollapseSpaces(e.target.checked)} /> Collapse spaces</label>
        <label className="flex items-center gap-2"><input type="checkbox" checked={removeBlank} onChange={(e) => setRemoveBlank(e.target.checked)} /> Remove blanks</label>
        <label className="flex items-center gap-2"><input type="checkbox" checked={lower} onChange={(e) => setLower(e.target.checked)} /> Lowercase</label>
        <label className="flex items-center gap-2"><input type="checkbox" checked={stripPunct} onChange={(e) => setStripPunct(e.target.checked)} /> Strip punctuation</label>
      </div>
      <CalcButton onClick={clean} label="Clean Text" />
      {out && <CopyResult text={out} lines={out.split("\n").length} />}
    </Card>
  );
};

/** Converts an Excel-style tab-separated paste (or pasted CSV) to clean CSV. */
export const ExcelToCsvForm = () => {
  const [input, setInput] = useState("");
  const [out, setOut] = useState("");
  const convert = () => {
    const lines = input.split(/\r?\n/).filter(l => l.length > 0);
    const csv = lines.map(line => {
      // Detect delimiter: tab if present, else comma already
      const cells = line.includes("\t") ? line.split("\t") : line.split(",");
      return cells.map(c => {
        const t = c.trim();
        return /[,"\n]/.test(t) ? `"${t.replace(/"/g, '""')}"` : t;
      }).join(",");
    }).join("\n");
    setOut(csv);
  };
  return (
    <Card>
      <TextArea label="Paste data from Excel / Google Sheets (or CSV)" value={input} onChange={setInput} rows={8}
        placeholder={"Name\tAge\tCity\nAlice\t30\tNYC"} />
      <CalcButton onClick={convert} label="Convert to CSV" />
      {out && <CopyResult text={out} lines={out.split("\n").length} />}
    </Card>
  );
};
