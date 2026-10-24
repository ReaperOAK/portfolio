import type { MetadataRoute } from 'next'
import { loadProjects } from '@/lib/content/load'
import { SITE } from './robots'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await loadProjects()
  return [
    { url: SITE, priority: 1 },
    { url: `${SITE}/hire`, priority: 0.9 },
    { url: `${SITE}/soul`, priority: 0.7 },
    ...projects.map(p => ({ url: `${SITE}/work/${p.slug}`, priority: 0.5 })),
  ]
}
