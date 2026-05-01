import { useParams } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Breadcrumbs from "@/components/Breadcrumbs";
import FilterableToolGrid from "@/components/FilterableToolGrid";
import { CATEGORY_META, getToolsByCategory, type ToolCategory } from "@/data/tools";
import NotFound from "@/pages/NotFound";

const SITE = "https://genalphatools.in";

interface ClusterPageProps {
  category: ToolCategory;
}

const ClusterPage = ({ category }: ClusterPageProps) => {
  const meta = CATEGORY_META[category];
  if (!meta) return <NotFound />;
  const list = getToolsByCategory(category);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
      { "@type": "ListItem", position: 2, name: meta.label },
    ],
  };

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: meta.label,
    itemListElement: list.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE}/tool/${t.slug}`,
      name: t.name,
    })),
  };

  return (
    <>
      <SEOHead
        title={`Free ${meta.label} Calculators Online | GenAlpha Tools`}
        description={`${meta.tagline} ${list.length} free online tools. No signup, instant results.`}
        jsonLd={[breadcrumbJsonLd, itemListJsonLd]}
      />
      <SiteHeader />
      <main className="container py-8 max-w-5xl">
        <Breadcrumbs items={[{ label: meta.label }]} />
        <header className="mb-6">
          <h1 className="font-heading font-black text-3xl md:text-5xl tracking-tight mb-3">
            <span className="mr-2">{meta.emoji}</span>{meta.label}
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-3xl">{meta.tagline}</p>
        </header>
        <FilterableToolGrid tools={list} />
      </main>
      <SiteFooter />
    </>
  );
};

export default ClusterPage;
