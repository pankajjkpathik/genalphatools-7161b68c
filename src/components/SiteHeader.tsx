import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X, Search } from "lucide-react";

const SiteHeader = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
      <div className="container flex items-center justify-between h-14">
        <Link to="/" className="flex items-center gap-2 font-heading font-bold text-lg">
          <span className="gradient-text">AnkDarppan</span>
          <span className="text-muted-foreground text-sm font-body font-normal hidden sm:inline">Tools</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link to="/numerology-tools" className="text-muted-foreground hover:text-foreground transition-colors">Numerology</Link>
          <Link to="/health-calculators" className="text-muted-foreground hover:text-foreground transition-colors">Health</Link>
          <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">About</Link>
          <Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</Link>
        </nav>
        <button
          className="md:hidden p-2 text-muted-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {mobileOpen && (
        <nav className="md:hidden border-t border-border bg-card px-4 pb-4 pt-2 flex flex-col gap-3 text-sm font-medium animate-fade-in">
          <Link to="/numerology-tools" onClick={() => setMobileOpen(false)} className="text-muted-foreground hover:text-foreground">Numerology Tools</Link>
          <Link to="/health-calculators" onClick={() => setMobileOpen(false)} className="text-muted-foreground hover:text-foreground">Health Calculators</Link>
          <Link to="/about" onClick={() => setMobileOpen(false)} className="text-muted-foreground hover:text-foreground">About</Link>
          <Link to="/contact" onClick={() => setMobileOpen(false)} className="text-muted-foreground hover:text-foreground">Contact</Link>
        </nav>
      )}
    </header>
  );
};

export default SiteHeader;
