import { lazy, Suspense } from "react";
import { useParams, Link } from "react-router-dom";
import { getToolBySlug, getRelatedTools } from "@/data/tools";
import { getVariationBySlug, getVariationsByBaseSlug } from "@/data/seo-variations";
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
import RelatedBlogPosts from "@/components/RelatedBlogPosts";
import NotFound from "@/pages/NotFound";

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
import BabyNameNumerologyForm from "@/components/tools/BabyNameNumerologyForm";
import BusinessNameNumerologyForm from "@/components/tools/BusinessNameNumerologyForm";
import LuckyNameGeneratorForm from "@/components/tools/LuckyNameGeneratorForm";
import MarriageCompatibilityForm from "@/components/tools/MarriageCompatibilityForm";
import BodyFatForm from "@/components/tools/BodyFatForm";
import PregnancyDueDateForm from "@/components/tools/PregnancyDueDateForm";
import OvulationForm from "@/components/tools/OvulationForm";

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
  "baby-name-numerology": BabyNameNumerologyForm,
  "business-name-numerology": BusinessNameNumerologyForm,
  "lucky-name-generator": LuckyNameGeneratorForm,
  "marriage-compatibility-calculator": MarriageCompatibilityForm,
  "body-fat-calculator": BodyFatForm,
  "pregnancy-due-date-calculator": PregnancyDueDateForm,
  "ovulation-calculator": OvulationForm,
};

const VariantToolPage = lazy(() => import("./VariantToolPage"));

const ToolPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const tool = slug ? getToolBySlug(slug) : undefined;
  const variation = slug ? getVariationBySlug(slug) : undefined;

  if (!tool && variation) {
    return (
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
        <VariantToolPage />
      </Suspense>
    );
  }

  if (!tool) return <NotFound />;

  const FormComponent = formMap[tool.slug];
  const related = getRelatedTools(tool.relatedSlugs);
  const variations = getVariationsByBaseSlug(tool.slug);
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

  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `How to Use ${tool.name}`,
    step: tool.howToUse.map((text, i) => ({
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
      { "@type": "ListItem", position: 3, name: tool.name },
    ],
  };

  return (
    <>
      <SEOHead
        title={tool.metaTitle}
        description={tool.metaDescription}
        jsonLd={[faqJsonLd, howToJsonLd, breadcrumbJsonLd]}
      />
      <SiteHeader />
      <main className="container py-8 max-w-4xl">
        <Breadcrumbs items={[
          { label: categoryLabel, href: categoryPath },
          { label: tool.name },
        ]} />

        <article>
          <h1 className="font-heading font-bold text-2xl md:text-3xl mb-3">{tool.name}</h1>
          <p className="text-muted-foreground mb-6 leading-relaxed">{tool.intro}</p>

          {FormComponent && <FormComponent />}

          <ShareButtons title={tool.name} />

          {/* SEO Variation Links */}
          {variations.length > 0 && (
            <section className="mt-8">
              <h2 className="font-heading font-semibold text-lg mb-3">Also Try</h2>
              <div className="flex flex-wrap gap-2">
                {variations.map(v => (
                  <Link
                    key={v.slug}
                    to={`/tool/${v.slug}`}
                    className="inline-block text-sm px-3 py-1.5 rounded-full border border-border bg-muted/50 text-muted-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
                  >
                    {v.name}
                  </Link>
                ))}
              </div>
            </section>
          )}

          <HowToUse steps={tool.howToUse} />

          <ExampleCalculation example={tool.example} />

          {tool.formula && (
            <section className="mt-10">
              <h2 className="font-heading font-bold text-xl mb-3">How It's Calculated</h2>
              <div className="bg-muted rounded-lg p-4 text-sm text-muted-foreground">{tool.formula}</div>
            </section>
          )}

          {tool.detailedContent && (
            <section className="mt-10">
              <h2 className="font-heading font-bold text-xl mb-3">What You Should Know</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{tool.detailedContent}</p>
            </section>
          )}

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

          <FAQSection faqs={tool.faqs} />

          <PeopleAlsoSearch slugs={tool.peopleAlsoSearch} />

          <RelatedBlogPosts toolSlug={tool.slug} toolCategory={tool.category as "health" | "numerology"} />

          {related.length > 0 && (
            <section className="mt-10">
              <h2 className="font-heading font-bold text-xl mb-4">Related Calculators</h2>
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
