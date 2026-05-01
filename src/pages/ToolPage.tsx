import { useParams, Link } from "react-router-dom";
import { getToolBySlug, getRelatedTools, getCategoryPath, getCategoryLabel, CATEGORY_META } from "@/data/tools";
import SEOHead from "@/components/SEOHead";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQSection from "@/components/FAQSection";
import ShareButtons from "@/components/ShareButtons";
import ToolCard from "@/components/ToolCard";
import HowToUse from "@/components/HowToUse";
import ExampleCalculation from "@/components/ExampleCalculation";
import NotFound from "@/pages/NotFound";

import ABTestForm from "@/components/tools/ABTestForm";
import BreakEvenForm from "@/components/tools/BreakEvenForm";
import DatasetSummaryForm from "@/components/tools/DatasetSummaryForm";
import ProbabilityForm from "@/components/tools/ProbabilityForm";
import ROIForm from "@/components/tools/ROIForm";
import StdDevForm from "@/components/tools/StdDevForm";
import {
  CACForm, LTVForm, ConversionRateForm, ProfitMarginForm, MarkupForm,
  CPLForm, CPAForm, SalesGrowthForm,
} from "@/components/tools/MarketingForms";
import {
  VarianceForm, ZScoreForm, PValueForm, ConfidenceIntervalForm, MarginOfErrorForm,
  SampleSizeForm, RegressionForm, CorrelationForm,
} from "@/components/tools/StatsForms";
import { StatSignificanceForm, SplitTestForm, ConversionLiftForm, BayesianABForm } from "@/components/tools/ABForms";
import {
  CompoundInterestForm, InvestmentReturnForm, NPVForm, IRRForm, MortgageForm,
  LoanForm, DTIForm, RetirementForm, InflationForm, SavingsGoalForm,
} from "@/components/tools/FinanceForms";
import { MRRForm, ARRForm, ChurnForm, RetentionForm, BurnRateForm } from "@/components/tools/SaasForms";
import { CsvToJsonForm, JsonFormatterForm, RemoveDuplicatesForm, TextCleanerForm, ExcelToCsvForm } from "@/components/tools/UtilityForms";
import { ChartGeneratorForm, HistogramForm, CorrelationHeatmapForm, SurveyResultsForm } from "@/components/tools/VizForms";

const formMap: Record<string, React.ComponentType> = {
  // existing
  "ab-test-calculator": ABTestForm,
  "break-even-calculator": BreakEvenForm,
  "dataset-summary-generator": DatasetSummaryForm,
  "probability-calculator": ProbabilityForm,
  "roi-calculator": ROIForm,
  "standard-deviation-calculator": StdDevForm,
  // marketing
  "cac-calculator": CACForm,
  "ltv-calculator": LTVForm,
  "conversion-rate-calculator": ConversionRateForm,
  "profit-margin-calculator": ProfitMarginForm,
  "markup-calculator": MarkupForm,
  "cost-per-lead-calculator": CPLForm,
  "cost-per-acquisition-calculator": CPAForm,
  "sales-growth-calculator": SalesGrowthForm,
  // statistics
  "variance-calculator": VarianceForm,
  "z-score-calculator": ZScoreForm,
  "p-value-calculator": PValueForm,
  "confidence-interval-calculator": ConfidenceIntervalForm,
  "margin-of-error-calculator": MarginOfErrorForm,
  "sample-size-calculator": SampleSizeForm,
  "regression-calculator": RegressionForm,
  "correlation-calculator": CorrelationForm,
  // a/b testing
  "statistical-significance-calculator": StatSignificanceForm,
  "split-test-calculator": SplitTestForm,
  "conversion-lift-calculator": ConversionLiftForm,
  "bayesian-ab-test-calculator": BayesianABForm,
  // finance
  "compound-interest-calculator": CompoundInterestForm,
  "investment-return-calculator": InvestmentReturnForm,
  "npv-calculator": NPVForm,
  "irr-calculator": IRRForm,
  "mortgage-calculator": MortgageForm,
  "loan-calculator": LoanForm,
  "debt-to-income-ratio-calculator": DTIForm,
  "retirement-calculator": RetirementForm,
  "inflation-calculator": InflationForm,
  "savings-goal-calculator": SavingsGoalForm,
  // saas
  "mrr-calculator": MRRForm,
  "arr-calculator": ARRForm,
  "churn-rate-calculator": ChurnForm,
  "customer-retention-rate-calculator": RetentionForm,
  "burn-rate-calculator": BurnRateForm,
  // utilities
  "csv-to-json-converter": CsvToJsonForm,
  "json-formatter": JsonFormatterForm,
  "remove-duplicates-tool": RemoveDuplicatesForm,
  "text-cleaner-tool": TextCleanerForm,
  "excel-to-csv-converter": ExcelToCsvForm,
  // visualization + bonus
  "chart-generator": ChartGeneratorForm,
  "histogram-generator": HistogramForm,
  "correlation-heatmap-generator": CorrelationHeatmapForm,
  "survey-results-analyzer": SurveyResultsForm,
};

const ComingSoonPanel = ({ name }: { name: string }) => (
  <div className="bg-card rounded-xl border-2 border-dashed border-border p-8 text-center my-2">
    <p className="text-xs uppercase tracking-widest text-muted-foreground font-bold mb-2">Calculator launching soon</p>
    <h2 className="font-heading text-2xl font-black mb-2">The {name} is on the build queue</h2>
    <p className="text-sm text-muted-foreground max-w-md mx-auto">
      Full SEO content, formula, examples and FAQs are below. The interactive calculator ships in our next release.
      In the meantime, explore related tools or our <Link to="/blog" className="text-primary underline">blog</Link>.
    </p>
  </div>
);

const ToolPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const tool = slug ? getToolBySlug(slug) : undefined;
  if (!tool) return <NotFound />;

  const FormComponent = formMap[tool.slug];
  const related = getRelatedTools(tool.relatedSlugs);
  const categoryPath = getCategoryPath(tool.category);
  const categoryLabel = getCategoryLabel(tool.category);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: tool.faqs.map((f) => ({
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
      { "@type": "ListItem", position: 1, name: "Home", item: "https://genalphatools.in/" },
      { "@type": "ListItem", position: 2, name: categoryLabel, item: `https://genalphatools.in${categoryPath}` },
      { "@type": "ListItem", position: 3, name: tool.name },
    ],
  };

  return (
    <>
      <SEOHead title={tool.metaTitle} description={tool.metaDescription} jsonLd={[faqJsonLd, howToJsonLd, breadcrumbJsonLd]} />
      <SiteHeader />
      <main className="container py-8 max-w-4xl">
        <Breadcrumbs items={[{ label: categoryLabel, href: categoryPath }, { label: tool.name }]} />

        <article>
          <span className="text-xs uppercase tracking-widest text-muted-foreground font-bold">{CATEGORY_META[tool.category].emoji} {categoryLabel}</span>
          <h1 className="font-heading font-black text-3xl md:text-5xl tracking-tight mt-2 mb-4">{tool.name}</h1>
          <p className="text-muted-foreground mb-6 leading-relaxed text-base md:text-lg">{tool.intro}</p>

          {FormComponent && !tool.comingSoon ? <FormComponent /> : <ComingSoonPanel name={tool.name} />}

          <ShareButtons title={tool.name} />

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

          {related.length > 0 && (
            <section className="mt-10">
              <h2 className="font-heading font-bold text-xl mb-4">Related Calculators</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {related.map((t) => <ToolCard key={t.slug} tool={t} />)}
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
