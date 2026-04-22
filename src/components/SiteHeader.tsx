import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.png";

const SiteHeader = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const close = () => setMobileOpen(false);

  return (
    <header className="sticky top-0 z-50 bg-card/90 backdrop-blur-md border-b border-border">
      <div className="container flex items-center justify-between h-16">
        <Link to="/" className="flex items-center" aria-label="genalphatools.in home">
          <img
            src={logo}
            alt="genalphatools.in"
            width={180}
            height={50}
            className="h-9 w-auto md:h-10"
          />
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">Home</Link>
          <Link to="/numerology-tools" className="text-muted-foreground hover:text-foreground transition-colors">Numerology</Link>
          <Link to="/health-calculators" className="text-muted-foreground hover:text-foreground transition-colors">Health</Link>
          <Link to="/blog" className="text-muted-foreground hover:text-foreground transition-colors">Blog</Link>
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
          <Link to="/" onClick={close} className="text-muted-foreground hover:text-foreground">Home</Link>
          <Link to="/numerology-tools" onClick={close} className="text-muted-foreground hover:text-foreground">Numerology Tools</Link>
          <Link to="/health-calculators" onClick={close} className="text-muted-foreground hover:text-foreground">Health Calculators</Link>
          <Link to="/blog" onClick={close} className="text-muted-foreground hover:text-foreground">Blog</Link>
          <Link to="/about" onClick={close} className="text-muted-foreground hover:text-foreground">About</Link>
          <Link to="/contact" onClick={close} className="text-muted-foreground hover:text-foreground">Contact</Link>
        </nav>
      )}
    </header>
  );
};

export default SiteHeader;
