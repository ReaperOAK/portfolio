import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../../contexts/ThemeContext";
import { useNavigate } from "react-router-dom";
// icons removed: non-interactive controls removed

const VIEW_MODES = [
  { label: "Preview", value: "preview" },
  { label: "Context", value: "context" },
  { label: "Tech Dive", value: "tech" },
];

export default function ProjectTile({ project = {}, allProjects = [] }) {
  const [expanded, setExpanded] = useState(false);
  const { themeVars: t } = useTheme();
  const navigate = useNavigate();

  const slugify = (input = '') =>
    String(input)
      .toLowerCase()
      .trim()
      .replace(/[’'`]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

  // pin/expand controls removed — tile remains clickable to open details

  const TechWiring = () => (
    <motion.svg width="100%" height="36" style={{ marginBottom: "0.25rem" }}>
      {Array.isArray(project.tech)
        ? project.tech.map((tech, i) => (
            <motion.line
              key={String(tech) + i}
              x1={20 + i * 48}
              y1={10}
              x2={20 + i * 48}
              y2={30}
              stroke={t.accent}
              strokeWidth={2}
              initial={{ opacity: 0, y2: 10 }}
              animate={{ opacity: 0.75, y2: 30 }}
              transition={{ delay: i * 0.06, duration: 0.45, type: "spring" }}
            />
          ))
        : null}
    </motion.svg>
  );

  const targetSlug = project.slug || slugify(project.title || '');

  return (
    <motion.div
      className={`relative flex flex-col p-3 rounded-xl h-full ${expanded ? "z-20" : ""} group cursor-pointer`}
      tabIndex={0}
      aria-expanded={expanded}
      role={project.slug ? "link" : undefined}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          targetSlug && navigate(`/project/${targetSlug}`);
        }
      }}
      style={{ transition: "box-shadow 0.2s, transform 0.2s", background: t.subtle, border: `1px solid ${t.border}` }}
      initial={false}
      animate={{ rotateY: 0 }}
      whileHover={{ boxShadow: `0 10px 40px ${t.primary}22` }}
      transition={{ type: "spring", stiffness: 240, damping: 26 }}
  onClick={() => targetSlug && navigate(`/project/${targetSlug}`)}
    >
      <div className="flex items-center gap-3 mb-2">
        <span className="text-2xl" style={{ color: t.primary }}>{project.icon}</span>
        <div className="flex-1">
          <h3 className="text-lg font-bold" style={{ color: t.foreground }}>{project.title}</h3>
          <div className="text-xs" style={{ color: t.fg, opacity: 0.75 }}>{project.shortDesc}</div>
        </div>
  <span className="text-xs px-2 py-1 rounded" style={{ background: t.accent, color: t.background }}>{project.status}</span>
      </div>

      <div className="flex gap-2 flex-wrap mb-3">
        {Array.isArray(project.tech) && project.tech.map((tech) => (
          <motion.span
            key={tech}
            className="px-2 py-1 rounded text-xs font-mono cursor-pointer"
            style={{ background: t.primary, color: t.background, boxShadow: `0 1px 8px 0 ${t.accent}22` }}
            whileHover={{ scale: 1.06, boxShadow: `0 4px 20px 0 ${t.accent}44` }}
            onMouseEnter={(e) => e.stopPropagation()}
          >
            {tech}
          </motion.span>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs px-2 py-1 rounded" style={{ background: t.background, color: t.foreground }}>{project.type}</span>
        </div>
        <div className="flex items-center gap-2">
          {/* non-interactive controls removed */}
        </div>
      </div>

  <div className="mt-3 text-sm" style={{ color: t.foreground, opacity: 0.9 }}>{project.shortDesc || project.desc || ''}</div>

  {/* tech wiring removed */}
    </motion.div>
  );
}

