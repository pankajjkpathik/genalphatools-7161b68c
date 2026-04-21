import { Link } from "react-router-dom";
import { blogPosts, type BlogPost } from "@/data/blog-posts";

// Map tool slug -> ordered list of preferred blog slugs
const toolToBlogMap: Record<string, string[]> = {
  "bmi-calculator": ["how-to-calculate-bmi-correctly", "body-fat-percentage-guide", "ideal-weight-formulas-compared"],
  "calorie-calculator": ["calorie-deficit-guide-india", "bmr-tdee-explained", "water-intake-guide"],
  "bmr-calculator": ["bmr-tdee-explained", "calorie-deficit-guide-india", "ideal-weight-formulas-compared"],
  "ideal-weight-calculator": ["ideal-weight-formulas-compared", "how-to-calculate-bmi-correctly", "body-fat-percentage-guide"],
  "body-fat-calculator": ["body-fat-percentage-guide", "how-to-calculate-bmi-correctly", "bmr-tdee-explained"],
  "water-intake-calculator": ["water-intake-guide", "calorie-deficit-guide-india", "bmr-tdee-explained"],
  "pregnancy-due-date-calculator": ["pregnancy-due-date-explained", "ovulation-tracking-basics", "water-intake-guide"],
  "ovulation-calculator": ["ovulation-tracking-basics", "pregnancy-due-date-explained", "water-intake-guide"],
  "name-numerology-calculator": ["understanding-life-path-numbers", "destiny-number-vs-life-path", "how-to-choose-lucky-baby-name"],
  "life-path-number-calculator": ["understanding-life-path-numbers", "destiny-number-vs-life-path", "personal-year-number-meaning"],
  "destiny-number-calculator": ["destiny-number-vs-life-path", "understanding-life-path-numbers", "how-to-choose-lucky-baby-name"],
  "personal-year-number-calculator": ["personal-year-number-meaning", "understanding-life-path-numbers", "destiny-number-vs-life-path"],
  "mobile-number-numerology": ["mobile-number-numerology-guide", "vehicle-number-numerology-india", "understanding-life-path-numbers"],
  "vehicle-number-numerology": ["vehicle-number-numerology-india", "mobile-number-numerology-guide", "understanding-life-path-numbers"],
  "baby-name-numerology": ["how-to-choose-lucky-baby-name", "understanding-life-path-numbers", "destiny-number-vs-life-path"],
  "business-name-numerology": ["how-to-choose-lucky-baby-name", "destiny-number-vs-life-path", "mobile-number-numerology-guide"],
  "lucky-name-generator": ["how-to-choose-lucky-baby-name", "understanding-life-path-numbers", "destiny-number-vs-life-path"],
  "marriage-compatibility-calculator": ["marriage-compatibility-numerology", "understanding-life-path-numbers", "destiny-number-vs-life-path"],
};

const categoryColor = (cat: BlogPost["category"]) =>
  cat === "health" ? "bg-primary/10 text-primary" : cat === "numerology" ? "bg-accent/15 text-accent-foreground" : "bg-muted text-muted-foreground";

interface RelatedBlogPostsProps {
  toolSlug: string;
  toolCategory?: "health" | "numerology";
  limit?: number;
}

const RelatedBlogPosts = ({ toolSlug, toolCategory, limit = 3 }: RelatedBlogPostsProps) => {
  const preferred = toolToBlogMap[toolSlug] ?? [];
  const fromMap = preferred
    .map((s) => blogPosts.find((p) => p.slug === s))
    .filter((p): p is BlogPost => Boolean(p));

  let posts = fromMap.slice(0, limit);

  // Fallback: fill from same category if mapping is incomplete
  if (posts.length < limit && toolCategory) {
    const fillers = blogPosts
      .filter((p) => p.category === toolCategory && !posts.some((x) => x.slug === p.slug))
      .slice(0, limit - posts.length);
    posts = [...posts, ...fillers];
  }

  if (posts.length === 0) return null;

  return (
    <section className="mt-10">
      <h2 className="font-heading font-bold text-xl mb-4">Related Reads from Our Blog</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post) => (
          <Link
            key={post.slug}
            to={`/blog/${post.slug}`}
            className="group block bg-card rounded-xl border border-border p-5 shadow-card hover:shadow-elevated hover:border-primary/40 transition-all"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className={`text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full ${categoryColor(post.category)}`}>
                {post.category}
              </span>
              <span className="text-xs text-muted-foreground">{post.readTimeMin} min read</span>
            </div>
            <h3 className="font-heading font-semibold text-base leading-snug mb-2 group-hover:text-primary transition-colors">
              {post.title}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-3">{post.excerpt}</p>
            <span className="inline-block mt-3 text-sm font-medium text-primary group-hover:underline">
              Read article →
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default RelatedBlogPosts;
