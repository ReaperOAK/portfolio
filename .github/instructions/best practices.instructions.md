---
applyTo: '**'
---
# Portfolio Project Best Practices

## General Principles
- **Read before writing:** Review docs, planning notes, and related files before editing or creating anything.
- **No build artifacts:** Never create or modify anything inside `/build/`, `/dist/`, or equivalent output directories.
- **Documentation required:** Update all relevant docs (`README.md`, feature docs, API docs, changelogs) after code changes. Update comments and `CONTRIBUTING.md` as needed.
- **No orphan files:** Register new files/components in the correct modules, routes, or parent components.
- **Be intentional:** Every change should be justifiable and traceable.
- **DRY, but avoid premature abstraction.**
- **Refactor early and often.**
- **Clarity over cleverness.**
- **Stay informed:** Read RFCs, React updates, and changelogs.

## File & Component Standards
- **Follow structure:** Use the existing folder structure and naming conventions. Organize by feature, not file type.
- **No unreferenced files:** All files must be imported and used somewhere.
- **Keep files focused:** One component, hook, or utility per file unless tightly coupled.
- **Use index files for barrel exports** only when it improves clarity.

## React & Frontend Practices
- **Component design:** Use pure, focused, reusable functional components and Hooks. Prefer composition over prop bloat.
- **Performance:** Use `React.memo`, `useMemo`, and `useCallback` only after profiling. Code-split heavy components.
- **State management:** Prefer `useState` > `useReducer` > `Context` > external state managers (Zustand, Redux, etc.).
- **UI/UX:** Always handle loading, error, and empty states. Use schema-based form validation. Ensure accessibility and theming via Tailwind or styled-components.
- **Animations:** Use Framer Motion for transitions and micro-interactions. Lazy load heavy animation/3D assets.
- **3D/Canvas:** Use @react-three/fiber for 3D, and always lazy load. Keep scenes light and performant.
- **Routing:** Use React Router with code splitting. Handle 404s and redirects gracefully.
- **Testing:** Write unit and integration tests for key components and flows.

## Backend & API Practices
- **Express structure:** Organize by feature (routes, controllers, models).
- **Validation:** Sanitize input and escape output. Use express-validator or similar.
- **Error handling:** Centralize error handling middleware. Log errors with context.
- **Security:**
  - No sensitive data in localStorage; use HttpOnly cookies for auth.
  - Strict CORS and CSP headers.
  - Rate limit API endpoints.
  - Use environment variables for secrets.
- **Testing:** Write unit tests for API endpoints. Use Postman/Thunder Client for manual testing.

## Content & Data
- **Content-first:** Write and review content before building UI around it.
- **Consistent voice:** Maintain a consistent tone and style across all pages.
- **Data sources:** Prefer static JSON/Markdown for MVP; move to DB only if needed.
- **SEO:** Use dynamic `<title>`, `<meta>`, and OG tags. Add sitemap.xml and robots.txt.

## UI Design & Accessibility
- **Design system:** Use consistent design tokens (spacing, font sizes, colors, etc.).
- **Typography:** Use typographic scale for font sizes.
- **Color palette:** Minimal, WCAG contrast compliant.
- **Responsive:** Mobile-first, standard breakpoints, Flexbox/Grid, avoid fixed px widths.
- **Accessibility:** Semantic HTML, ARIA labels, keyboard navigation, color contrast.
- **Interactive elements:** All have hover, active, and disabled states.

## DevOps & Deployment
- **Envs:** Use `.env` files for both client and server. Never commit secrets.
- **CI/CD:** Test build step before deploying. Use Firebase Hosting + Functions for deploys.
- **Domains:** Use `web.app` for MVP, custom domain for production.
- **Monitoring:** Set up error monitoring (Sentry or similar) for production.
- **Rollback:** Keep previous build zipped for safety.

## Open Source & Collaboration
- **README:** Keep up to date with stack, features, and setup instructions.
- **Changelog:** Maintain a clear CHANGELOG.md.
- **Contribution:** Add CONTRIBUTING.md and CODE_OF_CONDUCT.md.
- **Commit messages:** Follow Conventional Commits or project rules.
- **Issue templates:** Use for bug reports and feature requests.

## Anti-Patterns to Avoid
- Prop drilling across too many layers.
- `useEffect` without dependencies.
- Modifying props directly.
- Overusing Context or global state.
- Leaving files unreferenced or undocumented.
- Mixing HTML and logic in the same file.
- Catching exceptions without logging.
- Using global state unnecessarily.
- Not checking return values or error codes.
- Premature optimization or abstraction.

---

> Follow these best practices to ensure code quality, maintainability, and a world-class user experience.
