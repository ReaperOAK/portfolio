import type { Metadata } from 'next'
import { loadProjects } from '@/lib/content/load'
import { Entry } from '@/components/Entry'
import { defaultUniverseFor } from '@/lib/universe/css'
import { Hero } from '@/components/hire/Hero'
import { Body } from '@/components/hire/Body'

export const metadata: Metadata = {
  title: 'Owais Ahmed Khan | Senior Developer & Systems Architect',
  description:
    'Senior Developer & Systems Architect. High-throughput distributed backends, autonomous agent swarms, and adversarial zero-trust sandboxes. 44 shipped production projects.',
  openGraph: { images: ['/media/desk-poster.webp'] },
}

export default async function Hire() {
  return (
    <Entry lens="work" universe={defaultUniverseFor('/hire')}>
      <main>
        <Hero />
        <Body projects={await loadProjects()} />
      </main>
    </Entry>
  )
}
