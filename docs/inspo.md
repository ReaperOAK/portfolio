# Inspiration — what to take from each reference

Captured 2026-10-08 (hero + two scrolled viewports each). Screenshots are local only, in
`.gstack/browse-reports/inspo/` (gitignored — they are other people's work).

## Five patterns that recur

**1. The preloader is the first scene, not a spinner.** Podium (white field, one dot, `93%`), Getty
Persepolis (`100` inside an ornamental ring), Olha Lazarieva (text bent into a ring, `99%`), KPR (glitching
wordmark). Nobody shows a generic loader.
→ Every universe gets a loader in its own language. Nightride: the tacho revs from idle to redline as
assets load. Dastan: a ring of ornament fills like ink. Blueprint: a dimension line draws to 100.

**2. One real object carries the hero.** Igloo (an igloo that assembles block by block on scroll, each block
labelled), Podium (a carved stone at the close), Olha (a gallery room of plinths), Lando Norris (his helmet).
→ The helmet is our object. a1 already says it. Sub-project D's scan target is confirmed: helmet first.
Igloo's assemble-on-scroll maps onto Blueprint: projects as parts that snap into the whole.

**3. Type is the main event, and it is never a system font.** Lando mixes a high-contrast serif with a
heavy condensed grotesk, accent colour on the serif words. Noomo sets huge thin grotesk with 3D objects
passing *between* letters. Wodniack rains giant condensed letters spelling WORK. Lamalama: one bold centred
line under a mono bracket eyebrow.
→ The prototype's system-font stacks are the weakest thing we have. Each universe needs a real display
face, self-hosted via `next/font`. Nightride should borrow Lando's two-face mix almost directly —
motorsport is the closest analogue to a rider's site in this set.

**4. Narrative scroll, one sentence at a time.** Getty: fog, a single serif sentence, "Scroll to continue",
a sound toggle bottom-right. The page only ever says one thing.
→ This is Dastan, and it is how poems should arrive. Also the cold open's grammar.

**5. Mono HUD chrome around a quiet centre.** Lamalama's `[ NOTHING MORE, NOTHING LESS ]`, Olha's
`[ WORKS ]`, Igloo's tiny data labels, KPR's crosshairs and hairline frames.
→ Blueprint's chrome. Thin frames, bracketed mono labels, crosshair cursor.

## Per site, one line

| Site | Take |
|---|---|
| podium.global | Theatrical loader; media strip; closing object + one-line CTA |
| lamalama.com/work | Work index as hover rows with media strips and tag chips — our Work-lens list |
| persepolis.getty.edu | One sentence per screen, fog, sound toggle — Dastan |
| kprverse.com | Worldbuilding UI, crosshair HUD, rotated giant numerals — Campaign |
| noomoagency.com | Huge thin type with 3D objects threading through it |
| lusion.co | Video card that bends with scroll; dense case-study grid |
| igloo.inc | Object assembles from labelled blocks as you scroll — Blueprint + D |
| landonorris.com | Athlete site, helmet hero, serif/condensed mix — Nightride |
| olhalazarieva.com | Bent-text loader, mono brackets, gallery room — Observatory |
| wodniack.dev | One colour, giant condensed letters falling — Campaign energy |

## Changes this implies

- **Add a `loader` stage slot** to the universe contract (optional, like every signature piece).
- **Real fonts per universe** before Blueprint ships. Pick faces deliberately; avoid Inter / Space Grotesk.
- **Sound toggle** is table stakes in this set (Getty, Podium). Lands with sub-project D.
- **Performance tier matters more, not less**: Igloo and KPR are the heaviest pages here. Their pattern
  survives at `static` only if the object degrades to a photograph — which a1 already is.
