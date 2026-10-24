import React from "react";
import { useTheme } from "../../contexts/ThemeContext";

export default function DevLogTrail({ logs }) {
  const { themeVars } = useTheme();
  if (!logs || logs.length === 0) return null;

  const normalized = logs.map((l) => (typeof l === 'string' ? { text: l } : l || {}));

  return (
    <div className="mt-4">
      <h4 className="font-bold mb-2" style={{ color: themeVars.primary }}>Dev Log Trail</h4>
      <ul className="space-y-4 relative pl-6">
        {/* Timeline vertical line */}
        <div
          className="absolute top-6 bottom-0"
          style={{ width: 1, background: themeVars.primary, opacity: 0.08, left: 10 }}
          aria-hidden
        />

        {normalized.map((log, i) => (
          <li key={i} className="flex items-start gap-3 relative" style={{ animationDelay: `${i * 80}ms` }}>
            <span className="w-3 h-3 rounded-full mt-2 border-2 flex-shrink-0" style={{ background: themeVars.accent, borderColor: themeVars.primary, zIndex: 1, boxShadow: `0 0 0 6px ${themeVars.background}` }} aria-hidden></span>
            <div className="flex flex-col">
              {log.date && <div className="text-xs font-mono" style={{ color: themeVars.foreground, opacity: 0.7 }}>{log.date}</div>}
              <div className="text-sm" style={{ color: themeVars.foreground, fontWeight: 500 }}>{log.text}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
