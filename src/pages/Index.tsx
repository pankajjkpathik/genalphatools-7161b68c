import { Link } from "react-router-dom";
import { useState, useMemo } from "react";
import SEOHead from "@/components/SEOHead";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import SiteSearch from "@/components/SiteSearch";
import ToolCard from "@/components/ToolCard";
import { tools, getPopularTools, CATEGORY_META, type ToolCategory } from "@/data/tools";
import { blogPosts } from "@/data/blog-posts";
import { searchSite } from "@/lib/search";

const Index = () => {
  const [search, setSearch] = useState("");
  const popular = getPopularTools();

  const filtered = useMemo(() => (search.trim() ? searchSite(search, 60) : null), [search]);

  const categories = Object.entries(CATEGORY_META) as [ToolCategory, typeof CATEGORY_META[ToolCategory]][];

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "GenAlpha Tools",
    url: "https://genalphatools.in",
    description: "Free online calculators for US marketers, founders, and analysts. ROI, CAC, LTV, mortgage, NPV, statistics & more.",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://genalphatools.in/?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Tool categories",
    itemListElement: categories.map(([, m], i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: m.label,
      url: `https://genalphatools.in${m.path}`,
    })),
  };

  return (
    <>
      <SEOHead
        title="Free Calculators for US Marketers, Founders & Analysts | GenAlpha Tools"
        description="50+ free online calculators: ROI, CAC, LTV, mortgage, NPV, IRR, statistics, A/B testing, SaaS metrics, data utilities. Built for US professionals. No signup."
        jsonLd={[websiteJsonLd, itemListJsonLd]}
      />
      <SiteHeader />
      <main>
        {/* Hero — bold editorial */}
        <section className="border-b-2 border-foreground/10 bg-background">
          <div className="container py-16 md:py-24">
            <p className="text-xs md:text-sm uppercase tracking-[0.25em] font-bold text-muted-foreground mb-4">
              50+ Free Tools · No Signup · Browser-Only
            </p>
            <h1 className="font-heading font-black text-5xl md:text-7xl lg:text-8xl tracking-tighter leading-[0.95] mb-6 max-w-5xl">
              The calculators<br />
              <span className="bg-foreground text-background px-2">US professionals</span><br />
              actually use.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-8 leading-relaxed">
              ROI, CAC, LTV, mortgage, NPV, IRR, A/B testing, SaaS metrics, statistics, and data utilities — built for
              marketers, founders, and analysts who need answers fast.
            </p>
            <div className="max-w-xl">
              <SiteSearch placeholder="Search 50+ tools and articles…" onQueryChange={setSearch} />
            </div>
          </div>
        </section>

        <div className="container py-12">
          {filtered ? (
            <section className="mb-12">
              <h2 className="font-heading font-black text-2xl mb-4">
                {filtered.length ? `${filtered.length} results for "${search}"` : "No matches found"}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.map((r) =>
                  r.kind === "tool" ? (
                    <ToolCard key={r.tool.slug} tool={r.tool} />
                  ) : (
                    <Link key={r.post.slug} to={`/blog/${r.post.slug}`} className="group flex flex-col bg-card border-2 border-border rounded-xl p-5 hover:border-foreground transition-colors">
                      <span className="text-xs uppercase tracking-wider text-muted-foreground mb-2 font-bold">{r.post.category} · {r.post.readTimeMin} min</span>
                      <h3 className="font-heading font-bold text-base mb-2 line-clamp-2">{r.post.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-3">{r.post.excerpt}</p>
                    </Link>
                  )
                )}
              </div>
            </section>
          ) : (
            <>
              {/* Cluster grid */}
              <section className="mb-16">
                <h2 className="font-heading font-black text-3xl md:text-4xl tracking-tight mb-6">Browse by category</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {categories.map(([key, m]) => (
                    <Link key={key} to={m.path} className="group border-2 border-border rounded-xl p-5 hover:border-foreground hover:bg-foreground hover:text-background transition-colors">
                      <span className="text-3xl block mb-3">{m.emoji}</span>
                      <h3 className="font-heading font-bold text-base mb-1">{m.label}</h3>
                      <p className="text-xs opacity-70">{tools.filter((t) => t.category === key).length} tools</p>
                    </Link>
                  ))}
                </div>
              </section>

              {/* Popular */}
              <section className="mb-16">
                <h2 className="font-heading font-black text-3xl md:text-4xl tracking-tight mb-6">🔥 Most popular</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {popular.map((t) => <ToolCard key={t.slug} tool={t} />)}
                </div>
              </section>

              {/* Latest blog */}
              {blogPosts.length > 0 && (
                <section className="mb-16">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-heading font-black text-3xl md:text-4xl tracking-tight">Latest from the blog</h2>
                    <Link to="/blog" className="text-sm font-bold hover:underline">View all →</Link>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[...blogPosts]
                      .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1))
                      .slice(0, 6)
                      .map((post) => (
                        <Link key={post.slug} to={`/blog/${post.slug}`} className="group flex flex-col bg-card border-2 border-border rounded-xl p-5 hover:border-foreground transition-colors">
                          <span className="text-xs uppercase tracking-wider text-muted-foreground mb-2 font-bold">{post.category} · {post.readTimeMin} min</span>
                          <h3 className="font-heading font-bold text-base mb-2 line-clamp-2">{post.title}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-3">{post.excerpt}</p>
                        </Link>
                      ))}
                  </div>
                </section>
              )}
            </>
          )}
        </div>
      </main>
      <SiteFooter />
    </>
  );
};

export default Index;
