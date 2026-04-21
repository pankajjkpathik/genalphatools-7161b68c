import SEOHead from "@/components/SEOHead";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Breadcrumbs from "@/components/Breadcrumbs";
import ToolCard from "@/components/ToolCard";
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
        <p className="text-muted-foreground mb-4">Track and improve your health with our free, accurate calculators built around globally recognized formulas.</p>
        <section className="bg-card border border-border rounded-xl p-5 mb-8 text-sm text-muted-foreground leading-relaxed space-y-3">
          <p>GenAlpha Tools offers a complete suite of free <strong>online health calculators</strong> covering body composition, daily nutrition, hydration, fitness, and pregnancy planning. Each calculator is built using established clinical formulas — the WHO BMI classification, Mifflin-St Jeor BMR equation, Harris-Benedict TDEE formula, Devine ideal weight equation, and Naegele's pregnancy due date rule. Whether you are a fitness beginner tracking weight loss, an athlete optimizing performance, or an expecting parent planning ahead, our tools deliver accurate results in seconds.</p>
          <p>Below you'll find {tools.length} different calculators. Each tool page includes a step-by-step guide, worked example, formula explanation, benefits, and frequently asked questions so you understand exactly what the numbers mean — not just the result. All calculations happen in your browser; we never store your personal health data.</p>
        </section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tools.map(t => <ToolCard key={t.slug} tool={t} />)}
        </div>
        <section className="mt-10 bg-muted/40 border border-border rounded-xl p-6">
          <h2 className="font-heading font-bold text-xl mb-3">Why Use Online Health Calculators?</h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-3">Tracking objective metrics — BMI, BMR, body fat percentage, calorie needs, and water intake — gives you a clearer picture of your health than weight alone. Our calculators replace guesswork with science, helping you set realistic goals, monitor progress, and make informed lifestyle choices. The results are educational and should complement, not replace, advice from a qualified healthcare provider.</p>
          <p className="text-sm text-muted-foreground leading-relaxed">Pair these tools with our <a href="/blog" className="text-primary underline">health & wellness articles</a> for in-depth guidance on weight management, nutrition planning, and reading your results correctly.</p>
        </section>
      </main>
      <SiteFooter />
    </>
  );
};

export default HealthCalculators;
