import { Helmet } from 'react-helmet-async';

interface SEOHelmetProps {
  title: string;
  description: string;
  url?: string;
}

export default function SEOHelmet({ title, description, url }: SEOHelmetProps) {
  return (
    <Helmet>
      <title>애프터밀 | {title}</title>
      <meta name="description" content={description} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:site_name" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content="/after-meal.png" />
      <meta property="og:url" content={'https://aftermeal.online' + url} />

      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content="/after-meal.png" />

      <link rel="canonical" href="https://aftermeal.online" />
    </Helmet>
  );
}
