import type { MetadataRoute } from 'next'

export const SITE = 'https://portfolio.owaiskhan.website'

export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: '*', allow: '/' }, sitemap: `${SITE}/sitemap.xml` }
}
