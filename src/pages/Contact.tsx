import SEOHead from "@/components/SEOHead";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Breadcrumbs from "@/components/Breadcrumbs";

const Contact = () => (
  <>
    <SEOHead title="Contact Us | GenAlpha Tools" description="Get in touch with the GenAlpha Tools team for feedback, queries, or collaboration." />
    <SiteHeader />
    <main className="container py-8 max-w-3xl">
      <Breadcrumbs items={[{ label: "Contact Us" }]} />
      <h1 className="font-heading font-bold text-2xl md:text-3xl mb-4">Contact Us</h1>
      <div className="text-muted-foreground space-y-4 text-sm">
        <p>We'd love to hear from you! Whether it's feedback, a bug report, or a suggestion for a new tool — reach out anytime.</p>
        <div className="bg-card border border-border rounded-lg p-6">
          <p><strong className="text-foreground">Email:</strong> contact@genalphatools.com</p>
          <p className="mt-2"><strong className="text-foreground">Response Time:</strong> Within 24-48 hours</p>
        </div>
        <p>For business inquiries, partnerships, or advertising opportunities, please use the email above with the subject line "Business Inquiry".</p>
      </div>
    </main>
    <SiteFooter />
  </>
);

export default Contact;
