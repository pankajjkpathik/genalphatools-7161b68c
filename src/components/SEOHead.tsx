import { Helmet } from "react-helmet-async";

interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

const SITE_URL = "https://genalphatools.in";

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

const SEOHead = ({ title, description, canonical, jsonLd }: SEOHeadProps) => {
  const path = typeof window !== "undefined" ? window.location.pathname : "/";
  const canonicalUrl = canonical ?? `${SITE_URL}${path}`;

  const pageJsonLd = Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : [];
  const allJsonLd = [ORG_JSONLD, WEBSITE_JSONLD, ...pageJsonLd];

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={`${SITE_URL}/og-image.png`} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${SITE_URL}/og-image.png`} />
      <script type="application/ld+json">{JSON.stringify(allJsonLd)}</script>
    </Helmet>
  );
};

export default SEOHead;
