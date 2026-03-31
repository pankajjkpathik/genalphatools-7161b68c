import { Link } from "react-router-dom";
import type { ToolData } from "@/data/tools";

const ToolCard = ({ tool }: { tool: ToolData }) => (
  <Link
    to={`/tool/${tool.slug}`}
    className="group bg-card rounded-lg border border-border p-5 hover:shadow-elevated transition-all duration-200 hover:border-primary/30 flex flex-col"
  >
    <span className="text-2xl mb-3">{tool.icon}</span>
    <h3 className="font-heading font-semibold text-base mb-1 group-hover:text-primary transition-colors">{tool.name}</h3>
    <p className="text-sm text-muted-foreground leading-relaxed flex-1">{tool.shortDescription}</p>
    <span className="mt-4 inline-flex items-center justify-center w-full py-2 rounded-lg bg-primary/10 text-primary text-sm font-semibold group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
      Calculate Now →
    </span>
  </Link>
);

export default ToolCard;
