# Portfolio Website Master To-Do List (Detailed)

## 1. Project Setup & Planning
  - [x] Write initial README.md with project vision, stack, and goals
  - [x] Add .gitignore for Node, React, Firebase, and OS files
  - [x] Create /client (React app)
  - [x] Create /functions (Express backend for Firebase Functions)
  - [x] Create /planning & docs (strategy, content drafts, wireframes)
  - [x] Create /assets (images, icons, design tokens)
## 1. Project Setup & Planning
- [x] Create/initialize GitHub repository
  - [x] Write initial README.md with project vision, stack, and goals
  - [x] Add .gitignore for Node, React, Firebase, and OS files
- [x] Design folder structure (client, functions, planning & docs, etc.)
  - [x] Create /client (React app)
  - [x] Create /functions (Express backend for Firebase Functions)
  - [x] Create /planning & docs (strategy, content drafts, wireframes)
  - [x] Create /assets (images, icons, design tokens)
- [x] Set up issue tracker/project board (GitHub Projects or Notion)
- [x] Write initial changelog (CHANGELOG.md)
- [x] Define MVP scope and feature freeze for v1
  - **MVP Scope:**
    - Visitor segmentation prompt ("Who are you?")
    - Responsive, mobile-first layout
    - Animated Navbar & Footer (with theme toggle)
    - Home, About, Projects, Contact pages
    - Featured projects (case study cards)
    - Contact form (with validation, error/loading states, serverless backend)
    - Basic accessibility (keyboard nav, ARIA labels)
    - Dark mode toggle
    - Smooth scrolling & micro-interactions
    - Initial SEO (dynamic title/meta, sitemap, robots.txt)
    - Open source docs: README, CHANGELOG, CONTRIBUTING
  - **Feature Freeze for v1:**
    - No admin panel, blog, or advanced analytics in v1
    - No 3D/Three.js or advanced animations in v1
    - Focus on core UX, content, and reliability

## 2. Firebase & Environment Configuration
- [x] Install Firebase CLI globally
- [x] Login to Firebase and create new project
- [x] Initialize Firebase in project root
  - [x] Enable Hosting, Functions, (optionally Firestore/Auth)
  - [x] Set public directory to /client/build or /client/dist
  - [x] Configure SPA rewrites in firebase.json
- [x] Create .firebaserc and firebase.json
- [x] Set up .env files for both client and functions
  - [x] Add sample .env.example for both
- [x] Add environment variable validation/checks

## 3. Frontend: React, Tailwind, Animations, 3D
- [x] Scaffold React app in /client (Vite or CRA)
- [x] Install and configure TailwindCSS
  - [x] Set up tailwind.config.js with custom colors
  - [x] Add custom fonts and breakpoints to tailwind.config.js
  - [x] Add global styles (index.css)
- [x] Install Framer Motion, @react-three/fiber, @react-three/drei, Zustand or Context
- [x] Set up React Router with code splitting (lazy/Suspense)
- [x] Create global ThemeContext and VisitorContext
  - [x] Add logic for theme switching based on visitor type
  - [x] Persist visitor type in localStorage/session
  - [x] Build immersive full-page Visitor Selector component (replaces old card/modal approach)
  - [x] Add animation for entry/exit
  - [x] Add accessibility (keyboard, ARIA)
  - [x] Implement dynamic theming (color palette, layout, CTA text)
  - [x] Create Navbar and Footer components
  - [x] Add animated logo, nav links, theme toggle
  - [x] Make mobile responsive with hamburger menu
- [ ] Home Page
  - [x] Animated hero section (Framer Motion)
  - [x] 3D element (Three.js/R3F, lazy loaded)
  - [x] Typing animation for roles
  - [x] CTA buttons (View Projects, Hire Me, etc.)
  - [x] Scroll-down indicator
- [ ] About Page
  - [x] Bio, journey, philosophy
  - [x] Stack/skills with icons
  - [x] Fun facts, stylized photo/avatar
- [ ] Projects Page
  - [ ] Featured projects (case study cards)
  - [ ] Other projects grid
  - [ ] Filters (All, Web, Backend, Creative)
  - [ ] Tech stack tags, GitHub/live links
  - [ ] Optional: 3D/animated project cards
- [ ] Blog/Thoughts Page (optional)
  - [ ] Markdown or DB-powered posts
  - [ ] Sorting/filtering (Tech, Poetic, Personal)
  - [ ] Blog post page with code highlighting
- [ ] Poetry/Writing Page (optional, for creative visitor type)
- [ ] Contact Page
  - [ ] Contact form (with validation, error/loading states)
  - [ ] Social links, resume download
  - [ ] Fun CTA text
- [ ] 404 Page
  - [ ] Custom illustration/meme
  - [ ] Link back to home
- [ ] Add dark mode toggle (with persistence)
- [ ] Add smooth scrolling (Lenis or similar)
- [ ] Add micro-interactions (button hovers, card flips)
- [ ] Add accessibility features (tab order, ARIA, color contrast)
- [ ] Test all pages/components on mobile and desktop

## 4. Backend: Express, Firebase Functions, MongoDB
- [ ] Scaffold Express app in /functions
- [ ] Set up API routes/controllers:
  - [ ] /api/contact (POST, email sending)
  - [ ] /api/projects (GET, list projects)
  - [ ] /api/blog (GET, POST, if dynamic)
- [ ] Connect to MongoDB Atlas (if using DB)
  - [ ] Create Mongoose models (Project, Blog, etc.)
- [ ] Set up Nodemailer or EmailJS for contact form
- [ ] Add input validation and sanitization (express-validator)
- [ ] Add error handling middleware
- [ ] Add environment variable support (.env)
- [ ] Write unit tests for API endpoints (Jest or similar)
- [ ] Test endpoints locally with Postman/Thunder Client

## 5. Content & Data
- [ ] Write About page content (bio, philosophy, fun facts)
- [ ] Prepare project writeups (Problem, Approach, Stack, Result)
- [ ] Prepare blog post drafts (at least 2-3)
- [ ] Prepare poetry/creative writing samples (if needed)
- [ ] Prepare resume (PDF, up to date)
- [ ] Prepare social links (GitHub, LinkedIn, X, etc.)
- [ ] Create sample data files (projects.json, blogs.json, etc.)
- [ ] Add Open Graph/social preview images

## 6. Performance, SEO, Analytics
- [ ] Lazy load 3D/animation components
- [ ] Add route-based code splitting (React.lazy/Suspense)
- [ ] Optimize images (compression, next-gen formats)
- [ ] Optimize fonts (self-host, subset, preload)
- [ ] Add dynamic <title> and <meta> tags per page (React Helmet)
- [ ] Add OG/social sharing tags (og:image, og:title, etc.)
- [ ] Add sitemap.xml and robots.txt
- [ ] Add accessibility features (keyboard nav, ARIA, color contrast)
- [ ] Integrate Firebase Analytics or Plausible
- [ ] Run Lighthouse audits and fix issues

## 7. Testing & QA
- [ ] Write unit tests for key components (Jest, React Testing Library)
- [ ] Write integration tests for API endpoints
- [ ] Test all forms (validation, error, loading, success)
- [ ] Test on multiple browsers (Chrome, Firefox, Edge, Safari)
- [ ] Test on multiple devices (mobile, tablet, desktop)
- [ ] Test accessibility (screen reader, keyboard nav)
- [ ] Test performance (Lighthouse, WebPageTest)

## 8. Deployment
- [ ] Build React app (npm run build)
- [ ] Configure firebase.json and .firebaserc for hosting + functions
- [ ] Deploy to Firebase Hosting + Functions
- [ ] Attach custom domain (optional)
- [ ] Set up HTTPS and test SSL
- [ ] Test production build (mobile, desktop, slow network)
- [ ] Set up error monitoring (Sentry or similar, optional)

## 9. Open Source & Launch
- [ ] Polish README.md (stack, features, screenshots, Lighthouse score)
- [ ] Add license (MIT or preferred)
- [ ] Add CONTRIBUTING.md with guidelines
- [ ] Add CODE_OF_CONDUCT.md (optional)
- [ ] Create launch checklist (final QA, backups, etc.)
- [ ] Share on LinkedIn, X, dev communities
- [ ] Pin repo on GitHub profile

## 10. Optional Power-Ups (V2+)
- [ ] Admin panel (auth + CRUD for projects/blogs)
- [ ] Real-time visitor count (Firebase Realtime DB)
- [ ] Live visitor map (GeoIP + map API)
- [ ] Interactive CLI landing (command-line prompt UI)
- [ ] AI-generated poetry (OpenAI API integration)
- [ ] Konami code Easter egg (hidden features)
- [ ] Resume JSON API (serve resume as JSON endpoint)
- [ ] Multilingual support (English/Urdu toggle)
- [ ] Animated route transitions (Framer Motion)
- [ ] Live GitHub stats widget
- [ ] Feedback button (bug/feature request form)

---

> Update this checklist as you progress. Treat it as your product roadmap!
