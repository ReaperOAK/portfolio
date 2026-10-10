# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Primary: hiring managers and engineering leads** arriving from a job application or a resume link, evaluating
Owais for a full-time, remote, senior backend or full-stack role. They give the site seconds, on a laptop between
other tabs. Their job: decide whether this person has built and run real systems, and whether to talk to him.

Secondary: friends, family, followers and admirers who come for the person (rider, shayar, strategist) rather than
the résumé. They are served by the Soul lens and must never be in the hiring manager's way.

## Product Purpose

A personal portfolio for Owais Ahmed Khan (ReaperOAK) that gets him hired and makes him memorable. Success: a
hiring manager reaches real evidence of engineering depth within one scroll, and leaves remembering him as a
specific person, not a template.

## Positioning

One content model rendered through several aesthetic "universes", each drawn from his actual life (the engineer,
the Hero Xtreme 125R, the shayar, the strategist, the stargazer). Audience (Lens: Work / Soul) and aesthetic
(Universe) are separate axes. A neighbouring portfolio cannot copy the specifics: the bike, the poetry, the
universes are his.

## Operating Context

- Entry points: `/hire` is the resume link and must work cold with no cinema; `/` opens with a ~6s skippable cold
  open that resolves into a Work / Soul fork; `/soul` is the personal side; `/work/[slug]` per project.
- Built a little every day, indefinitely; every increment must be deployable.

## Capabilities and Constraints

- Stack: Next.js 16 App Router, React 19, TypeScript strict, CSS Modules, zustand, zod. No Tailwind. Deployed on
  Vercel (project `reaperoak`), domain portfolio.owaiskhan.website.
- Universe contract: every universe implements every content renderer; signature set pieces are optional and
  never the only path to content. Shipped universes: Blueprint, Nightride. Planned: Dastan, Campaign, Observatory.
- Performance tiers (full / reduced / static); everything must be complete at `static` and under
  `prefers-reduced-motion`. CI enforces Lighthouse ≥ 95 in every category on `/`, `/hire`, `/soul`.
- **Employment NDA (binding, legal):** never name the employer's products; describe them only as "a generative-AI
  media platform" and "a creator marketplace". No internal metrics, configs, costs, vendors or unreleased features.
  Job title is **Senior Developer**. No internal day-job numbers (team size, latency, uptime, costs). No mention of
  side ventures, freelancing during the current employment, freelance platforms, or compensation. Past freelance
  and contract roles (Today Egg Rates 2023-24, Kolkata Chess Academy 2024-25) are public résumé facts and may appear. Enforced by
  `.githooks/nda-terms`, a content test and `web/scripts/smoke.sh`.

## Brand Commitments

- Name: Owais Ahmed Khan; handle ReaperOAK. Kolkata, India.
- Voice: direct, specific, unpretentious; "125R, throttle open". Real over impressive.
- **Generate the world, never the evidence.** Mood and environment imagery may be generated; his face, bike,
  handwriting, numbers and code must be real.

## Evidence on Hand

- 31 projects with descriptions, decisions and build logs: `web/content/projects/*.mdx` (two day-job projects are
  NDA shape-only).
- Timeline (`web/content/timeline.ts`), eleven personas (`web/content/personas.ts`).
- Verified public figures: Today Egg Rates 34.2k+ clicks, 2K+ monthly users; TicketVault 3 dApps, team of 3;
  Odoo Hackathon 2025 national finalist (19,000+ field); 3 years building production systems (résumé). Nothing
  else may be presented as a metric. Several projects are still in development, so never say "31 shipped".
- Photography: `assets/cold-open/` (a1 helmet + monitor approved; b1 and b2 are portraits of Owais; a3/a4 to be
  replaced with real photos of the 125R and his handwriting).
- Films v1–v3 (desk, ride, throttle) were supplied by Owais and approved by him as world imagery. The bikes in v1/v2
  are not his 125R; he has said he will replace footage gradually and does not want this re-argued. Do not pair
  bike footage with claims that it is his bike.
  The person in the desk film (v3) has not been confirmed by Owais as himself. Until he does, it is world imagery:
  never caption it as him or use it as proof of identity. His confirmed likeness is the b1/b2 portraits.
- Live screenshots of his own deployed projects: `web/public/shots/` (provenance embedded).
- Absent and not to be fabricated: shayari (pending his dump), gym logs, testimonials, client logos.

## Product Principles

1. The hiring manager's path is never blocked: work evidence within one scroll of any entry.
2. Every animation reveals character, not capability.
3. Specific beats impressive: real projects, real numbers, real objects from his life.
4. Content once, rendered everywhere: no per-universe re-authoring.
5. Fast and accessible is part of the flex: performance and a11y budgets are product requirements.

## Accessibility & Inclusion

WCAG 2.2 AA. Full keyboard path, visible focus, no content hidden from assistive tech behind motion, reduced-motion
gets final frames instead of shortened animations.
