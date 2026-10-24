<!-- .github/copilot-instructions.md: Guidance for AI coding agents working on the portfolio repo -->
# Repo snapshot

- Framework: React (Vite) frontend in `client/` with Tailwind, Framer Motion and @react-three/fiber.
- Deploy target: Firebase Hosting + Functions (serverless API). Static `public/` is served with a SPA rewrite to `index.html`.
- Purpose: personal portfolio site with interactive 3D visuals, accessibility-first UI, and a serverless contact form.

## What to read first

- `client/src/` — primary frontend code. Look at `pages/` and `components/` for UI patterns.
- `client/package.json` — dev scripts: `npm run dev` (vite), `npm run build`, `npm run preview`, `npm run lint`.
- `firebase.json` — hosting rewrites and Firestore references.
- `planning & docs/` and `planning and docs/` — feature rationale and long-form decisions.

## Architecture & conventions (short)

- Frontend-centric repo: most logic and UX are in `client/src`. Components are organized by feature (e.g., `about/`, `contact/`, `projects/`).
- 3D/Canvas code lives under `client/src/components/about/skills3d/` and `client/src/components/WireframeIcosahedron.jsx`.
- Theme and visitor segmentation state is in `client/src/contexts/` (`ThemeContext.jsx`, `VisitorContext.jsx`). Use those contexts when changing global UI behavior.
- Assets (images, fonts, logos) are in `client/public/` and `client/src/assets/`.

## Developer workflows & commands

- Local dev (frontend):

  - cd into `client/` and run `npm install` then `npm run dev` to start Vite with HMR.
  - `npm run build` creates a production bundle under `client/dist` (deploys expect `public/` root; repo uses Firebase to serve final build).

- Linting: `npm run lint` in `client/` uses ESLint config at `client/eslint.config.js`.

## Patterns & pitfalls specific to this codebase

- Accessibility-first: many components include keyboard & ARIA patterns (see `client/src/components/contact/*` and `client/src/components/about/HeroSection.jsx`). Preserve focus management when refactoring.
- Lazy-loaded heavy 3D assets: code uses dynamic imports and lazy loading for canvas pieces — don't eagerly import `@react-three/fiber` into small components.
- Keep visual/styling tokens centralized: Tailwind config is at `client/tailwind.config.js` and `client/src/themes/index.js` contains theme tokens.
- Avoid adding global CSS files; prefer component-level classes and `client/index.css` for global resets.

## Tests & CI

- There are no automated test suites in the repo root. CI workflows in `.github/workflows/` focus on Firebase hosting deploys. When adding tests, add scripts to `client/package.json` and update CI ymls.

## Where to make changes for common tasks (examples)

- Change header/navigation: `client/src/components/Navbar.jsx` and theme in `client/src/themes/index.js`.
- Add a new project tile: modify `client/src/data/projects.js` and `client/src/components/projects/ProjectsGrid.jsx`.
- Modify contact form backend: the serverless function(s) live in `functions/` (if present) and Firebase Functions; check `firebase.json` and `planning & docs/` for contract details.

## Guidance for AI edits

- Small, targeted changes only: prefer editing files under `client/src/` and `client/public/` unless asked to touch deployment files.
- Preserve accessibility, lazy-loading and existing context usage. When altering focus/keyboard behavior, run a quick smoke test (`npm run dev`) and verify keyboard tab order.
- When adding dependencies, update `client/package.json` and ensure dev `vite` and Tailwind remain compatible.
- For any change that affects the build or deploy (build scripts, `firebase.json`, hosting path), call out potential deployment implications in your commit message.

---

If any section is unclear or you'd like me to expand examples (e.g., list of top 10 files to inspect for UX flows or exact env variables used), tell me which area to expand and I'll iterate.
