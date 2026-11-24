import { loadProjects } from '@/lib/content/load'
import { ColdOpen } from '@/components/ColdOpen'
import { Entry } from '@/components/Entry'
import { Body } from '@/components/hire/Body'
import { defaultUniverseFor } from '@/lib/universe/css'

// The fork is a URL, not a door: / never gates anything. Scroll past the scene and the work is already here.
export default async function Home() {
  const projects = await loadProjects()

  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    'name': 'Featured Software Engineering Projects by Owais Ahmed Khan',
    'description':
      'Comprehensive portfolio inventory of 44 production systems, autonomous agent swarms, and distributed architectures.',
    'numberOfItems': projects.length,
    'itemListElement': projects.map((p, idx) => ({
      '@type': 'ListItem',
      'position': idx + 1,
      'name': p.title,
      'url': `https://portfolio.owaiskhan.website/work/${p.slug}`,
      'description': p.tagline,
    })),
  }

  return (
    <Entry lens="work" universe={defaultUniverseFor('/')}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <main>
        <ColdOpen />
        <Body projects={projects} />
      </main>
    </Entry>
  )
}
