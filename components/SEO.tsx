import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

const SEO: React.FC<SEOProps> = ({ 
  title, 
  description, 
  image, 
  url 
}) => {
  const defaultTitle = 'Bluehouse Planning | Architectural Drafting & Design';
  const defaultDescription = 'Professional architectural drafting and design services in Ontario. Specializing in custom homes, renovations, and permit drawings.';
  // Using the absolute R2 URL to ensure social preview images load correctly
  const defaultImage = 'https://pub-698e84d3fce74dc6b4b08c5f5d041da0.r2.dev/hero2.avif';
  const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://bluehouseplanning.ca';

  const finalTitle = title ? `${title} | Bluehouse Planning` : defaultTitle;
  const finalDescription = description || defaultDescription;
  const finalImage = image || defaultImage;
  const finalUrl = url || (typeof window !== 'undefined' ? window.location.href : siteUrl);

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <link rel="canonical" href={finalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={finalUrl} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={finalImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={finalUrl} />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={finalImage} />
    </Helmet>
  );
};

export default SEO;