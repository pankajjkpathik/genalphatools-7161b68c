import SEOHead from "@/components/SEOHead";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Breadcrumbs from "@/components/Breadcrumbs";

const PrivacyPolicy = () => (
  <>
    <SEOHead title="Privacy Policy | AnkDarppan Tools" description="Privacy policy for AnkDarppan Tools. Learn how we handle your data and protect your privacy." />
    <SiteHeader />
    <main className="container py-8 max-w-3xl">
      <Breadcrumbs items={[{ label: "Privacy Policy" }]} />
      <h1 className="font-heading font-bold text-2xl md:text-3xl mb-4">Privacy Policy</h1>
      <div className="text-muted-foreground space-y-4 text-sm">
        <p><strong className="text-foreground">Last Updated:</strong> March 2026</p>
        <h2 className="font-heading font-bold text-lg text-foreground mt-6">Data Collection</h2>
        <p>AnkDarppan Tools does <strong>not</strong> collect, store, or share any personal information you enter into our calculators. All calculations are performed entirely in your web browser (client-side).</p>
        <h2 className="font-heading font-bold text-lg text-foreground mt-6">Cookies & Analytics</h2>
        <p>We may use cookies for analytics purposes (such as Google Analytics) to understand how visitors use our website. These cookies do not collect personally identifiable information.</p>
        <h2 className="font-heading font-bold text-lg text-foreground mt-6">Third-Party Advertising</h2>
        <p>We use Google AdSense to display advertisements. Google may use cookies to serve ads based on your prior visits to our website or other websites. You can opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" className="text-primary underline" target="_blank" rel="noopener noreferrer">Google Ads Settings</a>.</p>
        <h2 className="font-heading font-bold text-lg text-foreground mt-6">Contact</h2>
        <p>For privacy-related questions, email us at contact@ankdarppan.com.</p>
      </div>
    </main>
    <SiteFooter />
  </>
);

export default PrivacyPolicy;
