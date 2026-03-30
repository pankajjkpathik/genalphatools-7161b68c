import { useParams } from "react-router-dom";
import { getToolBySlug, getRelatedTools } from "@/data/tools";
import SEOHead from "@/components/SEOHead";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQSection from "@/components/FAQSection";
import AdPlaceholder from "@/components/AdPlaceholder";
import ShareButtons from "@/components/ShareButtons";
import ToolCard from "@/components/ToolCard";
import NotFound from "@/pages/NotFound";

// Tool form components
import NameNumerologyForm from "@/components/tools/NameNumerologyForm";
import LifePathForm from "@/components/tools/LifePathForm";
import DestinyNumberForm from "@/components/tools/DestinyNumberForm";
import MobileNumerologyForm from "@/components/tools/MobileNumerologyForm";
import PersonalYearForm from "@/components/tools/PersonalYearForm";
import VehicleNumerologyForm from "@/components/tools/VehicleNumerologyForm";
import BMIForm from "@/components/tools/BMIForm";
import CalorieForm from "@/components/tools/CalorieForm";
import BMRForm from "@/components/tools/BMRForm";
import WaterIntakeForm from "@/components/tools/WaterIntakeForm";
import IdealWeightForm from "@/components/tools/IdealWeightForm";

const formMap: Record<string, React.ComponentType> = {
  "name-numerology-calculator": NameNumerologyForm,
  "life-path-number-calculator": LifePathForm,
  "destiny-number-calculator": DestinyNumberForm,
  "mobile-number-numerology": MobileNumerologyForm,
  "personal-year-number-calculator": PersonalYearForm,
  "vehicle-number-numerology": VehicleNumerologyForm,
  "bmi-calculator": BMIForm,
  "calorie-calculator": CalorieForm,
  "bmr-calculator": BMRForm,
  "water-intake-calculator": WaterIntakeForm,
  "ideal-weight-calculator": IdealWeightForm,
};

const ToolPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const tool = slug ? getToolBySlug(slug) : undefined;

  if (!tool) return <NotFound />;

  const FormComponent = formMap[tool.slug];
  const related = getRelatedTools(tool.relatedSlugs);
  const categoryPath = tool.category === "numerology" ? "/numerology-tools" : "/health-calculators";
  const categoryLabel = tool.category === "numerology" ? "Numerology Tools" : "Health Calculators";

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: tool.faqs.map(f => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://ankdarppan.com/" },
      { "@type": "ListItem", position: 2, name: categoryLabel, item: `https://ankdarppan.com${categoryPath}` },
      { "@type": "ListItem", position: 3, name: tool.name },
    ],
  };

  return (
    <>
      <SEOHead
        title={tool.metaTitle}
        description={tool.metaDescription}
        jsonLd={[faqJsonLd, breadcrumbJsonLd]}
      />
      <SiteHeader />
      <main className="container py-8 max-w-4xl">
        <Breadcrumbs items={[
          { label: categoryLabel, href: categoryPath },
          { label: tool.name },
        ]} />

        <AdPlaceholder slot="tool-top" />

        <article>
          <h1 className="font-heading font-bold text-2xl md:text-3xl mb-3">{tool.name}</h1>
          <p className="text-muted-foreground mb-6 leading-relaxed">{tool.intro}</p>

          {/* Calculator */}
          {FormComponent && <FormComponent />}

          <ShareButtons title={tool.name} />

          <AdPlaceholder slot="tool-mid" />

          {/* Formula */}
          {tool.formula && (
            <section className="mt-10">
              <h2 className="font-heading font-bold text-xl mb-3">How It's Calculated</h2>
              <div className="bg-muted rounded-lg p-4 text-sm text-muted-foreground">{tool.formula}</div>
            </section>
          )}

          {/* Benefits */}
          <section className="mt-10">
            <h2 className="font-heading font-bold text-xl mb-3">Benefits & Use Cases</h2>
            <ul className="space-y-2">
              {tool.benefits.map((b, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="text-primary mt-0.5">✓</span>
                  {b}
                </li>
              ))}
            </ul>
          </section>

          {/* FAQs */}
          <FAQSection faqs={tool.faqs} />

          <AdPlaceholder slot="tool-bottom" />

          {/* Related */}
          {related.length > 0 && (
            <section className="mt-10">
              <h2 className="font-heading font-bold text-xl mb-4">Related Tools</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {related.map(t => <ToolCard key={t.slug} tool={t} />)}
              </div>
            </section>
          )}
        </article>
      </main>
      <SiteFooter />
    </>
  );
};

export default ToolPage;
