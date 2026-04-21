import SEOHead from "@/components/SEOHead";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Breadcrumbs from "@/components/Breadcrumbs";

const PrivacyPolicy = () => (
  <>
    <SEOHead title="Privacy Policy | GenAlpha Tools" description="Privacy policy for GenAlpha Tools. Learn how we handle your data and protect your privacy." />
    <SiteHeader />
    <main className="container py-8 max-w-3xl">
      <Breadcrumbs items={[{ label: "Privacy Policy" }]} />
      <h1 className="font-heading font-bold text-2xl md:text-3xl mb-4">Privacy Policy</h1>
      <div className="text-muted-foreground space-y-4 text-sm">
        <p><strong className="text-foreground">Last Updated:</strong> March 2026</p>
        <h2 className="font-heading font-bold text-lg text-foreground mt-6">Data Collection</h2>
        <p>GenAlpha Tools does <strong>not</strong> collect, store, or share any personal information you enter into our calculators. All calculations are performed entirely in your web browser (client-side).</p>
        <h2 className="font-heading font-bold text-lg text-foreground mt-6">Cookies & Analytics</h2>
        <p>We may use cookies for analytics purposes (such as Google Analytics) to understand how visitors use our website. These cookies do not collect personally identifiable information.</p>
        <h2 className="font-heading font-bold text-lg text-foreground mt-6">Third-Party Services</h2>
        <p>We may use third-party services such as Google Analytics for anonymous traffic analysis. These services may set their own cookies. You can manage cookie preferences directly in your browser settings at any time.</p>
        <h2 className="font-heading font-bold text-lg text-foreground mt-6">Children's Privacy</h2>
        <p>Our services are intended for general audiences. We do not knowingly collect personal information from children under 13. If you believe a child has provided us with information, please contact us and we will promptly delete it.</p>
        <h2 className="font-heading font-bold text-lg text-foreground mt-6">Your Rights</h2>
        <p>You have the right to access, correct, or request deletion of any personal data. Since we do not store calculator inputs, the data we hold is limited to anonymous analytics. Email us to exercise your rights.</p>
        <h2 className="font-heading font-bold text-lg text-foreground mt-6">Contact</h2>
        <p>For privacy-related questions, email us at contact@genalphatools.com.</p>
      </div>
    </main>
    <SiteFooter />
  </>
);

export default PrivacyPolicy;
