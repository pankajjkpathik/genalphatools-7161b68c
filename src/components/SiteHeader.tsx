import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

const navLinks = [
  { to: "/marketing-tools", label: "Marketing" },
  { to: "/finance-tools", label: "Finance" },
  { to: "/statistics-tools", label: "Statistics" },
  { to: "/ab-testing-tools", label: "A/B Testing" },
  { to: "/saas-metrics-tools", label: "SaaS" },
  { to: "/utility-tools", label: "Utilities" },
  { to: "/blog", label: "Blog" },
];

const SiteHeader = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const close = () => setMobileOpen(false);

  return (
    <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b-2 border-foreground/10">
      <div className="container flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2 font-heading font-black text-lg tracking-tight" aria-label="GenAlpha Tools home">
          <span className="bg-foreground text-background px-2 py-0.5">GA</span>
          <span>Tools</span>
        </Link>
        <nav className="hidden lg:flex items-center gap-5 text-sm font-semibold">
          {navLinks.map((l) => (
            <Link key={l.to} to={l.to} className="text-muted-foreground hover:text-foreground transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-1">
          <ThemeToggle />
          <button className="lg:hidden p-2 text-muted-foreground" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      {mobileOpen && (
        <nav className="lg:hidden border-t border-border bg-card px-4 pb-4 pt-2 flex flex-col gap-3 text-sm font-semibold">
          {navLinks.map((l) => (
            <Link key={l.to} to={l.to} onClick={close} className="text-muted-foreground hover:text-foreground">
              {l.label}
            </Link>
          ))}
          <Link to="/about" onClick={close} className="text-muted-foreground hover:text-foreground">About</Link>
          <Link to="/contact" onClick={close} className="text-muted-foreground hover:text-foreground">Contact</Link>
        </nav>
      )}
    </header>
  );
};

export default SiteHeader;
