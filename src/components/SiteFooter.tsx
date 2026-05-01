import { Link } from "react-router-dom";
import { Mail } from "lucide-react";
import { CATEGORY_META } from "@/data/tools";

const SiteFooter = () => (
  <footer className="border-t-2 border-foreground/10 bg-muted/30 mt-16">
    <div className="container py-12">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2">
          <Link to="/" className="inline-flex items-center gap-2 font-heading font-black text-xl mb-3" aria-label="GenAlpha Tools home">
            <span className="bg-foreground text-background px-2 py-0.5">GA</span>
            <span>Tools</span>
          </Link>
          <p className="text-sm text-muted-foreground mb-3 max-w-sm">
            Free online calculators for US marketers, founders, finance teams, and analysts. 50+ tools, no signup, your
            data never leaves your browser.
          </p>
          <a href="mailto:contact@genalphatools.in" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <Mail size={14} /> contact@genalphatools.in
          </a>
        </div>
        <div>
          <h4 className="font-heading font-bold text-sm mb-3 uppercase tracking-wider">Tools</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {Object.entries(CATEGORY_META).slice(0, 6).map(([key, m]) => (
              <li key={key}><Link to={m.path} className="hover:text-foreground">{m.label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-heading font-bold text-sm mb-3 uppercase tracking-wider">Company</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/about" className="hover:text-foreground">About</Link></li>
            <li><Link to="/blog" className="hover:text-foreground">Blog</Link></li>
            <li><Link to="/contact" className="hover:text-foreground">Contact</Link></li>
            <li><Link to="/privacy-policy" className="hover:text-foreground">Privacy Policy</Link></li>
            <li><Link to="/disclaimer" className="hover:text-foreground">Disclaimer</Link></li>
            <li><Link to="/terms" className="hover:text-foreground">Terms</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border mt-8 pt-6 flex flex-col sm:flex-row sm:justify-between gap-2 text-xs text-muted-foreground">
        <p>© {new Date().getFullYear()} GenAlpha Tools. Built for US professionals.</p>
        <p>For educational purposes only.</p>
      </div>
    </div>
  </footer>
);

export default SiteFooter;
