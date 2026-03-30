import SEOHead from "@/components/SEOHead";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Breadcrumbs from "@/components/Breadcrumbs";

const About = () => (
  <>
    <SEOHead title="About Us | GenAlpha Tools" description="Learn about GenAlpha Tools – your trusted source for free online numerology and health calculators." />
    <SiteHeader />
    <main className="container py-8 max-w-3xl">
      <Breadcrumbs items={[{ label: "About Us" }]} />
      <h1 className="font-heading font-bold text-2xl md:text-3xl mb-4">About GenAlpha Tools</h1>
      <div className="prose prose-sm text-muted-foreground space-y-4">
        <p>GenAlpha Tools is your one-stop destination for free, accurate online calculators. We specialize in two domains: <strong>Numerology</strong> and <strong>Health & Wellness</strong>.</p>
        <p>Our mission is to provide instant, reliable tools that help millions of users make informed decisions about their lives and health — completely free of charge.</p>
        <h2 className="font-heading font-bold text-lg text-foreground mt-6">Why Trust Us?</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>All calculations use established, well-documented formulas</li>
          <li>Tools are tested for accuracy and reliability</li>
          <li>No personal data is stored — all calculations happen in your browser</li>
          <li>Mobile-optimized for use anywhere, anytime</li>
        </ul>
        <h2 className="font-heading font-bold text-lg text-foreground mt-6">Our Vision</h2>
        <p>To become the most trusted and comprehensive free tools platform for numerology enthusiasts and health-conscious individuals worldwide.</p>
      </div>
    </main>
    <SiteFooter />
  </>
);

export default About;
