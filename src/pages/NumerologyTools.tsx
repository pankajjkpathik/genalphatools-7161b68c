import SEOHead from "@/components/SEOHead";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Breadcrumbs from "@/components/Breadcrumbs";
import ToolCard from "@/components/ToolCard";
import { getToolsByCategory } from "@/data/tools";

const NumerologyTools = () => {
  const tools = getToolsByCategory("numerology");
  return (
    <>
      <SEOHead
        title="Free Numerology Tools & Calculators Online | AnkDarppan"
        description="Explore free numerology tools: name numerology, life path, destiny number, mobile number analysis & more. Instant results, 100% free."
      />
      <SiteHeader />
      <main className="container py-8 max-w-4xl">
        <Breadcrumbs items={[{ label: "Numerology Tools" }]} />
        <h1 className="font-heading font-bold text-2xl md:text-3xl mb-2">🔮 Numerology Tools</h1>
        <p className="text-muted-foreground mb-8">Discover the hidden power of numbers with our free numerology calculators.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tools.map(t => <ToolCard key={t.slug} tool={t} />)}
        </div>
      </main>
      <SiteFooter />
    </>
  );
};

export default NumerologyTools;
