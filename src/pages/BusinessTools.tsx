import SEOHead from "@/components/SEOHead";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Breadcrumbs from "@/components/Breadcrumbs";
import ToolCard from "@/components/ToolCard";
import { getToolsByCategory } from "@/data/tools";

const BusinessTools = () => {
  const tools = getToolsByCategory("business");
  return (
    <>
      <SEOHead
        title="Free Business & Finance Calculators Online | GenAlpha Tools"
        description="Free online business calculators: ROI, CAGR, break-even analysis, and revenue forecasting. Instant results for US founders, investors, marketers, and finance teams."
      />
      <SiteHeader />
      <main className="container py-8 max-w-4xl">
        <Breadcrumbs items={[{ label: "Business Tools" }]} />
        <h1 className="font-heading font-bold text-2xl md:text-3xl mb-2">💼 Business & Finance Tools</h1>
        <p className="text-muted-foreground mb-4">Free calculators for ROI, growth rates, break-even analysis, and forecasting. Trusted by US founders, investors, and finance teams.</p>
        <section className="bg-card border border-border rounded-xl p-5 mb-8 text-sm text-muted-foreground leading-relaxed space-y-3">
          <p>From validating pricing for your first product to projecting next quarter's revenue, our business calculator suite covers the core financial decisions every founder, marketer, and analyst makes weekly. Compute <strong>Return on Investment (ROI)</strong> and <strong>Compound Annual Growth Rate (CAGR)</strong> for any holding period, run a <strong>break-even analysis</strong> with contribution-margin math, and project future periods with our <strong>linear-regression forecasting tool</strong>.</p>
          <p>All tools run in your browser. No sign-up. No data leaves your device. Built for US small businesses, startups, freelancers, and finance teams who need fast, accurate answers without firing up Excel.</p>
        </section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tools.map(t => <ToolCard key={t.slug} tool={t} />)}
        </div>
      </main>
      <SiteFooter />
    </>
  );
};

export default BusinessTools;
