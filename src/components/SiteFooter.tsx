import { Link } from "react-router-dom";
import { Mail } from "lucide-react";
import logo from "@/assets/logo.png";

const SiteFooter = () => (
  <footer className="border-t border-border bg-muted/50 mt-16">
    <div className="container py-10">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
        <div className="col-span-2">
          <Link to="/" className="inline-flex items-center mb-3" aria-label="genalphatools.in home">
            <img src={logo} alt="genalphatools.in" width={180} height={50} className="h-9 w-auto" loading="lazy" />
          </Link>
          <p className="text-sm text-muted-foreground mb-3">
            Free online numerology &amp; health calculators built on trusted formulas. Instant results, no sign-up, your
            data never leaves your browser.
          </p>
          <a
            href="mailto:contact@genalphatools.in"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Mail size={14} /> contact@genalphatools.in
          </a>
        </div>
        <div>
          <h4 className="font-heading font-semibold text-sm mb-3">Numerology</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/tool/name-numerology-calculator" className="hover:text-foreground transition-colors">
                Name Numerology
              </Link>
            </li>
            <li>
              <Link to="/tool/life-path-number-calculator" className="hover:text-foreground transition-colors">
                Life Path Number
              </Link>
            </li>
            <li>
              <Link to="/tool/destiny-number-calculator" className="hover:text-foreground transition-colors">
                Destiny Number
              </Link>
            </li>
            <li>
              <Link to="/numerology-tools" className="hover:text-foreground transition-colors">
                All Numerology Tools
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-heading font-semibold text-sm mb-3">Health</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/tool/bmi-calculator" className="hover:text-foreground transition-colors">
                BMI Calculator
              </Link>
            </li>
            <li>
              <Link to="/tool/calorie-calculator" className="hover:text-foreground transition-colors">
                Calorie Calculator
              </Link>
            </li>
            <li>
              <Link to="/tool/bmr-calculator" className="hover:text-foreground transition-colors">
                BMR Calculator
              </Link>
            </li>
            <li>
              <Link to="/health-calculators" className="hover:text-foreground transition-colors">
                All Health Calculators
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-heading font-semibold text-sm mb-3">Company</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/about" className="hover:text-foreground transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/blog" className="hover:text-foreground transition-colors">
                Blog
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-foreground transition-colors">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/privacy-policy" className="hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/disclaimer" className="hover:text-foreground transition-colors">
                Disclaimer
              </Link>
            </li>
            <li>
              <Link to="/terms" className="hover:text-foreground transition-colors">
                Terms &amp; Conditions
              </Link>
            </li>
            <li>
              <Link to="/adsense-readiness" className="hover:text-foreground transition-colors">
                AdSense Readiness
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border mt-8 pt-6 flex flex-col sm:flex-row sm:justify-between gap-2 text-center sm:text-left text-xs text-muted-foreground">
        <p>© {new Date().getFullYear()} GenAlpha Tools. All rights reserved.</p>
        <p>Editorial team: GenAlpha Tools · For educational purposes only.</p>
      </div>
    </div>
  </footer>
);

export default SiteFooter;
