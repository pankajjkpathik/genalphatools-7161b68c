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
        <h2 className="font-heading font-bold text-lg text-foreground mt-6">Cookies, Consent & Analytics</h2>
        <p>On your first visit you will see a consent banner. No analytics or advertising scripts run until you make a choice. You can <strong>Accept all</strong>, <strong>Reject non-essential</strong>, or use <strong>Customise</strong> to toggle Analytics and Advertising independently. Strictly necessary cookies (used to remember your consent choice) are always on.</p>
        <p>Your preference is stored locally in your browser under the key <code className="text-xs bg-muted px-1 rounded">ga-consent-v1</code>. To change it later, clear your browser site data for genalphatools.in and reload the page — the banner will reappear.</p>
        <h2 className="font-heading font-bold text-lg text-foreground mt-6">Third-Party Services</h2>
        <p>If you grant advertising consent, Google AdSense (publisher ID <code className="text-xs bg-muted px-1 rounded">pub-1433261757916600</code>) may set cookies to serve and measure ads in accordance with <a className="underline hover:text-foreground" href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer">Google's advertising policies</a>. If you grant analytics consent, anonymous usage statistics may be collected. No third-party scripts load if you reject non-essential cookies.</p>
        <h2 className="font-heading font-bold text-lg text-foreground mt-6">Children's Privacy</h2>
        <p>Our services are intended for general audiences. We do not knowingly collect personal information from children under 13. If you believe a child has provided us with information, please contact us and we will promptly delete it.</p>
        <h2 className="font-heading font-bold text-lg text-foreground mt-6">Your Rights</h2>
        <p>You have the right to access, correct, or request deletion of any personal data. Since we do not store calculator inputs, the data we hold is limited to anonymous analytics. Email us to exercise your rights.</p>
        <h2 className="font-heading font-bold text-lg text-foreground mt-6">Contact</h2>
        <p>For privacy-related questions, email us at contact@genalphatools.in.</p>
      </div>
    </main>
    <SiteFooter />
  </>
);

export default PrivacyPolicy;
