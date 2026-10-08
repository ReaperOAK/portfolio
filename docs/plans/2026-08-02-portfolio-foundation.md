# Portfolio Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the engine that renders one content model through N aesthetic universes, with audience and aesthetic as orthogonal axes, deployed and always shippable.

**Architecture:** A Next.js 15 App Router app in `web/`. Content lives as MDX/TS files validated by zod at build time. Two independent axes in one zustand store: `Lens` (`work | soul`) selects *what* content and in what order; `Universe` selects *how* it looks. A `Universe` object supplies design tokens, a curtain spec, a **total** `Record<ContentKind, Renderer>` (missing one fails type-check), and **optional** signature set pieces. Universe changes run a curtain-covered morph; colour tokens are `@property`-registered so they interpolate rather than snap.

**Tech Stack:** Next.js 15 (App Router), React 19, TypeScript (strict), zustand, zod, gray-matter + next-mdx-remote, CSS Modules, Vitest + Testing Library, Vercel.

## Global Constraints

- **Node** ≥ 20.11. **Next.js** 16.x. **React** 19.x. **TypeScript** strict mode on, `noUncheckedIndexedAccess` on.
- **pnpm 11** blocks postinstall scripts by default. Build allowlists live in `web/pnpm-workspace.yaml` under `allowBuilds:` (not `package.json`, and not `onlyBuiltDependencies` — both were moved in pnpm 11).
- **All work happens in `portfolio/web/`.** `portfolio/client/` is reference only — read it, never edit it. It is deleted in sub-project B, not here.
- **Every task ends with the site deployable.** No task may leave `main` in a state where `pnpm build` fails.
- **No Tailwind.** CSS Modules + a global custom-property token layer. Universes swap tokens at runtime; Tailwind generates classes at build time. The two fight.
- **No GSAP, no Lenis, no Three.js in Foundation.** Web Animations API covers the morph. Those land in sub-project D.
- **Lens must never affect appearance. Universe must never affect content.** Code reading `lens` for a visual decision, or `universe` for a content decision, is a defect.
- **No content is reachable only through a signature component.** Signature pieces are additive; the required renderer always covers the content.
- **Every universe must be complete and legible at `static` tier** (no canvas, no WebGL, no audio).
- **`prefers-reduced-motion: reduce` replaces animation with an instant swap** — not a shortened animation.
- Package manager: **pnpm**.

---

## File Structure

```
portfolio/
├── .gitattributes                       Git LFS rules
└── web/
    ├── package.json, tsconfig.json, next.config.ts, vitest.config.ts
    ├── app/
    │   ├── layout.tsx                   html shell, UniverseProvider
    │   ├── globals.css                  @property registrations, token defaults, reset
    │   ├── page.tsx                     /      cold open → in-world fork
    │   ├── hire/page.tsx                /hire  Work · Blueprint, no cinema
    │   ├── soul/page.tsx                /soul  Soul · Nightride, no cinema
    │   ├── work/[slug]/page.tsx
    │   └── poems/[slug]/page.tsx
    ├── content/
    │   ├── projects/*.mdx               one file per project
    │   ├── poems/*.md                   one file per poem
    │   ├── timeline.ts, personas.ts, games.ts
    │   └── gym/*.json
    ├── lib/
    │   ├── content/schema.ts            zod schemas — single source of truth for shape
    │   ├── content/load.ts              fs read + validate, server-only
    │   ├── content/types.ts             ContentKind, inferred record types
    │   ├── store.ts                     zustand: lens, universe, tier, hydration
    │   ├── tier.ts                      capability detection
    │   └── universe/
    │       ├── types.ts                 Universe, TokenSet, Renderer, CurtainSpec
    │       ├── registry.ts              UNIVERSES — the only place universes are listed
    │       ├── blueprint/{tokens,renderers,signature,curtain}.ts(x)
    │       └── nightride/{tokens,renderers,signature,curtain}.ts(x)
    ├── components/
    │   ├── UniverseProvider.tsx         writes tokens to :root, owns morph state
    │   ├── Curtain.tsx                  the morph sweep
    │   ├── Stage.tsx                    renders records through the active universe
    │   ├── UniverseRail.tsx, LensSwitch.tsx
    │   └── ColdOpen.tsx
    └── scripts/
        ├── harvest.ts                   client/src/data/*.js → content/
        └── split-poems.ts               bulk shayari dump → content/poems/*.md
```

**Why these boundaries.** `lib/content/` knows nothing about universes. `lib/universe/` knows nothing about the filesystem. `components/` wires them together and is the only layer that touches the DOM. Each universe directory is self-contained, so adding one is additive by construction.

---

### Task 0: Repo hygiene and Git LFS

61 MB of PNG/MP4 is already one commit deep. Migrating now rewrites one commit; migrating in a month rewrites fifty.

**Files:**
- Create: `portfolio/.gitattributes`
- Delete: `portfolio/Copilot-Processing.md`, `SUMMARY.md`, `IMPLEMENTATION-SUMMARY.md`, `DEPLOYMENT-READINESS.md`, `DEPLOYMENT-SUCCESS.md`, `FORMSPREE-INTEGRATION.md`, `planning and docs/`

**Interfaces:**
- Consumes: nothing
- Produces: nothing consumed by code

- [ ] **Step 1: Verify Git LFS is installed**

```bash
cd portfolio && git lfs version
```
Expected: a version string. If "command not found", install `git-lfs` first — do not proceed without it.

- [ ] **Step 2: Track binary assets**

```bash
cd portfolio
git lfs track "*.png" "*.jpg" "*.jpeg" "*.webp" "*.avif" "*.mp4" "*.mov" "*.glb" "*.mp3" "*.wav"
git add .gitattributes
git commit -m "chore: track binary assets with Git LFS"
```

- [ ] **Step 3: Migrate the existing assets commit**

```bash
cd portfolio
git lfs migrate import --include="*.png,*.mp4" --include-ref=refs/heads/main
```
Expected: reports rewritten commits. Verify with `git lfs ls-files | head` — should list the cold-open assets.

- [ ] **Step 4: Delete the doc sludge**

```bash
cd portfolio
git rm -q Copilot-Processing.md SUMMARY.md IMPLEMENTATION-SUMMARY.md \
  DEPLOYMENT-READINESS.md DEPLOYMENT-SUCCESS.md FORMSPREE-INTEGRATION.md
git rm -qr "planning and docs"
git commit -m "chore: remove superseded process docs"
```

- [ ] **Step 5: Verify the tree is clean**

```bash
cd portfolio && git status --short && du -sh .git
```
Expected: clean working tree; `.git` noticeably smaller than 61 MB.

---

### Task 1: Scaffold and deploy — live URL today

The daily-build model only works if the site is live from day one. This task ends with a public URL.

**Files:**
- Create: `web/package.json`, `web/tsconfig.json`, `web/next.config.ts`, `web/vitest.config.ts`, `web/app/layout.tsx`, `web/app/page.tsx`, `web/app/globals.css`, `web/.gitignore`

**Interfaces:**
- Consumes: nothing
- Produces: a working Next.js app rooted at `web/`; `pnpm build` and `pnpm test` both green

- [ ] **Step 1: Create the app**

```bash
cd portfolio
pnpm create next-app@latest web --ts --app --no-tailwind --no-src-dir --eslint --import-alias "@/*"
cd web && pnpm add zustand zod gray-matter next-mdx-remote
pnpm add -D vitest @vitejs/plugin-react @testing-library/react @testing-library/jest-dom jsdom
```

- [ ] **Step 2: Turn on strict TypeScript**

In `web/tsconfig.json`, inside `compilerOptions`:

```json
"strict": true,
"noUncheckedIndexedAccess": true,
"noImplicitOverride": true
```

- [ ] **Step 3: Configure Vitest**

`web/vitest.config.ts`:

```ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'node:path'

export default defineConfig({
  plugins: [react()],
  test: { environment: 'jsdom', globals: true, setupFiles: ['./vitest.setup.ts'] },
  resolve: { alias: { '@': path.resolve(__dirname, '.') } },
})
```

`web/vitest.setup.ts`:

```ts
import '@testing-library/jest-dom/vitest'
```

Add to `web/package.json` scripts: `"test": "vitest run"`, `"test:watch": "vitest"`.

- [ ] **Step 4: Write a smoke test**

`web/app/__tests__/smoke.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import Page from '../page'

test('home page renders the name', () => {
  render(<Page />)
  expect(screen.getByText(/Owais Ahmed Khan/i)).toBeInTheDocument()
})
```

- [ ] **Step 5: Run it and watch it fail**

```bash
cd portfolio/web && pnpm test
```
Expected: FAIL — the default scaffold page has no such text.

- [ ] **Step 6: Replace the scaffold page**

`web/app/page.tsx`:

```tsx
export default function Page() {
  return (
    <main>
      <h1>Owais Ahmed Khan</h1>
      <p>Senior Developer. Rider. Shayar. This site is being rebuilt in public.</p>
    </main>
  )
}
```

- [ ] **Step 7: Run tests and build**

```bash
cd portfolio/web && pnpm test && pnpm build
```
Expected: 1 test passes; build succeeds.

- [ ] **Step 8: Commit**

```bash
cd portfolio
git add web
git commit -m "feat: scaffold Next.js app for the portfolio rebuild"
```

- [ ] **Step 9: Deploy to Vercel**

```bash
cd portfolio/web && pnpm dlx vercel --yes
```
Set **Root Directory** to `web` when prompted. Expected: a live `*.vercel.app` URL that renders the h1.

- [ ] **Step 10: Record the URL**

Add the deployment URL to the top of `portfolio/docs/HANDOFF.md` under a `**Live:**` line, then:

```bash
cd portfolio && git add docs/HANDOFF.md && git commit -m "docs: record the live deployment URL"
```

---

### Task 2: Content schema

zod is the single source of truth for content shape. Types are inferred from it, never hand-written alongside it.

**Files:**
- Create: `web/lib/content/schema.ts`, `web/lib/content/types.ts`
- Test: `web/lib/content/__tests__/schema.test.ts`

**Interfaces:**
- Consumes: nothing
- Produces:
  - `projectSchema`, `poemSchema`, `timelineEntrySchema`, `personaSchema` (zod objects)
  - `type Project`, `type Poem`, `type TimelineEntry`, `type Persona` (inferred)
  - `type ContentKind = 'project' | 'poem' | 'timelineEntry' | 'persona'`
  - `type ContentRecord = Project | Poem | TimelineEntry | Persona`

- [ ] **Step 1: Write the failing tests**

`web/lib/content/__tests__/schema.test.ts`:

```ts
import { projectSchema, poemSchema } from '../schema'

const validProject = {
  slug: 'ticketvault', title: 'TicketVault',
  tagline: 'NFT ticketing with gasless mint and offline verification.',
  stack: ['Aptos', 'Move'], role: 'Lead, team of 3', period: '2025',
  metrics: [{ value: '3', label: 'dApps shipped' }],
  decisions: ['A relayer sponsors every on-chain operation.'],
  devlogs: [], links: {}, nda: true,
}

test('accepts a valid project', () => {
  expect(projectSchema.parse(validProject).slug).toBe('ticketvault')
})

test('rejects a project with no slug', () => {
  const { slug, ...rest } = validProject
  expect(() => projectSchema.parse(rest)).toThrow()
})

test('nda defaults to false when absent', () => {
  const { nda, ...rest } = validProject
  expect(projectSchema.parse(rest).nda).toBe(false)
})

test('poem requires a mood so transitions can select by fit', () => {
  expect(() => poemSchema.parse({
    slug: 'x', lang: 'roman-urdu', script: 'latin', body: 'x', tags: [],
  })).toThrow()
})
```

- [ ] **Step 2: Run and verify failure**

```bash
cd portfolio/web && pnpm test schema
```
Expected: FAIL — `Cannot find module '../schema'`.

- [ ] **Step 3: Write the schemas**

`web/lib/content/schema.ts`:

```ts
import { z } from 'zod'

export const metricSchema = z.object({ value: z.string(), label: z.string() })

export const projectSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  tagline: z.string().min(1),
  stack: z.array(z.string()),
  role: z.string(),
  period: z.string(),
  metrics: z.array(metricSchema).default([]),
  decisions: z.array(z.string()).default([]),
  devlogs: z.array(z.string()).default([]),
  links: z.object({ github: z.string().url().optional(), live: z.string().url().optional() }).default({}),
  nda: z.boolean().default(false),
})

export const poemSchema = z.object({
  slug: z.string().min(1),
  lang: z.enum(['roman-urdu', 'devanagari', 'english']),
  script: z.enum(['latin', 'devanagari', 'nastaliq']),
  mood: z.enum(['hopeful', 'heartbreak', 'philosophical', 'restless', 'still']),
  tags: z.array(z.string()).default([]),
  date: z.string().optional(),
  linkedProject: z.string().optional(),
  body: z.string().min(1),
})

export const timelineEntrySchema = z.object({
  year: z.string(), title: z.string(), body: z.string(),
})

export const personaSchema = z.object({
  slug: z.string(), title: z.string(), description: z.string(), image: z.string().optional(),
})
```

`web/lib/content/types.ts`:

```ts
import type { z } from 'zod'
import type { projectSchema, poemSchema, timelineEntrySchema, personaSchema } from './schema'

export type Project = z.infer<typeof projectSchema>
export type Poem = z.infer<typeof poemSchema>
export type TimelineEntry = z.infer<typeof timelineEntrySchema>
export type Persona = z.infer<typeof personaSchema>

export type ContentKind = 'project' | 'poem' | 'timelineEntry' | 'persona'
export type ContentRecord = Project | Poem | TimelineEntry | Persona

export type RecordFor<K extends ContentKind> =
  K extends 'project' ? Project :
  K extends 'poem' ? Poem :
  K extends 'timelineEntry' ? TimelineEntry :
  Persona
```

- [ ] **Step 4: Run tests**

```bash
cd portfolio/web && pnpm test schema
```
Expected: 4 tests PASS.

- [ ] **Step 5: Commit**

```bash
cd portfolio && git add web/lib/content && git commit -m "feat: add zod content schemas"
```

---

### Task 3: Content loader

Reads and validates at build time so bad frontmatter fails the build, not the page.

**Files:**
- Create: `web/lib/content/load.ts`
- Test: `web/lib/content/__tests__/load.test.ts`, `web/lib/content/__tests__/fixtures/`

**Interfaces:**
- Consumes: Task 2 schemas and types
- Produces:
  - `loadProjects(dir?: string): Promise<Project[]>`
  - `loadPoems(dir?: string): Promise<Poem[]>`
  - `applyNda(p: Project): Project` — strips `decisions`/`devlogs` when `nda` is true

- [ ] **Step 1: Write fixtures**

`web/lib/content/__tests__/fixtures/good.mdx`:

```mdx
---
slug: ticketvault
title: TicketVault
tagline: NFT ticketing with gasless mint and offline verification.
stack: [Aptos, Move, Next.js]
role: Lead, team of 3
period: 2025
metrics:
  - { value: "3", label: "dApps shipped" }
decisions:
  - A relayer sponsors every on-chain operation, so buyers never touch crypto.
---
Body copy.
```

`web/lib/content/__tests__/fixtures/bad.mdx` — identical but with the `title` line removed.

- [ ] **Step 2: Write the failing tests**

`web/lib/content/__tests__/load.test.ts`:

```ts
import path from 'node:path'
import { loadProjects, applyNda } from '../load'

const FIXTURES = path.join(__dirname, 'fixtures')

test('loads and validates a good project file', async () => {
  const [p] = await loadProjects(path.join(FIXTURES, 'good'))
  expect(p?.title).toBe('TicketVault')
  expect(p?.decisions).toHaveLength(1)
})

test('names the file and field when validation fails', async () => {
  await expect(loadProjects(path.join(FIXTURES, 'bad')))
    .rejects.toThrow(/bad\.mdx.*title/s)
})

test('applyNda strips decisions and devlogs', () => {
  const p = { slug: 'x', title: 'X', tagline: 't', stack: [], role: 'r', period: 'p',
    metrics: [], decisions: ['secret'], devlogs: ['secret'], links: {}, nda: true }
  const out = applyNda(p)
  expect(out.decisions).toEqual([])
  expect(out.devlogs).toEqual([])
})

test('applyNda leaves non-NDA projects untouched', () => {
  const p = { slug: 'x', title: 'X', tagline: 't', stack: [], role: 'r', period: 'p',
    metrics: [], decisions: ['public'], devlogs: [], links: {}, nda: false }
  expect(applyNda(p).decisions).toEqual(['public'])
})
```

Move `good.mdx` into `fixtures/good/` and `bad.mdx` into `fixtures/bad/` so each test targets its own directory.

- [ ] **Step 3: Run and verify failure**

```bash
cd portfolio/web && pnpm test load
```
Expected: FAIL — `Cannot find module '../load'`.

- [ ] **Step 4: Implement the loader**

`web/lib/content/load.ts`:

```ts
import 'server-only'
import fs from 'node:fs/promises'
import path from 'node:path'
import matter from 'gray-matter'
import { projectSchema, poemSchema } from './schema'
import type { Project, Poem } from './types'

const CONTENT = path.join(process.cwd(), 'content')

async function readDir(dir: string, ext: string) {
  const names = (await fs.readdir(dir)).filter(n => n.endsWith(ext)).sort()
  return Promise.all(names.map(async name => ({
    name,
    ...matter(await fs.readFile(path.join(dir, name), 'utf8')),
  })))
}

export async function loadProjects(dir = path.join(CONTENT, 'projects')): Promise<Project[]> {
  const files = await readDir(dir, '.mdx')
  return files.map(f => {
    const parsed = projectSchema.safeParse(f.data)
    if (!parsed.success) {
      const issue = parsed.error.issues[0]
      throw new Error(`${f.name}: ${issue?.path.join('.')} — ${issue?.message}`)
    }
    return parsed.data
  })
}

export async function loadPoems(dir = path.join(CONTENT, 'poems')): Promise<Poem[]> {
  const files = await readDir(dir, '.md')
  return files.map(f => {
    const parsed = poemSchema.safeParse({ ...f.data, body: f.content.trim() })
    if (!parsed.success) {
      const issue = parsed.error.issues[0]
      throw new Error(`${f.name}: ${issue?.path.join('.')} — ${issue?.message}`)
    }
    return parsed.data
  })
}

export function applyNda(p: Project): Project {
  return p.nda ? { ...p, decisions: [], devlogs: [] } : p
}
```

Install the guard: `pnpm add server-only`.

- [ ] **Step 5: Run tests**

```bash
cd portfolio/web && pnpm test load
```
Expected: 4 tests PASS.

- [ ] **Step 6: Commit**

```bash
cd portfolio && git add web/lib/content web/package.json && git commit -m "feat: add build-time content loader with NDA stripping"
```

---

### Task 4: Harvest existing content

`client/src/data/projects.js` is 913 lines of real case-study depth. Port it rather than rewrite it.

**Files:**
- Create: `web/scripts/harvest.ts`, `web/content/projects/*.mdx`, `web/content/timeline.ts`, `web/content/personas.ts`
- Test: `web/lib/content/__tests__/real-content.test.ts`

**Interfaces:**
- Consumes: Task 3 `loadProjects`
- Produces: `web/content/` populated; every file parses

- [ ] **Step 1: Write the harvest script**

`web/scripts/harvest.ts`:

```ts
import fs from 'node:fs/promises'
import path from 'node:path'

const SRC = path.join(process.cwd(), '..', 'client', 'src', 'data')
const OUT = path.join(process.cwd(), 'content')

const slugify = (s: string) =>
  s.toLowerCase().split(':')[0]!.replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

const yamlList = (xs: string[]) =>
  xs.length ? '\n' + xs.map(x => `  - ${JSON.stringify(x)}`).join('\n') : ' []'

async function main() {
  const { default: projects } = await import(path.join(SRC, 'projects.js'))
  await fs.mkdir(path.join(OUT, 'projects'), { recursive: true })

  for (const p of projects) {
    const slug = slugify(p.title)
    const fm = [
      '---',
      `slug: ${slug}`,
      `title: ${JSON.stringify(p.title.split(':')[0].trim())}`,
      `tagline: ${JSON.stringify(p.shortDesc ?? '')}`,
      `stack:${yamlList(p.tech ?? [])}`,
      `role: ${JSON.stringify(p.type ?? 'Solo')}`,
      `period: ${JSON.stringify(p.status ?? '')}`,
      `metrics: []`,
      `decisions:${yamlList(p.decisions ?? [])}`,
      `devlogs:${yamlList(p.devLogs ?? [])}`,
      'links:',
      ...(p.github ? [`  github: ${JSON.stringify(p.github)}`] : []),
      ...(p.live ? [`  live: ${JSON.stringify(p.live)}`] : []),
      'nda: false',
      '---',
      '',
      p.description ?? '',
      '',
    ].join('\n')
    await fs.writeFile(path.join(OUT, 'projects', `${slug}.mdx`), fm)
    console.log('wrote', slug)
  }
}

main()
```

- [ ] **Step 2: Run it**

```bash
cd portfolio/web && pnpm dlx tsx scripts/harvest.ts && ls content/projects
```
Expected: one `.mdx` per project in `client/src/data/projects.js`.

- [ ] **Step 3: Port timeline and personas by hand**

`web/content/timeline.ts` — copy the array from `client/src/data/story.js`, renaming `desc` to `body`, typed `TimelineEntry[]`.
`web/content/personas.ts` — copy from `client/src/data/personaData.js`, adding a `slug` per record, typed `Persona[]`.

- [ ] **Step 4: Add the two employer projects as NDA records**

Create `web/content/projects/genai-media-platform.mdx` (title "Generative-AI media platform") and `creator-marketplace.mdx` (title "Creator marketplace") by hand with `nda: true`. **Never use the products' real names, internal metrics, configs, costs, or vendors** — employment NDA. Public framing only: what the system does, the stack, the kind of problem solved. Role is "Senior Developer".

- [ ] **Step 5: Write the guard test**

`web/lib/content/__tests__/real-content.test.ts`:

```ts
import { loadProjects, loadPoems } from '../load'

test('every real project file parses', async () => {
  const projects = await loadProjects()
  expect(projects.length).toBeGreaterThan(4)
})

test('every real poem file parses', async () => {
  await expect(loadPoems()).resolves.toBeInstanceOf(Array)
})

test('NDA projects carry no decisions in the source files', async () => {
  const projects = await loadProjects()
  for (const p of projects.filter(x => x.nda)) expect(p.decisions).toEqual([])
})
```

Create `web/content/poems/.gitkeep` so `loadPoems` resolves before the corpus lands.

- [ ] **Step 6: Run tests**

```bash
cd portfolio/web && pnpm test
```
Expected: all PASS.

- [ ] **Step 7: Commit**

```bash
cd portfolio && git add web/content web/scripts && git commit -m "feat: harvest project, timeline and persona content"
```

---

### Task 5: Capability tiers

**Files:**
- Create: `web/lib/tier.ts`
- Test: `web/lib/__tests__/tier.test.ts`

**Interfaces:**
- Consumes: nothing
- Produces: `type Tier = 'full' | 'reduced' | 'static'`, `detectTier(w?: Partial<TierInputs>): Tier`

- [ ] **Step 1: Write the failing tests**

`web/lib/__tests__/tier.test.ts`:

```ts
import { detectTier } from '../tier'

const base = { deviceMemory: 8, hardwareConcurrency: 8, webgl: true, saveData: false, reducedMotion: false }

test('capable device gets full', () => {
  expect(detectTier(base)).toBe('full')
})

test('reduced motion forces static', () => {
  expect(detectTier({ ...base, reducedMotion: true })).toBe('static')
})

test('save-data forces static', () => {
  expect(detectTier({ ...base, saveData: true })).toBe('static')
})

test('no webgl falls to reduced', () => {
  expect(detectTier({ ...base, webgl: false })).toBe('reduced')
})

test('low memory falls to reduced', () => {
  expect(detectTier({ ...base, deviceMemory: 2 })).toBe('reduced')
})

test('unknown capabilities default to reduced, not full', () => {
  expect(detectTier({})).toBe('reduced')
})
```

- [ ] **Step 2: Run and verify failure**

```bash
cd portfolio/web && pnpm test tier
```
Expected: FAIL — module not found.

- [ ] **Step 3: Implement**

`web/lib/tier.ts`:

```ts
export type Tier = 'full' | 'reduced' | 'static'

export interface TierInputs {
  deviceMemory: number
  hardwareConcurrency: number
  webgl: boolean
  saveData: boolean
  reducedMotion: boolean
}

export function detectTier(inputs: Partial<TierInputs> = {}): Tier {
  if (inputs.reducedMotion || inputs.saveData) return 'static'
  const { deviceMemory, hardwareConcurrency, webgl } = inputs
  if (deviceMemory === undefined || hardwareConcurrency === undefined || webgl === undefined) return 'reduced'
  if (!webgl || deviceMemory < 4 || hardwareConcurrency < 4) return 'reduced'
  return 'full'
}

export function probe(): Partial<TierInputs> {
  if (typeof window === 'undefined') return {}
  const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } }
  let webgl = false
  try {
    webgl = !!document.createElement('canvas').getContext('webgl2')
  } catch { webgl = false }
  return {
    deviceMemory: nav.deviceMemory ?? 4,
    hardwareConcurrency: nav.hardwareConcurrency ?? 4,
    webgl,
    saveData: nav.connection?.saveData ?? false,
    reducedMotion: matchMedia('(prefers-reduced-motion: reduce)').matches,
  }
}
```

- [ ] **Step 4: Run tests**

```bash
cd portfolio/web && pnpm test tier
```
Expected: 6 tests PASS.

- [ ] **Step 5: Commit**

```bash
cd portfolio && git add web/lib && git commit -m "feat: add capability tier detection"
```

---

### Task 6: The store — Lens and Universe as orthogonal axes

**Files:**
- Create: `web/lib/store.ts`
- Test: `web/lib/__tests__/store.test.ts`

**Interfaces:**
- Consumes: Task 5 `Tier`
- Produces: `useSite` zustand hook with `{ lens, universe, tier, morphing, setLens, setUniverse, setTier, setMorphing, hydrate }`; `type Lens = 'work' | 'soul'`; `type UniverseId = 'blueprint' | 'nightride' | 'dastan' | 'campaign' | 'observatory'`

- [ ] **Step 1: Write the failing tests**

`web/lib/__tests__/store.test.ts`:

```ts
import { useSite } from '../store'

beforeEach(() => {
  localStorage.clear()
  useSite.setState({ lens: 'work', universe: 'blueprint', tier: 'reduced', morphing: false })
})

test('defaults to work lens and blueprint universe', () => {
  const s = useSite.getState()
  expect(s.lens).toBe('work')
  expect(s.universe).toBe('blueprint')
})

test('changing lens does not change universe', () => {
  useSite.getState().setLens('soul')
  expect(useSite.getState().universe).toBe('blueprint')
})

test('changing universe does not change lens', () => {
  useSite.getState().setUniverse('nightride')
  expect(useSite.getState().lens).toBe('work')
})

test('lens and universe persist to localStorage', () => {
  useSite.getState().setLens('soul')
  useSite.getState().setUniverse('nightride')
  expect(localStorage.getItem('site:lens')).toBe('soul')
  expect(localStorage.getItem('site:universe')).toBe('nightride')
})

test('hydrate rejects a corrupt persisted universe and clears the key', () => {
  localStorage.setItem('site:universe', 'atlantis')
  useSite.getState().hydrate()
  expect(useSite.getState().universe).toBe('blueprint')
  expect(localStorage.getItem('site:universe')).toBeNull()
})

test('hydrate restores valid persisted values', () => {
  localStorage.setItem('site:lens', 'soul')
  localStorage.setItem('site:universe', 'nightride')
  useSite.getState().hydrate()
  expect(useSite.getState().lens).toBe('soul')
  expect(useSite.getState().universe).toBe('nightride')
})
```

- [ ] **Step 2: Run and verify failure**

```bash
cd portfolio/web && pnpm test store
```
Expected: FAIL — module not found.

- [ ] **Step 3: Implement**

`web/lib/store.ts`:

```ts
import { create } from 'zustand'
import type { Tier } from './tier'

export type Lens = 'work' | 'soul'
export type UniverseId = 'blueprint' | 'nightride' | 'dastan' | 'campaign' | 'observatory'

export const LENSES: readonly Lens[] = ['work', 'soul']
export const UNIVERSE_IDS: readonly UniverseId[] =
  ['blueprint', 'nightride', 'dastan', 'campaign', 'observatory']

interface SiteState {
  lens: Lens
  universe: UniverseId
  tier: Tier
  morphing: boolean
  setLens: (l: Lens) => void
  setUniverse: (u: UniverseId) => void
  setTier: (t: Tier) => void
  setMorphing: (m: boolean) => void
  hydrate: () => void
}

function read<T extends string>(key: string, allowed: readonly T[]): T | null {
  if (typeof localStorage === 'undefined') return null
  const v = localStorage.getItem(key)
  if (v && (allowed as readonly string[]).includes(v)) return v as T
  if (v) localStorage.removeItem(key)
  return null
}

export const useSite = create<SiteState>(set => ({
  lens: 'work',
  universe: 'blueprint',
  tier: 'reduced',
  morphing: false,
  setLens: l => {
    localStorage.setItem('site:lens', l)
    set({ lens: l })
  },
  setUniverse: u => {
    localStorage.setItem('site:universe', u)
    set({ universe: u })
  },
  setTier: t => set({ tier: t }),
  setMorphing: m => set({ morphing: m }),
  hydrate: () => set({
    lens: read('site:lens', LENSES) ?? 'work',
    universe: read('site:universe', UNIVERSE_IDS) ?? 'blueprint',
  }),
}))
```

- [ ] **Step 4: Run tests**

```bash
cd portfolio/web && pnpm test store
```
Expected: 6 tests PASS.

- [ ] **Step 5: Commit**

```bash
cd portfolio && git add web/lib/store.ts && git commit -m "feat: add site store with orthogonal lens and universe axes"
```

---

### Task 7: The universe contract

The type-level guarantee that makes N universes cheap. This is the most important task in the plan.

**Files:**
- Create: `web/lib/universe/types.ts`, `web/lib/universe/registry.ts`
- Test: `web/lib/universe/__tests__/contract.test.ts`

**Interfaces:**
- Consumes: Task 2 `ContentKind`/`RecordFor`, Task 6 `UniverseId`
- Produces: `interface Universe`, `type TokenSet`, `type Renderer<K>`, `type CurtainSpec`, `type StageSlot`, `UNIVERSES: Record<UniverseId, Universe>` (partial during Foundation — see note in Step 3)

- [ ] **Step 1: Write the failing tests**

`web/lib/universe/__tests__/contract.test.ts`:

```ts
import { UNIVERSES, REGISTERED } from '../registry'
import type { ContentKind } from '@/lib/content/types'

const KINDS: ContentKind[] = ['project', 'poem', 'timelineEntry', 'persona']

test('every registered universe implements every content kind', () => {
  for (const id of REGISTERED) {
    for (const kind of KINDS) {
      expect(UNIVERSES[id].renderers[kind], `${id} is missing a ${kind} renderer`).toBeTypeOf('function')
    }
  }
})

test('every registered universe declares tokens and a curtain', () => {
  for (const id of REGISTERED) {
    expect(UNIVERSES[id].tokens.bg).toMatch(/^#/)
    expect(UNIVERSES[id].tokens.accent).toMatch(/^#/)
    expect(UNIVERSES[id].curtain.background).toBeTruthy()
  }
})

test('signature pieces are optional — a universe without them is valid', () => {
  for (const id of REGISTERED) {
    const sig = UNIVERSES[id].signature
    expect(sig === undefined || typeof sig === 'object').toBe(true)
  }
})
```

- [ ] **Step 2: Run and verify failure**

```bash
cd portfolio/web && pnpm test contract
```
Expected: FAIL — module not found.

- [ ] **Step 3: Define the contract**

`web/lib/universe/types.ts`:

```ts
import type { FC } from 'react'
import type { ContentKind, RecordFor } from '@/lib/content/types'
import type { Lens, UniverseId } from '@/lib/store'

export interface TokenSet {
  bg: string; bg2: string; fg: string; dim: string
  accent: string; accent2: string; line: string
  radius: string; tracking: string
  display: string; body: string; mono: string
  displayWeight: string; displayStretch: string
}

export interface CurtainSpec {
  background: string
  durationIn: number
  durationOut: number
  easing: string
}

/** A renderer receives every record of its kind plus the active lens.
 *  Lens may reorder or filter. It may NOT change styling. */
export type Renderer<K extends ContentKind = ContentKind> =
  FC<{ records: RecordFor<K>[]; lens: Lens }>

export type StageSlot = 'afterHero' | 'afterList' | 'footer'

export interface Universe {
  id: UniverseId
  name: string
  origin: string
  tokens: TokenSet
  curtain: CurtainSpec
  /** TOTAL: omitting any ContentKind is a compile error. */
  renderers: { [K in ContentKind]: Renderer<K> }
  /** PARTIAL: additive only. No content may be reachable solely through these. */
  signature?: Partial<Record<StageSlot, FC>>
}
```

`web/lib/universe/registry.ts`:

```ts
import type { UniverseId } from '@/lib/store'
import type { Universe } from './types'
import { blueprint } from './blueprint'
import { nightride } from './nightride'

/** Universes ship one at a time. REGISTERED is the subset that exists today;
 *  UNIVERSES is typed against it so an unregistered id cannot be selected. */
export const REGISTERED = ['blueprint', 'nightride'] as const
export type RegisteredId = (typeof REGISTERED)[number]

export const UNIVERSES: Record<RegisteredId, Universe> = { blueprint, nightride }

export function isRegistered(id: UniverseId): id is RegisteredId {
  return (REGISTERED as readonly string[]).includes(id)
}

export function resolve(id: UniverseId): Universe {
  return isRegistered(id) ? UNIVERSES[id] : UNIVERSES.blueprint
}
```

**Note for the implementer:** this test will not compile until Task 8 creates `blueprint` and Task 12 creates `nightride`. Write the files now, expect a red build, and proceed to Task 8 — it turns green there. This is the one place in the plan where a task does not end green; the commit at the end of Task 8 covers both.

- [ ] **Step 4: Commit the contract**

```bash
cd portfolio && git add web/lib/universe && git commit -m "feat: define the universe contract"
```

---

### Task 8: Blueprint universe

**Files:**
- Create: `web/lib/universe/blueprint/{index.ts,tokens.ts,curtain.ts,renderers.tsx,renderers.module.css,signature.tsx}`
- Test: `web/lib/universe/__tests__/blueprint.test.tsx`

**Interfaces:**
- Consumes: Task 7 `Universe`, `TokenSet`, `Renderer`
- Produces: `export const blueprint: Universe`

- [ ] **Step 1: Write the failing tests**

`web/lib/universe/__tests__/blueprint.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import { blueprint } from '../blueprint'
import type { Project } from '@/lib/content/types'

const projects: Project[] = [{
  slug: 'ticketvault', title: 'TicketVault', tagline: 'NFT ticketing.',
  stack: ['Aptos'], role: 'Lead', period: '2025',
  metrics: [{ value: '3', label: 'dApps' }], decisions: ['Relayer sponsors gas.'],
  devlogs: [], links: {}, nda: false,
}]

test('renders every project title', () => {
  const R = blueprint.renderers.project
  render(<R records={projects} lens="work" />)
  expect(screen.getByText('TicketVault')).toBeInTheDocument()
})

test('renders the same content under either lens', () => {
  const R = blueprint.renderers.project
  const { unmount } = render(<R records={projects} lens="work" />)
  const work = screen.getByText('TicketVault').textContent
  unmount()
  render(<R records={projects} lens="soul" />)
  expect(screen.getByText('TicketVault').textContent).toBe(work)
})
```

- [ ] **Step 2: Run and verify failure**

```bash
cd portfolio/web && pnpm test blueprint
```
Expected: FAIL — module not found.

- [ ] **Step 3: Write tokens and curtain**

`web/lib/universe/blueprint/tokens.ts`:

```ts
import type { TokenSet } from '../types'

export const tokens: TokenSet = {
  bg: '#F2F4F2', bg2: '#E4E8E6', fg: '#12181C', dim: '#5C6B72',
  accent: '#0E7C86', accent2: '#C2410C', line: '#C3CDCC',
  radius: '1px', tracking: '0.01em',
  display: 'ui-sans-serif, system-ui, "Segoe UI", sans-serif',
  body: 'ui-sans-serif, system-ui, "Segoe UI", sans-serif',
  mono: 'ui-monospace, "SF Mono", Menlo, Consolas, monospace',
  displayWeight: '640', displayStretch: 'normal',
}
```

`web/lib/universe/blueprint/curtain.ts`:

```ts
import type { CurtainSpec } from '../types'

export const curtain: CurtainSpec = {
  background: 'repeating-linear-gradient(90deg,#0E7C86 0 2px,transparent 2px 26px)',
  durationIn: 460, durationOut: 520, easing: 'cubic-bezier(.7,0,.3,1)',
}
```

- [ ] **Step 4: Write the renderers**

`web/lib/universe/blueprint/renderers.module.css`:

```css
.list { display: grid; border-top: 1px solid var(--u-line); }
.row {
  display: grid; grid-template-columns: 44px 1.15fr 1fr auto; gap: 20px;
  align-items: start; padding: 20px 4px; border-bottom: 1px solid var(--u-line);
  position: relative;
}
.row::before {
  content: ''; position: absolute; left: 0; top: 0; width: 100%; height: 1px;
  background: var(--u-accent); transform: scaleX(0); transform-origin: left center;
  transition: transform .5s cubic-bezier(.2,.8,.2,1);
}
.row:hover::before { transform: scaleX(1); }
.idx { font-family: var(--u-mono); font-size: 11px; color: var(--u-accent); padding-top: 4px; }
.title { font-family: var(--u-display); font-weight: 640; font-size: 18px; margin: 0 0 4px; }
.sub { font-size: 13.5px; color: var(--u-dim); margin: 0; }
.decision { font-size: 13px; border-left: 2px solid var(--u-accent); padding-left: 12px; margin: 0; }
.metric { font-family: var(--u-mono); font-size: 12px; color: var(--u-accent2);
  white-space: nowrap; font-variant-numeric: tabular-nums; }
@media (prefers-reduced-motion: reduce) { .row::before { transition: none; } }
```

`web/lib/universe/blueprint/renderers.tsx`:

```tsx
import type { Universe } from '../types'
import s from './renderers.module.css'

const pad = (i: number) => String(i + 1).padStart(2, '0')

export const renderers: Universe['renderers'] = {
  project: ({ records }) => (
    <div className={s.list}>
      {records.map((p, i) => (
        <article key={p.slug} className={s.row}>
          <span className={s.idx}>{pad(i)}</span>
          <div>
            <h3 className={s.title}>{p.title}</h3>
            <p className={s.sub}>{p.tagline}</p>
          </div>
          <p className={s.decision}>{p.decisions[0] ?? p.stack.join(' · ')}</p>
          <span className={s.metric}>{p.metrics[0]?.value ?? p.period}</span>
        </article>
      ))}
    </div>
  ),

  poem: ({ records }) => (
    <div className={s.list}>
      {records.map((p, i) => (
        <article key={p.slug} className={s.row}>
          <span className={s.idx}>{pad(i)}</span>
          <div>
            <h3 className={s.title}>{p.slug}</h3>
            <p className={s.sub} style={{ whiteSpace: 'pre-line' }}>{p.body}</p>
          </div>
          <p className={s.decision}>{p.mood}</p>
          <span className={s.metric}>{p.lang}</span>
        </article>
      ))}
    </div>
  ),

  timelineEntry: ({ records }) => (
    <div className={s.list}>
      {records.map((e, i) => (
        <article key={e.year + i} className={s.row}>
          <span className={s.idx}>{e.year}</span>
          <div>
            <h3 className={s.title}>{e.title}</h3>
            <p className={s.sub}>{e.body}</p>
          </div>
          <p className={s.decision} />
          <span className={s.metric} />
        </article>
      ))}
    </div>
  ),

  persona: ({ records }) => (
    <div className={s.list}>
      {records.map((p, i) => (
        <article key={p.slug} className={s.row}>
          <span className={s.idx}>{pad(i)}</span>
          <div>
            <h3 className={s.title}>{p.title}</h3>
            <p className={s.sub}>{p.description}</p>
          </div>
          <p className={s.decision} />
          <span className={s.metric} />
        </article>
      ))}
    </div>
  ),
}
```

- [ ] **Step 5: Assemble the universe**

`web/lib/universe/blueprint/index.ts`:

```ts
import type { Universe } from '../types'
import { tokens } from './tokens'
import { curtain } from './curtain'
import { renderers } from './renderers'
import { MetricPlate } from './signature'

export const blueprint: Universe = {
  id: 'blueprint',
  name: 'Blueprint',
  origin: 'the engineer',
  tokens, curtain, renderers,
  signature: { afterList: MetricPlate },
}
```

`web/lib/universe/blueprint/signature.tsx` — a `MetricPlate` component rendering the five headline numbers drawn from public, non-employer work only — e.g. Today Egg Rates' verified `34.2k+ clicks` and `2K+ MAU`, `3 dApps` from TicketVault. **No employer metrics** (NDA). in a bordered grid using `var(--u-accent)` and `font-variant-numeric: tabular-nums`.

- [ ] **Step 6: Run tests**

```bash
cd portfolio/web && pnpm test
```
Expected: blueprint tests PASS. The contract test from Task 7 still fails on `nightride` — that is expected until Task 12.

- [ ] **Step 7: Commit**

```bash
cd portfolio && git add web/lib/universe && git commit -m "feat: add the Blueprint universe"
```

---

### Task 9: UniverseProvider and globals

Writes the active universe's tokens onto `:root` and registers them with `@property` so they interpolate.

**Files:**
- Create: `web/components/UniverseProvider.tsx`
- Modify: `web/app/globals.css`, `web/app/layout.tsx`
- Test: `web/components/__tests__/UniverseProvider.test.tsx`

**Interfaces:**
- Consumes: Task 6 `useSite`, Task 7 `resolve`, Task 5 `probe`/`detectTier`
- Produces: `<UniverseProvider>{children}</UniverseProvider>` — a client component that syncs tokens, hydrates the store, and sets the tier

- [ ] **Step 1: Write the failing test**

`web/components/__tests__/UniverseProvider.test.tsx`:

```tsx
import { render } from '@testing-library/react'
import { UniverseProvider } from '../UniverseProvider'
import { useSite } from '@/lib/store'

test('writes the active universe tokens onto the root element', () => {
  render(<UniverseProvider><div /></UniverseProvider>)
  expect(document.documentElement.style.getPropertyValue('--u-accent')).toBe('#0E7C86')
})

test('rewrites tokens when the universe changes', () => {
  render(<UniverseProvider><div /></UniverseProvider>)
  useSite.getState().setUniverse('nightride')
  expect(document.documentElement.style.getPropertyValue('--u-accent')).toBe('#FF8A3D')
})
```

- [ ] **Step 2: Run and verify failure**

```bash
cd portfolio/web && pnpm test UniverseProvider
```
Expected: FAIL — module not found.

- [ ] **Step 3: Register the properties**

Prepend to `web/app/globals.css`:

```css
@property --u-bg      { syntax: '<color>'; inherits: true; initial-value: #F2F4F2 }
@property --u-bg2     { syntax: '<color>'; inherits: true; initial-value: #E4E8E6 }
@property --u-fg      { syntax: '<color>'; inherits: true; initial-value: #12181C }
@property --u-dim     { syntax: '<color>'; inherits: true; initial-value: #5C6B72 }
@property --u-accent  { syntax: '<color>'; inherits: true; initial-value: #0E7C86 }
@property --u-accent2 { syntax: '<color>'; inherits: true; initial-value: #C2410C }
@property --u-line    { syntax: '<color>'; inherits: true; initial-value: #C3CDCC }

:root { --morph: 900ms cubic-bezier(.65,.02,.24,1); }
* , *::before, *::after { box-sizing: border-box; }
body {
  margin: 0; background: var(--u-bg); color: var(--u-fg);
  font-family: var(--u-body); line-height: 1.6;
  transition: background var(--morph), color var(--morph);
}
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { transition-duration: .01ms !important; animation-duration: .01ms !important; }
}
```

- [ ] **Step 4: Implement the provider**

`web/components/UniverseProvider.tsx`:

```tsx
'use client'
import { useEffect } from 'react'
import { useSite } from '@/lib/store'
import { resolve } from '@/lib/universe/registry'
import { detectTier, probe } from '@/lib/tier'

const CSS_VAR: Record<string, string> = {
  bg: '--u-bg', bg2: '--u-bg2', fg: '--u-fg', dim: '--u-dim',
  accent: '--u-accent', accent2: '--u-accent2', line: '--u-line',
  radius: '--u-radius', tracking: '--u-tracking',
  display: '--u-display', body: '--u-body', mono: '--u-mono',
  displayWeight: '--u-display-weight', displayStretch: '--u-display-stretch',
}

export function UniverseProvider({ children }: { children: React.ReactNode }) {
  const universe = useSite(s => s.universe)
  const hydrate = useSite(s => s.hydrate)
  const setTier = useSite(s => s.setTier)

  useEffect(() => {
    hydrate()
    setTier(detectTier(probe()))
  }, [hydrate, setTier])

  useEffect(() => {
    const { tokens } = resolve(universe)
    const root = document.documentElement
    for (const [key, value] of Object.entries(tokens)) {
      const cssVar = CSS_VAR[key]
      if (cssVar) root.style.setProperty(cssVar, value)
    }
    root.dataset.universe = universe
  }, [universe])

  return <>{children}</>
}
```

- [ ] **Step 5: Mount it in the layout**

In `web/app/layout.tsx`, wrap `{children}` in `<UniverseProvider>` and import `./globals.css`.

- [ ] **Step 6: Run tests and build**

```bash
cd portfolio/web && pnpm test UniverseProvider && pnpm build
```
Expected: 2 tests PASS (the second requires `nightride` from Task 12 — until then it asserts the fallback to blueprint; adjust the expectation to `#0E7C86` and restore it in Task 12 Step 6).

- [ ] **Step 7: Commit**

```bash
cd portfolio && git add web/components web/app && git commit -m "feat: apply universe tokens at the document root"
```

---

### Task 10: Stage — render content through the active universe

**Files:**
- Create: `web/components/Stage.tsx`
- Test: `web/components/__tests__/Stage.test.tsx`

**Interfaces:**
- Consumes: Task 7 `resolve`, Task 6 `useSite`, Task 2 types
- Produces: `<Stage kind="project" records={projects} />` — picks the renderer from the active universe and passes the active lens

- [ ] **Step 1: Write the failing tests**

`web/components/__tests__/Stage.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import { Stage } from '../Stage'
import { useSite } from '@/lib/store'
import type { Project } from '@/lib/content/types'

const projects: Project[] = [{
  slug: 'forgeos', title: 'ForgeOS', tagline: 'SDLC engine of orchestrated agents.',
  stack: ['TypeScript'], role: 'Solo', period: '2025',
  metrics: [], decisions: [], devlogs: [], links: {}, nda: true,
}]

beforeEach(() => useSite.setState({ universe: 'blueprint', lens: 'work' }))

test('renders records through the active universe', () => {
  render(<Stage kind="project" records={projects} />)
  expect(screen.getByText('ForgeOS')).toBeInTheDocument()
})

test('content is identical across universes — only presentation differs', () => {
  const { unmount } = render(<Stage kind="project" records={projects} />)
  expect(screen.getByText('ForgeOS')).toBeInTheDocument()
  unmount()
  useSite.setState({ universe: 'nightride' })
  render(<Stage kind="project" records={projects} />)
  expect(screen.getByText(/ForgeOS/i)).toBeInTheDocument()
})
```

- [ ] **Step 2: Run and verify failure**

```bash
cd portfolio/web && pnpm test Stage
```
Expected: FAIL — module not found.

- [ ] **Step 3: Implement**

`web/components/Stage.tsx`:

```tsx
'use client'
import { useSite } from '@/lib/store'
import { resolve } from '@/lib/universe/registry'
import type { ContentKind, RecordFor } from '@/lib/content/types'

export function Stage<K extends ContentKind>({ kind, records }: {
  kind: K
  records: RecordFor<K>[]
}) {
  const universe = useSite(s => s.universe)
  const lens = useSite(s => s.lens)
  const Renderer = resolve(universe).renderers[kind]
  return <Renderer records={records} lens={lens} />
}
```

- [ ] **Step 4: Run tests**

```bash
cd portfolio/web && pnpm test Stage
```
Expected: both PASS (the second falls back to blueprint until Task 12).

- [ ] **Step 5: Commit**

```bash
cd portfolio && git add web/components/Stage.tsx && git commit -m "feat: add Stage to render content through the active universe"
```

---

### Task 11: The morph

**Files:**
- Create: `web/components/Curtain.tsx`, `web/components/Curtain.module.css`
- Modify: `web/components/UniverseProvider.tsx`
- Test: `web/components/__tests__/Curtain.test.tsx`

**Interfaces:**
- Consumes: Task 6 `useSite`, Task 7 `resolve`
- Produces: `useMorphTo(): (next: UniverseId) => void` — sweeps the incoming universe's curtain in, swaps the universe under cover, sweeps out

- [ ] **Step 1: Write the failing tests**

`web/components/__tests__/Curtain.test.tsx`:

```tsx
import { render, act } from '@testing-library/react'
import { Curtain, useMorphTo } from '../Curtain'
import { useSite } from '@/lib/store'

function Harness() {
  const morphTo = useMorphTo()
  return <button onClick={() => morphTo('nightride')}>go</button>
}

beforeEach(() => useSite.setState({ universe: 'blueprint', morphing: false }))

test('reduced motion swaps instantly without setting morphing', async () => {
  window.matchMedia = (q: string) => ({ matches: true, media: q, addEventListener() {}, removeEventListener() {} }) as never
  const { getByText } = render(<><Curtain /><Harness /></>)
  await act(async () => { getByText('go').click() })
  expect(useSite.getState().universe).toBe('nightride')
  expect(useSite.getState().morphing).toBe(false)
})

test('a morph already in flight is ignored', async () => {
  useSite.setState({ morphing: true })
  const { getByText } = render(<><Curtain /><Harness /></>)
  await act(async () => { getByText('go').click() })
  expect(useSite.getState().universe).toBe('blueprint')
})
```

- [ ] **Step 2: Run and verify failure**

```bash
cd portfolio/web && pnpm test Curtain
```
Expected: FAIL — module not found.

- [ ] **Step 3: Implement**

`web/components/Curtain.module.css`:

```css
.curtain { position: fixed; inset: 0; z-index: 60; pointer-events: none; opacity: 0; }
.inner { position: absolute; inset: 0; transform-origin: left center; transform: scaleX(0); }
```

`web/components/Curtain.tsx`:

```tsx
'use client'
import { useCallback } from 'react'
import { useSite, type UniverseId } from '@/lib/store'
import { resolve } from '@/lib/universe/registry'
import s from './Curtain.module.css'

/* The curtain is a singleton overlay outside the React tree's data flow, so it
   is located by id at morph time rather than through refs captured in render. */
const CURTAIN_ID = 'morph-curtain'
const INNER_ID = 'morph-curtain-inner'

export function Curtain() {
  return (
    <div id={CURTAIN_ID} className={s.curtain} aria-hidden="true">
      <div id={INNER_ID} className={s.inner} />
    </div>
  )
}

export function useMorphTo() {
  const setUniverse = useSite(s => s.setUniverse)
  const setMorphing = useSite(s => s.setMorphing)

  return useCallback((next: UniverseId) => {
    const { universe, morphing } = useSite.getState()
    if (morphing || next === universe) return

    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) { setUniverse(next); return }

    const spec = resolve(next).curtain
    const curtain = document.getElementById(CURTAIN_ID)
    const inner = document.getElementById(INNER_ID)
    if (!curtain || !inner) { setUniverse(next); return }

    setMorphing(true)
    curtain.style.opacity = '1'
    inner.style.background = spec.background

    inner.animate(
      [{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }],
      { duration: spec.durationIn, easing: spec.easing, fill: 'forwards' },
    ).finished.then(() => {
      setUniverse(next)
      return inner.animate(
        [{ transform: 'scaleX(1)', transformOrigin: 'right center' },
         { transform: 'scaleX(0)', transformOrigin: 'right center' }],
        { duration: spec.durationOut, easing: spec.easing, fill: 'forwards' },
      ).finished
    }).then(() => {
      curtain.style.opacity = '0'
      setMorphing(false)
    })
  }, [setUniverse, setMorphing])
}
```

Mount `<Curtain />` inside `UniverseProvider`, above `{children}`.

- [ ] **Step 4: Run tests**

```bash
cd portfolio/web && pnpm test Curtain
```
Expected: 2 tests PASS.

- [ ] **Step 5: Commit**

```bash
cd portfolio && git add web/components && git commit -m "feat: add the curtain morph between universes"
```

---

### Task 12: Nightride — the contract proof

The second universe is the only honest test that the contract holds. If this task requires editing anything under `lib/universe/blueprint/`, `components/`, or `lib/content/`, the contract has failed and must be fixed rather than worked around.

**Files:**
- Create: `web/lib/universe/nightride/{index.ts,tokens.ts,curtain.ts,renderers.tsx,renderers.module.css,signature.tsx}`
- Test: `web/lib/universe/__tests__/nightride.test.tsx`

**Interfaces:**
- Consumes: Task 7 `Universe`
- Produces: `export const nightride: Universe`

- [ ] **Step 1: Write the failing test**

`web/lib/universe/__tests__/nightride.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import { nightride } from '../nightride'
import { blueprint } from '../blueprint'
import type { Project } from '@/lib/content/types'

const projects: Project[] = [{
  slug: 'ticketvault', title: 'TicketVault', tagline: 'NFT ticketing.',
  stack: ['Aptos'], role: 'Lead', period: '2025', metrics: [], decisions: [],
  devlogs: [], links: {}, nda: false,
}]

test('renders the same records as blueprint', () => {
  const N = nightride.renderers.project
  const B = blueprint.renderers.project
  const { unmount } = render(<B records={projects} lens="work" />)
  expect(screen.getByText('TicketVault')).toBeInTheDocument()
  unmount()
  render(<N records={projects} lens="work" />)
  expect(screen.getByText('TicketVault')).toBeInTheDocument()
})

test('declares a distinct accent from blueprint', () => {
  expect(nightride.tokens.accent).not.toBe(blueprint.tokens.accent)
})
```

- [ ] **Step 2: Run and verify failure**

```bash
cd portfolio/web && pnpm test nightride
```
Expected: FAIL — module not found.

- [ ] **Step 3: Write tokens and curtain**

`web/lib/universe/nightride/tokens.ts`:

```ts
import type { TokenSet } from '../types'

export const tokens: TokenSet = {
  bg: '#07070A', bg2: '#0E0D12', fg: '#F5EFE6', dim: '#8C8478',
  accent: '#FF8A3D', accent2: '#4CC2FF', line: '#1E1A18',
  radius: '0px', tracking: '0.06em',
  display: '"Arial Narrow", "Helvetica Neue", ui-sans-serif, sans-serif',
  body: 'ui-sans-serif, system-ui, sans-serif',
  mono: 'ui-monospace, "SF Mono", Menlo, Consolas, monospace',
  displayWeight: '800', displayStretch: 'condensed',
}
```

`web/lib/universe/nightride/curtain.ts`:

```ts
import type { CurtainSpec } from '../types'

export const curtain: CurtainSpec = {
  background: 'linear-gradient(100deg,transparent,#FF8A3D 45%,#fff 50%,#FF8A3D 55%,transparent)',
  durationIn: 460, durationOut: 520, easing: 'cubic-bezier(.7,0,.3,1)',
}
```

- [ ] **Step 4: Write the renderers**

`renderers.module.css` — the skewed speed board: `.row` at `transform: skewX(-7deg)` with children counter-skewed `skewX(7deg)`, `.idx` in condensed 800 weight at 30px in `var(--u-accent)`, a `::after` sodium sweep that travels on hover, and `@media (prefers-reduced-motion: reduce)` disabling both transitions.

`renderers.tsx` — the same four renderer keys as blueprint (`project`, `poem`, `timelineEntry`, `persona`), same records, different markup and classes. Uppercase titles via CSS, not by transforming the strings — the content must stay identical.

`signature.tsx` — export `Tacho`, a component whose SVG arc and readout track scroll velocity via `requestAnimationFrame`, returning `null` when `useSite(s => s.tier) === 'static'`.

- [ ] **Step 5: Assemble**

`web/lib/universe/nightride/index.ts`:

```ts
import type { Universe } from '../types'
import { tokens } from './tokens'
import { curtain } from './curtain'
import { renderers } from './renderers'
import { Tacho } from './signature'

export const nightride: Universe = {
  id: 'nightride',
  name: 'Nightride',
  origin: 'the Hero Xtreme 125R',
  tokens, curtain, renderers,
  signature: { afterHero: Tacho },
}
```

- [ ] **Step 6: Restore the deferred assertions**

In `web/components/__tests__/UniverseProvider.test.tsx`, restore the second test's expectation to `'#FF8A3D'`.

- [ ] **Step 7: Run the full suite**

```bash
cd portfolio/web && pnpm test && pnpm build
```
Expected: everything PASS, including the Task 7 contract test that has been red since it was written.

- [ ] **Step 8: Commit**

```bash
cd portfolio && git add web && git commit -m "feat: add the Nightride universe"
```

---

### Task 13: Routes, rail and lens switch

**Files:**
- Create: `web/components/UniverseRail.tsx`, `web/components/LensSwitch.tsx`, `web/app/hire/page.tsx`, `web/app/soul/page.tsx`, `web/app/work/[slug]/page.tsx`, `web/app/poems/[slug]/page.tsx`
- Modify: `web/app/page.tsx`
- Test: `web/app/__tests__/routes.test.tsx`

**Interfaces:**
- Consumes: Tasks 3, 6, 10, 11
- Produces: the five routes from the spec; `<UniverseRail />` and `<LensSwitch />`

- [ ] **Step 1: Write the failing tests**

`web/app/__tests__/routes.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import { LensSwitch } from '@/components/LensSwitch'
import { useSite } from '@/lib/store'

beforeEach(() => useSite.setState({ lens: 'work', universe: 'blueprint' }))

test('lens switch exposes both lenses with pressed state', () => {
  render(<LensSwitch />)
  expect(screen.getByRole('button', { name: /work/i })).toHaveAttribute('aria-pressed', 'true')
  expect(screen.getByRole('button', { name: /soul/i })).toHaveAttribute('aria-pressed', 'false')
})

test('switching lens leaves the universe untouched', () => {
  render(<LensSwitch />)
  screen.getByRole('button', { name: /soul/i }).click()
  expect(useSite.getState().lens).toBe('soul')
  expect(useSite.getState().universe).toBe('blueprint')
})
```

- [ ] **Step 2: Run and verify failure**

```bash
cd portfolio/web && pnpm test routes
```
Expected: FAIL — module not found.

- [ ] **Step 3: Implement the controls**

`web/components/LensSwitch.tsx` — a `'use client'` group of two buttons bound to `setLens`, each carrying `aria-pressed`, labelled "Work" and "Soul".

`web/components/UniverseRail.tsx` — a `'use client'` nav listing `REGISTERED` universes, each button calling `useMorphTo()`, carrying `aria-current`, showing `name` and `origin`, disabled while `morphing`.

- [ ] **Step 4: Implement the deep-link routes**

`web/app/hire/page.tsx` — a server component loading projects, rendering `<Stage kind="project" …>`, and mounting a client `<SetEntry lens="work" universe="blueprint" />` that calls `setLens`/`setUniverse` once on mount, bypassing the cold open.

`web/app/soul/page.tsx` — identical shape with `lens="soul"` and `universe="nightride"`, loading personas and poems.

`web/app/work/[slug]/page.tsx` and `web/app/poems/[slug]/page.tsx` — `generateStaticParams` from the loaders, `generateMetadata` for per-record OG tags, `notFound()` on an unknown slug, body rendered through the active universe.

- [ ] **Step 5: Run tests and build**

```bash
cd portfolio/web && pnpm test && pnpm build
```
Expected: all PASS; build emits static pages for every project and poem slug.

- [ ] **Step 6: Commit and deploy**

```bash
cd portfolio && git add web && git commit -m "feat: add routes, universe rail and lens switch"
cd web && pnpm dlx vercel --prod --yes
```

---

### Task 14: Cold open

**Files:**
- Create: `web/components/ColdOpen.tsx`, `web/components/ColdOpen.module.css`
- Modify: `web/app/page.tsx`
- Test: `web/components/__tests__/ColdOpen.test.tsx`

**Interfaces:**
- Consumes: Task 6 `useSite`
- Produces: `<ColdOpen />` — a ~7s sequence that any scroll, key, or click dismisses; plays once per visitor

- [ ] **Step 1: Write the failing tests**

`web/components/__tests__/ColdOpen.test.tsx`:

```tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { ColdOpen } from '../ColdOpen'

beforeEach(() => localStorage.clear())

test('renders on a first visit', () => {
  render(<ColdOpen />)
  expect(screen.getByTestId('cold-open')).toBeInTheDocument()
})

test('any scroll dismisses it', () => {
  render(<ColdOpen />)
  fireEvent.scroll(window)
  expect(screen.queryByTestId('cold-open')).not.toBeInTheDocument()
})

test('does not replay for a returning visitor', () => {
  localStorage.setItem('site:coldOpenSeen', '1')
  render(<ColdOpen />)
  expect(screen.queryByTestId('cold-open')).not.toBeInTheDocument()
})

test('reduced motion skips it entirely', () => {
  window.matchMedia = (q: string) => ({ matches: true, media: q, addEventListener() {}, removeEventListener() {} }) as never
  render(<ColdOpen />)
  expect(screen.queryByTestId('cold-open')).not.toBeInTheDocument()
})
```

- [ ] **Step 2: Run and verify failure**

```bash
cd portfolio/web && pnpm test ColdOpen
```
Expected: FAIL — module not found.

- [ ] **Step 3: Implement**

`web/components/ColdOpen.tsx` — a `'use client'` overlay, `data-testid="cold-open"`, holding `a1.png` (helmet + monitor) with a slow scale, resolving into the two-path fork. Dismiss on `scroll`, `keydown`, `click`, or after 7000ms; on dismiss write `site:coldOpenSeen`. Return `null` immediately when the flag is set or `prefers-reduced-motion` matches. The page beneath is always mounted and never `aria-hidden` — this is the specific defect being replaced.

- [ ] **Step 4: Run tests**

```bash
cd portfolio/web && pnpm test ColdOpen
```
Expected: 4 tests PASS.

- [ ] **Step 5: Commit**

```bash
cd portfolio && git add web/components web/app/page.tsx && git commit -m "feat: add the cold open with scroll bypass"
```

---

### Task 15: Accessibility and performance gate

**Files:**
- Create: `web/lighthouserc.json`, `.github/workflows/ci.yml`
- Test: `web/app/__tests__/a11y.test.tsx`

**Interfaces:**
- Consumes: everything
- Produces: CI that fails the build on a Lighthouse regression

- [ ] **Step 1: Write the failing tests**

`web/app/__tests__/a11y.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import { UniverseRail } from '@/components/UniverseRail'
import { Stage } from '@/components/Stage'
import { useSite } from '@/lib/store'
import type { Project } from '@/lib/content/types'

const projects: Project[] = [{
  slug: 'forgeos', title: 'ForgeOS', tagline: 'SDLC engine.', stack: ['TypeScript'],
  role: 'Solo', period: '2025', metrics: [], decisions: [], devlogs: [], links: {}, nda: false,
}]

test('universe rail buttons are reachable and labelled', () => {
  render(<UniverseRail />)
  const buttons = screen.getAllByRole('button')
  expect(buttons.length).toBeGreaterThanOrEqual(2)
  for (const b of buttons) expect(b).toHaveAccessibleName()
})

test('all content renders at the static tier', () => {
  useSite.setState({ tier: 'static', universe: 'nightride' })
  render(<Stage kind="project" records={projects} />)
  expect(screen.getByText('ForgeOS')).toBeInTheDocument()
  expect(document.querySelector('canvas')).toBeNull()
})

test('no element hides main content from assistive tech', () => {
  const { container } = render(<Stage kind="project" records={projects} />)
  expect(container.querySelector('[aria-hidden="true"] h3')).toBeNull()
})
```

- [ ] **Step 2: Run and fix**

```bash
cd portfolio/web && pnpm test a11y
```
Fix any failure in the component, not the test. Signature pieces returning `null` at `static` tier is the mechanism for the second test.

- [ ] **Step 3: Add the Lighthouse budget**

`web/lighthouserc.json`:

```json
{
  "ci": {
    "collect": { "url": ["http://localhost:3000/hire"], "startServerCommand": "pnpm start" },
    "assert": {
      "assertions": {
        "categories:performance": ["error", { "minScore": 0.95 }],
        "categories:accessibility": ["error", { "minScore": 0.95 }],
        "categories:seo": ["error", { "minScore": 0.95 }]
      }
    }
  }
}
```

- [ ] **Step 4: Add CI**

`.github/workflows/ci.yml` — on push and pull request: checkout with `lfs: true`, pnpm install, `pnpm test`, `pnpm build`, then `pnpm dlx @lhci/cli autorun` from `web/`.

- [ ] **Step 5: Verify locally**

```bash
cd portfolio/web && pnpm build && pnpm dlx @lhci/cli autorun
```
Expected: all three categories ≥ 0.95. If performance falls short, check that no signature piece mounts at `static` tier and that the cold-open image is `next/image` with `priority`.

- [ ] **Step 6: Commit**

```bash
cd portfolio && git add web .github && git commit -m "ci: add accessibility tests and a Lighthouse budget"
```

---

## Foundation is done when

- [ ] Blueprint and Nightride both implemented against the contract
- [ ] Both lenses working across both universes
- [ ] Real harvested content — projects, timeline, personas
- [ ] Deployed to Vercel, preview URL per commit
- [ ] `reaperoak.web.app` redirecting to the new deployment
- [ ] Lighthouse ≥ 95 on `/hire` for performance, accessibility and SEO
- [ ] Every universe complete and legible at `static` tier
- [ ] `prefers-reduced-motion` honoured with an instant swap
- [ ] Doc sludge deleted, binaries in LFS

## Deferred to later sub-projects — do not build here

- Derived case studies from source repos, resume page, contact form → **B**
- Poetry corpus, gym progression viz, gaming, gallery → **C**
- WebGL scenes, audio beds, GSAP scroll choreography, 3D scans → **D**
- Easter eggs, universes 3–5, returning-visitor payoffs, time-aware states → **E**
- Deleting `portfolio/client/` → **B**, once the Work lens reaches parity
