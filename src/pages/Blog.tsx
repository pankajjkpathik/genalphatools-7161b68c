import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Breadcrumbs from "@/components/Breadcrumbs";
import { blogPosts } from "@/data/blog-posts";

const categoryColors: Record<string, string> = {
  health: "bg-accent/10 text-accent",
  numerology: "bg-secondary/10 text-secondary",
  guide: "bg-primary/10 text-primary",
};

const Blog = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "GenAlpha Tools Blog",
    url: "https://genalphatools.in/blog",
    description: "Guides on numerology, BMI, calorie tracking, pregnancy and personal wellness.",
    blogPost: blogPosts.map(p => ({
      "@type": "BlogPosting",
      headline: p.title,
      url: `https://genalphatools.in/blog/${p.slug}`,
      datePublished: p.publishedAt,
      author: { "@type": "Organization", name: p.author },
    })),
  };

  return (
    <>
      <SEOHead
        title="Blog – Numerology & Health Guides | GenAlpha Tools"
        description="In-depth guides on numerology, BMI, calorie tracking, pregnancy and wellness. Practical articles to help you get the most out of our free calculators."
        jsonLd={jsonLd}
      />
      <SiteHeader />
      <main className="container py-8 max-w-4xl">
        <Breadcrumbs items={[{ label: "Blog" }]} />
        <h1 className="font-heading font-bold text-2xl md:text-3xl mb-2">📚 Blog & Guides</h1>
        <p className="text-muted-foreground mb-4">Practical, research-backed articles on numerology, health and personal wellness.</p>
        <section className="bg-card border border-border rounded-xl p-5 mb-8 text-sm text-muted-foreground leading-relaxed">
          <p>Welcome to the GenAlpha Tools blog — your library of in-depth guides covering everything our calculators measure. Every article is written by our editorial team, reviewed for accuracy, and designed to help you understand <em>why</em> a number matters, not just what it says. Whether you want to lose weight safely, choose a lucky baby name, calculate your TDEE, or understand pregnancy milestones, you'll find a clear, no-fluff explanation here.</p>
        </section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {blogPosts.map(post => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="group block bg-card border border-border rounded-xl p-5 hover:shadow-elevated hover:border-primary/40 transition-all"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full capitalize ${categoryColors[post.category] || "bg-muted text-muted-foreground"}`}>{post.category}</span>
                <span className="text-xs text-muted-foreground">{post.readTimeMin} min read</span>
              </div>
              <h2 className="font-heading font-bold text-lg mb-2 group-hover:text-primary transition-colors leading-snug">{post.title}</h2>
              <p className="text-sm text-muted-foreground mb-3 line-clamp-3">{post.excerpt}</p>
              <div className="text-xs text-muted-foreground">By {post.author} · {new Date(post.publishedAt).toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "numeric" })}</div>
            </Link>
          ))}
        </div>
      </main>
      <SiteFooter />
    </>
  );
};

export default Blog;
