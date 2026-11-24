import type { MetadataRoute } from 'next'
import { loadProjects } from '@/lib/content/load'
import { SITE } from './robots'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await loadProjects()
  const now = new Date()

  return [
    {
      url: SITE,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${SITE}/hire`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE}/soul`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE}/feed.xml`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...projects.map(p => ({
      url: `${SITE}/work/${p.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ]
}
