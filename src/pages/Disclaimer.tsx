import SEOHead from "@/components/SEOHead";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Breadcrumbs from "@/components/Breadcrumbs";

const Disclaimer = () => (
  <>
    <SEOHead title="Disclaimer | GenAlpha Tools" description="Important disclaimer for GenAlpha Tools regarding health and numerology content." />
    <SiteHeader />
    <main className="container py-8 max-w-3xl">
      <Breadcrumbs items={[{ label: "Disclaimer" }]} />
      <h1 className="font-heading font-bold text-2xl md:text-3xl mb-4">Disclaimer</h1>
      <div className="text-muted-foreground space-y-4 text-sm">
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
          <p className="font-medium text-foreground">⚠️ Important: Please read this disclaimer carefully before using our tools.</p>
        </div>
        <h2 className="font-heading font-bold text-lg text-foreground mt-6">Health Calculators</h2>
        <p>The health calculators on this website are intended for <strong>informational and educational purposes only</strong>. They are NOT a substitute for professional medical advice, diagnosis, or treatment. Always consult a qualified healthcare provider before making health-related decisions.</p>
        <h2 className="font-heading font-bold text-lg text-foreground mt-6">Numerology Tools</h2>
        <p>Numerology is a belief system based on the mystical relationship between numbers and events. Our numerology tools are provided for <strong>entertainment and self-exploration purposes only</strong>. Results should not be used as the sole basis for important life decisions.</p>
        <h2 className="font-heading font-bold text-lg text-foreground mt-6">Accuracy</h2>
        <p>While we strive to ensure the accuracy of our calculations, we make no guarantees regarding the results. Formulas used are based on widely accepted methods but may not account for all individual factors.</p>
        <h2 className="font-heading font-bold text-lg text-foreground mt-6">Liability</h2>
        <p>GenAlpha Tools shall not be held liable for any losses, damages, or consequences arising from the use of any tool or information on this website.</p>
      </div>
    </main>
    <SiteFooter />
  </>
);

export default Disclaimer;
