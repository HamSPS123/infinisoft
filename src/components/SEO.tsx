import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  canonicalUrl?: string;
}

const SEO = ({
  title = 'InfiniSoft - Infinisoft Solutions Sole Company Limited',
  description = 'Infinisoft Solutions Sole Company Limited - Innovative IT Equipment and Network Solutions Provider',
  keywords = 'software, technology, innovation, solutions, IT equipment, network solutions',
  ogTitle = '',
  ogDescription = '',
  ogImage = '/images/logo.png',
  ogUrl = '',
  twitterTitle = '',
  twitterDescription = '',
  twitterImage = '',
  canonicalUrl = '',
}: SEOProps) => {
  // Use provided values or fall back to defaults
  const metaTitle = title;
  const metaDescription = description;
  const metaOgTitle = ogTitle || title;
  const metaOgDescription = ogDescription || description;
  const metaTwitterTitle = twitterTitle || ogTitle || title;
  const metaTwitterDescription = twitterDescription || ogDescription || description;
  const metaTwitterImage = twitterImage || ogImage;
  
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={keywords} />
      
      {/* Canonical URL */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={metaOgTitle} />
      <meta property="og:description" content={metaOgDescription} />
      <meta property="og:type" content="website" />
      {ogImage && <meta property="og:image" content={ogImage} />}
      {ogUrl && <meta property="og:url" content={ogUrl} />}
      
      {/* Twitter Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metaTwitterTitle} />
      <meta name="twitter:description" content={metaTwitterDescription} />
      {metaTwitterImage && <meta name="twitter:image" content={metaTwitterImage} />}
    </Helmet>
  );
};

export default SEO;
