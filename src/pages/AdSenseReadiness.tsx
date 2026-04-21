import { Link } from "react-router-dom";
import { CheckCircle2, Circle, ExternalLink, ShieldCheck } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ChecklistItem {
  label: string;
  description: string;
  status: "done" | "pending";
  evidence?: { label: string; href: string; internal?: boolean };
}

const checklist: ChecklistItem[] = [
  {
    label: "Original, helpful content",
    description:
      "18 calculators with formulas, examples, FAQs, and 15 long-form blog articles (300–800+ words each).",
    status: "done",
    evidence: { label: "Browse blog", href: "/blog", internal: true },
  },
  {
    label: "Privacy Policy published",
    description: "Covers cookies, analytics, third-party advertising (AdSense), and user data handling.",
    status: "done",
    evidence: { label: "View policy", href: "/privacy-policy", internal: true },
  },
  {
    label: "Terms & Conditions published",
    description: "Clear usage terms, disclaimers of liability, and intellectual property notices.",
    status: "done",
    evidence: { label: "View terms", href: "/terms", internal: true },
  },
  {
    label: "Medical / financial disclaimer",
    description: "Health calculators include a disclaimer that results are educational, not medical advice.",
    status: "done",
    evidence: { label: "View disclaimer", href: "/disclaimer", internal: true },
  },
  {
    label: "Working contact channel",
    description: "Verified email contact@genalphatools.in plus a contact form on /contact.",
    status: "done",
    evidence: { label: "Contact page", href: "/contact", internal: true },
  },
  {
    label: "About page with publisher info",
    description: "Identifies the editorial team, mission, and content review process.",
    status: "done",
    evidence: { label: "About us", href: "/about", internal: true },
  },
  {
    label: "Custom top-level domain",
    description: "Site served from genalphatools.in (not a free subdomain) — preferred by AdSense reviewers.",
    status: "done",
    evidence: { label: "Open site", href: "https://genalphatools.in" },
  },
  {
    label: "Mobile-friendly responsive design",
    description: "All pages tested across breakpoints from 320px to 1920px with semantic HTML.",
    status: "done",
  },
  {
    label: "HTTPS enabled site-wide",
    description: "Valid TLS certificate, no mixed content warnings, secure form submissions.",
    status: "done",
  },
  {
    label: "Sitemap & robots.txt",
    description: "92 URLs in sitemap.xml, robots.txt allows crawling and references the sitemap.",
    status: "done",
    evidence: { label: "View sitemap", href: "/sitemap.xml" },
  },
  {
    label: "No prohibited content",
    description: "No adult, violent, hateful, copyright-infringing, or get-rich-quick content anywhere on the site.",
    status: "done",
  },
  {
    label: "Internal linking & navigation",
    description: "Header navigation, breadcrumbs, related blog posts, and category hub pages on every tool.",
    status: "done",
  },
  {
    label: "AdSense site verification",
    description:
      "Publisher ID ca-pub-1433261757916600 verified via the google-adsense-account meta tag in <head>.",
    status: "done",
  },
  {
    label: "ads.txt published at /ads.txt",
    description: "google.com, pub-1433261757916600, DIRECT, f08c47fec0942fa0",
    status: "done",
    evidence: { label: "View ads.txt", href: "/ads.txt" },
  },
  {
    label: "GDPR / consent banner",
    description:
      "First-visit cookie banner with Accept all, Reject non-essential, and granular Customise controls. Analytics and AdSense scripts only load after explicit consent.",
    status: "done",
  },
];

const completed = checklist.filter((c) => c.status === "done").length;
const progress = Math.round((completed / checklist.length) * 100);

const AdSenseReadiness = () => {
  return (
    <>
      <SEOHead
        title="AdSense Readiness Checklist | GenAlpha Tools"
        description="Transparent overview of how GenAlpha Tools meets Google AdSense program policies: original content, privacy, disclaimers, navigation, and verification status."
        canonical="https://genalphatools.in/adsense-readiness"
      />
      <SiteHeader />
      <main className="container py-8">
        <Breadcrumbs items={[{ label: "AdSense Readiness" }]} />

        <header className="max-w-3xl mb-10">
          <Badge variant="secondary" className="mb-3">
            <ShieldCheck size={14} className="mr-1" /> Policy compliance
          </Badge>
          <h1 className="text-3xl md:text-4xl font-heading font-bold mb-3">
            Google AdSense Readiness &amp; Policy Checklist
          </h1>
          <p className="text-muted-foreground">
            This page documents how GenAlpha Tools meets the{" "}
            <a
              href="https://support.google.com/adsense/answer/48182"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-foreground inline-flex items-center gap-1"
            >
              Google AdSense Program Policies <ExternalLink size={12} />
            </a>
            . It is published transparently for reviewers, advertisers, and visitors who want to confirm our content
            quality, privacy practices, and verification status before any ad units are served.
          </p>
        </header>

        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <CardTitle>Overall readiness</CardTitle>
                <CardDescription>
                  {completed} of {checklist.length} requirements satisfied
                </CardDescription>
              </div>
              <span className="text-2xl font-heading font-bold">{progress}%</span>
            </div>
          </CardHeader>
          <CardContent>
            <Progress value={progress} aria-label={`${progress} percent complete`} />
            <p className="text-xs text-muted-foreground mt-3">
              All checklist items are now <span className="font-medium">Connected</span>. Publisher verification (
              <code className="text-[10px] bg-muted px-1 rounded">ca-pub-1433261757916600</code>) is live via
              <code className="text-[10px] bg-muted px-1 rounded ml-1">/ads.txt</code> and the meta tag in <code className="text-[10px] bg-muted px-1 rounded">&lt;head&gt;</code>.
            </p>
          </CardContent>
        </Card>

        <section aria-labelledby="checklist-heading" className="mb-12">
          <h2 id="checklist-heading" className="text-2xl font-heading font-semibold mb-4">
            Compliance checklist
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {checklist.map((item) => (
              <Card key={item.label} className={item.status === "pending" ? "border-dashed" : ""}>
                <CardContent className="p-5">
                  <div className="flex items-start gap-3">
                    {item.status === "done" ? (
                      <CheckCircle2 className="text-primary shrink-0 mt-0.5" size={20} />
                    ) : (
                      <Circle className="text-muted-foreground shrink-0 mt-0.5" size={20} />
                    )}
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-2 mb-1 flex-wrap">
                        <h3 className="font-heading font-semibold text-sm">{item.label}</h3>
                        <Badge variant={item.status === "done" ? "default" : "outline"} className="text-[10px]">
                          {item.status === "done" ? "Connected" : "Pending"}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                      {item.evidence &&
                        (item.evidence.internal ? (
                          <Link
                            to={item.evidence.href}
                            className="inline-flex items-center gap-1 text-xs text-primary hover:underline mt-2"
                          >
                            {item.evidence.label} →
                          </Link>
                        ) : (
                          <a
                            href={item.evidence.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs text-primary hover:underline mt-2"
                          >
                            {item.evidence.label} <ExternalLink size={11} />
                          </a>
                        ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section aria-labelledby="verification-heading" className="mb-12">
          <h2 id="verification-heading" className="text-2xl font-heading font-semibold mb-4">
            Site verification placeholders
          </h2>
          <Card>
            <CardContent className="p-6 space-y-4">
              <p className="text-sm text-muted-foreground">
                Verification artefacts for publisher ID{" "}
                <code className="text-xs bg-muted px-1.5 py-0.5 rounded">ca-pub-1433261757916600</code>. The auto-ads
                script is loaded only after the visitor grants advertising consent in the cookie banner — fully
                compliant with the “Google-served ads on screens without publisher-content” policy and ePrivacy/GDPR.
              </p>

              <div>
                <h3 className="font-heading font-semibold text-sm mb-2">1. Meta verification tag (live)</h3>
                <pre className="bg-muted rounded-md p-3 text-xs overflow-x-auto">
{`<meta name="google-adsense-account" content="ca-pub-1433261757916600" />`}
                </pre>
              </div>

              <div>
                <h3 className="font-heading font-semibold text-sm mb-2">2. ads.txt (live at /ads.txt)</h3>
                <pre className="bg-muted rounded-md p-3 text-xs overflow-x-auto">
{`google.com, pub-1433261757916600, DIRECT, f08c47fec0942fa0`}
                </pre>
              </div>

              <div>
                <h3 className="font-heading font-semibold text-sm mb-2">3. Auto-ads script (consent-gated)</h3>
                <pre className="bg-muted rounded-md p-3 text-xs overflow-x-auto">
{`// Loaded by src/lib/consent.ts only after the visitor accepts ads
<script async
  src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1433261757916600"
  crossorigin="anonymous"></script>`}
                </pre>
              </div>
            </CardContent>
          </Card>
        </section>

        <section aria-labelledby="content-policy-heading" className="mb-12">
          <h2 id="content-policy-heading" className="text-2xl font-heading font-semibold mb-4">
            How we honour AdSense content policies
          </h2>
          <div className="prose prose-sm max-w-none text-muted-foreground space-y-3">
            <p>
              <strong className="text-foreground">Substantial content per page.</strong> Every calculator page ships
              with the formula explanation, a worked example, step-by-step usage guide, and an FAQ block — typically
              500–800 words of editorial content surrounding the tool itself. Result screens render full sentences and
              guidance, never just a number.
            </p>
            <p>
              <strong className="text-foreground">User safety.</strong> Health calculators carry a visible disclaimer
              that outputs are informational and do not replace professional medical advice. Numerology tools are
              labelled as entertainment / personal reflection content.
            </p>
            <p>
              <strong className="text-foreground">Privacy &amp; data.</strong> All calculations happen in the browser.
              We do not collect, sell, or transmit personal information. Cookie usage and any future ad personalisation
              are documented in the{" "}
              <Link to="/privacy-policy" className="text-primary hover:underline">
                Privacy Policy
              </Link>
              .
            </p>
            <p>
              <strong className="text-foreground">No prohibited topics.</strong> The site contains no adult, violent,
              hateful, illegal, dangerous, or misleading content. All editorial articles are written in-house and
              checked for originality.
            </p>
          </div>
        </section>

        <div className="flex flex-wrap gap-3">
          <Button asChild>
            <Link to="/">Back to home</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/contact">Report a policy concern</Link>
          </Button>
        </div>
      </main>
      <SiteFooter />
    </>
  );
};

export default AdSenseReadiness;
