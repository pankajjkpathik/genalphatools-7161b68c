import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import ToolCard from "@/components/ToolCard";
import type { ToolData } from "@/data/tools";

interface FilterableToolGridProps {
  tools: ToolData[];
  /** Optional sub-category chips. If provided, each tool is matched against
   * the chip when its name/shortDescription contains the chip's `match` term. */
  filters?: { label: string; match: string }[];
  emptyLabel?: string;
}

const FilterableToolGrid = ({ tools, filters = [], emptyLabel = "No tools match your search." }: FilterableToolGridProps) => {
  const [q, setQ] = useState("");
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const visible = useMemo(() => {
    const ql = q.toLowerCase().trim();
    return tools.filter((t) => {
      if (ql) {
        const hay = `${t.name} ${t.shortDescription}`.toLowerCase();
        if (!ql.split(/\s+/).every((tok) => hay.includes(tok))) return false;
      }
      if (activeFilter) {
        const hay = `${t.name} ${t.shortDescription}`.toLowerCase();
        if (!hay.includes(activeFilter.toLowerCase())) return false;
      }
      return true;
    });
  }, [tools, q, activeFilter]);

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Filter tools by name or keyword..."
            aria-label="Filter tools"
            className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-input bg-background text-sm focus:ring-2 focus:ring-ring focus:outline-none"
          />
        </div>
      </div>

      {filters.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-5">
          <button
            type="button"
            onClick={() => setActiveFilter(null)}
            className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
              activeFilter === null
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-muted/50 text-muted-foreground border-border hover:bg-muted"
            }`}
          >
            All
          </button>
          {filters.map((f) => (
            <button
              key={f.label}
              type="button"
              onClick={() => setActiveFilter(activeFilter === f.match ? null : f.match)}
              className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                activeFilter === f.match
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-muted/50 text-muted-foreground border-border hover:bg-muted"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      )}

      {visible.length === 0 ? (
        <p className="text-sm text-muted-foreground py-8 text-center">{emptyLabel}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {visible.map((t) => (
            <ToolCard key={t.slug} tool={t} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterableToolGrid;
