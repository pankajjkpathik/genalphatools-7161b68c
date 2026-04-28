/**
 * Auto-generates public/sitemap.xml from source data files.
 * Runs automatically before every Vite build, and can also be run manually:
 *   npx tsx scripts/generate-sitemap.ts
 *
 * Adding a new tool / variation / blog post to the data files is enough —
 * the sitemap will pick it up on the next build.
 */
import { writeFileSync, readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DOMAIN = "https://genalphatools.in";

const root = resolve(__dirname, "..");

/** Extract every `slug: "..."` literal from a TypeScript data file. */
function extractSlugs(relativePath: string): string[] {
  const file = readFileSync(resolve(root, relativePath), "utf-8");
  const matches = file.matchAll(/slug:\s*"([a-z0-9-]+)"/g);
  return Array.from(matches, (m) => m[1]);
}

const staticPages = [
  "/",
  "/numerology-tools",
  "/health-calculators",
  "/statistics-tools",
  "/business-tools",
  "/blog",
  "/blog/category/health",
  "/blog/category/numerology",
  "/blog/category/guide",
  "/about",
  "/contact",
  "/privacy-policy",
  "/disclaimer",
  "/terms",
  "/adsense-readiness",
];

const toolSlugs = extractSlugs("src/data/tools.ts");
const variationSlugs = extractSlugs("src/data/seo-variations.ts");
const blogSlugs = extractSlugs("src/data/blog-posts.ts");

const today = new Date().toISOString().split("T")[0];

const urls = [
  ...staticPages.map((p) => ({
    loc: `${DOMAIN}${p}`,
    priority: p === "/" ? "1.0" : "0.8",
    changefreq: "weekly",
  })),
  ...toolSlugs.map((s) => ({
    loc: `${DOMAIN}/tool/${s}`,
    priority: "0.9",
    changefreq: "monthly",
  })),
  ...variationSlugs.map((s) => ({
    loc: `${DOMAIN}/tool/${s}`,
    priority: "0.7",
    changefreq: "monthly",
  })),
  ...blogSlugs.map((s) => ({
    loc: `${DOMAIN}/blog/${s}`,
    priority: "0.7",
    changefreq: "monthly",
  })),
];

// De-duplicate by loc (variation slugs may overlap with tool slugs in edge cases)
const seen = new Set<string>();
const uniqueUrls = urls.filter((u) => (seen.has(u.loc) ? false : (seen.add(u.loc), true)));

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${uniqueUrls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>`;

const outPath = resolve(root, "public/sitemap.xml");
writeFileSync(outPath, xml, "utf-8");
console.log(
  `✅ Sitemap generated: ${uniqueUrls.length} URLs ` +
    `(${staticPages.length} static, ${toolSlugs.length} tools, ${variationSlugs.length} variations, ${blogSlugs.length} blog posts)`,
);

export {};
