import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { useState, useMemo } from "react";
import SEOHead from "@/components/SEOHead";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ToolCard from "@/components/ToolCard";
import AdPlaceholder from "@/components/AdPlaceholder";
import { tools, getPopularTools, getToolsByCategory } from "@/data/tools";

const Index = () => {
  const [search, setSearch] = useState("");
  const popular = getPopularTools();
  const numerology = getToolsByCategory("numerology");
  const health = getToolsByCategory("health");

  const filtered = useMemo(() => {
    if (!search.trim()) return null;
    return tools.filter(t =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.shortDescription.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "AnkDarppan Tools",
    url: "https://ankdarppan.com",
    description: "Free online calculators and numerology tools. Instant results, accurate insights.",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://ankdarppan.com/?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <SEOHead
        title="Free Online Calculators & Numerology Tools | AnkDarppan"
        description="Free online numerology calculators, BMI calculator, calorie calculator & more. Instant results, accurate insights. 100% free tools for India & global users."
        jsonLd={jsonLd}
      />
      <SiteHeader />
      <main>
        {/* Hero */}
        <section className="gradient-hero py-16 md:py-24 text-center px-4">
          <div className="container max-w-3xl">
            <h1 className="font-heading text-3xl md:text-5xl font-bold text-primary-foreground mb-4 leading-tight">
              Free Online Calculators &<br />Numerology Tools
            </h1>
            <p className="text-primary-foreground/80 text-base md:text-lg mb-8">
              Instant Results. Accurate Insights. 100% Free.
            </p>
            <div className="relative max-w-lg mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search tools... (e.g. BMI, name numerology)"
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-card text-foreground text-sm shadow-elevated focus:ring-2 focus:ring-ring focus:outline-none"
              />
            </div>
          </div>
        </section>

        <div className="container py-10">
          <AdPlaceholder slot="top-banner" />

          {/* Search results */}
          {filtered ? (
            <section className="mb-12">
              <h2 className="font-heading font-bold text-xl mb-4">
                {filtered.length ? `${filtered.length} results for "${search}"` : "No tools found"}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.map(t => <ToolCard key={t.slug} tool={t} />)}
              </div>
            </section>
          ) : (
            <>
              {/* Popular */}
              <section className="mb-12">
                <h2 className="font-heading font-bold text-2xl mb-6">🔥 Popular Tools</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {popular.map(t => <ToolCard key={t.slug} tool={t} />)}
                </div>
              </section>

              {/* Numerology */}
              <section className="mb-12">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-heading font-bold text-2xl">🔮 Numerology Tools</h2>
                  <Link to="/numerology-tools" className="text-sm text-primary font-medium hover:underline">View All →</Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {numerology.slice(0, 6).map(t => <ToolCard key={t.slug} tool={t} />)}
                </div>
              </section>

              <AdPlaceholder slot="mid-content" />

              {/* Health */}
              <section className="mb-12">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-heading font-bold text-2xl">💪 Health Calculators</h2>
                  <Link to="/health-calculators" className="text-sm text-primary font-medium hover:underline">View All →</Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {health.slice(0, 6).map(t => <ToolCard key={t.slug} tool={t} />)}
                </div>
              </section>
            </>
          )}
        </div>
      </main>
      <SiteFooter />
    </>
  );
};

export default Index;
