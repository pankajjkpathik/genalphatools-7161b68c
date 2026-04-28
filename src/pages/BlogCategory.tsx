import { Link, useParams, useSearchParams } from "react-router-dom";
import { useMemo } from "react";
import SEOHead from "@/components/SEOHead";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Breadcrumbs from "@/components/Breadcrumbs";
import ToolCard from "@/components/ToolCard";
import NotFound from "@/pages/NotFound";
import {
  BLOG_CATEGORY_META,
  getBlogCategoryBySlug,
  getPostsByCategory,
  type BlogPost,
} from "@/data/blog-posts";
import { getToolsByCategory } from "@/data/tools";

const PAGE_SIZE = 9;

const SITE = "https://genalphatools.in";

const categoryColors: Record<string, string> = {
  health: "bg-accent/10 text-accent",
  numerology: "bg-secondary/10 text-secondary",
  guide: "bg-primary/10 text-primary",
};

// Map blog category → matching tool category for internal linking
const RELATED_TOOL_CATEGORY: Record<BlogPost["category"], "health" | "numerology" | null> = {
  health: "health",
  numerology: "numerology",
  guide: null,
};

const BlogCategory = () => {
  const { category } = useParams<{ category: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const meta = category ? getBlogCategoryBySlug(category) : null;

  const allPosts = useMemo(
    () => (meta ? getPostsByCategory(meta.slug as BlogPost["category"]) : []),
    [meta]
  );

  if (!meta) return <NotFound />;

  const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10) || 1);
  const totalPages = Math.max(1, Math.ceil(allPosts.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * PAGE_SIZE;
  const visible = allPosts.slice(start, start + PAGE_SIZE);

  const relatedToolCat = RELATED_TOOL_CATEGORY[meta.slug as BlogPost["category"]];
  const relatedTools = relatedToolCat ? getToolsByCategory(relatedToolCat).slice(0, 6) : [];

  const categoryUrl = `${SITE}/blog/category/${meta.slug}`;
  const canonical = safePage === 1 ? categoryUrl : `${categoryUrl}?page=${safePage}`;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE}/blog` },
      { "@type": "ListItem", position: 3, name: meta.label },
    ],
  };

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: visible.map((p, i) => ({
      "@type": "ListItem",
      position: start + i + 1,
      url: `${SITE}/blog/${p.slug}`,
      name: p.title,
    })),
  };

  const setPage = (p: number) => {
    const params = new URLSearchParams(searchParams);
    if (p === 1) params.delete("page");
    else params.set("page", String(p));
    setSearchParams(params);
  };

  return (
    <>
      <SEOHead
        title={`${meta.label} Articles${safePage > 1 ? ` – Page ${safePage}` : ""} | GenAlpha Tools Blog`}
        description={meta.description}
        canonical={canonical}
        jsonLd={[breadcrumbJsonLd, itemListJsonLd]}
      />
      <SiteHeader />
      <main className="container py-8 max-w-4xl">
        <Breadcrumbs
          items={[
            { label: "Blog", href: "/blog" },
            { label: meta.label },
          ]}
        />
        <h1 className="font-heading font-bold text-2xl md:text-3xl mb-2">{meta.label} – Articles & Guides</h1>
        <p className="text-muted-foreground mb-6">{meta.description}</p>

        {/* Category nav */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Link
            to="/blog"
            className="text-xs px-3 py-1.5 rounded-full border border-border bg-muted/50 text-muted-foreground hover:bg-muted transition-colors"
          >
            All Articles
          </Link>
          {Object.values(BLOG_CATEGORY_META).map((c) => (
            <Link
              key={c.slug}
              to={`/blog/category/${c.slug}`}
              className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                c.slug === meta.slug
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-muted/50 text-muted-foreground border-border hover:bg-muted"
              }`}
            >
              {c.label}
            </Link>
          ))}
        </div>

        {visible.length === 0 ? (
          <p className="text-sm text-muted-foreground">No posts in this category yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {visible.map((post) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="group block bg-card border border-border rounded-xl p-5 hover:shadow-elevated hover:border-primary/40 transition-all"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full capitalize ${categoryColors[post.category] || "bg-muted text-muted-foreground"}`}>
                    {post.category}
                  </span>
                  <span className="text-xs text-muted-foreground">{post.readTimeMin} min read</span>
                </div>
                <h2 className="font-heading font-bold text-lg mb-2 group-hover:text-primary transition-colors leading-snug">{post.title}</h2>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-3">{post.excerpt}</p>
                <div className="text-xs text-muted-foreground">
                  By {post.author} ·{" "}
                  {new Date(post.publishedAt).toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "numeric" })}
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <nav className="mt-8 flex items-center justify-center gap-2" aria-label="Pagination">
            <button
              type="button"
              onClick={() => setPage(safePage - 1)}
              disabled={safePage === 1}
              className="text-sm px-3 py-1.5 rounded-lg border border-border bg-muted/50 text-muted-foreground disabled:opacity-40 disabled:cursor-not-allowed hover:bg-muted"
            >
              ← Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPage(p)}
                aria-current={p === safePage ? "page" : undefined}
                className={`text-sm px-3 py-1.5 rounded-lg border transition-colors ${
                  p === safePage
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-muted/50 text-muted-foreground border-border hover:bg-muted"
                }`}
              >
                {p}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setPage(safePage + 1)}
              disabled={safePage === totalPages}
              className="text-sm px-3 py-1.5 rounded-lg border border-border bg-muted/50 text-muted-foreground disabled:opacity-40 disabled:cursor-not-allowed hover:bg-muted"
            >
              Next →
            </button>
          </nav>
        )}

        {/* Internal cross-link to related tools */}
        {relatedTools.length > 0 && (
          <section className="mt-12">
            <h2 className="font-heading font-bold text-xl mb-4">
              Try Related {relatedToolCat === "health" ? "Health" : "Numerology"} Calculators
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedTools.map((t) => (
                <ToolCard key={t.slug} tool={t} />
              ))}
            </div>
          </section>
        )}
      </main>
      <SiteFooter />
    </>
  );
};

export default BlogCategory;
