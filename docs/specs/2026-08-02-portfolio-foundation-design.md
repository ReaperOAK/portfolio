# Portfolio — Foundation (Sub-project A)

**Date:** 2026-08-02
**Status:** Approved
**Scope:** Sub-project A of 5. Foundation only.

---

## 1. Context

`reaperoak.web.app` currently runs a Vite SPA at `portfolio/client/`. It works, and two parts of it are genuinely
valuable: the content is already data (`data/projects.js` carries `decisions[]` and `devlogs[]` at real case-study
depth), and the stack is already close (React 19, R3F, framer-motion, zustand, vitest).

Two things in it block everything this project wants to become:

**The audience gate.** `App.jsx` opens a full-screen four-way modal on every first visit and `aria-hidden`s the
entire application behind it. That is the highest-bounce pattern that exists, and recruiters — the visitors with
the least patience and the most value — are the ones it costs most.

**Theme is welded to audience.** `themes/index.js` keys palettes by `recruiter | client | developer | poet`, so a
palette *is* an audience. Under that model "Cyberpunk" and "recruiter" can never coexist, because they occupy the
same slot. Multi-universe is not hard in this codebase; it is structurally impossible.

Foundation exists to fix both, and to establish an engine that can absorb new universes, projects, poems and
hobbies indefinitely without a rewrite.

## 2. Decomposition

The full project is five sub-projects. Each gets its own spec → plan → implementation cycle.

| | Sub-project | Depends on |
|---|---|---|
| **A** | **Foundation** — content model, universe engine, lens axis, routing, morph, deploy | — |
| B | The Work lens — case studies derived from source repos, resume, contact | A |
| C | The Soul lens — poetry, rider, gym, gaming, personas | A |
| D | The Cinema layer — WebGL scenes, scroll choreography, 3D, audio | A |
| E | The Secrets layer — easter eggs, universes 3–5, memory depth, time-aware states | A |

**This spec covers A only.**

## 3. Goals

1. One content model that renders through N universes with zero per-universe re-authoring.
2. Lens (audience) and Universe (aesthetic) as fully orthogonal axes.
3. No gate. Cinema without friction. Deep links that bypass the cinema entirely.
4. Deployable from day one and every day after.
5. Complete and legible on a low-end device with WebGL unavailable.

### Non-goals for A

WebGL scenes, custom 3D models, audio beds, scroll choreography, easter eggs, universes 3–5, derived case studies.
All are later sub-projects. Foundation must leave clean seams for each and ship without any of them.

## 4. Guiding constraints

**Every animation must reveal character, not capability.** A motion that only demonstrates that we can do motion
gets cut. Nightride's tachometer is driven by scroll velocity because Owais rides; that is the bar.

**Generate the world, never the evidence.** Mood, light, environment and set dressing may be generated. Face,
bike, handwriting, gym numbers and code must be real. The site's entire claim is authenticity; faking the
evidence forfeits it. (Applies to asset production across all sub-projects.)

**Content is the bottleneck, not code.** Asset and writing production runs parallel to engineering from day one.

## 5. Architecture

### 5.1 Repository shape

```
portfolio/
├── client/     old Vite SPA — reference only, deleted once web/ reaches parity
└── web/        Next.js 15 (App Router) + TypeScript
```

Removed on day one: `Copilot-Processing.md`, `SUMMARY.md`, `IMPLEMENTATION-SUMMARY.md`,
`DEPLOYMENT-READINESS.md`, `DEPLOYMENT-SUCCESS.md`, `FORMSPREE-INTEGRATION.md`, `planning and docs/`.

Next.js over the existing Vite SPA because a portfolio's job includes being found and being shared: static
generation gives real SEO, per-project OG images make shared links render, and route-level splitting keeps the
cinematic layer off the critical path for `/hire`.

### 5.2 Content model

```
web/content/
  projects/*.mdx    slug, title, tagline, stack[], role, period,
                    metrics[], decisions[], devlogs[], links{}, nda
  poems/*.md        lang, script, mood, tags, date, linkedProject?
  timeline.ts       year, title, body            (harvested from story.js)
  personas.ts       11 records                   (harvested as-is)
  gym/*.json        session logs
  games.ts          title, platform, hours?, note
```

Every file is validated by a **zod schema at build time**. Invalid frontmatter fails the build rather than
producing a broken page.

`nda: true` strips `decisions[]` and `devlogs[]` at build and renders shape-only — what the system does and the
stack, nothing internal. Employer work is covered by an indefinite NDA: it appears only as "a generative-AI media
platform" and "a creator marketplace" — never by product name, and never with internal metrics, configs, costs,
vendors or unreleased features. The role is **Senior Developer**.

`poems` carries `mood` and `tags` because poems are used as loading states, empty states and transitions. The site
selects a *fitting* verse for the moment, never a random one.

**Migration of existing content.** `data/projects.js` (913 lines, one array) splits to one MDX file per project.
Shayari arrive as a single bulk dump in any format and are split by a one-time script into `content/poems/*.md`;
after that, one file per poem, appended by hand.

### 5.3 The two axes

```ts
type Lens = 'work' | 'soul'
type UniverseId = 'blueprint' | 'nightride' | 'dastan' | 'campaign' | 'observatory'
```

**Lens** determines what content appears and in what order. URL-addressable, persisted, switchable at any time
from the nav. It never affects appearance.

**Universe** determines appearance and nothing else. Persisted, morphable, unlockable.

Both live in a single zustand store — already a dependency in `client/`, currently unused there.

The orthogonality is the central architectural claim of this spec. Any code that reads Lens to make a visual
decision, or reads Universe to make a content decision, is a defect.

### 5.4 The universe contract

```ts
interface Universe {
  id: UniverseId
  name: string
  origin: string                                 // what in Owais's life it comes from
  tokens: TokenSet                               // required
  curtain: CurtainSpec                           // required — how it morphs IN
  renderers: Record<ContentKind, Renderer>       // required — ALL kinds
  scene?: SceneFactory                           // optional
  sound?: SoundBed                               // optional
  signature?: Partial<Record<StageSlot, FC>>     // optional, additive
}
```

`renderers` is a **total** `Record`, so omitting a content kind fails type-check. This is what guarantees a new
project file renders in every universe without touching any universe.

`signature` is **`Partial`**, so a missing set piece is legal by construction. Signature pieces slot into named
stage positions the shell exposes and are always additive: **no content is reachable only through a signature
component.** If one is absent — universe doesn't declare it, `static` tier, small viewport — the required
renderer already covers that content.

Adding a universe touches only its own directory. Adding a content type is the one change that touches every
universe, by design, and the type system names every site that needs updating.

### 5.5 Universes

Each is grounded in something in Owais's life rather than a generic aesthetic genre.

| | Universe | Origin | Ground / accent | Type | Layout strategy |
|---|---|---|---|---|---|
| 01 | **Blueprint** | the engineer | `#F2F4F2` / `#0B6A73` (dark ground available) | grotesk + mono, tight | spec-sheet rows, dimension rules |
| 02 | **Nightride** | the Hero Xtreme 125R | `#07070A` / `#FF8A3D` | condensed, uppercase | skewed speed board |
| 03 | **Dastan** | the shayar | `#EDE4D3` / `#8C2F1E` | serif, generous | printed index, roman numerals, dot leaders |
| 04 | **Campaign** | chess + strategy games | `#101014` / `#C6923E` | display + tabular | stat cards, cut brass corner |
| 05 | **Observatory** | the stargazer | `#05070F` / `#9FD3E8` | light serif, wide | orbital log on a meridian |

Direction prototype (all five, both lenses, live morph):
`https://claude.ai/code/artifact/73612489-ff63-4d34-806e-6fc6240e821c`

**Ship order.** Blueprint, then Nightride, then the rest one at a time with no fixed schedule. Foundation
requires exactly two, because the second universe is the only honest proof that the contract holds.

**Themes.** A universe *is* a theme. The viewer's `prefers-color-scheme` selects the entry universe on first load
(Blueprint carries both a light and a dark ground); every other universe is a committed world. This is a
deliberate choice, not an omission.

### 5.6 Morph engine

A universe change runs a sequenced teardown rather than a snap:

1. The incoming universe's **curtain** sweeps in — Blueprint wipes as a drafting grid, Nightride as a headlight
   sweep, Dastan as ink bleed, Campaign as a shutter, Observatory dissolves through starlight.
2. Under cover, tokens swap and the layout strategy re-renders.
3. The curtain sweeps out from the opposite edge.

Colour tokens are declared with `@property` so they interpolate rather than jump. GSAP drives the timeline; Lenis
drives smooth scroll. Target duration on the live site is 6–10s with audio (sub-project D); Foundation ships the
mechanism at roughly 1s.

`prefers-reduced-motion: reduce` replaces the entire sequence with an instant swap. Not a shortened animation —
no animation.

### 5.7 Performance tiers

Detected once at boot from `deviceMemory`, `hardwareConcurrency`, a WebGL probe, `navigator.connection.saveData`
and `prefers-reduced-motion`:

| Tier | Includes |
|---|---|
| `full` | WebGL scene, audio, full choreography |
| `reduced` | canvas/CSS scene, no WebGL, reduced motion budget |
| `static` | tokens and layout only |

**Every universe must be complete and legible at `static`.** A portfolio whose argument is engineering competence
cannot drop frames on a mid-range Android. The tier is exposed in the store so any component can degrade
deliberately instead of being clipped.

### 5.8 Routes

| Route | Behaviour |
|---|---|
| `/` | Cold open (~7s) resolving into an in-world fork. Scroll bypasses it at any moment and continues into a blended narrative. Plays once per visitor; returning visitors get a short re-entry. |
| `/hire` | Work · Blueprint. No cinema. The link that goes on the resume. |
| `/soul` | Soul · Nightride. No cinema. |
| `/work/[slug]` | Project detail, current universe |
| `/poems/[slug]` | Poem, current universe |

The fork is a URL, not a door. A visitor who guesses wrong is never lost, because the lens is switchable from the
nav for the entire session.

### 5.9 Visitor memory

`localStorage` only — no accounts, no server state, no tracking:

```ts
{ visits, lastLens, lastUniverse, seen: string[], unlocked: UniverseId[], coldOpenSeen }
```

Foundation ships the store and uses it for lens/universe persistence and cold-open suppression. The
returning-visitor payoffs it enables — the bike already parked, a poem left open on the desk — are sub-project E.

## 6. Testing

- **Schema** — every content file parses against its zod schema; malformed fixtures fail the build.
- **Contract** — a type-level test asserts every registered universe implements every `ContentKind`. A universe
  missing a renderer must not compile.
- **Orthogonality** — a test renders each lens against each universe (2 × 2 at Foundation) and asserts content
  identity across universes and visual-token identity across lenses.
- **Signature optionality** — rendering a universe with `signature` stripped must still surface all content.
- **Tiers** — `static` renders all content with no canvas or WebGL mounted.
- **A11y** — keyboard traversal of rail and lens toggle, visible focus, no `aria-hidden` over main content
  (the specific defect being replaced), reduced-motion path verified.
- **Perf** — Lighthouse ≥95 on `/hire` in CI.

Vitest and Testing Library, both already in use in `client/`.

## 7. Error handling

- Invalid content frontmatter → build failure with the offending file and field named.
- Missing optional asset (scene, sound, signature) → silently omitted; required renderer covers the content.
- WebGL context loss → drop to `reduced` at runtime.
- Unknown universe or lens in persisted state → fall back to `blueprint` / `work` and clear the bad key.
- Unknown route → 404 rendered in the current universe.

## 8. Done

Foundation is complete when all of the following hold:

- Blueprint and Nightride both implemented against the contract
- Both lenses working across both universes
- Real content — harvested projects, timeline, personas; poems if the dump has landed
- Deployed to Vercel with a preview URL per commit
- `reaperoak.web.app` redirecting to the new deployment
- Lighthouse ≥95 on `/hire`
- Every universe complete and legible at `static` tier
- `prefers-reduced-motion` fully honoured
- Old doc sludge deleted

`portfolio/client/` is deleted in sub-project B, once the Work lens reaches parity.

## 9. Decisions made, with reasons

| Decision | Reason |
|---|---|
| Next.js over the existing Vite SPA | SEO, per-project OG images, route-level splitting keeps cinema off `/hire`'s critical path |
| TypeScript over JS + PropTypes | The universe contract is enforced by the type system; without it "every universe implements every renderer" is a comment, not a guarantee |
| Cold open with scroll bypass over a gate | Keeps the cinema, removes the bounce; `/hire` skips it entirely |
| Lens and Universe orthogonal | The existing coupling makes multi-universe impossible; this is the fix |
| Renderers total, signature partial | Makes "bespoke components per universe" structurally safe rather than a promise |
| Universes named for Owais's life | An animation must reveal character; generic genre themes cannot |
| Vercel | Preview URL per commit is what makes daily incremental building reviewable |

## 10. Open items

- **Domain.** Vercel deployment is assumed; `reaperoak.web.app` becomes a redirect. Staying on Firebase Hosting
  instead is a viable override and changes only the deploy step.
- **Poems.** Bulk shayari dump not yet delivered. Foundation ships the `poems` schema, the splitter script and
  the Dastan renderer contract; the corpus lands whenever it lands.
- **Photography.** Shot list issued. `a1` (helmet + monitor) is approved for the cold open. `a3` (bike) and `a4`
  (notebook) are to be replaced with real photographs of the Hero Xtreme 125R and Owais's own handwriting.
