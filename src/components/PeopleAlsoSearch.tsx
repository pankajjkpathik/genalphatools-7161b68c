import { Link } from "react-router-dom";
import { getToolBySlug } from "@/data/tools";
import { getVariationBySlug } from "@/data/seo-variations";

interface PeopleAlsoSearchProps {
  slugs: string[];
}

const PeopleAlsoSearch = ({ slugs }: PeopleAlsoSearchProps) => {
  const items = slugs
    .map((slug) => {
      const tool = getToolBySlug(slug);
      if (tool) return { slug: tool.slug, name: tool.name };
      const variation = getVariationBySlug(slug);
      if (variation) return { slug: variation.slug, name: variation.name };
      return null;
    })
    .filter(Boolean) as { slug: string; name: string }[];

  if (items.length === 0) return null;

  return (
    <section className="mt-10">
      <h2 className="font-heading font-bold text-xl mb-4">People Also Search</h2>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <Link
            key={item.slug}
            to={`/tool/${item.slug}`}
            className="inline-block text-sm px-4 py-2 rounded-full border border-border bg-card text-muted-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors shadow-soft"
          >
            {item.name}
          </Link>
        ))}
      </div>
    </section>
  );
};

export default PeopleAlsoSearch;
