import { Link, useParams } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Breadcrumbs from "@/components/Breadcrumbs";
import ShareButtons from "@/components/ShareButtons";
import NotFound from "@/pages/NotFound";
import { getBlogPostBySlug, getRelatedPosts } from "@/data/blog-posts";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getBlogPostBySlug(slug) : undefined;
  if (!post) return <NotFound />;
  const related = getRelatedPosts(post.slug, post.category);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.metaDescription,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: { "@type": "Organization", name: post.author },
    publisher: { "@type": "Organization", name: "GenAlpha Tools", url: "https://genalphatools.in" },
    mainEntityOfPage: `https://genalphatools.in/blog/${post.slug}`,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://genalphatools.in/" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://genalphatools.in/blog" },
      { "@type": "ListItem", position: 3, name: post.title },
    ],
  };

  return (
    <>
      <SEOHead title={post.metaTitle} description={post.metaDescription} jsonLd={[jsonLd, breadcrumbJsonLd]} />
      <SiteHeader />
      <main className="container py-8 max-w-3xl">
        <Breadcrumbs items={[{ label: "Blog", href: "/blog" }, { label: post.title }]} />
        <article>
          <div className="flex items-center gap-3 mb-3 text-xs text-muted-foreground">
            <span className="capitalize px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">{post.category}</span>
            <span>{post.readTimeMin} min read</span>
            <span>·</span>
            <time dateTime={post.publishedAt}>{new Date(post.publishedAt).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}</time>
          </div>
          <h1 className="font-heading font-bold text-2xl md:text-3xl mb-4 leading-tight">{post.title}</h1>
          <p className="text-sm text-muted-foreground mb-6">By <span className="text-foreground font-medium">{post.author}</span></p>

          <div
            className="prose prose-sm md:prose-base max-w-none text-foreground/90 [&_h2]:font-heading [&_h2]:font-bold [&_h2]:text-xl [&_h2]:mt-8 [&_h2]:mb-3 [&_p]:leading-relaxed [&_p]:mb-4 [&_p]:text-muted-foreground [&_ul]:my-4 [&_ul]:pl-5 [&_ul]:list-disc [&_ol]:my-4 [&_ol]:pl-5 [&_ol]:list-decimal [&_li]:text-muted-foreground [&_li]:mb-1 [&_a]:text-primary [&_a]:underline [&_strong]:text-foreground"
            dangerouslySetInnerHTML={{ __html: post.body }}
          />

          <ShareButtons title={post.title} />

          {related.length > 0 && (
            <section className="mt-12 border-t border-border pt-8">
              <h2 className="font-heading font-bold text-xl mb-4">Related Reading</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {related.map(r => (
                  <Link
                    key={r.slug}
                    to={`/blog/${r.slug}`}
                    className="block bg-card border border-border rounded-xl p-4 hover:shadow-elevated hover:border-primary/40 transition-all"
                  >
                    <h3 className="font-heading font-semibold text-sm mb-1">{r.title}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-2">{r.excerpt}</p>
                  </Link>
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

export default BlogPost;
