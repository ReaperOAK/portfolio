
import SectionWrapper from "./SectionWrapper";
import { useTheme } from "../../contexts/ThemeContext";
import { useState } from "react";

const skills = [
  { icon: "/logo/reactjs.png", label: "React.js", category: "Frontend" },
  { icon: "/logo/typescript.png", label: "TypeScript", category: "Frontend" },
  { icon: "/logo/tailwind.png", label: "TailwindCSS", category: "Frontend" },
  { icon: "/logo/nodejs.png", label: "Node.js", category: "Backend" },
  { icon: "/logo/mongodb.png", label: "MongoDB", category: "Backend" },
  { icon: "/logo/firebase.png", label: "Firebase", category: "Cloud" },
  { icon: "/logo/framer.png", label: "Framer Motion", category: "UI/Animation" },
  { icon: "/logo/zustand.png", label: "Zustand/Context", category: "State Mgmt" },
  { icon: "/logo/markdown.png", label: "Markdown", category: "Content" },
];

// Group skills by category
const groupByCategory = (skillsArr) => {
  return skillsArr.reduce((acc, skill) => {
    acc[skill.category] = acc[skill.category] || [];
    acc[skill.category].push(skill);
    return acc;
  }, {});
};


function SkillItem({ icon, label, themeVars }) {
  return (
    <li
      className="flex items-center gap-3 py-2 px-3 rounded-lg transition-all outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary hover:scale-[1.03] hover:shadow-md"
      tabIndex={0}
      aria-label={label}
      style={{
        background: themeVars?.subtle,
        boxShadow: `0 1px 4px 0 ${themeVars?.primary}11`,
      }}
    >
      <img
        src={icon}
        alt={label + " logo"}
        className="w-7 h-7 object-contain"
        style={{ filter: `drop-shadow(0 1px 2px ${themeVars?.primary}33)` }}
        loading="lazy"
      />
      <span className="font-medium text-base" style={{ color: themeVars?.foreground }}>{label}</span>
    </li>
  );
}

export default function SkillsSection() {
  const { themeVars } = useTheme();
  const grouped = groupByCategory(skills);
  const categories = Object.keys(grouped);
  const [current, setCurrent] = useState(0);

  const goTo = (idx) => setCurrent((idx + categories.length) % categories.length);
  const prev = () => goTo(current - 1);
  const next = () => goTo(current + 1);

  const activeCategory = categories[current];
  const activeSkills = grouped[activeCategory];

  return (
    <SectionWrapper>
      <h2
        className="text-2xl font-bold mb-6 text-center tracking-tight"
        style={{ color: themeVars?.primary }}
      >
        Skills
      </h2>
      <div className="flex flex-col items-center">
        <div className="flex items-center gap-4 mb-4">
          <button
            aria-label="Previous category"
            onClick={prev}
            className="rounded-full p-2 hover:bg-opacity-80 focus-visible:ring-2 focus-visible:ring-primary transition"
            style={{ background: themeVars?.subtle, color: themeVars?.primary }}
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          <h3
            className="text-lg font-semibold tracking-wide uppercase opacity-80 px-2"
            style={{ color: themeVars?.accent }}
          >
            {activeCategory}
          </h3>
          <button
            aria-label="Next category"
            onClick={next}
            className="rounded-full p-2 hover:bg-opacity-80 focus-visible:ring-2 focus-visible:ring-primary transition"
            style={{ background: themeVars?.subtle, color: themeVars?.primary }}
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6"/></svg>
          </button>
        </div>
        <ul className="space-y-2 min-w-[220px] max-w-xs mx-auto transition-all duration-300">
          {activeSkills.map((skill) => (
            <SkillItem key={skill.label} icon={skill.icon} label={skill.label} themeVars={themeVars} />
          ))}
        </ul>
        <div className="flex gap-2 mt-4">
          {categories.map((cat, idx) => (
            <button
              key={cat}
              aria-label={`Go to ${cat}`}
              onClick={() => goTo(idx)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${idx === current ? 'scale-125' : 'opacity-60'}`}
              style={{ background: idx === current ? themeVars?.primary : themeVars?.subtle }}
            />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}