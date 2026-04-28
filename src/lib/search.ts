import { tools, type ToolData } from "@/data/tools";
import { blogPosts, type BlogPost } from "@/data/blog-posts";

export type SearchResult =
  | { kind: "tool"; tool: ToolData }
  | { kind: "post"; post: BlogPost };

const norm = (s: string) => s.toLowerCase().trim();

/**
 * Lightweight site-wide search across tools (name, shortDescription, category,
 * peopleAlsoSearch) and blog posts (title, excerpt, category). Tokenized AND
 * matching keeps results relevant for queries like "free roi calculator".
 */
export function searchSite(query: string, limit = 12): SearchResult[] {
  const q = norm(query);
  if (!q) return [];
  const tokens = q.split(/\s+/).filter(Boolean);

  const matchAll = (haystack: string) => {
    const h = norm(haystack);
    return tokens.every((t) => h.includes(t));
  };

  const toolHits: SearchResult[] = tools
    .filter((t) =>
      matchAll(
        [t.name, t.shortDescription, t.category, ...(t.peopleAlsoSearch || [])].join(" ")
      )
    )
    .map((tool) => ({ kind: "tool", tool }));

  const postHits: SearchResult[] = blogPosts
    .filter((p) => matchAll([p.title, p.excerpt, p.category].join(" ")))
    .map((post) => ({ kind: "post", post }));

  return [...toolHits, ...postHits].slice(0, limit);
}
