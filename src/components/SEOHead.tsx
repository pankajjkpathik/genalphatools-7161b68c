import { Helmet } from "react-helmet-async";

interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

const SEOHead = ({ title, description, canonical, jsonLd }: SEOHeadProps) => (
  <Helmet>
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta name="robots" content="index, follow" />
    {canonical && <link rel="canonical" href={canonical} />}
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:type" content="website" />
    {jsonLd && (
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    )}
  </Helmet>
);

export default SEOHead;
