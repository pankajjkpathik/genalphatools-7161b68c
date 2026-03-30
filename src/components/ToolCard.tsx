import { Link } from "react-router-dom";
import type { ToolData } from "@/data/tools";

const ToolCard = ({ tool }: { tool: ToolData }) => (
  <Link
    to={`/tool/${tool.slug}`}
    className="group bg-card rounded-lg border border-border p-5 hover:shadow-elevated transition-all duration-200 hover:border-primary/30 flex flex-col"
  >
    <span className="text-2xl mb-3">{tool.icon}</span>
    <h3 className="font-heading font-semibold text-base mb-1 group-hover:text-primary transition-colors">{tool.name}</h3>
    <p className="text-sm text-muted-foreground leading-relaxed">{tool.shortDescription}</p>
    <span className="mt-3 text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
      Try Now →
    </span>
  </Link>
);

export default ToolCard;
