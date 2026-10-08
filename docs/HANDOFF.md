# Handoff — portfolio rebuild

**Written:** 2026-08-02
**For:** a fresh Claude Code session opened in this repo (`ReaperOAK/portfolio`)
**Read first:** [`docs/specs/2026-08-02-portfolio-foundation-design.md`](specs/2026-08-02-portfolio-foundation-design.md)

The design phase is finished and approved. This file exists so the next session starts with the reasoning
intact and does not re-open settled questions.

---

## What this project is

A personal portfolio for **Owais Ahmed Khan** (ReaperOAK) — Senior Developer, B.Tech 2027,
rider, shayar, strategist. Built as a long-lived project: a little every day, indefinitely, always deployable.

It is not a one-page portfolio. It is an engine: **one content model rendered through N aesthetic universes**,
with audience and aesthetic as separate axes.

## Current state

| | |
|---|---|
| `client/` | The live site — Vite SPA, React 19, deployed at `reaperoak.web.app`. **Reference only.** |
| `web/` | Does not exist yet. This is what gets built. |
| `docs/specs/` | Approved Foundation spec. |
| `assets/cold-open/` | Raw source assets (see inventory below). |

Nothing has been built yet. The next step is the implementation plan.

## What was decided, and why

These are settled. Do not re-litigate them without Owais explicitly reopening one.

**1. Fresh Next.js 15 + TypeScript app in `web/`, not an in-place refactor of `client/`.**
`client/` has two structural problems that a refactor would inherit. Its content, though, is genuinely
valuable — `client/src/data/projects.js` is 913 lines carrying `decisions[]` and `devlogs[]` at real
case-study depth. Harvest the data, rebuild the shell.

**2. The audience gate is deleted.**
`client/src/App.jsx` opens a four-way modal on every first visit and `aria-hidden`s the whole app behind it.
Highest-bounce pattern that exists. Replaced by a ~7s cold open that scroll bypasses at any moment, plus
`/hire` and `/soul` deep links that skip the cinema entirely. **The fork is a URL, not a door.**

**3. Lens and Universe are orthogonal. This is the central architectural claim.**
`client/src/themes/index.js` keys palettes by `recruiter | client | developer | poet`, so a palette *is* an
audience. That makes multi-universe structurally impossible — "Cyberpunk" and "recruiter" would occupy the
same slot. Split into:
- **Lens** (`work | soul`) — what content, in what order. Never affects appearance.
- **Universe** (five, below) — appearance only. Never affects content.

Code that reads Lens for a visual decision, or Universe for a content decision, is a defect.

**4. Universes are `tokens + layout strategy + signature set pieces`.**
Skin-deep theming would make Cyberpunk and Old Library the same page recoloured. Fully bespoke per universe
would mean every new project needs N hand-built treatments — that version dies in four months. The middle
path is enforced by the type system:

```ts
renderers: Record<ContentKind, Renderer>       // TOTAL — missing one fails the build
signature?: Partial<Record<StageSlot, FC>>     // PARTIAL — missing one is legal
```

**The rule that keeps this safe: no content is reachable only through a signature component.** Set pieces are
always additive. If one is absent (universe doesn't declare it, `static` perf tier, small viewport), the
required renderer already covers that content.

**5. Five universes, each grounded in Owais's actual life** — not generic aesthetic genres.

| | Universe | Origin | Ground / accent |
|---|---|---|---|
| 01 | Blueprint | the engineer | `#F2F4F2` / `#0E7C86` (dark ground too) |
| 02 | Nightride | the Hero Xtreme 125R | `#07070A` / `#FF8A3D` |
| 03 | Dastan | the shayar | `#EDE4D3` / `#8C2F1E` |
| 04 | Campaign | chess + strategy games | `#101014` / `#C6923E` |
| 05 | Observatory | the stargazer | `#05070F` / `#9FD3E8` |

Owais approved all five and asked to **ship them one at a time**. Foundation ships Blueprint then Nightride —
the second universe is the only honest proof the contract holds. The other three land whenever, at zero
architectural risk.

Live direction prototype (all five, both lenses, working morph, real content):
<https://claude.ai/code/artifact/73612489-ff63-4d34-806e-6fc6240e821c>

**6. Two constraints that govern every decision.**

> **Every animation must reveal character, not capability.** Motion that only proves we can do motion gets cut.
> Nightride's tachometer is driven by scroll velocity because Owais rides. That is the bar.

> **Generate the world, never the evidence.** Mood, light, environment, set dressing — generate freely. Face,
> bike, handwriting, gym numbers, code — must be real. The site's whole claim is authenticity.

**7. Vercel**, for the preview URL per commit — that is what makes daily incremental building reviewable.
`reaperoak.web.app` becomes a redirect. Owais can override this back to Firebase; it changes only the deploy step.

## Asset inventory — `assets/cold-open/`

Mostly AI-generated. Per the rule above, that is fine for *world* and wrong for *evidence*.

| File | Status |
|---|---|
| `a1.png` helmet + monitor, night, screen-glow only | **Approved.** Best frame in the set — both halves of him in one shot. Only flaw: screen text is AI gibberish, so defocus it or composite real code. |
| `a2.png` – `a5.png` | World. Usable. |
| `a3.png` bike on a wet street | Light is superb, **but it shows a litre-class naked and he rides a Hero Xtreme 125R.** Evidence, and wrong. To be reshot. |
| `a4.png` notebook | Composition good, handwriting is gibberish Latin cursive. To be replaced with scans of his own hand. |
| `b1.png` portrait | **Real photo of Owais.** Work-lens face. |
| `b2.png`, `c1.png` – `c6.png` | Added mid-session, not yet reviewed. |
| `v1.mp4`, `v2.mp4`, `v3.mp4` | Added mid-session, not yet reviewed. |

Still outstanding from the shot list: real 125R photographs, handwritten shayari scans, gym frames, and audio
(bike start, keyboard, rain, night room tone — phone quality is fine).

## Content Owais still owes

- **Shayari** — a bulk dump in any format. A one-time splitter turns it into `content/poems/*.md`.
- **Gym logs** — for a real progression curve. This is data-viz that reveals character, not a photo of a gym.
- **Games list.**
- **NDA calls** — case studies get derived by reading the source repos; he marks what needs censoring.
  Employer work is NDA-bound: only "generative-AI media platform" / "creator marketplace", no product names,
  no internal metrics, configs, costs or vendors. Title is "Senior Developer". A pre-push hook enforces the names.

## Where the project sits

Foundation is sub-project **A of 5**. Each gets its own spec → plan → implementation cycle.

| | Sub-project | Depends on |
|---|---|---|
| **A** | **Foundation** — content model, universe engine, lens axis, routing, morph, deploy | — |
| B | The Work lens — derived case studies, resume, contact | A |
| C | The Soul lens — poetry, rider, gym, gaming, personas | A |
| D | The Cinema layer — WebGL, scroll choreography, 3D, audio | A |
| E | The Secrets layer — easter eggs, universes 3–5, memory depth, time-aware states | A |

**Sub-project A is specced and approved. Nothing is built.**

## Next action

Write the Foundation implementation plan (the `superpowers:writing-plans` skill). It must break Foundation into
**daily-shippable steps, starting with a deployed live URL on day one** — the "build a little every day forever"
model only works if the site is always deployable.

Foundation is done when: Blueprint and Nightride both implemented against the contract · both lenses working ·
real harvested content · deployed to Vercel · Lighthouse ≥95 on `/hire` · every universe complete at `static`
perf tier · `prefers-reduced-motion` fully honoured · old doc sludge deleted.

---

## Paste this into the fresh session

```
Read docs/HANDOFF.md and docs/specs/2026-08-02-portfolio-foundation-design.md.

The Foundation design is approved — don't re-open it. Write the implementation
plan for sub-project A, broken into daily-shippable steps with a deployed live
URL on day one. Then start executing it.

Existing content to harvest lives in client/src/data/ (projects.js, story.js,
personaData.js, skills.js, funFacts.js, socials.js). client/ is reference only.
```
