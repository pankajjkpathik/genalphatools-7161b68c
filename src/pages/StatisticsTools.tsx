import SEOHead from "@/components/SEOHead";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Breadcrumbs from "@/components/Breadcrumbs";
import ToolCard from "@/components/ToolCard";
import { getToolsByCategory } from "@/data/tools";

const StatisticsTools = () => {
  const tools = getToolsByCategory("statistics");
  return (
    <>
      <SEOHead
        title="Free Statistics Tools & Calculators Online | GenAlpha Tools"
        description="Free online statistics tools: mean, median, mode, standard deviation, probability, A/B test significance, and AI-powered dataset summary. Instant results, no sign-up."
      />
      <SiteHeader />
      <main className="container py-8 max-w-4xl">
        <Breadcrumbs items={[{ label: "Statistics Tools" }]} />
        <h1 className="font-heading font-bold text-2xl md:text-3xl mb-2">📊 Statistics Tools</h1>
        <p className="text-muted-foreground mb-4">Solve descriptive statistics, probability, and significance testing problems instantly. Built for US students, analysts, and data professionals.</p>
        <section className="bg-card border border-border rounded-xl p-5 mb-8 text-sm text-muted-foreground leading-relaxed space-y-3">
          <p>Our statistics calculator suite covers the core tools every data-literate professional needs: <strong>mean, median, and mode</strong> for central tendency, <strong>standard deviation and variance</strong> for spread, <strong>binomial probability</strong> for discrete outcomes, the <strong>two-proportion z-test</strong> for A/B testing, and an <strong>AI-powered dataset summary generator</strong> that ingests CSVs and writes plain-English insights. All tools run entirely in your browser — your data is never stored on our servers.</p>
          <p>Whether you're prepping for AP Statistics, analyzing a marketing experiment, or just trying to make sense of a CSV your boss dropped in Slack, you'll find the right tool here. Each calculator includes worked examples, the underlying formula, FAQs, and use-case guidance.</p>
        </section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tools.map(t => <ToolCard key={t.slug} tool={t} />)}
        </div>
      </main>
      <SiteFooter />
    </>
  );
};

export default StatisticsTools;
