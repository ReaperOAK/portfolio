import React from "react";
import { createPortal } from 'react-dom';
import { useTheme } from "../../contexts/ThemeContext";
import { Code2, Palette, Brain, Rocket } from "lucide-react";

// Status-based filters that map to values found in `client/src/data/projects.js`
const VIEW_MODES = [
  { label: "All", value: "all", icon: <Code2 size={18} /> },
  { label: "Under Development", value: "under development", icon: <Palette size={18} /> },
  { label: "Completed", value: "completed", icon: <Brain size={18} /> },
  { label: "Deployed", value: "deployed", icon: <Rocket size={18} /> },
];

export default function ProjectFilterSwitch({ selected, onSelect }) {
  const { themeVars: t } = useTheme();
  const node = (
    <div
      className="fixed right-4 sm:right-8 flex gap-2 px-3 py-2 rounded-xl shadow-lg backdrop-blur-md animate-fade-in max-w-full"
      style={{
        background: `${t.background}cc`,
        border: `1px solid ${t.border}`,
        boxShadow: `0 2px 16px 0 ${t.subtle}`,
        zIndex: 9999,
        top: '5rem',
      }}
    >
      {VIEW_MODES.map((mode) => (
        <div key={mode.value} className="relative">
            <button
            className={`flex items-center gap-2 px-3 py-1 rounded-full font-medium text-sm transition-all duration-300 focus:outline-none ${selected === mode.value ? "scale-110 shadow-lg font-bold" : "opacity-70"}`}
            style={{
              background: selected === mode.value ? t.primary : "transparent",
              color: selected === mode.value ? t.background : t.primary,
              border: "none",
              boxShadow: "none",
            }}
            onClick={() => onSelect(mode.value)}
            aria-pressed={selected === mode.value}
          >
            {mode.icon}
            {mode.label}
          </button>
        </div>
      ))}
    </div>
  );

  if (typeof document !== 'undefined') {
    return createPortal(node, document.body);
  }

  return node;
}
