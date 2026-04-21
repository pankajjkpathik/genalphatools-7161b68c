import SEOHead from "@/components/SEOHead";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Breadcrumbs from "@/components/Breadcrumbs";

const About = () => (
  <>
    <SEOHead
      title="About Us | GenAlpha Tools – Free Calculators & Numerology"
      description="Learn about GenAlpha Tools – your trusted source for free online numerology and health calculators. Our mission, methodology, editorial team, and what makes us different."
    />
    <SiteHeader />
    <main className="container py-8 max-w-3xl">
      <Breadcrumbs items={[{ label: "About Us" }]} />
      <h1 className="font-heading font-bold text-2xl md:text-3xl mb-4">About GenAlpha Tools</h1>
      <div className="text-muted-foreground space-y-4 text-sm leading-relaxed">
        <p>GenAlpha Tools is a free, independent online platform offering professionally built calculators across two carefully chosen domains: <strong>Numerology</strong> and <strong>Health &amp; Wellness</strong>. Our mission is to give every user — anywhere in India and around the world — instant, accurate, and easy-to-understand answers to the questions they ask most about their bodies and their numerological charts.</p>

        <p>We started GenAlpha Tools in 2025 after noticing how fragmented the calculator landscape was online. Health calculators lived on heavy hospital sites loaded with ads. Numerology tools were hidden inside cluttered astrology portals demanding sign-ups. We thought there should be a single, fast, mobile-friendly home for both — built with care, written in plain English, and free of marketing tricks.</p>

        <h2 className="font-heading font-bold text-lg text-foreground mt-6">Our Methodology</h2>
        <p>Every health calculator on GenAlpha Tools is built around clinically validated formulas adopted by leading global health authorities — the World Health Organization (WHO), the Indian Council of Medical Research (ICMR), and the American Council on Sports Medicine. Specifically, we use:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Mifflin-St Jeor (1990) for Basal Metabolic Rate</li>
          <li>WHO &amp; ICMR cut-offs for BMI classification</li>
          <li>Harris-Benedict revised equation for Total Daily Energy Expenditure</li>
          <li>Devine formula for Ideal Body Weight</li>
          <li>U.S. Navy method for Body Fat Percentage</li>
          <li>Naegele's rule for Pregnancy Due Date</li>
        </ul>
        <p>Numerology calculators use the Pythagorean letter-to-number system (A=1 through I=9, then repeating), which is the most widely accepted method globally and is the backbone of modern Indian numerology practice.</p>

        <h2 className="font-heading font-bold text-lg text-foreground mt-6">Editorial Team</h2>
        <p>Our content is created and reviewed by a small editorial team passionate about explaining technical topics simply. Articles are fact-checked against published medical sources and traditional numerology references. We do not employ AI to generate final published content; AI may be used as a drafting aid, but every article is rewritten and reviewed by a human editor.</p>

        <h2 className="font-heading font-bold text-lg text-foreground mt-6">Why Trust Us?</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>All calculations use established, well-documented formulas</li>
          <li>Tools are tested for accuracy and reliability before launch</li>
          <li>No personal data is stored — every calculation runs inside your browser</li>
          <li>No sign-up, no paywalls, no spam — ever</li>
          <li>Mobile-optimised for use on Indian networks (Jio, Airtel, Vi) including 3G</li>
          <li>Clear separation between educational content and any future advertising</li>
        </ul>

        <h2 className="font-heading font-bold text-lg text-foreground mt-6">What We Don't Do</h2>
        <p>We don't claim to replace your doctor, astrologer, or financial advisor. Our health tools are for education and self-monitoring; our numerology tools are for entertainment and self-reflection. For medical decisions, always consult a qualified healthcare provider; for major life decisions, supplement numerology with sound judgement and professional guidance.</p>

        <h2 className="font-heading font-bold text-lg text-foreground mt-6">Our Vision</h2>
        <p>To become the most trusted and comprehensive free tools platform for numerology enthusiasts and health-conscious individuals worldwide — with content quality you'd expect from a paid app, delivered free, forever.</p>

        <h2 className="font-heading font-bold text-lg text-foreground mt-6">Get in Touch</h2>
        <p>We love hearing from our users. Whether you spotted a bug, want a new calculator added, or have feedback on an article, please write to us at <a href="mailto:contact@genalphatools.com" className="text-primary underline">contact@genalphatools.com</a> or visit our <a href="/contact" className="text-primary underline">Contact page</a>.</p>
      </div>
    </main>
    <SiteFooter />
  </>
);

export default About;
