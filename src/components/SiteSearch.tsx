import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Search, X } from "lucide-react";
import { searchSite } from "@/lib/search";

interface SiteSearchProps {
  placeholder?: string;
  /** Optional: receive the raw query (e.g. to render an "all results" grid below). */
  onQueryChange?: (q: string) => void;
  autoFocus?: boolean;
}

const SiteSearch = ({ placeholder = "Search tools and articles...", onQueryChange, autoFocus }: SiteSearchProps) => {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    onQueryChange?.(q);
  }, [q, onQueryChange]);

  // Close dropdown on outside click
  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const results = useMemo(() => searchSite(q, 8), [q]);

  return (
    <div ref={wrapRef} className="relative max-w-lg mx-auto w-full">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" size={18} />
      <input
        type="search"
        value={q}
        autoFocus={autoFocus}
        onChange={(e) => { setQ(e.target.value); setOpen(true); }}
        onFocus={() => setOpen(true)}
        placeholder={placeholder}
        aria-label="Search tools and articles"
        className="w-full pl-11 pr-10 py-3 rounded-xl bg-card text-foreground text-sm border border-border shadow-elevated focus:ring-2 focus:ring-ring focus:outline-none"
      />
      {q && (
        <button
          type="button"
          aria-label="Clear search"
          onClick={() => { setQ(""); setOpen(false); }}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
        >
          <X size={16} />
        </button>
      )}

      {open && q.trim() && (
        <div className="absolute z-30 mt-2 w-full rounded-xl border border-border bg-popover text-popover-foreground shadow-elevated overflow-hidden">
          {results.length === 0 ? (
            <div className="p-4 text-sm text-muted-foreground">No matches for "{q}".</div>
          ) : (
            <ul className="max-h-96 overflow-y-auto divide-y divide-border">
              {results.map((r, i) => {
                if (r.kind === "tool") {
                  return (
                    <li key={`t-${i}`}>
                      <Link
                        to={`/tool/${r.tool.slug}`}
                        onClick={() => setOpen(false)}
                        className="flex items-start gap-3 p-3 hover:bg-muted transition-colors"
                      >
                        <span className="text-xl leading-none mt-0.5">{r.tool.icon}</span>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-sm truncate">{r.tool.name}</span>
                            <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-primary/10 text-primary">Tool</span>
                          </div>
                          <p className="text-xs text-muted-foreground line-clamp-1">{r.tool.shortDescription}</p>
                        </div>
                      </Link>
                    </li>
                  );
                }
                return (
                  <li key={`p-${i}`}>
                    <Link
                      to={`/blog/${r.post.slug}`}
                      onClick={() => setOpen(false)}
                      className="flex items-start gap-3 p-3 hover:bg-muted transition-colors"
                    >
                      <span className="text-xl leading-none mt-0.5">📝</span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm truncate">{r.post.title}</span>
                          <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-secondary/10 text-secondary">Article</span>
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-1">{r.post.excerpt}</p>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default SiteSearch;
