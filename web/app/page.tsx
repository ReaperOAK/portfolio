import { loadProjects } from '@/lib/content/load'
import { ColdOpen } from '@/components/ColdOpen'
import { Entry } from '@/components/Entry'
import { Body } from '@/components/hire/Body'
import { defaultUniverseFor } from '@/lib/universe/css'

// The fork is a URL, not a door: / never gates anything. Scroll past the scene and the work is already here.
export default async function Home() {
  return (
    <Entry lens="work" universe={defaultUniverseFor('/')}>
      <main>
        <ColdOpen />
        <Body projects={await loadProjects()} />
      </main>
    </Entry>
  )
}
