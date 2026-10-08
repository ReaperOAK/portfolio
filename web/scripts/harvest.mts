/** One-time port of client/src/data into web/content. Run: node scripts/harvest.mts (Node 24 strips types natively) */
import fs from 'node:fs/promises'
import path from 'node:path'
import matter from 'gray-matter'

const SRC = path.join(process.cwd(), '..', 'client', 'src', 'data')
const OUT = path.join(process.cwd(), 'content', 'projects')

// Held back from the new site: bad look on a hiring page and/or IP-clause risk. Re-add by hand if wanted.
const SKIP = new Set(['hashfame-influent-scraper', 'microsoft-rewards-farmer'])

// Verified public figures only (resume). Never employer metrics.
const METRICS: Record<string, { value: string; label: string }[]> = {
  'today-egg-rates': [{ value: '34.2k+', label: 'clicks' }, { value: '2K+', label: 'monthly users' }],
}

type Src = {
  title: string; slug: string; shortDesc: string; description: string; tech: string[]
  type?: string; status?: string; decisions: string[]; devLogs: string[]; github?: string; live?: string
}

const { default: projects } = (await import(path.join(SRC, 'projects.js'))) as { default: Src[] }
await fs.mkdir(OUT, { recursive: true })

for (const p of projects) {
  if (SKIP.has(p.slug)) continue
  const data = {
    slug: p.slug,
    title: p.title.split(':')[0]!.trim(),
    tagline: p.shortDesc,
    stack: p.tech,
    role: p.type ?? 'Solo',
    period: p.status ?? '',
    metrics: METRICS[p.slug] ?? [],
    decisions: p.decisions,
    devlogs: p.devLogs,
    links: { ...(p.github && { github: p.github }), ...(p.live && { live: p.live }) },
    nda: false,
  }
  await fs.writeFile(path.join(OUT, `${p.slug}.mdx`), matter.stringify(`${p.description}\n`, data))
}
console.log('harvested', (await fs.readdir(OUT)).length, 'projects')
