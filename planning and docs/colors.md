A **detailed, scalable theme system** that supports:

* 🎯 Multiple visitor types (Recruiter, Client, Developer, Poet)
* 🌙 Dark-first design with light fallback
* 🧱 Tailwind-compatible colors
* 💡 Semantic tokens (primary, accent, background, etc.)
* 🔁 Extendable via CSS variables or theme objects
* ✅ Performance-conscious contrast ratios
* ⚙️ Room for 3D / neon / modern-glassmorphism UI if needed

---

## 🎨 Theme Design Philosophy

We'll structure it around:

```
[visitorType]: {
  background,
  foreground,
  primary,
  accent,
  subtle,
  border,
  gradient,
  highlight
}
```

---

## 🧠 Theme #1 — "Recruiter" (Light, clean, professional)

| Role        | Hex                                   | Tailwind Class     | Use                           |
| ----------- | ------------------------------------- | ------------------ | ----------------------------- |
| `bg`        | `#F8FAFC`                             | `bg-slate-50`      | Background                    |
| `fg`        | `#0F172A`                             | `text-slate-900`   | Primary text                  |
| `primary`   | `#3B82F6`                             | `text-blue-500`    | Buttons, CTAs, links          |
| `accent`    | `#10B981`                             | `text-emerald-500` | Icons, hover states           |
| `border`    | `#CBD5E1`                             | `border-slate-300` | Cards, outlines               |
| `subtle`    | `#E2E8F0`                             | `bg-slate-200`     | Background tint, alt sections |
| `gradient`  | `linear(to-r, blue-500, emerald-500)` | Hero, buttons      |                               |
| `highlight` | `#FACC15`                             | `text-yellow-400`  | Small elements, attention     |

🎯 **Impression**: Trustworthy, clean, polished.

---

## 🧠 Theme #2 — "Client" (Dark, sleek, trustworthy)

| Role        | Hex                                 | Tailwind Class     | Use                     |
| ----------- | ----------------------------------- | ------------------ | ----------------------- |
| `bg`        | `#0F172A`                           | `bg-slate-900`     | Background              |
| `fg`        | `#E2E8F0`                           | `text-slate-200`   | Primary text            |
| `primary`   | `#22D3EE`                           | `text-cyan-400`    | Buttons, links          |
| `accent`    | `#F59E0B`                           | `text-amber-500`   | Icons, hover states     |
| `border`    | `#334155`                           | `border-slate-700` | Card outlines           |
| `subtle`    | `#1E293B`                           | `bg-slate-800`     | Alt background sections |
| `gradient`  | `linear(to-r, cyan-400, amber-500)` | Hero, buttons      |                         |
| `highlight` | `#84CC16`                           | `text-lime-400`    | Callout blocks, success |

🎯 **Impression**: Modern, problem-solver, sleek.

---

## 🧠 Theme #3 — "Developer" (Dark, high-tech, neon-y)

| Role        | Hex                                 | Tailwind Class    | Use                       |
| ----------- | ----------------------------------- | ----------------- | ------------------------- |
| `bg`        | `#020617`                           | `bg-gray-950`     | Background                |
| `fg`        | `#F8FAFC`                           | `text-slate-100`  | Primary text              |
| `primary`   | `#7C3AED`                           | `text-purple-500` | CTAs, borders             |
| `accent`    | `#0EA5E9`                           | `text-sky-500`    | Hover, links              |
| `border`    | `#1E293B`                           | `border-gray-800` | Cards, buttons            |
| `subtle`    | `#111827`                           | `bg-gray-900`     | Tint sections             |
| `gradient`  | `linear(to-r, purple-500, sky-500)` | Headers/buttons   |                           |
| `highlight` | `#F472B6`                           | `text-pink-400`   | Taglines, cool highlights |

🎯 **Impression**: Cutting-edge, hacker-vibe, tech-savvy.

---

## 🧠 Theme #4 — "Poet" (Mystic, romantic, expressive)

| Role        | Hex                                  | Tailwind Class      | Use           |
| ----------- | ------------------------------------ | ------------------- | ------------- |
| `bg`        | `#1C0C2E`                            | `bg-[#1C0C2E]`      | Background    |
| `fg`        | `#F3E8FF`                            | `text-purple-100`   | Text          |
| `primary`   | `#C084FC`                            | `text-purple-400`   | Titles, links |
| `accent`    | `#FB7185`                            | `text-rose-400`     | CTA, hover    |
| `border`    | `#6B21A8`                            | `border-purple-700` | Outlines      |
| `subtle`    | `#2E1065`                            | `bg-purple-900`     | Alt section   |
| `gradient`  | `linear(to-r, rose-400, purple-500)` | Hero, poet mode     |               |
| `highlight` | `#FACC15`                            | `text-yellow-400`   | Glows, words  |

🎯 **Impression**: Ethereal, aesthetic, depth.

---

## 🧪 Global Theme Object (JS-friendly)

You can define it in `/src/themes/index.js`:

```js
export const themes = {
  recruiter: {
    background: "#F8FAFC",
    foreground: "#0F172A",
    primary: "#3B82F6",
    accent: "#10B981",
    border: "#CBD5E1",
    subtle: "#E2E8F0",
    highlight: "#FACC15",
    gradient: ["#3B82F6", "#10B981"],
  },
  client: {
    background: "#0F172A",
    foreground: "#E2E8F0",
    primary: "#22D3EE",
    accent: "#F59E0B",
    border: "#334155",
    subtle: "#1E293B",
    highlight: "#84CC16",
    gradient: ["#22D3EE", "#F59E0B"],
  },
  developer: {
    background: "#020617",
    foreground: "#F8FAFC",
    primary: "#7C3AED",
    accent: "#0EA5E9",
    border: "#1E293B",
    subtle: "#111827",
    highlight: "#F472B6",
    gradient: ["#7C3AED", "#0EA5E9"],
  },
  poet: {
    background: "#1C0C2E",
    foreground: "#F3E8FF",
    primary: "#C084FC",
    accent: "#FB7185",
    border: "#6B21A8",
    subtle: "#2E1065",
    highlight: "#FACC15",
    gradient: ["#FB7185", "#C084FC"],
  },
};
```

---

## 🌈 Tailwind Config Integration (Optional)

If you want to deeply customize Tailwind's config:

```js
// tailwind.config.js
theme: {
  extend: {
    colors: {
      recruiter: {
        bg: '#F8FAFC',
        text: '#0F172A',
        primary: '#3B82F6',
      },
      developer: {
        bg: '#020617',
        text: '#F8FAFC',
        primary: '#7C3AED',
      },
      // etc...
    }
  }
}
```

Then use:

```html
<div className="bg-recruiter-bg text-recruiter-text"></div>
```

---

## 🔥 Bonus: CSS Variable Injection

For dynamic theme switching:

```css
:root {
  --bg: #020617;
  --text: #f8fafc;
  --primary: #7c3aed;
}

body {
  background-color: var(--bg);
  color: var(--text);
}
```

And dynamically set with JS:

```js
document.documentElement.style.setProperty('--primary', theme.primary);
```

---

## 🧠 Final Tips

* Keep gradients subtle unless it’s for hero/CTA
* Use **Framer Motion** to animate theme transitions (fade bg, slide-in colors)
* Never animate text colors directly — always fade wrappers
* Test each theme with:

  * Long paragraphs
  * Form fields
  * Cards/buttons
  * Light mode fallback (if needed)

