/**
 * Post-build prerender step.
 *
 * Reads dist/index.html (the SPA shell), then for every known route
 * writes dist/<route>/index.html with the route-specific <title>,
 * meta description, canonical, OG tags, and JSON-LD baked into the
 * raw HTML. The <body> is unchanged — React still hydrates on the
 * client. This makes Google Search Console's "Live Test" and any
 * non-JS crawler see the correct per-page metadata immediately.
 *
 * Run automatically after `vite build`. Can also be run manually:
 *   npx tsx scripts/prerender.ts
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { resolve, dirname, join } from "path";
import { fileURLToPath, pathToFileURL } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const root = resolve(__dirname, "..");
const dist = resolve(root, "dist");

const SITE_URL = "https://genalphatools.in";
const OG_IMAGE = `${SITE_URL}/og-image.png`;

if (!existsSync(dist)) {
  console.warn("⚠️  dist/ not found — skipping prerender. Run `vite build` first.");
  process.exit(0);
}

const shellHtml = readFileSync(resolve(dist, "index.html"), "utf-8");

// ── Load data files via dynamic import (tsx supports TS) ─────────
const toolsMod = await import(pathToFileURL(resolve(root, "src/data/tools.ts")).href);
const blogMod = await import(pathToFileURL(resolve(root, "src/data/blog-posts.ts")).href);

const tools: Array<{
  slug: string;
  name: string;
  metaTitle: string;
  metaDescription: string;
  category: string;
  howToUse: string[];
  faqs: { question: string; answer: string }[];
}> = toolsMod.tools;

const CATEGORY_META: Record<string, { path: string; label: string }> =
  Object.fromEntries(
    Object.entries(toolsMod.CATEGORY_META as Record<string, { path: string; label: string }>).map(
      ([k, v]) => [k, { path: v.path, label: v.label }],
    ),
  );

const variations: Array<{
  slug: string;
  baseToolSlug: string;
  name: string;
  metaTitle: string;
  metaDescription: string;
  faqs: { question: string; answer: string }[];
}> = [];

const blogPosts: Array<{
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
}> = blogMod.blogPosts;

// ── Schema builders (mirror SEOHead.tsx exactly) ──────────────────
const ORG_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "genalphatools.in",
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.png`,
  email: "contact@genalphatools.in",
};

const WEBSITE_JSONLD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "genalphatools.in",
  url: SITE_URL,
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_URL}/?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

function faqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

function howToJsonLd(name: string, steps: string[]) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `How to Use ${name}`,
    step: steps.map((text, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      text,
    })),
  };
}

function breadcrumbJsonLd(items: { name: string; item?: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      ...(it.item ? { item: it.item } : {}),
    })),
  };
}

// ── HTML rewriter ─────────────────────────────────────────────────
function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildHtml(opts: {
  path: string;
  title: string;
  description: string;
  canonical?: string;
  jsonLd?: Record<string, unknown>[];
}) {
  const canonical = opts.canonical ?? `${SITE_URL}${opts.path}`;
  const allJsonLd = [ORG_JSONLD, WEBSITE_JSONLD, ...(opts.jsonLd ?? [])];
  const t = escapeHtml(opts.title);
  const d = escapeHtml(opts.description);

  let html = shellHtml;

  // Replace <title>
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${t}</title>`);

  // Replace meta description
  html = html.replace(
    /<meta\s+name=["']description["'][^>]*>/i,
    `<meta name="description" content="${d}">`,
  );

  // Replace canonical
  html = html.replace(
    /<link\s+rel=["']canonical["'][^>]*>/i,
    `<link rel="canonical" href="${canonical}">`,
  );

  // Replace OG/Twitter title & description & url
  html = html.replace(
    /<meta\s+property=["']og:title["'][^>]*>/i,
    `<meta property="og:title" content="${t}">`,
  );
  html = html.replace(
    /<meta\s+name=["']twitter:title["'][^>]*>/i,
    `<meta name="twitter:title" content="${t}">`,
  );
  html = html.replace(
    /<meta\s+property=["']og:description["'][^>]*>/i,
    `<meta property="og:description" content="${d}">`,
  );
  html = html.replace(
    /<meta\s+name=["']twitter:description["'][^>]*>/i,
    `<meta name="twitter:description" content="${d}">`,
  );
  html = html.replace(
    /<meta\s+property=["']og:url["'][^>]*>/i,
    `<meta property="og:url" content="${canonical}">`,
  );
  html = html.replace(
    /<meta\s+property=["']og:image["'][^>]*>/i,
    `<meta property="og:image" content="${OG_IMAGE}">`,
  );
  html = html.replace(
    /<meta\s+name=["']twitter:image["'][^>]*>/i,
    `<meta name="twitter:image" content="${OG_IMAGE}">`,
  );

  // Inject robots + JSON-LD just before </head>
  const robots = `<meta name="robots" content="index, follow">`;
  const jsonLdTags = allJsonLd
    .map(
      (j) =>
        `<script type="application/ld+json">${JSON.stringify(j).replace(
          /</g,
          "\\u003c",
        )}</script>`,
    )
    .join("\n    ");

  html = html.replace(
    /<\/head>/i,
    `    ${robots}\n    ${jsonLdTags}\n  </head>`,
  );

  return html;
}

function writePage(routePath: string, html: string) {
  // routePath always starts with "/"
  const cleaned = routePath === "/" ? "" : routePath.replace(/^\//, "");
  const dir = cleaned ? join(dist, cleaned) : dist;
  mkdirSync(dir, { recursive: true });
  const outFile = join(dir, "index.html");
  writeFileSync(outFile, html, "utf-8");
}

// ── Static pages ──────────────────────────────────────────────────
const staticPages: Array<{
  path: string;
  title: string;
  description: string;
}> = [
  {
    path: "/",
    title: "Free Calculators for US Marketers, Founders & Analysts | GenAlpha Tools",
    description:
      "50+ free online calculators: ROI, CAC, LTV, mortgage, NPV, IRR, statistics, A/B testing, SaaS metrics, data utilities. Built for US professionals.",
  },
  ...Object.values(toolsMod.CATEGORY_META as Record<string, { path: string; label: string; tagline: string }>).map(
    (m) => ({
      path: m.path,
      title: `Free ${m.label} Calculators Online | GenAlpha Tools`,
      description: m.tagline,
    }),
  ),
  {
    path: "/blog",
    title: "Blog – Marketing, Finance & Data Guides | GenAlpha Tools",
    description:
      "In-depth guides on marketing analytics, finance, statistics, A/B testing, and SaaS metrics. Practical articles paired with free calculators.",
  },
  {
    path: "/about",
    title: "About Us | GenAlpha Tools – Free Calculators & Numerology",
    description:
      "Learn about GenAlpha Tools – your trusted source for free online numerology and health calculators. Our mission, methodology, editorial team, and what makes us different.",
  },
  {
    path: "/contact",
    title: "Contact Us | GenAlpha Tools",
    description:
      "Get in touch with the GenAlpha Tools team. Email us for feedback, bug reports, tool suggestions, business inquiries, or partnership opportunities.",
  },
  {
    path: "/privacy-policy",
    title: "Privacy Policy | GenAlpha Tools",
    description:
      "Privacy policy for GenAlpha Tools. Learn how we handle your data and protect your privacy.",
  },
  {
    path: "/disclaimer",
    title: "Disclaimer | GenAlpha Tools",
    description:
      "Important disclaimer for GenAlpha Tools regarding health and numerology content.",
  },
  {
    path: "/terms",
    title: "Terms & Conditions | GenAlpha Tools",
    description:
      "Read the Terms & Conditions for using GenAlpha Tools — free online numerology and health calculators. Learn about acceptable use, intellectual property, and disclaimers.",
  },
  {
    path: "/adsense-readiness",
    title: "AdSense Readiness Checklist | GenAlpha Tools",
    description:
      "Transparent overview of how GenAlpha Tools meets Google AdSense program policies: original content, privacy, disclaimers, navigation, and verification status.",
  },
  {
    path: "/blog/category/marketing",
    title: "Business & Marketing Articles | GenAlpha Tools Blog",
    description: "Practical guides on ROI, CAC, LTV, conversion and growth math from the GenAlpha Tools blog.",
  },
  {
    path: "/blog/category/finance",
    title: "Finance & SaaS Metrics Articles | GenAlpha Tools Blog",
    description: "Compound interest, break-even, MRR/ARR/churn and more — explained for founders and operators.",
  },
  {
    path: "/blog/category/data",
    title: "Data & Statistics Articles | GenAlpha Tools Blog",
    description: "A/B testing, statistical significance, and core data concepts for analysts and PMs.",
  },
  {
    path: "/blog/category/guide",
    title: "How-To Guides | GenAlpha Tools Blog",
    description: "Hands-on walkthroughs for our utilities and calculators.",
  },
];

let count = 0;

for (const p of staticPages) {
  writePage(
    p.path,
    buildHtml({
      path: p.path,
      title: p.title,
      description: p.description,
    }),
  );
  count++;
}

// ── Tool pages ────────────────────────────────────────────────────
for (const tool of tools) {
  const meta = CATEGORY_META[tool.category];
  const categoryPath = meta.path;
  const categoryLabel = meta.label;
  const path = `/tool/${tool.slug}`;
  const jsonLd = [
    faqJsonLd(tool.faqs),
    howToJsonLd(tool.name, tool.howToUse),
    breadcrumbJsonLd([
      { name: "Home", item: `${SITE_URL}/` },
      { name: categoryLabel, item: `${SITE_URL}${categoryPath}` },
      { name: tool.name },
    ]),
  ];
  writePage(
    path,
    buildHtml({
      path,
      title: tool.metaTitle,
      description: tool.metaDescription,
      jsonLd,
    }),
  );
  count++;
}

// ── Variation pages ───────────────────────────────────────────────
const toolBySlug = new Map(tools.map((t) => [t.slug, t]));
for (const v of variations) {
  const base = toolBySlug.get(v.baseToolSlug);
  if (!base) continue;
  const meta = CATEGORY_META[base.category];
  const categoryPath = meta.path;
  const categoryLabel = meta.label;
  const path = `/tool/${v.slug}`;
  const jsonLd = [
    faqJsonLd(v.faqs),
    howToJsonLd(v.name, base.howToUse),
    breadcrumbJsonLd([
      { name: "Home", item: `${SITE_URL}/` },
      { name: categoryLabel, item: `${SITE_URL}${categoryPath}` },
      { name: base.name, item: `${SITE_URL}/tool/${base.slug}` },
      { name: v.name },
    ]),
  ];
  writePage(
    path,
    buildHtml({
      path,
      title: v.metaTitle,
      description: v.metaDescription,
      jsonLd,
    }),
  );
  count++;
}

// ── Blog post pages ───────────────────────────────────────────────
for (const post of blogPosts) {
  const path = `/blog/${post.slug}`;
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      url: `${SITE_URL}${path}`,
    },
    breadcrumbJsonLd([
      { name: "Home", item: `${SITE_URL}/` },
      { name: "Blog", item: `${SITE_URL}/blog` },
      { name: post.title },
    ]),
  ];
  writePage(
    path,
    buildHtml({
      path,
      title: post.metaTitle,
      description: post.metaDescription,
      jsonLd,
    }),
  );
  count++;
}

console.log(`✅ Prerender complete: ${count} HTML pages written to dist/`);

export {};
