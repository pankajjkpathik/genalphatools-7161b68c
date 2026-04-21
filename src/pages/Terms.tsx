import SEOHead from "@/components/SEOHead";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Breadcrumbs from "@/components/Breadcrumbs";

const Terms = () => (
  <>
    <SEOHead
      title="Terms & Conditions | GenAlpha Tools"
      description="Read the Terms & Conditions for using GenAlpha Tools — free online numerology and health calculators. Learn about acceptable use, intellectual property, and disclaimers."
    />
    <SiteHeader />
    <main className="container py-8 max-w-3xl">
      <Breadcrumbs items={[{ label: "Terms & Conditions" }]} />
      <h1 className="font-heading font-bold text-2xl md:text-3xl mb-4">Terms &amp; Conditions</h1>
      <div className="text-muted-foreground space-y-4 text-sm leading-relaxed">
        <p><strong className="text-foreground">Last Updated:</strong> April 2026</p>

        <p>Welcome to GenAlpha Tools. By accessing or using our website (genalphatools.com), you agree to be bound by these Terms &amp; Conditions and our <a href="/privacy-policy" className="text-primary underline">Privacy Policy</a>. Please read them carefully before using any of our calculators or content.</p>

        <h2 className="font-heading font-bold text-lg text-foreground mt-6">1. Acceptance of Terms</h2>
        <p>By using this website you confirm that you are at least 13 years old and that you accept these terms in full. If you disagree with any part of these terms, please do not use the website.</p>

        <h2 className="font-heading font-bold text-lg text-foreground mt-6">2. Use of the Service</h2>
        <p>GenAlpha Tools provides free online numerology and health calculators along with related educational content. You may use the tools and articles for personal, non-commercial purposes only. You may not republish, scrape, or redistribute our content without written permission.</p>

        <h2 className="font-heading font-bold text-lg text-foreground mt-6">3. Intellectual Property</h2>
        <p>All content on this website — including text, graphics, logos, calculator code, and design — is the property of GenAlpha Tools or its content creators and is protected by Indian and international copyright laws. The brand names "GenAlpha" and "GenAlpha Tools" are trademarks of their respective owner.</p>

        <h2 className="font-heading font-bold text-lg text-foreground mt-6">4. Acceptable Use</h2>
        <p>You agree not to:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Use the website in any unlawful manner or for any unlawful purpose</li>
          <li>Attempt to gain unauthorised access to our servers or systems</li>
          <li>Introduce viruses, trojans, worms, or other malicious material</li>
          <li>Conduct automated data collection or scraping without consent</li>
          <li>Misrepresent your identity or impersonate any person or entity</li>
        </ul>

        <h2 className="font-heading font-bold text-lg text-foreground mt-6">5. No Professional Advice</h2>
        <p>The information provided by our health calculators is for general educational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. The information from our numerology calculators is provided for entertainment and self-reflection only. See our full <a href="/disclaimer" className="text-primary underline">Disclaimer</a>.</p>

        <h2 className="font-heading font-bold text-lg text-foreground mt-6">6. Third-Party Links</h2>
        <p>Our content may include links to third-party websites for reference. We have no control over and accept no responsibility for the content, policies, or practices of those external sites.</p>

        <h2 className="font-heading font-bold text-lg text-foreground mt-6">7. Limitation of Liability</h2>
        <p>To the fullest extent permitted by law, GenAlpha Tools and its team shall not be liable for any direct, indirect, incidental, special, or consequential damages arising from your use of this website or reliance on any information presented here.</p>

        <h2 className="font-heading font-bold text-lg text-foreground mt-6">8. Changes to These Terms</h2>
        <p>We may update these Terms &amp; Conditions from time to time. The "Last Updated" date at the top of this page indicates the latest revision. Continued use of the website after changes constitutes acceptance of the revised terms.</p>

        <h2 className="font-heading font-bold text-lg text-foreground mt-6">9. Governing Law</h2>
        <p>These terms are governed by and construed in accordance with the laws of India. Any disputes arising shall be subject to the exclusive jurisdiction of courts in India.</p>

        <h2 className="font-heading font-bold text-lg text-foreground mt-6">10. Contact</h2>
        <p>For questions about these terms, please email <a href="mailto:contact@genalphatools.com" className="text-primary underline">contact@genalphatools.com</a>.</p>
      </div>
    </main>
    <SiteFooter />
  </>
);

export default Terms;
