import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../../contexts/ThemeContext";

// Receives tech stack and all projects, highlights related tiles and animates connections
export default function SkillMapOverlay({ tech, projects = [] }) {
  const { themeVars } = useTheme();
  const [hoveredTech, setHoveredTech] = useState(null);
  if (!tech || tech.length === 0) return null;

  // Animated SVG connections between tech badges and related projects
  return (
    <div className="relative w-full h-32 mb-4">
      {/* Tech badges */}
      <div className="absolute left-0 top-0 flex gap-2 z-10">
        {tech.map((tch, i) => (
          <span
            key={tch}
            className="px-2 py-1 rounded text-xs font-mono transition-transform duration-300 hover:scale-110 cursor-pointer"
            style={{ background: themeVars.primary, color: themeVars.background }}
            onMouseEnter={() => setHoveredTech(i)}
            onMouseLeave={() => setHoveredTech(null)}
          >
            {tch}
          </span>
        ))}
      </div>
      {/* Animated connections to related projects */}
      <svg className="absolute left-0 top-0 w-full h-full pointer-events-none z-0">
        {projects.map((project, i) => {
          const pTech = Array.isArray(project.tech) ? project.tech : [];
          const relatedTechIdx = tech.findIndex(tch => pTech.includes(tch));
          if (relatedTechIdx === -1) return null;
          return (
            <line
              key={project.slug || project.title || i}
              x1={32 + relatedTechIdx * 64}
              y1={24}
              x2={32 + i * 64}
              y2={96}
              stroke={hoveredTech === relatedTechIdx ? themeVars.accent : themeVars.subtle}
              strokeWidth={hoveredTech === relatedTechIdx ? 4 : 2}
              opacity={hoveredTech === relatedTechIdx ? 0.8 : 0.4}
              style={{ transition: "all 0.3s" }}
            />
          );
        })}
      </svg>
      {/* Highlight overlays for related projects */}
      {projects.map((project, idx) => {
        const pTech = Array.isArray(project.tech) ? project.tech : [];
        const isRelated = pTech.some((t) => tech.includes(t));
        if (!isRelated) return null;
        return (
          <motion.div
            key={project.slug || project.title || idx}
            className="absolute pointer-events-none rounded-xl"
            style={{
              top: `calc(${Math.floor(idx / 3)} * 33.333%)`,
              left: `calc(${(idx % 3)} * 33.333%)`,
              width: "33.333%",
              height: "33.333%",
              zIndex: 40,
              background: `radial-gradient(circle at 60% 40%, ${themeVars.accent} 0%, ${themeVars.highlight} 60%, transparent 100%)`,
              filter: "blur(8px)",
              boxShadow: `0 0 32px 8px ${themeVars.accent}`,
              opacity: 0.7,
            }}
            initial={{ opacity: 0.5, scale: 0.95 }}
            animate={{ opacity: 0.85, scale: 1.08 }}
            transition={{ duration: 1.2, repeat: Infinity, repeatType: "reverse" }}
          />
        );
      })}
    </div>
  );
}
