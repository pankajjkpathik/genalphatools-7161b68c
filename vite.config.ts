import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { execSync } from "child_process";

/**
 * Vite plugin: regenerate public/sitemap.xml from source data
 * before each production build, and once when the dev server starts.
 */
const sitemapPlugin = () => {
  const generate = () => {
    try {
      const script = path.resolve(__dirname, "scripts/generate-sitemap.ts");
      execSync(`npx --yes tsx "${script}"`, { stdio: "inherit" });
    } catch (err) {
      console.warn("⚠️  Sitemap generation failed:", (err as Error).message);
    }
  };
  return {
    name: "auto-sitemap",
    apply: undefined,
    buildStart() {
      generate();
    },
    configureServer() {
      generate();
    },
  };
};

/**
 * Vite plugin: after each production build, run scripts/prerender.ts
 * to write static HTML for every route with the correct per-page
 * <title>, meta description, canonical, OG tags, and JSON-LD baked
 * into the raw HTML. Lets Google Live Test see complete metadata.
 */
const prerenderPlugin = () => ({
  name: "auto-prerender",
  apply: "build" as const,
  closeBundle() {
    try {
      const script = path.resolve(__dirname, "scripts/prerender.ts");
      execSync(`npx --yes tsx "${script}"`, { stdio: "inherit" });
    } catch (err) {
      console.warn("⚠️  Prerender failed:", (err as Error).message);
    }
  },
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    sitemapPlugin(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime"],
  },
}));
