import SEOHead from "@/components/SEOHead";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Mail, Clock, Briefcase } from "lucide-react";

const Contact = () => (
  <>
    <SEOHead
      title="Contact Us | GenAlpha Tools"
      description="Get in touch with the GenAlpha Tools team. Email us for feedback, bug reports, tool suggestions, business inquiries, or partnership opportunities."
    />
    <SiteHeader />
    <main className="container py-8 max-w-3xl">
      <Breadcrumbs items={[{ label: "Contact Us" }]} />
      <h1 className="font-heading font-bold text-2xl md:text-3xl mb-4">Contact Us</h1>
      <div className="text-muted-foreground space-y-5 text-sm leading-relaxed">
        <p>
          We'd love to hear from you. Whether it's feedback, a bug report, a request for a new calculator, or a business
          inquiry — reach out anytime. Our small team reads every message personally.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-card border border-border rounded-xl p-5">
            <Mail size={18} className="text-primary mb-2" />
            <h2 className="font-heading font-semibold text-foreground text-sm mb-1">Email</h2>
            <a href="mailto:contact@genalphatools.in" className="text-primary underline text-sm">
              contact@genalphatools.in
            </a>
          </div>
          <div className="bg-card border border-border rounded-xl p-5">
            <Clock size={18} className="text-primary mb-2" />
            <h2 className="font-heading font-semibold text-foreground text-sm mb-1">Response Time</h2>
            <p className="text-sm">Within 24–48 hours on weekdays</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-5">
            <Briefcase size={18} className="text-primary mb-2" />
            <h2 className="font-heading font-semibold text-foreground text-sm mb-1">Business</h2>
            <p className="text-sm">Use subject line "Business Inquiry"</p>
          </div>
        </div>

        <h2 className="font-heading font-bold text-lg text-foreground mt-6">What to Include</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <strong>Feedback or bug reports:</strong> the URL of the page, the calculator name, and a brief description
            of what went wrong
          </li>
          <li>
            <strong>Tool suggestions:</strong> the calculator you'd like us to build and how it would help you
          </li>
          <li>
            <strong>Article suggestions:</strong> the topic, target audience, and any sources we should cite
          </li>
          <li>
            <strong>Business inquiries:</strong> partnership type, your company, and what you're proposing
          </li>
        </ul>

        <h2 className="font-heading font-bold text-lg text-foreground mt-6">Privacy</h2>
        <p>
          Any information you share via email is used solely to respond to your message. We do not add you to any
          newsletter or share your details with third parties. Read more in our{" "}
          <a href="/privacy-policy" className="text-primary underline">
            Privacy Policy
          </a>
          .
        </p>

        <h2 className="font-heading font-bold text-lg text-foreground mt-6">Office</h2>
        <p>
          GenAlpha Tools operates as a fully remote editorial team. We don't have a public office address, but you can
          always reach us by email — that's the fastest way to get a reply.
        </p>
      </div>
    </main>
    <SiteFooter />
  </>
);

export default Contact;
