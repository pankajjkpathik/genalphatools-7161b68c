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
