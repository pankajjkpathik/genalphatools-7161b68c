import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { useState, useMemo } from "react";
import SEOHead from "@/components/SEOHead";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ToolCard from "@/components/ToolCard";
import AdPlaceholder from "@/components/AdPlaceholder";
import { tools, getPopularTools, getToolsByCategory } from "@/data/tools";
import heroBg from "@/assets/hero-bg.jpg";
import numerologyIcon from "@/assets/numerology-icon.png";
import healthIcon from "@/assets/health-icon.png";

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
    name: "GenAlpha Tools",
    url: "https://genalphatools.com",
    description: "Free online calculators and numerology tools. Instant results, accurate insights.",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://genalphatools.com/?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <SEOHead
        title="Free Online Calculators & Numerology Tools | GenAlpha Tools"
        description="Free online numerology calculators, BMI calculator, calorie calculator & more. Instant results, accurate insights. 100% free tools for India & global users."
        jsonLd={jsonLd}
      />
      <SiteHeader />
      <main>
        {/* Hero */}
        <section
          className="relative py-16 md:py-24 text-center px-4 overflow-hidden"
          style={{ backgroundImage: `url(${heroBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
          <div className="absolute inset-0 bg-black/30" />
          <div className="container max-w-3xl relative z-10">
            <h1 className="font-heading text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Free Online Calculators &<br />Numerology Tools
            </h1>
            <p className="text-white/80 text-base md:text-lg mb-8">
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
          {/* Category Cards */}
          {!filtered && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
              <Link
                to="/numerology-tools"
                className="group flex items-center gap-4 bg-card border border-border rounded-xl p-6 hover:shadow-elevated hover:border-secondary/40 transition-all"
              >
                <img src={numerologyIcon} alt="Numerology Tools" width={80} height={80} loading="lazy" className="shrink-0" />
                <div>
                  <h2 className="font-heading font-bold text-lg group-hover:text-secondary transition-colors">Numerology Tools</h2>
                  <p className="text-sm text-muted-foreground mt-1">Discover the hidden power of numbers with {numerology.length} free calculators.</p>
                </div>
              </Link>
              <Link
                to="/health-calculators"
                className="group flex items-center gap-4 bg-card border border-border rounded-xl p-6 hover:shadow-elevated hover:border-accent/40 transition-all"
              >
                <img src={healthIcon} alt="Health Calculators" width={80} height={80} loading="lazy" className="shrink-0" />
                <div>
                  <h2 className="font-heading font-bold text-lg group-hover:text-accent transition-colors">Health Calculators</h2>
                  <p className="text-sm text-muted-foreground mt-1">Track and improve your health with {health.length} accurate tools.</p>
                </div>
              </Link>
            </div>
          )}

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
