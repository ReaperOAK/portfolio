import { Helmet } from 'react-helmet-async';

export const useSEO = ({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
  author = 'Owais Khan'
}) => {
  const siteTitle = 'Owais Khan - Full Stack Developer & Creative Technologist';
  const siteDescription = 'Portfolio of Owais Khan - MERN Stack Developer, UI/UX Enthusiast, and Digital Creative. Crafting exceptional web experiences with React, Node.js, and modern technologies.';
  const siteUrl = 'https://owais.dev'; // Update with actual domain
  const defaultImage = `${siteUrl}/og-image.png`; // Create this image

  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const metaDescription = description || siteDescription;
  const metaImage = image || defaultImage;
  const metaUrl = url || siteUrl;

  return {
    title: fullTitle,
    description: metaDescription,
    image: metaImage,
    url: metaUrl,
    keywords,
    type,
    author
  };
};

// SEO Component to be used in pages
export const SEOHead = ({ config }) => {
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{config.title}</title>
      <meta name="description" content={config.description} />
      <meta name="author" content={config.author} />
      {config.keywords && <meta name="keywords" content={config.keywords} />}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={config.type} />
      <meta property="og:title" content={config.title} />
      <meta property="og:description" content={config.description} />
      <meta property="og:image" content={config.image} />
      <meta property="og:url" content={config.url} />
      <meta property="og:site_name" content="Owais Khan Portfolio" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={config.title} />
      <meta name="twitter:description" content={config.description} />
      <meta name="twitter:image" content={config.image} />
      <meta name="twitter:creator" content="@owais_dev" />
      
      {/* Additional Meta */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="theme-color" content="#7C3AED" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={config.url} />
    </Helmet>
  );
};

// Pre-defined SEO configurations for different pages
export const seoConfigs = {
  home: {
    title: 'Home',
    description: 'Welcome to Owais Khan\'s portfolio - Full Stack Developer specializing in MERN stack, creative web solutions, and exceptional user experiences.',
    keywords: 'Owais Khan, Full Stack Developer, MERN Stack, React, Node.js, Portfolio, Web Developer, JavaScript, TypeScript'
  },
  about: {
    title: 'About Me',
    description: 'Learn about Owais Khan - Full Stack Developer, creative technologist, and passionate problem solver with expertise in modern web technologies.',
    keywords: 'About Owais Khan, Full Stack Developer Bio, MERN Developer, Web Development Experience'
  },
  projects: {
    title: 'Projects',
    description: 'Explore Owais Khan\'s portfolio of web applications, creative projects, and technical solutions built with React, Node.js, and modern technologies.',
    keywords: 'Owais Khan Projects, Web Development Portfolio, React Projects, Node.js Applications, Full Stack Projects'
  },
  contact: {
    title: 'Contact',
    description: 'Get in touch with Owais Khan for web development projects, collaborations, or opportunities. Let\'s build something amazing together.',
    keywords: 'Contact Owais Khan, Hire Full Stack Developer, Web Development Services, React Developer Contact'
  }
};
