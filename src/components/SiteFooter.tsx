import { Link } from "react-router-dom";

const SiteFooter = () => (
  <footer className="border-t border-border bg-muted/50 mt-16">
    <div className="container py-10">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2 md:col-span-1">
          <h3 className="font-heading font-bold text-lg gradient-text mb-2">GenAlpha Tools</h3>
          <p className="text-sm text-muted-foreground">Free online calculators & numerology tools. Instant results, accurate insights.</p>
        </div>
        <div>
          <h4 className="font-heading font-semibold text-sm mb-3">Numerology</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/tool/name-numerology-calculator" className="hover:text-foreground transition-colors">Name Numerology</Link></li>
            <li><Link to="/tool/life-path-number-calculator" className="hover:text-foreground transition-colors">Life Path Number</Link></li>
            <li><Link to="/tool/destiny-number-calculator" className="hover:text-foreground transition-colors">Destiny Number</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-heading font-semibold text-sm mb-3">Health</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/tool/bmi-calculator" className="hover:text-foreground transition-colors">BMI Calculator</Link></li>
            <li><Link to="/tool/calorie-calculator" className="hover:text-foreground transition-colors">Calorie Calculator</Link></li>
            <li><Link to="/tool/bmr-calculator" className="hover:text-foreground transition-colors">BMR Calculator</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-heading font-semibold text-sm mb-3">Legal</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/privacy-policy" className="hover:text-foreground transition-colors">Privacy Policy</Link></li>
            <li><Link to="/disclaimer" className="hover:text-foreground transition-colors">Disclaimer</Link></li>
            <li><Link to="/contact" className="hover:text-foreground transition-colors">Contact Us</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border mt-8 pt-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} GenAlpha Tools. All rights reserved. For informational purposes only.
      </div>
    </div>
  </footer>
);

export default SiteFooter;
