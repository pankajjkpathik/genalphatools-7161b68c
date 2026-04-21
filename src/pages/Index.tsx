import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { useState, useMemo } from "react";
import SEOHead from "@/components/SEOHead";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ToolCard from "@/components/ToolCard";
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
    url: "https://genalphatools.in",
    description: "Free online calculators and numerology tools. Instant results, accurate insights.",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://genalphatools.in/?q={search_term_string}",
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
              Free Online Calculators &<br />Numerology Tools (Instant Results)
            </h1>
            <p className="text-white/90 text-base md:text-lg mb-8 max-w-xl mx-auto">
              Check your health, destiny &amp; lucky numbers in seconds. 100% free, accurate, and trusted by millions.
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

              {/* About / Why Us */}
              <section className="mb-12 bg-card border border-border rounded-2xl p-6 md:p-8">
                <h2 className="font-heading font-bold text-2xl mb-4">About GenAlpha Tools</h2>
                <div className="space-y-4 text-sm md:text-base text-muted-foreground leading-relaxed">
                  <p>GenAlpha Tools is a free online platform offering {tools.length}+ professionally built calculators across two domains: <strong>Numerology</strong> and <strong>Health &amp; Wellness</strong>. Our mission is simple — give every user instant, accurate, and easy-to-understand answers to the questions they ask most: <em>What's my BMI? How many calories should I eat? What does my name number mean? Is my mobile number lucky?</em></p>
                  <p>Every health calculator on this site is built around clinically validated formulas — the World Health Organization BMI classification, the Mifflin-St Jeor BMR equation, the Harris-Benedict Total Daily Energy Expenditure formula, the Devine ideal-weight formula, and Naegele's pregnancy-due-date rule. Every numerology calculator uses the Pythagorean letter-to-number system, the most widely accepted method in modern Western and Indian numerology practice.</p>
                  <p>We believe useful tools should be free, fast, mobile-friendly, and never store your personal data. Every calculation runs entirely inside your browser; nothing is sent to a server. You don't need to sign up, install an app, or share an email address — just open the tool and get your answer in seconds.</p>
                </div>
              </section>

              {/* Why Trust */}
              <section className="mb-12">
                <h2 className="font-heading font-bold text-2xl mb-4">Why Choose Our Calculators?</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-card border border-border rounded-xl p-5">
                    <h3 className="font-heading font-semibold text-lg mb-2">✅ Built on Trusted Formulas</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">Every health tool follows globally recognised medical formulas adopted by WHO, ICMR, and the American Council on Sports Medicine. Numerology tools follow established Pythagorean and Vedic numerology traditions.</p>
                  </div>
                  <div className="bg-card border border-border rounded-xl p-5">
                    <h3 className="font-heading font-semibold text-lg mb-2">⚡ Instant, Offline Calculations</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">Results appear in milliseconds — even on slow connections. Calculations happen entirely in your browser; we never send your data anywhere.</p>
                  </div>
                  <div className="bg-card border border-border rounded-xl p-5">
                    <h3 className="font-heading font-semibold text-lg mb-2">📱 Mobile-First Design</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">Designed for the way Indian users actually browse — primarily on smartphones. Works smoothly on Jio, Airtel, and Vi networks even on 3G.</p>
                  </div>
                  <div className="bg-card border border-border rounded-xl p-5">
                    <h3 className="font-heading font-semibold text-lg mb-2">📚 Educational Content</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">Each tool includes a worked example, the underlying formula, benefits, and detailed FAQs. Our <a href="/blog" className="text-primary underline">blog</a> goes deeper on every topic.</p>
                  </div>
                </div>
              </section>

              {/* FAQs */}
              <section className="mb-12">
                <h2 className="font-heading font-bold text-2xl mb-4">Frequently Asked Questions</h2>
                <div className="space-y-3">
                  <details className="group bg-card border border-border rounded-xl p-4">
                    <summary className="cursor-pointer font-heading font-semibold text-base">Are GenAlpha Tools really free?</summary>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">Yes. Every calculator and article on this website is 100% free to use, with no sign-up, no paywall, and no hidden charges. We don't ask for your email or store any personal data.</p>
                  </details>
                  <details className="group bg-card border border-border rounded-xl p-4">
                    <summary className="cursor-pointer font-heading font-semibold text-base">How accurate are your health calculators?</summary>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">Our health calculators use clinically validated formulas (Mifflin-St Jeor, WHO BMI, Devine ideal weight, Harris-Benedict TDEE, Naegele's rule). Results are accurate to within ±5% for most adults. They are educational and do not replace medical advice.</p>
                  </details>
                  <details className="group bg-card border border-border rounded-xl p-4">
                    <summary className="cursor-pointer font-heading font-semibold text-base">Which numerology system do you use?</summary>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">We use the Pythagorean system (A=1, B=2 … I=9, then J=1, K=2, and so on), which is the most widely used numerology system worldwide and is the basis of most modern Indian numerology practice.</p>
                  </details>
                  <details className="group bg-card border border-border rounded-xl p-4">
                    <summary className="cursor-pointer font-heading font-semibold text-base">Do you store the data I enter?</summary>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">No. Every calculation runs inside your browser using JavaScript. Nothing is uploaded to a server, nothing is logged, and nothing is shared with third parties. See our <a href="/privacy-policy" className="text-primary underline">Privacy Policy</a> for details.</p>
                  </details>
                  <details className="group bg-card border border-border rounded-xl p-4">
                    <summary className="cursor-pointer font-heading font-semibold text-base">Can I use these tools on mobile?</summary>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">Absolutely. Our entire site is built mobile-first and works smoothly on Android, iOS, and any modern browser — even on 3G connections.</p>
                  </details>
                  <details className="group bg-card border border-border rounded-xl p-4">
                    <summary className="cursor-pointer font-heading font-semibold text-base">Where can I learn more about the topics?</summary>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">Visit our <a href="/blog" className="text-primary underline">blog</a> for in-depth articles on BMI, calorie deficits, life path numbers, baby name numerology, mobile number numerology, pregnancy due dates, and more.</p>
                  </details>
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
