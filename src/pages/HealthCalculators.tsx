import SEOHead from "@/components/SEOHead";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Breadcrumbs from "@/components/Breadcrumbs";
import ToolCard from "@/components/ToolCard";
import AdPlaceholder from "@/components/AdPlaceholder";
import { getToolsByCategory } from "@/data/tools";

const HealthCalculators = () => {
  const tools = getToolsByCategory("health");
  return (
    <>
      <SEOHead
        title="Free Health Calculators Online – BMI, Calories, BMR | GenAlpha Tools"
        description="Free online health calculators: BMI, calorie needs, BMR, water intake, ideal weight & more. Instant results for better health decisions."
      />
      <SiteHeader />
      <main className="container py-8 max-w-4xl">
        <Breadcrumbs items={[{ label: "Health Calculators" }]} />
        <h1 className="font-heading font-bold text-2xl md:text-3xl mb-2">💪 Health Calculators</h1>
        <p className="text-muted-foreground mb-8">Track and improve your health with our free, accurate calculators.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tools.map(t => <ToolCard key={t.slug} tool={t} />)}
        </div>
      </main>
      <SiteFooter />
    </>
  );
};

export default HealthCalculators;
