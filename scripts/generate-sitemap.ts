import { writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DOMAIN = "https://genalphatools.com";

const staticPages = [
  "/",
  "/numerology-tools",
  "/health-calculators",
  "/about",
  "/contact",
  "/privacy-policy",
  "/disclaimer",
  "/terms",
  "/blog",
];

const toolSlugs = [
  "name-numerology-calculator",
  "life-path-number-calculator",
  "destiny-number-calculator",
  "mobile-number-numerology",
  "personal-year-number-calculator",
  "vehicle-number-numerology",
  "baby-name-numerology",
  "business-name-numerology",
  "lucky-name-generator",
  "marriage-compatibility-calculator",
  "bmi-calculator",
  "calorie-calculator",
  "bmr-calculator",
  "water-intake-calculator",
  "ideal-weight-calculator",
  "body-fat-calculator",
  "pregnancy-due-date-calculator",
  "ovulation-calculator",
];

const variationSlugs = [
  "bmi-calculator-for-men",
  "bmi-calculator-for-women",
  "bmi-calculator-india",
  "bmi-calculator-by-age",
  "female-bmi-calculator-india",
  "male-bmi-calculator-india",
  "calorie-calculator-for-men",
  "calorie-calculator-for-women",
  "calorie-calculator-india",
  "calorie-calculator-indian-diet",
  "step-calorie-calculator",
  "calorie-deficit-calculator-india",
  "maintenance-calorie-calculator-india",
  "fitness-calorie-calculator-india",
  "ideal-weight-calculator-for-men",
  "ideal-weight-calculator-for-women",
  "ideal-weight-calculator-india",
  "healthy-weight-range-calculator",
  "body-fat-calculator-for-men",
  "body-fat-calculator-for-women",
  "body-fat-calculator-india",
  "fat-loss-calculator-india",
  "water-intake-calculator-india",
  "pregnancy-due-date-calculator-india",
  "pregnancy-week-calculator-india",
  "ovulation-calculator-india",
  "weight-loss-calculator-india",
  "weight-gain-calculator-india",
  "daily-protein-requirement-calculator",
  "tdee-calculator-india",
  "height-weight-ratio-calculator",
  "bmr-calculator-india",
  "name-numerology-for-baby",
  "name-numerology-for-business",
  "name-numerology-hindi",
  "name-numerology-for-success",
  "life-path-number-2025",
  "life-path-number-2026",
  "marriage-compatibility-by-name",
  "marriage-compatibility-by-date-of-birth",
  "love-compatibility-numerology",
  "destiny-number-calculator-india",
  "mobile-numerology-india",
  "lucky-mobile-number-calculator",
  "mobile-number-lucky-or-not",
  "numerology-calculator-by-date-of-birth",
  "lucky-number-finder",
  "personal-year-number-2025",
  "personal-year-number-2026",
  "vehicle-number-numerology-india",
];

const blogSlugs = [
  "how-to-calculate-bmi-correctly",
  "understanding-life-path-numbers",
  "calorie-deficit-guide-india",
  "how-to-choose-lucky-baby-name",
  "mobile-number-numerology-guide",
  "bmr-tdee-explained",
  "pregnancy-due-date-explained",
  "marriage-compatibility-numerology",
  "water-intake-guide",
  "body-fat-percentage-guide",
  "personal-year-number-meaning",
  "vehicle-number-numerology-india",
  "ovulation-tracking-basics",
  "ideal-weight-formulas-compared",
  "destiny-number-vs-life-path",
];

const today = new Date().toISOString().split("T")[0];

const urls = [
  ...staticPages.map((p) => ({ loc: `${DOMAIN}${p}`, priority: p === "/" ? "1.0" : "0.8", changefreq: "weekly" })),
  ...toolSlugs.map((s) => ({ loc: `${DOMAIN}/tool/${s}`, priority: "0.9", changefreq: "monthly" })),
  ...variationSlugs.map((s) => ({ loc: `${DOMAIN}/tool/${s}`, priority: "0.7", changefreq: "monthly" })),
  ...blogSlugs.map((s) => ({ loc: `${DOMAIN}/blog/${s}`, priority: "0.7", changefreq: "monthly" })),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

const outPath = resolve(__dirname, "../public/sitemap.xml");
writeFileSync(outPath, xml, "utf-8");
console.log(`✅ Sitemap generated: ${outPath} (${urls.length} URLs)`);
