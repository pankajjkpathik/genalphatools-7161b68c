import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

interface Crumb {
  label: string;
  href?: string;
}

const Breadcrumbs = ({ items }: { items: Crumb[] }) => (
  <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground mb-4 flex items-center gap-1 flex-wrap">
    <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
    {items.map((item, i) => (
      <span key={i} className="flex items-center gap-1">
        <ChevronRight size={12} />
        {item.href ? (
          <Link to={item.href} className="hover:text-foreground transition-colors">{item.label}</Link>
        ) : (
          <span className="text-foreground">{item.label}</span>
        )}
      </span>
    ))}
  </nav>
);

export default Breadcrumbs;
