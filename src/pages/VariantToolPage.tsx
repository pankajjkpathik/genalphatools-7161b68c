import { useParams } from "react-router-dom";
import { getVariationBySlug } from "@/data/seo-variations";
import { getToolBySlug, getRelatedTools } from "@/data/tools";
import SEOHead from "@/components/SEOHead";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQSection from "@/components/FAQSection";
import ShareButtons from "@/components/ShareButtons";
import ToolCard from "@/components/ToolCard";
import HowToUse from "@/components/HowToUse";
import ExampleCalculation from "@/components/ExampleCalculation";
import PeopleAlsoSearch from "@/components/PeopleAlsoSearch";
import NotFound from "@/pages/NotFound";

import BMIForm from "@/components/tools/BMIForm";
import CalorieForm from "@/components/tools/CalorieForm";
import IdealWeightForm from "@/components/tools/IdealWeightForm";
import BodyFatForm from "@/components/tools/BodyFatForm";
import WaterIntakeForm from "@/components/tools/WaterIntakeForm";
import PregnancyDueDateForm from "@/components/tools/PregnancyDueDateForm";
import NameNumerologyForm from "@/components/tools/NameNumerologyForm";
import LifePathForm from "@/components/tools/LifePathForm";
import DestinyNumberForm from "@/components/tools/DestinyNumberForm";
import MobileNumerologyForm from "@/components/tools/MobileNumerologyForm";
import PersonalYearForm from "@/components/tools/PersonalYearForm";
import VehicleNumerologyForm from "@/components/tools/VehicleNumerologyForm";
import MarriageCompatibilityForm from "@/components/tools/MarriageCompatibilityForm";
import OvulationForm from "@/components/tools/OvulationForm";

const variantFormMap: Record<string, React.ComponentType> = {
  "bmi-calculator": BMIForm,
  "calorie-calculator": CalorieForm,
  "ideal-weight-calculator": IdealWeightForm,
  "body-fat-calculator": BodyFatForm,
  "water-intake-calculator": WaterIntakeForm,
  "pregnancy-due-date-calculator": PregnancyDueDateForm,
  "name-numerology-calculator": NameNumerologyForm,
  "life-path-number-calculator": LifePathForm,
  "destiny-number-calculator": DestinyNumberForm,
  "mobile-number-numerology": MobileNumerologyForm,
  "personal-year-number-calculator": PersonalYearForm,
  "vehicle-number-numerology": VehicleNumerologyForm,
  "marriage-compatibility-calculator": MarriageCompatibilityForm,
  "ovulation-calculator": OvulationForm,
};

const VariantToolPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const variation = slug ? getVariationBySlug(slug) : undefined;

  if (!variation) return <NotFound />;

  const baseTool = getToolBySlug(variation.baseToolSlug);
  if (!baseTool) return <NotFound />;

  const FormComponent = variantFormMap[variation.baseToolSlug];
  const related = getRelatedTools(baseTool.relatedSlugs);
  const categoryPath = baseTool.category === "numerology" ? "/numerology-tools" : "/health-calculators";
  const categoryLabel = baseTool.category === "numerology" ? "Numerology Tools" : "Health Calculators";

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: variation.faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `How to Use ${variation.name}`,
    step: baseTool.howToUse.map((text, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      text,
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://genalphatools.com/" },
      { "@type": "ListItem", position: 2, name: categoryLabel, item: `https://genalphatools.com${categoryPath}` },
      { "@type": "ListItem", position: 3, name: baseTool.name, item: `https://genalphatools.com/tool/${baseTool.slug}` },
      { "@type": "ListItem", position: 4, name: variation.name },
    ],
  };

  return (
    <>
      <SEOHead
        title={variation.metaTitle}
        description={variation.metaDescription}
        jsonLd={[faqJsonLd, howToJsonLd, breadcrumbJsonLd]}
      />
      <SiteHeader />
      <main className="container py-8 max-w-4xl">
        <Breadcrumbs
          items={[
            { label: categoryLabel, href: categoryPath },
            { label: baseTool.name, href: `/tool/${baseTool.slug}` },
            { label: variation.name },
          ]}
        />

        <article>
          <h1 className="font-heading font-bold text-2xl md:text-3xl mb-3">{variation.h1}</h1>
          <p className="text-muted-foreground mb-6 leading-relaxed">{variation.intro}</p>

          {FormComponent && <FormComponent />}

          <ShareButtons title={variation.name} />

          <HowToUse steps={baseTool.howToUse} />

          <ExampleCalculation example={baseTool.example} />

          {baseTool.formula && (
            <section className="mt-10">
              <h2 className="font-heading font-bold text-xl mb-3">How It's Calculated</h2>
              <div className="bg-muted rounded-lg p-4 text-sm text-muted-foreground">{baseTool.formula}</div>
            </section>
          )}

          <section className="mt-10">
            <h2 className="font-heading font-bold text-xl mb-3">Benefits for {variation.audience}</h2>
            <ul className="space-y-2">
              {baseTool.benefits.map((b, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="text-primary mt-0.5">✓</span>
                  {b}
                </li>
              ))}
            </ul>
          </section>

          <FAQSection faqs={variation.faqs} />

          <PeopleAlsoSearch slugs={baseTool.peopleAlsoSearch} />

          {related.length > 0 && (
            <section className="mt-10">
              <h2 className="font-heading font-bold text-xl mb-4">Related Calculators</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {related.map((t) => (
                  <ToolCard key={t.slug} tool={t} />
                ))}
              </div>
            </section>
          )}
        </article>
      </main>
      <SiteFooter />
    </>
  );
};

export default VariantToolPage;
